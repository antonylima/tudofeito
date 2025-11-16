import { useState, useEffect } from 'react';
import taskService from '../services/taskService';

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getAllTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (task) => {
    try {
      const newTask = await taskService.createTask(task);
      setTasks(prevTasks => [...prevTasks, newTask]);
      return newTask;
    } catch (err) {
      setError(err.message || 'Failed to add task');
      throw err;
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      const task = await taskService.updateTask(id, updatedTask);
      setTasks(prevTasks => 
        prevTasks.map(t => t.id === id ? task : t)
      );
      return task;
    } catch (err) {
      setError(err.message || 'Failed to update task');
      throw err;
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskService.deleteTask(id);
      setTasks(prevTasks => prevTasks.filter(t => t.id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete task');
      throw err;
    }
  };

  const completeTask = async (id) => {
    try {
      const task = await taskService.markTaskAsCompleted(id);
      setTasks(prevTasks => 
        prevTasks.map(t => t.id === id ? task : t)
      );
      return task;
    } catch (err) {
      setError(err.message || 'Failed to complete task');
      throw err;
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
    completeTask,
  };
};

export default useTasks;
