import jwt from "jsonwebtoken";

const getJWT = (payload) => {
  const { userId, name, email } = payload;

  const token = jwt.sign(
    {
      userId,
      name,
      email,
    },
    process.env.JWT_SECRET,
    { expiresIn: 60 * 60 } // 1 시간 후 만료
  );

  return token;
};

export default getJWT;
