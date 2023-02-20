import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

// connect db
const connection = mysql.createPool({
  host: process.env.DATABASE_SPRINT_HOST,
  user: process.env.DATABASE_SPRINT_USER,
  password: process.env.DATABASE_SPRINT_PASSWORD,
  database: process.env.DATABASE_NAME,
});

export default connection;
