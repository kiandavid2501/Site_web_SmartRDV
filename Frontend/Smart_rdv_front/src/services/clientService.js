import api from './api';

// Récupérer le dashboard client
export const getClientDashboard = async () => {
  try {
    const response = await api.get('/client/dashboard');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Erreur lors du chargement du dashboard' };
  }
};

// Récupérer le profil du client
export const getClientProfile = async () => {
  try {
    const response = await api.get('/client/profile');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Erreur lors du chargement du profil' };
  }
};

// Mettre à jour le profil du client
export const updateClientProfile = async (profileData) => {
  try {
    const response = await api.put('/client/profile', profileData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Erreur lors de la mise à jour du profil' };
  }
};

// Récupérer les entreprises
export const getEntreprises = async (filters = {}) => {
  try {
    const response = await api.get('/client/entreprises', { params: filters });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Erreur lors du chargement des entreprises' };
  }
};

// Récupérer les détails d'une entreprise
export const getEntrepriseDetails = async (id) => {
  try {
    const response = await api.get(`/client/entreprises/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Erreur lors du chargement des détails' };
  }
};