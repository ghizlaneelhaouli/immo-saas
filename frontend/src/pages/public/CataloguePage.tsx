import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { productApi } from '../../api/productApi';
import { ProductCard } from '../../components/product/ProductCard';
import { ChevronLeft, ChevronRight, Search, Building2, TrendingUp, Users } from 'lucide-react';

export function CataloguePage() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['catalogue', page],
    queryFn: () => productApi.getCatalogue(page, 12),
  });

  const produits = data?.data?.content ?? [];
  const totalPages = data?.data?.totalPages ?? 0;
  const totalElements = data?.data?.totalElements ?? 0;
  const activeCount = produits.filter((p) => p.statutEnchere === 'EN_COURS').length;

  const filtered = search
    ? produits.filter((p) => p.titre.toLowerCase().includes(search.toLowerCase()))
    : produits;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-14">
          <div className="flex items-center gap-2 text-primary-300 text-sm mb-3 font-medium">
            <Building2 size={16} />
            Enchères immobilières en ligne
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 leading-tight">
            Trouvez le bien<br />de vos rêves
          </h1>
          <p className="text-primary-200 text-lg mb-8 max-w-lg">
            Participez aux enchères en temps réel et sécurisez votre prochain bien immobilier.
          </p>

          {/* Search */}
          <div className="relative max-w-xl">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un bien immobilier..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(0); }}
              className="w-full bg-white text-gray-800 rounded-xl pl-11 pr-4 py-3.5 shadow-lg focus:ring-2 focus:ring-primary-300 outline-none text-sm"
            />
          </div>

          {/* Stats */}
          {!isLoading && (
            <div className="mt-10 flex items-center gap-8 flex-wrap">
              <div className="flex items-center gap-2 text-sm">
                <Building2 size={18} className="text-primary-300" />
                <span className="font-bold text-2xl">{totalElements}</span>
                <span className="text-primary-300">biens</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp size={18} className="text-green-400" />
                <span className="font-bold text-2xl">{activeCount}</span>
                <span className="text-primary-300">enchères actives</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users size={18} className="text-primary-300" />
                <span className="text-primary-300">Mises à jour en temps réel</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {search && (
          <p className="text-sm text-gray-500 mb-4">
            {filtered.length} résultat{filtered.length !== 1 ? 's' : ''} pour «&nbsp;{search}&nbsp;»
          </p>
        )}

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl h-72 animate-pulse border" />
            ))}
          </div>
        )}

        {isError && (
          <div className="text-center py-20">
            <Building2 size={48} className="mx-auto mb-4 text-gray-200" />
            <p className="text-gray-500">Erreur lors du chargement du catalogue.</p>
          </div>
        )}

        {!isLoading && !isError && filtered.length === 0 && (
          <div className="text-center py-20">
            <Search size={48} className="mx-auto mb-4 text-gray-200" />
            <p className="text-lg font-medium text-gray-500">Aucun bien trouvé</p>
            {search && (
              <p className="text-sm text-gray-400 mt-1">
                Essayez avec d'autres mots-clés ou{' '}
                <button onClick={() => setSearch('')} className="text-primary-600 hover:underline">
                  effacez la recherche
                </button>
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((produit) => (
            <ProductCard key={produit.id} produit={produit} />
          ))}
        </div>

        {totalPages > 1 && !search && (
          <div className="flex items-center justify-center gap-3 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="flex items-center gap-1 px-4 py-2 border rounded-lg text-sm hover:bg-white disabled:opacity-40 transition-colors bg-white shadow-sm"
            >
              <ChevronLeft size={16} /> Précédent
            </button>
            <span className="text-sm text-gray-500 px-2">
              Page <span className="font-semibold text-gray-700">{page + 1}</span> / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="flex items-center gap-1 px-4 py-2 border rounded-lg text-sm hover:bg-white disabled:opacity-40 transition-colors bg-white shadow-sm"
            >
              Suivant <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
