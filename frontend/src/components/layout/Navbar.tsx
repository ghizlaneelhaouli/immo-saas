import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { LogOut, Package, Gavel, ShieldCheck, Menu, X, Building2 } from 'lucide-react';

export function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  const linkClass = (path: string) =>
    `transition-colors text-sm ${
      isActive(path)
        ? 'text-white font-semibold underline underline-offset-4 decoration-primary-300'
        : 'text-primary-100 hover:text-white'
    }`;

  const initials = user?.nom
    ? user.nom.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  return (
    <nav className="bg-gradient-to-r from-primary-800 to-primary-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl shrink-0">
            <Building2 size={22} className="text-primary-200" />
            <span>IMMO<span className="font-light text-primary-300">SAAS</span></span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className={linkClass('/')}>Catalogue</Link>

            {!user && (
              <>
                <Link to="/login" className={linkClass('/login')}>Connexion</Link>
                <Link
                  to="/register"
                  className="bg-white text-primary-700 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-primary-50 transition-colors"
                >
                  Inscription
                </Link>
              </>
            )}

            {user?.role === 'VENDEUR' && (
              <>
                <Link to="/vendeur/mes-produits" className={`flex items-center gap-1.5 ${linkClass('/vendeur/mes-produits')}`}>
                  <Package size={15} /> Mes produits
                </Link>
                <Link
                  to="/vendeur/soumettre"
                  className="bg-white text-primary-700 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-primary-50 transition-colors"
                >
                  + Soumettre
                </Link>
              </>
            )}

            {user?.role === 'ACHETEUR' && (
              <Link to="/acheteur/mes-encheres" className={`flex items-center gap-1.5 ${linkClass('/acheteur/mes-encheres')}`}>
                <Gavel size={15} /> Mes enchères
              </Link>
            )}

            {user?.role === 'ADMIN' && (
              <>
                <Link to="/admin" className={`flex items-center gap-1.5 ${linkClass('/admin')}`}>
                  <ShieldCheck size={15} /> Dashboard
                </Link>
                <Link to="/admin/valider" className={linkClass('/admin/valider')}>Valider</Link>
              </>
            )}

            {user && (
              <div className="flex items-center gap-3 ml-2 pl-4 border-l border-primary-500">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary-500 border-2 border-primary-300 flex items-center justify-center text-xs font-bold">
                    {initials}
                  </div>
                  <span className="text-primary-100 text-xs max-w-[100px] truncate">{user.nom}</span>
                </div>
                <button
                  onClick={handleLogout}
                  title="Déconnexion"
                  className="text-primary-200 hover:text-red-300 transition-colors"
                >
                  <LogOut size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-primary-700 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-primary-800 border-t border-primary-700 px-4 py-3 space-y-1">
          <MobileLink to="/" onClick={() => setMobileOpen(false)}>Catalogue</MobileLink>

          {!user && (
            <>
              <MobileLink to="/login" onClick={() => setMobileOpen(false)}>Connexion</MobileLink>
              <MobileLink to="/register" onClick={() => setMobileOpen(false)}>Inscription</MobileLink>
            </>
          )}

          {user?.role === 'VENDEUR' && (
            <>
              <MobileLink to="/vendeur/mes-produits" onClick={() => setMobileOpen(false)}>Mes produits</MobileLink>
              <MobileLink to="/vendeur/soumettre" onClick={() => setMobileOpen(false)}>+ Soumettre</MobileLink>
            </>
          )}

          {user?.role === 'ACHETEUR' && (
            <MobileLink to="/acheteur/mes-encheres" onClick={() => setMobileOpen(false)}>Mes enchères</MobileLink>
          )}

          {user?.role === 'ADMIN' && (
            <>
              <MobileLink to="/admin" onClick={() => setMobileOpen(false)}>Dashboard</MobileLink>
              <MobileLink to="/admin/valider" onClick={() => setMobileOpen(false)}>Valider produits</MobileLink>
            </>
          )}

          {user && (
            <div className="border-t border-primary-700 pt-3 mt-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-primary-500 border border-primary-300 flex items-center justify-center text-xs font-bold">
                  {initials}
                </div>
                <span className="text-primary-200 text-sm">{user.nom}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-sm text-red-300 hover:text-red-200"
              >
                <LogOut size={14} /> Déconnexion
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

function MobileLink({ to, onClick, children }: { to: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block py-2.5 px-3 rounded-lg text-primary-100 hover:bg-primary-700 hover:text-white transition-colors text-sm"
    >
      {children}
    </Link>
  );
}
