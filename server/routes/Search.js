import express from "express";
import db from "../config/db.js";

const router = express.Router();
let conn = null;
let query = "";

// 검색 결과 조회
router.get("/", async (req, res) => {
  try {
    const search = req.query.search;
    conn = await db.getConnection();
    let [result] = [];
    const check = /^[0-9가-힣a-zA-Z\s]+$/; // 숫자, 완성형 한글, 영문, 띄어쓰기
    let message = "Result Loaded.";

    // 입력값 유효성 검사
    if (
      search === null ||
      search === "" ||
      search === " " ||
      !check.test(search)
    ) {
      result = null;
      message = "No Result.";
    } else {
      // 타이틀, 설명 내 검색
      query = `select postId, title, title_eng, explanation, thumbnailImagePath from Contents
            where   category like "%${search}%" or 
                    title like "%${search}%" or
                    title_eng like "%${search}%" or
                    explanation like "%${search}%"`;
      [result] = await conn.query(query);
    }

    if (result[0] === undefined) {
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
  conn = await db.getConnection();
  try {
    const search = req.query.search;
    let result = [];
    const check = /^[0-9가-힣a-zA-Z\s]+$/; // 숫자, 완성형 한글, 영문, 띄어쓰기
    let message = "Result Loaded.";

    // 입력값 유효성 검사
    if (
      search === null ||
      search === "" ||
      search === " " ||
      !check.test(search)
    ) {
      result = null;
      message = "No Result.";
    } else {
      // 제목들 중 조회 수 가장 높은 결과 선택
      // 한글 제목
      query = `select title from Contents where title like "%${search}%" order by viewCount desc`;
      const korResult = await conn.query(query);

      if (korResult[0][0] !== undefined) {
        for (let i = 0; i < korResult[0].length; i++) {
          result.push(korResult[0][i].title);
        }
      }

      // 영문 제목
      query = `select title_eng from Contents where title_eng like "%${search}%" order by viewCount desc`;
      const engResult = await conn.query(query);

      if (engResult[0][0] !== undefined) {
        for (let i = 0; i < engResult[0].length; i++) {
          result.push(engResult[0][i].title_eng);
        }
      }

      // 카테고리
      const categories = ["UX 가이드라인", "스타일", "컴포넌트"];
      categories.map((item) => {
        const isIncluded = item.includes(search);
        if (isIncluded) {
          result.push(item);
        }
      });
    }

    if (!result[0]) {
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
