const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const contactRoutes = require("./routes/contactRoutes");
const certificates = require("./routes/certificates");
const projects = require("./routes/project");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
const { connectToServer } = require("./db/connection");

dotenv.config();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", contactRoutes);

app.use("/certificates", certificates);

app.use("/projects", projects);

connectToServer()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });
