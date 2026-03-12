import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  BarChart3, 
  ShieldCheck, 
  Layers, 
  Send, 
  Settings, 
  LifeBuoy, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './SidebarAdmin.css';

const SidebarAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { icon: LayoutDashboard, label: 'Vue d\'ensemble', path: '/admin/dashboard' },
    { icon: Users, label: 'Utilisateurs', path: '/admin/users' },
    { icon: Calendar, label: 'Rendez-vous', path: '/admin/appointments' },
    { icon: BarChart3, label: 'Analytiques', path: '/admin/reports' },
    { icon: Layers, label: 'Catégories', path: '/admin/categories' },
    { icon: ShieldCheck, label: 'Modération', path: '/admin/moderation' },
    { icon: Send, label: 'Communication', path: '/admin/notifications' },
    { icon: LifeBuoy, label: 'Support', path: '/admin/support' },
    { icon: Settings, label: 'Paramètres', path: '/admin/settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className={`admin-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="admin-sidebar-header">
        {!isCollapsed && (
          <div className="admin-logo-container">
            <ShieldCheck className="admin-logo-icon" size={24} />
            <span className="admin-logo-text">SMART<span>ADMIN</span></span>
          </div>
        )}
        <button 
          className="admin-collapse-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="admin-sidebar-nav">
        {!isCollapsed && <span className="admin-section-label">SYSTEM_CONTROL</span>}
        {menuItems.map((item) => (
          <div key={item.label} className="admin-nav-wrapper">
            <button
              onClick={() => navigate(item.path)}
              className={`admin-nav-item ${isActive(item.path) ? 'active' : ''}`}
              title={isCollapsed ? item.label : ''}
            >
              <item.icon className="admin-nav-icon" size={20} />
              {!isCollapsed && <span className="admin-nav-label">{item.label}</span>}
              {isActive(item.path) && !isCollapsed && <div className="admin-active-indicator" />}
            </button>
          </div>
        ))}
      </nav>

      <div className="admin-sidebar-footer">
        <button onClick={handleLogout} className="admin-logout-btn">
          <LogOut size={20} className="admin-nav-icon" />
          {!isCollapsed && <span className="admin-nav-label">Quitter la session</span>}
        </button>
      </div>
    </aside>
  );
};

export default SidebarAdmin;
