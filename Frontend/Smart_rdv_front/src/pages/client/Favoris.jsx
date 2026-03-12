import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, Trash2, ArrowRight, Heart } from 'lucide-react';
import Sidebar from '../../components/layout/Sidebar';
import Card from '../../components/common/Card';
import './DashboardClient.css';

const Favoris = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([
    { 
      id: 1, 
      name: "Dr. Martin", 
      type: "Santé", 
      address: "123 Rue de la Santé, Paris",
      rating: 4.8,
      image: "https://ui-avatars.com/api/?name=Doc+Martin&background=random"
    },
    { 
      id: 2, 
      name: "Salon Élegance", 
      type: "Beauté", 
      address: "45 Av. de la République, Paris",
      rating: 4.5,
      image: "https://ui-avatars.com/api/?name=Salon+Elegance&background=random"
    },
  ]);

  const removeFavorite = (id) => {
    if (window.confirm("Retirer ce professionnel de vos favoris ?")) {
      setFavorites(favorites.filter(f => f.id !== id));
    }
  };

  return (
    <div className="dashboard-client">
      <div className="dashboard-layout">
        <Sidebar />
        <main className="dashboard-main-content">
          <div className="dashboard-container">
            <div className="dashboard-header animate-fade-in-down">
              <h1 className="dashboard-title">Mes Favoris ❤️</h1>
              <p className="dashboard-subtitle">Accédez rapidement à vos professionnels de confiance.</p>
            </div>

            <div className="favorites-content-area animate-fade-in-up delay-1">
              {favorites.length > 0 ? (
                <div className="suggestions-grid">
                  {favorites.map(fav => (
                    <Card key={fav.id} className="suggestion-card-clean fancy-bg" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                          <img src={fav.image} alt={fav.name} style={{ width: '50px', height: '50px', borderRadius: '1rem', objectFit: 'cover' }} />
                          <div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1e293b' }}>{fav.name}</h3>
                            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{fav.type}</span>
                          </div>
                        </div>
                        <button 
                          className="btn-text" 
                          style={{ color: '#f43f5e', background: '#fff1f2', padding: '0.5rem', borderRadius: '0.5rem' }}
                          onClick={() => removeFavorite(fav.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.85rem' }}>
                          <MapPin size={14} />
                          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{fav.address}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24', fontSize: '0.85rem', fontWeight: '700' }}>
                          <Star size={14} fill="#fbbf24" />
                          <span>{fav.rating}</span>
                        </div>
                      </div>

                      <button 
                        className="btn-primary" 
                        style={{ marginTop: 'auto', width: '100%', justifyContent: 'center', gap: '0.5rem' }}
                        onClick={() => navigate(`/client/reservation/${fav.id}`)}
                      >
                        Réserver à nouveau <ArrowRight size={16} />
                      </button>
                    </Card>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '5rem 2rem', background: 'white', borderRadius: '2rem', border: '1px solid #e2e8f0' }}>
                  <div style={{ background: '#fff1f2', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#f43f5e' }}>
                    <Heart size={40} />
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#1e293b', marginBottom: '0.5rem' }}>Aucun favori pour le moment</h3>
                  <p style={{ color: '#64748b', marginBottom: '2rem' }}>Ajoutez des professionnels à vos favoris pour les retrouver plus vite.</p>
                  <button className="btn-primary" onClick={() => navigate('/client/reservations')}>Explorer les professionnels</button>
                </div>
              )}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default Favoris;
