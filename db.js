const mysql = require("mysql2");
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.connect(error =>{
    if(error){
        return console.log("Database connection error" + error);
    }else{
    console.log("Database connected" );
    }
})

module.exports = db;