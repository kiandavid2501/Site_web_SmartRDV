
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../utils/constants';

const Navbar = () => {
  const { isAuthenticated, role, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/">SmartRDV</Link>

      <div className="nav-links">
        {!isAuthenticated && (
          <>
            <Link to="/login">Connexion</Link>
            <Link to="/register/client">Inscription Client</Link>
            <Link to="/register/entreprise">Inscription Entreprise</Link>
          </>
        )}

        {isAuthenticated && role === ROLES.CLIENT && (
          <Link to="/client/dashboard">Mon Dashboard</Link>
        )}

        {isAuthenticated && role === ROLES.ENTREPRISE && (
          <Link to="/entreprise/dashboard">Dashboard Entreprise</Link>
        )}

        {isAuthenticated && role === ROLES.ADMIN && (
          <Link to="/admin/dashboard">Dashboard Admin</Link>
        )}

        {isAuthenticated && (
          <button onClick={logout}>Déconnexion</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
