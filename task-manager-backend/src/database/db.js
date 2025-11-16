const { createClient } = require("@libsql/client");

const db = createClient({
  url: process.env.TURSO_DATABASE_URL || "file:local.db",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// Initialize tables
async function initDb() {
  try {
    // Create tasks table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS tasks (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        isUrgent INTEGER DEFAULT 0,
        isCompleted INTEGER DEFAULT 0,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      )
    `);

    // Create settings table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      )
    `);

    // Insert default settings if they don't exist
    const settings = await db.execute("SELECT * FROM settings");
    if (settings.rows.length === 0) {
      await db.execute("INSERT INTO settings (key, value) VALUES ('theme', 'light')");
      await db.execute("INSERT INTO settings (key, value) VALUES ('dateFormat', 'MM/DD/YYYY')");
    }

    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

module.exports = { db, initDb };