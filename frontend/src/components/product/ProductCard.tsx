import { Link } from 'react-router-dom';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Users, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import type { ProduitPublic } from '../../types';

interface Props {
  produit: ProduitPublic;
}

export function ProductCard({ produit }: Props) {
  const tempsRestant = produit.dateFinEnchere
    ? formatDistanceToNow(parseISO(produit.dateFinEnchere), { addSuffix: true, locale: fr })
    : null;

  const imgSrc = produit.images?.[0] || 'https://placehold.co/400x250?text=Bien+immobilier';
  const isActive = produit.statutEnchere === 'EN_COURS';

  return (
    <Link to={`/produits/${produit.id}`} className="block group">
      <div className="border rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white hover:-translate-y-1">
        {/* Image */}
        <div className="relative overflow-hidden h-48">
          <img
            src={imgSrc}
            alt={produit.titre}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

          {isActive ? (
            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-green-500 text-white text-xs px-2.5 py-1 rounded-full font-medium shadow">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              En cours
            </div>
          ) : (
            <div className="absolute top-3 left-3 bg-gray-700/80 text-white text-xs px-2.5 py-1 rounded-full">
              Terminée
            </div>
          )}

          <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
            <Users size={11} /> {produit.nombreParticipants}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 truncate group-hover:text-primary-600 transition-colors">
            {produit.titre}
          </h3>
          <p className="text-gray-500 text-sm mt-1 line-clamp-2">{produit.description}</p>

          <div className="mt-3 pt-3 border-t border-gray-100 space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400 text-xs">Prix de base</span>
              <span className="font-medium text-gray-700">{produit.prixBase.toLocaleString('fr-MA')} DH</span>
            </div>
            {produit.meilleureOffre && (
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-1 text-green-600 text-xs">
                  <TrendingUp size={12} /> Meilleure offre
                </span>
                <span className="font-bold text-green-600">{produit.meilleureOffre.toLocaleString('fr-MA')} DH</span>
              </div>
            )}
          </div>

          <div className="mt-3 flex items-center justify-between">
            {tempsRestant && (
              <span className={`flex items-center gap-1 text-xs ${isActive ? 'text-primary-500' : 'text-gray-400'}`}>
                <Clock size={11} /> {tempsRestant}
              </span>
            )}
            <span className="flex items-center gap-1 text-xs text-primary-600 font-medium group-hover:gap-2 transition-all ml-auto">
              Voir <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
