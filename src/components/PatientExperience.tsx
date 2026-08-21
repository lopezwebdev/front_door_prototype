import { useState } from 'react';
import {
  Search, SlidersHorizontal, Stethoscope, Languages, CreditCard, MapPin,
  CheckCircle2, ArrowRight, ArrowLeft, CalendarCheck, Navigation,
  Wallet, ShieldCheck, Clock, Send, PartyPopper,
} from 'lucide-react';
import { CLINICS, CLINIC_BY_ID, PAYMENT_LABELS, type Clinic } from '@/data';
import { ClinicCard, EnglishBadge } from './ClinicCard';

type PatientStep = 'find' | 'details' | 'request' | 'sent';

export function PatientExperience() {
  const [step, setStep] = useState<PatientStep>('find');
  const [selectedId, setSelectedId] = useState<string>('sakura');
  const [query, setQuery] = useState('');

  const selected = CLINIC_BY_ID[selectedId];

  const goDetails = (id: string) => {
    setSelectedId(id);
    setStep('details');
  };

  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
      {step === 'find' && (
        <FindClinic query={query} setQuery={setQuery} onOpen={goDetails} />
      )}
      {step === 'details' && selected && (
        <ClinicDetails clinic={selected} onBack={() => setStep('find')} onContinue={() => setStep('request')} />
      )}
      {step === 'request' && selected && (
        <AppointmentRequest clinic={selected} onBack={() => setStep('details')} onSent={() => setStep('sent')} />
      )}
      {step === 'sent' && selected && (
        <RequestSent clinic={selected} onBack={() => setStep('find')} />
      )}
    </div>
  );
}

function FindClinic({
  query, setQuery, onOpen,
}: { query: string; setQuery: (s: string) => void; onOpen: (id: string) => void }) {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const filters = ['All', 'Internal Medicine', 'Dentistry', "Women's Health"];

  const filtered = CLINICS.filter((c) => {
    const q = query.toLowerCase();
    const matchesQuery =
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.specialty.toLowerCase().includes(q) ||
      c.area.toLowerCase().includes(q);
    const matchesFilter = activeFilter === 'All' || c.specialty === activeFilter;
    return matchesQuery && matchesFilter;
  });

  return (
    <div className="animate-fadeIn">
      <div className="rounded-3xl bg-white px-6 py-8 text-center shadow-card ring-1 ring-navy-100/60 sm:px-10 sm:py-10">
        <span className="badge bg-teal-50 text-teal-700 ring-1 ring-teal-100">Tokyo · English-friendly care</span>
        <h1 className="mt-3 text-2xl font-bold text-navy-900 sm:text-3xl">
          Find English-friendly care in Tokyo
        </h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-navy-500">
          Browse clinics that support international patients. Send a request — the clinic confirms a time using your preferred contact method.
        </p>

        <div className="relative mx-auto mt-6 max-w-xl">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by clinic, specialty, or area"
            className="input pl-12 py-3.5 text-[15px]"
          />
        </div>

        <div className="mx-auto mt-4 flex max-w-xl flex-wrap items-center justify-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-medium text-navy-400">
            <SlidersHorizontal className="h-3.5 w-3.5" /> Filters:
          </div>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`chip ${
                activeFilter === f
                  ? 'bg-navy-900 text-white'
                  : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
              }`}
            >
              {f}
            </button>
          ))}
          <button className="chip bg-white text-navy-600 ring-1 ring-navy-200 hover:bg-navy-50">
            <MapPin className="h-3.5 w-3.5" /> Near me
          </button>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-navy-400">
          {filtered.length} clinic{filtered.length !== 1 && 's'}
        </h2>
      </div>

      <div className="mt-3 grid gap-4">
        {filtered.map((c) => (
          <ClinicCard key={c.id} clinic={c} onOpen={() => onOpen(c.id)} />
        ))}
        {filtered.length === 0 && (
          <div className="card p-10 text-center text-sm text-navy-500">
            No clinics match your search. Try a different keyword.
          </div>
        )}
      </div>
    </div>
  );
}

function ClinicDetails({ clinic, onBack, onContinue }: { clinic: Clinic; onBack: () => void; onContinue: () => void }) {
  const bringItems = [
    { icon: ShieldCheck, label: 'Passport or residence card' },
    { icon: Wallet, label: 'Japanese health insurance card, if you have one' },
    { icon: CreditCard, label: 'Payment card or cash' },
  ];
  const steps = [
    { icon: Send, title: 'Send your request', desc: 'Share your preferred time and contact method.' },
    { icon: Clock, title: 'Clinic confirms a time', desc: 'The clinic reviews and confirms, or suggests another time.' },
    { icon: CalendarCheck, title: 'Receive directions and details', desc: 'You get appointment details and how to arrive.' },
  ];

  return (
    <div className="animate-fadeIn">
      <button onClick={onBack} className="btn-ghost mb-4 -ml-2">
        <ArrowLeft className="h-4 w-4" /> Back to clinics
      </button>

      <div className="card overflow-hidden">
        <div className="bg-gradient-to-br from-navy-900 to-navy-800 p-6 text-white sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold sm:text-[26px]">{clinic.name}</h1>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-navy-100">
                <span className="inline-flex items-center gap-1.5">
                  <Stethoscope className="h-4 w-4 text-teal-300" /> {clinic.specialty}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-teal-300" /> {clinic.address}
                </span>
              </div>
              <p className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-navy-200">
                <Navigation className="h-4 w-4 text-teal-300" /> {clinic.station}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <EnglishBadge label={clinic.englishSupportLabel} />
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <p className="text-[15px] leading-relaxed text-navy-600">{clinic.description}</p>

          <section className="mt-7">
            <h2 className="text-base font-bold text-navy-900">What to bring</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-3">
              {bringItems.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-start gap-2.5 rounded-xl bg-navy-50 p-3.5">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                  <span className="text-sm text-navy-700">{label}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-7">
            <h2 className="text-base font-bold text-navy-900">Payment information</h2>
            <div className="mt-3 grid gap-2.5">
              <PayRow icon={Wallet} title="Japanese National Health Insurance" value="Accepted" tone="emerald" />
              <PayRow
                icon={CreditCard}
                title="Patients without Japanese insurance"
                value="Clinic will explain expected costs before confirmation"
                tone="navy"
              />
              <PayRow icon={CreditCard} title="Credit cards" value="Accepted" tone="emerald" />
            </div>
          </section>

          <section className="mt-7">
            <h2 className="text-base font-bold text-navy-900">How appointment requests work</h2>
            <ol className="mt-4 grid gap-3 sm:grid-cols-3">
              {steps.map(({ icon: Icon, title, desc }, i) => (
                <li key={title} className="relative rounded-xl bg-white p-4 ring-1 ring-navy-100">
                  <span className="absolute -top-2 left-4 flex h-6 w-6 items-center justify-center rounded-full bg-teal-500 text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <Icon className="mt-2 h-5 w-5 text-teal-600" />
                  <h3 className="mt-2 text-sm font-semibold text-navy-900">{title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-navy-500">{desc}</p>
                </li>
              ))}
            </ol>
          </section>

          <button onClick={onContinue} className="btn-primary mt-8 w-full sm:w-auto">
            Request an appointment <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function PayRow({
  icon: Icon, title, value, tone,
}: { icon: typeof Wallet; title: string; value: string; tone: 'emerald' | 'navy' }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-navy-50 p-3.5">
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
        tone === 'emerald' ? 'bg-emerald-100 text-emerald-700' : 'bg-navy-100 text-navy-700'
      }`}>
        <Icon className="h-4.5 w-4.5" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-navy-800">{title}</p>
        <p className={`text-xs ${tone === 'emerald' ? 'text-emerald-700' : 'text-navy-500'}`}>{value}</p>
      </div>
    </div>
  );
}

type FormState = {
  firstName: string;
  email: string;
  contactLang: string;
  preferredDate: string;
  timeWindow: 'morning' | 'afternoon' | 'evening' | '';
  nhi: 'yes' | 'no' | 'not-sure' | '';
  contactMethod: 'email' | 'phone' | 'whatsapp' | '';
  note: string;
};

function AppointmentRequest({ clinic, onBack, onSent }: { clinic: Clinic; onBack: () => void; onSent: () => void }) {
  const [form, setForm] = useState<FormState>({
    firstName: '', email: '', contactLang: 'English', preferredDate: '',
    timeWindow: '', nhi: '', contactMethod: '', note: '',
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = () => {
    const req: Record<string, boolean> = {};
    (['firstName', 'email', 'preferredDate', 'timeWindow', 'nhi', 'contactMethod'] as const).forEach((k) => {
      if (!form[k]) req[k] = true;
    });
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) req.email = true;
    setErrors(req);
    if (Object.keys(req).length === 0) onSent();
  };

  return (
    <div className="animate-fadeIn">
      <button onClick={onBack} className="btn-ghost mb-4 -ml-2">
        <ArrowLeft className="h-4 w-4" /> Back to {clinic.name}
      </button>

      <div className="card p-6 sm:p-8">
        <span className="badge bg-amber-100 text-amber-800 ring-1 ring-amber-200">
          <Clock className="h-3.5 w-3.5" /> This is a request, not an instant booking
        </span>
        <h1 className="mt-3 text-2xl font-bold text-navy-900">Request an appointment</h1>
        <p className="mt-1.5 text-sm text-navy-500">
          Send a request to {clinic.name}. The clinic will confirm a time or suggest another option.
        </p>

        <div className="mt-7 grid gap-5">
          <Field label="First name" error={errors.firstName}>
            <input className="input" placeholder="Your first name" value={form.firstName}
              onChange={(e) => set('firstName', e.target.value)} />
          </Field>
          <Field label="Email address" error={errors.email}>
            <input className="input" type="email" placeholder="you@example.com" value={form.email}
              onChange={(e) => set('email', e.target.value)} />
          </Field>
          <Field label="Preferred contact language">
            <select className="input" value={form.contactLang} onChange={(e) => set('contactLang', e.target.value)}>
              <option>English</option><option>Spanish</option><option>French</option><option>Chinese</option><option>Japanese</option>
            </select>
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Preferred date" error={errors.preferredDate}>
              <input className="input" type="date" value={form.preferredDate}
                onChange={(e) => set('preferredDate', e.target.value)} />
            </Field>
            <Field label="Preferred time window" error={errors.timeWindow}>
              <div className="grid grid-cols-3 gap-2">
                {(['morning', 'afternoon', 'evening'] as const).map((w) => (
                  <button key={w} type="button" onClick={() => set('timeWindow', w)}
                    className={`rounded-xl px-2 py-3 text-sm font-medium capitalize transition-all ${
                      form.timeWindow === w
                        ? 'bg-teal-500 text-white shadow-sm'
                        : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
                    }`}>
                    {w}
                  </button>
                ))}
              </div>
            </Field>
          </div>
          <Field label="Are you enrolled in Japanese National Health Insurance?" error={errors.nhi}>
            <div className="grid grid-cols-3 gap-2">
              {([['yes', 'Yes'], ['no', 'No'], ['not-sure', 'Not sure']] as const).map(([v, label]) => (
                <button key={v} type="button" onClick={() => set('nhi', v)}
                  className={`rounded-xl px-2 py-3 text-sm font-medium transition-all ${
                    form.nhi === v ? 'bg-teal-500 text-white shadow-sm' : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
                  }`}>
                  {label}
                </button>
              ))}
            </div>
          </Field>
          <Field label="Preferred contact method" error={errors.contactMethod}>
            <div className="grid grid-cols-3 gap-2">
              {([['email', 'Email'], ['phone', 'Phone'], ['whatsapp', 'WhatsApp']] as const).map(([v, label]) => (
                <button key={v} type="button" onClick={() => set('contactMethod', v)}
                  className={`rounded-xl px-2 py-3 text-sm font-medium transition-all ${
                    form.contactMethod === v ? 'bg-teal-500 text-white shadow-sm' : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
                  }`}>
                  {label}
                </button>
              ))}
            </div>
          </Field>
          <Field label="Optional note (non-medical)">
            <textarea className="input min-h-[88px] resize-none" rows={3}
              placeholder="For example: I need help choosing a suitable appointment time."
              value={form.note} onChange={(e) => set('note', e.target.value)} />
          </Field>
        </div>

        <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <p className="text-sm text-amber-800">
            Please do not include medical details in this request. The clinic will contact you directly for any clinical information it needs.
          </p>
        </div>

        <button onClick={submit} className="btn-primary mt-6 w-full">
          <Send className="h-4 w-4" /> Send appointment request
        </button>
      </div>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-navy-800">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs font-medium text-red-600">This field is required.</span>}
    </label>
  );
}

function RequestSent({ clinic, onBack }: { clinic: Clinic; onBack: () => void }) {
  const tracker = [
    { label: 'Request sent', done: true, active: false },
    { label: 'Clinic review', done: false, active: true },
    { label: 'Appointment confirmed', done: false, active: false },
  ];
  return (
    <div className="animate-scaleIn">
      <div className="card overflow-hidden">
        <div className="flex flex-col items-center px-6 py-10 text-center sm:px-10">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 className="h-8 w-8 text-emerald-600" />
          </div>
          <h1 className="mt-5 text-2xl font-bold text-navy-900">Your request has been sent</h1>
          <p className="mt-2 max-w-md text-sm text-navy-600">
            Your appointment request has been sent to {clinic.name}. The clinic will confirm or suggest another time using your preferred contact method.
          </p>

          <div className="mt-8 w-full max-w-md">
            <div className="flex items-center justify-between">
              {tracker.map((t, i) => (
                <div key={t.label} className="flex flex-1 flex-col items-center text-center">
                  <div className="flex w-full items-center">
                    <div className={`h-1 flex-1 ${i === 0 ? 'bg-emerald-400' : 'bg-navy-100'}`} />
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                      t.done ? 'bg-emerald-500 text-white' : t.active ? 'bg-teal-500 text-white animate-pulseSoft' : 'bg-navy-100 text-navy-400'
                    }`}>
                      {t.done ? <CheckCircle2 className="h-5 w-5" /> : i + 1}
                    </div>
                    <div className={`h-1 flex-1 ${i === tracker.length - 1 ? 'bg-navy-100' : 'bg-navy-100'}`} />
                  </div>
                  <span className={`mt-2 text-xs font-medium ${t.done || t.active ? 'text-navy-900' : 'text-navy-400'}`}>
                    {t.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button onClick={onBack} className="btn-secondary mt-8">
            <ArrowLeft className="h-4 w-4" /> Back to clinics
          </button>
        </div>
      </div>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-navy-400">
        <PartyPopper className="h-3.5 w-3.5" /> You will receive a confirmation by your preferred contact method.
      </p>
    </div>
  );
}


