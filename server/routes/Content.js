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

// 컨텐츠 목록 조회 (핵심 가이드라인)
router.get("/key", async (req, res) => {
  try {
    conn = await db.getConnection();
    query =
      "select postId, content, explanation from Contents where category = '핵심가이드라인';";
    const [rows] = await conn.query(query);

    // 기본 썸네일 설정 (메인 컬러 민무늬 이미지)
    query =
      "select imagePath from Contents_Image where detail = '메인 컬러' limit 1;";
    let [defaultThumbnail] = await conn.query(query);
    defaultThumbnail = defaultThumbnail[0].imagePath;

    if (rows.length === 0) {
      // 컨텐츠가 존재하지 않을 경우 -> 오류
      throw new Error("Invalid Database Access");
    }

    // 썸네일 탐색
    for (let i = 0; i < rows.length; i++) {
      query = `select paragraphId, imagePath from Contents_Image where postId = ${rows[i].postId} order by paragraphId asc limit 1`;
      const [imageRows] = await conn.query(query);

      if (imageRows[0]) {
        rows[i].thumbnailPath = imageRows[0].imagePath;
      } else {
        rows[i].thumbnailPath = defaultThumbnail;
      }
    }

    console.log("Successfully Completed.");
    res.status(200).json({
      status: "Success",
      data: rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: "Error",
      message: "Server Error.",
    });
  } finally {
    conn.release();
  }
});

// 콘텐츠 세부 조회

export default router;
