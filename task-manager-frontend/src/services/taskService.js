import api from './api';

const getAllTasks = async () => {
  const response = await api.get('/tasks');
  return response.data;
};

const getTaskById = async (id) => {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
};

const createTask = async (task) => {
  const response = await api.post('/tasks', task);
  return response.data;
};

const updateTask = async (id, task) => {
  const response = await api.put(`/tasks/${id}`, task);
  return response.data;
};

const deleteTask = async (id) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};

const markTaskAsCompleted = async (id) => {
  const response = await api.put(`/tasks/${id}/complete`);
  return response.data;
};

export default {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  markTaskAsCompleted,
};
