const mysql = require("mysql2");

// Create a connection object
const db = mysql.createConnection(
  // Database name
  'employee_db',
  // User
  'root',
  // Password
  'Chris123',
  {
    // Database location
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  }
);

module.exports = db;