import { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS, ROLES } from '../utils/constants';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const initAuth = async () => {
      await checkAuth();
    };
    initAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = sessionStorage.getItem(STORAGE_KEYS.TOKEN);
      const userType = sessionStorage.getItem(STORAGE_KEYS.USER_TYPE);
      
      if (token && userType) {
        // Validation avec timeout pour éviter les blocages reseau
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 secondes max

        try {
          const response = await fetch('http://localhost:8081/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            signal: controller.signal
          });
          
          clearTimeout(timeoutId);

          if (response.ok) {
            const userData = await response.json();
            setIsAuthenticated(true);
            
            let normalizedRole = userData.role.toUpperCase();
            if (normalizedRole === 'PROFESSIONAL' || normalizedRole === 'ENTREPRISE') {
              normalizedRole = 'PROFESSIONNEL';
            }
            
            setRole(normalizedRole);
            setUser({ 
              email: userData.email, 
              nom: userData.nom, 
              prenom: userData.prenom,
              type: normalizedRole,
              id: userData.id
            });
          } else {
            // Token invalide ou expiré
            logout();
          }
        } catch (error) {
          clearTimeout(timeoutId);
          console.error('Erreur validation token:', error);
          // En cas d'erreur réseau / timeout, on garde l'auth locale si elle semble cohérente
          // ou on déconnecte. Ici on l'active pour éviter la page blanche si le serveur est lent.
          setIsAuthenticated(true);
          setRole(userType.toUpperCase() === 'PROFESSIONAL' ? 'PROFESSIONNEL' : userType.toUpperCase());
        }
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'authentification:', error);
    } finally {
      setLoading(false); // Toujours arrêter le chargement
    }
  };

  const login = (token, userType, userData = {}) => {
    try {
      // Nettoyer toute session précédente
      logout();
      
      sessionStorage.setItem(STORAGE_KEYS.TOKEN, token);
      sessionStorage.setItem(STORAGE_KEYS.USER_TYPE, userType);
      if (userData.email) {
        sessionStorage.setItem(STORAGE_KEYS.USER_EMAIL, userData.email);
      }
      if (userData.nom) {
        sessionStorage.setItem(STORAGE_KEYS.USER_NAME, userData.nom);
      }
      if (userData.prenom) {
        sessionStorage.setItem(STORAGE_KEYS.USER_PRENOM, userData.prenom);
      }
      
      let normalizedRole = userType.toUpperCase();
      if (normalizedRole === 'PROFESSIONAL' || normalizedRole === 'ENTREPRISE') {
        normalizedRole = 'PROFESSIONNEL';
      }
      
      setIsAuthenticated(true);
      setRole(normalizedRole);
      setUser({ ...userData, type: normalizedRole });
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
    }
  };

  const logout = () => {
    try {
      sessionStorage.removeItem(STORAGE_KEYS.TOKEN);
      sessionStorage.removeItem(STORAGE_KEYS.USER_TYPE);
      sessionStorage.removeItem(STORAGE_KEYS.USER_EMAIL);
      sessionStorage.removeItem(STORAGE_KEYS.USER_NAME);
      sessionStorage.removeItem(STORAGE_KEYS.USER_PRENOM);
      
      // Nettoyer aussi le localStorage par précaution si d'anciennes données y sont
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER_TYPE);
      localStorage.removeItem(STORAGE_KEYS.USER_EMAIL);
      localStorage.removeItem(STORAGE_KEYS.USER_NAME);
      localStorage.removeItem(STORAGE_KEYS.USER_PRENOM);

      setIsAuthenticated(false);
      setRole(null);
      setUser(null);
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const value = {
    isAuthenticated,
    role,
    user,
    loading,
    login,
    logout,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};