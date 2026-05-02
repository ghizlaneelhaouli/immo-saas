import { useQuery } from '@tanstack/react-query';
import { productApi } from '../../api/productApi';
import { Link } from 'react-router-dom';
import { Package, ShieldCheck, CheckSquare, ArrowRight, LayoutGrid } from 'lucide-react';

export function AdminDashboard() {
  const { data: produitsEnAttente } = useQuery({
    queryKey: ['admin-en-attente'],
    queryFn: () => productApi.getEnAttente(),
    select: (r) => r.data,
  });

  const count = produitsEnAttente?.length ?? 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 py-6 flex items-center gap-3">
          <div className="p-2.5 bg-blue-100 rounded-xl">
            <ShieldCheck className="text-blue-600" size={26} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Administration</h1>
            <p className="text-gray-500 text-sm">Tableau de bord IMMO SAAS</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">En attente</p>
                <p className="text-4xl font-bold text-amber-500 mt-1">{count}</p>
                <p className="text-xs text-gray-400 mt-1">produit{count !== 1 ? 's' : ''} à valider</p>
              </div>
              <div className="p-3 bg-amber-50 rounded-xl">
                <Package className="text-amber-400" size={26} />
              </div>
            </div>
            {count > 0 && (
              <Link
                to="/admin/valider"
                className="mt-4 flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700 font-medium"
              >
                Traiter maintenant <ArrowRight size={14} />
              </Link>
            )}
          </div>

          <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Enchères actives</p>
                <p className="text-4xl font-bold text-green-500 mt-1">—</p>
                <p className="text-xs text-gray-400 mt-1">en cours</p>
              </div>
              <div className="p-3 bg-green-50 rounded-xl">
                <CheckSquare className="text-green-400" size={26} />
              </div>
            </div>
          </div>

          <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <p className="text-sm text-gray-500">Actions rapides</p>
              <div className="p-2 bg-blue-50 rounded-lg">
                <LayoutGrid className="text-blue-400" size={20} />
              </div>
            </div>
            <div className="space-y-2.5">
              <Link
                to="/admin/valider"
                className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700"
              >
                <ArrowRight size={13} /> Valider les produits
              </Link>
              <Link
                to="/"
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700"
              >
                <ArrowRight size={13} /> Voir le catalogue
              </Link>
            </div>
          </div>
        </div>

        {/* Alert */}
        {count > 0 ? (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-amber-800">
                {count} produit{count > 1 ? 's' : ''} en attente de validation
              </p>
              <p className="text-amber-600 text-sm mt-0.5">
                Répondez aux demandes des vendeurs rapidement
              </p>
            </div>
            <Link
              to="/admin/valider"
              className="shrink-0 bg-amber-500 text-white px-5 py-2.5 rounded-xl hover:bg-amber-600 text-sm font-medium transition-colors flex items-center gap-2"
            >
              Traiter <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-xl p-5 flex items-center gap-3">
            <CheckSquare size={20} className="text-green-500 shrink-0" />
            <p className="font-medium text-green-700">Tout est à jour — aucune demande en attente.</p>
          </div>
        )}
      </div>
    </div>
  );
}
