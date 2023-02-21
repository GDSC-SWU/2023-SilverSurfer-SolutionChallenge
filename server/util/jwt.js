import jwt from "jsonwebtoken";

const getJWT = (payload) => {
  const { sub, name, email } = payload;

  const token = jwt.sign(
    {
      id: sub,
      name,
      email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" } // 1 시간 후 만료
  );

  return token;
};

export default getJWT;
