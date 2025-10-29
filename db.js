const mysql = require("mysql2");
const db = mysql.createConnection({
  host:"217.21.87.103",
  user: "u205680228_sudishkumar",
  password: "Sudish8021@Db",
  database: "u205680228_eduDev",
  port: process.env.DB_PORT || 3306
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database connection error:", err);
  } else {
    console.log("✅ Database connected successfully!");
    connection.release();
  }
});

module.exports = db.promise();