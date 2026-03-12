import { useState } from 'react';
import SidebarAdmin from '../../components/layout/SidebarAdmin';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle, 
  XCircle, 
  Trash2, 
  ShieldAlert,
  Mail,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Plus
} from 'lucide-react';
import './DashboardAdmin.css';
import './UsersAdmin.css';

const UsersAdmin = () => {
  const [activeTab, setActiveTab] = useState('professionals');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'professionals', category: 'Santé' });

  // Professionals State
  const [professionals, setProfessionals] = useState([
    { id: 1, name: 'Dr. Jean Simon', email: 'simon@gmail.com', category: 'Santé', status: 'active', date: '21/01/2024' },
    { id: 2, name: 'Garage Pro 24', email: 'contact@garagepro.fr', category: 'Automobile', status: 'pending', date: '25/01/2024' },
    { id: 3, name: 'Salon Élégance', email: 'salon@beauty.com', category: 'Beauté', status: 'active', date: '15/01/2024' },
    { id: 4, name: 'Marie Curiste', email: 'marie@wellness.fr', category: 'Bien-être', status: 'suspended', date: '10/01/2024' },
  ]);

  // Clients State
  const [clients, setClients] = useState([
    { id: 101, name: 'Alice Martin', email: 'alice@mail.com', totalAppointments: 12, status: 'active', date: '05/01/2024' },
    { id: 102, name: 'Bob Dupont', email: 'bob@mail.com', totalAppointments: 3, status: 'active', date: '12/01/2024' },
    { id: 103, name: 'Charlie Zen', email: 'charlie@zen.fr', totalAppointments: 0, status: 'suspended', date: '01/01/2024' },
  ]);

  const handleValidate = (id) => {
    setProfessionals(professionals.map(p => p.id === id ? { ...p, status: 'active' } : p));
  };

  const handleDelete = (id, type) => {
    if (window.confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
      if (type === 'professionals') {
        setProfessionals(professionals.filter(p => p.id !== id));
      } else {
        setClients(clients.filter(c => c.id !== id));
      }
    }
  };

  const handleToggleStatus = (id, type) => {
    const setter = type === 'professionals' ? setProfessionals : setClients;
    const data = type === 'professionals' ? professionals : clients;
    
    setter(data.map(u => {
      if (u.id === id) {
        return { ...u, status: u.status === 'suspended' ? 'active' : 'suspended' };
      }
      return u;
    }));
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const newUserObj = {
      id: Date.now(),
      name: newUser.name,
      email: newUser.email,
      status: 'active',
      date: new Date().toLocaleDateString('fr-FR'),
      ...(newUser.role === 'professionals' ? { category: newUser.category } : { totalAppointments: 0 })
    };

    if (newUser.role === 'professionals') {
      setProfessionals([...professionals, newUserObj]);
    } else {
      setClients([...clients, newUserObj]);
    }
    
    setIsModalOpen(false);
    setNewUser({ name: '', email: '', role: 'professionals', category: 'Santé' });
  };

  const filteredData = (activeTab === 'professionals' ? professionals : clients).filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-dashboard">
      <div className="admin-layout" style={{ display: 'flex' }}>
        <SidebarAdmin />
        
        <main className="admin-main-content">
          <div className="admin-container">
            <header className="admin-header">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                <div>
                  <h1 className="admin-title">Gestion des Utilisateurs</h1>
                  <p className="admin-subtitle">Consultez et gérez les comptes de la plateforme</p>
                </div>
                <button 
                  className="btn-admin btn-primary-admin" 
                  onClick={() => setIsModalOpen(true)}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <Plus size={18} /> Nouveau Profil
                </button>
              </div>
            </header>

            <div className="admin-filters-bar animate-fade-in-up">
              <div className="admin-tabs">
                <button 
                  className={`admin-tab ${activeTab === 'professionals' ? 'active' : ''}`}
                  onClick={() => setActiveTab('professionals')}
                >
                  Professionnels ({professionals.length})
                </button>
                <button 
                  className={`admin-tab ${activeTab === 'clients' ? 'active' : ''}`}
                  onClick={() => setActiveTab('clients')}
                >
                  Clients ({clients.length})
                </button>
              </div>

              <div className="admin-search-wrapper" style={{ flex: 1 }}>
                <Search className="admin-search-icon" size={18} />
                <input 
                  type="text" 
                  placeholder="Rechercher par nom, email..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <button className="btn-quick-action" style={{ width: 'auto', marginTop: 0 }}>
                <Filter size={18} /> Filtres
              </button>
            </div>

            <div className="admin-table-container animate-fade-in-up delay-1">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Utilisateur</th>
                    <th>{activeTab === 'professionals' ? 'Catégorie' : 'RDV Totaux'}</th>
                    <th>Date d'inscription</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <div className="user-cell">
                          <div className="user-avatar">
                            {user.name.charAt(0)}
                          </div>
                          <div className="user-info">
                            <p>{user.name}</p>
                            <span>{user.email}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        {activeTab === 'professionals' ? (
                          <span className="category-pill">{user.category}</span>
                        ) : (
                          <strong>{user.totalAppointments}</strong>
                        )}
                      </td>
                      <td>{user.date}</td>
                      <td>
                        <span className={`status-badge ${user.status}`}>
                          {user.status === 'active' && <><CheckCircle size={14} /> Actif</>}
                          {user.status === 'pending' && <><ShieldAlert size={14} /> En attente</>}
                          {user.status === 'suspended' && <><XCircle size={14} /> Suspendu</>}
                        </span>
                      </td>
                      <td>
                        <div className="actions-cell">
                          {activeTab === 'professionals' && user.status === 'pending' && (
                            <button 
                              className="btn-table-action validate" 
                              onClick={() => handleValidate(user.id)}
                              title="Valider"
                            >
                              <CheckCircle size={16} />
                            </button>
                          )}
                          <button 
                            className="btn-table-action" 
                            title="Changer statut"
                            onClick={() => handleToggleStatus(user.id, activeTab)}
                          >
                            <ShieldAlert size={16} />
                          </button>
                          <button className="btn-table-action" title="Contacter">
                            <Mail size={16} />
                          </button>
                          <button 
                            className="btn-table-action delete" 
                            onClick={() => handleDelete(user.id, activeTab)}
                            title="Supprimer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredData.length === 0 && (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
                        Aucun utilisateur trouvé pour cette recherche.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div className="admin-pagination">
                <p className="pagination-text">Affichage de {filteredData.length} résultats</p>
                <div className="pagination-btns">
                  <button className="btn-table-action"><ChevronLeft size={18} /></button>
                  <button className="btn-table-action"><ChevronRight size={18} /></button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal Ajout Utilisateur */}
      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content">
            <div className="section-header" style={{ marginBottom: '2rem' }}>
              <h2>Nouveau Profil Utilisateur</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <XCircle size={24} />
              </button>
            </div>

            <form onSubmit={handleAddUser}>
              <div className="modal-input-group">
                <label className="modal-label">TYPE DE COMPTE</label>
                <div className="role-selector">
                  <button 
                    type="button"
                    onClick={() => setNewUser({ ...newUser, role: 'professionals' })}
                    className={`role-btn ${newUser.role === 'professionals' ? 'active' : ''}`}
                  > Professionnel </button>
                  <button 
                    type="button"
                    onClick={() => setNewUser({ ...newUser, role: 'clients' })}
                    className={`role-btn ${newUser.role === 'clients' ? 'active' : ''}`}
                  > Client </button>
                </div>
              </div>

              <div className="modal-input-group">
                <label className="modal-label">NOM COMPLET</label>
                <div className="admin-search-wrapper" style={{ maxWidth: '100%' }}>
                  <input 
                    type="text" required value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    placeholder="Ex: Sophie Martin"
                  />
                </div>
              </div>

              <div className="modal-input-group">
                <label className="modal-label">EMAIL</label>
                <div className="admin-search-wrapper" style={{ maxWidth: '100%' }}>
                  <input 
                    type="email" required value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="sophie@example.com"
                  />
                </div>
              </div>

              {newUser.role === 'professionals' && (
                <div className="modal-input-group">
                  <label className="modal-label">CATÉGORIE</label>
                  <select 
                    value={newUser.category}
                    onChange={(e) => setNewUser({ ...newUser, category: e.target.value })}
                    className="modal-select"
                  >
                    <option>Santé</option>
                    <option>Automobile</option>
                    <option>Beauté</option>
                    <option>Informatique</option>
                  </select>
                </div>
              )}

              <button type="submit" className="btn-admin btn-primary-admin" style={{ marginTop: '1rem', width: '100%' }}>
                Créer l'utilisateur
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersAdmin;
