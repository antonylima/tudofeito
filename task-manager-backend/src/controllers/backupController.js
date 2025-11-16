const Task = require("../models/Task");
const Settings = require("../models/Settings");

const exportData = async (req, res) => {
  try {
    const tasks = await Task.getAll();
    const settings = await Settings.getAll();
    
    const exportData = {
      tasks,
      settings,
      exportedAt: new Date().toISOString()
    };
    
    res.status(200).json(exportData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const importData = async (req, res) => {
  try {
    const { tasks, settings } = req.body;
    
    if (!tasks || !settings) {
      return res.status(400).json({ error: "Invalid backup data format" });
    }
    
    // Clear existing data
    await Task.db.execute("DELETE FROM tasks");
    await Settings.db.execute("DELETE FROM settings");
    
    // Import tasks
    for (const task of tasks) {
      await Task.db.execute(`
        INSERT INTO tasks (id, title, description, isUrgent, isCompleted, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [
        task.id,
        task.title,
        task.description,
        task.isUrgent,
        task.isCompleted,
        task.createdAt,
        task.updatedAt
      ]);
    }
    
    // Import settings
    await Settings.update(settings);
    
    res.status(200).json({ message: "Data imported successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  exportData,
  importData,
};