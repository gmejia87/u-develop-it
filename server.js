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

//start express server on port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!`);
});
