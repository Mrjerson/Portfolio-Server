const express = require("express");
const router = express.Router();
const { getDb } = require("../db/connection");

router.get("/", async (req, res) => {
  try {
    const db = getDb();
    const projects = await db.collection("projects").find().toArray();
    res.json(projects);
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
