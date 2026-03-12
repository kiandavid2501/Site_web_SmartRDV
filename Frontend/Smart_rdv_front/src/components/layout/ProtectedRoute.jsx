import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, role: userRole, loading } = useAuth();

  // Attendre que l'authentification soit vérifiée
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '24px'
      }}>
        Chargement...
      </div>
    );
  }

  // Si pas authentifié, rediriger vers login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si le rôle requis ne correspond pas au rôle de l'utilisateur
  if (role && userRole !== role) {
    // Rediriger vers le dashboard approprié
    let dashboardPath = '/';
    if (userRole === 'ADMIN') dashboardPath = '/admin/dashboard';
    else if (userRole === 'PROFESSIONNEL') dashboardPath = '/entreprise/dashboard';
    else if (userRole === 'CLIENT') dashboardPath = '/client/dashboard';
    
    return <Navigate to={dashboardPath} replace />;
  }

  // Tout est OK, afficher le contenu protégé
  return children;
};

export default ProtectedRoute;