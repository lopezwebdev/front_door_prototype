import { HeartPulse, Home, ArrowRight, Globe, ShieldCheck, Sparkles } from 'lucide-react';

type Product = 'clinic' | 'luxe';

interface LauncherProps {
  onSelect: (p: Product) => void;
}

export function Launcher({ onSelect }: LauncherProps) {
  return (
    <div className="min-h-screen bg-sand-50">
      <header className="border-b border-navy-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-navy-900 text-white shadow-sm">
              <Globe className="h-5 w-5 text-teal-300" strokeWidth={2.2} />
            </div>
            <span className="text-[15px] font-bold tracking-tight text-navy-900">GoGaijin</span>
            <span className="badge bg-amber-100 text-amber-700 ring-1 ring-amber-200">Prototype Showcase</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <span className="badge bg-teal-50 text-teal-700 ring-1 ring-teal-100">
            <Sparkles className="h-3.5 w-3.5" /> Interactive demos
          </span>
          <h1 className="font-serif mt-4 text-4xl font-semibold text-navy-900 sm:text-5xl">
            GoGaijin partner prototypes
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-navy-500">
            Two front-end demos showing how GoGaijin becomes the multilingual front door for Japanese clinics and relocation services.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <ProductCard
            icon={HeartPulse}
            accent="teal"
            name="GoGaijin Clinic Connect"
            tagline="The English front door for your clinic"
            desc="A lightweight foreign-patient intake that works with a clinic's existing email or LINE workflow. Patients request appointments in English; clinics confirm using their current process."
            features={['Patient clinic finder', 'Appointment request flow', 'Clinic request dashboard', 'Monthly value & setup']}
            onSelect={() => onSelect('clinic')}
          />
          <ProductCard
            icon={Home}
            accent="terracotta"
            name="GoGaijin × TokyoLuxe"
            tagline="Start Your Japan Housing Plan"
            desc="A guided multilingual pre-consultation intake that gives TokyoLuxe a qualified client brief before the first meeting. Replaces vague contact forms with structured housing plans."
            features={['6-screen client wizard', 'Qualified housing briefs', 'Partner lead dashboard', 'Value reporting & setup']}
            onSelect={() => onSelect('luxe')}
          />
        </div>

        <div className="mt-10 flex items-center justify-center gap-5 text-xs text-navy-400">
          <span className="inline-flex items-center gap-1.5"><Globe className="h-3.5 w-3.5" /> Front-end only</span>
          <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> No real user data</span>
          <span className="inline-flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5" /> Realistic fake data</span>
        </div>
      </main>
    </div>
  );
}

function ProductCard({
  icon: Icon, accent, name, tagline, desc, features, onSelect,
}: {
  icon: typeof HeartPulse;
  accent: 'teal' | 'terracotta';
  name: string;
  tagline: string;
  desc: string;
  features: string[];
  onSelect: () => void;
}) {
  const tones = {
    teal: {
      bg: 'bg-teal-50', text: 'text-teal-700', ring: 'ring-teal-100',
      btn: 'bg-teal-500 hover:bg-teal-600 focus:ring-teal-500/20',
      iconBg: 'bg-navy-900', icon: 'text-teal-300',
    },
    terracotta: {
      bg: 'bg-gold-100', text: 'text-gold-800', ring: 'ring-gold-200',
      btn: 'bg-terracotta-500 hover:bg-terracotta-600 focus:ring-terracotta-500/20',
      iconBg: 'bg-navy-900', icon: 'text-gold-400',
    },
  }[accent];

  return (
    <div className="card group flex flex-col p-7 transition-all hover:shadow-soft">
      <div className="flex items-center gap-3">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${tones.iconBg} shadow-sm`}>
          <Icon className={`h-6 w-6 ${tones.icon}`} strokeWidth={2.2} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-navy-900">{name}</h2>
          <p className="text-xs font-medium text-navy-400">{tagline}</p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-navy-600">{desc}</p>

      <ul className="mt-5 grid gap-2">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm text-navy-700">
            <span className={`flex h-5 w-5 items-center justify-center rounded-full ${tones.bg} ${tones.text}`}>
              <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.8 3.8 6.8-6.8a1 1 0 011.4 0z" clipRule="evenodd"/></svg>
            </span>
            {f}
          </li>
        ))}
      </ul>

      <button
        onClick={onSelect}
        className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full ${tones.btn} px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-soft focus:outline-none focus:ring-4 active:scale-[0.98]`}
      >
        Launch prototype <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}
