import { useState } from 'react';
import { 
  Bell, 
  CheckCircle, 
  Calendar, 
  Info, 
  Trash2, 
  Settings,
  MoreVertical,
  Check
} from 'lucide-react';
import Sidebar from '../../components/layout/Sidebar';
import Card from '../../components/common/Card';
import './DashboardClient.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      type: 'reservations', 
      title: 'Réservation Confirmée',
      message: 'Votre rendez-vous avec le Cabinet Médical Dr. Martin est confirmé pour demain à 14:00.', 
      time: 'Il y a 2 heures',
      read: false
    },
    { 
      id: 2, 
      type: 'alert', 
      title: 'Rappel de RDV',
      message: 'N\'oubliez pas votre rendez-vous chez Salon Élegance aujourd\'hui à 16:30.', 
      time: 'Il y a 5 heures',
      read: true
    },
    { 
      id: 3, 
      type: 'system', 
      title: 'Mise à jour du profil',
      message: 'Vos informations de contact ont été mises à jour avec succès.', 
      time: 'Hier',
      read: true
    },
    { 
      id: 4, 
      type: 'reservations', 
      title: 'Nouvelle Disponibilité',
      message: 'Une place s\'est libérée au Garage Express pour lundi prochain.', 
      time: 'Hier',
      read: false
    }
  ]);

  const [filter, setFilter] = useState('all');

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    return true;
  });

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const toggleRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: !n.read } : n
    ));
  };

  return (
    <div className="dashboard-client">
      <div className="dashboard-layout">
        <Sidebar />
        <main className="dashboard-main-content">
          <div className="dashboard-container">
            <div className="dashboard-header animate-fade-in-down">
              <div>
                <h1 className="dashboard-title">Notifications</h1>
                <p className="dashboard-subtitle">Restez informé de vos rendez-vous et activités.</p>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="btn-secondary" onClick={markAllRead} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Check size={18} />
                  Marquer tout comme lu
                </button>
              </div>
            </div>

            <div className="search-section animate-fade-in-up delay-1">
              <div className="category-filters">
                <button 
                  className={`category-pill ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  Toutes ({notifications.length})
                </button>
                <button 
                  className={`category-pill ${filter === 'unread' ? 'active' : ''}`}
                  onClick={() => setFilter('unread')}
                >
                  Non lues ({notifications.filter(n => !n.read).length})
                </button>
              </div>
            </div>

            <div className="main-grid animate-fade-in-up delay-2">
              <div className="main-column" style={{ gridColumn: '1 / -1' }}>
                <Card style={{ padding: '0', overflow: 'hidden' }}>
                  {filteredNotifications.length > 0 ? (
                    <div className="notification-list-full">
                      {filteredNotifications.map((notif) => (
                        <div 
                          key={notif.id} 
                          className={`notification-page-item ${notif.read ? 'read' : 'unread'}`}
                          style={{ 
                            padding: '1.5rem 2rem', 
                            display: 'flex', 
                            gap: '1.5rem', 
                            alignItems: 'center',
                            borderBottom: '1px solid #f1f5f9',
                            position: 'relative',
                            transition: 'all 0.2s',
                            background: notif.read ? 'white' : 'rgba(37, 99, 235, 0.02)'
                          }}
                        >
                          {!notif.read && (
                            <div style={{ 
                              position: 'absolute', 
                              left: '0.5rem', 
                              top: '50%', 
                              transform: 'translateY(-50%)',
                              width: '4px', 
                              height: '40px', 
                              background: '#2563eb', 
                              borderRadius: '0 4px 4px 0' 
                            }} />
                          )}

                          <div className={`notif-icon-large ${notif.type}`} style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            background: notif.type === 'reservations' ? '#dcfce7' : 
                                        notif.type === 'alert' ? '#fee2e2' : '#e0f2fe',
                            color: notif.type === 'reservations' ? '#22c55e' : 
                                   notif.type === 'alert' ? '#ef4444' : '#0ea5e9'
                          }}>
                            {notif.type === 'reservations' ? <Calendar size={24} /> : 
                             notif.type === 'alert' ? <Bell size={24} /> : <Info size={24} />}
                          </div>

                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1e293b' }}>{notif.title}</h3>
                              <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{notif.time}</span>
                            </div>
                            <p style={{ color: '#64748b', lineHeight: '1.5', fontSize: '0.95rem' }}>{notif.message}</p>
                          </div>

                          <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <button 
                              className="btn-icon-notif" 
                              onClick={() => toggleRead(notif.id)}
                              title={notif.read ? "Marquer comme non lu" : "Marquer comme lu"}
                              style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', color: '#64748b' }}
                            >
                              <CheckCircle size={18} color={notif.read ? '#2563eb' : '#94a3b8'} />
                            </button>
                            <button 
                              className="btn-icon-notif" 
                              onClick={() => deleteNotification(notif.id)}
                              title="Supprimer"
                              style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #fee2e2', background: 'white', cursor: 'pointer', color: '#ef4444' }}
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ padding: '5rem 2rem', textAlign: 'center' }}>
                      <div style={{ 
                        width: '80px', 
                        height: '80px', 
                        background: '#f8fafc', 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        margin: '0 auto 1.5rem',
                        color: '#94a3b8'
                      }}>
                        <Bell size={40} />
                      </div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#1e293b', marginBottom: '0.5rem' }}>Aucune notification</h3>
                      <p style={{ color: '#64748b' }}>Vous êtes à jour ! Revenez plus tard pour de nouveaux messages.</p>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Notifications;
