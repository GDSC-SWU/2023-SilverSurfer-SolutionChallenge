import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Content from "./routes/Content.js";
import Auth from "./routes/Auth.js";
import Mypage from "./routes/Mypage.js";
import Search from "./routes/Search.js";
import Contribute from "./routes/Contribute.js";

// env
dotenv.config();

// CORS option
var whitelist = [process.env.CORS_DOMAIN_LOCAL, process.env.CORS_DOMAIN];
var corsOptions = {
  origin: whitelist,
  credentials: true,
};

// express
const app = express();
app.use(express.json());

// CORS
app.use(cors(corsOptions));

// routers
app.use("/content", Content);
app.use("/auth", Auth);
app.use("/mypage", Mypage);
app.use("/search", Search);
app.use("/contribute", Contribute);

const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
