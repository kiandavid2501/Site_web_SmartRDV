import api from './api';

export const getEntrepriseDashboard = async () => {
  const response = await api.get('/entreprise/dashboard');
  return response.data;
};