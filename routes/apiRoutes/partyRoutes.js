//import express
const express = require("express");
//import router
const router = express.Router();
//import db connection
const db = require("../../db/connection");

//routes moved from server.js to here,
//make sure all routes must change from 'app.' to 'router.',
//make sure to change paths, aka remove '/api'.

//get all parties
//originally "app.get('/api/parties')"
router.get("/parties", (req, res) => {
  const sql = `SELECT * FROM parties`;

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

//get a single party
//originally "app.get('/api/party/:id')"
router.get("/party/:id", (req, res) => {
  const sql = `SELECT * FROM parties WHERE id = ?`;
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

//delete a party
//originally "app.delete('/api/party/:id')"
router.delete("/party/:id", (req, res) => {
  const sql = `DELETE FROM parties WHERE id =?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
      //checks if anything was deleted
    } else if (!result.affectedRows) {
      res.json({
        messgae: "Party not found",
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
