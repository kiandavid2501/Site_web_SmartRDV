import { useState } from 'react';
import { Send, MessageSquare, ChevronDown, ChevronUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import Sidebar from '../../components/layout/Sidebar';
import Card from '../../components/common/Card';
import './DashboardClient.css';

const Aide = () => {
  const [activeTab, setActiveTab] = useState('new'); // 'new' or 'history'
  
  // Mock data for ticket history
  const [tickets, setTickets] = useState([
    {
      id: 1,
      subject: "Problème de réservation",
      date: "29 Jan 2026",
      status: "resolved", // resolved, pending, open
      message: "Je n'arrive pas à réserver pour demain chez Dr. Martin.",
      response: "Bonjour, le problème technique a été résolu. Vous pouvez réessayer. Cordialement, le support."
    },
    {
      id: 2,
      subject: "Demande de facture",
      date: "15 Jan 2026",
      status: "pending",
      message: "Pouvez-vous m'envoyer la facture de mon dernier RDV ?",
      response: null
    }
  ]);

  const [newTicket, setNewTicket] = useState({
    subject: '',
    category: 'Technique',
    message: ''
  });

  const [expandedTicket, setExpandedTicket] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const toggleTicket = (id) => {
    if (expandedTicket === id) {
      setExpandedTicket(null);
    } else {
      setExpandedTicket(id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    
    // Simulate adding ticket
    const ticketId = Date.now();
    setTimeout(() => {
      const ticket = {
        id: ticketId,
        subject: newTicket.subject,
        date: "À l'instant",
        status: "open",
        message: newTicket.message,
        response: null
      };
      setTickets([ticket, ...tickets]);
      setNewTicket({ subject: '', category: 'Technique', message: '' });
      setIsSending(false);
      setIsSent(true);

      // SIMULATION: Administrateur répond après 5 secondes
      setTimeout(() => {
        setTickets(prev => prev.map(t => 
          t.id === ticketId 
            ? { ...t, status: 'resolved', response: "Bonjour ! Nous avons bien reçu votre demande. Un technicien a vérifié votre compte et tout semble être rentré dans l'ordre. N'hésitez pas à nous recontacter si besoin." } 
            : t
        ));
      }, 5000);
    }, 1500);
  };

  return (
    <div className="dashboard-client">
      <div className="dashboard-layout">
        <Sidebar />
        <main className="dashboard-main-content">
          <div className="dashboard-container">
            <div className="dashboard-header animate-fade-in-down">
              <h1 className="dashboard-title">Aide & Support</h1>
              <p className="dashboard-subtitle">Envoyez-nous vos préoccupations et suivez vos demandes.</p>
            </div>

            {/* Tabs */}
            <div className="tabs-container animate-fade-in-up delay-1" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid #e2e8f0' }}>
              <button 
                onClick={() => setActiveTab('new')}
                style={{ 
                  padding: '1rem 1.5rem', 
                  background: 'none', 
                  border: 'none', 
                  borderBottom: activeTab === 'new' ? '3px solid #2563eb' : '3px solid transparent',
                  color: activeTab === 'new' ? '#2563eb' : '#64748b',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                Nouvelle demande
              </button>
              <button 
                onClick={() => setActiveTab('history')}
                style={{ 
                  padding: '1rem 1.5rem', 
                  background: 'none', 
                  border: 'none', 
                  borderBottom: activeTab === 'history' ? '3px solid #2563eb' : '3px solid transparent',
                  color: activeTab === 'history' ? '#2563eb' : '#64748b',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                Mes demandes ({tickets.length})
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
              <div className="content-area animate-fade-in-up delay-2">
                {activeTab === 'new' ? (
                  /* New Ticket Form or Success Message */
                  <Card style={{ transition: 'all 0.5s' }}>
                    {!isSent ? (
                      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#1e293b' }}>Sujet</label>
                          <input 
                            type="text" 
                            required
                            className="form-input"
                            placeholder="Ex: Problème de connexion..."
                            value={newTicket.subject}
                            onChange={(e) => setNewTicket({...newTicket, subject: e.target.value})}
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem', outline: 'none' }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#1e293b' }}>Catégorie</label>
                          <select 
                            className="form-input"
                            value={newTicket.category}
                            onChange={(e) => setNewTicket({...newTicket, category: e.target.value})}
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem', outline: 'none', backgroundColor: 'white' }}
                          >
                            <option>Technique</option>
                            <option>Facturation</option>
                            <option>Réservation</option>
                            <option>Compte</option>
                            <option>Autre</option>
                          </select>
                        </div>

                        <div>
                          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#1e293b' }}>Message</label>
                          <textarea 
                            required
                            className="form-input"
                            rows="6"
                            placeholder="Décrivez votre problème en détail..."
                            value={newTicket.message}
                            onChange={(e) => setNewTicket({...newTicket, message: e.target.value})}
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem', outline: 'none', resize: 'vertical' }}
                          ></textarea>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <button type="submit" className="btn-primary" disabled={isSending} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '200px', justifyContent: 'center' }}>
                            <Send size={18} />
                            {isSending ? 'Envoi en cours...' : 'Envoyer la demande'}
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div style={{ textAlign: 'center', padding: '2rem' }}>
                        <div style={{ 
                          width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#dcfce7', 
                          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem',
                          color: '#166534'
                        }}>
                          <CheckCircle size={48} />
                        </div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#1e293b', marginBottom: '1rem' }}>Demande envoyée !</h2>
                        <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                          Votre ticket a été créé avec succès. Notre équipe technique l'étudiera dans les plus brefs délais. 
                        </p>
                        <button className="btn-secondary" onClick={() => setIsSent(false)}>Nouvelle demande</button>
                      </div>
                    )}
                  </Card>
                ) : (
                  /* Ticket History */
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {tickets.map(ticket => (
                      <Card key={ticket.id} className="ticket-card" style={{ padding: '0', overflow: 'hidden' }}>
                        <div 
                          onClick={() => toggleTicket(ticket.id)}
                          style={{ 
                            padding: '1.25rem', 
                            cursor: 'pointer', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            backgroundColor: expandedTicket === ticket.id ? '#f8fafc' : 'white'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ 
                              width: '40px', height: '40px', borderRadius: '50%', 
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              backgroundColor: ticket.status === 'resolved' ? '#dcfce7' : '#f1f5f9',
                              color: ticket.status === 'resolved' ? '#166534' : '#475569'
                            }}>
                              {ticket.status === 'resolved' ? <CheckCircle size={20} /> : <Clock size={20} />}
                            </div>
                            <div>
                              <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#1e293b' }}>{ticket.subject}</h3>
                              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{ticket.date}</span>
                            </div>
                          </div>
                          {expandedTicket === ticket.id ? <ChevronUp size={20} color="#94a3b8" /> : <ChevronDown size={20} color="#94a3b8" />}
                        </div>
                        {expandedTicket === ticket.id && (
                          <div style={{ padding: '1.5rem', borderTop: '1px solid #f1f5f9', background: '#f8fafc' }}>
                            <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '1rem' }}>{ticket.message}</p>
                            {ticket.response && (
                              <div style={{ padding: '1rem', background: 'white', borderRadius: '0.75rem', borderLeft: '4px solid #2563eb' }}>
                                <p style={{ fontWeight: '700', fontSize: '0.85rem', color: '#2563eb', marginBottom: '0.25rem' }}>Support SmartRDV</p>
                                <p style={{ fontSize: '0.9rem', color: '#1e293b' }}>{ticket.response}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              <div className="resources-sidebar animate-fade-in-up delay-3">
                <Card style={{ padding: '1.5rem', position: 'sticky', top: '2rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '900', marginBottom: '1.5rem', color: '#1e293b' }}>Centre d'Aide</h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '0.75rem', cursor: 'pointer' }}>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '0.25rem' }}>Guide d'utilisation</h4>
                      <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Apprenez à gérer vos réservations facilement.</p>
                    </div>
                    <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '0.75rem', cursor: 'pointer' }}>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '0.25rem' }}>Questions Fréquentes (FAQ)</h4>
                      <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Réponses aux questions les plus courantes.</p>
                    </div>
                    <div style={{ padding: '1rem', background: '#fff1f2', borderRadius: '0.75rem', cursor: 'pointer', border: '1px solid #fecdd3' }}>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '0.25rem', color: '#991b1b' }}>Signaler un bug</h4>
                      <p style={{ fontSize: '0.8rem', color: '#be123c' }}>Aidez-nous à améliorer votre expérience.</p>
                    </div>
                  </div>

                  <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #f1f5f9' }}>
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8', textAlign: 'center' }}>
                      Support disponible 24/7 pour les clients Premium.
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Aide;
