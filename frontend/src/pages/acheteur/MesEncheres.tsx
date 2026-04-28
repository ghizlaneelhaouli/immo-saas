import { useQuery } from '@tanstack/react-query';
import { enchereApi } from '../../api/enchereApi';
import { Link } from 'react-router-dom';
import { Gavel, TrendingUp, Clock } from 'lucide-react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

export function MesEncheres() {
  const { data, isLoading } = useQuery({
    queryKey: ['mes-encheres'],
    queryFn: () => enchereApi.getMesEncheres(),
    select: (r) => r.data,
  });

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Mes enchères</h1>
        <p className="text-gray-500 mt-1">Les enchères auxquelles vous participez</p>
      </div>

      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />)}
        </div>
      )}

      {!isLoading && (!data || data.length === 0) && (
        <div className="text-center py-16 text-gray-400">
          <Gavel size={48} className="mx-auto mb-4 opacity-40" />
          <p>Vous ne participez à aucune enchère.</p>
          <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
            Explorer le catalogue
          </Link>
        </div>
      )}

      <div className="space-y-4">
        {data?.map((enchere) => {
          const tempsRestant = enchere.dateFin
            ? formatDistanceToNow(parseISO(enchere.dateFin), { addSuffix: true, locale: fr })
            : '';

          return (
            <div key={enchere.id} className="bg-white border rounded-xl p-5 hover:shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">{enchere.produitTitre}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">Prix de base : {enchere.prixBase?.toLocaleString('fr-MA')} DH</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  enchere.statut === 'EN_COURS'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {enchere.statut === 'EN_COURS' ? 'Active' : 'Terminée'}
                </span>
              </div>

              <div className="mt-3 flex items-center gap-6 text-sm">
                {enchere.meilleureOffre && (
                  <span className="flex items-center gap-1 text-green-600 font-medium">
                    <TrendingUp size={14} /> {enchere.meilleureOffre.toLocaleString('fr-MA')} DH
                  </span>
                )}
                {enchere.statut === 'EN_COURS' && (
                  <span className="flex items-center gap-1 text-blue-600">
                    <Clock size={14} /> {tempsRestant}
                  </span>
                )}
                <span className="text-gray-400">{enchere.nombreParticipants} participants</span>
              </div>

              <div className="mt-3">
                <Link
                  to={`/produits/${enchere.produitId}`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Voir l'enchère →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
