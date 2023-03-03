import express from "express";
import db from "../config/db.js";
import strValidate from "../util/strValidate.js";

const router = express.Router();
let conn = null;
let query = "";

router.post("/", async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const content = req.body.content;

    conn = await db.getConnection();

    // 문자열 유효성 검사
    if (!strValidate(name) || !strValidate(email) || !strValidate(content)) {
      conn.release();
      throw new Error("Invalid Input");
    }

    // DB 저장
    query = `insert into Contributes(name, email, content) values("${name}", "${email}", "${content}")`;
    await conn.query(query);

    conn.release();
    console.log("Saved Successfully.");

    // 응답 전달
    res.status(200).send({
      status: "Success",
      message: "Saved Successfully.",
    });
  } catch (err) {
    console.error(err);

    let errCode = 500;
    let errMessage = "Server Error.";

    if (err.message === "Invalid Input") {
      errCode = 404;
      errMessage = err.message;
    }

    res.status(errCode).send({
      status: "Error",
      message: errMessage,
    });
  }
});

export default router;
