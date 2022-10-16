//import express
const express = require("express");
//connect to MySQL database
const mysql = require("mysql2");

//PORT designation and app expression
const PORT = process.env.PORT || 3001;
const app = express();

//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connect to database
const db = mysql.createConnection(
  {
    host: "localHost",
    //your MySQL username,
    user: "root",
    //your MySQL password
    password: "Help_1234!",
    database: "election",
  },
  console.log("Connected to the election database.")
);

//route to handle user requests not supported by app
//default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

//query the database to test connection
// db.query(`SELECT * FROM candidates`, (err, rows) => {
//   console.log(rows);
// });

//GET a single candidate
// db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(row);
// });

//Delete a candidate
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

//create a candidate
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
// VALUES (?,?,?,?)`;
// const params = [1, "Ronald", "Firbank", 1];

// db.query(sql, params, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

//start express server on port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!`);
});
