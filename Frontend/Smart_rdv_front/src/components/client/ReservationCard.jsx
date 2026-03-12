import { Building2, MapPin, Calendar, Clock } from 'lucide-react';

const ReservationCard = ({ reservation }) => {
  const getStatusColor = (statut) => {
    switch(statut) {
      case 'confirmee':
        return 'bg-green-100 text-green-700 border-green-500';
      case 'en_attente':
        return 'bg-yellow-100 text-yellow-700 border-yellow-500';
      case 'annulee':
        return 'bg-red-100 text-red-700 border-red-500';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-500';
    }
  };

  const getStatusText = (statut) => {
    switch(statut) {
      case 'confirmee':
        return 'Confirmée';
      case 'en_attente':
        return 'En attente';
      case 'annulee':
        return 'Annulée';
      default:
        return statut;
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 border-l-4 ${getStatusColor(reservation.statut)}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-2">
          <Building2 className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-gray-800">{reservation.entreprise}</h3>
            <div className="flex items-start gap-1 mt-1">
              <MapPin className="w-3 h-3 text-gray-500 mt-1 flex-shrink-0" />
              <p className="text-xs text-gray-600">{reservation.adresse}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Calendar className="w-4 h-4 text-blue-600" />
          <span>{new Date(reservation.date).toLocaleDateString('fr-FR', { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
          })}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Clock className="w-4 h-4 text-blue-600" />
          <span>{reservation.heure}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(reservation.statut)}`}>
          {getStatusText(reservation.statut)}
        </span>
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          Détails →
        </button>
      </div>
    </div>
  );
};

export default ReservationCard;