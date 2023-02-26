import express from "express";
import db from "../config/db.js";
import validateAccessToken from "../middlewares/validateAccessToken.js";

const router = express.Router();
let conn = null;
let query = "";

// 검색 결과 조회
router.get("/", async (req, res) => {
  try {
    const search = req.query.search;
    conn = await db.getConnection();
    let [result] = [];

    // 기본 썸네일 설정 (메인 컬러 민무늬 이미지)
    query =
      "select imagePath from Contents_Image where detail = '메인 컬러' limit 1;";
    let [defaultThumbnail] = await conn.query(query);
    defaultThumbnail = defaultThumbnail[0].imagePath;

    // 타이틀, 설명 내 검색
    query = `select postId, title, explanation from Contents
            where   category like "%${search}%" or 
                    title like "%${search}%" or
                    explanation like "%${search}%" or
                    content like "%${search}%"`;
    [result] = await conn.query(query);

    if (result[0] !== undefined) {
      // 검색 결과가 존재할 경우 -> 썸네일 이미지 조회
      for (let i = 0; i < result.length; i++) {
        query = `select imagePath from Contents_Image where postId = ${result[i].postId} order by paragraphId asc limit 1`;
        const [imageRows] = await conn.query(query);

        if (imageRows[0]) {
          result[i].thumbnailPath = imageRows[0].imagePath;
        } else {
          result[i].thumbnailPath = defaultThumbnail;
        }
      }
    } else {
      // 검색 결과 없음
      result = null;
    }

    // 응답 전송
    res.status(200).json({
      status: "Success",
      data: result,
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

// 검색어 자동완성
router.get("/auto", async (req, res) => {
  try {
    const search = req.body.search;
    conn = await db.getConnection();
    let [result] = [];

    // 조회 수 가장 높은 결과 선택
    query = `select title from Contents where title like "%${search}%" order by viewCount desc limit 1`;
    [result] = await conn.query(query);

    if (result[0] !== undefined) {
      // 자동완성 결과가 존재
      result = result[0].title;
    } else {
      // 자동완성 결과가 없음
      result = null;
    }

    // 응답 전송
    res.status(200).json({
      status: "Success",
      data: result,
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
