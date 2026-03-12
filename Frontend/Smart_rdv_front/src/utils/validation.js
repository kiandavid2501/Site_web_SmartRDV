/**
 * Valider un email
 * @param {string} email - Email à valider
 * @returns {boolean} True si l'email est valide
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valider un mot de passe
 * @param {string} password - Mot de passe à valider
 * @returns {object} { valid: boolean, errors: string[] }
 */
export const validatePassword = (password) => {
  const errors = [];
  
  if (!password) {
    errors.push('Le mot de passe est requis');
    return { valid: false, errors };
  }
  
  if (password.length < 8) {
    errors.push('Le mot de passe doit contenir au moins 8 caractères');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins une majuscule');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins une minuscule');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins un chiffre');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

/**
 * Valider un numéro de téléphone français
 * @param {string} phone - Numéro de téléphone à valider
 * @returns {boolean} True si le numéro est valide
 */
export const isValidFrenchPhone = (phone) => {
  // Accepte: 06 12 34 56 78, 0612345678, +33612345678
  const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Valider un SIRET français
 * @param {string} siret - Numéro SIRET à valider
 * @returns {boolean} True si le SIRET est valide
 */
export const isValidSIRET = (siret) => {
  // Enlever les espaces
  const cleanSiret = siret.replace(/\s/g, '');
  
  // Doit contenir 14 chiffres
  if (!/^\d{14}$/.test(cleanSiret)) {
    return false;
  }
  
  // Algorithme de Luhn pour valider le SIRET
  let sum = 0;
  for (let i = 0; i < 14; i++) {
    let digit = parseInt(cleanSiret.charAt(i));
    if (i % 2 === 0) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
  }
  
  return sum % 10 === 0;
};

/**
 * Valider un formulaire d'inscription client
 * @param {object} formData - Données du formulaire
 * @returns {object} { valid: boolean, errors: object }
 */
export const validateClientRegistration = (formData) => {
  const errors = {};
  
  if (!formData.firstName?.trim()) {
    errors.firstName = 'Le prénom est requis';
  }
  
  if (!formData.lastName?.trim()) {
    errors.lastName = 'Le nom est requis';
  }
  
  if (!formData.email) {
    errors.email = 'L\'email est requis';
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'L\'email n\'est pas valide';
  }
  
  if (!formData.phone) {
    errors.phone = 'Le téléphone est requis';
  } else if (!isValidFrenchPhone(formData.phone)) {
    errors.phone = 'Le numéro de téléphone n\'est pas valide';
  }
  
  const passwordValidation = validatePassword(formData.password);
  if (!passwordValidation.valid) {
    errors.password = passwordValidation.errors[0];
  }
  
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Les mots de passe ne correspondent pas';
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Valider un formulaire d'inscription entreprise
 * @param {object} formData - Données du formulaire
 * @returns {object} { valid: boolean, errors: object }
 */
export const validateEntrepriseRegistration = (formData) => {
  const errors = {};
  
  if (!formData.companyName?.trim()) {
    errors.companyName = 'Le nom de l\'entreprise est requis';
  }
  
  if (!formData.companyType) {
    errors.companyType = 'Le type d\'entreprise est requis';
  }
  
  if (!formData.address?.trim()) {
    errors.address = 'L\'adresse est requise';
  }
  
  if (!formData.siret) {
    errors.siret = 'Le SIRET est requis';
  } else if (!isValidSIRET(formData.siret)) {
    errors.siret = 'Le SIRET n\'est pas valide';
  }
  
  if (!formData.email) {
    errors.email = 'L\'email est requis';
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'L\'email n\'est pas valide';
  }
  
  const passwordValidation = validatePassword(formData.password);
  if (!passwordValidation.valid) {
    errors.password = passwordValidation.errors[0];
  }
  
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Les mots de passe ne correspondent pas';
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
};