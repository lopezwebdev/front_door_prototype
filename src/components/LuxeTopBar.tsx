import { FlaskConical, Home } from 'lucide-react';
import type { LuxeLang } from '@/luxe-data';

interface LuxeTopBarProps {
  experience: 'client' | 'partner';
  setExperience: (e: 'client' | 'partner') => void;
  lang: LuxeLang;
  setLang: (l: LuxeLang) => void;
  onExit: () => void;
}

export function LuxeTopBar({ experience, setExperience, lang, setLang, onExit }: LuxeTopBarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-cream-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <button onClick={onExit} className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-navy-900 text-white shadow-sm">
            <Home className="h-5 w-5 text-gold-400" strokeWidth={2.2} />
          </div>
          <div className="flex flex-col leading-none text-left">
            <span className="text-[15px] font-bold tracking-tight text-navy-900">
              GoGaijin <span className="text-terracotta-600">× TokyoLuxe</span>
            </span>
            <span className="mt-0.5 hidden text-[10px] font-medium uppercase tracking-wider text-navy-400 sm:block">
              Start Your Japan Housing Plan
            </span>
          </div>
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden rounded-full bg-gold-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold-800 ring-1 ring-gold-200 sm:inline-flex sm:items-center sm:gap-1">
            <FlaskConical className="h-3 w-3" /> Prototype Demo
          </span>

          <div className="hidden rounded-full bg-cream-100 p-1 ring-1 ring-cream-200 sm:flex">
            <button
              onClick={() => setExperience('client')}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                experience === 'client'
                  ? 'bg-white text-navy-900 shadow-sm'
                  : 'text-navy-500 hover:text-navy-800'
              }`}
            >
              Client
            </button>
            <button
              onClick={() => setExperience('partner')}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                experience === 'partner'
                  ? 'bg-white text-navy-900 shadow-sm'
                  : 'text-navy-500 hover:text-navy-800'
              }`}
            >
              Partner
            </button>
          </div>

          <div className="flex items-center rounded-full bg-cream-100 p-1 ring-1 ring-cream-200">
            <button
              onClick={() => setLang('en')}
              className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-all ${
                lang === 'en' ? 'bg-white text-navy-900 shadow-sm' : 'text-navy-500 hover:text-navy-800'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('ja')}
              className={`font-jp rounded-full px-2.5 py-1 text-xs font-semibold transition-all ${
                lang === 'ja' ? 'bg-white text-navy-900 shadow-sm' : 'text-navy-500 hover:text-navy-800'
              }`}
            >
              日本語
            </button>
            <button
              onClick={() => setLang('vi')}
              className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-all ${
                lang === 'vi' ? 'bg-white text-navy-900 shadow-sm' : 'text-navy-500 hover:text-navy-800'
              }`}
            >
              Tiếng Việt
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-cream-100 bg-cream-50/60 sm:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-gold-100 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-gold-800">
            <FlaskConical className="h-2.5 w-2.5" /> Demo
          </span>
          <div className="flex flex-1 gap-1">
            <button
              onClick={() => setExperience('client')}
              className={`flex-1 rounded-full py-1.5 text-xs font-semibold transition-all ${
                experience === 'client' ? 'bg-white text-navy-900 shadow-sm' : 'text-navy-500'
              }`}
            >
              Client
            </button>
            <button
              onClick={() => setExperience('partner')}
              className={`flex-1 rounded-full py-1.5 text-xs font-semibold transition-all ${
                experience === 'partner' ? 'bg-white text-navy-900 shadow-sm' : 'text-navy-500'
              }`}
            >
              Partner
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
