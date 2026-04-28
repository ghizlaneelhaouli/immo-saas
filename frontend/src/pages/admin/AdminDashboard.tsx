import { useQuery } from '@tanstack/react-query';
import { productApi } from '../../api/productApi';
import { Link } from 'react-router-dom';
import { Package, ShieldCheck, CheckSquare } from 'lucide-react';

export function AdminDashboard() {
  const { data: produitsEnAttente } = useQuery({
    queryKey: ['admin-en-attente'],
    queryFn: () => productApi.getEnAttente(),
    select: (r) => r.data,
  });

  const count = produitsEnAttente?.length ?? 0;

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="flex items-center gap-3 mb-8">
        <ShieldCheck className="text-blue-600" size={32} />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Administration</h1>
          <p className="text-gray-500">Gérez la plateforme IMMO SAAS</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">En attente de validation</p>
              <p className="text-3xl font-bold text-amber-600 mt-1">{count}</p>
            </div>
            <Package className="text-amber-400" size={36} />
          </div>
          {count > 0 && (
            <Link to="/admin/valider" className="mt-4 inline-block text-sm text-blue-600 hover:underline">
              Valider maintenant →
            </Link>
          )}
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Enchères actives</p>
              <p className="text-3xl font-bold text-green-600 mt-1">—</p>
            </div>
            <CheckSquare className="text-green-400" size={36} />
          </div>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Accès rapides</p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <Link to="/admin/valider" className="block text-sm text-blue-600 hover:underline">
              → Valider les produits
            </Link>
            <Link to="/" className="block text-sm text-gray-500 hover:underline">
              → Voir le catalogue
            </Link>
          </div>
        </div>
      </div>

      {count > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <p className="font-medium text-amber-800">
            {count} produit(s) en attente de validation.
          </p>
          <Link
            to="/admin/valider"
            className="mt-3 inline-block bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 text-sm font-medium"
          >
            Traiter les demandes
          </Link>
        </div>
      )}
    </div>
  );
}
