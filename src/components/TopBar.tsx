import { FlaskConical, HeartPulse } from 'lucide-react';
import type { Experience, Lang } from '@/data';

interface TopBarProps {
  experience: Experience;
  setExperience: (e: Experience) => void;
  lang: Lang;
  setLang: (l: Lang) => void;
}

export function TopBar({ experience, setExperience, lang, setLang }: TopBarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-navy-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-navy-900 text-white shadow-sm">
            <HeartPulse className="h-5 w-5 text-teal-300" strokeWidth={2.2} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[15px] font-bold tracking-tight text-navy-900">
              GoGaijin <span className="text-teal-600">Clinic Connect</span>
            </span>
            <span className="mt-0.5 hidden text-[10px] font-medium uppercase tracking-wider text-navy-400 sm:block">
              The English front door for your clinic
            </span>
          </div>
          <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-700 ring-1 ring-amber-200">
            <FlaskConical className="h-3 w-3" /> Prototype Demo
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden rounded-full bg-navy-50 p-1 ring-1 ring-navy-100 sm:flex">
            <button
              onClick={() => setExperience('patient')}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                experience === 'patient'
                  ? 'bg-white text-navy-900 shadow-sm'
                  : 'text-navy-500 hover:text-navy-800'
              }`}
            >
              Patient
            </button>
            <button
              onClick={() => setExperience('clinic')}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                experience === 'clinic'
                  ? 'bg-white text-navy-900 shadow-sm'
                  : 'text-navy-500 hover:text-navy-800'
              }`}
            >
              Clinic
            </button>
          </div>

          <div className="flex items-center rounded-full bg-navy-50 p-1 ring-1 ring-navy-100">
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
              onClick={() => setLang('es')}
              className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-all ${
                lang === 'es' ? 'bg-white text-navy-900 shadow-sm' : 'text-navy-500 hover:text-navy-800'
              }`}
            >
              ES
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-navy-50 bg-navy-50/60 sm:hidden">
        <div className="mx-auto flex max-w-7xl gap-1 px-3 py-2">
          <button
            onClick={() => setExperience('patient')}
            className={`flex-1 rounded-full py-1.5 text-xs font-semibold transition-all ${
              experience === 'patient' ? 'bg-white text-navy-900 shadow-sm' : 'text-navy-500'
            }`}
          >
            Patient
          </button>
          <button
            onClick={() => setExperience('clinic')}
            className={`flex-1 rounded-full py-1.5 text-xs font-semibold transition-all ${
              experience === 'clinic' ? 'bg-white text-navy-900 shadow-sm' : 'text-navy-500'
            }`}
          >
            Clinic
          </button>
        </div>
      </div>
    </header>
  );
}
