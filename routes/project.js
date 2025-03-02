const express = require("express");
const router = express.Router();
const db = require("../db/connection");

router.get("/", async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM projects");
    res.json(results);
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
