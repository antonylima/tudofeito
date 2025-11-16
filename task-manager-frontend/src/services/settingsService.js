import api from './api';

const getSettings = async () => {
  const response = await api.get('/settings');
  return response.data;
};

const updateSettings = async (settings) => {
  const response = await api.put('/settings', settings);
  return response.data;
};

export default {
  getSettings,
  updateSettings,
};
