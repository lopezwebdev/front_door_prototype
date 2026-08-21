import { useState } from 'react';
import {
  Home, Building2, TrendingUp, Plane, ArrowRight, ArrowLeft, Check,
  Globe, ShieldCheck, Sparkles, Calendar, Clock, Users, PawPrint,
  Wallet, MapPin, Sofa, Ruler, FileText, Phone, Smartphone, HeartPulse,
  Pill, PartyPopper, Info, Star,
} from 'lucide-react';
import {
  GOAL_OPTIONS, TRUST_ROW, TIMELINE_OPTIONS, HOUSEHOLD_OPTIONS,
  PET_OPTIONS, SUPPORT_LANGUAGES, BUDGET_OPTIONS, AREA_EXAMPLES,
  FURNISH_OPTIONS, SIZE_OPTIONS, LOCATION_OPTIONS, VISA_OPTIONS,
  INCOME_OPTIONS, HELP_OPTIONS, CONSULTATION_SLOTS, NEXT_STEPS,
  type HousingGoal,
} from '@/luxe-data';

interface IntakeState {
  goal: HousingGoal | '';
  timeline: string;
  household: string;
  pets: string;
  supportLang: string;
  budget: string;
  areas: string;
  furnish: string;
  size: string;
  location: string;
  visa: string;
  income: string;
  helpNeeded: string[];
  slot: string;
}

const initialState: IntakeState = {
  goal: '', timeline: '', household: '', pets: '', supportLang: 'English',
  budget: '', areas: '', furnish: '', size: '', location: '', visa: '',
  income: '', helpNeeded: [], slot: '',
};

const goalIcons: Record<HousingGoal, typeof Home> = {
  rent: Home,
  buy: Building2,
  investment: TrendingUp,
  relocation: Plane,
};

const STEPS = ['Goal', 'Timeline', 'Home', 'Readiness', 'Review', 'Done'];

export function LuxeClientExperience() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<IntakeState>(initialState);

  const set = <K extends keyof IntakeState>(k: K, v: IntakeState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const canAdvance = () => {
    if (step === 0) return form.goal !== '';
    if (step === 1) return form.timeline && form.household && form.pets;
    if (step === 2) return form.budget && form.areas && form.furnish && form.size;
    if (step === 3) return form.location && form.visa && form.income;
    if (step === 4) return form.slot !== '';
    return true;
  };

  const next = () => setStep((s) => Math.min(s + 1, 5));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="mx-auto max-w-2xl px-4 pb-24 sm:px-6">
      <ProgressIndicator step={step} steps={STEPS} />

      <div className="mt-6">
        {step === 0 && <ScreenGoal form={form} set={set} />}
        {step === 1 && <ScreenTimeline form={form} set={set} />}
        {step === 2 && <ScreenHome form={form} set={set} />}
        {step === 3 && <ScreenReadiness form={form} set={set} />}
        {step === 4 && <ScreenReview form={form} set={set} />}
        {step === 5 && <ScreenConfirm form={form} />}
      </div>

      {step < 5 && (
        <div className="mt-8 flex items-center justify-between gap-3">
          {step > 0 ? (
            <button onClick={back} className="btn-luxe-ghost">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
          ) : (
            <span />
          )}
          <button
            onClick={next}
            disabled={!canAdvance()}
            className={step === 4 ? 'btn-luxe' : 'btn-luxe'}
          >
            {step === 0 && <>Start my housing plan <ArrowRight className="h-4 w-4" /></>}
            {step === 4 && <>Book free consultation <Calendar className="h-4 w-4" /></>}
            {step > 0 && step < 4 && <>Continue <ArrowRight className="h-4 w-4" /></>}
          </button>
        </div>
      )}
    </div>
  );
}

function ProgressIndicator({ step, steps }: { step: number; steps: string[] }) {
  return (
    <div className="flex items-center justify-between">
      {steps.map((label, i) => (
        <div key={label} className="flex flex-1 flex-col items-center">
          <div className="flex w-full items-center">
            <div className={`h-1 flex-1 ${i === 0 ? 'bg-transparent' : i <= step ? 'bg-terracotta-400' : 'bg-cream-200'}`} />
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all ${
              i < step ? 'bg-terracotta-500 text-white' :
              i === step ? 'bg-navy-900 text-white ring-4 ring-navy-900/10' :
              'bg-cream-100 text-navy-400 ring-1 ring-cream-200'
            }`}>
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <div className={`h-1 flex-1 ${i === steps.length - 1 ? 'bg-transparent' : i < step ? 'bg-terracotta-400' : 'bg-cream-200'}`} />
          </div>
          <span className={`mt-1.5 hidden text-[10px] font-medium sm:block ${i <= step ? 'text-navy-700' : 'text-navy-300'}`}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

function ScreenGoal({ form, set }: { form: IntakeState; set: <K extends keyof IntakeState>(k: K, v: IntakeState[K]) => void }) {
  return (
    <div className="animate-fadeIn">
      <div className="bg-luxe-hero rounded-3xl bg-white px-6 py-8 text-center shadow-card ring-1 ring-cream-200 sm:px-10 sm:py-10">
        <span className="badge bg-gold-100 text-gold-800 ring-1 ring-gold-200">
          <Sparkles className="h-3.5 w-3.5" /> GoGaijin × TokyoLuxe
        </span>
        <h1 className="font-serif mt-4 text-3xl font-semibold text-navy-900 sm:text-4xl">
          Let&rsquo;s find your home in Japan
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-navy-500">
          Tell us a little about your plans. GoGaijin and TokyoLuxe will help you take the next step with confidence.
        </p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {GOAL_OPTIONS.map((opt) => {
          const Icon = goalIcons[opt.id];
          const active = form.goal === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => set('goal', opt.id)}
              className={`select-card ${active ? 'select-card-active' : ''}`}
            >
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                active ? 'bg-terracotta-500 text-white' : 'bg-cream-100 text-navy-600'
              }`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-navy-900">{opt.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-navy-500">{opt.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 rounded-2xl bg-cream-50 px-5 py-4 ring-1 ring-cream-200">
        {TRUST_ROW.map((t) => (
          <span key={t} className="inline-flex items-center gap-1.5 text-xs font-medium text-navy-600">
            <Check className="h-3.5 w-3.5 text-terracotta-500" /> {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function ScreenTimeline({ form, set }: { form: IntakeState; set: <K extends keyof IntakeState>(k: K, v: IntakeState[K]) => void }) {
  return (
    <div className="animate-fadeIn space-y-6">
      <Header
        title="Your timeline and household"
        sub="These answers help TokyoLuxe prepare for your first conversation."
      />
      <ChoiceGroup
        icon={Clock} label="When do you hope to move?"
        options={TIMELINE_OPTIONS} value={form.timeline}
        onChange={(v) => set('timeline', v)}
      />
      <ChoiceGroup
        icon={Users} label="Who will be moving?"
        options={HOUSEHOLD_OPTIONS} value={form.household}
        onChange={(v) => set('household', v)}
      />
      <ChoiceGroup
        icon={PawPrint} label="Do you have pets?"
        options={PET_OPTIONS} value={form.pets}
        onChange={(v) => set('pets', v)}
      />
      <ChoiceGroup
        icon={Globe} label="Preferred language for support"
        options={SUPPORT_LANGUAGES} value={form.supportLang}
        onChange={(v) => set('supportLang', v)}
      />
    </div>
  );
}

function ScreenHome({ form, set }: { form: IntakeState; set: <K extends keyof IntakeState>(k: K, v: IntakeState[K]) => void }) {
  return (
    <div className="animate-fadeIn space-y-6">
      <Header title="Your ideal home" sub="Share what you're looking for — even if you're still exploring." />
      <ChoiceGroup
        icon={Wallet} label="Monthly budget range"
        options={BUDGET_OPTIONS} value={form.budget}
        onChange={(v) => set('budget', v)}
      />

      <label className="block">
        <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-navy-800">
          <MapPin className="h-4 w-4 text-terracotta-500" /> Preferred areas or stations
        </span>
        <input
          className="input-luxe"
          placeholder="e.g. Shinjuku, Nakano, Kichijoji, Shinagawa"
          value={form.areas}
          onChange={(e) => set('areas', e.target.value)}
        />
        <div className="mt-2 flex flex-wrap gap-1.5">
          {AREA_EXAMPLES.map((a) => (
            <button
              key={a}
              onClick={() => set('areas', form.areas ? `${form.areas}, ${a}` : a)}
              className="chip bg-cream-100 text-navy-600 hover:bg-cream-200"
            >
              + {a}
            </button>
          ))}
        </div>
      </label>

      <div className="grid gap-6 sm:grid-cols-2">
        <ChoiceGroup
          icon={Sofa} label="Property preference"
          options={FURNISH_OPTIONS} value={form.furnish}
          onChange={(v) => set('furnish', v)} compact
        />
        <ChoiceGroup
          icon={Ruler} label="Home size"
          options={SIZE_OPTIONS} value={form.size}
          onChange={(v) => set('size', v)} compact
        />
      </div>

      <div className="flex items-start gap-3 rounded-2xl border border-gold-200 bg-gold-50 p-4">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
        <div>
          <p className="text-sm font-semibold text-navy-800">Japan housing tip</p>
          <p className="mt-1 text-sm leading-relaxed text-navy-600">
            Initial move-in costs in Japan can include deposit, key money, agency fees, and a guarantor company fee. TokyoLuxe can explain what applies to your situation.
          </p>
        </div>
      </div>
    </div>
  );
}

function ScreenReadiness({ form, set }: { form: IntakeState; set: <K extends keyof IntakeState>(k: K, v: IntakeState[K]) => void }) {
  const toggleHelp = (item: string) => {
    if (item === 'None of these yet') {
      set('helpNeeded', ['None of these yet']);
      return;
    }
    const filtered = form.helpNeeded.filter((h) => h !== 'None of these yet');
    set('helpNeeded', filtered.includes(item) ? filtered.filter((h) => h !== item) : [...filtered, item]);
  };

  return (
    <div className="animate-fadeIn space-y-6">
      <Header title="Readiness checklist" sub="A few simple questions to understand where you are in the process." />
      <ChoiceGroup
        icon={MapPin} label="Current location"
        options={LOCATION_OPTIONS} value={form.location}
        onChange={(v) => set('location', v)} compact
      />
      <ChoiceGroup
        icon={FileText} label="Visa / residency status"
        options={VISA_OPTIONS} value={form.visa}
        onChange={(v) => set('visa', v)} compact
      />
      <ChoiceGroup
        icon={Wallet} label="Employment or income documentation"
        options={INCOME_OPTIONS} value={form.income}
        onChange={(v) => set('income', v)} compact
      />

      <div>
        <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-navy-800">
          <Star className="h-4 w-4 text-terracotta-500" /> Do you need help with any of these?
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {HELP_OPTIONS.map((h) => {
            const active = form.helpNeeded.includes(h);
            return (
              <button
                key={h}
                onClick={() => toggleHelp(h)}
                className={`flex items-center gap-2.5 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all ${
                  active
                    ? 'border-terracotta-500 bg-terracotta-50 text-navy-900 ring-2 ring-terracotta-400/20'
                    : 'border-navy-200 bg-white text-navy-600 hover:border-gold-300 hover:bg-cream-50'
                }`}
              >
                <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md ${
                  active ? 'bg-terracotta-500 text-white' : 'bg-cream-100 text-transparent'
                }`}>
                  <Check className="h-3.5 w-3.5" />
                </span>
                {h}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-2xl bg-navy-900 p-5 text-white">
        <HeartPulse className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" />
        <div>
          <p className="text-sm font-semibold text-white">You are not alone</p>
          <p className="mt-1 text-sm leading-relaxed text-navy-200">
            The first consultation is simply for understanding your situation and next steps. There's no pressure to commit to anything.
          </p>
        </div>
      </div>
    </div>
  );
}

const goalLabel: Record<HousingGoal, string> = {
  rent: 'Rent a home',
  buy: 'Buy a home',
  investment: 'Explore property investment',
  relocation: 'Relocation and settling-in support',
};

function ScreenReview({ form, set }: { form: IntakeState; set: <K extends keyof IntakeState>(k: K, v: IntakeState[K]) => void }) {
  const summaryItems = [
    { label: 'Goal', value: form.goal ? goalLabel[form.goal] : '—' },
    { label: 'Move-in', value: form.timeline || '—' },
    { label: 'Budget', value: form.budget || '—' },
    { label: 'Areas', value: form.areas || '—' },
    { label: 'Household', value: [form.household, form.pets ? `pets: ${form.pets.toLowerCase()}` : ''].filter(Boolean).join(', ') || '—' },
    { label: 'Language', value: form.supportLang || '—' },
    { label: 'Readiness', value: [form.visa, form.income === 'Need guidance' ? 'income: needs guidance' : ''].filter(Boolean).join('; ') || '—' },
    { label: 'Additional help', value: form.helpNeeded.filter((h) => h !== 'None of these yet').join(', ') || 'None' },
  ];

  return (
    <div className="animate-fadeIn space-y-6">
      <Header title="Review and book your free consultation" sub="Check your housing brief, then choose a time to talk with TokyoLuxe." />

      <div className="card-luxe overflow-hidden">
        <div className="flex items-center gap-2.5 border-b border-cream-200 bg-cream-50 px-5 py-4">
          <Home className="h-5 w-5 text-terracotta-500" />
          <h3 className="text-sm font-bold text-navy-900">Your TokyoLuxe housing brief</h3>
        </div>
        <dl className="divide-y divide-cream-100">
          {summaryItems.map(({ label, value }) => (
            <div key={label} className="flex items-start justify-between gap-4 px-5 py-3">
              <dt className="text-xs font-medium uppercase tracking-wider text-navy-400">{label}</dt>
              <dd className="max-w-[60%] text-right text-sm font-medium text-navy-900">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="rounded-2xl bg-gradient-to-br from-navy-900 to-navy-800 p-6 text-white">
        <h3 className="text-base font-bold text-white">Your next step</h3>
        <p className="mt-2 text-sm leading-relaxed text-navy-200">
          Book a free 30-minute TokyoLuxe consultation. Your advisor will already have this summary, so you can spend the conversation on your real options—not repeating the basics.
        </p>
        <div className="mt-4 grid gap-2.5">
          {CONSULTATION_SLOTS.map((slot) => {
            const active = form.slot === slot.id;
            return (
              <button
                key={slot.id}
                onClick={() => set('slot', slot.id)}
                className={`flex items-center justify-between rounded-xl px-4 py-3.5 transition-all ${
                  active ? 'bg-gold-400 text-navy-900 ring-2 ring-gold-300' : 'bg-white/10 text-white hover:bg-white/15'
                }`}
              >
                <span className="flex items-center gap-2.5 text-sm font-semibold">
                  <Calendar className="h-4 w-4" /> {slot.day}
                </span>
                <span className="flex items-center gap-2.5 text-sm font-bold">
                  {slot.time}
                  {active && <Check className="h-4 w-4" />}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-cream-200 bg-cream-50 p-4">
        <ShieldCheck className="mt-0.5 h-4.5 w-4.5 shrink-0 text-navy-500" />
        <p className="text-xs leading-relaxed text-navy-600">
          By continuing, you agree to share this intake summary with TokyoLuxe solely to arrange your consultation. This is not a property application or a guarantee of housing.
        </p>
      </div>
    </div>
  );
}

const nextStepIcons: Record<string, typeof Smartphone> = {
  sim: Smartphone,
  heart: HeartPulse,
  pill: Pill,
};

function ScreenConfirm({ form }: { form: IntakeState }) {
  const slot = CONSULTATION_SLOTS.find((s) => s.id === form.slot);
  const tracker = [
    { label: 'Housing plan completed', state: 'done' },
    { label: 'TokyoLuxe review', state: 'current' },
    { label: 'Consultation confirmed', state: 'upcoming' },
    { label: 'Your Japan move-in plan', state: 'upcoming' },
  ];

  return (
    <div className="animate-scaleIn">
      <div className="card-luxe overflow-hidden">
        <div className="flex flex-col items-center px-6 py-10 text-center sm:px-10">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <Check className="h-8 w-8 text-emerald-600" />
          </div>
          <h1 className="font-serif mt-5 text-2xl font-semibold text-navy-900">Your consultation request is ready</h1>
          <p className="mt-2 max-w-md text-sm text-navy-600">
            TokyoLuxe has received your housing brief and will confirm your appointment shortly.
          </p>

          <div className="mt-8 w-full max-w-md">
            {tracker.map((t, i) => (
              <div key={t.label} className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
                    t.state === 'done' ? 'bg-emerald-500 text-white' :
                    t.state === 'current' ? 'bg-terracotta-500 text-white animate-pulseSoft' :
                    'bg-cream-100 text-navy-400 ring-1 ring-cream-200'
                  }`}>
                    {t.state === 'done' ? <Check className="h-5 w-5" /> : i + 1}
                  </div>
                  {i < tracker.length - 1 && (
                    <div className={`h-7 w-0.5 ${t.state === 'done' ? 'bg-emerald-300' : 'bg-cream-200'}`} />
                  )}
                </div>
                <span className={`pb-7 text-sm font-medium ${t.state === 'upcoming' ? 'text-navy-400' : 'text-navy-900'}`}>
                  {t.label}
                </span>
              </div>
            ))}
          </div>

          {slot && (
            <div className="mt-2 flex items-center gap-3 rounded-xl bg-cream-50 px-5 py-3.5 ring-1 ring-cream-200">
              <Calendar className="h-5 w-5 text-terracotta-500" />
              <span className="text-sm font-semibold text-navy-900">
                {slot.day}, {slot.time} — Online consultation with TokyoLuxe
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="mb-3 text-center text-sm font-bold text-navy-900">Helpful next steps for your move</h3>
        <div className="grid gap-3">
          {NEXT_STEPS.map((step) => {
            const Icon = nextStepIcons[step.icon] ?? Star;
            return (
              <div key={step.id} className="card-luxe flex items-start gap-4 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cream-100 text-navy-600">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-navy-900">{step.title}</p>
                    <span className="badge bg-gold-100 text-gold-700">{step.provider}</span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-navy-500">{step.desc}</p>
                </div>
                <span className="badge bg-cream-100 text-navy-500">Optional</span>
              </div>
            );
          })}
        </div>
        <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-navy-400">
          <PartyPopper className="h-3.5 w-3.5" /> These are optional resources, not paid advertisements.
        </p>
      </div>
    </div>
  );
}

function Header({ title, sub }: { title: string; sub: string }) {
  return (
    <div>
      <h2 className="font-serif text-2xl font-semibold text-navy-900">{title}</h2>
      <p className="mt-1.5 text-sm text-navy-500">{sub}</p>
    </div>
  );
}

function ChoiceGroup({
  icon: Icon, label, options, value, onChange, compact,
}: {
  icon: typeof Clock;
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  compact?: boolean;
}) {
  return (
    <div>
      <p className="mb-2.5 flex items-center gap-2 text-sm font-semibold text-navy-800">
        <Icon className="h-4 w-4 text-terracotta-500" /> {label}
      </p>
      <div className={compact ? 'grid gap-2 sm:grid-cols-2' : 'grid gap-2'}>
        {options.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              onClick={() => onChange(opt)}
              className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                active
                  ? 'border-terracotta-500 bg-terracotta-50 text-navy-900 ring-2 ring-terracotta-400/20'
                  : 'border-navy-200 bg-white text-navy-600 hover:border-gold-300 hover:bg-cream-50'
              }`}
            >
              {opt}
              {active && <Check className="h-4 w-4 text-terracotta-500" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
