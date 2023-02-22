import express from "express";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
import db from "../config/db.js";
import getJWT from "../util/Jwt.js";
import redisCli from "../util/redisCli.js";
import validateAccessToken from "../middlewares/validateAccessToken.js";

dotenv.config();
const router = express.Router();
const CLIENT_ID = process.env.FE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);
let conn = null;

let user = {};
let sub = "";
let email = "";
let nickname = "";
let profileImage = "";

// 로그인
router.post("/login", async (req, res) => {
  // credential 인증
  try {
    const credential = req.body.credential;
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    sub = payload["sub"];
    email = payload["email"];
    nickname = payload["name"];
    profileImage = payload["picture"];
  } catch (err) {
    console.error(err);
    res.status(403).send({
      status: "Error",
      message: "Invalid Credential",
    });
    return;
  }

  // DB 내 사용자 정보 존재 여부 검사
  try {
    // db 연결 시작
    conn = await db.getConnection();
    const [rows] = await conn.query(
      `select * from Users where googleEmail = "${email}";`
    );

    if (rows.length === 0) {
      // 회원 정보 존재하지 않음 -> 새로 저장
      const query = `insert into Users(googleNickname, googleEmail, googleProfileImagePath) values("${nickname}", "${email}", "${profileImage}");`;
      await conn.query(query);

      const query2 = `select * from Users where googleEmail = "${email}";`;
      const [rows2] = await conn.query(query2);
      user = rows2[0];

      console.log("Saved Successfully.");
    } else {
      // 회원 정보 존재 -> 업데이트
      user = rows[0];
      const query = `update Users set googleNickname="${nickname}", googleProfileImagePath="${profileImage}" where googleEmail="${user.googleEmail}";`;
      await conn.query(query);
      conn.release();

      console.log("Updated Successfully.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: "Error",
      message: "Server Error.",
    });
    conn.release();
    return;
  }

  // accessToken 발급
  try {
    // db 연결 시작
    conn = await db.getConnection();
    const token = getJWT({ sub, nickname, email });

    // Redis 내 토큰 정보 저장 (1 시간)
    await redisCli.set(token, String(user.userId), {
      EX: 60 * 60,
    });

    // 응답 전달
    res.status(200).send({
      status: "Success",
      message: "Signed In Successfully.",
      data: {
        userId: user.userId,
        accessToken: token,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: "Error",
      message: "Server Error.",
    });
  } finally {
    // db 연결 종료
    conn.release();
  }
});

// 로그아웃
router.post("/logout", validateAccessToken, async (req, res) => {
  try {
    // Redis 내 accessToken 정보 삭제
  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: "Error",
      message: "Server Error.",
    });
  }
});

export default router;
