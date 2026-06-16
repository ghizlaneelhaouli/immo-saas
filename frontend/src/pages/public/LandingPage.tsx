import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Gavel, Shield, Star, Clock, ArrowRight, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import { useT } from '../../i18n';

/* ── Fynd logo ── */
export function FyndLogo({ className = '', textSize = 'text-5xl' }: { className?: string; textSize?: string }) {
  return (
    <div className={`flex flex-col items-center leading-none ${className}`}>
      <span className={`font-script text-primary-600 ${textSize}`}>Fynd</span>
      <div className="w-full h-[2px] bg-primary-600 rounded-full mt-0.5" />
      <span className="tracking-[0.38em] text-gray-500 uppercase font-light text-[0.32em] mt-1">Unique Find</span>
    </div>
  );
}

/* ── useInView ── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ── Animated wrapper ── */
function Anim({ children, className = '', delay = 0, from = 'bottom' }: {
  children: React.ReactNode; className?: string; delay?: number; from?: 'bottom' | 'left' | 'right';
}) {
  const { ref, inView } = useInView();
  const hidden = from === 'left' ? 'opacity-0 -translate-x-8' : from === 'right' ? 'opacity-0 translate-x-8' : 'opacity-0 translate-y-8';
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${className} ${inView ? 'opacity-100 translate-x-0 translate-y-0' : hidden}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

const PHOTO_SRCS = [
  '/images/tools-feature-vintage-filter-showcase_02-AFTER4X.webp',
  '/images/photo-surfeuse-vintage-683x1024.jpg',
  '/images/pexels-fotios-photos-36229142.jpg',
  '/images/i-am-back-retroatelier.jpg',
];

const PHOTO_ACCENTS = ['from-amber-900/80', 'from-orange-900/80', 'from-red-900/80', 'from-teal-900/80'];

const STEP_ICONS = [Sparkles, Gavel, Shield];

const CAT_BGS = [
  'from-amber-950 to-amber-800',
  'from-zinc-900 to-zinc-700',
  'from-red-950 to-red-800',
  'from-stone-900 to-stone-700',
  'from-teal-950 to-teal-800',
  'from-slate-900 to-slate-700',
  'from-yellow-950 to-yellow-800',
];
const CAT_EMOJIS = ['🪑','💍','🎨','👗','🏺','📚','🕰️'];

const WHY_ICONS = [Shield, Clock, Star, Gavel];

/* ════════════════════════════════════════════════ */
export function LandingPage() {
  const { t } = useT();
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'right' ? scrollRef.current.clientWidth * 0.85 : -scrollRef.current.clientWidth * 0.85, behavior: 'smooth' });
  };

  return (
    <div className="overflow-x-hidden">

      {/* ══ HERO ══ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-gray-950"
          style={{ backgroundImage: "url('/images/tools-feature-vintage-filter-showcase_02-AFTER4X.webp')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/80" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] rounded-full border border-white/5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[460px] rounded-full border border-white/5 pointer-events-none" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in">
          <div className="mb-10">
            <span className="font-script text-primary-400 text-[7rem] md:text-[10rem] leading-none drop-shadow-2xl">Fynd</span>
            <div className="w-52 h-[2px] bg-gradient-to-r from-transparent via-primary-500 to-transparent mx-auto mt-1" />
            <p className="tracking-[0.55em] text-white/50 uppercase text-xs font-light mt-2">Unique Find</p>
          </div>
          <h1 className="text-3xl md:text-5xl font-light text-white mb-4 leading-tight">
            {t.hero.line1}<br />
            <span className="text-primary-300 font-semibold">{t.hero.line2}</span>
          </h1>
          <p className="text-white/65 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">{t.hero.desc}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/catalogue" className="group bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full font-semibold text-sm tracking-wide transition-all hover:scale-105 shadow-xl shadow-primary-900/50">
              {t.hero.cta1}<ArrowRight size={16} className="inline ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/register" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/25 text-white px-8 py-4 rounded-full font-medium text-sm tracking-wide transition-all hover:scale-105">
              {t.hero.cta2}
            </Link>
          </div>
        </div>
        <a href="#photos" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/80 transition-colors animate-bounce" aria-label="Scroll">
          <ChevronDown size={30} />
        </a>
      </section>

      {/* ══ PHOTO SCROLLER ══ */}
      <section id="photos" className="relative bg-gray-950">
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 text-white/40">
          <div className="w-16 h-px bg-white/20" />
          <span className="text-xs tracking-[0.3em] uppercase font-light">{t.hero.scroll}</span>
          <div className="w-16 h-px bg-white/20" />
        </div>
        <button onClick={() => scrollBy('left')} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-black/50 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all border border-white/10" aria-label="Prev">
          <ChevronLeft size={20} />
        </button>
        <button onClick={() => scrollBy('right')} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-black/50 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all border border-white/10" aria-label="Next">
          <ChevronRight size={20} />
        </button>
        <div ref={scrollRef} className="flex overflow-x-auto scroll-snap-x cat-scroll" style={{ height: '88vh' }}>
          {PHOTO_SRCS.map((src, i) => (
            <div key={i} className="scroll-snap-item shrink-0 relative overflow-hidden" style={{ width: 'clamp(280px, 75vw, 780px)' }}>
              <img src={src} alt={t.photos[i].title} className="w-full h-full object-cover" />
              <div className={`absolute inset-0 bg-gradient-to-t ${PHOTO_ACCENTS[i]} via-transparent to-transparent`} />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <p className="text-xs tracking-[0.3em] uppercase text-white/50 mb-1">0{i + 1} / 0{PHOTO_SRCS.length}</p>
                <h3 className="font-script text-4xl text-white mb-1">{t.photos[i].title}</h3>
                <p className="text-white/60 text-sm">{t.photos[i].desc}</p>
              </div>
              <div className="absolute top-0 bottom-0 right-0 w-px bg-white/10" />
            </div>
          ))}
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section id="how-it-works" className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <Anim className="text-center mb-20">
            <p className="text-primary-600 text-xs font-bold tracking-[0.25em] uppercase mb-3">{t.hiw.label}</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              {t.hiw.title} <span className="font-script text-primary-600">Fynd</span>&nbsp;?
            </h2>
          </Anim>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            <div className="hidden md:block absolute top-10 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px bg-gradient-to-r from-primary-100 via-primary-400 to-primary-100" />
            {t.hiw.steps.map((step, i) => {
              const Icon = STEP_ICONS[i];
              return (
                <Anim key={step.title} delay={i * 140} className="text-center">
                  <div className="relative inline-flex mb-6">
                    <div className="w-20 h-20 rounded-full bg-primary-50 border-2 border-primary-100 flex items-center justify-center">
                      <Icon size={30} className="text-primary-600" />
                    </div>
                    <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-sm">{i + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </Anim>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ PARALLAX 1 ══ */}
      <section className="relative py-40 text-white overflow-hidden">
        <div className="absolute inset-0 parallax bg-cover bg-center bg-amber-950"
          style={{ backgroundImage: "url('/images/pexels-fotios-photos-36229142.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30" />
        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <Anim from="left" className="max-w-lg">
            <p className="text-primary-400 text-xs font-bold tracking-[0.25em] uppercase mb-4">{t.p1.label}</p>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              {t.p1.title}<br /><span className="font-script text-primary-400">{t.p1.title2}</span>
            </h2>
            <p className="text-gray-300 text-base leading-relaxed mb-8">{t.p1.desc}</p>
            <Link to="/catalogue" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium tracking-wider group">
              {t.p1.link}<ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Anim>
        </div>
      </section>

      {/* ══ CATEGORIES ══ */}
      <section className="py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <Anim className="mb-12">
            <p className="text-primary-600 text-xs font-bold tracking-[0.25em] uppercase mb-3">{t.cats.label}</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">{t.cats.title}</h2>
            <p className="text-gray-400 mt-3 text-sm">{t.cats.sub}</p>
          </Anim>
          <div className="flex gap-5 overflow-x-auto pb-5 scroll-snap-x cat-scroll -mx-4 px-4">
            {t.cats.items.map((name, i) => (
              <Link key={name} to="/catalogue"
                className={`scroll-snap-item shrink-0 w-52 h-72 bg-gradient-to-b ${CAT_BGS[i]} rounded-2xl relative group hover:scale-[1.03] transition-transform duration-300 shadow-lg overflow-hidden`}>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-white text-center">
                  <span className="text-5xl mb-3 drop-shadow">{CAT_EMOJIS[i]}</span>
                  <h3 className="font-bold text-sm leading-tight">{name}</h3>
                </div>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5"><ChevronRight size={14} className="text-white" /></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY FYND ══ */}
      <section className="py-28 bg-gray-950 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <Anim className="text-center mb-16">
            <p className="text-primary-400 text-xs font-bold tracking-[0.25em] uppercase mb-3">{t.why.label}</p>
            <h2 className="text-4xl md:text-5xl font-bold">
              {t.why.title} <span className="font-script text-primary-500">Fynd</span>&nbsp;?
            </h2>
          </Anim>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {t.why.features.map((feat, i) => {
              const Icon = WHY_ICONS[i];
              return (
                <Anim key={feat.title} delay={i * 100} className="flex gap-5 p-7 bg-white/[0.04] rounded-2xl border border-white/8 hover:border-primary-500/40 transition-colors group">
                  <div className="shrink-0 w-12 h-12 bg-primary-600/15 rounded-xl flex items-center justify-center group-hover:bg-primary-600/25 transition-colors">
                    <Icon size={22} className="text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm mb-1.5">{feat.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{feat.desc}</p>
                  </div>
                </Anim>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ PARALLAX 2 ══ */}
      <section className="relative py-36 text-white overflow-hidden">
        <div className="absolute inset-0 parallax bg-cover bg-center bg-red-950"
          style={{ backgroundImage: "url('/images/i-am-back-retroatelier.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/55 to-black/30" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 flex justify-end">
          <Anim from="right" className="max-w-lg text-right">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              {t.p2.title}<br /><span className="font-script text-primary-400">{t.p2.title2}</span>
            </h2>
            <p className="text-gray-300 text-base mb-10 leading-relaxed">{t.p2.desc}</p>
            <Link to="/register" className="inline-flex items-center gap-2 bg-white text-primary-700 font-bold px-8 py-4 rounded-full hover:bg-primary-50 transition-colors shadow-xl">
              {t.p2.cta} <ChevronRight size={18} />
            </Link>
          </Anim>
        </div>
      </section>

      {/* ══ CTA FINAL ══ */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <Anim>
            <FyndLogo textSize="text-7xl" className="mb-6 mx-auto w-fit" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-8 mb-4">{t.cta.title}</h2>
            <p className="text-gray-500 mb-10 text-sm leading-relaxed max-w-sm mx-auto">{t.cta.desc}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/catalogue" className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full font-semibold text-sm tracking-wide transition-all hover:scale-105 shadow-lg shadow-primary-200">
                {t.cta.btn1}
              </Link>
              <Link to="/register" className="border-2 border-gray-200 hover:border-primary-300 text-gray-700 hover:text-primary-600 px-8 py-4 rounded-full font-medium text-sm tracking-wide transition-all">
                {t.cta.btn2}
              </Link>
            </div>
          </Anim>
        </div>
      </section>

    </div>
  );
}
