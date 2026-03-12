import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { ROLES } from './utils/constants';
import ProtectedRoute from './components/layout/ProtectedRoute';

// Pages
import Home from './pages/public/Home';
import HomeSecond from './pages/public/HomeSecond';
import Login from './pages/auth/Login';
import RegisterClient from './pages/auth/RegisterClient';
import RegisterEntreprise from './pages/auth/RegisterEntreprise';
import DashboardClient from './pages/client/DashboardClient';
import DashboardEntreprise from './pages/entreprise/DashboardEntreprise';
import PlanningEntreprise from './pages/entreprise/PlanningEntreprise';
import StatsEntreprise from './pages/entreprise/StatsEntreprise';
import ProfilEntreprise from './pages/entreprise/ProfilEntreprise';
import ClientsEntreprise from './pages/entreprise/ClientsEntreprise';
import NotificationsEntreprise from './pages/entreprise/NotificationsEntreprise';
import ReservationsEntreprise from './pages/entreprise/ReservationsEntreprise';
import HelpEntreprise from './pages/entreprise/HelpEntreprise';
import DashboardAdmin from './pages/admin/DashboardAdmin';
import UsersAdmin from './pages/admin/UsersAdmin';
import AppointmentsAdmin from './pages/admin/AppointmentsAdmin';
import ReportsAdmin from './pages/admin/ReportsAdmin';
import CategoriesAdmin from './pages/admin/CategoriesAdmin';
import ModerationAdmin from './pages/admin/ModerationAdmin';
import NotificationsAdmin from './pages/admin/NotificationsAdmin';
import SupportAdmin from './pages/admin/SupportAdmin';
import SettingsAdmin from './pages/admin/SettingsAdmin';
import ActivityAdmin from './pages/admin/ActivityAdmin';
import Reservation from './pages/client/Reservation';
import MesReservations from './pages/client/MesReservations';
import ProfilClient from './pages/client/ProfilClient';
import Favoris from './pages/client/Favoris';
import Aide from './pages/client/Aide';
import PlanningReservation from './pages/client/PlanningReservation';
import NotificationsClient from './pages/client/Notifications';

function App() {
  const { isAuthenticated, role, loading } = useAuth();

  // Affichage pendant le chargement
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative h-20 w-20">
            <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-indigo-600 rounded-full animate-spin"></div>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900">SmartRDV</h2>
            <p className="text-gray-500 mt-2 animate-pulse">Chargement de votre espace...</p>
          </div>
        </div>
      </div>
    );
  }

  const redirectByRole = () => {
    if (role === ROLES.ADMIN) return '/admin/dashboard';
    if (role === ROLES.ENTREPRISE) return '/entreprise/dashboard';
    if (role === ROLES.CLIENT) return '/client/dashboard';
    return null;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Pages publiques */}
        <Route path="/" element={<Home />} />
        <Route path="/home-second" element={<HomeSecond />} />

        {/* Authentification */}
        <Route
          path="/login"
          element={
            isAuthenticated && redirectByRole()
              ? <Navigate to={redirectByRole()} replace />
              : <Login />
          }
        />

        {/* Inscription */}
        <Route path="/register/client" element={<RegisterClient />} />
        <Route path="/register/entreprise" element={<RegisterEntreprise />} />

        {/* Dashboards protégés */}
        <Route
          path="/client/dashboard"
          element={
            <ProtectedRoute role={ROLES.CLIENT}>
              <DashboardClient />
            </ProtectedRoute>
          }
        />

        <Route
          path="/client/reservations"
          element={
            <ProtectedRoute role={ROLES.CLIENT}>
              <Reservation />
            </ProtectedRoute>
          }
        />

        <Route
          path="/client/reservation/:id"
          element={
            <ProtectedRoute role={ROLES.CLIENT}>
              <PlanningReservation />
            </ProtectedRoute>
          }
        />

        <Route
          path="/client/my-reservations"
          element={
            <ProtectedRoute role={ROLES.CLIENT}>
              <MesReservations />
            </ProtectedRoute>
          }
        />

        <Route
          path="/client/profile"
          element={
            <ProtectedRoute role={ROLES.CLIENT}>
              <ProfilClient />
            </ProtectedRoute>
          }
        />

        <Route
          path="/client/favorites"
          element={
            <ProtectedRoute role={ROLES.CLIENT}>
              <Favoris />
            </ProtectedRoute>
          }
        />

        <Route
          path="/client/help"
          element={
            <ProtectedRoute role={ROLES.CLIENT}>
              <Aide />
            </ProtectedRoute>
          }
        />

        <Route
          path="/client/notifications"
          element={
            <ProtectedRoute role={ROLES.CLIENT}>
              <NotificationsClient />
            </ProtectedRoute>
          }
        />

        <Route
          path="/entreprise/dashboard"
          element={
            <ProtectedRoute role={ROLES.ENTREPRISE}>
              <DashboardEntreprise />
            </ProtectedRoute>
          }
        />

        <Route
          path="/entreprise/planning"
          element={
            <ProtectedRoute role={ROLES.ENTREPRISE}>
              <PlanningEntreprise />
            </ProtectedRoute>
          }
        />

        <Route
          path="/entreprise/stats"
          element={
            <ProtectedRoute role={ROLES.ENTREPRISE}>
              <StatsEntreprise />
            </ProtectedRoute>
          }
        />

        <Route
          path="/entreprise/profile"
          element={
            <ProtectedRoute role={ROLES.ENTREPRISE}>
              <ProfilEntreprise />
            </ProtectedRoute>
          }
        />

        <Route
          path="/entreprise/clients"
          element={
            <ProtectedRoute role={ROLES.ENTREPRISE}>
              <ClientsEntreprise />
            </ProtectedRoute>
          }
        />

        <Route
          path="/entreprise/reservations"
          element={
            <ProtectedRoute role={ROLES.ENTREPRISE}>
              <ReservationsEntreprise />
            </ProtectedRoute>
          }
        />

        <Route
          path="/entreprise/notifications"
          element={
            <ProtectedRoute role={ROLES.ENTREPRISE}>
              <NotificationsEntreprise />
            </ProtectedRoute>
          }
        />

        <Route
          path="/entreprise/help"
          element={
            <ProtectedRoute role={ROLES.ENTREPRISE}>
              <HelpEntreprise />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role={ROLES.ADMIN}>
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role={ROLES.ADMIN}>
              <UsersAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/appointments"
          element={
            <ProtectedRoute role={ROLES.ADMIN}>
              <AppointmentsAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute role={ROLES.ADMIN}>
              <ReportsAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute role={ROLES.ADMIN}>
              <CategoriesAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/moderation"
          element={
            <ProtectedRoute role={ROLES.ADMIN}>
              <ModerationAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/notifications"
          element={
            <ProtectedRoute role={ROLES.ADMIN}>
              <NotificationsAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/support"
          element={
            <ProtectedRoute role={ROLES.ADMIN}>
              <SupportAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute role={ROLES.ADMIN}>
              <SettingsAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/activity"
          element={
            <ProtectedRoute role={ROLES.ADMIN}>
              <ActivityAdmin />
            </ProtectedRoute>
          }
        />

        {/* Route par défaut - doit être en dernier */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;