import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Calendar, Clock, MapPin, ChevronRight, Star, ArrowRight, Search, Filter, TrendingUp, CheckCircle, CalendarDays } from 'lucide-react';
import Sidebar from '../../components/layout/Sidebar';
import Card from '../../components/common/Card';
import './DashboardClient.css';

const DashboardClient = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('Tous');

  // Données de démonstration
  const stats = [
    { label: 'RDV à venir', value: 3, icon: CalendarDays, color: 'blue' },
    { label: 'Terminés ce mois', value: 8, icon: CheckCircle, color: 'green' },
    { label: 'Taux de présence', value: '100%', icon: TrendingUp, color: 'purple' },
  ];

  const nextAppointment = {
    id: 1,
    entreprise: 'Banque Nationale',
    type: 'Banque',
    adresse: '45 Avenue des Champs-Élysées, 75008 Paris',
    date: 'Aujourd\'hui',
    heure: '14:00',
    duree: '30 min',
    contact: 'M. Dupont'
  };

  const suggestions = [
    { id: 1, entreprise: 'Salon Élegance', type: 'Beauté', date: 'Demain', time: '14:00', image: 'https://images.unsplash.com/photo-1560066984-12186d30b7e7?w=150&h=150&fit=crop' },
    { id: 2, entreprise: 'Dr. House', type: 'Santé', date: 'Jeu 24', time: '09:30', image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&h=150&fit=crop' },
    { id: 3, entreprise: 'Garage Express', type: 'Auto', date: 'Ven 25', time: '11:00', image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=150&h=150&fit=crop' },
  ];

  const favorites = [
    { id: 1, name: 'Dr. Martin', type: 'Santé', image: 'https://ui-avatars.com/api/?name=Doc+Martin&background=random' },
    { id: 2, name: 'Banque Nat.', type: 'Finance', image: 'https://ui-avatars.com/api/?name=Banque+Nationale&background=random' },
  ];

  const categories = ['Tous', 'Santé', 'Beauté', 'Auto', 'Finance'];

  const upcomingAppointments = [
    { id: 2, entreprise: 'Cabinet Médical', date: '22 Jan', time: '10:00', type: 'Consultation' },
    { id: 3, entreprise: 'Centre Formation', date: '25 Jan', time: '09:00', type: 'Cours' },
    { id: 4, entreprise: 'Notaire', date: '02 Fév', time: '15:30', type: 'Signature' },
  ];

  const recentActivity = [
    { id: 1, type: 'reservations', message: 'Réservation confirmée avec Dr. Martin', time: 'Il y a 2h' },
    { id: 2, type: 'system', message: 'Mise à jour de votre profil', time: 'Hier' },
    { id: 3, type: 'alert', message: 'Rappel : RDV demain avec Dr. Martin', time: 'Hier' },
  ];

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      navigate(`/client/reservations?search=${searchTerm}`);
    }
  };

  const filteredSuggestions = suggestions.filter(sugg => {
    const matchesFilter = activeFilter === 'Tous' || sugg.type === activeFilter;
    const matchesSearch = sugg.entreprise.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filteredAppointments = upcomingAppointments.filter(rdv => 
    rdv.entreprise.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-client">
      <div className="dashboard-layout">
        <Sidebar />
        
        <main className="dashboard-main-content">
          <div className="dashboard-container">
            {/* Premium Header Section */}
            <header className="dashboard-header-section animate-fade-in-down">
              <div className="header-info">
                <h1 className="dashboard-title">Bonjour, {user?.nom || 'Isaac'} 👋</h1>
                <p className="dashboard-subtitle">Vous avez <strong>1 rendez-vous</strong> prévu aujourd'hui.</p>
              </div>
            </header>

            {/* Reminder Alert if RDV is very soon */}
            <div className="alerts-container animate-fade-in-up" style={{ marginTop: '-1rem', marginBottom: '2rem' }}>
              <div className="alert-item urgent">
                <Clock size={20} className="animate-pulse" />
                <span>Rappel : Votre rendez-vous avec <strong>{nextAppointment.entreprise}</strong> commence dans <strong>15 minutes</strong> !</span>
              </div>
            </div>

            {/* Statistics Section */}
            <div className="stats-section-grid animate-fade-in-up delay-1">
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

            {/* Hero Section - Next Appointment */}
            <div className="hero-section animate-fade-in-up delay-2">
              <div className="hero-card">
                <div className="hero-content">
                  <div className="hero-badge">Prochain Rendez-vous</div>
                  <h2 className="hero-company">{nextAppointment.entreprise}</h2>
                  <div className="hero-details">
                    <div className="detail-item">
                      <Clock size={16} />
                      <span>{nextAppointment.date} à {nextAppointment.heure} ({nextAppointment.duree})</span>
                    </div>
                    <div className="detail-item">
                      <MapPin size={16} />
                      <span>{nextAppointment.adresse}</span>
                    </div>
                  </div>
                </div>
                <div className="hero-actions">
                  <button className="btn-primary" onClick={() => navigate('/client/my-reservations')}>
                    Voir les détails
                  </button>
                </div>
              </div>
            </div>

            {/* Search & Filters */}
            <section className="search-section animate-fade-in-up delay-3">
              <div className="search-bar-container">
                <Search className="search-icon" size={20} />
                <input 
                  type="text" 
                  placeholder="Rechercher un service, un professionnel..." 
                  className="main-search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleSearch}
                />
                <button className="filter-toggle-btn">
                  <Filter size={18} />
                </button>
              </div>
              <div className="category-filters">
                {categories.map(cat => (
                  <button 
                    key={cat} 
                    className={`category-pill ${activeFilter === cat ? 'active' : ''}`}
                    onClick={() => setActiveFilter(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </section>

            {/* Suggestions - Rendez-vous possibles */}
            <section className="suggestions-section animate-fade-in-up delay-4">
              <div className="section-header">
                <h3><strong>Rendez-vous disponibles</strong></h3>
              </div>
              <div className="suggestions-grid">
                {filteredSuggestions.length > 0 ? (
                  filteredSuggestions.map(sugg => (
                    <div key={sugg.id} className="suggestion-card-clean fancy-bg">
                      <div className="suggestion-header">
                        <div className={`suggestion-icon-placeholder ${sugg.type === 'Santé' ? 'red' : 'blue'}`}>
                          {sugg.entreprise.charAt(0)}
                        </div>
                        <div>
                          <h4>{sugg.entreprise}</h4>
                          <span className="suggestion-type-badge">{sugg.type}</span>
                        </div>
                      </div>
                      <button 
                        className="btn-book-outline"
                        onClick={() => navigate(`/client/reservation/${sugg.id}`)}
                      >
                        Réserver
                      </button>
                    </div>
                  ))
                ) : (
                  <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                    Aucun rendez-vous trouvé pour ces critères.
                  </div>
                )}
              </div>
              <div className="section-footer-right">
                <button className="btn-text-link" onClick={() => navigate('/client/reservations')}>Voir plus <ArrowRight size={16} /></button>
              </div>
            </section>

            {/* Quick Access - Favorites */}
            <section className="favorites-section animate-fade-in-up delay-5">
              <div className="section-header">
                <h3>Vos Favoris</h3>
              </div>
              <div className="favorites-row">
                {favorites.map(fav => (
                  <div 
                    key={fav.id} 
                    className="favorite-item"
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/client/reservation/${fav.id}`)}
                    title={`Prendre RDV chez ${fav.name}`}
                  >
                    <img src={fav.image} alt={fav.name} className="favorite-avatar" />
                    <span className="favorite-name">{fav.name}</span>
                    <span className="favorite-type">{fav.type}</span>
                  </div>
                ))}
                <div className="favorite-item add-new" onClick={() => navigate('/client/favorites')}>
                  <div className="add-icon">+</div>
                  <span>Ajouter</span>
                </div>
              </div>
            </section>

            <div className="main-grid">
              {/* Left Column - Upcoming Timeline */}
              <div className="main-column">
                <Card className="timeline-card-redesigned">
                  <div className="card-header-clean">
                    <h3>Prochains Rendez-vous</h3>
                    <button className="link-text" onClick={() => navigate('/client/my-reservations')}>Tout voir</button>
                  </div>
                  <div className="timeline-list-clean">
                    {filteredAppointments.length > 0 ? (
                      filteredAppointments.map(rdv => (
                        <div key={rdv.id} className="timeline-item-clean">
                          <div className="date-badge">
                            <span className="date-day">{rdv.date.split(' ')[0]}</span>
                            <span className="date-month">{rdv.date.split(' ')[1]}</span>
                          </div>
                          <div className="timeline-details">
                            <h4>{rdv.entreprise}</h4>
                            <div className="meta-row">
                              <span className="t-type">{rdv.type}</span>
                              <span className="t-dot">•</span>
                              <span className="t-time">{rdv.time}</span>
                            </div>
                          </div>
                          <div className="status-pill confirmed">Confirmé</div>
                        </div>
                      ))
                    ) : (
                      <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
                        Aucun rendez-vous à venir trouvé.
                      </div>
                    )}
                  </div>
                </Card>
              </div>

              {/* Right Column - Activity Feed */}
              <div className="sidebar-column">
                <Card className="activity-card-redesigned">
                  <div className="card-header-clean">
                    <h3>Activité Récente</h3>
                  </div>
                  <div className="activity-list-feed">
                    {recentActivity.map(act => (
                      <div key={act.id} className="feed-item">
                        <div className="feed-icon-wrapper">
                          <div className={`feed-line`}></div>
                          <div className={`feed-dot ${act.type}`}></div>
                        </div>
                        <div className="feed-content">
                          <p>{act.message}</p>
                          <span>{act.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Promo / Tip Card */}
                <div className="tip-card-clean">
                  <div className="tip-icon-circle"><Star size={18} /></div>
                  <div className="tip-content">
                    <h4>Astuce</h4>
                    <p>Complétez votre profil pour des réservations plus rapides.</p>
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

export default DashboardClient;