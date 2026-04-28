import { useQuery } from '@tanstack/react-query';
import { productApi } from '../../api/productApi';
import { Link } from 'react-router-dom';
import { Package, Plus, Clock, CheckCircle, XCircle } from 'lucide-react';

const StatusBadge = ({ statut }: { statut: string | null }) => {
  if (statut === 'ACTIF') return (
    <span className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
      <CheckCircle size={12} /> En enchère
    </span>
  );
  if (statut === 'REJETE') return (
    <span className="flex items-center gap-1 bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs">
      <XCircle size={12} /> Rejeté
    </span>
  );
  return (
    <span className="flex items-center gap-1 bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-xs">
      <Clock size={12} /> En attente
    </span>
  );
};

export function MesProduits() {
  const { data, isLoading } = useQuery({
    queryKey: ['mes-produits'],
    queryFn: () => productApi.getMesProduits(),
    select: (r) => r.data,
  });

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Mes produits</h1>
          <p className="text-gray-500 mt-1">Suivez le statut de vos soumissions</p>
        </div>
        <Link
          to="/vendeur/soumettre"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus size={18} /> Nouveau produit
        </Link>
      </div>

      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      )}

      {!isLoading && (!data || data.length === 0) && (
        <div className="text-center py-16 text-gray-400">
          <Package size={48} className="mx-auto mb-4 opacity-40" />
          <p>Vous n'avez soumis aucun produit pour le moment.</p>
          <Link to="/vendeur/soumettre" className="mt-4 inline-block text-blue-600 hover:underline">
            Soumettre votre premier produit
          </Link>
        </div>
      )}

      <div className="space-y-3">
        {data?.map((produit) => (
          <div key={produit.id} className="bg-white border rounded-xl p-4 flex items-center justify-between hover:shadow-sm">
            <div className="flex items-center gap-4">
              {produit.images?.[0] ? (
                <img src={produit.images[0]} alt={produit.titre} className="w-14 h-14 rounded-lg object-cover" />
              ) : (
                <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center">
                  <Package size={20} className="text-gray-300" />
                </div>
              )}
              <div>
                <p className="font-medium text-gray-800">{produit.titre}</p>
                <p className="text-sm text-gray-500">{produit.prixBase?.toLocaleString('fr-MA')} DH</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <StatusBadge statut={produit.statutEnchere ?? null} />
              {produit.statutEnchere === 'EN_COURS' && (
                <Link to={`/produits/${produit.id}`} className="text-sm text-blue-600 hover:underline">
                  Voir l'enchère
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
