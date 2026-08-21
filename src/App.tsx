import { useState } from 'react';
import { Globe, HeartPulse, Home, Mail, MessageCircle, ShieldCheck, FlaskConical } from 'lucide-react';
import { PatientExperience } from '@/components/PatientExperience';
import { ClinicExperience } from '@/components/ClinicExperience';
import { Launcher } from '@/components/Launcher';
import { LuxeTopBar } from '@/components/LuxeTopBar';
import { LuxeClientExperience } from '@/components/LuxeClient';
import { LuxePartnerExperience } from '@/components/LuxePartner';
import type { Experience, Lang } from '@/data';
import type { LuxeLang } from '@/luxe-data';

type Product = 'launcher' | 'clinic' | 'luxe';

function App() {
  const [product, setProduct] = useState<Product>('launcher');

  if (product === 'launcher') {
    return <Launcher onSelect={(p) => setProduct(p)} />;
  }

  if (product === 'luxe') {
    return <LuxeApp onExit={() => setProduct('launcher')} />;
  }

  return <ClinicApp onExit={() => setProduct('launcher')} />;
}

function ClinicApp({ onExit }: { onExit: () => void }) {
  const [experience, setExperience] = useState<Experience>('patient');
  const [lang, setLang] = useState<Lang>('en');

  return (
    <div className="min-h-screen bg-sand-50">
      <ClinicTopBar experience={experience} setExperience={setExperience} lang={lang} setLang={setLang} onExit={onExit} />
      <main className="py-6 sm:py-10">
        {experience === 'patient' && <PatientExperience />}
        {experience === 'clinic' && <ClinicExperience />}
      </main>
      <ClinicFooter />
    </div>
  );
}

function LuxeApp({ onExit }: { onExit: () => void }) {
  const [experience, setExperience] = useState<'client' | 'partner'>('client');
  const [lang, setLang] = useState<LuxeLang>('en');

  return (
    <div className="min-h-screen bg-cream-50">
      <LuxeTopBar experience={experience} setExperience={setExperience} lang={lang} setLang={setLang} onExit={onExit} />
      <main className="py-6 sm:py-10">
        {experience === 'client' && <LuxeClientExperience />}
        {experience === 'partner' && <LuxePartnerExperience />}
      </main>
      <LuxeFooter />
    </div>
  );
}

function ClinicTopBar({
  experience, setExperience, lang, setLang, onExit,
}: {
  experience: Experience;
  setExperience: (e: Experience) => void;
  lang: Lang;
  setLang: (l: Lang) => void;
  onExit: () => void;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-navy-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button onClick={onExit} className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-navy-900 text-white shadow-sm">
              <HeartPulse className="h-5 w-5 text-teal-300" strokeWidth={2.2} />
            </div>
            <div className="flex flex-col leading-none text-left">
              <span className="text-[15px] font-bold tracking-tight text-navy-900">
                GoGaijin <span className="text-teal-600">Clinic Connect</span>
              </span>
              <span className="mt-0.5 hidden text-[10px] font-medium uppercase tracking-wider text-navy-400 sm:block">
                The English front door for your clinic
              </span>
            </div>
          </button>
          <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-700 ring-1 ring-amber-200">
            <FlaskConical className="h-3 w-3" /> Prototype Demo
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden rounded-full bg-navy-50 p-1 ring-1 ring-navy-100 sm:flex">
            <button onClick={() => setExperience('patient')} className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${experience === 'patient' ? 'bg-white text-navy-900 shadow-sm' : 'text-navy-500 hover:text-navy-800'}`}>Patient</button>
            <button onClick={() => setExperience('clinic')} className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${experience === 'clinic' ? 'bg-white text-navy-900 shadow-sm' : 'text-navy-500 hover:text-navy-800'}`}>Clinic</button>
          </div>
          <div className="flex items-center rounded-full bg-navy-50 p-1 ring-1 ring-navy-100">
            <button onClick={() => setLang('en')} className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-all ${lang === 'en' ? 'bg-white text-navy-900 shadow-sm' : 'text-navy-500 hover:text-navy-800'}`}>EN</button>
            <button onClick={() => setLang('ja')} className={`font-jp rounded-full px-2.5 py-1 text-xs font-semibold transition-all ${lang === 'ja' ? 'bg-white text-navy-900 shadow-sm' : 'text-navy-500 hover:text-navy-800'}`}>日本語</button>
            <button onClick={() => setLang('es')} className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-all ${lang === 'es' ? 'bg-white text-navy-900 shadow-sm' : 'text-navy-500 hover:text-navy-800'}`}>ES</button>
          </div>
        </div>
      </div>
      <div className="border-t border-navy-50 bg-navy-50/60 sm:hidden">
        <div className="mx-auto flex max-w-7xl gap-1 px-3 py-2">
          <button onClick={() => setExperience('patient')} className={`flex-1 rounded-full py-1.5 text-xs font-semibold transition-all ${experience === 'patient' ? 'bg-white text-navy-900 shadow-sm' : 'text-navy-500'}`}>Patient</button>
          <button onClick={() => setExperience('clinic')} className={`flex-1 rounded-full py-1.5 text-xs font-semibold transition-all ${experience === 'clinic' ? 'bg-white text-navy-900 shadow-sm' : 'text-navy-500'}`}>Clinic</button>
        </div>
      </div>
    </header>
  );
}

function ClinicFooter() {
  return (
    <footer className="border-t border-navy-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-900">
              <HeartPulse className="h-4 w-4 text-teal-300" />
            </div>
            <div>
              <p className="text-sm font-bold text-navy-900">GoGaijin Clinic Connect</p>
              <p className="text-xs text-navy-400">The English front door for Japanese clinics</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-navy-400">
            <span className="inline-flex items-center gap-1.5"><Globe className="h-3.5 w-3.5" /> Front-end prototype</span>
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> No real patient data</span>
            <span className="inline-flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> Works with email + LINE</span>
            <span className="inline-flex items-center gap-1.5"><MessageCircle className="h-3.5 w-3.5" /> No new software for staff</span>
          </div>
        </div>
        <p className="mt-6 text-xs text-navy-300">
          Prototype demo with realistic fake data. This is not a medical device and does not provide medical advice, diagnosis, or instant booking.
        </p>
      </div>
    </footer>
  );
}

function LuxeFooter() {
  return (
    <footer className="border-t border-cream-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-900">
              <Home className="h-4 w-4 text-gold-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-navy-900">GoGaijin × TokyoLuxe</p>
              <p className="text-xs text-navy-400">Start Your Japan Housing Plan</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-navy-400">
            <span className="inline-flex items-center gap-1.5"><Globe className="h-3.5 w-3.5" /> EN / 日本語 / Tiếng Việt</span>
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> No real client data</span>
            <span className="inline-flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> Works with email + LINE</span>
          </div>
        </div>
        <p className="mt-6 text-xs text-navy-300">
          Prototype demo with realistic fake data. This is not a property application, a guarantee of housing, or a real-estate contract.
        </p>
      </div>
    </footer>
  );
}

export default App;
