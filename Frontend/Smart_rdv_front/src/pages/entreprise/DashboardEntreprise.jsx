import { useState, useEffect } from 'react';
import SidebarEntreprise from '../../components/layout/SidebarEntreprise';
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  Clock, 
  PlusCircle, 
  CheckCircle2, 
  XCircle, 
  MoreVertical,
  ChevronRight,
  Filter,
  Zap,
  Activity,
  ChevronLeft,
  Star
} from 'lucide-react';
import './DashboardEntreprise.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const DashboardEntreprise = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);

  const enterpriseName = user?.nom || user?.email?.split('@')[0] || "Mon Entreprise";

  const stats = [
    { label: "RDV du jour", value: "8", trend: "+25%", icon: <Clock size={24} />, color: "#2563eb", tint: "blue-tint" },
    { label: "Taux d'occupation", value: "88%", trend: "+5%", icon: <Activity size={24} />, color: "#4f46e5", tint: "purple-tint" },
    { label: "Nouveaux Clients", value: "12", trend: "+12%", icon: <Users size={24} />, color: "#10b981", tint: "green-tint" },
    { label: "Annulations", value: "2", trend: "-15%", icon: <XCircle size={24} />, color: "#ef4444", tint: "orange-tint" },
  ];

  const popularServices = [
    { name: "Consultation Standard", count: 45, color: "#3b82f6" },
    { name: "Expertise Technique", count: 32, color: "#8b5cf6" },
    { name: "Suivi Dossier", count: 28, color: "#10b981" },
    { name: "Premier RDV", count: 21, color: "#f59e0b" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveServiceIndex((prev) => (prev + 1) % popularServices.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const alerts = [
    { id: 1, type: 'urgent', text: "Rendez-vous imminent : Jean Dupont à 14:30", icon: <Zap size={20} /> },
    { id: 2, type: 'warning', text: "Optimisation : 3 nouveaux créneaux disponibles demain", icon: <Calendar size={20} /> },
  ];

  const todayAppointments = [
    { id: 1, client: "Jean Dupont", service: "Consultation Premium", time: "14:30", status: "confirmed", avatar: "JD", imminent: true },
    { id: 2, client: "Marie Louise", service: "Audit Stratégique", time: "16:00", status: "pending", avatar: "ML" },
    { id: 3, client: "Robert Martin", service: "Expertise Conseil", time: "17:30", status: "confirmed", avatar: "RM" },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return <span className="status-badge" style={{ color: '#059669', background: '#ecfdf5', padding: '0.5rem 1rem', borderRadius: '2rem', fontSize: '0.85rem', fontWeight: '800' }}>Confirmé</span>;
      case 'pending':
        return <span className="status-badge" style={{ color: '#d97706', background: '#fffbeb', padding: '0.5rem 1rem', borderRadius: '2rem', fontSize: '0.85rem', fontWeight: '800' }}>En attente</span>;
      default:
        return <span className="status-badge" style={{ color: '#dc2626', background: '#fef2f2', padding: '0.5rem 1rem', borderRadius: '2rem', fontSize: '0.85rem', fontWeight: '800' }}>Annulé</span>;
    }
  };

  return (
    <div className="dashboard-entreprise">
      <div style={{ display: 'flex' }}>
        <SidebarEntreprise />

        <main className="dashboard-main-area">
          <div className="dashboard-content">

            {/* Header */}
            <header className="dashboard-header-section">
              <div className="header-info">
                <p className="dashboard-subtitle">RAVI DE VOUS REVOIR 👋</p>
                <h1 className="dashboard-title">{enterpriseName}</h1>
              </div>
              <div className="header-actions" style={{ display: 'flex', gap: '1rem' }}>
                <button className="btn-secondary" onClick={() => navigate('/entreprise/stats')}>
                  <Filter size={20} /> Rapports
                </button>
                <button className="btn-primary-pro" onClick={() => navigate('/entreprise/planning')}>
                  <PlusCircle size={22} /> Nouveau Créneau
                </button>
              </div>
            </header>

            {/* Alerts */}
            {alerts.length > 0 && (
              <div className="alerts-container">
                {alerts.map(alert => (
                  <div key={alert.id} className={`alert-item ${alert.type}`}>
                    {alert.icon}
                    <span>{alert.text}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Statistics */}
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className={`stat-card ${stat.tint}`}>
                  <div className="stat-header">
                    <div className="stat-icon-bg" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                      {stat.icon}
                    </div>
                    <span className={`stat-trend ${stat.trend.startsWith('+') ? 'up' : 'down'}`}>
                      {stat.trend}
                    </span>
                  </div>
                  <div className="stat-body">
                    <p className="stat-value">{stat.value}</p>
                    <p className="stat-label">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Layout */}
            <div className="dashboard-grid-layout">

              <div className="main-content-column">
                <div className="agenda-card">
                  <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 className="card-title">Agenda d'aujourd'hui</h2>
                    <button className="btn-text" onClick={() => navigate('/entreprise/reservations')} style={{ color: '#2563eb', fontWeight: '800', border: 'none', background: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '1rem' }}>
                      Tout voir <ChevronRight size={20} />
                    </button>
                  </div>

                  <div className="appointments-list">
                    {todayAppointments.map((apt) => (
                      <div key={apt.id} className={`appointment-item ${apt.imminent ? 'imminent' : ''}`}>
                        <div className="apt-time-column" style={{ width: '110px', flexShrink: 0 }}>
                          <span className="apt-time">{apt.time}</span>
                        </div>

                        <div className="apt-main-info" style={{ display: 'flex', flex: 1, justifyContent: 'space-between', alignItems: 'center', paddingLeft: '2rem' }}>
                          <div className="apt-client-profile" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                            <div className="apt-avatar" style={{ backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '1.25rem' }}>{apt.avatar}</div>
                            <div>
                              <p className="apt-client-name" style={{ fontSize: '1.35rem', fontWeight: '800' }}>{apt.client} {apt.imminent && '⚡'}</p>
                              <p className="apt-service-type" style={{ color: '#64748b', fontWeight: '600', fontSize: '1rem' }}>{apt.service}</p>
                            </div>
                          </div>

                          <div className="apt-controls" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                            {getStatusBadge(apt.status)}
                            <button className="btn-more" style={{ color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer' }}><MoreVertical size={28} /></button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="card-footer" style={{ padding: '2.5rem 3rem', background: '#f8fafc', borderTop: '1px solid #f1f5f9' }}>
                    <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center', borderRadius: '1.25rem' }} onClick={() => navigate('/entreprise/reservations')}>
                      Gérer tous les rendez-vous
                    </button>
                  </div>
                </div>
              </div>

              <div className="side-content-column">
                {/* Cyclical Stats: Services les Plus Demandés */}
                <div className="activity-card" style={{ marginBottom: '2.5rem', minHeight: '300px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: '950', margin: 0 }}>Services Populaires</h3>
                    <Star color="#f59e0b" fill="#f59e0b" size={20} />
                  </div>

                  <div className="carousel-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div className="carousel-count-badge" style={{ 
                      backgroundColor: `${popularServices[activeServiceIndex].color}15`,
                      color: popularServices[activeServiceIndex].color,
                      borderColor: `${popularServices[activeServiceIndex].color}30`
                    }}>
                      {popularServices[activeServiceIndex].count}
                    </div>
                    <p style={{ fontSize: '1.5rem', fontWeight: '900', color: '#0f172a', marginBottom: '0.5rem' }}>{popularServices[activeServiceIndex].name}</p>
                    <p style={{ color: '#64748b', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Réservations ce mois</p>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem' }}>
                    {popularServices.map((_, idx) => (
                      <div 
                        key={idx} 
                        className={`dot-indicator ${idx === activeServiceIndex ? 'active' : ''}`}
                        style={{ backgroundColor: idx === activeServiceIndex ? popularServices[idx].color : '#e2e8f0' }}
                      />
                    ))}
                  </div>

                  <button 
                    className="btn-secondary" 
                    style={{ marginTop: '2rem', width: '100%', padding: '0.75rem', fontSize: '0.9rem' }}
                    onClick={() => navigate('/entreprise/stats')}
                  >
                    Voir le détail des services
                  </button>
                </div>
                
                <div className="activity-card">
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '950', marginBottom: '1.5rem' }}>Activité Récente</h3>
                  <div className="activity-item">
                    <div className="activity-dot" style={{ backgroundColor: '#3b82f6' }}></div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: '700', color: '#0f172a' }}>Sophie B. a réservé</p>
                      <span style={{ color: '#64748b', fontSize: '0.85rem' }}>À l'instant</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-dot" style={{ backgroundColor: '#f97316' }}></div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: '700', color: '#0f172a' }}>Robert M. a annulé</p>
                      <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Il y a 1h</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardEntreprise;
