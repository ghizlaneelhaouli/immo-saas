import { Link } from 'react-router-dom';
import { Building2, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-white text-lg mb-3">
              <Building2 size={20} className="text-primary-400" />
              IMMO<span className="font-light text-primary-400">SAAS</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Plateforme d'enchères immobilières en ligne — achetez et vendez des biens immobiliers en toute sécurité.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white text-sm mb-3">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Catalogue</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Connexion</Link></li>
              <li><Link to="/register" className="hover:text-white transition-colors">Inscription</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white text-sm mb-3">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-primary-400 shrink-0" />
                support@immosaas.ma
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-primary-400 shrink-0" />
                +212 5XX-XXXXXX
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} IMMO SAAS — Tous droits réservés
        </div>
      </div>
    </footer>
  );
}
