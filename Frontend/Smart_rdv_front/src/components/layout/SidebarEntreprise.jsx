import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  CalendarCheck,
  BarChart3, 
  User, 
  CircleHelp,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Users,
  Bell,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import '../layout/Sidebar.css';

const SidebarEntreprise = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { icon: LayoutDashboard, label: 'Tableau de bord', path: '/entreprise/dashboard' },
    { icon: Calendar, label: 'Mon Planning', path: '/entreprise/planning' },
    { icon: CalendarCheck, label: 'Gérer les RDV', path: '/entreprise/reservations' },
    { icon: BarChart3, label: 'Bilan & Stats', path: '/entreprise/stats' },
    { icon: Briefcase, label: 'Profil Entreprise', path: '/entreprise/profile' },
    { icon: Users, label: 'Mes Clients', path: '/entreprise/clients' },
    { icon: Bell, label: 'Notifications', path: '/entreprise/notifications' },
    { icon: CircleHelp, label: 'Aide & Support', path: '/entreprise/help' },
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} enterprise-theme`}>
      <div className="sidebar-header">
        {!isCollapsed && (
          <div className="logo-container">
            <span className="logo-text">SmartPro</span>
          </div>
        )}
        <button 
          className="collapse-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight size={22} /> : <ChevronLeft size={22} />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {!isCollapsed && <span className="menu-section-label">PILOTAGE</span>}
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
            title={isCollapsed ? item.label : ''}
          >
            <item.icon className="nav-icon" />
            {!isCollapsed && <span className="nav-label">{item.label}</span>}
            {isActive(item.path) && !isCollapsed && <div className="active-indicator" />}
          </button>
        ))}
      </nav>
      
      <div className="sidebar-footer">
        <button onClick={() => { logout(); navigate('/login'); }} className="logout-btn">
          <LogOut size={20} className="nav-icon" />
          {!isCollapsed && <span className="nav-label">Déconnexion</span>}
        </button>
      </div>
    </aside>
  );
};

export default SidebarEntreprise;
