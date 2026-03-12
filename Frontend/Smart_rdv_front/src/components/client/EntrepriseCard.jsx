import { MapPin, Clock, Calendar } from 'lucide-react';

const EntrepriseCard = ({ entreprise }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{entreprise.nom}</h3>
          <span className="inline-block mt-1 px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
            {entreprise.type}
          </span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-start gap-2 text-gray-600">
          <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
          <p className="text-sm">{entreprise.adresse}</p>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="w-4 h-4 flex-shrink-0" />
          <p className="text-sm">{entreprise.horaires}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-green-600" />
          <span className="text-green-600 font-semibold">
            {entreprise.creneauxDisponibles} créneaux disponibles
          </span>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
          Réserver
        </button>
      </div>
    </div>
  );
};

export default EntrepriseCard;