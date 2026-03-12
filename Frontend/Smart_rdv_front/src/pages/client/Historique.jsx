import Sidebar from '../../components/layout/Sidebar';

const Historique = () => {
  return (
    <div className="dashboard-client">
      <div className="dashboard-layout">
        <Sidebar />
        <main className="dashboard-main-content">
          <div className="dashboard-container">
            <div className="dashboard-header animate-fade-in-down">
              <h1 className="dashboard-title">Historique</h1>
              <p className="dashboard-subtitle">Vos rendez-vous passés.</p>
            </div>
            <div className="animate-fade-in-up delay-1">
              <p style={{color: '#64748b', fontSize: '1.1rem'}}>Historique en construction...</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Historique;
