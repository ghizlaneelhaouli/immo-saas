import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Eye, EyeOff, ShoppingBag, Store } from 'lucide-react';

export function RegisterPage() {
  const { register } = useAuth();
  const [form, setForm] = useState({
    email: '', password: '', nom: '', telephone: '',
    role: 'ACHETEUR' as 'VENDEUR' | 'ACHETEUR',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form);
    } catch (err: any) {
      setError(err?.response?.data?.error || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">

        {/* Logo Fynd */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex flex-col items-center">
            <span className="font-script text-primary-600 text-6xl leading-none">Fynd</span>
            <div className="w-20 h-[2px] bg-primary-600 mt-0.5" />
            <span className="tracking-[0.4em] text-gray-400 uppercase text-[9px] font-light mt-1">Unique Find</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Créer un compte</h1>
          <p className="text-gray-500 text-sm mb-6">Rejoignez la communauté vintage Fynd</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Je suis</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'ACHETEUR', label: 'Acheteur', desc: 'Je veux enchérir', Icon: ShoppingBag },
                  { value: 'VENDEUR',  label: 'Vendeur',  desc: 'Je veux vendre',   Icon: Store },
                ].map(({ value, label, desc, Icon }) => (
                  <button key={value} type="button"
                    onClick={() => setForm({ ...form, role: value as 'ACHETEUR' | 'VENDEUR' })}
                    className={`flex flex-col items-center gap-1.5 p-4 rounded-xl border-2 transition-all text-sm ${
                      form.role === value
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    <Icon size={22} />
                    <span className="font-semibold">{label}</span>
                    <span className="text-xs opacity-70">{desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Nom complet</label>
              <input type="text" name="nom" required value={form.nom} onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition text-sm"
                placeholder="Votre nom" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input type="email" name="email" required value={form.email} onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition text-sm"
                placeholder="votre@email.com" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Mot de passe <span className="text-gray-400 font-normal">(min. 8 caractères)</span>
              </label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} name="password" required value={form.password} onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-11 bg-gray-50 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition text-sm"
                  placeholder="••••••••" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Téléphone <span className="text-gray-400 font-normal">(optionnel)</span>
              </label>
              <input type="tel" name="telephone" value={form.telephone} onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition text-sm"
                placeholder="06xxxxxxxx" />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">{error}</div>
            )}

            <button type="submit" disabled={loading}
              className="w-full bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 disabled:opacity-50 transition-colors shadow-sm">
              {loading ? 'Création...' : 'Créer mon compte'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Déjà inscrit ?{' '}
            <Link to="/login" className="text-primary-600 hover:underline font-medium">Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
