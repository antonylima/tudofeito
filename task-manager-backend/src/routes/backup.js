const express = require("express");
const router = express.Router();
const {
  exportData,
  importData,
} = require("../controllers/backupController");

router.get("/export", exportData);
router.post("/import", importData);

module.exports = router;