//connect to MySQL database
const mysql = require("mysql2");

//connect to database
const db = mysql.createConnection({
  host: "localHost",
  //your MySQL username,
  user: "root",
  //your MySQL password
  password: "Help_1234!",
  database: "election",
});

//export db
module.exports = db;
