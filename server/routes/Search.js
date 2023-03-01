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
    const check = /^[가-힣a-zA-Z\s]+$/;
    let message = "Result Loaded.";

    // 입력값 유효성 검사
    if (search === null || search === "" || !check.test(search)) {
      result = null;
      message = "No Result.";
    } else {
      // 타이틀, 설명 내 검색
      query = `select postId, title, explanation from Contents
            where   category like "%${search}%" or 
                    title like "%${search}%" or
                    explanation like "%${search}%" or
                    content like "%${search}%"`;
      [result] = await conn.query(query);
    }

    if (result !== null && result[0] !== undefined) {
      // 검색 결과가 존재할 경우 -> 썸네일 이미지 조회
      for (let i = 0; i < result.length; i++) {
        query = `select imagePath from Contents_Image where postId = ${result[i].postId} order by paragraphId asc limit 1`;
        const [imageRows] = await conn.query(query);

        if (imageRows[0]) {
          result[i].thumbnailPath = imageRows[0].imagePath;
        } else {
          result[i].thumbnailPath = null;
        }
      }
    } else {
      // 검색 결과 없음
      result = null;
      message = "No Result.";
    }

    // 응답 전송
    res.status(200).json({
      status: "Success",
      message: message,
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
    const check = /^[가-힣a-zA-Z\s]+$/;
    let message = "Result Loaded.";

    // 입력값 유효성 검사
    if (search === null || search === "" || !check.test(search)) {
      result = null;
      message = "No Result.";
    } else {
      // 조회 수 가장 높은 결과 선택
      query = `select title from Contents where title like "%${search}%" order by viewCount desc limit 1`;
      [result] = await conn.query(query);
    }

    if (result !== null && result[0] !== undefined) {
      // 자동완성 결과가 존재
      result = result[0].title;
    } else {
      // 자동완성 결과가 없음
      result = null;
      message = "No Result.";
    }

    // 응답 전송
    res.status(200).json({
      status: "Success",
      message: message,
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
