// Use mysql2/promise directly for the cleanest pool interface
const mysql = require("mysql2/promise");

// Configuration details provided by the user (using createPool instead of createConnection)
const poolConfig = {
    host: "217.21.87.103",
    user: "u205680228_sudishkumar",
    password: "Sudish8021@Db",
    database: "u205680228_eduDev",
    port: process.env.DB_PORT || 3306,
    // --- Pool specific settings (Recommended) ---
    waitForConnections: true, // If connections are maxed out, queue new requests
    connectionLimit: 10,     // Max number of simultaneous connections (adjust as needed)
    queueLimit: 0,           // No limit on the queue for waiting requests
    // A slight increase in timeout helps prevent sudden closures, though the pool handles reuse.
    connectTimeout: 20000, 
    acquireTimeout: 20000 
};

// 1. Create a Connection POOL
const db = mysql.createPool(poolConfig);

// 2. Verify the connection pool is working by executing a test query
db.getConnection()
    .then(connection => {
        console.log("Database connected and pool ready.");
        connection.release(); // Release the test connection back to the pool
    })
    .catch(error => {
        console.error("Database connection error (Please check config/credentials):", error.message);
        // You might want to exit the process if the DB connection is critical
        // process.exit(1);
    });


// 3. Export the promise-based POOL object for use in server.js
module.exports = db;
