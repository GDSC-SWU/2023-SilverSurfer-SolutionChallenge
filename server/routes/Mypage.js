import express from "express";
import db from "../config/db.js";
import validateAccessToken from "../middlewares/validateAccessToken.js";

const router = express.Router();
let conn = null;
let query = "";

// 내 정보 가져오기
router.get("/", validateAccessToken, async (req, res) => {
  try {
    const userId = req.user;
    conn = await db.getConnection();

    // 프로필 정보
    query = `select * from Users where userId = ${userId}`;
    let [user] = await conn.query(query);
    user = user[0];

    console.log("Loaded Successfully.");

    res.status(200).json({
      status: "Success",
      data: {
        userInfo: user,
      },
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

// 스크랩한 내역 확인
router.get("/scrap", validateAccessToken, async (req, res) => {
  try {
    const userId = req.user;
    conn = await db.getConnection();
    let [scraps] = [];
    let message = "Result Loaded";

    // 스크랩 데이터 조회
    query = `select postId, scrapDate from Scrap where userId = ${userId}`;
    [scraps] = await conn.query(query);

    // 제목, 썸네일 가져오기
    if (scraps[0] !== undefined) {
      for (let i = 0; i < scraps.length; i++) {
        // title
        query = `select title, title_eng, thumbnailImagePath from Contents where postId = ${scraps[i].postId}`;
        let [title] = await conn.query(query);
        title = title[0].title;
        scraps[i].title = title;

        // // thumbnail
        // query = `select imagePath from Contents_Image where postId = ${scraps[i].postId} order by paragraphId asc limit 1`;
        // let [image] = await conn.query(query);
        // // 컨텐츠 내 이미지 존재 여부에 따라 썸네일 결정
        // image = image[0] === undefined ? null : image[0].imagePath;
        // scraps[i].thumbnailPath = image;
      }
    } else {
      scraps = null;
      message = "No Result.";
    }

    console.log("Loaded Successfully.");

    res.status(200).json({
      status: "Success",
      message: message,
      data: scraps,
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

export default router;
