import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../utils/constants';
import { Calendar, User, Building2, CheckCircle, Shield, ArrowRight, Star } from 'lucide-react';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, role } = useAuth();

  const redirectByRole = () => {
    switch(role) {
      case ROLES.ADMIN: return '/admin/dashboard';
      case ROLES.ENTREPRISE: return '/entreprise/dashboard';
      case ROLES.CLIENT: return '/client/dashboard';
      default: return '/';
    }
  };

  return (
    <div className="home-container">
      {/* Navbar simplifiée */}
      <nav className="home-nav">
        <div className="nav-logo">
          <Calendar className="nav-logo-icon" />
          <span className="nav-logo-text">SmartRDV</span>
        </div>
        <div className="nav-actions">
          <button onClick={() => navigate('/login')} className="nav-link">Connexion</button>
          <button onClick={() => navigate('/home-second')} className="nav-btn-primary">S'inscrire</button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <Star className="hero-badge-icon" size={16} />
            <span>La référence de la prise de rendez-vous</span>
          </div>
          <h1 className="hero-title">
            Simplifiez vos <span className="text-gradient">Rendez-vous</span>,<br />
            Optimisez votre <span className="text-gradient">Temps</span>
          </h1>
          <p className="hero-subtitle">
            La plateforme intelligente qui connecte clients et professionnels en toute simplicité.
            Gestion de planning, rappels automatiques et bien plus encore.
          </p>
          <div className="hero-actions">
            <button onClick={() => navigate('/home-second')} className="btn-primary-lg">
              Commencer maintenant <ArrowRight size={20} />
            </button>
            <button onClick={() => navigate('/login')} className="btn-secondary-lg">
              Se connecter
            </button>
          </div>
        </div>
        
        {/* Abstract Background Elements */}
        <div className="hero-background-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </header>



      {/* Features Section */}
      <section className="features-showcase">
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon-box">
              <CheckCircle size={24} />
            </div>
            <div>
              <h3>Disponibilité 24/7</h3>
              <p>Vos clients peuvent réserver à tout moment, même lorsque vous dormez.</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon-box">
              <CheckCircle size={24} />
            </div>
            <div>
              <h3>Rappels Automatiques</h3>
              <p>Réduisez les oublis grâce aux notifications SMS et Email automatiques.</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon-box">
              <CheckCircle size={24} />
            </div>
            <div>
              <h3>Gestion Simplifiée</h3>
              <p>Une interface intuitive pour gérer votre emploi du temps sans effort.</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon-box">
              <CheckCircle size={24} />
            </div>
            <div>
              <h3>Statistiques Détaillées</h3>
              <p>Suivez l'évolution de votre activité avec des tableaux de bord précis.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <Calendar size={24} />
            <span>SmartRDV</span>
          </div>
          <p className="copyright">© 2026 SmartRDV. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;