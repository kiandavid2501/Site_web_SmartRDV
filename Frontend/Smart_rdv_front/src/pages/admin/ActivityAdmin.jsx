import { useNavigate } from 'react-router-dom';
import SidebarAdmin from '../../components/layout/SidebarAdmin';
import { 
  Activity, 
  ArrowLeft, 
  UserPlus, 
  CheckCircle2, 
  Search, 
  Filter,
  Calendar as CalendarIcon,
  ShoppingBag,
  AlertCircle
} from 'lucide-react';
import './ActivityAdmin.css';

const ActivityAdmin = () => {
  const navigate = useNavigate();

  const activities = [
    { id: 1, type: 'user', icon: UserPlus, color: 'icon-blue', title: 'Inscription Client', desc: "Jean Dupont s'est inscrit sur la plateforme.", time: 'Il y a 5 min' },
    { id: 2, type: 'validation', icon: CheckCircle2, color: 'icon-green', title: 'Validation Pro', desc: "Dr. Simon (Ostéopathe) a été validé.", time: 'Il y a 15 min' },
    { id: 3, type: 'booking', icon: Activity, color: 'icon-purple', title: 'Nouveau Rendez-vous', desc: "Nouvelle réservation chez Garage Pro par Marie L.", time: 'Il y a 22 min' },
    { id: 4, type: 'alert', icon: AlertCircle, color: 'icon-orange', title: 'Alerte Système', desc: "Pic de trafic détecté sur le serveur principal.", time: 'Il y a 45 min' },
    { id: 5, type: 'user', icon: UserPlus, color: 'icon-blue', title: 'Inscription Pro', desc: "Salon 'Beauté Zen' a soumis son dossier.", time: 'Il y a 1h' },
    { id: 6, type: 'booking', icon: Activity, color: 'icon-purple', title: 'Rendez-vous', desc: "Réservation confirmée pour Pierre R. chez Dentiste ABC.", time: 'Il y a 2h' },
    { id: 7, type: 'validation', icon: CheckCircle2, color: 'icon-green', title: 'Catégorie Ajoutée', desc: "Nouvelle catégorie 'Massage' créée par Admin.", time: 'Il y a 3h' },
    { id: 8, type: 'user', icon: UserPlus, color: 'icon-blue', title: 'Inscription Client', desc: "Sophie Martin a rejoint la plateforme.", time: 'Il y a 4h' },
  ];

  return (
    <div className="admin-dashboard">
      <div className="admin-layout">
        <SidebarAdmin />
        
        <main className="admin-main-content">
          <div className="admin-container">
            <header className="admin-header">
              <div className="header-left">
                <button onClick={() => navigate('/admin/dashboard')} className="btn-back">
                  <ArrowLeft size={18} />
                </button>
                <div>
                  <h1 className="admin-title">Journal d'Activité</h1>
                  <p className="admin-subtitle">Historique complet des événements de la plateforme</p>
                </div>
              </div>
              
              <div className="activity-actions">
                <div className="search-bar">
                  <Search size={18} />
                  <input type="text" placeholder="Rechercher un événement..." />
                </div>
                <button className="btn-filter">
                  <Filter size={18} />
                  <span>Filtrer</span>
                </button>
              </div>
            </header>

            <div className="activity-log-card">
              <div className="activity-log-header">
                <h3>Événements récents</h3>
                <div className="date-picker-mock">
                  <CalendarIcon size={16} />
                  <span>Aujourd'hui, 01 Fév 2026</span>
                </div>
              </div>

              <div className="full-activity-list">
                {activities.map((act) => (
                  <div key={act.id} className="activity-row">
                    <div className={`activity-icon-col ${act.color}`}>
                      <act.icon size={20} />
                    </div>
                    <div className="activity-info-col">
                      <h4>{act.title}</h4>
                      <p>{act.desc}</p>
                    </div>
                    <div className="activity-time-col">
                      <span>{act.time}</span>
                    </div>
                    <div className="activity-action-col">
                      <button className="btn-detail">Détails</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="activity-footer">
                <button className="btn-load-more">Charger plus d'activités</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ActivityAdmin;
