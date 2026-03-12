import SidebarEntreprise from '../../components/layout/SidebarEntreprise';
import { Bell, Check, Trash2, Clock, Mail, MessageSquare } from 'lucide-react';
import './DashboardEntreprise.css';

const NotificationsEntreprise = () => {
  const notifications = [
    { id: 1, title: "Nouveau rendez-vous", message: "Jean Dupont a réservé pour le 01/02 à 14:30.", time: "Il y a 5 min", type: "new", unread: true },
    { id: 2, title: "Annulation", message: "Thomas Petit a annulé son rendez-vous de ce matin.", time: "Il y a 1h", type: "cancel", unread: true },
    { id: 3, title: "Profil Validé", message: "Votre compte professionnel a été validé par l'administrateur.", time: "Hier", type: "system", unread: false },
  ];

  return (
    <div className="dashboard-entreprise">
      <div style={{ display: 'flex' }}>
        <SidebarEntreprise />
        <main className="dashboard-main-area">
          <div className="dashboard-content">
            <header className="dashboard-header-section">
                <div className="header-info">
                    <h1 className="dashboard-title">Notifications 🔔</h1>
                    <p className="dashboard-subtitle">Restez informé de toutes les activités de votre entreprise</p>
                </div>
                <button className="btn-secondary">Tout marquer comme lu</button>
            </header>

            <div className="main-content-card" style={{ marginTop: '2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {notifications.map(notif => (
                  <div key={notif.id} style={{ 
                    display: 'flex', gap: '1rem', padding: '1rem', borderRadius: '0.75rem',
                    backgroundColor: notif.unread ? '#f0f7ff' : 'white',
                    border: '1px solid #e5e7eb',
                    position: 'relative'
                  }}>
                    {notif.unread && <div style={{ position: 'absolute', top: '10px', right: '10px', width: '8px', height: '8px', backgroundColor: '#2563eb', borderRadius: '50%' }}></div>}
                    <div className="apt-avatar" style={{ background: notif.type === 'new' ? '#dcfce7' : (notif.type === 'cancel' ? '#fee2e2' : '#dbeafe'), color: notif.type === 'new' ? '#166534' : (notif.type === 'cancel' ? '#991b1b' : '#1e40af'), width: '40px', height: '40px' }}>
                      {notif.type === 'new' ? <Check size={18} /> : (notif.type === 'cancel' ? <Trash2 size={18} /> : <Bell size={18} />)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h3 style={{ fontWeight: '700', fontSize: '1rem' }}>{notif.title}</h3>
                        <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>{notif.time}</span>
                      </div>
                      <p style={{ fontSize: '0.9rem', color: '#4b5563', marginTop: '0.25rem' }}>{notif.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NotificationsEntreprise;
