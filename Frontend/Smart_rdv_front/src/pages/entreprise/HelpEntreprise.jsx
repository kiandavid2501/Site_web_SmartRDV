import { useState } from 'react';
import SidebarEntreprise from '../../components/layout/SidebarEntreprise';
import { CircleHelp, MessageSquare, Book, LifeBuoy, ChevronRight, Search } from 'lucide-react';
import './DashboardEntreprise.css';

const HelpEntreprise = () => {
  const faqs = [
    { q: "Comment modifier mes horaires ?", a: "Allez dans 'Mon Entreprise' puis utilisez la section 'Horaires d'ouverture'." },
    { q: "Comment annuler un rendez-vous ?", a: "Depuis l'Agenda ou 'Gérer les RDV', cliquez sur l'icône d'annulation (X) sur le RDV concerné." },
    { q: "Mes clients ne reçoivent pas de rappels.", a: "Vérifiez vos paramètres de notifications dans la section 'Notifications' ou contactez le support." },
  ];

  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [tickets, setTickets] = useState([
    { id: 1, subject: "Question sur les horaires", status: 'resolved', date: 'Hier', response: "Oui, vous pouvez les modifier à tout moment dans Profil." }
  ]);

  const handleSendRequest = () => {
    if (!message.trim()) return;
    setIsSending(true);
    
    const ticketId = Date.now();
    // Simulate API call
    setTimeout(() => {
      const newTicket = {
        id: ticketId,
        subject: message.substring(0, 30) + (message.length > 30 ? '...' : ''),
        message: message,
        status: 'open',
        date: 'À l\'instant',
        response: null
      };
      setTickets([newTicket, ...tickets]);
      setIsSending(false);
      setIsSent(true);
      setMessage('');

      // Simulation de réponse admin rapide
      setTimeout(() => {
        setTickets(prev => prev.map(t => 
          t.id === ticketId 
            ? { ...t, status: 'resolved', response: "Merci pour votre message. Notre équipe a pris en compte votre demande et reviendra vers vous par email si nécessaire." } 
            : t
        ));
      }, 4000);
    }, 1500);
  };

  return (
    <div className="dashboard-entreprise">
      <div style={{ display: 'flex' }}>
        <SidebarEntreprise />
        <main className="dashboard-main-area">
          <div className="dashboard-content">
             <header className="dashboard-header-section">
                <div className="header-info">
                    <h1 className="dashboard-title">Aide & Support 🆘</h1>
                    <p className="dashboard-subtitle">Besoin d'aide ? Trouvez des réponses ou contactez notre équipe.</p>
                </div>
            </header>

            <div className="dashboard-grid-layout">
              <div className="main-content-column">
                <div className="main-content-card" style={{ marginBottom: '2rem' }}>
                  <div className="input-wrapper">
                    <Search className="input-icon" size={20} />
                    <input type="text" placeholder="Rechercher dans le centre d'aide..." className="form-input" style={{ paddingLeft: '2.5rem' }} />
                  </div>
                </div>

                <div className="main-content-card">
                  <h2 className="section-title">Questions Fréquentes (FAQ)</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {faqs.map((faq, i) => (
                      <div key={i} style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.75rem' }}>
                        <p style={{ fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem' }}>{faq.q}</p>
                        <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: '1.5' }}>{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="side-content-column">
                <div className="notice-card" style={{ marginBottom: '1.5rem' }}>
                  <h3>Documentation 📚</h3>
                  <p>Découvrez tous les guides pour optimiser votre usage de SmartRDV.</p>
                  <button className="btn-text" style={{ marginTop: '1rem', padding: 0 }}>
                    Consulter les guides <ChevronRight size={16} />
                  </button>
                </div>

                <div className="activity-card" style={{ padding: '1.5rem', border: '1px solid #2563eb', backgroundColor: '#eff6ff', transition: 'all 0.4s' }}>
                  <h3 style={{ color: '#1e40af', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <MessageSquare size={18} /> Support Direct
                  </h3>
                  
                  {!isSent ? (
                    <>
                      <p style={{ color: '#1e40af', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: '500' }}>Notre équipe vous répond en moins de 2 heures.</p>
                      <textarea 
                        className="form-input" 
                        placeholder="Décrivez votre problème ici..." 
                        style={{ width: '100%', minHeight: '120px', padding: '1rem', fontSize: '0.95rem', border: '1px solid #bfdbfe' }}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                        <button 
                          className="btn-primary-pro" 
                          style={{ flex: 2, justifyContent: 'center' }}
                          onClick={handleSendRequest}
                          disabled={isSending || !message.trim()}
                        >
                          {isSending ? 'Envoi...' : 'Envoyer'}
                        </button>
                        <button 
                          className="btn-secondary" 
                          style={{ flex: 1, padding: '0.6rem', background: 'white' }}
                          onClick={() => setShowHistory(!showHistory)}
                        >
                          Historique
                        </button>
                      </div>
                    </>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                      <div style={{ background: '#dcfce7', color: '#166534', padding: '1rem', borderRadius: '1rem', marginBottom: '1rem', fontWeight: '900' }}>
                        Demande envoyée ! ✨
                      </div>
                      <p style={{ color: '#1e40af', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Un conseiller prendra contact avec vous très rapidement.</p>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <button 
                          className="btn-secondary" 
                          style={{ width: '100%', background: 'white' }} 
                          onClick={() => setIsSent(false)}
                        >
                          Nouveau message
                        </button>
                        <button 
                          className="btn-primary-pro" 
                          style={{ width: '100%', background: '#1e40af' }} 
                          onClick={() => {
                            setIsSent(false);
                            setShowHistory(true);
                          }}
                        >
                          Voir l'historique
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {showHistory && (
                  <div className="activity-card" style={{ marginTop: '1.5rem', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '900' }}>Vos Demandes</h3>
                      <button className="btn-text" onClick={() => setShowHistory(false)}>Fermer</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {tickets.map(t => (
                        <div key={t.id} style={{ padding: '1rem', background: '#f8fafc', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>{t.subject}</span>
                            <span style={{ 
                              fontSize: '0.7rem', 
                              padding: '0.2rem 0.5rem', 
                              borderRadius: '1rem',
                              background: t.status === 'resolved' ? '#dcfce7' : '#fef9c3',
                              color: t.status === 'resolved' ? '#166534' : '#854d0e',
                              fontWeight: '900'
                            }}>
                              {t.status === 'resolved' ? 'RÉSOLU' : 'EN COURS'}
                            </span>
                          </div>
                          {t.response && (
                            <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: 'white', borderRadius: '0.5rem', borderLeft: '3px solid #3b82f6', fontSize: '0.85rem', color: '#1e293b' }}>
                              <strong>Support:</strong> {t.response}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HelpEntreprise;
