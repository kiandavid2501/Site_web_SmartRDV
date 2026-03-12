import { useState } from 'react';
import SidebarAdmin from '../../components/layout/SidebarAdmin';
import { 
  Save, 
  Globe, 
  Shield, 
  Bell, 
  Database, 
  RefreshCw, 
  Lock, 
  Mail,
  Smartphone,
  Server
} from 'lucide-react';
import './DashboardAdmin.css';

const SettingsAdmin = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({
    appName: 'SmartRDV',
    contactEmail: 'support@smartrdv.com',
    language: 'Français',
    maintenanceMode: false,
    sessionTimeout: 60,
    passwordComplexity: 'Élevée (Maj, Min, Chiffre, Symbole)',
    twoFA: true
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Paramètres enregistrés avec succès !');
    }, 1000);
  };

  const handleBackup = () => {
    alert('Sauvegarde de la base de données lancée...');
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-layout" style={{ display: 'flex' }}>
        <SidebarAdmin />
        
        <main className="admin-main-content">
          <div className="admin-container">
            <header className="admin-header">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                <div>
                  <h1 className="admin-title">Paramètres de la Plateforme</h1>
                  <p className="admin-subtitle">Configuration globale et sécurité du système</p>
                </div>
                <button 
                  className="btn-admin btn-primary-admin" 
                  onClick={handleSave}
                  disabled={isSaving}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <Save size={18} /> {isSaving ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>
            </header>

            <div className="admin-main-grid">
              {/* Left: Navigation Categories */}
              <div className="admin-grid-col-1">
                <div className="admin-section-card" style={{ padding: '1rem' }}>
                  <nav className="settings-nav">
                    <button 
                      className={`btn-quick-action ${activeSection === 'general' ? 'active-setting' : ''}`}
                      onClick={() => setActiveSection('general')}
                      style={{ border: 'none', width: '100%', justifyContent: 'flex-start', background: activeSection === 'general' ? '#eff6ff' : 'transparent', color: activeSection === 'general' ? '#3b82f6' : '#475569' }}
                    >
                      <Globe size={18} /> Général
                    </button>
                    <button 
                      className={`btn-quick-action ${activeSection === 'security' ? 'active-setting' : ''}`}
                      onClick={() => setActiveSection('security')}
                      style={{ border: 'none', width: '100%', justifyContent: 'flex-start', background: activeSection === 'security' ? '#eff6ff' : 'transparent', color: activeSection === 'security' ? '#3b82f6' : '#475569' }}
                    >
                      <Lock size={18} /> Sécurité
                    </button>
                    <button 
                      className={`btn-quick-action ${activeSection === 'notifications' ? 'active-setting' : ''}`}
                      onClick={() => setActiveSection('notifications')}
                      style={{ border: 'none', width: '100%', justifyContent: 'flex-start', background: activeSection === 'notifications' ? '#eff6ff' : 'transparent', color: activeSection === 'notifications' ? '#3b82f6' : '#475569' }}
                    >
                      <Bell size={18} /> Notifications
                    </button>
                    <button 
                      className={`btn-quick-action ${activeSection === 'database' ? 'active-setting' : ''}`}
                      onClick={() => setActiveSection('database')}
                      style={{ border: 'none', width: '100%', justifyContent: 'flex-start', background: activeSection === 'database' ? '#eff6ff' : 'transparent', color: activeSection === 'database' ? '#3b82f6' : '#475569' }}
                    >
                      <Database size={18} /> Base de données
                    </button>
                  </nav>
                </div>
              </div>

              {/* Right: Content Area */}
              <div className="admin-grid-col-2">
                <div className="admin-section-card animate-fade-in-up">
                  {activeSection === 'general' && (
                    <div className="settings-content">
                      <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Globe size={20} color="#3b82f6" /> Configuration Générale
                      </h2>
                      <div className="settings-form" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', color: '#64748b' }}>Nom de l'application</label>
                          <input 
                            type="text" className="admin-input-premium" 
                            value={settings.appName} 
                            onChange={(e) => setSettings({...settings, appName: e.target.value})}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', color: '#64748b' }}>Email de contact (Support)</label>
                          <input 
                            type="email" className="admin-input-premium" 
                            value={settings.contactEmail}
                            onChange={(e) => setSettings({...settings, contactEmail: e.target.value})}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', color: '#64748b' }}>Langue par défaut</label>
                          <select 
                            className="admin-input-premium"
                            value={settings.language}
                            onChange={(e) => setSettings({...settings, language: e.target.value})}
                          >
                            <option>Français</option>
                            <option>Anglais</option>
                            <option>Arabe</option>
                          </select>
                        </div>
                        <div 
                          onClick={() => setSettings({...settings, maintenanceMode: !settings.maintenanceMode})}
                          style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem', padding: '1rem', background: 'var(--admin-bg)', borderRadius: '1rem', cursor: 'pointer' }}
                        >
                          <div style={{ flex: 1 }}>
                            <p style={{ fontWeight: 800 }}>Mode Maintenance</p>
                            <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Désactiver l'accès public à la plateforme.</p>
                          </div>
                          <div className={`premium-toggle ${settings.maintenanceMode ? 'active' : ''}`}></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === 'security' && (
                    <div className="settings-content">
                      <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Shield size={20} color="#ef4444" /> Sécurité & Authentification
                      </h2>
                      <div className="settings-form" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', color: '#64748b' }}>Expiration Session (min)</label>
                          <input 
                            type="number" className="admin-input-premium" 
                            value={settings.sessionTimeout} 
                            onChange={(e) => setSettings({...settings, sessionTimeout: e.target.value})}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', color: '#64748b' }}>Complexité Mot de passe</label>
                          <select 
                            className="admin-input-premium"
                            value={settings.passwordComplexity}
                            onChange={(e) => setSettings({...settings, passwordComplexity: e.target.value})}
                          >
                            <option>Élevée (Maj, Min, Chiffre, Symbole)</option>
                            <option>Moyenne (Maj, Min, Chiffre)</option>
                          </select>
                        </div>
                        <button className="btn-quick-action" style={{ color: '#ef4444', borderColor: '#fee2e2' }}>
                          <RefreshCw size={16} /> Forcer la déconnexion globale
                        </button>
                      </div>
                    </div>
                  )}

                  {activeSection === 'database' && (
                    <div className="settings-content">
                      <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Database size={20} color="#8b5cf6" /> Gestion des Données
                      </h2>
                      <div style={{ background: '#f5f3ff', padding: '1.5rem', borderRadius: '1rem', marginBottom: '2rem' }}>
                        <p style={{ fontWeight: 800, color: '#7c3aed', marginBottom: '0.5rem' }}>Dernière Sauvegarde</p>
                        <p style={{ fontSize: '1.1rem', fontWeight: 700 }}>Aujourd'hui à 04:00 AM</p>
                      </div>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <button className="btn-admin btn-primary-admin" onClick={handleBackup}>
                          <Database size={18} style={{ marginRight: '0.5rem' }} /> Sauvegarder maintenant
                        </button>
                        <button className="btn-admin btn-secondary-admin">
                          Exporter les données (CSV)
                        </button>
                      </div>
                    </div>
                  )}

                  {activeSection === 'notifications' && (
                    <div className="settings-content">
                      <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Bell size={20} color="#f59e0b" /> Préférences Notifications
                      </h2>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--admin-bg)', borderRadius: '12px' }}>
                          <p style={{ fontWeight: 700 }}>Emails Système</p>
                          <div className="premium-toggle active"></div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--admin-bg)', borderRadius: '12px' }}>
                          <p style={{ fontWeight: 700 }}>Alertes Sécurité</p>
                          <div className="premium-toggle active"></div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--admin-bg)', borderRadius: '12px' }}>
                          <p style={{ fontWeight: 700 }}>Log de Maintenance</p>
                          <div className="premium-toggle"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <style>{`
        .admin-input-premium {
          width: 100%;
          padding: 0.85rem 1rem;
          border-radius: 0.75rem;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          font-weight: 600;
          outline: none;
          transition: all 0.2s;
        }
        .admin-input-premium:focus {
          background: white;
          border-color: #3b82f6;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }
        .premium-toggle {
          width: 44px;
          height: 22px;
          background: #e2e8f0;
          border-radius: 11px;
          position: relative;
          transition: all 0.3s;
        }
        .premium-toggle.active {
          background: #3b82f6;
        }
        .premium-toggle::after {
          content: '';
          position: absolute;
          width: 18px;
          height: 18px;
          background: white;
          border-radius: 50%;
          top: 2px;
          left: 2px;
          transition: all 0.3s;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .premium-toggle.active::after {
          left: 24px;
        }
        .active-setting {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default SettingsAdmin;
