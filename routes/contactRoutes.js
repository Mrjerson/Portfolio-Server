const express = require("express");
const axios = require("axios");
const { body, validationResult } = require("express-validator");
const rateLimit = require("express-rate-limit");
const router = express.Router();

// Rate limiter for the contact route
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Allow 5 requests per IP in 15 minutes
  message: "Too many submissions from this IP, please try again later.",
});

// Apply the rate limiter to the contact route
router.post(
  "/contact",
  contactLimiter, // Add the rate limiter here
  [
    body("name").trim().notEmpty().escape(),
    body("email").trim().isEmail().normalizeEmail(),
    body("message").trim().notEmpty().escape(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, message } = req.body;

    // Discord webhook URL (store this in .env)
    const webhookURL = process.env.DISCORD_WEBHOOK_URL;

    // Create the payload to send to Discord
    const discordPayload = {
      content: `New Contact Form Submission:\n**Name:** ${name}\n**Email:** ${email}\n**Message:** ${message}`,
    };

    try {
      // Send the payload to the Discord webhook
      await axios.post(webhookURL, discordPayload);
      res
        .status(200)
        .json({ success: true, message: "Form submitted successfully!" });
    } catch (error) {
      console.error("Error sending to Discord:", error);
      res.status(500).json({ error: "Failed to submit form" });
    }
  }
);

module.exports = router;
