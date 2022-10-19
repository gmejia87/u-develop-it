//import express
const express = require("express");
//import db in connection.js
const db = require("./db/connection");
//import api routes
const apiRoutes = require("./routes/apiRoutes");

//PORT designation and app expression
const PORT = process.env.PORT || 3001;
const app = express();

//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//use apiRoutes
app.use("/api", apiRoutes);

//use this to query the database to test connection before more code is written
// db.query(`SELECT * FROM candidates`, (err, rows) => {
//   console.log(rows);
// });

//route to handle user requests not supported by app
//default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

//start server after db connection (changed see note below)
db.connect((err) => {
  if (err) throw err;
  console.log("Database connected.");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

// originally 'start express server on port' was:
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}!`);
// });
