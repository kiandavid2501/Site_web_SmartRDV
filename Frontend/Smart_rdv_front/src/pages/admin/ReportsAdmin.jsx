import { useState } from 'react';
import SidebarAdmin from '../../components/layout/SidebarAdmin';
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight,
  Filter,
  FileText,
  FileSpreadsheet
} from 'lucide-react';
import './DashboardAdmin.css';

const ReportsAdmin = () => {
  const [period, setPeriod] = useState('Mensuel');

  // Mock data for visualizations
  const categoryStats = [
    { name: 'Santé', value: 85, color: '#ef4444' },
    { name: 'Automobile', value: 65, color: '#3b82f6' },
    { name: 'Beauté', value: 92, color: '#ec4899' },
    { name: 'Services IT', value: 45, color: '#10b981' },
  ];

  const monthlyActivity = [
    { day: 'Lun', value: 45 },
    { day: 'Mar', value: 52 },
    { day: 'Mer', value: 38 },
    { day: 'Jeu', value: 65 },
    { day: 'Ven', value: 78 },
    { day: 'Sam', value: 82 },
    { day: 'Dim', value: 20 },
  ];

  return (
    <div className="admin-dashboard">
      <div className="admin-layout" style={{ display: 'flex' }}>
        <SidebarAdmin />
        
        <main className="admin-main-content">
          <div className="admin-container">
            <header className="admin-header">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                <div>
                  <h1 className="admin-title">Analytiques & Rapports</h1>
                  <p className="admin-subtitle">Suivi des performances stratégiques de la plateforme</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button className="btn-admin btn-secondary-admin" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FileText size={18} /> PDF
                  </button>
                  <button className="btn-admin btn-primary-admin" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Download size={18} /> Exporter Excel
                  </button>
                </div>
              </div>
            </header>

            <div className="admin-filters-bar">
              <div className="admin-tabs">
                {['Hebdomadaire', 'Mensuel', 'Annuel'].map(t => (
                  <button key={t} className={`admin-tab ${period === t ? 'active' : ''}`} onClick={() => setPeriod(t)}>{t}</button>
                ))}
              </div>
              <button className="btn-quick-action" style={{ width: 'auto', marginTop: 0 }}>
                <Calendar size={18} /> Janvier 2024 - Mars 2024
              </button>
            </div>

            <div className="admin-main-grid">
              <div className="admin-grid-col-2">
                <section className="admin-section-card">
                  <div className="section-header">
                    <h2>Volume de Rendez-vous</h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontWeight: 800 }}>
                      <ArrowUpRight size={18} /> +24% ce mois
                    </div>
                  </div>
                  <div className="css-chart-container" style={{ height: '300px', display: 'flex', alignItems: 'flex-end', gap: '1.5rem', padding: '1rem 0' }}>
                    {monthlyActivity.map((item, idx) => (
                      <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                        <div className="chart-bar" style={{ 
                          width: '100%', 
                          height: `${item.value}%`, 
                          background: 'linear-gradient(180deg, #3b82f6 0%, #2563eb 100%)',
                          borderRadius: '8px 8px 0 0',
                          position: 'relative',
                          transition: 'height 1s ease-out',
                          animation: `growBar 1s ease-out ${idx * 0.1}s backwards`
                        }}>
                          <div className="bar-tooltip">{item.value * 12}</div>
                        </div>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8' }}>{item.day}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <div className="admin-main-grid" style={{ marginTop: '2rem', gridTemplateColumns: '1fr 1fr' }}>
                  <section className="admin-section-card">
                    <h2>Taux d'Annulation</h2>
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem 0' }}>
                      <div className="donut-chart" style={{
                        width: '150px',
                        height: '150px',
                        borderRadius: '50%',
                        background: 'conic-gradient(#ef4444 0% 12%, #f1f5f9 12% 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative'
                      }}>
                        <div style={{ width: '110px', height: '110px', background: 'white', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ef4444' }}>12%</span>
                          <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 700 }}>NO-SHOW</span>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="admin-section-card">
                    <h2>Nouveaux Pros</h2>
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem 0' }}>
                      <div className="donut-chart" style={{
                        width: '150px',
                        height: '150px',
                        borderRadius: '50%',
                        background: 'conic-gradient(#8b5cf6 0% 65%, #f1f5f9 65% 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <div style={{ width: '110px', height: '110px', background: 'white', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#8b5cf6' }}>+65%</span>
                          <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 700 }}>GROWTH</span>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>

              <div className="admin-grid-col-1">
                <section className="admin-section-card">
                  <h2>Répartition par Secteur</h2>
                  <div className="sector-distribution" style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {categoryStats.map((cat, idx) => (
                      <div key={idx} className="sector-item">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 700 }}>
                          <span>{cat.name}</span>
                          <span>{cat.value}%</span>
                        </div>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${cat.value}%`, background: cat.color }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="admin-section-card" style={{ marginTop: '2rem' }}>
                  <h2>KPIs Critiques</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                    <div className="kpi-mini">
                      <p>Temps moyen conversion</p>
                      <strong>4.2 Jours</strong>
                    </div>
                    <div className="kpi-mini">
                      <p>Temps d'attente moyen</p>
                      <strong>12 min</strong>
                    </div>
                    <div className="kpi-mini">
                      <p>Disponibilité plateforme</p>
                      <strong style={{ color: '#10b981' }}>99.98%</strong>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
      <style>{`
        .chart-bar:hover .bar-tooltip {
          opacity: 1;
        }
        .bar-tooltip {
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          background: #1e293b;
          color: white;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 0.7rem;
          opacity: 0;
          transition: 0.2s;
        }
        @keyframes growBar {
          from { height: 0; }
        }
        .kpi-mini {
          padding: 1rem;
          background: #f8fafc;
          border-radius: 0.75rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .kpi-mini p { font-size: 0.8rem; font-weight: 600; color: #64748b; }
        .kpi-mini strong { font-size: 0.95rem; font-weight: 800; }
      `}</style>
    </div>
  );
};

export default ReportsAdmin;
