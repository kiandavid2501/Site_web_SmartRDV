import { useState } from 'react';
import SidebarEntreprise from '../../components/layout/SidebarEntreprise';
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal, 
  Mail, 
  Phone, 
  MessageSquare,
  History,
  Info
} from 'lucide-react';
import './DashboardEntreprise.css';

const ClientsEntreprise = () => {
  const [selectedClient, setSelectedClient] = useState(null);

  const clients = [
    { id: 1, name: "Jean Dupont", email: "jean.dupont@email.com", phone: "06 12 34 56 78", lastApt: "2026-01-25", totalApts: 5, status: "Régulier", notes: "Préfère les rendez-vous l'après-midi." },
    { id: 2, name: "Marie Louise", email: "m.louise@email.com", phone: "06 98 76 54 32", lastApt: "2026-02-01", totalApts: 2, status: "Nouveau", notes: "" },
    { id: 3, name: "Robert Martin", email: "robert.martin@email.com", phone: "07 11 22 33 44", lastApt: "2026-01-30", totalApts: 12, status: "Fidèle", notes: "Client historique, très ponctuel." },
  ];

  return (
    <div className="dashboard-entreprise">
      <div style={{ display: 'flex' }}>
        <SidebarEntreprise />
        <main className="dashboard-main-area">
          <div className="dashboard-content">
            <header className="dashboard-header-section">
              <div className="header-info">
                <h1 className="dashboard-title">Répertoire Clients 👥</h1>
                <p className="dashboard-subtitle">Gérez vos relations et conservez un historique précis</p>
              </div>
              <div className="header-actions">
                <button className="btn-icon-text"><Download size={18} /> Exporter Excel</button>
              </div>
            </header>

            <div className="dashboard-grid-layout">
              <div className="main-content-column" style={{ flex: selectedClient ? 1.5 : 2 }}>
                <div className="main-content-card">
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div className="input-wrapper" style={{ flex: 1 }}>
                      <Search size={18} className="input-icon" />
                      <input type="text" placeholder="Rechercher par nom, email..." className="form-input" style={{ paddingLeft: '2.5rem' }} />
                    </div>
                  </div>

                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '2px solid #f3f4f6', color: '#64748b', fontSize: '0.85rem' }}>
                          <th style={{ padding: '1rem' }}>NOM DU CLIENT</th>
                          <th style={{ padding: '1rem' }}>COORDONNÉES</th>
                          <th style={{ padding: '1rem' }}>STATUT</th>
                          <th style={{ padding: '1rem' }}>ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {clients.map(client => (
                          <tr key={client.id} style={{ borderBottom: '1px solid #f3f4f6', cursor: 'pointer' }} onClick={() => setSelectedClient(client)}>
                            <td style={{ padding: '1rem' }}>
                              <div style={{ fontWeight: '600' }}>{client.name}</div>
                              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{client.totalApts} RDV au total</div>
                            </td>
                            <td style={{ padding: '1rem' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', fontSize: '0.85rem' }}><Mail size={14} /> {client.email}</div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}><Phone size={14} /> {client.phone}</div>
                            </td>
                            <td style={{ padding: '1rem' }}>
                               <span className={`status-badge ${client.status === 'Fidèle' ? 'confirmed' : 'pending'}`}>
                                {client.status}
                              </span>
                            </td>
                            <td style={{ padding: '1rem' }}>
                              <button className="btn-more"><MoreHorizontal size={18} /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {selectedClient && (
                <div className="side-content-column" style={{ flex: 1 }}>
                  <div className="main-content-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                      <h2 className="section-title" style={{ marginBottom: 0 }}>Détails Client</h2>
                      <button className="btn-more" onClick={() => setSelectedClient(null)}>×</button>
                    </div>

                    <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                      <div className="apt-avatar" style={{ width: '64px', height: '64px', fontSize: '1.5rem', margin: '0 auto 1rem' }}>
                        {selectedClient.name.charAt(0)}
                      </div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>{selectedClient.name}</h3>
                      <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Client depuis Janvier 2025</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div className="activity-card" style={{ padding: '1rem' }}>
                        <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', marginBottom: '0.5rem' }}><History size={16} /> Dernier Rendez-vous</h4>
                        <p style={{ fontSize: '0.85rem', fontWeight: '600' }}>{selectedClient.lastApt}</p>
                      </div>

                      <div className="activity-card" style={{ padding: '1rem' }}>
                        <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', marginBottom: '0.5rem' }}><MessageSquare size={16} /> Notes Internes</h4>
                        <textarea 
                          className="form-input" 
                          rows="3" 
                          style={{ fontSize: '0.85rem', resize: 'none' }}
                          placeholder="Ajouter une note..."
                          defaultValue={selectedClient.notes}
                        ></textarea>
                      </div>

                      <button className="btn-primary-pro" style={{ width: '100%' }}>Voir l'historique complet</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClientsEntreprise;
