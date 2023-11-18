const express = require("express");
const router = express.Router();
const logController = require("./controller");

router.post("/log", logController.addLogs);

router.get("/log", logController.getLogs);

module.exports = router;
