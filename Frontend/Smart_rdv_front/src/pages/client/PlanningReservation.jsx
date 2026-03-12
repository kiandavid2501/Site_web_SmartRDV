import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Users, ArrowLeft, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import Sidebar from '../../components/layout/Sidebar';
import Card from '../../components/common/Card';
import './DashboardClient.css';

const PlanningReservation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [step, setStep] = useState(1); // 1: Slot, 2: Message & Summary
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingMessage, setBookingMessage] = useState('');
  const [isBooking, setIsBooking] = useState(false);

  // Mock Data for the selected company/service
  const companyInfo = {
    id: id,
    name: "Cabinet Médical Dr. Martin",
    type: "Santé",
    address: "123 Rue de la Santé, Paris"
  };

  // Mock Slots Data with Capacity
  const slots = [
    { id: 1, time: "09:00", duration: "30 min", totalParams: 1, reserved: 0 },
    { id: 2, time: "09:30", duration: "30 min", totalParams: 1, reserved: 1 }, // FULL
    { id: 3, time: "10:00", duration: "30 min", totalParams: 5, reserved: 3 }, // ORANGE
    { id: 4, time: "10:30", duration: "30 min", totalParams: 5, reserved: 1 }, // GREEN
    { id: 5, time: "11:00", duration: "30 min", totalParams: 1, reserved: 0 },
    { id: 6, time: "14:00", duration: "30 min", totalParams: 3, reserved: 3 }, // FULL
    { id: 7, time: "14:30", duration: "30 min", totalParams: 3, reserved: 2 }, // ORANGE
    { id: 8, time: "15:00", duration: "30 min", totalParams: 3, reserved: 0 }, // GREEN
  ];

  const getSlotStatus = (reserved, total) => {
    if (reserved >= total) return { color: 'red', label: 'Complet', bg: '#fee2e2', border: '#fecaca', text: '#ef4444' };
    if (reserved >= total / 2) return { color: 'orange', label: 'Peu de places', bg: '#ffedd5', border: '#fed7aa', text: '#f97316' };
    return { color: 'green', label: 'Disponible', bg: '#dcfce7', border: '#bbf7d0', text: '#22c55e' };
  };

  const handleSlotSelection = (slot) => {
    if (slot.reserved >= slot.totalParams) return;
    setSelectedSlot(slot);
    setStep(2);
  };

  const handleFinalBooking = () => {
    setIsBooking(true);
    // Simulate API call
    setTimeout(() => {
      setIsBooking(false);
      alert("Réservation confirmée ! Un rappel vous sera envoyé 2h avant.");
      navigate('/client/my-reservations');
    }, 1500);
  };

  return (
    <div className="dashboard-client">
      <div className="dashboard-layout">
        <Sidebar />
        <main className="dashboard-main-content">
          <div className="dashboard-container">
            
            <button onClick={() => navigate(-1)} className="btn-back-link" style={{ marginBottom: '1rem' }}>
              <ArrowLeft size={18} /> Retour
            </button>

            <div className="dashboard-header animate-fade-in-down" style={{ marginBottom: '2rem' }}>
              <div>
                <h1 className="dashboard-title">Réserver un créneau</h1>
                <p className="dashboard-subtitle">Choisissez l'horaire qui vous convient chez <strong>{companyInfo.name}</strong></p>
              </div>
            </div>

            {/* Multi-step Booking View */}
            {step === 1 ? (
              <>
                {/* Calendar / Date Navigation Mockup */}
                <div className="calendar-strip animate-fade-in-up delay-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', padding: '1rem 2rem', borderRadius: '1rem', marginBottom: '2rem', border: '1px solid #e2e8f0' }}>
                  <button className="nav-btn"><ChevronLeft size={20} /></button>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', fontWeight: '600', color: '#1e293b' }}>
                    <Calendar size={20} className="text-blue-500" />
                    <span>Aujourd'hui, 31 Jan 2026</span>
                  </div>
                  <button className="nav-btn"><ChevronRight size={20} /></button>
                </div>

                {/* Slots Grid */}
                <div className="slots-grid animate-fade-in-up delay-2">
                  {slots.map(slot => {
                    const status = getSlotStatus(slot.reserved, slot.totalParams);
                    const isFull = slot.reserved >= slot.totalParams;

                    return (
                      <div 
                        key={slot.id} 
                        className="slot-card"
                        onClick={() => handleSlotSelection(slot)}
                        style={{ 
                          backgroundColor: status.bg, 
                          borderColor: status.border,
                          opacity: isFull ? 0.7 : 1,
                          cursor: isFull ? 'not-allowed' : 'pointer'
                        }}
                      >
                        <div className="slot-header">
                          <div className="time-badge" style={{ backgroundColor: 'white', color: '#1e293b' }}>
                            <Clock size={14} />
                            {slot.time}
                          </div>
                          <span className="duration-text">{slot.duration}</span>
                        </div>

                        <div className="slot-capacity">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: status.text, fontWeight: '600' }}>
                            <Users size={16} />
                            <span>{slot.reserved} / {slot.totalParams}</span>
                          </div>
                          <span className="status-label" style={{ color: status.text }}>{status.label}</span>
                        </div>

                        <div className="progress-bar-bg" style={{ width: '100%', height: '4px', backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: '2px', marginTop: '0.5rem' }}>
                          <div 
                            style={{ 
                              width: `${(slot.reserved / slot.totalParams) * 100}%`, 
                              height: '100%', 
                              backgroundColor: status.text, 
                              borderRadius: '2px' 
                            }} 
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="booking-summary-view animate-fade-in-up">
                <Card style={{ maxWidth: '600px', margin: '0 auto', padding: '2.5rem' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '1.5rem', color: '#1e293b' }}>Résumé de votre réservation</h3>
                  
                  <div className="summary-details" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                    <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}>
                      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Professionnel</p>
                      <p style={{ fontWeight: '800', color: '#1e293b' }}>{companyInfo.name}</p>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}>
                        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Date</p>
                        <p style={{ fontWeight: '800', color: '#1e293b' }}>31 Jan 2026</p>
                      </div>
                      <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}>
                        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Heure</p>
                        <p style={{ fontWeight: '800', color: '#1e293b' }}>{selectedSlot.time} ({selectedSlot.duration})</p>
                      </div>
                    </div>

                    <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}>
                      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Message au professionnel (optionnel)</p>
                      <textarea 
                        className="form-input" 
                        placeholder="Précisez un besoin particulier..." 
                        style={{ width: '100%', minHeight: '100px', padding: '0.75rem' }}
                        value={bookingMessage}
                        onChange={(e) => setBookingMessage(e.target.value)}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setStep(1)} disabled={isBooking}>
                      Modifier le créneau
                    </button>
                    <button 
                      className="btn-primary" 
                      style={{ flex: 2, justifyContent: 'center' }}
                      onClick={handleFinalBooking}
                      disabled={isBooking}
                    >
                      {isBooking ? 'Confirmation...' : 'Confirmer la réservation'}
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

export default PlanningReservation;
