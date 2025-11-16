const { db } = require("../database/db");

class Settings {
  static async getAll() {
    try {
      const result = await db.execute("SELECT * FROM settings");
      const settings = {};
      result.rows.forEach(row => {
        settings[row.key] = row.value;
      });
      return settings;
    } catch (error) {
      throw new Error(`Error fetching settings: ${error.message}`);
    }
  }

  static async update(settings) {
    try {
      const promises = Object.entries(settings).map(([key, value]) => {
        return db.execute({
          sql: `INSERT OR REPLACE INTO settings (key, value)
                VALUES (?1, ?2)`,
          args: [key, value]
        });
      });

      await Promise.all(promises);
      return await Settings.getAll();
    } catch (error) {
      throw new Error(`Error updating settings: ${error.message}`);
    }
  }
}

module.exports = Settings;