import { useState } from 'react';
import SidebarAdmin from '../../components/layout/SidebarAdmin';
import { 
  Send, 
  Users, 
  Bell, 
  Clock, 
  History, 
  AlertCircle, 
  Info, 
  ShieldAlert,
  ChevronRight,
  UserPlus
} from 'lucide-react';
import './DashboardAdmin.css';

const NotificationsAdmin = () => {
  const [broadcast, setBroadcast] = useState({
    title: '',
    message: '',
    recipient: 'all',
    priority: 'info'
  });

  const [history, setHistory] = useState([
    { id: 1, title: 'Mise à jour système', target: 'Tous les utilisateurs', date: '01/02/2024 10:00', priority: 'info', status: 'Sent' },
    { id: 2, title: 'Maintenance prévue à 22h', target: 'Professionnels', date: '30/01/2024 15:30', priority: 'warning', status: 'Sent' },
    { id: 3, title: 'Alerte sécurité critique', target: 'Administrateurs', date: '25/01/2024 09:20', priority: 'urgent', status: 'Sent' },
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!broadcast.title || !broadcast.message) return;
    
    const newEntry = {
      id: Date.now(),
      title: broadcast.title,
      target: broadcast.recipient === 'all' ? 'Tous les utilisateurs' : 
              broadcast.recipient === 'pros' ? 'Professionnels' : 'Clients',
      date: new Date().toLocaleString('fr-FR'),
      priority: broadcast.priority,
      status: 'Sent'
    };

    setHistory([newEntry, ...history]);
    alert('Notification globale envoyée avec succès !');
    setBroadcast({ title: '', message: '', recipient: 'all', priority: 'info' });
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-layout" style={{ display: 'flex' }}>
        <SidebarAdmin />
        
        <main className="admin-main-content">
          <div className="admin-container">
            <header className="admin-header">
              <div>
                <h1 className="admin-title">Communication Globale</h1>
                <p className="admin-subtitle">Diffusez des messages et gérez les notifications système</p>
              </div>
            </header>

            <div className="admin-main-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' }}>
              
              {/* Left: Broadcast Form */}
              <div className="admin-grid-col-1">
                <div className="admin-section-card animate-fade-in-up">
                  <div className="section-header" style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Send size={20} color="#3b82f6" />
                      <h2>Envoyer un Push Global</h2>
                    </div>
                  </div>

                  <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', color: '#64748b' }}>DESTINATAIRES</label>
                      <select 
                        className="admin-input-premium"
                        value={broadcast.recipient}
                        onChange={(e) => setBroadcast({...broadcast, recipient: e.target.value})}
                      >
                        <option value="all">Tous les utilisateurs</option>
                        <option value="pros">Uniquement les Professionnels</option>
                        <option value="clients">Uniquement les Clients</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', color: '#64748b' }}>TITRE DE LA NOTIFICATION</label>
                      <input 
                        className="admin-input-premium" 
                        placeholder="Ex: Maintenance du système"
                        value={broadcast.title}
                        onChange={(e) => setBroadcast({...broadcast, title: e.target.value})}
                        required
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', color: '#64748b' }}>MESSAGE</label>
                      <textarea 
                        className="admin-input-premium" 
                        placeholder="Écrivez votre message ici..."
                        style={{ height: '120px', resize: 'none' }}
                        value={broadcast.message}
                        onChange={(e) => setBroadcast({...broadcast, message: e.target.value})}
                        required
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', color: '#64748b' }}>PRIORITÉ</label>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button 
                            type="button"
                            onClick={() => setBroadcast({...broadcast, priority: 'info'})}
                            className={`priority-btn ${broadcast.priority === 'info' ? 'active-info' : ''}`}
                          > <Info size={14} /> Info </button>
                          <button 
                            type="button"
                            onClick={() => setBroadcast({...broadcast, priority: 'warning'})}
                            className={`priority-btn ${broadcast.priority === 'warning' ? 'active-warning' : ''}`}
                          > <AlertCircle size={14} /> Warning </button>
                          <button 
                            type="button"
                            onClick={() => setBroadcast({...broadcast, priority: 'urgent'})}
                            className={`priority-btn ${broadcast.priority === 'urgent' ? 'active-urgent' : ''}`}
                          > <ShieldAlert size={14} /> Urgent </button>
                        </div>
                      </div>
                    </div>

                    <button type="submit" className="btn-admin btn-primary-admin" style={{ marginTop: '1rem' }}>
                      <Bell size={18} style={{ marginRight: '0.5rem' }} /> Diffuser la notification
                    </button>
                  </form>
                </div>
              </div>

              {/* Right: History Log */}
              <div className="admin-grid-col-2">
                <div className="admin-section-card animate-fade-in-up delay-1">
                  <div className="section-header" style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <History size={20} color="#64748b" />
                      <h2>Historique des envois</h2>
                    </div>
                  </div>

                  <div className="notification-history" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {history.map((item) => (
                      <div key={item.id} style={{ display: 'flex', gap: '1rem', padding: '1rem', background: 'var(--admin-bg)', borderRadius: '12px', border: '1px solid var(--admin-card-border)' }}>
                        <div style={{
                          width: '40px', height: '40px', borderRadius: '10px', 
                          background: item.priority === 'urgent' ? '#fee2e2' : item.priority === 'warning' ? '#fef3c7' : '#e0f2fe',
                          color: item.priority === 'urgent' ? '#ef4444' : item.priority === 'warning' ? '#d97706' : '#0284c7',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                        }}>
                          {item.priority === 'urgent' ? <ShieldAlert size={20} /> : <Bell size={20} />}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p style={{ fontWeight: 700, fontSize: '0.9rem' }}>{item.title}</p>
                            <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{item.date}</span>
                          </div>
                          <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.2rem' }}>Vers: {item.target}</p>
                        </div>
                      </div>
                    ))}
                  </div>
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
          font-family: inherit;
        }
        .admin-input-premium:focus {
          background: white;
          border-color: #3b82f6;
        }
        .priority-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          padding: 0.6rem;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          background: white;
          color: #64748b;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }
        .active-info { border-color: #3b82f6; color: #3b82f6; background: #eff6ff; }
        .active-warning { border-color: #f59e0b; color: #f59e0b; background: #fffbeb; }
        .active-urgent { border-color: #ef4444; color: #ef4444; background: #fef2f2; }
      `}</style>
    </div>
  );
};

export default NotificationsAdmin;
