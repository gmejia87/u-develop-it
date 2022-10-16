//import express
const express = require("express");

//PORT designation and app expression
const PORT = process.env.PORT || 3001;
const app = express();

//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//route to handle user requests not supported by app
//default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

//start express server on port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!`);
});
