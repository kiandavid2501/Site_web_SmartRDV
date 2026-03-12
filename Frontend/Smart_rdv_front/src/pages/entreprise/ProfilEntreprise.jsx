import { useState } from 'react';
import SidebarEntreprise from '../../components/layout/SidebarEntreprise';
import { Building2, Mail, Phone, MapPin, Clock, Save, Lock, Eye, EyeOff, CheckCircle2, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { STORAGE_KEYS } from '../../utils/constants';
import './DashboardEntreprise.css';

const ProfilEntreprise = () => {
    const { user, logout } = useAuth();
    const [isSaving, setIsSaving] = useState(false);
    const [showPasswords, setShowPasswords] = useState(false);
    
    const [businessData, setBusinessData] = useState({
        name: user?.nom || user?.email?.split('@')[0] || "Mon Établissement",
        email: user?.email || "",
        phone: "+33 1 23 45 67 89",
        address: "123 Rue de la Réussite, 75001 Paris",
        description: "Expert en solutions innovantes pour les professionnels.",
    });

    const [workingHours, setWorkingHours] = useState([
        { day: "Lundi", open: "09:00", close: "18:00", active: true },
        { day: "Mardi", open: "09:00", close: "18:00", active: true },
        { day: "Mercredi", open: "09:00", close: "18:00", active: true },
        { day: "Jeudi", open: "09:00", close: "18:00", active: true },
        { day: "Vendredi", open: "09:00", close: "17:00", active: true },
        { day: "Samedi", open: "10:00", close: "13:00", active: false },
        { day: "Dimanche", open: "--:--", close: "--:--", active: false },
    ]);

    const handleHourChange = (index, field, value) => {
        const newHours = [...workingHours];
        newHours[index][field] = value;
        setWorkingHours(newHours);
    };

    const toggleDay = (index) => {
        const newHours = [...workingHours];
        newHours[index].active = !newHours[index].active;
        if (newHours[index].active && (newHours[index].open === "--:--" || !newHours[index].open)) {
            newHours[index].open = "09:00";
            newHours[index].close = "18:00";
        }
        setWorkingHours(newHours);
    };

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            alert("Profil et horaires mis à jour ! ✨");
        }, 800); 
    };

    return (
        <div className="dashboard-entreprise">
            <div style={{ display: 'flex' }}>
                <SidebarEntreprise />
                <main className="dashboard-main-area">
                    <div className="dashboard-content">
                        <header className="dashboard-header-section">
                            <div className="header-info">
                                <p className="dashboard-subtitle">CONFIGURATION AVANCÉE</p>
                                <h1 className="dashboard-title">Mon Établissement</h1>
                            </div>
                            <div className="header-actions" style={{ display: 'flex', gap: '1rem' }}>
                                <button className="btn-secondary" style={{ color: '#ef4444', borderColor: '#fecaca', display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={logout}>
                                    <LogOut size={20} /> Déconnexion
                                </button>
                                <button className="btn-primary-pro" onClick={handleSave} disabled={isSaving} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Save size={20} /> {isSaving ? 'Sychronisation...' : 'Enregistrer les changements'}
                                </button>
                            </div>
                        </header>

                        <div className="dashboard-grid-layout">
                            {/* Colonne Gauche: Infos & Sécurité */}
                            <div className="main-content-column">
                                {/* Informations Générales */}
                                <div className="stat-card blue-tint" style={{ marginBottom: '2.5rem' }}>
                                    <h2 style={{ fontSize: '1.75rem', fontWeight: '900', marginBottom: '2rem', color: '#1e40af' }}>Informations Générales</h2>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                        <div className="form-group">
                                            <label className="stat-label">Nom Commercial</label>
                                            <div style={{ position: 'relative' }}>
                                                <Building2 style={{ position: 'absolute', left: '1.25rem', top: '1.25rem', color: '#3b82f6', zIndex: 1 }} size={22} />
                                                <input 
                                                    type="text" 
                                                    className="form-input"
                                                    value={businessData.name} 
                                                    onChange={(e) => setBusinessData({...businessData, name: e.target.value})}
                                                    style={{ paddingLeft: '3.75rem' }}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="stat-label">Contact Téléphonique</label>
                                            <div style={{ position: 'relative' }}>
                                                <Phone style={{ position: 'absolute', left: '1.25rem', top: '1.25rem', color: '#3b82f6', zIndex: 1 }} size={22} />
                                                <input 
                                                    type="text" 
                                                    className="form-input"
                                                    value={businessData.phone}
                                                    onChange={(e) => setBusinessData({...businessData, phone: e.target.value})}
                                                    style={{ paddingLeft: '3.75rem' }}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="stat-label">Adresse Physique</label>
                                            <div style={{ position: 'relative' }}>
                                                <MapPin style={{ position: 'absolute', left: '1.25rem', top: '1.25rem', color: '#3b82f6', zIndex: 1 }} size={22} />
                                                <input 
                                                    type="text" 
                                                    className="form-input"
                                                    value={businessData.address}
                                                    onChange={(e) => setBusinessData({...businessData, address: e.target.value})}
                                                    style={{ paddingLeft: '3.75rem' }}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="stat-label">Email Professionnel</label>
                                            <div style={{ position: 'relative' }}>
                                                <Mail style={{ position: 'absolute', left: '1.25rem', top: '1.25rem', color: '#3b82f6', zIndex: 1 }} size={22} />
                                                <input 
                                                    type="email" 
                                                    className="form-input"
                                                    value={businessData.email}
                                                    readOnly
                                                    style={{ paddingLeft: '3.75rem', background: '#f8fafc', color: '#64748b' }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group" style={{ marginTop: '2rem' }}>
                                        <label className="stat-label">Description de vos services</label>
                                        <textarea 
                                            rows="3" 
                                            className="form-input"
                                            value={businessData.description}
                                            onChange={(e) => setBusinessData({...businessData, description: e.target.value})}
                                        ></textarea>
                                    </div>
                                </div>

                                {/* Sécurité du Compte */}
                                <div className="stat-card purple-tint" style={{ marginBottom: '2.5rem' }}>
                                    <h2 style={{ fontSize: '1.75rem', fontWeight: '900', marginBottom: '2rem', color: '#4f46e5' }}>Sécurité du Compte</h2>
                                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                                        <div className="form-group">
                                            <label className="stat-label">Mot de passe actuel</label>
                                            <div style={{ position: 'relative' }}>
                                                <Lock style={{ position: 'absolute', left: '1.25rem', top: '1.25rem', color: '#6366f1', zIndex: 1 }} size={22} />
                                                <input 
                                                    type={showPasswords ? "text" : "password"}
                                                    className="form-input"
                                                    placeholder="Mot de passe actuel"
                                                    style={{ paddingLeft: '3.75rem' }}
                                                />
                                            </div>
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                            <div className="form-group">
                                                <label className="stat-label">Nouveau mot de passe</label>
                                                <input 
                                                    type={showPasswords ? "text" : "password"}
                                                    className="form-input"
                                                    placeholder="Nouveau"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="stat-label">Confirmer le mot de passe</label>
                                                <input 
                                                    type={showPasswords ? "text" : "password"}
                                                    className="form-input"
                                                    placeholder="Confirmation"
                                                />
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                                            <button 
                                                className="btn-text" 
                                                onClick={() => setShowPasswords(!showPasswords)}
                                                style={{ border: 'none', background: 'none', color: '#6366f1', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem' }}
                                            >
                                                {showPasswords ? <EyeOff size={18} /> : <Eye size={18} />} {showPasswords ? 'Masquer' : 'Afficher'}
                                            </button>
                                            <button className="btn-secondary" style={{ padding: '0.8rem 2rem' }}>
                                                Mettre à jour l'accès
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Zone Danger : Supprimer le compte */}
                                <div className="stat-card orange-tint" style={{ background: 'linear-gradient(135deg, #fff1f2 0%, #fff5f5 100%)', border: '1px solid #fecaca', padding: '1.5rem' }}>
                                    <h2 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#991b1b', marginBottom: '0.75rem' }}>Zone de Danger</h2>
                                    <p style={{ color: '#b91c1c', marginBottom: '1.25rem', fontSize: '0.9rem', fontWeight: '500', lineHeight: '1.4' }}>
                                        La suppression de votre compte est définitive. Toutes vos données seront effacées.
                                    </p>
                                    <button 
                                        className="btn-secondary" 
                                        style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', fontWeight: '800', padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}
                                        onClick={async () => {
                                            if (!user?.id) {
                                              alert("Erreur : ID utilisateur non trouvé.");
                                              return;
                                            }
                                            
                                            if(window.confirm("⚠️ ÊTES-VOUS ABSOLUMENT CERTAIN de vouloir supprimer votre établissement ? Cette action est irréversible et supprimera toutes vos données (Profil, Disponibilités, Rendez-vous).")) {
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
                                                            alert("✅ Votre établissement a été supprimé avec succès.");
                                                            logout();
                                                        } else {
                                                            const data = await response.json();
                                                            throw new Error(data.error || "Erreur lors de la suppression de l'établissement");
                                                        }
                                                    } catch (error) {
                                                        console.error("Erreur suppression entreprise:", error);
                                                        alert(`❌ Erreur : ${error.message}`);
                                                    }
                                                }
                                            }
                                        }}
                                    >
                                        Supprimer mon établissement
                                    </button>
                                </div>
                            </div>

                            {/* Colonne Droite: Horaires Éditables */}
                            <div className="side-content-column">
                                <div className="activity-card" style={{ marginBottom: '2.5rem' }}>
                                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#0f172a', marginBottom: '2rem' }}>
                                        <Clock size={24} color="#10b981" /> Horaires d'Ouverture
                                    </h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                        {workingHours.map((wh, index) => (
                                            <div key={wh.day} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1rem', borderRadius: '1rem', background: wh.active ? '#f8fafc' : '#f1f5f9', border: `1px solid ${wh.active ? '#e2e8f0' : 'transparent'}`, transition: 'all 0.2s' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <span style={{ fontWeight: '900', fontSize: '1.1rem', color: wh.active ? '#0f172a' : '#94a3b8' }}>{wh.day}</span>
                                                    <button 
                                                        onClick={() => toggleDay(index)}
                                                        style={{ border: 'none', background: wh.active ? '#10b981' : '#cbd5e1', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '2rem', fontSize: '0.75rem', fontWeight: '900', cursor: 'pointer' }}
                                                    >
                                                        {wh.active ? 'OUVERT' : 'FERMÉ'}
                                                    </button>
                                                </div>
                                                {wh.active && (
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                        <input 
                                                            type="time" 
                                                            value={wh.open} 
                                                            onChange={(e) => handleHourChange(index, 'open', e.target.value)}
                                                            style={{ width: '100%' }}
                                                        />
                                                        <span style={{ fontWeight: '900', color: '#94a3b8' }}>—</span>
                                                        <input 
                                                            type="time" 
                                                            value={wh.close} 
                                                            onChange={(e) => handleHourChange(index, 'close', e.target.value)}
                                                            style={{ width: '100%' }}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="stat-card green-tint" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', border: '1px solid #bbf7d0' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                        <CheckCircle2 color="#10b981" size={32} />
                                        <h3 style={{ color: '#065f46', fontWeight: '900', margin: 0 }}>Compte Vérifié</h3>
                                    </div>
                                    <p style={{ color: '#166534', fontSize: '0.95rem', lineHeight: '1.5', fontWeight: '500' }}>
                                        Votre certificat SmartPro est actif. Vos informations sont visibles par vos clients sur la carte interactive.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ProfilEntreprise;
