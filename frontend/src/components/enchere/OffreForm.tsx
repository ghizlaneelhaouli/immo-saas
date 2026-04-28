import { useState } from 'react';
import { TrendingUp } from 'lucide-react';

interface Props {
  prixBase: number;
  meilleureOffre: number | null;
  onSubmit: (montant: number) => Promise<void>;
}

export function OffreForm({ prixBase, meilleureOffre, onSubmit }: Props) {
  const minimum = Math.max(prixBase, meilleureOffre ?? 0) + 1;
  const [montant, setMontant] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const val = Number(montant);
    if (val <= minimum - 1) {
      setError(`L'offre doit être supérieure à ${minimum - 1} DH`);
      return;
    }
    setError('');
    setLoading(true);
    try {
      await onSubmit(val);
      setMontant('');
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Erreur lors du placement de l\'offre');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Votre offre (minimum {minimum.toLocaleString('fr-MA')} DH)
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            required
            min={minimum}
            step="1"
            value={montant}
            onChange={(e) => setMontant(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder={`Min. ${minimum.toLocaleString('fr-MA')} DH`}
          />
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 font-medium"
          >
            <TrendingUp size={16} />
            {loading ? '...' : 'Enchérir'}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    </form>
  );
}
