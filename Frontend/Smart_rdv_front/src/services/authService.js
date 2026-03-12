import api from './api';

// Connexion
export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Erreur de connexion' };
  }
};

// Inscription client
export const registerClient = async (clientData) => {
  try {
    const response = await api.post('/auth/register/client', clientData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Erreur lors de l\'inscription' };
  }
};

// Inscription entreprise
export const registerEntreprise = async (entrepriseData) => {
  try {
    const response = await api.post('/auth/register/entreprise', entrepriseData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Erreur lors de l\'inscription' };
  }
};

// Déconnexion
export const logout = async () => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
  }
};

// Vérifier le token
export const verifyToken = async () => {
  try {
    const response = await api.get('/auth/verify');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Réinitialiser le mot de passe
export const resetPassword = async (email) => {
  try {
    const response = await api.post('/auth/reset-password', { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Erreur lors de la réinitialisation' };
  }
};