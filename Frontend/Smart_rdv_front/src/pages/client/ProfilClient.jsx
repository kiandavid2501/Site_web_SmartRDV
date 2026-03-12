import { useState } from 'react';
import { LogOut, User, Mail, Phone, MapPin, Edit3, ArrowLeft, Trash2, Camera, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { STORAGE_KEYS } from '../../utils/constants';
import Sidebar from '../../components/layout/Sidebar';
import Card from '../../components/common/Card';
import './DashboardClient.css';

const ProfilClient = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock user data
  const [formData, setFormData] = useState({
    firstName: 'Mohamed',
    lastName: 'Benali',
    email: 'mohamed.benali@example.com',
    phone: '06 12 34 56 78',
    address: '123 Boulevard de la Liberté, Casablanca',
  });

  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const [activityHistory] = useState([
    { id: 1, action: "Réservation effectuée", target: "Dr. Martin", date: "Aujourd'hui, 09:30" },
    { id: 2, action: "Profil mis à jour", target: "Adresse", date: "Hier, 15:45" },
    { id: 3, action: "Connexion réussie", target: "Nouvel appareil", date: "29 Jan 2026, 08:20" },
  ]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setIsEditing(false);
    alert('Profil mis à jour avec succès !');
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (passwordData.new !== passwordData.confirm) {
      alert("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }
    alert("Mot de passe mis à jour avec succès !");
    setPasswordData({ current: '', new: '', confirm: '' });
  };

  const handleDeleteAccount = async () => {
    if (!user?.id) {
      alert("Erreur : ID utilisateur non trouvé.");
      return;
    }

    const confirm1 = window.confirm("⚠️ Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible et supprimera toutes vos données (Profil, Rendez-vous, etc.).");
    if(confirm1) {
      const confirm2 = window.prompt("Veuillez saisir 'SUPPRIMER' pour confirmer la suppression définitive :");
      if (confirm2 === 'SUPPRIMER') {
        try {
          const response = await fetch(`http://localhost:8081/api/users/${user.id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${sessionStorage.getItem(STORAGE_KEYS.TOKEN)}`
            }
          });

          if (response.ok) {
            alert("✅ Votre compte a été supprimé avec succès. Vous allez être redirigé.");
            logout();
          } else {
            const data = await response.json();
            throw new Error(data.error || "Erreur lors de la suppression du compte");
          }
        } catch (error) {
          console.error("Erreur suppression compte:", error);
          alert(`❌ Erreur : ${error.message}`);
        }
      }
    }
  };

  return (
    <div className="dashboard-client">
      <div className="dashboard-layout">
        <Sidebar />
        <main className="dashboard-main-content">
          <div className="dashboard-container">
            
            {!isEditing ? (
              /* --- VIEW MODE --- */
              <>
                <div className="dashboard-header animate-fade-in-down">
                  <h1 className="dashboard-title">Mon Profil</h1>
                  <p className="dashboard-subtitle">Gérez vos informations personnelles.</p>
                </div>

                <div className="profile-view-grid animate-fade-in-up delay-1">
                  {/* Top Card: Identity */}
                  <Card className="profile-identity-card">
                    <div className="profile-header-large">
                      <div className="avatar-large">
                        {formData.firstName.charAt(0)}{formData.lastName.charAt(0)}
                      </div>
                      <div className="profile-title-block">
                        <h2>{formData.firstName} {formData.lastName} 👋</h2>
                        <span className="badge-role">Client Premium</span>
                      </div>
                      <button 
                        className="btn-edit-profile" 
                        onClick={() => setIsEditing(true)}
                        title="Modifier mon profil"
                      >
                        <Edit3 size={18} /> Modifier
                      </button>
                    </div>

                    <div className="profile-details-list" style={{ borderBottom: '1px solid #f1f5f9', marginBottom: '2rem', paddingBottom: '2rem' }}>
                      <div className="profile-detail-item">
                        <div className="detail-icon"><Mail size={18} /></div>
                        <div className="detail-content">
                          <span className="detail-label">Email</span>
                          <span className="detail-value">{formData.email}</span>
                        </div>
                      </div>
                      <div className="profile-detail-item">
                        <div className="detail-icon"><Phone size={18} /></div>
                        <div className="detail-content">
                          <span className="detail-label">Téléphone</span>
                          <span className="detail-value">{formData.phone}</span>
                        </div>
                      </div>
                      <div className="profile-detail-item">
                        <div className="detail-icon"><MapPin size={18} /></div>
                        <div className="detail-content">
                          <span className="detail-label">Adresse</span>
                          <span className="detail-value">{formData.address}</span>
                        </div>
                      </div>
                    </div>

                    <div className="activity-history-section">
                      <h3 style={{ fontSize: '1.2rem', fontWeight: '900', marginBottom: '1.5rem', color: '#1e293b' }}>Journal d'Activité</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {activityHistory.map(item => (
                          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f8fafc', borderRadius: '0.75rem', border: '1px solid #f1f5f9' }}>
                            <div>
                              <p style={{ fontWeight: '700', color: '#1e293b', fontSize: '0.95rem' }}>{item.action}</p>
                              <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Cible : {item.target}</p>
                            </div>
                            <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{item.date}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>

                  {/* Actions / Logout */}
                  <div className="profile-actions-area">
                    <button onClick={logout} className="btn-logout-styled">
                      <LogOut size={18} />
                      <span>Se déconnecter de l'application</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* --- EDIT MODE --- */
              <>
                <div className="dashboard-header animate-fade-in-down">
                  <button onClick={() => setIsEditing(false)} className="btn-back-link">
                     <ArrowLeft size={20} /> Retour au profil
                  </button>
                  <h1 className="dashboard-title" style={{ marginTop: '1rem'}}>Modification du Profil</h1>
                </div>

                <div className="animate-fade-in-up delay-1">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <Card className="edit-form-card">
                      <h3 style={{ fontSize: '1.3rem', fontWeight: '900', marginBottom: '2rem', color: '#1e293b' }}>Informations Personnelles</h3>
                      <form onSubmit={handleSaveProfile} className="edit-profile-form">
                        
                        <div className="form-row">
                          <div className="form-group">
                            <label>Prénom</label>
                            <input 
                              type="text" 
                              name="firstName" 
                              value={formData.firstName} 
                              onChange={handleChange} 
                              className="form-input" 
                            />
                          </div>
                          <div className="form-group">
                            <label>Nom</label>
                            <input 
                              type="text" 
                              name="lastName" 
                              value={formData.lastName} 
                              onChange={handleChange} 
                              className="form-input" 
                            />
                          </div>
                        </div>

                        <div className="form-group disabled-group">
                          <label>Email (Sécurisé)</label>
                          <div className="input-with-icon">
                            <Shield size={16} />
                            <input 
                              type="email" 
                              name="email" 
                              value={formData.email} 
                              disabled 
                              className="form-input disabled" 
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label>Téléphone</label>
                          <input 
                            type="tel" 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleChange} 
                            className="form-input" 
                          />
                        </div>

                        <div className="form-group">
                          <label>Adresse</label>
                          <input 
                            type="text" 
                            name="address" 
                            value={formData.address} 
                            onChange={handleChange} 
                            className="form-input" 
                          />
                        </div>

                        <div className="form-actions-footer">
                          <button type="button" onClick={() => setIsEditing(false)} className="btn-ghost">Annuler</button>
                          <button type="submit" className="btn-primary">Enregistrer les changements</button>
                        </div>
                      </form>
                    </Card>

                    <Card style={{ padding: '2.5rem' }}>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: '900', marginBottom: '2rem', color: '#1e293b' }}>Sécurité & Accès</h3>
                      <form onSubmit={handleUpdatePassword} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="form-group">
                          <label>Mot de passe actuel</label>
                          <input 
                            type="password" 
                            className="form-input" 
                            placeholder="Saisissez votre mot de passe actuel"
                            value={passwordData.current}
                            onChange={(e) => setPasswordData({...passwordData, current: e.target.value})}
                          />
                        </div>
                        <div className="form-row">
                          <div className="form-group">
                            <label>Nouveau mot de passe</label>
                            <input 
                              type="password" 
                              className="form-input" 
                              placeholder="Nouveau mot de passe"
                              value={passwordData.new}
                              onChange={(e) => setPasswordData({...passwordData, new: e.target.value})}
                            />
                          </div>
                          <div className="form-group">
                            <label>Confirmation</label>
                            <input 
                              type="password" 
                              className="form-input" 
                              placeholder="Confirmez le mot de passe"
                              value={passwordData.confirm}
                              onChange={(e) => setPasswordData({...passwordData, confirm: e.target.value})}
                            />
                          </div>
                        </div>
                        <button type="submit" className="btn-secondary" style={{ width: 'fit-content' }}>Mettre à jour l'accès</button>
                      </form>

                      <div className="danger-zone-divider" style={{ margin: '2.5rem 0' }}></div>
                      
                      <div className="danger-zone-container" style={{ background: '#fff1f2', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #fecdd3' }}>
                        <div className="danger-info">
                          <h4 style={{ color: '#991b1b', fontWeight: '900' }}>Supprimer le compte</h4>
                          <p style={{ color: '#be123c', fontSize: '0.9rem' }}>Cette action supprimera toutes vos réservations et données définitivement.</p>
                        </div>
                        <button type="button" onClick={handleDeleteAccount} className="btn-danger-outline" style={{ background: 'white', borderColor: '#f43f5e', color: '#f43f5e' }}>
                          <Trash2 size={16} /> Détruire mon compte
                        </button>
                      </div>
                    </Card>
                  </div>
                </div>
              </>
            )}
            
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilClient;
