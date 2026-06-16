import { useState } from 'react';
import { Upload } from 'lucide-react';

interface Props {
  onSubmit: (data: { titre: string; description: string; prixBase: number }, images: File[]) => void;
  loading?: boolean;
}

export function ProductForm({ onSubmit, loading }: Props) {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [prixBase, setPrixBase] = useState('');
  const [images, setImages] = useState<File[]>([]);

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
          placeholder="Ex: Appareil photo Leica M3 — 1960"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 outline-none resize-none"
          placeholder="Décrivez votre objet vintage : état, époque, origine..."
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
          placeholder="Ex: 200"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Photos</label>
        <label className="flex items-center gap-2 border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-primary-400 transition-colors">
          <Upload size={20} className="text-gray-400" />
          <span className="text-gray-500 text-sm">Cliquer pour ajouter des photos</span>
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => setImages(Array.from(e.target.files || []))}
          />
        </label>
        {images.length > 0 && (
          <p className="text-sm text-gray-500 mt-1">{images.length} photo(s) sélectionnée(s)</p>
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
