import express from "express";
import dotenv from "dotenv";
import Content from "./routes/Content.js";
import Auth from "./routes/Auth.js";
import Mypage from "./routes/Mypage.js";
import Search from "./routes/Search.js";
import Contribute from "./routes/Contribute.js";

// env
dotenv.config();

// express
const app = express();
app.use(express.json());

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
