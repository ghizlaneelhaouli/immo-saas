import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { LogOut, Home, Package, Gavel, ShieldCheck } from 'lucide-react';

export function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-blue-700 text-white px-6 py-3 flex items-center justify-between shadow-md">
      <Link to="/" className="flex items-center gap-2 font-bold text-xl">
        <Home size={20} />
        IMMO SAAS
      </Link>

      <div className="flex items-center gap-4 text-sm">
        <Link to="/" className="hover:text-blue-200 transition-colors">Catalogue</Link>

        {!user && (
          <>
            <Link to="/login" className="hover:text-blue-200">Connexion</Link>
            <Link to="/register" className="bg-white text-blue-700 px-3 py-1 rounded hover:bg-blue-50">
              Inscription
            </Link>
          </>
        )}

        {user?.role === 'VENDEUR' && (
          <>
            <Link to="/vendeur/mes-produits" className="flex items-center gap-1 hover:text-blue-200">
              <Package size={16} /> Mes produits
            </Link>
            <Link to="/vendeur/soumettre" className="bg-white text-blue-700 px-3 py-1 rounded hover:bg-blue-50">
              + Soumettre
            </Link>
          </>
        )}

        {user?.role === 'ACHETEUR' && (
          <Link to="/acheteur/mes-encheres" className="flex items-center gap-1 hover:text-blue-200">
            <Gavel size={16} /> Mes enchères
          </Link>
        )}

        {user?.role === 'ADMIN' && (
          <>
            <Link to="/admin" className="flex items-center gap-1 hover:text-blue-200">
              <ShieldCheck size={16} /> Dashboard
            </Link>
            <Link to="/admin/valider" className="hover:text-blue-200">Valider produits</Link>
          </>
        )}

        {user && (
          <div className="flex items-center gap-3 ml-4 border-l border-blue-500 pl-4">
            <span className="text-blue-200 text-xs">{user.nom}</span>
            <button onClick={handleLogout} className="flex items-center gap-1 hover:text-red-300">
              <LogOut size={16} /> Déconnexion
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
