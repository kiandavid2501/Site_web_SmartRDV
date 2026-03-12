import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Search, MapPin, Star, Filter, Heart, Clock } from 'lucide-react';
import Sidebar from '../../components/layout/Sidebar';
import Card from '../../components/common/Card';
import './DashboardClient.css';

const Reservation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [selectedProvider, setSelectedProvider] = useState(null);
  const [favorites, setFavorites] = useState([1]); // Mock: Dr Martin is already in favorites
  const [filters, setFilters] = useState({
    category: 'Tous',
    search: searchParams.get('search') || ''
  });

  useEffect(() => {
    const s = searchParams.get('search');
    if (s) {
      setFilters(prev => ({ ...prev, search: s }));
    }
  }, [searchParams]);

  const categories = ['Tous', 'Santé', 'Beauté', 'Auto', 'Finance', 'Conseil'];

  // Mock data for search results
  const providers = [
    { 
      id: 1, 
      name: "Cabinet Médical Dr. Martin", 
      type: "Santé", 
      address: "123 Rue de la Santé, Paris",
      rating: 4.8,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&h=150&fit=crop",
      description: "Médecin généraliste avec 15 ans d'expérience. Spécialisé en pédiatrie et nutrition.",
      horaires: "Lun-Ven: 09:00 - 18:00"
    },
    { 
      id: 2, 
      name: "Salon Élegance", 
      type: "Beauté", 
      address: "45 Av. de la République, Paris",
      rating: 4.5,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1560066984-12186d30b7e7?w=150&h=150&fit=crop",
      description: "Salon de coiffure et soins esthétiques haut de gamme pour hommes et femmes.",
      horaires: "Mar-Sam: 10:00 - 19:00"
    },
    { 
      id: 3, 
      name: "Garage Express", 
      type: "Auto", 
      address: "12 Zone Industrielle, Lyon",
      rating: 4.2,
      reviews: 45,
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=150&h=150&fit=crop",
      description: "Entretien, réparation et diagnostic automobile toutes marques. Rapide et efficace.",
      horaires: "Lun-Ven: 08:00 - 17:30"
    }
  ];

  const filteredProviders = providers.filter(p => {
    const matchCategory = filters.category === 'Tous' || p.type === filters.category;
    const searchLower = filters.search.toLowerCase();
    const matchSearch = 
      p.name.toLowerCase().includes(searchLower) || 
      p.type.toLowerCase().includes(searchLower) ||
      p.address.toLowerCase().includes(searchLower);
    return matchCategory && matchSearch;
  });

  const toggleFavorite = (e, id) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  return (
    <div className="dashboard-client">
      <div className="dashboard-layout">
        <Sidebar />
        <main className="dashboard-main-content">
          <div className="dashboard-container">
            <div className="dashboard-header animate-fade-in-down">
              <h1 className="dashboard-title">Prendre un Rendez-vous</h1>
              <p className="dashboard-subtitle">Recherchez et réservez chez vos professionnels préférés.</p>
            </div>

            {/* Advanced Search & Filters */}
            <div className="search-section animate-fade-in-up delay-1">
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="search-bar-container" style={{ margin: 0, flex: 1 }}>
                  <Search className="search-icon" size={20} />
                  <input 
                    type="text" 
                    placeholder="Rechercher par nom, service ou ville..." 
                    className="main-search-input"
                    value={filters.search}
                    onChange={(e) => setFilters({...filters, search: e.target.value})}
                  />
                </div>
                <button className="btn-primary" style={{ padding: '0 2rem' }}>Rechercher</button>
              </div>

              <div className="category-filters">
                {categories.map(cat => (
                  <button 
                    key={cat} 
                    className={`category-pill ${filters.category === cat ? 'active' : ''}`}
                    onClick={() => setFilters({...filters, category: cat})}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Grid */}
            <div className="suggestions-grid animate-fade-in-up delay-2">
              {filteredProviders.length > 0 ? (
                filteredProviders.map(provider => (
                  <div 
                    key={provider.id} 
                    className="suggestion-card-clean fancy-bg" 
                    style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem', cursor: 'pointer' }}
                    onClick={() => setSelectedProvider(provider)}
                  >
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <div className={`suggestion-icon-placeholder ${provider.type === 'Santé' ? 'red' : 'blue'}`} style={{ width: '60px', height: '60px', fontSize: '1.5rem' }}>
                          {provider.name.charAt(0)}
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '0.2rem' }}>{provider.name}</h3>
                        <span style={{ fontSize: '0.9rem', color: '#64748b' }}>{provider.type}</span>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.9rem' }}>
                      <MapPin size={16} />
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{provider.address}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#fbbf24', fontWeight: '600' }}>
                        < Star size={16} fill="#fbbf24" />
                        {provider.rating}
                      </div>
                      <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>({provider.reviews} avis)</span>
                    </div>

                    <div style={{ marginTop: 'auto', display: 'flex', gap: '0.50rem' }}>
                      <button 
                        className={`btn-favorite-icon ${favorites.includes(provider.id) ? 'active' : ''}`}
                        style={{ 
                          padding: '0.6rem', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          background: favorites.includes(provider.id) ? '#fff1f2' : '#f8fafc',
                          border: `1px solid ${favorites.includes(provider.id) ? '#fecdd3' : '#e2e8f0'}`,
                          borderRadius: '0.75rem',
                          color: favorites.includes(provider.id) ? '#e11d48' : '#94a3b8',
                          transition: 'all 0.3s ease'
                        }}
                        onClick={(e) => toggleFavorite(e, provider.id)}
                      >
                        <Heart size={20} fill={favorites.includes(provider.id) ? "currentColor" : "none"} />
                      </button>
                      <button 
                        className="btn-primary" 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/client/reservation/${provider.id}`);
                        }}
                        style={{ flex: 2, padding: '0.6rem', fontSize: '0.85rem', justifyContent: 'center' }}
                      >
                        Réserver
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                  Aucun professionnel ne correspond à votre recherche.
                </div>
              )}
            </div>

            {/* Professional Profile Modal View */}
            {selectedProvider && (
              <div 
                style={{ 
                  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
                  backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)', 
                  zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' 
                }}
                onClick={() => setSelectedProvider(null)}
              >
                <Card 
                  className="animate-fade-in-up"
                  style={{ maxWidth: '600px', width: '100%', padding: '2.5rem', position: 'relative' }} 
                  onClick={e => e.stopPropagation()}
                >
                  <button 
                    style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#94a3b8' }}
                    onClick={() => setSelectedProvider(null)}
                  >
                    ×
                  </button>

                  <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
                    <div className={`suggestion-icon-placeholder ${selectedProvider.type === 'Santé' ? 'red' : 'blue'}`} style={{ width: '100px', height: '100px', fontSize: '3rem', borderRadius: '1.5rem' }}>
                      {selectedProvider.name.charAt(0)}
                    </div>
                    <div>
                      <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#1e293b' }}>{selectedProvider.name}</h2>
                      <span className="badge-role" style={{ marginTop: '0.5rem' }}>{selectedProvider.type}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
                        <Star size={20} fill="#fbbf24" color="#fbbf24" />
                        <strong style={{ fontSize: '1.2rem' }}>{selectedProvider.rating}</strong>
                        <span style={{ color: '#64748b' }}>({selectedProvider.reviews} avis)</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', color: '#475569' }}>
                      <MapPin size={20} />
                      <span>{selectedProvider.address}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', color: '#475569' }}>
                      <Clock size={20} />
                      <span>{selectedProvider.horaires}</span>
                    </div>
                    <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
                      <h4 style={{ fontWeight: '800', marginBottom: '0.5rem' }}>À propos</h4>
                      <p style={{ color: '#64748b', lineHeight: '1.6' }}>{selectedProvider.description}</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem' }}>
                    <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setSelectedProvider(null)}>Plus tard</button>
                    <button 
                      className="btn-primary" 
                      style={{ flex: 2, justifyContent: 'center' }}
                      onClick={() => navigate(`/client/reservation/${selectedProvider.id}`)}
                    >
                      Prendre RDV maintenant
                    </button>
                  </div>
                </Card>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
};

export default Reservation;
