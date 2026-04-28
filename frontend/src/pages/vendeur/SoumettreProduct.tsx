import { useState } from 'react';
import { productApi } from '../../api/productApi';
import { ProductForm } from '../../components/product/ProductForm';
import { CheckCircle, AlertCircle } from 'lucide-react';

export function SoumettreProduct() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ produitId: number; fraisNecessaires: boolean; montantFrais: number } | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (data: { titre: string; description: string; prixBase: number }, images: File[]) => {
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('request', new Blob([JSON.stringify(data)], { type: 'application/json' }));
      images.forEach((img) => formData.append('images', img));

      const res = await productApi.soumettre(formData);
      setResult(res.data);
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Erreur lors de la soumission');
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    return (
      <div className="max-w-lg mx-auto py-12 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center space-y-4">
          <CheckCircle className="mx-auto text-green-500" size={56} />
          <h2 className="text-2xl font-bold text-gray-800">Produit soumis !</h2>
          <p className="text-gray-500">Votre produit est en attente de validation par l'administrateur.</p>

          {result.fraisNecessaires && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="text-amber-500 mt-0.5" size={18} />
                <div className="text-left">
                  <p className="font-medium text-amber-800">Frais d'inscription requis</p>
                  <p className="text-sm text-amber-700 mt-1">
                    Votre produit a un prix de base supérieur à 500 DH. Des frais d'inscription de{' '}
                    <strong>{result.montantFrais} DH</strong> sont appliqués.
                  </p>
                </div>
              </div>
            </div>
          )}

          <a
            href="/vendeur/mes-produits"
            className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700"
          >
            Voir mes produits
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Soumettre un produit</h1>
      <p className="text-gray-500 mb-8">Soumettez votre bien immobilier pour le mettre aux enchères.</p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <ProductForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
}
