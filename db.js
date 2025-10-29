const mysql = require("mysql2");
const db = mysql.createConnection({
  host:"217.21.87.103",
  user: "u205680228_sudishkumar",
  password: "Sudish8021@Db",
  database: "u205680228_eduDev",
  port: process.env.DB_PORT || 3306
});

db.connect(error =>{
    if(error){
        return console.log("Database connection error" + error);
    }else{
    console.log("Database connected" );
    }
})

module.exports = db;