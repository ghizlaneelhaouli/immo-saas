import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productApi } from '../../api/productApi';
import { CheckCircle, XCircle, Package } from 'lucide-react';
import type { ProduitAdmin } from '../../types';

function ProduitCard({ produit, onValider }: { produit: ProduitAdmin; onValider: (id: number, decision: string, motif?: string) => void }) {
  const [motif, setMotif] = useState('');
  const [showMotif, setShowMotif] = useState(false);

  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-gray-800">{produit.titre}</h3>
          <p className="text-sm text-gray-500">{produit.description}</p>
        </div>
        {produit.fraisPayes && (
          <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">Frais payés</span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
        <div><span className="font-medium">Prix :</span> {produit.prixBase?.toLocaleString('fr-MA')} DH</div>
        <div><span className="font-medium">Vendeur :</span> {produit.vendeurNom}</div>
        <div className="col-span-2 text-gray-400 text-xs">{produit.vendeurEmail}</div>
      </div>

      {produit.images?.[0] && (
        <img src={produit.images[0]} alt={produit.titre} className="w-full h-40 object-cover rounded-lg" />
      )}

      {showMotif && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Motif du rejet</label>
          <textarea
            rows={2}
            value={motif}
            onChange={(e) => setMotif(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-400 outline-none"
            placeholder="Expliquez pourquoi ce produit est rejeté..."
          />
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={() => onValider(produit.id, 'APPROUVER')}
          className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 text-sm font-medium"
        >
          <CheckCircle size={16} /> Approuver
        </button>
        {!showMotif ? (
          <button
            onClick={() => setShowMotif(true)}
            className="flex-1 flex items-center justify-center gap-2 border-2 border-red-500 text-red-600 py-2 rounded-lg hover:bg-red-50 text-sm font-medium"
          >
            <XCircle size={16} /> Rejeter
          </button>
        ) : (
          <button
            onClick={() => onValider(produit.id, 'REJETER', motif)}
            className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 text-sm font-medium"
          >
            <XCircle size={16} /> Confirmer rejet
          </button>
        )}
      </div>
    </div>
  );
}

export function ValidateProduits() {
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-en-attente'],
    queryFn: () => productApi.getEnAttente(),
    select: (r) => r.data,
  });

  const validerMutation = useMutation({
    mutationFn: ({ id, decision, motif }: { id: number; decision: string; motif?: string }) =>
      productApi.valider(id, decision, motif),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-en-attente'] });
    },
  });

  const handleValider = (id: number, decision: string, motif?: string) => {
    validerMutation.mutate({ id, decision, motif });
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Valider les produits</h1>
      <p className="text-gray-500 mb-8">Examinez et approuvez ou rejetez les soumissions vendeurs.</p>

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2].map((i) => <div key={i} className="h-56 bg-gray-100 rounded-xl animate-pulse" />)}
        </div>
      )}

      {!isLoading && (!data || data.length === 0) && (
        <div className="text-center py-16 text-gray-400">
          <Package size={48} className="mx-auto mb-4 opacity-40" />
          <p>Aucun produit en attente de validation.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data?.map((produit) => (
          <ProduitCard key={produit.id} produit={produit} onValider={handleValider} />
        ))}
      </div>
    </div>
  );
}
