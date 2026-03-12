import { useState } from 'react';
import SidebarAdmin from '../../components/layout/SidebarAdmin';
import { 
  ShieldAlert, 
  Flag, 
  AlertTriangle, 
  UserX, 
  CheckCircle, 
  XCircle, 
  Lock, 
  RefreshCw, 
  Eye,
  ShieldCheck,
  Zap,
  History,
  LockKeyhole,
  Power,
  Globe,
  Settings
} from 'lucide-react';
import './DashboardAdmin.css';

const ModerationAdmin = () => {
  const [activeTab, setActiveTab] = useState('reports');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [twoFAEnforced, setTwoFAEnforced] = useState(true);
  const [registrationLocked, setRegistrationLocked] = useState(false);

  // Mock data for reports
  const [reports, setReports] = useState([
    { id: 101, type: 'Commentaire', target: 'Marie Curiste', reason: 'Langage inapproprié', reporter: 'Bob Dupont', date: 'il y a 2h', status: 'pending' },
    { id: 102, type: 'Profil', target: 'Auto Expert', reason: 'Faux profil / Spam', reporter: 'Système', date: 'il y a 5h', status: 'pending' },
    { id: 103, type: 'Photo', target: 'Dr. Jean Simon', reason: 'Contenu non conforme', reporter: 'Alice Martin', date: 'Hier', status: 'pending' },
  ]);

  // Mock audit logs
  const auditLogs = [
    { id: 1, event: 'Connexion Admin', user: 'Admin Epiphane', ip: '192.168.1.1', date: '01/02/2024 19:45' },
    { id: 2, event: 'Échec Connexion (IP Bloquée)', user: 'Inconnu', ip: '45.12.33.10', date: '01/02/2024 18:20' },
    { id: 3, event: 'Modification Catégorie (Santé)', user: 'Admin Epiphane', ip: '192.168.1.1', date: '01/02/2024 17:10' },
  ];

  const handleModeration = (id, action) => {
    if (action === 'delete') {
      if (window.confirm('Voulez-vous vraiment supprimer ce contenu ?')) {
        setReports(reports.filter(r => r.id !== id));
      }
    } else {
      setReports(reports.filter(r => r.id !== id));
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-layout" style={{ display: 'flex' }}>
        <SidebarAdmin />
        
        <main className="admin-main-content">
          <div className="admin-container">
            <header className="admin-header">
              <div>
                <h1 className="admin-title">Modération & Sécurité</h1>
                <p className="admin-subtitle">Surveillez l'intégrité de la plateforme et gérez les alertes</p>
              </div>
            </header>

            <div className="admin-stats-grid" style={{ marginBottom: '2rem' }}>
              <div className="admin-stat-card stat-red">
                <div className="stat-info">
                  <p className="stat-label">Signalements Actifs</p>
                  <p className="stat-value">{reports.length}</p>
                </div>
                <div className="stat-icon-box">
                  <Flag size={24} />
                </div>
              </div>
              <div className="admin-stat-card stat-blue">
                <div className="stat-info">
                  <p className="stat-label">Santé Sécurité</p>
                  <p className="stat-value">98%</p>
                </div>
                <div className="stat-icon-box">
                  <ShieldCheck size={24} />
                </div>
              </div>
              <div className="admin-stat-card stat-purple">
                <div className="stat-info">
                  <p className="stat-label">Alertes Système</p>
                  <p className="stat-value">0</p>
                </div>
                <div className="stat-icon-box">
                  <Zap size={24} />
                </div>
              </div>
            </div>

            <div className="admin-filters-bar animate-fade-in-up">
              <div className="admin-tabs">
                <button className={`admin-tab ${activeTab === 'reports' ? 'active' : ''}`} onClick={() => setActiveTab('reports')}>
                  <Flag size={16} /> Signalements
                </button>
                <button className={`admin-tab ${activeTab === 'security' ? 'active' : ''}`} onClick={() => setActiveTab('security')}>
                  <Lock size={16} /> Sécurité Système
                </button>
                <button className={`admin-tab ${activeTab === 'audit' ? 'active' : ''}`} onClick={() => setActiveTab('audit')}>
                  <History size={16} /> Journal d'Audit
                </button>
              </div>
            </div>

            {activeTab === 'reports' && (
              <div className="admin-table-container animate-fade-in-up">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Cible du signalement</th>
                      <th>Motif</th>
                      <th>Signaler par</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report) => (
                      <tr key={report.id}>
                        <td><span className="category-pill">{report.type}</span></td>
                        <td><strong>{report.target}</strong></td>
                        <td style={{ color: '#ef4444', fontWeight: 600 }}>{report.reason}</td>
                        <td>{report.reporter} <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>({report.date})</span></td>
                        <td>
                          <div className="actions-cell">
                            <button className="btn-table-action" title="Ignorer" onClick={() => handleModeration(report.id, 'ignore')}>
                              <CheckCircle size={16} />
                            </button>
                            <button className="btn-table-action delete" title="Sanctionner" onClick={() => handleModeration(report.id, 'delete')}>
                              <UserX size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {reports.length === 0 && (
                      <tr><td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>Aucun signalement en attente.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="grid-2-cols animate-fade-in-up" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="admin-section-card">
                  <div className="section-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Power size={18} color="#ef4444" />
                      <h3>Contrôles d'Urgence</h3>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--admin-bg)', borderRadius: '12px' }}>
                      <div>
                        <p style={{ fontWeight: 700 }}>Mode Maintenance</p>
                        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Désactive l'accès public à la plateforme</span>
                      </div>
                      <button 
                        onClick={() => setMaintenanceMode(!maintenanceMode)}
                        style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', background: maintenanceMode ? '#ef4444' : '#e2e8f0', color: maintenanceMode ? 'white' : '#64748b', fontWeight: 800, cursor: 'pointer' }}>
                        {maintenanceMode ? 'ACTIF' : 'INACTIF'}
                      </button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--admin-bg)', borderRadius: '12px' }}>
                      <div>
                        <p style={{ fontWeight: 700 }}>Verrouillage Inscriptions</p>
                        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Empêche la création de nouveaux comptes</span>
                      </div>
                      <button 
                        onClick={() => setRegistrationLocked(!registrationLocked)}
                        style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', background: registrationLocked ? '#ef4444' : '#e2e8f0', color: registrationLocked ? 'white' : '#64748b', fontWeight: 800, cursor: 'pointer' }}>
                        {registrationLocked ? 'ACTIF' : 'INACTIF'}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="admin-section-card">
                  <div className="section-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <LockKeyhole size={18} color="#3b82f6" />
                      <h3>Authentification & Accès</h3>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--admin-bg)', borderRadius: '12px' }}>
                      <div>
                        <p style={{ fontWeight: 700 }}>Double Auth. Obligatoire</p>
                        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Exiger 2FA pour tous les administrateurs</span>
                      </div>
                      <button 
                        onClick={() => setTwoFAEnforced(!twoFAEnforced)}
                        style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', background: twoFAEnforced ? '#10b981' : '#e2e8f0', color: twoFAEnforced ? 'white' : '#64748b', fontWeight: 800, cursor: 'pointer' }}>
                        {twoFAEnforced ? 'OUI' : 'NON'}
                      </button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--admin-bg)', borderRadius: '12px' }}>
                      <div>
                        <p style={{ fontWeight: 700 }}>Whitelist IP (Admin)</p>
                        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Limiter l'accès admin à certaines IPs</span>
                      </div>
                      <Settings size={18} style={{ color: '#94a3b8', cursor: 'pointer' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'audit' && (
              <div className="admin-table-container animate-fade-in-up">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Événement</th>
                      <th>Utilisateur</th>
                      <th>Adresse IP</th>
                      <th>Horodatage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditLogs.map((log) => (
                      <tr key={log.id}>
                        <td style={{ fontWeight: 700 }}>{log.event}</td>
                        <td>{log.user}</td>
                        <td style={{ fontFamily: 'monospace', color: '#64748b' }}>{log.ip}</td>
                        <td>{log.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ModerationAdmin;
