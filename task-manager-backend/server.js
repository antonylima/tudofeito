require("dotenv").config();
const app = require("./src/app");
const { initDb } = require("./src/database/db");

const PORT = process.env.PORT || 5000;

// Initialize database and start server
initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(error => {
  console.error("Failed to initialize database:", error);
  process.exit(1);
});