import axios from "axios";
import { STORAGE_KEYS } from "../utils/constants";

// Configuration de base de l'API
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8081/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 secondes
});

// Intercepteur pour ajouter le token à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Intercepteur pour gérer les erreurs globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si le token est invalide ou expiré (401)
    if (error.response?.status === 401) {
      // Nettoyer le sessionStorage
      sessionStorage.removeItem(STORAGE_KEYS.TOKEN);
      sessionStorage.removeItem(STORAGE_KEYS.USER_TYPE);
      sessionStorage.removeItem(STORAGE_KEYS.USER_EMAIL);
      sessionStorage.removeItem(STORAGE_KEYS.USER_NAME);

      // Rediriger vers la page de connexion
      window.location.href = "/login";
    }

    // Si le serveur est inaccessible
    if (error.code === "ECONNABORTED" || error.message === "Network Error") {
      console.error("Erreur de connexion au serveur");
    }

    return Promise.reject(error);
  },
);

export default api;
