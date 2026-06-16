import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { LogOut, Package, Gavel, ShieldCheck, Menu, X } from 'lucide-react';
import { useT } from '../../i18n';

function FyndWordmark() {
  return (
    <div className="flex flex-col items-start leading-none">
      <span className="font-script text-primary-600 text-3xl leading-none">Fynd</span>
      <div className="w-full h-[1.5px] bg-primary-600 mt-0.5" />
      <span className="tracking-[0.3em] text-gray-400 uppercase text-[8px] font-light mt-0.5">
        Unique Find
      </span>
    </div>
  );
}

function LangToggle() {
  const { lang, setLang } = useT();
  const next = lang === 'fr' ? 'en' : 'fr';
  return (
    <button
      onClick={() => setLang(next)}
      className="text-xs font-bold border border-gray-200 hover:border-primary-400 hover:text-primary-600 text-gray-500 rounded-full px-3 py-1.5 transition-colors tracking-wider"
      title={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
    >
      {lang === 'fr' ? 'FR' : 'EN'}
    </button>
  );
}

export function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useT();

  const handleLogout = () => { logout(); navigate('/'); setMobileOpen(false); };
  const isActive = (path: string) => location.pathname === path;
  const linkClass = (path: string) =>
    `transition-colors text-sm ${isActive(path) ? 'text-primary-600 font-semibold' : 'text-gray-600 hover:text-gray-900'}`;

  const initials = user?.nom
    ? user.nom.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          <Link to="/" className="shrink-0"><FyndWordmark /></Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/catalogue" className={linkClass('/catalogue')}>{t.nav.catalogue}</Link>

            {!user && (
              <>
                <Link to="/login" className={linkClass('/login')}>{t.nav.login}</Link>
                <Link to="/register" className="bg-primary-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-primary-700 transition-colors shadow-sm">
                  {t.nav.register}
                </Link>
              </>
            )}

            {user?.role === 'VENDEUR' && (
              <>
                <Link to="/vendeur/mes-produits" className={`flex items-center gap-1.5 ${linkClass('/vendeur/mes-produits')}`}>
                  <Package size={14} />{t.nav.myProducts}
                </Link>
                <Link to="/vendeur/soumettre" className="bg-primary-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-primary-700 transition-colors">
                  {t.nav.submit}
                </Link>
              </>
            )}

            {user?.role === 'ACHETEUR' && (
              <Link to="/acheteur/mes-encheres" className={`flex items-center gap-1.5 ${linkClass('/acheteur/mes-encheres')}`}>
                <Gavel size={14} />{t.nav.myBids}
              </Link>
            )}

            {user?.role === 'ADMIN' && (
              <>
                <Link to="/admin" className={`flex items-center gap-1.5 ${linkClass('/admin')}`}>
                  <ShieldCheck size={14} />{t.nav.dashboard}
                </Link>
                <Link to="/admin/valider" className={linkClass('/admin/valider')}>{t.nav.validate}</Link>
              </>
            )}

            {user && (
              <div className="flex items-center gap-3 ml-1 pl-5 border-l border-gray-200">
                <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-xs font-bold text-white">{initials}</div>
                <span className="text-gray-500 text-xs max-w-[90px] truncate">{user.nom}</span>
                <button onClick={handleLogout} title={t.nav.logout} className="text-gray-400 hover:text-primary-600 transition-colors">
                  <LogOut size={15} />
                </button>
              </div>
            )}

            <LangToggle />
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden flex items-center gap-2">
            <LangToggle />
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-1 shadow-lg">
          <MobileLink to="/catalogue" onClick={() => setMobileOpen(false)}>{t.nav.catalogue}</MobileLink>
          {!user && (
            <>
              <MobileLink to="/login" onClick={() => setMobileOpen(false)}>{t.nav.login}</MobileLink>
              <MobileLink to="/register" onClick={() => setMobileOpen(false)}>{t.nav.register}</MobileLink>
            </>
          )}
          {user?.role === 'VENDEUR' && (
            <>
              <MobileLink to="/vendeur/mes-produits" onClick={() => setMobileOpen(false)}>{t.nav.myProducts}</MobileLink>
              <MobileLink to="/vendeur/soumettre" onClick={() => setMobileOpen(false)}>{t.nav.submit}</MobileLink>
            </>
          )}
          {user?.role === 'ACHETEUR' && (
            <MobileLink to="/acheteur/mes-encheres" onClick={() => setMobileOpen(false)}>{t.nav.myBids}</MobileLink>
          )}
          {user?.role === 'ADMIN' && (
            <>
              <MobileLink to="/admin" onClick={() => setMobileOpen(false)}>{t.nav.dashboard}</MobileLink>
              <MobileLink to="/admin/valider" onClick={() => setMobileOpen(false)}>{t.nav.validate}</MobileLink>
            </>
          )}
          {user && (
            <div className="border-t border-gray-100 pt-3 mt-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center text-xs font-bold text-white">{initials}</div>
                <span className="text-gray-600 text-sm">{user.nom}</span>
              </div>
              <button onClick={handleLogout} className="flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700">
                <LogOut size={14} />{t.nav.logout}
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
    <Link to={to} onClick={onClick} className="block py-2.5 px-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm">
      {children}
    </Link>
  );
}
