import { createContext, useContext, useState, ReactNode } from 'react';

export type Lang = 'fr' | 'en';

const T = {
  fr: {
    /* ── Navbar ── */
    nav: {
      catalogue: 'Catalogue',
      login: 'Connexion',
      register: 'Inscription',
      myProducts: 'Mes produits',
      submit: '+ Soumettre',
      myBids: 'Mes enchères',
      dashboard: 'Dashboard',
      validate: 'Valider',
      logout: 'Déconnexion',
    },

    /* ── Hero ── */
    hero: {
      line1: 'Les trésors vintage',
      line2: "n'attendent que vous",
      desc: "Découvrez, enchérissez et remportez des objets vintage authentiques. Une expérience d'enchères unique, en temps réel.",
      cta1: 'Explorer les enchères',
      cta2: 'Rejoindre Fynd',
      scroll: 'Glisser pour explorer',
    },

    /* ── Photo scroller ── */
    photos: [
      { title: "L'esprit vintage",    desc: 'Des trésors du passé pour votre quotidien' },
      { title: "Objets d'exception",  desc: 'Chaque pièce raconte une histoire unique' },
      { title: 'Mémoires & souvenirs',desc: 'Des instants figés dans le temps' },
      { title: 'Style intemporel',    desc: "L'élégance ne se démode jamais" },
    ],

    /* ── How it works ── */
    hiw: {
      label: 'Simple & Transparent',
      title: 'Comment fonctionne',
      steps: [
        { title: 'Découvrez',    desc: "Parcourez notre catalogue d'objets vintage authentifiés. Chaque pièce est vérifiée par nos experts avant mise en vente." },
        { title: 'Enchérissez', desc: 'Placez vos offres en temps réel. Suivez les enchères en direct et soyez alerté à chaque nouvelle mise.' },
        { title: 'Remportez',   desc: "Gagnez l'enchère et recevez votre trésor vintage. Paiement sécurisé, livraison garantie." },
      ],
    },

    /* ── Parallax 1 ── */
    p1: {
      label: 'Chaque objet a une histoire',
      title: 'Des pièces uniques,',
      title2: 'sélectionnées avec passion',
      desc: "Fynd rassemble vendeurs passionnés et acheteurs avertis autour d'objets vintage authentiques. Chaque pièce est vérifiée avant mise en vente.",
      link: 'Voir le catalogue',
    },

    /* ── Categories ── */
    cats: {
      label: 'Collections',
      title: "Explorez l'univers vintage",
      sub: 'Faites défiler pour découvrir toutes les catégories →',
      items: ['Mobilier Ancien','Bijoux & Montres','Art & Tableaux','Mode Vintage','Céramique','Livres & Cartes','Horloges & Pendules'],
    },

    /* ── Why Fynd ── */
    why: {
      label: 'Nos engagements',
      title: 'Pourquoi choisir',
      features: [
        { title: 'Authentification garantie',  desc: "Chaque objet est examiné et certifié par nos experts avant d'apparaître dans le catalogue." },
        { title: 'Enchères en temps réel',     desc: 'Technologie WebSocket — suivez les mises et enchérissez en quelques secondes, sans délai.' },
        { title: "Curation d'exception",       desc: 'Une sélection rigoureuse pour ne vous proposer que des pièces vraiment rares et uniques.' },
        { title: 'Vente simplifiée',           desc: 'Devenez vendeur en quelques clics et touchez une communauté de passionnés du vintage.' },
      ],
    },

    /* ── Parallax 2 ── */
    p2: {
      title: 'Vendez vos objets',
      title2: 'vintage',
      desc: "Vous avez des pièces d'exception à proposer ? Rejoignez notre communauté de vendeurs et touchez des milliers de passionnés.",
      cta: 'Devenir vendeur',
    },

    /* ── CTA Final ── */
    cta: {
      title: 'Prêt à dénicher votre prochaine trouvaille ?',
      desc: 'Rejoignez des milliers de passionnés du vintage. Inscription gratuite, enchères en temps réel.',
      btn1: 'Voir les enchères →',
      btn2: 'Créer un compte',
    },

    /* ── Catalogue page ── */
    catalogue: {
      badge: 'Enchères vintage en ligne',
      title1: 'Dénicher la pièce',
      title2: 'idéale',
      desc: 'Enchérissez en temps réel sur des objets vintage uniques et authentiques, sélectionnés avec soin.',
      placeholder: 'Rechercher un objet vintage...',
      objects: 'objets',
      active: 'enchères actives',
      live: 'Mises à jour en temps réel',
      results: (n: number, q: string) => `${n} résultat${n !== 1 ? 's' : ''} pour « ${q} »`,
      noResults: 'Aucun objet trouvé',
      clearSearch: 'effacez la recherche',
      error: 'Erreur lors du chargement du catalogue.',
      prev: 'Précédent',
      next: 'Suivant',
      page: 'Page',
      of: '/',
    },

    /* ── Footer ── */
    footer: {
      desc: "Plateforme d'enchères vintage en ligne — dénicher et vendre des objets d'exception, en toute confiance.",
      nav: 'Navigation',
      home: 'Accueil',
      contact: 'Contact',
      rights: 'Tous droits réservés',
    },

    /* ── 404 ── */
    notFound: {
      title: 'Page introuvable',
      desc: "Cette page n'existe pas ou a été déplacée.",
      back: 'Retour au catalogue',
    },
  },

  /* ══════════════ ENGLISH ══════════════ */
  en: {
    nav: {
      catalogue: 'Catalogue',
      login: 'Login',
      register: 'Sign Up',
      myProducts: 'My Products',
      submit: '+ Submit',
      myBids: 'My Bids',
      dashboard: 'Dashboard',
      validate: 'Validate',
      logout: 'Logout',
    },

    hero: {
      line1: 'Vintage treasures',
      line2: 'are waiting for you',
      desc: 'Discover, bid and win authentic vintage objects. A unique real-time auction experience.',
      cta1: 'Explore auctions',
      cta2: 'Join Fynd',
      scroll: 'Swipe to explore',
    },

    photos: [
      { title: 'The vintage spirit',   desc: 'Past treasures for your everyday life' },
      { title: 'Exceptional objects',  desc: 'Every piece tells a unique story' },
      { title: 'Memories & souvenirs', desc: 'Moments frozen in time' },
      { title: 'Timeless style',       desc: 'Elegance never goes out of fashion' },
    ],

    hiw: {
      label: 'Simple & Transparent',
      title: 'How does',
      steps: [
        { title: 'Discover',  desc: 'Browse our catalogue of authenticated vintage objects. Each piece is verified by our experts before listing.' },
        { title: 'Bid',       desc: 'Place your offers in real time. Follow live auctions and be notified at every new bid.' },
        { title: 'Win',       desc: 'Win the auction and receive your vintage treasure. Secure payment, guaranteed delivery.' },
      ],
    },

    p1: {
      label: 'Every object has a story',
      title: 'Unique pieces,',
      title2: 'curated with passion',
      desc: 'Fynd brings together passionate sellers and savvy buyers around authentic vintage objects. Each piece is verified before listing.',
      link: 'View catalogue',
    },

    cats: {
      label: 'Collections',
      title: 'Explore the vintage universe',
      sub: 'Scroll to discover all categories →',
      items: ['Antique Furniture','Jewelry & Watches','Art & Paintings','Vintage Fashion','Ceramics','Books & Maps','Clocks & Mantel Clocks'],
    },

    why: {
      label: 'Our commitments',
      title: 'Why choose',
      features: [
        { title: 'Guaranteed authentication', desc: 'Every object is examined and certified by our experts before appearing in the catalogue.' },
        { title: 'Real-time auctions',        desc: 'WebSocket technology — follow bids and place yours in seconds, without any delay.' },
        { title: 'Exceptional curation',      desc: 'A rigorous selection to offer you only truly rare and unique pieces.' },
        { title: 'Simplified selling',        desc: 'Become a seller in a few clicks and reach a community of vintage enthusiasts.' },
      ],
    },

    p2: {
      title: 'Sell your',
      title2: 'vintage objects',
      desc: 'Have exceptional pieces to sell? Join our seller community and reach thousands of passionate buyers.',
      cta: 'Become a seller',
    },

    cta: {
      title: 'Ready to find your next discovery?',
      desc: 'Join thousands of vintage enthusiasts. Free registration, real-time auctions.',
      btn1: 'View auctions →',
      btn2: 'Create an account',
    },

    catalogue: {
      badge: 'Online vintage auctions',
      title1: 'Find the perfect',
      title2: 'piece',
      desc: 'Bid in real time on unique and authentic vintage objects, carefully selected.',
      placeholder: 'Search for a vintage object...',
      objects: 'objects',
      active: 'active auctions',
      live: 'Real-time updates',
      results: (n: number, q: string) => `${n} result${n !== 1 ? 's' : ''} for "${q}"`,
      noResults: 'No objects found',
      clearSearch: 'clear search',
      error: 'Error loading the catalogue.',
      prev: 'Previous',
      next: 'Next',
      page: 'Page',
      of: '/',
    },

    footer: {
      desc: 'Online vintage auction platform — discover and sell exceptional objects with confidence.',
      nav: 'Navigation',
      home: 'Home',
      contact: 'Contact',
      rights: 'All rights reserved',
    },

    notFound: {
      title: 'Page not found',
      desc: 'This page does not exist or has been moved.',
      back: 'Back to catalogue',
    },
  },
} as const;

/* ── Context ── */
type Translations = typeof T.fr;
interface LangCtx { lang: Lang; t: Translations; setLang: (l: Lang) => void; }
const LangContext = createContext<LangCtx>({ lang: 'fr', t: T.fr, setLang: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('fr');
  return (
    <LangContext.Provider value={{ lang, t: T[lang] as Translations, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useT() {
  return useContext(LangContext);
}
