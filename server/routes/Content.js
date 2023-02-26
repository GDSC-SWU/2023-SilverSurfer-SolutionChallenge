import express from "express";
import db from "../config/db.js";
import validateAccessToken from "../middlewares/validateAccessToken.js";

const router = express.Router();
let conn = null;
let query = "";

// 콘텐츠 목록 조회 (이미지, 타이틀, 설명)
router.get("/", async (req, res) => {
  try {
    conn = await db.getConnection();
    query = "select postId, category, title, explanation from Contents;";
    const [rows] = await conn.query(query);

    // 기본 썸네일 설정 (메인 컬러 민무늬 이미지)
    query =
      "select imagePath from Contents_Image where detail = '메인 컬러' limit 1;";
    let [defaultThumbnail] = await conn.query(query);
    defaultThumbnail = defaultThumbnail[0].imagePath;

    if (rows.length !== 0) {
      // 컨텐츠가 존재할 경우 -> 썸네일 이미지 조회
      for (let i = 0; i < rows.length; i++) {
        query = `select paragraphId, imagePath from Contents_Image where postId = ${rows[i].postId} order by paragraphId asc limit 1`;
        const [imageRows] = await conn.query(query);

        if (imageRows[0]) {
          rows[i].thumbnailPath = imageRows[0].imagePath;
        } else {
          rows[i].thumbnailPath = defaultThumbnail;
        }
      }
    }

    console.log("Successfully Completed.");
    res.status(200).json({
      status: "success",
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
router.get("/:postId", async (req, res) => {
  let errCode = 500;
  try {
    const postId = Number(req.params.postId);
    conn = await db.getConnection();
    query = `select * from Contents where postId = ${postId} limit 1`;
    const [contentRow] = await conn.query(query);

    // postId에 해당하는 content가 존재하지 않을 경우
    if (!contentRow[0]) {
      throw new Error("Invalid PostId");
    }

    query = `select * from Contents_Paragraph where postId = ${postId}`;
    const [paraRow] = await conn.query(query);

    if (paraRow[0] !== null) {
      for (let i = 0; i < paraRow.length; i++) {
        let [imageRow] = [];
        let [codeRow] = [];

        // 이미지 가져오기
        query = `select imageId, imagePath, detail from Contents_Image where paragraphId = ${paraRow[i].paragraphId}`;
        imageRow = await conn.query(query);

        paraRow[i].image = imageRow[0];

        // 코드 가져오기
        query = `select codeId, codeContent, language from Contents_Code where paragraphId = ${paraRow[i].paragraphId}`;
        codeRow = await conn.query(query);

        paraRow[i].code = codeRow[0];
      }
    }

    res.status(200).json({
      status: "success",
      data: {
        content: contentRow[0],
        paragraphs: paraRow,
      },
    });
  } catch (err) {
    if (err.message == "Invalid PostId") {
      errCode = 404;
    }

    res.status(errCode).json({
      status: "Error",
      message: err.message,
    });
  } finally {
    conn.release();
  }
});

export default router;
