import api from './api';

// Récupérer toutes les réservations du client
export const getReservations = async () => {
  try {
    const response = await api.get('/reservations');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Erreur lors du chargement des réservations' };
  }
};

// Récupérer une réservation spécifique
export const getReservation = async (id) => {
  try {
    const response = await api.get(`/reservations/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Erreur lors du chargement de la réservation' };
  }
};

// Créer une nouvelle réservation
export const createReservation = async (reservationData) => {
  try {
    const response = await api.post('/reservations', reservationData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Erreur lors de la création de la réservation' };
  }
};

// Modifier une réservation
export const updateReservation = async (id, reservationData) => {
  try {
    const response = await api.put(`/reservations/${id}`, reservationData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Erreur lors de la modification de la réservation' };
  }
};

// Annuler une réservation
export const cancelReservation = async (id) => {
  try {
    const response = await api.delete(`/reservations/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Erreur lors de l\'annulation de la réservation' };
  }
};

// Récupérer les créneaux disponibles pour une entreprise
export const getAvailableSlots = async (entrepriseId, date) => {
  try {
    const response = await api.get(`/reservations/available-slots`, {
      params: { entrepriseId, date }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Erreur lors du chargement des créneaux' };
  }
};