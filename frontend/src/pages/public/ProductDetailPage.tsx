import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productApi } from '../../api/productApi';
import { enchereApi } from '../../api/enchereApi';
import { EnchereTimer } from '../../components/enchere/EnchereTimer';
import { OffreForm } from '../../components/enchere/OffreForm';
import { useAuthStore } from '../../store/authStore';
import { useEnchereSocket } from '../../hooks/useEnchere';
import { Users, ArrowLeft, Gavel } from 'lucide-react';
import { useState } from 'react';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const produitId = Number(id);
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const qc = useQueryClient();
  const [inscritMessage, setInscritMessage] = useState('');
  const [inscritError, setInscritError] = useState('');

  const { data: produit, isLoading } = useQuery({
    queryKey: ['produit', produitId],
    queryFn: () => productApi.getDetail(produitId),
    select: (r) => r.data,
  });

  const { data: enchere } = useQuery({
    queryKey: ['enchere-by-produit', produitId],
    queryFn: async () => {
      // L'enchère est liée au produit — on cherche via le detail
      return null;
    },
    enabled: false,
  });

  const enchereQuery = useQuery({
    queryKey: ['enchere', produitId],
    queryFn: async () => {
      // Since frontend doesn't have a direct produit->enchère endpoint,
      // we rely on the ProduitPublicDTO which embeds enchère info
      return null;
    },
    enabled: false,
  });

  const { meilleureOffre: offreWs } = useEnchereSocket(produitId);

  const inscrisMutation = useMutation({
    mutationFn: (enchereId: number) => enchereApi.inscrire(enchereId),
    onSuccess: () => {
      setInscritMessage('Inscription confirmée ! Vous pouvez maintenant enchérir.');
      setInscritError('');
      qc.invalidateQueries({ queryKey: ['produit', produitId] });
    },
    onError: (err: any) => {
      setInscritError(err?.response?.data?.error || 'Erreur d\'inscription');
    },
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="animate-pulse space-y-4">
          <div className="h-64 bg-gray-200 rounded-xl" />
          <div className="h-8 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-full" />
        </div>
      </div>
    );
  }

  if (!produit) return <div className="text-center py-12">Produit introuvable.</div>;

  const meilleureOffreActuelle = offreWs ?? produit.meilleureOffre;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft size={18} /> Retour au catalogue
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {produit.images?.length > 0 ? (
            <img
              src={produit.images[0]}
              alt={produit.titre}
              className="w-full rounded-xl object-cover h-72"
            />
          ) : (
            <div className="w-full h-72 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
              Pas d'image
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-800">{produit.titre}</h1>
          <p className="text-gray-600">{produit.description}</p>

          <div className="bg-primary-50 border border-primary-100 rounded-xl p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Prix de base</span>
              <span className="font-semibold">{produit.prixBase?.toLocaleString('fr-MA')} DH</span>
            </div>
            {meilleureOffreActuelle && (
              <div className="flex justify-between text-green-700">
                <span>Meilleure offre</span>
                <span className="font-bold text-lg">{meilleureOffreActuelle.toLocaleString('fr-MA')} DH</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Users size={14} /> {produit.nombreParticipants} participants
            </div>
          </div>

          {produit.dateFinEnchere && (
            <div className="bg-gray-50 border rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">Temps restant</p>
              <EnchereTimer dateFin={produit.dateFinEnchere} />
            </div>
          )}

          {user?.role === 'ACHETEUR' && produit.statutEnchere === 'EN_COURS' && (
            <div className="space-y-3">
              {inscritMessage && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded-lg text-sm">
                  {inscritMessage}
                </div>
              )}
              {inscritError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
                  {inscritError}
                </div>
              )}

              <button
                onClick={() => inscrisMutation.mutate(produitId)}
                disabled={inscrisMutation.isPending}
                className="w-full flex items-center justify-center gap-2 border-2 border-primary-600 text-primary-600 py-2.5 rounded-lg font-medium hover:bg-primary-50 disabled:opacity-50"
              >
                <Gavel size={18} />
                {inscrisMutation.isPending ? 'Inscription...' : 'S\'inscrire à l\'enchère'}
              </button>

              <OffreForm
                prixBase={produit.prixBase}
                meilleureOffre={meilleureOffreActuelle}
                onSubmit={async (montant) => {
                  await enchereApi.placerOffre(produitId, montant);
                  qc.invalidateQueries({ queryKey: ['produit', produitId] });
                }}
              />
            </div>
          )}

          {!user && (
            <p className="text-center text-sm text-gray-500">
              <a href="/login" className="text-primary-600 hover:underline">Connectez-vous</a> pour participer à l'enchère.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
