const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.getAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.getById(id);
    
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, isUrgent } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }
    
    const task = new Task(title, description, isUrgent);
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const updatedTask = await Task.update(id, updates);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.delete(id);
    res.status(200).json(deletedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const markTaskAsCompleted = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.markAsCompleted(id);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  markTaskAsCompleted,
};