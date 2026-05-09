import { useQuery } from '@tanstack/react-query';
import { enchereApi } from '../../api/enchereApi';
import { Link } from 'react-router-dom';
import { Gavel, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

export function MesEncheres() {
  const { data, isLoading } = useQuery({
    queryKey: ['mes-encheres'],
    queryFn: () => enchereApi.getMesEncheres(),
    select: (r) => r.data,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center gap-3">
          <div className="p-2.5 bg-primary-100 rounded-xl">
            <Gavel className="text-primary-600" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Mes enchères</h1>
            <p className="text-gray-500 text-sm">Suivez les enchères auxquelles vous participez</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {isLoading && (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 bg-white rounded-xl animate-pulse border" />
            ))}
          </div>
        )}

        {!isLoading && (!data || data.length === 0) && (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-4">
              <Gavel size={28} className="text-primary-300" />
            </div>
            <p className="text-lg font-medium text-gray-600">Aucune enchère en cours</p>
            <p className="text-gray-400 text-sm mt-1 mb-6">
              Parcourez le catalogue et inscrivez-vous à une enchère
            </p>
            <Link
              to="/"
              className="bg-primary-600 text-white px-6 py-2.5 rounded-xl hover:bg-primary-700 transition-colors text-sm font-medium"
            >
              Explorer le catalogue
            </Link>
          </div>
        )}

        <div className="space-y-4">
          {data?.map((enchere) => {
            const tempsRestant = enchere.dateFin
              ? formatDistanceToNow(parseISO(enchere.dateFin), { addSuffix: true, locale: fr })
              : '';
            const isActive = enchere.statut === 'EN_COURS';

            return (
              <div key={enchere.id} className="bg-white border rounded-xl p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 truncate">{enchere.produitTitre}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">
                      Prix de base :{' '}
                      <span className="font-medium">{enchere.prixBase?.toLocaleString('fr-MA')} DH</span>
                    </p>
                  </div>
                  <span
                    className={`shrink-0 text-xs px-3 py-1 rounded-full font-medium ${
                      isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {isActive ? '● Active' : 'Terminée'}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-5 flex-wrap">
                  {enchere.meilleureOffre && (
                    <span className="flex items-center gap-1.5 text-green-600 font-semibold text-sm">
                      <TrendingUp size={15} />
                      {enchere.meilleureOffre.toLocaleString('fr-MA')} DH
                    </span>
                  )}
                  {isActive && tempsRestant && (
                    <span className="flex items-center gap-1.5 text-primary-500 text-sm">
                      <Clock size={15} /> {tempsRestant}
                    </span>
                  )}
                  <span className="text-gray-400 text-sm">{enchere.nombreParticipants} participants</span>
                  <Link
                    to={`/produits/${enchere.produitId}`}
                    className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium ml-auto"
                  >
                    Voir l'enchère <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
