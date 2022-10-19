//import express
const express = require("express");
//import router
const router = express.Router();

//route candidates
router.use(require("./candidateRoutes"));
//route parties
router.use(require("./partyRoutes"));
//route voter
router.use(require("./voterRoutes"));
//route votes
router.use(require("./voteRoutes"));

//export router
module.exports = router;
