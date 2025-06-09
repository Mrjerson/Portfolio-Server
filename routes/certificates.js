const express = require("express");
const router = express.Router();
const { getDb } = require("../db/connection");

router.get("/", async (req, res) => {
  try {
    const db = getDb();
    const certificates = await db.collection("certificates").find().toArray();
    res.json(certificates);
  } catch (err) {
    console.error("Error fetching certificates:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
