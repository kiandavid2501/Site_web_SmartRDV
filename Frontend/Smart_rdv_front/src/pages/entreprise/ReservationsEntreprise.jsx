import { useState } from 'react';
import SidebarEntreprise from '../../components/layout/SidebarEntreprise';
import { 
  Calendar as CalendarIcon, 
  Search, 
  Filter, 
  Download, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  CheckSquare,
  UserX,
  MoreVertical,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import './DashboardEntreprise.css';

const ReservationsEntreprise = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    const appointments = [
        { id: 1, client: "Jean Dupont", service: "Consultation Standard", date: "2026-02-01", time: "14:30", status: "confirmed", email: "jean.d@email.com" },
        { id: 2, client: "Marie Louise", service: "Expertise Technique", date: "2026-02-01", time: "16:00", status: "pending", email: "m.louise@email.com" },
        { id: 3, client: "Robert Martin", service: "Premier RDV", date: "2026-02-02", time: "09:00", status: "confirmed", email: "r.martin@email.com" },
        { id: 4, client: "Alice Bernard", service: "Suivi Dossier", date: "2026-01-30", time: "11:00", status: "completed", email: "alice.b@email.com" },
        { id: 5, client: "Thomas Petit", service: "Consultation Standard", date: "2026-02-01", time: "10:30", status: "cancelled", email: "t.petit@email.com" },
    ];

    const getStatusStyle = (status) => {
        switch (status) {
            case 'confirmed': return { bg: '#dcfce7', text: '#166534', icon: <CheckCircle2 size={14} /> };
            case 'pending': return { bg: '#fef9c3', text: '#854d0e', icon: <Clock size={14} /> };
            case 'cancelled': return { bg: '#fee2e2', text: '#991b1b', icon: <XCircle size={14} /> };
            case 'completed': return { bg: '#dbeafe', text: '#1e40af', icon: <CheckSquare size={14} /> };
            default: return { bg: '#f3f4f6', text: '#374151', icon: null };
        }
    };

    const filteredAppointments = appointments.filter(apt => {
        const matchesSearch = apt.client.toLowerCase().includes(searchTerm.toLowerCase()) || apt.service.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "all" || apt.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="dashboard-entreprise">
            <div style={{ display: 'flex' }}>
                <SidebarEntreprise />
                <main className="dashboard-main-area">
                    <div className="dashboard-content">
                        <header className="dashboard-header-section">
                            <div className="header-info">
                                <h1 className="dashboard-title">Gestion des RDV 🗓️</h1>
                                <p className="dashboard-subtitle">Consultez, confirmez ou modifiez vos réservations</p>
                            </div>
                            <div className="header-actions">
                                <button className="btn-icon-text"><Download size={18} /> Exporter la liste</button>
                            </div>
                        </header>

                        <div className="main-content-card">
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                                <div className="input-wrapper" style={{ flex: 2, minWidth: '300px' }}>
                                    <Search className="input-icon" size={18} />
                                    <input 
                                        type="text" 
                                        placeholder="Rechercher un client ou un service..." 
                                        className="form-input"
                                        style={{ paddingLeft: '2.5rem' }}
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <select 
                                    className="form-input" 
                                    style={{ flex: 1, minWidth: '150px' }}
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                >
                                    <option value="all">Tous les statuts</option>
                                    <option value="confirmed">Confirmés</option>
                                    <option value="pending">En attente</option>
                                    <option value="completed">Terminés</option>
                                    <option value="cancelled">Annulés</option>
                                </select>
                                <button className="btn-icon-text"><Filter size={16} /> Plus de filtres</button>
                            </div>

                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ textAlign: 'left', borderBottom: '2px solid #f3f4f6', color: '#64748b', fontSize: '0.85rem' }}>
                                            <th style={{ padding: '1rem' }}>DATE & HEURE</th>
                                            <th style={{ padding: '1rem' }}>CLIENT</th>
                                            <th style={{ padding: '1rem' }}>SERVICE</th>
                                            <th style={{ padding: '1rem' }}>STATUT</th>
                                            <th style={{ padding: '1rem', textAlign: 'right' }}>ACTIONS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredAppointments.map(apt => {
                                            const style = getStatusStyle(apt.status);
                                            return (
                                                <tr key={apt.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                                    <td style={{ padding: '1rem' }}>
                                                        <div style={{ fontWeight: '600' }}>{apt.date}</div>
                                                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{apt.time}</div>
                                                    </td>
                                                    <td style={{ padding: '1rem' }}>
                                                        <div style={{ fontWeight: '600' }}>{apt.client}</div>
                                                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{apt.email}</div>
                                                    </td>
                                                    <td style={{ padding: '1rem' }}>
                                                        <span style={{ fontSize: '0.9rem' }}>{apt.service}</span>
                                                    </td>
                                                    <td style={{ padding: '1rem' }}>
                                                        <span style={{ 
                                                            display: 'inline-flex', alignItems: 'center', gap: '4px',
                                                            padding: '0.25rem 0.75rem', borderRadius: '1rem', 
                                                            fontSize: '0.75rem', fontWeight: 'bold',
                                                            backgroundColor: style.bg, color: style.text
                                                        }}>
                                                            {style.icon} {apt.status.toUpperCase()}
                                                        </span>
                                                    </td>
                                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                                            {apt.status === 'pending' && (
                                                                <button style={{ padding: '4px', color: '#166534', cursor: 'pointer', background: 'none', border: 'none' }} title="Confirmer"><CheckCircle2 size={18} /></button>
                                                            )}
                                                            {apt.status === 'confirmed' && (
                                                                <button style={{ padding: '4px', color: '#1e40af', cursor: 'pointer', background: 'none', border: 'none' }} title="Marquer comme effectué"><CheckSquare size={18} /></button>
                                                            )}
                                                            <button style={{ padding: '4px', color: '#991b1b', cursor: 'pointer', background: 'none', border: 'none' }} title="Annuler"><XCircle size={18} /></button>
                                                            <button className="btn-more"><MoreVertical size={18} /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', gap: '1rem', alignItems: 'center' }}>
                            <button className="btn-more" disabled><ChevronLeft size={18} /></button>
                            <span style={{ fontSize: '0.9rem', color: '#64748b' }}>Page 1 sur 1</span>
                            <button className="btn-more" disabled><ChevronRight size={18} /></button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ReservationsEntreprise;
