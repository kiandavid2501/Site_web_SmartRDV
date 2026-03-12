/**
 * Formater une date au format français
 * @param {string|Date} date - Date à formater
 * @returns {string} Date formatée
 */
export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

/**
 * Formater une date avec le jour de la semaine
 * @param {string|Date} date - Date à formater
 * @returns {string} Date formatée avec jour
 */
export const formatDateWithDay = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

/**
 * Formater une heure
 * @param {string|Date} time - Heure à formater
 * @returns {string} Heure formatée
 */
export const formatTime = (time) => {
  if (!time) return '';
  const d = new Date(time);
  return d.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Vérifier si une date est passée
 * @param {string|Date} date - Date à vérifier
 * @returns {boolean} True si la date est passée
 */
export const isPastDate = (date) => {
  if (!date) return false;
  return new Date(date) < new Date();
};

/**
 * Vérifier si une date est aujourd'hui
 * @param {string|Date} date - Date à vérifier
 * @returns {boolean} True si la date est aujourd'hui
 */
export const isToday = (date) => {
  if (!date) return false;
  const today = new Date();
  const d = new Date(date);
  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
};

/**
 * Obtenir la date actuelle au format ISO (YYYY-MM-DD)
 * @returns {string} Date au format ISO
 */
export const getTodayISO = () => {
  return new Date().toISOString().split('T')[0];
};

/**
 * Ajouter des jours à une date
 * @param {string|Date} date - Date de départ
 * @param {number} days - Nombre de jours à ajouter
 * @returns {Date} Nouvelle date
 */
export const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};