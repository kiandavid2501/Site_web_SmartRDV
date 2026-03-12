import SidebarEntreprise from '../../components/layout/SidebarEntreprise';
import { TrendingUp, TrendingDown, Activity, BarChart3, PieChart, Calendar, Download } from 'lucide-react';
import './DashboardEntreprise.css';

const StatsEntreprise = () => {
    return (
        <div className="dashboard-entreprise">
            <div style={{ display: 'flex' }}>
                <SidebarEntreprise />
                <main className="dashboard-main-area">
                    <div className="dashboard-content">
                        <header className="dashboard-header-section">
                            <div className="header-info">
                                <h1 className="dashboard-title">Analyses & Performance 📊</h1>
                                <p className="dashboard-subtitle">Suivez l'évolution de votre activité professionnelle</p>
                            </div>
                            <div className="header-actions">
                                <button className="btn-icon-text"><Download size={18} /> Télécharger le rapport</button>
                            </div>
                        </header>

                        {/* Top Overview Stats */}
                        <div className="stats-grid">
                            <div className="stat-card accent-blue">
                                <p className="stat-label">Total RDV (Mois)</p>
                                <p className="stat-value">156</p>
                                <p className="stat-trend trend-up"><TrendingUp size={14} /> +12% vs mois dernier</p>
                            </div>
                            <div className="stat-card accent-orange">
                                <p className="stat-label">Taux d'annulation</p>
                                <p className="stat-value">4.2%</p>
                                <p className="stat-trend trend-down"><TrendingDown size={14} /> -1.5% vs mois dernier</p>
                            </div>
                            <div className="stat-card accent-green">
                                <p className="stat-label">Nouveaux Clients</p>
                                <p className="stat-value">24</p>
                                <p className="stat-trend trend-up"><TrendingUp size={14} /> +5 cette semaine</p>
                            </div>
                            <div className="stat-card accent-purple">
                                <p className="stat-label">Temps Moyen / RDV</p>
                                <p className="stat-value">45min</p>
                                <p className="stat-trend">Stable</p>
                            </div>
                        </div>

                        <div className="dashboard-grid-layout">
                            <div className="main-content-column">
                                <div className="main-content-card">
                                    <h2 className="section-title">Activité par Jour de la Semaine</h2>
                                    <div style={{ height: '300px', display: 'flex', alignItems: 'flex-end', gap: '1rem', padding: '1rem 0', justifyContent: 'space-between' }}>
                                        {[
                                            { day: 'Lun', val: 65 }, { day: 'Mar', val: 80 }, 
                                            { day: 'Mer', val: 95 }, { day: 'Jeu', val: 75 }, 
                                            { day: 'Ven', val: 100 }, { day: 'Sam', val: 40 }, 
                                            { day: 'Dim', val: 10 }
                                        ].map(item => (
                                            <div key={item.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{ width: '100%', backgroundColor: '#dbeafe', borderRadius: '4px', height: `${item.val}%`, transition: 'height 1s ease', position: 'relative' }}>
                                                    <div style={{ position: 'absolute', top: '-25px', width: '100%', textAlign: 'center', fontWeight: 'bold', color: '#2563eb', fontSize: '0.8rem' }}>{item.val}</div>
                                                </div>
                                                <span style={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: '500' }}>{item.day}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="main-content-card" style={{ marginTop: '2rem' }}>
                                    <h2 className="section-title">Services les Plus Demandés</h2>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        {[
                                            { name: 'Consultation Standard', count: 45, color: '#3b82f6' },
                                            { name: 'Expertise Technique', count: 32, color: '#10b981' },
                                            { name: 'Suivi Dossier', count: 28, color: '#f59e0b' },
                                            { name: 'Premier RDV', count: 21, color: '#8b5cf6' }
                                        ].map(service => (
                                            <div key={service.name}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                                    <span style={{ fontWeight: '500' }}>{service.name}</span>
                                                    <span style={{ color: '#6b7280' }}>{service.count} RDV</span>
                                                </div>
                                                <div style={{ width: '100%', height: '8px', backgroundColor: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
                                                    <div style={{ width: `${(service.count/45)*100}%`, height: '100%', backgroundColor: service.color }}></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="side-content-column">
                                <div className="activity-card">
                                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Activity size={18} /> Points d'Attention</h3>
                                    <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <div className="activity-item" style={{ borderLeft: '3px solid #f59e0b', paddingLeft: '1rem' }}>
                                            <p className="apt-client-name">Heures creuses détectées</p>
                                            <p className="apt-service-type">Le Mardi matin entre 10h et 12h est souvent vide.</p>
                                        </div>
                                        <div className="activity-item" style={{ borderLeft: '3px solid #3b82f6', paddingLeft: '1rem' }}>
                                          <p className="apt-client-name">Pic d'activité prévu</p>
                                          <p className="apt-service-type">Forte demande pour le Vendredi après-midi cette semaine.</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default StatsEntreprise;
