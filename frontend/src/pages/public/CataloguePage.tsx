import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { productApi } from '../../api/productApi';
import { ProductCard } from '../../components/product/ProductCard';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

export function CataloguePage() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['catalogue', page],
    queryFn: () => productApi.getCatalogue(page, 12),
  });

  const produits = data?.data?.content ?? [];
  const totalPages = data?.data?.totalPages ?? 0;

  const filtered = search
    ? produits.filter((p) => p.titre.toLowerCase().includes(search.toLowerCase()))
    : produits;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Catalogue des enchères</h1>
          <p className="text-gray-500">Découvrez les biens immobiliers disponibles aux enchères</p>
        </div>

        <div className="relative mb-6">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un bien..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl h-72 animate-pulse border" />
            ))}
          </div>
        )}

        {isError && (
          <div className="text-center py-16 text-gray-500">
            Erreur lors du chargement du catalogue.
          </div>
        )}

        {!isLoading && filtered.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            Aucun produit disponible pour le moment.
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((produit) => (
            <ProductCard key={produit.id} produit={produit} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="flex items-center gap-1 px-4 py-2 border rounded-lg text-sm hover:bg-gray-50 disabled:opacity-40"
            >
              <ChevronLeft size={16} /> Précédent
            </button>
            <span className="text-sm text-gray-500">Page {page + 1} / {totalPages}</span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="flex items-center gap-1 px-4 py-2 border rounded-lg text-sm hover:bg-gray-50 disabled:opacity-40"
            >
              Suivant <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
