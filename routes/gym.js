const express = require("express");
const router = express.Router();
const gymController = require("./../controller/gymController");

router.get("/", gymController.index);

router.get("/:email", gymController.show);
module.exports = router;
