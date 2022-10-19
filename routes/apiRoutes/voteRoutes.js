//import express
const express = require("express");
//import router
const router = express.Router();
//import db connection
const db = require("../../db/connection");
//import inputcheck (moved out completely from server.js now here, candidateRoutes & voterRoutes)
const inputCheck = require("../../utils/inputCheck");

router.post("/vote", ({ body }, res) => {
  //data validation
  const errors = inputCheck(body, "voter_id", "candidate_id");
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO votes (voter_id, candidate_id) VALUES (?,?)`;
  const params = [body.voter_id, body.candidate_id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      data: body,
      changes: result.affectedRows,
    });
  });
});

//export the router
module.exports = router;
