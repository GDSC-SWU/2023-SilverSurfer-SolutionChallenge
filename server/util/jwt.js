import jwt from "jsonwebtoken";

const getJWT = (payload) => {
  const { sub, name, email } = payload;

  const token = jwt.sign(
    {
      id: sub,
      name,
      email,
    },
    process.env.JWT_SECRET
  );

  return token;
};

export default getJWT;
