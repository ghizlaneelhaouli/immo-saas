import { useQuery } from '@tanstack/react-query';
import { productApi } from '../../api/productApi';
import { Link } from 'react-router-dom';
import { Package, Plus, Clock, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

const StatusBadge = ({ statut }: { statut: string | null }) => {
  if (statut === 'ACTIF') return (
    <span className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
      <CheckCircle size={12} /> En enchère
    </span>
  );
  if (statut === 'REJETE') return (
    <span className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium">
      <XCircle size={12} /> Rejeté
    </span>
  );
  return (
    <span className="flex items-center gap-1 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-medium">
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary-100 rounded-xl">
              <Package className="text-primary-600" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Mes produits</h1>
              <p className="text-gray-500 text-sm">Suivez le statut de vos soumissions</p>
            </div>
          </div>
          <Link
            to="/vendeur/soumettre"
            className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2.5 rounded-xl hover:bg-primary-700 transition-colors text-sm font-medium shadow-sm"
          >
            <Plus size={16} /> Nouveau produit
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {isLoading && (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-white rounded-xl animate-pulse border" />
            ))}
          </div>
        )}

        {!isLoading && (!data || data.length === 0) && (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-4">
              <Package size={28} className="text-primary-300" />
            </div>
            <p className="text-lg font-medium text-gray-600">Aucun produit soumis</p>
            <p className="text-gray-400 text-sm mt-1 mb-6">Soumettez votre premier bien immobilier</p>
            <Link
              to="/vendeur/soumettre"
              className="bg-primary-600 text-white px-6 py-2.5 rounded-xl hover:bg-primary-700 transition-colors text-sm font-medium"
            >
              Soumettre un produit
            </Link>
          </div>
        )}

        <div className="space-y-3">
          {data?.map((produit) => (
            <div key={produit.id} className="bg-white border rounded-xl p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                {produit.images?.[0] ? (
                  <img
                    src={produit.images[0]}
                    alt={produit.titre}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                    <Package size={22} className="text-gray-300" />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 truncate">{produit.titre}</p>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {produit.prixBase?.toLocaleString('fr-MA')} DH
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <StatusBadge statut={produit.statutEnchere ?? null} />
                  {produit.statutEnchere === 'EN_COURS' && (
                    <Link
                      to={`/produits/${produit.id}`}
                      className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700"
                    >
                      Voir <ArrowRight size={14} />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
