import { useState } from 'react';
import SidebarAdmin from '../../components/layout/SidebarAdmin';
import { 
  MessageSquare, 
  User, 
  Clock, 
  CheckCircle2, 
  Search, 
  Filter, 
  Send, 
  MoreVertical,
  AlertCircle,
  ChevronRight,
  LifeBuoy
} from 'lucide-react';
import './DashboardAdmin.css';

const SupportAdmin = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);
  
  const [tickets, setTickets] = useState([
    { id: 'TK-882', user: 'Alice Martin', subject: 'Problème de connexion', priority: 'high', status: 'pending', date: 'il y a 15 min', message: "Je n'arrive plus à me connecter à mon compte client depuis ce matin. J'ai un message d'erreur 500." },
    { id: 'TK-881', user: 'Garage Central', subject: 'Modification de créneaux', priority: 'medium', status: 'in-progress', date: 'il y a 2h', message: "Bonjour, je souhaite modifier mes horaires d'ouverture pour le mois de Mars sans impacter les RDV déjà pris." },
    { id: 'TK-879', user: 'Jean Dupont', subject: 'Facturation erronée', priority: 'low', status: 'resolved', date: 'Hier', message: "J'ai été débité deux fois pour ma prestation de coiffure." },
  ]);

  const [reply, setReply] = useState('');

  const handleResolve = (id) => {
    setTickets(tickets.map(tk => tk.id === id ? { ...tk, status: 'resolved' } : tk));
    setSelectedTicket(null);
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!reply.trim()) return;
    alert('Réponse envoyée au client !');
    setReply('');
  };

  const filteredTickets = tickets.filter(tk => 
    tk.user.toLowerCase().includes(searchQuery.toLowerCase()) || 
    tk.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-dashboard">
      <div className="admin-layout" style={{ display: 'flex' }}>
        <SidebarAdmin />
        
        <main className="admin-main-content">
          <div className="admin-container">
            <header className="admin-header">
              <div>
                <h1 className="admin-title">Support & Assistance</h1>
                <p className="admin-subtitle">Gérez les tickets et aidez les utilisateurs de la plateforme</p>
              </div>
              <div className="admin-header-stats" style={{ display: 'flex', gap: '2rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700 }}>ATTENTE</p>
                  <p style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ef4444' }}>{tickets.filter(t => t.status === 'pending').length}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700 }}>RÉSOLUS</p>
                  <p style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10b981' }}>{tickets.filter(t => t.status === 'resolved').length}</p>
                </div>
              </div>
            </header>

            <div className="admin-main-grid">
              {/* Left: Ticket List */}
              <div className="admin-grid-col-1">
                <div className="admin-filters-bar" style={{ marginBottom: '1rem', flexDirection: 'column', gap: '1rem' }}>
                  <div className="admin-search-wrapper" style={{ width: '100%' }}>
                    <Search className="admin-search-icon" size={18} />
                    <input 
                      type="text" 
                      placeholder="Rechercher un ticket..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="ticket-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {filteredTickets.map((tk) => (
                    <div 
                      key={tk.id} 
                      className={`ticket-card animate-fade-in-up ${selectedTicket?.id === tk.id ? 'active-ticket' : ''}`}
                      onClick={() => setSelectedTicket(tk)}
                      style={{
                        padding: '1.25rem', background: 'white', borderRadius: '12px', border: '1px solid var(--admin-card-border)',
                        cursor: 'pointer', transition: 'all 0.2s', position: 'relative', overflow: 'hidden'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8' }}>{tk.id}</span>
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{tk.date}</span>
                      </div>
                      <p style={{ fontWeight: 800, color: '#1e293b', marginBottom: '0.25rem' }}>{tk.subject}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div className="user-avatar" style={{ width: '20px', height: '20px', fontSize: '0.6rem' }}>{tk.user.charAt(0)}</div>
                        <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{tk.user}</span>
                      </div>
                      <div className={`ticket-priority priority-${tk.priority}`}></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Ticket Conversation */}
              <div className="admin-grid-col-2">
                {selectedTicket ? (
                  <div className="admin-section-card animate-fade-in-up" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div className="section-header" style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #f1f5f9' }}>
                      <div>
                        <h2>{selectedTicket.subject}</h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                          <span className={`status-badge ${selectedTicket.status}`}>
                            {selectedTicket.status === 'pending' ? 'En attente' : selectedTicket.status === 'in-progress' ? 'En cours' : 'Résolu'}
                          </span>
                          <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>ID: {selectedTicket.id}</span>
                        </div>
                      </div>
                      {selectedTicket.status !== 'resolved' && (
                        <button className="btn-admin btn-secondary-admin" onClick={() => handleResolve(selectedTicket.id)}>
                          <CheckCircle2 size={16} style={{ marginRight: '0.5rem' }} /> Résoudre
                        </button>
                      )}
                    </div>

                    <div className="conversation-box" style={{ flex: 1, overflowY: 'auto', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div className="message-received" style={{ alignSelf: 'flex-start', maxWidth: '80%', padding: '1rem', background: 'var(--admin-bg)', borderRadius: '12px 12px 12px 0', border: '1px solid var(--admin-card-border)' }}>
                        <p style={{ fontSize: '0.9rem', color: '#1e293b', lineHeight: '1.5' }}>{selectedTicket.message}</p>
                        <span style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.5rem', display: 'block' }}>{selectedTicket.date} par {selectedTicket.user}</span>
                      </div>
                    </div>

                    {selectedTicket.status !== 'resolved' && (
                      <form onSubmit={handleSendReply} className="reply-form" style={{ display: 'flex', gap: '0.75rem', padding: '1rem', background: 'var(--admin-bg)', borderRadius: '12px' }}>
                        <textarea 
                          placeholder="Écrire une réponse..." 
                          value={reply}
                          onChange={(e) => setReply(e.target.value)}
                          style={{
                            flex: 1, border: 'none', background: 'transparent', outline: 'none', resize: 'none',
                            fontFamily: 'inherit', fontSize: '0.9rem', padding: '0.5rem'
                          }}
                        />
                        <button type="submit" className="btn-admin btn-primary-admin" style={{ padding: '0 1rem' }}>
                          <Send size={18} />
                        </button>
                      </form>
                    )}
                  </div>
                ) : (
                  <div className="admin-section-card" style={{ height: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: '#94a3b8' }}>
                    <div style={{ background: 'var(--admin-bg)', p: '1.5rem', borderRadius: '50%', marginBottom: '1rem', display: 'flex', p: '1rem', padding: '1.5rem' }}>
                      <LifeBuoy size={48} />
                    </div>
                    <h3>Sélectionnez un ticket</h3>
                    <p>Choisissez une demande dans la liste pour voir les détails et répondre.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      <style>{`
        .active-ticket {
          border-color: #3b82f6 !important;
          background: #eff6ff !important;
          box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.1);
        }
        .ticket-priority {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
        }
        .priority-high { background: #ef4444; }
        .priority-medium { background: #f59e0b; }
        .priority-low { background: #3b82f6; }
        
        .status-badge.pending { background: #fee2e2; color: #ef4444; }
        .status-badge.in-progress { background: #fef3c7; color: #d97706; }
        .status-badge.resolved { background: #dcfce7; color: #10b981; }
      `}</style>
    </div>
  );
};

export default SupportAdmin;
