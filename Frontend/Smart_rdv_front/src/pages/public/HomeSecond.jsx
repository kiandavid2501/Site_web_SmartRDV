import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../utils/constants';
import { Calendar, User, Building2, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import './HomeSecond.css';

const HomeSecond = () => {
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
    <div className="home-second-container">
      <div className="home-second-content">
        {/* Header */}
        <div className="home-second-header">
          <button onClick={() => navigate('/')} className="back-link">
            <ArrowLeft size={20} /> Retour à l'accueil
          </button>
          
          <div className="logo-badge">
            <Calendar className="logo-icon-sm" />
          </div>
          
          <h1 className="page-title">Bienvenue sur <span className="text-gradient">SmartRDV</span></h1>
          <p className="page-subtitle">
            Pour commencer, dites-nous qui vous êtes. <br/>
            Cette étape nous permet de personnaliser votre expérience.
          </p>
        </div>

        {/* Selection Cards */}
        <div className="selection-grid">
          {/* Client Card */}
          <div className="selection-card client-card">
            <div className="card-badge client-badge">Client</div>
            <div className="icon-box client-icon-box">
              <User size={40} />
            </div>
            <h2 className="selection-title">Je veux prendre rendez-vous</h2>
            <p className="selection-desc">
              Trouvez un professionnel et réservez un créneau en quelques secondes.
            </p>
            
            <ul className="benefits-list">
              <li><CheckCircle size={16} /> Réservation instantanée</li>
              <li><CheckCircle size={16} /> Historique des rendez-vous</li>
              <li><CheckCircle size={16} /> Rappels automatiques</li>
            </ul>

            <button onClick={() => navigate('/register/client')} className="action-btn client-btn">
              Créer mon compte Client <ArrowRight size={18} />
            </button>
          </div>

          {/* Enterprise Card */}
          <div className="selection-card enterprise-card">
            <div className="card-badge enterprise-badge">Entreprise</div>
            <div className="icon-box enterprise-icon-box">
              <Building2 size={40} />
            </div>
            <h2 className="selection-title">Je veux gérer mon activité</h2>
            <p className="selection-desc">
              Gérez votre planning, vos clients et développez votre activité.
            </p>
            
            <ul className="benefits-list">
              <li><CheckCircle size={16} /> Gestion de planning</li>
              <li><CheckCircle size={16} /> Fichier clients</li>
              <li><CheckCircle size={16} /> Statistiques d'activité</li>
            </ul>

            <button onClick={() => navigate('/register/entreprise')} className="action-btn enterprise-btn">
              Inscrire mon Entreprise <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Footer Link */}
        <div className="login-prompt">
          <p>
            Déjà inscrit ? 
            <button onClick={() => navigate('/login')} className="login-link-btn">
              Se connecter
            </button>
          </p>
        </div>
      </div>
      
      {/* Background Shapes */}
      <div className="background-shapes">
        <div className="shape shape-primary"></div>
        <div className="shape shape-secondary"></div>
      </div>
    </div>
  );
};

export default HomeSecond;