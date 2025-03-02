const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const contactRoutes = require("./routes/contactRoutes");
const certificates = require("./routes/certificates");
const projects = require("./routes/project");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", contactRoutes);

app.use("/certificates", certificates);

app.use("/projects", projects);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
