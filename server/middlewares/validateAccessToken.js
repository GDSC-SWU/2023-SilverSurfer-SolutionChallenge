import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import redisCli from "../util/redisCli.js";

dotenv.config();
let userId = "";

function validateAccessToken(req, res, next) {
  const token = req.get("Authorization").split("Bearer ")[1];
  // accessToken 검사 (redis 내 존재 여부)
  try {
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      // jwt 검증 과정에서 error 발생한 경우
      if (err) {
        throw new Error("Invalid Token");
      }

      // Redis 내 user 정보 조회
      userId = await redisCli.get(token);

      if (Number(userId) === user.userId) {
        // Redis 내 토큰 존재
        req.user = Number(userId);
        req.token = token;

        next();
      } else {
        // Redis 내 토큰 미존재
        throw new Error("Invalid User");
      }
    });
  } catch (err) {
    let errCode = 401;
    let errMessage = "Invalid Token";

    if (err.name === "TokenExpireError") {
      errMessage = "Expired Token";
    } else if (err.message === "Invalid User") {
      errCode = 403;
      errMessage = err.message;
    }

    return res.status(errCode).json({
      status: "error",
      message: errMessage,
    });
  }
}

export default validateAccessToken;
