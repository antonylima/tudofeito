const { db } = require("../database/db");
const { v4: uuidv4 } = require("uuid");

class Task {
  constructor(title, description = "", isUrgent = false) {
    this.id = uuidv4();
    this.title = title;
    this.description = description;
    this.isUrgent = isUrgent ? 1 : 0;
    this.isCompleted = 0;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  static async getAll() {
    try {
      const result = await db.execute("SELECT * FROM tasks ORDER BY isCompleted ASC, isUrgent DESC, createdAt ASC");
      return result.rows;
    } catch (error) {
      throw new Error(`Error fetching tasks: ${error.message}`);
    }
  }

  static async getById(id) {
    try {
      const result = await db.execute({
        sql: "SELECT * FROM tasks WHERE id = ?1",
        args: [id]
      });
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error fetching task: ${error.message}`);
    }
  }

  async save() {
    try {
      const result = await db.execute({
        sql: `INSERT INTO tasks (id, title, description, isUrgent, isCompleted, createdAt, updatedAt)
              VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)`,
        args: [
          this.id,
          this.title,
          this.description,
          this.isUrgent,
          this.isCompleted,
          this.createdAt,
          this.updatedAt
        ]
      });
      
      return this;
    } catch (error) {
      throw new Error(`Error creating task: ${error.message}`);
    }
  }

  static async update(id, updates) {
    try {
      const task = await Task.getById(id);
      if (!task) {
        throw new Error("Task not found");
      }

      const { title, description, isUrgent, isCompleted } = updates;
      const updatedAt = new Date().toISOString();

      await db.execute({
        sql: `UPDATE tasks
              SET title = ?1, description = ?2, isUrgent = ?3, isCompleted = ?4, updatedAt = ?5
              WHERE id = ?6`,
        args: [
          title || task.title,
          description !== undefined ? description : task.description,
          isUrgent !== undefined ? (isUrgent ? 1 : 0) : task.isUrgent,
          isCompleted !== undefined ? (isCompleted ? 1 : 0) : task.isCompleted,
          updatedAt,
          id
        ]
      });

      return await Task.getById(id);
    } catch (error) {
      throw new Error(`Error updating task: ${error.message}`);
    }
  }

  static async delete(id) {
    try {
      const task = await Task.getById(id);
      if (!task) {
        throw new Error("Task not found");
      }

      await db.execute({
        sql: "DELETE FROM tasks WHERE id = ?1",
        args: [id]
      });
      return task;
    } catch (error) {
      throw new Error(`Error deleting task: ${error.message}`);
    }
  }

  static async markAsCompleted(id) {
    try {
      const task = await Task.getById(id);
      if (!task) {
        throw new Error("Task not found");
      }

      const updatedAt = new Date().toISOString();
      await db.execute({
        sql: `UPDATE tasks
              SET isCompleted = 1, updatedAt = ?1
              WHERE id = ?2`,
        args: [updatedAt, id]
      });

      return await Task.getById(id);
    } catch (error) {
      throw new Error(`Error marking task as completed: ${error.message}`);
    }
  }
}

module.exports = Task;