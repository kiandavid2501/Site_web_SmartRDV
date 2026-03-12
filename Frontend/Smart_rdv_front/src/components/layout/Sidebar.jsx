import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  User, 
  LogOut, 
  CircleHelp,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  Heart,
  Bell,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (path) => location.pathname === path;

  // Items du menu
  const menuItems = [
    { icon: LayoutDashboard, label: 'Tableau de bord', path: '/client/dashboard' },
    { icon: PlusCircle, label: 'Prendre un rendez-vous', path: '/client/reservations' },
    { icon: Calendar, label: 'Mes Rendez-vous', path: '/client/my-reservations' },
    { icon: Heart, label: 'Favoris', path: '/client/favorites' },
    { icon: Bell, label: 'Notifications', path: '/client/notifications' },
    { icon: User, label: 'Mon Profil', path: '/client/profile' },
    { icon: CircleHelp, label: 'Aide', path: '/client/help' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!isCollapsed && (
          <div className="logo-container">
            <span className="logo-text">SmartRDV</span>
          </div>
        )}
        <button 
          className="collapse-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {!isCollapsed && <span className="menu-section-label">MENU</span>}
        {menuItems.map((item) => (
          <div key={item.label} style={{ position: 'relative' }}>
            <button
              onClick={() => {
                navigate(item.path);
              }}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              title={isCollapsed ? item.label : ''}
            >
              <div style={{ position: 'relative' }}>
                <item.icon className="nav-icon" />
                {item.path === '/client/notifications' && (
                  <span className="notif-badge-sidebar">3</span>
                )}
              </div>
              {!isCollapsed && <span className="nav-label">{item.label}</span>}
              {isActive(item.path) && !isCollapsed && <div className="active-indicator" />}
            </button>
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
          <LogOut size={20} className="nav-icon" />
          {!isCollapsed && <span className="nav-label">Déconnexion</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
