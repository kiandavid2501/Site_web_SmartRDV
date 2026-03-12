import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarAdmin from '../../components/layout/SidebarAdmin';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Stethoscope, 
  Car, 
  Scissors, 
  Camera, 
  Laptop,
  MoreVertical,
  ChevronRight,
  X,
  Palette,
  Type,
  Layers
} from 'lucide-react';
import './DashboardAdmin.css';

const CategoriesAdmin = () => {
  const navigate = useNavigate();
  
  // Mock data for categories with specialties
  const [categories, setCategories] = useState([
    { 
      id: 1, 
      name: 'Santé', 
      icon: Stethoscope, 
      prosCount: 34, 
      servicesCount: 12, 
      status: 'active', 
      color: '#ef4444',
      specialties: ['Médecine Générale', 'Dentiste', 'Ostéopathe', 'Ophtalmologue']
    },
    { 
      id: 2, 
      name: 'Automobile', 
      icon: Car, 
      prosCount: 12, 
      servicesCount: 8, 
      status: 'active', 
      color: '#3b82f6',
      specialties: ['Mécanique', 'Carrosserie', 'Révision', 'Pneus']
    },
    { 
      id: 3, 
      name: 'Beauté & Coiffure', 
      icon: Scissors, 
      prosCount: 22, 
      servicesCount: 15, 
      status: 'active', 
      color: '#ec4899',
      specialties: ['Coiffure Homme', 'Coiffure Femme', 'Esthétique', 'Barbier']
    },
    { 
      id: 4, 
      name: 'Photographie', 
      icon: Camera, 
      prosCount: 8, 
      servicesCount: 5, 
      status: 'active', 
      color: '#8b5cf6',
      specialties: ['Mariage', 'Portrait', 'Événementiel']
    },
    { 
      id: 5, 
      name: 'Informatique', 
      icon: Laptop, 
      prosCount: 15, 
      servicesCount: 10, 
      status: 'active', 
      color: '#10b981',
      specialties: ['Dépannage', 'Développement Web', 'Réseaux']
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSpecModalOpen, setIsSpecModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [editingId, setEditingId] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [newSpecName, setNewSpecName] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    color: '#4f46e5',
    icon: Stethoscope,
    initialSpecialties: ''
  });

  const availableIcons = [
    { name: 'Santé', icon: Stethoscope },
    { name: 'Auto', icon: Car },
    { name: 'Beauté', icon: Scissors },
    { name: 'Photo', icon: Camera },
    { name: 'IT', icon: Laptop }
  ];

  const handleOpenModal = (mode, category = null) => {
    setModalMode(mode);
    if (mode === 'edit' && category) {
      setEditingId(category.id);
      setFormData({
        name: category.name,
        color: category.color,
        icon: category.icon,
        initialSpecialties: category.specialties.join(', ')
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        color: '#4f46e5',
        icon: Stethoscope,
        initialSpecialties: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleOpenSpecModal = (category) => {
    setActiveCategory(category);
    setIsSpecModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);
  const handleCloseSpecModal = () => {
    setIsSpecModalOpen(false);
    setActiveCategory(null);
    setNewSpecName('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const specs = formData.initialSpecialties.split(',').map(s => s.trim()).filter(s => s !== '');
    
    if (modalMode === 'add') {
      const newCategory = {
        id: categories.length + 1,
        name: formData.name,
        color: formData.color,
        icon: formData.icon,
        specialties: specs,
        prosCount: 0,
        servicesCount: 0,
        status: 'active'
      };
      setCategories([...categories, newCategory]);
    } else {
      setCategories(categories.map(cat => 
        cat.id === editingId ? { ...cat, name: formData.name, color: formData.color, icon: formData.icon, specialties: specs } : cat
      ));
    }
    handleCloseModal();
  };

  const handleAddSpecialty = (e) => {
    e.preventDefault();
    if (!newSpecName.trim()) return;
    
    setCategories(categories.map(cat => 
      cat.id === activeCategory.id 
        ? { ...cat, specialties: [...cat.specialties, newSpecName.trim()] } 
        : cat
    ));
    
    setActiveCategory({
      ...activeCategory,
      specialties: [...activeCategory.specialties, newSpecName.trim()]
    });
    setNewSpecName('');
  };

  const handleDeleteSpecialty = (specToDelete) => {
    setCategories(categories.map(cat => 
      cat.id === activeCategory.id 
        ? { ...cat, specialties: cat.specialties.filter(s => s !== specToDelete) } 
        : cat
    ));
    
    setActiveCategory({
      ...activeCategory,
      specialties: activeCategory.specialties.filter(s => s !== specToDelete)
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPros = categories.reduce((sum, cat) => sum + cat.prosCount, 0);
  const totalSpecs = categories.reduce((sum, cat) => sum + cat.specialties.length, 0);

  return (
    <div className="admin-dashboard">
      <div className="admin-layout" style={{ display: 'flex' }}>
        <SidebarAdmin />
        
        <main className="admin-main-content">
          <div className="admin-container">
            <header className="admin-header">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                <div>
                  <h1 className="admin-title">Gestion des Catégories</h1>
                  <p className="admin-subtitle">Organisez les métiers et standardisez les services</p>
                </div>
                <button 
                  className="btn-admin btn-primary-admin" 
                  onClick={() => handleOpenModal('add')}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <Plus size={18} /> Nouvelle Catégorie
                </button>
              </div>
            </header>

            <div className="admin-stats-grid" style={{ marginBottom: '2rem' }}>
              <div className="admin-stat-card stat-blue">
                <div className="stat-info">
                  <p className="stat-label">Total Catégories</p>
                  <p className="stat-value">{categories.length}</p>
                </div>
                <div className="stat-icon-box">
                  <Type size={28} />
                </div>
              </div>
              <div className="admin-stat-card stat-purple">
                <div className="stat-info">
                  <p className="stat-label">Spécialités Totales</p>
                  <p className="stat-value">{totalSpecs}</p>
                </div>
                <div className="stat-icon-box">
                  <Layers size={28} />
                </div>
              </div>
            </div>

            <div className="admin-filters-bar" style={{ marginBottom: '1.5rem' }}>
              <div className="admin-search-wrapper" style={{ maxWidth: '400px' }}>
                <Search className="admin-search-icon" size={18} />
                <input 
                  type="text" 
                  placeholder="Rechercher une catégorie..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="categories-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
              {filteredCategories.map((cat, idx) => (
                <div key={cat.id} className="admin-section-card animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s`, padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <div style={{ 
                      width: '48px', 
                      height: '48px', 
                      borderRadius: '12px', 
                      background: `${cat.color}15`, 
                      color: cat.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <cat.icon size={24} />
                    </div>
                    <div className="actions-cell">
                      <button className="btn-table-action" onClick={() => handleOpenModal('edit', cat)}><Edit2 size={16} /></button>
                      <button className="btn-table-action delete" onClick={() => handleDelete(cat.id)}><Trash2 size={16} /></button>
                    </div>
                  </div>
                  
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>{cat.name}</h3>
                  <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div>
                      <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Spécialités</p>
                      <p style={{ fontSize: '1.1rem', fontWeight: 800 }}>{cat.specialties.length}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Professionnels</p>
                      <p style={{ fontSize: '1.1rem', fontWeight: 800 }}>{cat.prosCount}</p>
                    </div>
                  </div>

                  <button 
                    className="btn-quick-action" 
                    onClick={() => handleOpenSpecModal(cat)}
                    style={{ border: `1px solid ${cat.color}40`, color: cat.color }}
                  >
                    Gérer les spécialités <ChevronRight size={16} style={{ marginLeft: 'auto' }} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Category Modal */}
      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content">
            <div className="section-header" style={{ marginBottom: '2rem' }}>
              <h2>{modalMode === 'add' ? 'Créer une Catégorie' : 'Modifier la Catégorie'}</h2>
              <button onClick={handleCloseModal} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={24} /></button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#64748b', marginBottom: '0.5rem' }}>NOM DE LA CATÉGORIE</label>
                <div className="admin-search-wrapper" style={{ maxWidth: '100%' }}>
                  <Type className="admin-search-icon" size={18} />
                  <input 
                    type="text" placeholder="Ex: Santé, Automobile..." required
                    value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#64748b', marginBottom: '0.5rem' }}>SPÉCIALITÉS INITIALES (SÉPARÉES PAR DES VIRGULES)</label>
                <div className="admin-search-wrapper" style={{ maxWidth: '100%' }}>
                  <Layers className="admin-search-icon" size={18} />
                  <input 
                    type="text" placeholder="Ex: Mécanicien, Carrossier..." 
                    value={formData.initialSpecialties} onChange={(e) => setFormData({ ...formData, initialSpecialties: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#64748b', marginBottom: '0.5rem' }}>COULEUR THÈME</label>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {['#ef4444', '#3b82f6', '#ec4899', '#8b5cf6', '#10b981', '#f59e0b'].map(c => (
                    <button key={c} type="button" onClick={() => setFormData({ ...formData, color: c })}
                      style={{
                        width: '32px', height: '32px', borderRadius: '8px', background: c,
                        border: formData.color === c ? '3px solid white' : 'none',
                        boxShadow: formData.color === c ? '0 0 0 2px ' + c : 'none',
                        cursor: 'pointer'
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="modal-input-group">
                <label className="modal-label">ICÔNE REPRÉSENTATIVE</label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  {availableIcons.map((item, idx) => (
                    <button key={idx} type="button" onClick={() => setFormData({ ...formData, icon: item.icon })}
                      style={{
                        padding: '0.75rem', borderRadius: '12px', flex: 1, cursor: 'pointer',
                        background: formData.icon === item.icon ? `${formData.color}25` : 'var(--admin-bg)',
                        color: formData.icon === item.icon ? formData.color : 'var(--admin-text-muted)',
                        border: formData.icon === item.icon ? `2px solid ${formData.color}` : '1px solid var(--admin-card-border)',
                      }}
                    >
                      <item.icon size={20} />
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" className="btn-admin btn-secondary-admin" onClick={handleCloseModal} style={{ flex: 1 }}>Annuler</button>
                <button type="submit" className="btn-admin btn-primary-admin" style={{ flex: 2 }}>
                  {modalMode === 'add' ? 'Créer la Catégorie' : 'Mettre à jour'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Specialties Modal */}
      {isSpecModalOpen && activeCategory && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content" style={{ maxWidth: '600px' }}>
            <div className="section-header" style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ padding: '0.5rem', borderRadius: '8px', background: `${activeCategory.color}15`, color: activeCategory.color }}>
                  <activeCategory.icon size={20} />
                </div>
                <h2>Spécialités : {activeCategory.name}</h2>
              </div>
              <button onClick={handleCloseSpecModal} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={24} /></button>
            </div>

            <form onSubmit={handleAddSpecialty} style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div className="admin-search-wrapper" style={{ flex: 1, maxWidth: '100%' }}>
                  <Plus size={18} className="admin-search-icon" />
                  <input 
                    type="text" placeholder="Ajouter une spécialité..." 
                    value={newSpecName} onChange={(e) => setNewSpecName(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn-admin btn-primary-admin">Ajouter</button>
              </div>
            </form>

            <div className="specialties-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem', maxHeight: '400px', overflowY: 'auto', padding: '0.5rem' }}>
              {activeCategory.specialties.map((spec, idx) => (
                <div key={idx} style={{ 
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '0.75rem 1rem', background: 'var(--admin-bg)', borderRadius: '10px',
                  border: '1px solid var(--admin-card-border)', fontSize: '0.85rem', fontWeight: 600
                }}>
                  <span>{spec}</span>
                  <button onClick={() => handleDeleteSpecialty(spec)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.2rem' }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              {activeCategory.specialties.length === 0 && (
                <p style={{ gridColumn: '1/-1', textAlign: 'center', color: '#94a3b8', padding: '2rem' }}>Aucune spécialité définie pour cette catégorie.</p>
              )}
            </div>

            <div style={{ marginTop: '2rem', textAlign: 'right' }}>
              <button className="btn-admin btn-secondary-admin" onClick={handleCloseSpecModal}>Fermer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesAdmin;
