import express from "express";
import db from "../config/db.js";

const router = express.Router();

// 콘텐츠 목록 조회
router.get("/", async (req, res) => {
  try {
    res.send("hello");
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Server Error." });
  }
});

export default router;
