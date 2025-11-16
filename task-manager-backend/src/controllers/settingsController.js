const Settings = require("../models/Settings");

const getSettings = async (req, res) => {
  try {
    const settings = await Settings.getAll();
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSettings = async (req, res) => {
  try {
    const settings = req.body;
    const updatedSettings = await Settings.update(settings);
    res.status(200).json(updatedSettings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getSettings,
  updateSettings,
};