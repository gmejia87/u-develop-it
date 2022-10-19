//import express
const express = require("express");
//import router
const router = express.Router();
//import db connection
const db = require("../../db/connection");
//import inputcheck (moved out completely from server.js to here & voterRoutes)
const inputCheck = require("../../utils/inputCheck");

//routes moved from server.js to here,
//make sure all routes must change from 'app.' to 'router.',
//make sure to change paths, aka remove '/api'.

//get all candidates and their party affiliation
//originally "app.get('/api/candidates')"
router.get("/candidates", (req, res) => {
  const sql = `SELECT candidates.*, parties.name
    AS party_name
    FROM candidates
    LEFT JOIN parties
    ON candidates.party_id = parties.id`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

//get a single candidate with party affiliation
//originally "app.get('/api/candidate/:id')"
router.get("/candidate/:id", (req, res) => {
  const sql = `SELECT candidates.*, parties.name
    AS party_name
    FROM candidates
    LEFT JOIN parties
    ON candidates.party_id = parties.id
    WHERE candidates.id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});

//create a candidate
//originally "app.post('/api/candidate')"
router.post("/candidate", ({ body }, res) => {
  //candidate is allowed not to be affiliated with a party
  const errors = inputCheck(
    body,
    "first_name",
    "last_name",
    "industry_connected"
  );
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
    VALUES (?,?,?)`;
  const params = [
    body.first_name,
    body.last_name,
    body.industry_connected,
    body.party_id,
  ];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: body,
      changes: result.affectedRows,
    });
  });
});

//update a candidate's party
//originally "app.out('/api/candidate/:id')"
router.put("/candidate/:id", (req, res) => {
  //candidate is allowed to not have party affiliation
  const errors = inputCheck(req.body, "party_id");
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `UPDATE candidates SET party_id = ?
    WHERE id = ?`;
  const params = [req.body.party_id, req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      //check if a records was found
    } else if (!result.affectedRows) {
      res.json({
        message: "Candidate not found",
      });
    } else {
      res.json({
        messgae: "successs",
        data: req.body,
        changes: result.affectedRows,
      });
    }
  });
});

//delete a candidate
//originally "app.delete('/api/candidate/:id')"
router.delete("/candidate/:id", (req, res) => {
  const sql = `DELETE FROM candidates WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: "Candidate not found",
      });
    } else {
      res.json({
        message: "deleted",
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});

//export router
module.exports = router;
