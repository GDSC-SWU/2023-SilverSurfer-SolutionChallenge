import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

// connect db
const connection = mysql.createConnection({
  host: process.env.DATABASE_SPRINT_HOST,
  user: process.env.DATABASE_SPRINT_USER,
  password: process.env.DATABASE_SPRINT_PASSWORD,
  database: process.env.DATABASE_NAME,
});

connection.connect();

export default connection;
