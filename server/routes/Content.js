import express from "express";
import db from "../config/db.js";

const router = express.Router();
let conn = null;

// 콘텐츠 목록 조회 (이미지, 타이틀, 설명)
router.get("/", async (req, res) => {
  try {
    conn = await db.getConnection();
    const [rows] = await conn.query(
      "select postId, title, explanation from Contents;"
    );

    //console.log(rows[0].postId);
    res.send(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Server Error." });
  } finally {
    conn.release();
  }
});

export default router;
