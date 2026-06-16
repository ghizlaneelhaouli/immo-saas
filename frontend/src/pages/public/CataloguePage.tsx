import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { productApi } from '../../api/productApi';
import { ProductCard } from '../../components/product/ProductCard';
import { ChevronLeft, ChevronRight, Search, Gavel, TrendingUp, Users } from 'lucide-react';
import { useT } from '../../i18n';

export function CataloguePage() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const { t } = useT();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['catalogue', page],
    queryFn: () => productApi.getCatalogue(page, 12),
  });

  const produits      = data?.data?.content     ?? [];
  const totalPages    = data?.data?.totalPages   ?? 0;
  const totalElements = data?.data?.totalElements ?? 0;
  const activeCount   = produits.filter((p) => p.statutEnchere === 'EN_COURS').length;

  const filtered = search
    ? produits.filter((p) => p.titre.toLowerCase().includes(search.toLowerCase()))
    : produits;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-950 via-[#1a0304] to-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-4 py-14">
          <div className="flex items-center gap-2 text-primary-400 text-xs font-semibold tracking-widest uppercase mb-4">
            <Gavel size={14} />{t.catalogue.badge}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 leading-tight">
            {t.catalogue.title1}<br />
            <span className="font-script text-primary-500">{t.catalogue.title2}</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg mb-8 max-w-lg leading-relaxed">{t.catalogue.desc}</p>

          <div className="relative max-w-xl">
            <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={t.catalogue.placeholder}
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(0); }}
              className="w-full bg-white text-gray-800 rounded-xl pl-11 pr-4 py-3.5 shadow-lg focus:ring-2 focus:ring-primary-400 outline-none text-sm"
            />
          </div>

          {!isLoading && (
            <div className="mt-10 flex items-center gap-8 flex-wrap">
              <div className="flex items-center gap-2 text-sm">
                <Gavel size={17} className="text-primary-400" />
                <span className="font-bold text-2xl">{totalElements}</span>
                <span className="text-gray-500">{t.catalogue.objects}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp size={17} className="text-primary-400" />
                <span className="font-bold text-2xl">{activeCount}</span>
                <span className="text-gray-500">{t.catalogue.active}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users size={17} className="text-gray-600" />
                <span className="text-gray-500">{t.catalogue.live}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {search && (
          <p className="text-sm text-gray-500 mb-4">{t.catalogue.results(filtered.length, search)}</p>
        )}

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl h-72 animate-pulse border border-gray-100" />
            ))}
          </div>
        )}

        {isError && (
          <div className="text-center py-20">
            <Gavel size={48} className="mx-auto mb-4 text-gray-200" />
            <p className="text-gray-500">{t.catalogue.error}</p>
          </div>
        )}

        {!isLoading && !isError && filtered.length === 0 && (
          <div className="text-center py-20">
            <Search size={48} className="mx-auto mb-4 text-gray-200" />
            <p className="text-lg font-medium text-gray-500">{t.catalogue.noResults}</p>
            {search && (
              <p className="text-sm text-gray-400 mt-1">
                {t.catalogue.results(0, search).split('pour')[0]}{' '}
                <button onClick={() => setSearch('')} className="text-primary-600 hover:underline">
                  {t.catalogue.clearSearch}
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
          <div className="flex items-center justify-center gap-3 mt-12">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="flex items-center gap-1 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:border-primary-300 hover:text-primary-600 disabled:opacity-40 transition-colors bg-white shadow-sm"
            >
              <ChevronLeft size={16} />{t.catalogue.prev}
            </button>
            <span className="text-sm text-gray-500 px-2">
              {t.catalogue.page} <span className="font-semibold text-gray-800">{page + 1}</span> {t.catalogue.of} {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="flex items-center gap-1 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:border-primary-300 hover:text-primary-600 disabled:opacity-40 transition-colors bg-white shadow-sm"
            >
              {t.catalogue.next}<ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
