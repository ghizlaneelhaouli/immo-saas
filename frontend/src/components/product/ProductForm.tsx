import { useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';

interface Props {
  onSubmit: (data: { titre: string; description: string; prixBase: number }, images: File[]) => void;
  loading?: boolean;
}

export function ProductForm({ onSubmit, loading }: Props) {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [prixBase, setPrixBase] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const showFraisWarning = Number(prixBase) > 500;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ titre, description, prixBase: Number(prixBase) }, images);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Titre du produit *</label>
        <input
          type="text"
          required
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 outline-none"
          placeholder="Ex: Villa 5 pièces à Marrakech"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 outline-none resize-none"
          placeholder="Décrivez votre bien..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Prix de base (DH) *</label>
        <input
          type="number"
          required
          min="1"
          step="0.01"
          value={prixBase}
          onChange={(e) => setPrixBase(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 outline-none"
          placeholder="Ex: 500000"
        />
        {showFraisWarning && (
          <div className="mt-2 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg p-3">
            <AlertCircle size={16} className="text-amber-500 mt-0.5 shrink-0" />
            <p className="text-sm text-amber-700">
              Prix supérieur à 500 DH — des frais d'inscription de <strong>20 DH</strong> seront appliqués.
            </p>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Photos (max 5 images, 5MB chacune)</label>
        <label className="flex items-center gap-2 border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-primary-400 transition-colors">
          <Upload size={20} className="text-gray-400" />
          <span className="text-gray-500 text-sm">Cliquer pour sélectionner des images</span>
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => setImages(Array.from(e.target.files || []).slice(0, 5))}
          />
        </label>
        {images.length > 0 && (
          <p className="text-sm text-gray-500 mt-1">{images.length} image(s) sélectionnée(s)</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary-600 text-white py-2.5 rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50 transition-colors"
      >
        {loading ? 'Envoi en cours...' : 'Soumettre le produit'}
      </button>
    </form>
  );
}
