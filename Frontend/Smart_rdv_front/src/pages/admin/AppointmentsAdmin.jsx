import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarAdmin from '../../components/layout/SidebarAdmin';
import { 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  User, 
  Building2, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  Download,
  BarChart3
} from 'lucide-react';
import './DashboardAdmin.css';
import './UsersAdmin.css'; // Reuse table styles

const AppointmentsAdmin = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for appointments
  const [appointments, setAppointments] = useState([
    { id: 'RDV-928', client: 'Alice Martin', pro: 'Dr. Jean Simon', date: '12/03/2024', time: '10:00', status: 'completed' },
    { id: 'RDV-929', client: 'Bob Dupont', pro: 'Garage Pro 24', date: '12/03/2024', time: '14:30', status: 'pending' },
    { id: 'RDV-930', client: 'Charlie Zen', pro: 'Salon Élégance', date: '13/03/2024', time: '09:00', status: 'confirmed' },
    { id: 'RDV-931', client: 'Alice Martin', pro: 'Marie Curiste', date: '14/03/2024', time: '16:00', status: 'cancelled' },
  ]);

  const handleExport = () => {
    alert('Préparation de l\'exportation CSV des rendez-vous...');
  };

  const handleNewRDV = () => {
    alert('Ouverture du formulaire de création de rendez-vous manuel...');
  };

  const activeAppointments = appointments.filter(rdv => 
    rdv.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rdv.pro.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rdv.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-dashboard">
      <div className="admin-layout" style={{ display: 'flex' }}>
        <SidebarAdmin />
        
        <main className="admin-main-content">
          <div className="admin-container">
            <header className="admin-header">
              <div>
                <h1 className="admin-title">Gestion des Rendez-vous</h1>
                <p className="admin-subtitle">Supervision globale de l'activité opérationnelle</p>
              </div>
            </header>

            <div className="admin-quick-actions-row" style={{ marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <button className="btn-quick-action" onClick={handleNewRDV}>
                <PlusCircle size={18} /> Nouveau RDV Manuel
              </button>
              <button className="btn-quick-action" onClick={handleExport}>
                <Download size={18} /> Exporter la Liste
              </button>
              <button className="btn-quick-action" onClick={() => navigate('/admin/reports')}>
                <BarChart3 size={18} /> Analytiques RDV
              </button>
            </div>

            <div className="admin-filters-bar">
              <div className="admin-search-wrapper" style={{ maxWidth: '100%' }}>
                <Search className="admin-search-icon" size={18} />
                <input 
                  type="text" 
                  placeholder="Rechercher par ID, client ou professionnel..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="admin-table-container animate-fade-in-up">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID RDV</th>
                    <th>Client / Patient</th>
                    <th>Professionnel / Établissement</th>
                    <th>Date & Heure</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {activeAppointments.map((rdv) => (
                    <tr key={rdv.id}>
                      <td style={{ fontWeight: 800, color: '#64748b', fontSize: '0.8rem' }}>#{rdv.id}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div className="user-avatar" style={{ width: '32px', height: '32px', fontSize: '0.8rem' }}>{rdv.client.charAt(0)}</div>
                          <span style={{ fontWeight: 700 }}>{rdv.client}</span>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <span style={{ fontWeight: 600, color: '#1e293b' }}>{rdv.pro}</span>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontWeight: 700 }}>{rdv.date}</span>
                          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{rdv.time}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`status-badge ${rdv.status}`}>
                          {rdv.status === 'completed' && <><CheckCircle2 size={14} /> Terminé</>}
                          {rdv.status === 'pending' && <><Clock size={14} /> En attente</>}
                          {rdv.status === 'confirmed' && <><CheckCircle2 size={14} /> Confirmé</>}
                          {rdv.status === 'cancelled' && <><XCircle size={14} /> Annulé</>}
                        </span>
                      </td>
                      <td>
                        <div className="actions-cell">
                          <button 
                            className="btn-table-action" 
                            onClick={() => alert(`Détails du rendez-vous ${rdv.id}`)}
                          >
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {activeAppointments.length === 0 && (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
                        Aucun rendez-vous trouvé.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div className="admin-pagination">
                <p className="pagination-text">Affichage de {activeAppointments.length} résultats</p>
                <div className="pagination-btns">
                  <button className="btn-table-action"><ChevronLeft size={18} /></button>
                  <button className="btn-table-action"><ChevronRight size={18} /></button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppointmentsAdmin;
