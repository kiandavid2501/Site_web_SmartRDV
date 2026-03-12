import Sidebar from '../../components/layout/Sidebar';

const Parametres = () => {
  return (
    <div className="dashboard-client">
      <div className="dashboard-layout">
        <Sidebar />
        <main className="dashboard-main-content">
          <div className="dashboard-container">
            <div className="dashboard-header animate-fade-in-down">
              <h1 className="dashboard-title">Paramètres</h1>
              <p className="dashboard-subtitle">Configurez votre compte et vos préférences.</p>
            </div>
            <div className="animate-fade-in-up delay-1">
              <p style={{color: '#64748b', fontSize: '1.1rem'}}>Paramètres en construction...</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Parametres;
