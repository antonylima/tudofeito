import api from './api';

const exportData = async () => {
  const response = await api.get('/backup/export');
  return response.data;
};

const importData = async (data) => {
  const response = await api.post('/backup/import', data);
  return response.data;
};

export default {
  exportData,
  importData,
};
