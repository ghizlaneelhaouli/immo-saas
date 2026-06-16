import { Link } from 'react-router-dom';
import { Mail, Phone, Instagram, Twitter } from 'lucide-react';
import { useT } from '../../i18n';

export function Footer() {
  const { t } = useT();
  return (
    <footer className="bg-gray-950 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          <div>
            <div className="mb-4">
              <span className="font-script text-primary-500 text-4xl leading-none">Fynd</span>
              <div className="w-16 h-[1.5px] bg-primary-500 mt-0.5" />
              <p className="tracking-[0.3em] text-gray-600 uppercase text-[9px] font-light mt-1">Unique Find</p>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed mt-4">{t.footer.desc}</p>
            <div className="flex gap-3 mt-5">
              <a href="#" className="text-gray-600 hover:text-primary-500 transition-colors"><Instagram size={17} /></a>
              <a href="#" className="text-gray-600 hover:text-primary-500 transition-colors"><Twitter size={17} /></a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white text-xs tracking-wider uppercase mb-4">{t.footer.nav}</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/"          className="hover:text-white transition-colors">{t.footer.home}</Link></li>
              <li><Link to="/catalogue" className="hover:text-white transition-colors">{t.nav.catalogue}</Link></li>
              <li><Link to="/login"     className="hover:text-white transition-colors">{t.nav.login}</Link></li>
              <li><Link to="/register"  className="hover:text-white transition-colors">{t.nav.register}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white text-xs tracking-wider uppercase mb-4">{t.footer.contact}</h3>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2"><Mail size={14} className="text-primary-500 shrink-0" />support@fynd.ma</li>
              <li className="flex items-center gap-2"><Phone size={14} className="text-primary-500 shrink-0" />+212 5XX-XXXXXX</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-6 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} Fynd — Unique Find. {t.footer.rights}.
        </div>
      </div>
    </footer>
  );
}
