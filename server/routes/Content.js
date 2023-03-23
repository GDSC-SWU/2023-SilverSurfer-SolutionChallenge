import express from "express";
import db from "../config/db.js";
import validateAccessToken from "../middlewares/validateAccessToken.js";

const router = express.Router();
let conn = null;
let query = "";

// 콘텐츠 목록 조회 (이미지, 타이틀, 설명)
router.get("/:category", async (req, res) => {
  try {
    const category = req.params.category;
    conn = await db.getConnection();
    query = `select postId, category, title, title_eng, explanation, thumbnailImagePath from Contents where category = "${category}" order by category, postId;`;
    const [rows] = await conn.query(query);

    // if (rows.length !== 0) {
    //   // 컨텐츠가 존재할 경우 -> 썸네일 이미지 조회
    //   for (let i = 0; i < rows.length; i++) {
    //     query = `select imagePath from Contents_Image where postId = ${rows[i].postId} order by paragraphId asc limit 1`;
    //     const [imageRows] = await conn.query(query);

    //     if (imageRows[0]) {
    //       // 컨텐츠 내 이미지 존재 시
    //       rows[i].thumbnailPath = imageRows[0].imagePath;
    //     } else {
    //       // 컨텐츠 내 이미지 미존재 시
    //       rows[i].thumbnailPath = null;
    //     }
    //   }
    // }

    console.log("Successfully Completed.");
    res.status(200).json({
      status: "Success",
      data: rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "Error",
      message: "Server Error.",
    });
  } finally {
    conn.release();
  }
});

// 콘텐츠 목록 조회 (로그인한 경우)
router.get("/us/:category", validateAccessToken, async (req, res) => {
  conn = await db.getConnection();
  try {
    const userId = req.user;
    const category = req.params.category;
    query = `select postId, category, title, title_eng, explanation, thumbnailImagePath from Contents where category = "${category}" order by category, postId;`;
    const [rows] = await conn.query(query);

    // 컨텐츠가 존재할 경우
    if (rows.length !== 0) {
      // 해당 회원의 북마크 내역 조회
      query = `select postId from Scrap where userId = ${userId} order by postId`;
      const [bookmarks] = await conn.query(query);

      for (let i = 0; i < rows.length; i++) {
        // // 썸네일 이미지 조회
        // query = `select imagePath from Contents_Image where postId = ${rows[i].postId} order by paragraphId asc limit 1`;
        // const [imageRows] = await conn.query(query);

        // if (imageRows[0]) {
        //   // 컨텐츠 내 이미지 존재 시
        //   rows[i].thumbnailPath = imageRows[0].imagePath;
        // } else {
        //   // 컨텐츠 내 이미지 미존재 시
        //   rows[i].thumbnailPath = null;
        // }

        // 북마크 여부
        if (bookmarks.length !== 0) {
          bookmarks.map(
            (item) => (rows[i].bookmark = item.postId === rows[i].postId)
          );
        } else {
          rows[i].bookmark = false;
        }
      }
    }

    console.log("Successfully Completed.");
    res.status(200).json({
      status: "Success",
      data: rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "Error",
      message: "Server Error.",
    });
  } finally {
    conn.release();
  }
});

// 콘텐츠 세부 조회
router.get("/detail/:postId", async (req, res) => {
  try {
    const postId = Number(req.params.postId);
    conn = await db.getConnection();
    query = `select * from Contents where postId = ${postId} limit 1`;
    const [contentRow] = await conn.query(query);

    // postId에 해당하는 content가 존재하지 않을 경우
    if (!contentRow[0]) {
      throw new Error("Invalid PostId");
    }

    // 조회 수 증가
    query = `update Contents set viewCount = viewCount + 1 where postId = ${postId}`;
    await conn.query(query);
    contentRow[0].viewCount = contentRow[0].viewCount + 1;

    // 본문 데이터
    query = `select * from Contents_Paragraph where postId = ${postId}`;
    const [paraRow] = await conn.query(query);

    if (paraRow[0] !== undefined) {
      for (let i = 0; i < paraRow.length; i++) {
        let [imageRow] = [];
        let [codeRow] = [];

        // 이미지 가져오기
        query = `select imageId, imagePath, detail from Contents_Image where paragraphId = ${paraRow[i].paragraphId}`;
        imageRow = await conn.query(query);

        paraRow[i].image = imageRow[0].length === 0 ? null : imageRow[0];

        // 코드 가져오기
        query = `select codeId, codeContent, language from Contents_Code where paragraphId = ${paraRow[i].paragraphId}`;
        codeRow = await conn.query(query);

        paraRow[i].code = codeRow[0].length === 0 ? null : codeRow[0];
      }
    }

    res.status(200).json({
      status: "Success",
      data: {
        content: contentRow[0],
        paragraphs: paraRow,
      },
    });
  } catch (err) {
    let errCode = 500;
    let errMessage = "Server Error";

    if (err.message == "Invalid PostId") {
      errCode = 404;
      errMessage = err.message;
    }

    res.status(errCode).json({
      status: "Error",
      message: errMessage,
    });
  } finally {
    conn.release();
  }
});

// 스크랩 추가 및 취소
router.post("/scrap/:postId", validateAccessToken, async (req, res) => {
  conn = await db.getConnection();
  try {
    const userId = req.user;
    const postId = Number(req.params.postId);

    // postId 유효성 검사
    query = `select * from Contents where postId = ${postId}`;
    let [rows] = await conn.query(query);

    if (!rows[0]) {
      throw new Error("Invalid PostId");
    }

    // Scrap 데이터 중복 검사
    query = `select * from Scrap where userId = ${userId} and postId = ${postId}`;
    [rows] = await conn.query(query);

    const isActive = rows[0] !== undefined;

    // Scrap 해제
    if (isActive) {
      // Scrap 데이터 삭제
      query = `delete from Scrap where userId = ${userId} and postId = ${postId}`;
      await conn.query(query);

      // Users 데이터 내 user의 scrapCount--
      query = `update Users set scrapCount = scrapCount - 1 where userId = ${userId}`;
      await conn.query(query);

      // Contents 데이터 내 content의 scrapCount--
      query = `update Contents set scrapCount = scrapCount - 1 where postId = ${postId}`;
      await conn.query(query);
    } else {
      // Scrap 데이터에 저장
      query = `insert into Scrap(userId, postId) values("${userId}", "${postId}")`;
      await conn.query(query);

      // Users 데이터 내 user의 scrapCount++
      query = `update Users set scrapCount = scrapCount + 1 where userId = ${userId}`;
      await conn.query(query);

      // Contents 데이터 내 content의 scrapCount++
      query = `update Contents set scrapCount = scrapCount + 1 where postId = ${postId}`;
      await conn.query(query);
    }

    console.log("Updated Successfully.");

    // 응답 전달
    res.status(200).send({
      status: "Success",
      message: "Updated Successfully.",
      isActive: !isActive,
    });
  } catch (err) {
    console.error(err);

    let errCode = 500;
    let errMessage = "Server Error";

    if (err.message === "Invalid PostId") {
      errCode = 404;
      errMessage = err.message;
    }

    res.status(errCode).send({
      status: "Error",
      message: errMessage,
    });
  } finally {
    // db 연결 종료
    conn.release();
  }
});

export default router;
