import { useState } from 'react';
import { CalendarDays, CheckCircle, TrendingUp, Clock, MapPin, XCircle, Download, FileText, ChevronRight } from 'lucide-react';
import Sidebar from '../../components/layout/Sidebar';
import Card from '../../components/common/Card';
import './DashboardClient.css';

const MesReservations = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [appointments, setAppointments] = useState([
    { id: 1, entreprise: 'Cabinet Médical Dr. Martin', type: 'Santé', date: 'Aujourd\'hui', time: '14:00', status: 'confirmed', address: '123 Rue de la Santé, Paris' },
    { id: 2, entreprise: 'Salon Élegance', type: 'Beauté', date: 'Demain', time: '10:30', status: 'confirmed', address: '45 Av. de la République, Paris' },
    { id: 3, entreprise: 'Garage Express', type: 'Auto', date: '25 Jan 2026', time: '09:00', status: 'completed', address: '12 Zone Industrielle, Lyon' },
    { id: 4, entreprise: 'Dr. House', type: 'Santé', date: '20 Jan 2026', time: '15:30', status: 'completed', address: '10 Rue de la Paix, Paris' },
  ]);

  const stats = [
    { label: 'RDV à venir', value: appointments.filter(a => a.status === 'confirmed').length, icon: CalendarDays, color: 'blue' },
    { label: 'Terminés ce mois', value: appointments.filter(a => a.status === 'completed').length, icon: CheckCircle, color: 'green' },
    { label: 'Taux de présence', value: '100%', icon: TrendingUp, color: 'purple' },
  ];

  const handleCancel = (id) => {
    if (window.confirm("Voulez-vous vraiment annuler ce rendez-vous ?")) {
      setAppointments(appointments.map(a => a.id === id ? { ...a, status: 'cancelled' } : a));
      alert("Rendez-vous annulé.");
    }
  };

  const downloadPDF = (rdv) => {
    alert(`Téléchargement du récapitulatif PDF pour le RDV chez ${rdv.entreprise}...`);
    // Simulated PDF download logic
    const content = `Récapitulatif - ${rdv.entreprise}\nDate: ${rdv.date}\nHeure: ${rdv.time}\nLieu: ${rdv.address}`;
    const blob = new Blob([content], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `smartrdv_${rdv.id}.pdf`;
    a.click();
  };

  const filteredApps = appointments.filter(a => 
    activeTab === 'upcoming' ? (a.status === 'confirmed' || a.status === 'pending') : (a.status === 'completed' || a.status === 'cancelled')
  );

  return (
    <div className="dashboard-client">
      <div className="dashboard-layout">
        <Sidebar />
        <main className="dashboard-main-content">
          <div className="dashboard-container">
            <div className="dashboard-header animate-fade-in-down">
              <h1 className="dashboard-title">Mes Rendez-vous</h1>
              <p className="dashboard-subtitle">Consultez vos rendez-vous programmés.</p>
            </div>

            {/* Statistics Section */}
            <div className="stats-section-grid animate-fade-in-up delay-1" style={{ marginBottom: '2rem' }}>
              {stats.map((stat, index) => (
                <div key={index} className="stat-card-mini">
                  <div className={`stat-icon-wrapper ${stat.color}`}>
                    <stat.icon size={20} />
                  </div>
                  <div className="stat-content-mini">
                    <span className="stat-value-mini">{stat.value}</span>
                    <span className="stat-label-mini">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Tabs Navigation */}
            <div className="category-filters animate-fade-in-up delay-2" style={{ marginBottom: '2rem' }}>
              <button 
                className={`category-pill ${activeTab === 'upcoming' ? 'active' : ''}`}
                onClick={() => setActiveTab('upcoming')}
              >
                À venir
              </button>
              <button 
                className={`category-pill ${activeTab === 'past' ? 'active' : ''}`}
                onClick={() => setActiveTab('past')}
              >
                Historique
              </button>
            </div>

            <div className="appointments-list-container animate-fade-in-up delay-3">
              {filteredApps.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {filteredApps.map(rdv => (
                    <Card key={rdv.id} style={{ padding: '1.5rem', border: '1px solid #e2e8f0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                          <div style={{ padding: '1rem', background: '#eff6ff', borderRadius: '1rem', color: '#2563eb' }}>
                            <CalendarDays size={24} />
                          </div>
                          <div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '0.25rem' }}>{rdv.entreprise}</h3>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', color: '#64748b', fontSize: '0.9rem' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Clock size={16} /> {rdv.date} à {rdv.time}</div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><MapPin size={16} /> {rdv.address}</div>
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.75rem' }}>
                          <span className={`status-pill ${rdv.status === 'confirmed' ? 'confirmed' : rdv.status === 'completed' ? 'completed' : 'cancelled'}`} style={{ 
                            padding: '0.4rem 0.8rem', 
                            borderRadius: '2rem', 
                            fontSize: '0.75rem', 
                            fontWeight: '900',
                            background: rdv.status === 'confirmed' ? '#dcfce7' : rdv.status === 'completed' ? '#f1f5f9' : '#fee2e2',
                            color: rdv.status === 'confirmed' ? '#166534' : rdv.status === 'completed' ? '#475569' : '#991b1b'
                          }}>
                            {rdv.status.toUpperCase()}
                          </span>
                          
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {rdv.status === 'confirmed' && (
                              <button className="btn-text" style={{ color: '#ef4444', fontSize: '0.85rem' }} onClick={() => handleCancel(rdv.id)}>
                                Annuler
                              </button>
                            )}
                            <button className="btn-text" style={{ color: '#2563eb', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }} onClick={() => downloadPDF(rdv)}>
                              <Download size={14} /> PDF
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '4rem', background: 'white', borderRadius: '1.5rem', border: '1px solid #e2e8f0' }}>
                  <FileText size={48} style={{ color: '#cbd5e1', marginBottom: '1rem' }} />
                  <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Aucun rendez-vous trouvé dans cette catégorie.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MesReservations;
