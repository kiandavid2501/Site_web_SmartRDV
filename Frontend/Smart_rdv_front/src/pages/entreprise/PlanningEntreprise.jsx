import { useState } from 'react';
import SidebarEntreprise from '../../components/layout/SidebarEntreprise';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Plus, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  Lock, 
  Unlock, 
  Copy, 
  Settings2,
  AlertCircle
} from 'lucide-react';
import './DashboardEntreprise.css';

const PlanningEntreprise = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState('daily'); // daily, weekly
  
  // Data: Slots and Blocks
  const [slots, setSlots] = useState([
    { id: 1, date: '2026-02-01', time: '09:00', duration: 30, type: 'slot', capacity: 5, booked: 2 },
    { id: 2, date: '2026-02-01', time: '10:00', duration: 30, type: 'slot', capacity: 5, booked: 5 },
    { id: 3, date: '2026-02-01', time: '11:00', duration: 60, type: 'block', title: 'Pause Déjeuner' },
    { id: 4, date: '2026-02-02', time: '14:00', duration: 45, type: 'slot', capacity: 10, booked: 0 },
  ]);

  const [newSlot, setNewSlot] = useState({
    time: '09:00',
    duration: 30,
    type: 'slot',
    capacity: 1,
    title: ''
  });

  const handleDelete = (id) => {
    if(confirm('Supprimer cet élément du planning ?')) {
      setSlots(slots.filter(s => s.id !== id));
    }
  };

  const handleAddAction = (e) => {
    e.preventDefault();
    const item = {
      id: Date.now(),
      date: selectedDate.toISOString().split('T')[0],
      ...newSlot,
      booked: 0
    };
    setSlots([...slots, item]);
    setShowAddModal(false);
    setNewSlot({ ...newSlot, title: '' });
  };

  const dateString = selectedDate.toISOString().split('T')[0];
  const dailyItems = slots
    .filter(s => s.date === dateString)
    .sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="dashboard-entreprise">
      <div style={{ display: 'flex' }}>
        <SidebarEntreprise />
        
        <main className="dashboard-main-area">
          <div className="dashboard-content">
            
            <header className="dashboard-header-section">
              <div className="header-info">
                <h1 className="dashboard-title">Gestion du Planning ⏱️</h1>
                <p className="dashboard-subtitle">Créez des créneaux ou bloquez des périodes d'absence</p>
              </div>
              <div className="header-actions">
                <button className="btn-icon-text" style={{ marginRight: '1rem' }} onClick={() => alert('Planning copié sur la semaine suivante !')}>
                   <Copy size={18} /> Dupliquer la semaine
                </button>
                <button className="btn-primary-pro" onClick={() => setShowAddModal(true)}>
                  <Plus size={20} /> Ajouter au planning
                </button>
              </div>
            </header>

            <div className="dashboard-grid-layout">
              {/* Left: Interactive Calendar Mockup */}
              <div className="side-content-column">
                <div className="main-content-card">
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ fontWeight: '700' }}>Février 2026</h3>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn-more"><ChevronLeft size={18} /></button>
                      <button className="btn-more"><ChevronRight size={18} /></button>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.25rem', textAlign: 'center' }}>
                    {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(d => <span key={d} style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#9ca3af', marginBottom: '0.5rem' }}>{d}</span>)}
                    {Array.from({length: 28}, (_, i) => i + 1).map(day => (
                      <button 
                        key={day}
                        onClick={() => {
                          const d = new Date(2026, 1, day);
                          setSelectedDate(d);
                        }}
                        style={{ 
                          padding: '0.6rem', borderRadius: '0.5rem', border: 'none', 
                          background: day === (selectedDate.getMonth() === 1 ? selectedDate.getDate() : 0) ? '#2563eb' : 'transparent',
                          color: day === (selectedDate.getMonth() === 1 ? selectedDate.getDate() : 0) ? 'white' : '#374151',
                          cursor: 'pointer', fontSize: '0.85rem'
                        }}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="notice-card" style={{ marginTop: '2rem' }}>
                  <h3>Rappel 💡</h3>
                  <p>Les créneaux bloqués empèchent toute réservation automatique par les clients.</p>
                </div>
              </div>

              {/* Right: Daily Timeline */}
              <div className="main-content-column">
                <div className="agenda-card">
                  <div className="card-header">
                    <h2 className="card-title">
                      {selectedDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </h2>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                       <button className={`status-badge ${viewMode === 'daily' ? 'confirmed' : ''}`} onClick={() => setViewMode('daily')}>Jour</button>
                    </div>
                  </div>

                  <div className="appointments-list" style={{ minHeight: '400px' }}>
                    {dailyItems.length === 0 ? (
                      <div style={{ padding: '4rem', textAlign: 'center', color: '#9ca3af' }}>
                        <CalendarIcon size={48} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
                        <p>Aucune activité prévue ce jour.</p>
                      </div>
                    ) : (
                      dailyItems.map(item => (
                        <div key={item.id} className="appointment-item" style={{ 
                          borderLeft: `5px solid ${item.type === 'block' ? '#94a3b8' : (item.booked >= item.capacity ? '#ef4444' : '#22c55e')}`
                        }}>
                          <div className="apt-time-column">
                            <span className="apt-time">{item.time}</span>
                            <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{item.duration}m</span>
                          </div>

                          <div className="apt-main-info">
                            <div className="apt-client-profile">
                              <div className="apt-avatar" style={{ background: item.type === 'block' ? '#f3f4f6' : '#2563eb', color: item.type === 'block' ? '#6b7280' : 'white' }}>
                                {item.type === 'block' ? <Lock size={16} /> : <Clock size={16} />}
                              </div>
                              <div>
                                <p className="apt-client-name">{item.type === 'block' ? (item.title || 'Indisponible') : 'Créneau Ouvert'}</p>
                                <p className="apt-service-type">
                                  {item.type === 'block' ? 'Période bloquée' : `${item.booked}/${item.capacity} réservations`}
                                </p>
                              </div>
                            </div>

                            <div className="apt-controls">
                               <button className="btn-more" onClick={() => handleDelete(item.id)}><Trash2 size={18} color="#ef4444" /></button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal for adding element */}
            {showAddModal && (
              <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
                <div className="main-content-card" style={{ width: '100%', maxWidth: '450px' }}>
                  <h2 className="section-title">Ajouter au Planning</h2>
                  <form onSubmit={handleAddAction}>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                      <button 
                        type="button" 
                        className={`btn-secondary-full ${newSlot.type === 'slot' ? 'confirmed' : ''}`}
                        onClick={() => setNewSlot({...newSlot, type: 'slot'})}
                        style={{ flex: 1, padding: '0.5rem', borderColor: newSlot.type === 'slot' ? '#2563eb' : '#e5e7eb', background: newSlot.type === 'slot' ? '#eff6ff' : 'white' }}
                      >Créneau</button>
                       <button 
                        type="button" 
                        className={`btn-secondary-full ${newSlot.type === 'block' ? 'confirmed' : ''}`}
                        onClick={() => setNewSlot({...newSlot, type: 'block'})}
                        style={{ flex: 1, padding: '0.5rem', borderColor: newSlot.type === 'block' ? '#2563eb' : '#e5e7eb', background: newSlot.type === 'block' ? '#eff6ff' : 'white' }}
                      >Blocage</button>
                    </div>

                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                      <label className="stat-label">Heure de début</label>
                      <input type="time" required value={newSlot.time} onChange={e => setNewSlot({...newSlot, time: e.target.value})} className="form-input" />
                    </div>

                    {newSlot.type === 'block' ? (
                      <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <label className="stat-label">Motif du blocage</label>
                        <input type="text" placeholder="Ex: Pause déjeuner, Congé..." value={newSlot.title} onChange={e => setNewSlot({...newSlot, title: e.target.value})} className="form-input" />
                      </div>
                    ) : (
                      <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <label className="stat-label">Capacité d'accueil</label>
                        <input type="number" min="1" value={newSlot.capacity} onChange={e => setNewSlot({...newSlot, capacity: parseInt(e.target.value)})} className="form-input" />
                      </div>
                    )}

                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                      <label className="stat-label">Durée (minutes)</label>
                      <select value={newSlot.duration} onChange={e => setNewSlot({...newSlot, duration: parseInt(e.target.value)})} className="form-input">
                        <option value={15}>15 min</option>
                        <option value={30}>30 min</option>
                        <option value={45}>45 min</option>
                        <option value={60}>1 heure</option>
                      </select>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button type="button" className="btn-secondary-full" onClick={() => setShowAddModal(false)}>Annuler</button>
                      <button type="submit" className="btn-primary-pro" style={{ flex: 1 }}>Confirmer</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PlanningEntreprise;
