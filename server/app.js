import express from "express";
import dotenv from "dotenv";
import Content from "./routes/Content.js";

// env
dotenv.config();

// express
const app = express();
app.use(express.json());

// routers
app.use("/content", Content);

const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
