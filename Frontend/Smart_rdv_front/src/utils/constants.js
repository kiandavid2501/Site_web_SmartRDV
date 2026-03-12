// Rôles des utilisateurs
export const ROLES = {
  ADMIN: 'ADMIN',
  CLIENT: 'CLIENT',
  ENTREPRISE: 'PROFESSIONNEL', // Map to Backend Role Enum name
};

// Clés de stockage local
export const STORAGE_KEYS = {
  TOKEN: 'smartRDV_token',
  USER: 'smartRDV_user',
  USER_TYPE: 'smartRDV_userType',
  USER_EMAIL: 'smartRDV_userEmail',
  USER_NAME: 'smartRDV_userName',
  USER_PRENOM: 'smartRDV_userPrenom',
};

// Statuts de réservation
export const RESERVATION_STATUS = {
  CONFIRMEE: 'confirmee',
  EN_ATTENTE: 'en_attente',
  ANNULEE: 'annulee',
};

// Types d'entreprises
export const COMPANY_TYPES = {
  BANK: 'bank',
  HEALTH: 'health',
  TRAINING: 'training',
  ADMINISTRATION: 'administration',
  BEAUTY: 'beauty',
  OTHER: 'other',
};

// Labels des types d'entreprises
export const COMPANY_TYPE_LABELS = {
  [COMPANY_TYPES.BANK]: 'Banque',
  [COMPANY_TYPES.HEALTH]: 'Santé',
  [COMPANY_TYPES.TRAINING]: 'Formation',
  [COMPANY_TYPES.ADMINISTRATION]: 'Administration',
  [COMPANY_TYPES.BEAUTY]: 'Beauté & Bien-être',
  [COMPANY_TYPES.OTHER]: 'Autre',
};