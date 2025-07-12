const express = require("express");
const router = express.Router();
const gymController = require("./../controller/gymController");

router.get("/", gymController.index);

module.exports = router;
