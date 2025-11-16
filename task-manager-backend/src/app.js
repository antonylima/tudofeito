const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/tasks");
const settingsRoutes = require("./routes/settings");
const backupRoutes = require("./routes/backup");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/backup", backupRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;