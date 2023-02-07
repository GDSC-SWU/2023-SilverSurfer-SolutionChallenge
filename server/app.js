import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.get("/", (req, res) => {
  res.send("hello babel");
});

const port = process.env.SERVER_PORT;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
