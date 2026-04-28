import { Link } from 'react-router-dom';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Users, TrendingUp, Clock } from 'lucide-react';
import type { ProduitPublic } from '../../types';

interface Props {
  produit: ProduitPublic;
}

export function ProductCard({ produit }: Props) {
  const tempsRestant = produit.dateFinEnchere
    ? formatDistanceToNow(parseISO(produit.dateFinEnchere), { addSuffix: true, locale: fr })
    : null;

  const imgSrc = produit.images?.[0] || 'https://placehold.co/400x250?text=Pas+d+image';

  return (
    <Link to={`/produits/${produit.id}`} className="block group">
      <div className="border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow bg-white">
        <img
          src={imgSrc}
          alt={produit.titre}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 truncate">{produit.titre}</h3>
          <p className="text-gray-500 text-sm mt-1 line-clamp-2">{produit.description}</p>

          <div className="mt-3 space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Prix de base</span>
              <span className="font-medium">{produit.prixBase.toLocaleString('fr-MA')} DH</span>
            </div>
            {produit.meilleureOffre && (
              <div className="flex justify-between text-sm text-green-600">
                <span className="flex items-center gap-1"><TrendingUp size={14} /> Meilleure offre</span>
                <span className="font-bold">{produit.meilleureOffre.toLocaleString('fr-MA')} DH</span>
              </div>
            )}
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Users size={12} /> {produit.nombreParticipants} participants
            </span>
            {tempsRestant && (
              <span className={`flex items-center gap-1 ${produit.statutEnchere === 'TERMINEE' ? 'text-red-400' : 'text-blue-500'}`}>
                <Clock size={12} /> {tempsRestant}
              </span>
            )}
          </div>

          {produit.statutEnchere === 'TERMINEE' && (
            <span className="mt-2 inline-block bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full">
              Terminée
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
