import { useNavigate } from 'react-router-dom';
import SidebarAdmin from '../../components/layout/SidebarAdmin';
import { 
  Users, 
  Building2, 
  Calendar, 
  Shield, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  Activity,
  ArrowUpRight,
  UserPlus,
  PlusCircle,
  Send,
  Zap,
  Clock
} from 'lucide-react';
import './DashboardAdmin.css';

const DashboardAdmin = () => {
  const navigate = useNavigate();

  // Mock data for alerts
  const systemAlerts = [
    { id: 1, type: 'warning', message: '5 nouveaux professionnels en attente de validation', time: 'Il y a 10 min' },
    { id: 2, type: 'critical', message: 'Pic de trafic détecté : +40% au cours de la dernière heure', time: 'Il y a 25 min' },
    { id: 3, type: 'info', message: 'Sauvegarde système effectuée avec succès', time: 'Il y a 2h' },
  ];

  const stats = [
    { label: 'Utilisateurs Actifs', value: '1,245', trend: '+12%', icon: Users, color: 'stat-blue' },
    { label: 'Professionnels', value: '87', trend: '+5%', icon: Building2, color: 'stat-purple' },
    { label: 'Réservations (Mois)', value: '5,432', trend: '+18%', icon: Calendar, color: 'stat-green' },
    { label: 'Taux de Remplissage', value: '64%', trend: '+2%', icon: TrendingUp, color: 'stat-orange' },
  ];

  return (
    <div className="admin-dashboard">
      <div className="admin-layout">
        <SidebarAdmin />
        
        <main className="admin-main-content">
          <div className="admin-container">
            <header className="admin-header">
              <div className="header-left">
                <h1 className="admin-title">Command Center</h1>
                <p className="admin-subtitle">Vue d'ensemble en temps réel de votre plateforme</p>
              </div>
              <div className="system-status">
                <div className="status-indicator">
                  <div className="status-dot pulse-green"></div>
                  <span>Production Online</span>
                </div>
              </div>
            </header>

            {/* Top Stats Grid */}
            <div className="admin-stats-grid">
              {stats.map((stat, idx) => (
                <div key={idx} className={`admin-stat-card ${stat.color}`} style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className="stat-info">
                    <p className="stat-label">{stat.label}</p>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                      <p className="stat-value">{stat.value}</p>
                      <span className="stat-trend">
                        <ArrowUpRight size={12} /> {stat.trend}
                      </span>
                    </div>
                  </div>
                  <div className="stat-icon-box">
                    <stat.icon size={24} />
                  </div>
                </div>
              ))}
            </div>

            <div className="admin-main-grid">
              {/* Left Column: Activity & Alerts */}
              <div className="admin-grid-left">
                <section className="admin-section-card">
                  <div className="section-header">
                    <h2>Alertes Système</h2>
                    <span className="badge-count">{systemAlerts.length}</span>
                  </div>
                  <div className="alerts-list">
                    {systemAlerts.map(alert => (
                      <div key={alert.id} className={`admin-alert-item ${alert.type}`}>
                        <div className="alert-icon">
                          {alert.type === 'info' ? <CheckCircle2 size={18} /> : 
                           alert.type === 'critical' ? <AlertTriangle size={18} color="#ef4444" /> : 
                           <AlertTriangle size={18} color="#f59e0b" />}
                        </div>
                        <div className="alert-content">
                          <p>{alert.message}</p>
                          <span><Clock size={12} style={{verticalAlign: 'middle', marginRight: '3px'}} /> {alert.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="admin-section-card" style={{ marginTop: '1rem' }}>
                  <div className="section-header">
                    <h2>Activité Récente</h2>
                    <button className="btn-text" onClick={() => navigate('/admin/activity')} style={{ background: 'none', border: 'none', color: '#4f46e5', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}>Voir tout</button>
                  </div>
                  <div className="admin-activity-feed">
                    <div className="feed-item">
                      <div className="feed-icon-box feed-icon-blue"><UserPlus size={16} /></div>
                      <div className="feed-text">
                        <p><strong>Nouveau Client</strong> : Jean Dupont s'est inscrit.</p>
                        <span>Il y a 5 min</span>
                      </div>
                    </div>
                    <div className="feed-item">
                      <div className="feed-icon-box feed-icon-green"><CheckCircle2 size={16} /></div>
                      <div className="feed-text">
                        <p><strong>Validation</strong> : Dr. Simon a été validé.</p>
                        <span>Il y a 15 min</span>
                      </div>
                    </div>
                    <div className="feed-item">
                      <div className="feed-icon-box feed-icon-purple"><Activity size={16} /></div>
                      <div className="feed-text">
                        <p><strong>Rendez-vous</strong> : Nouvelle réservation chez Garage Pro.</p>
                        <span>Il y a 22 min</span>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* Right Column: Platform Health & Quick Controls */}
              <div className="admin-grid-right">
                <section className="admin-section-card glass">
                  <div className="section-header">
                    <h2>Santé Plateforme</h2>
                    <Zap size={18} color="#4f46e5" />
                  </div>
                  <div className="health-metrics">
                    <div className="metric">
                      <div className="metric-info">
                        <span>Database Latency</span>
                        <strong>24ms</strong>
                      </div>
                      <div className="progress-bar"><div className="progress-fill" style={{ width: '92%' }}></div></div>
                    </div>
                    <div className="metric">
                      <div className="metric-info">
                        <span>API Response Time</span>
                        <strong>145ms</strong>
                      </div>
                      <div className="progress-bar"><div className="progress-fill" style={{ width: '85%' }}></div></div>
                    </div>
                    <div className="metric">
                      <div className="metric-info">
                        <span>Server Load (CPU)</span>
                        <strong>12%</strong>
                      </div>
                      <div className="progress-bar"><div className="progress-fill" style={{ width: '12%' }}></div></div>
                    </div>
                  </div>
                </section>

                <section className="admin-section-card" style={{ marginTop: '1rem' }}>
                  <div className="section-header">
                    <h2>Actions Rapides</h2>
                  </div>
                  <div className="admin-quick-actions">
                    <button className="btn-quick-action" onClick={() => navigate('/admin/categories')}>
                      <PlusCircle size={18} /> Nouvelle Catégorie
                    </button>
                    <button className="btn-quick-action" onClick={() => navigate('/admin/notifications')}>
                      <Send size={18} /> Message Global
                    </button>
                    <button className="btn-quick-action" onClick={() => navigate('/admin/moderation')}>
                      <Shield size={18} /> Audit Sécurité
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardAdmin;
