import { useState } from 'react';
import {
  Inbox, CheckCircle2, Star, AlertCircle, ChevronRight, X,
  Mail, MessageCircle, Calendar, FileText, Users, PawPrint,
  Globe, Wallet, MapPin, ShieldCheck, Sparkles, TrendingUp,
  BarChart3, Settings, LayoutDashboard, Clock, ArrowUpRight,
  Send, HelpCircle, Search, Check,
} from 'lucide-react';
import {
  INITIAL_LEADS, LEAD_STATUS_META, LUXE_METRICS, WORKFLOW_STEPS,
  LUXE_REPORTING, VALUE_BULLETS, SETUP_CHECKLIST_LUXE, DASHBOARD_FOOTER_LINE,
  type Lead, type LeadStatus,
} from '@/luxe-data';

type PartnerPage = 'dashboard' | 'value' | 'setup';

const metricIcons: Record<string, typeof Inbox> = {
  inbox: Inbox, check: CheckCircle2, star: Star, alert: AlertCircle,
};

export function LuxePartnerExperience() {
  const [page, setPage] = useState<PartnerPage>('dashboard');
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const selected = leads.find((l) => l.id === selectedId) ?? null;

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2600);
  };

  const updateStatus = (id: string, status: LeadStatus) => {
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, status } : l)));
  };

  const nav: { id: PartnerPage; label: string; icon: typeof Inbox }[] = [
    { id: 'dashboard', label: 'Requests', icon: LayoutDashboard },
    { id: 'value', label: 'Value & reporting', icon: BarChart3 },
    { id: 'setup', label: 'Partner setup', icon: Settings },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
      <div className="flex flex-col gap-6 lg:flex-row">
        <aside className="lg:w-56 lg:shrink-0">
          <div className="card-luxe p-2 lg:sticky lg:top-24">
            <nav className="flex gap-1 lg:flex-col">
              {nav.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setPage(id)}
                  className={`flex flex-1 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all lg:flex-none ${
                    page === id ? 'bg-navy-900 text-white' : 'text-navy-600 hover:bg-cream-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          {page === 'dashboard' && (
            <Dashboard leads={leads} onOpen={(id) => setSelectedId(id)} onAction={showToast} onUpdate={updateStatus} />
          )}
          {page === 'value' && <ValuePage />}
          {page === 'setup' && <SetupPage />}
        </main>
      </div>

      {selected && (
        <LeadPanel
          lead={selected}
          onClose={() => setSelectedId(null)}
          onAction={(msg) => showToast(msg)}
          onUpdate={(id, status) => {
            updateStatus(id, status);
            setSelectedId(null);
            showToast('Status updated');
          }}
        />
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 animate-toastIn">
          <div className="flex items-center gap-2.5 rounded-full bg-navy-900 px-5 py-3 text-sm font-medium text-white shadow-soft">
            <CheckCircle2 className="h-4.5 w-4.5 text-gold-400" />
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}

function Dashboard({
  leads, onOpen, onAction, onUpdate,
}: {
  leads: Lead[];
  onOpen: (id: string) => void;
  onAction: (msg: string) => void;
  onUpdate: (id: string, status: LeadStatus) => void;
}) {
  return (
    <div className="animate-fadeIn">
      <div className="rounded-2xl bg-gradient-to-br from-navy-900 to-navy-800 p-6 text-white shadow-soft sm:p-8">
        <span className="badge bg-gold-400/20 text-gold-300 ring-1 ring-gold-400/30">
          <Sparkles className="h-3.5 w-3.5" /> TokyoLuxe Partner Dashboard
        </span>
        <h1 className="font-serif mt-3 text-2xl font-semibold sm:text-[28px]">Your GoGaijin housing inquiries</h1>
        <p className="mt-2 max-w-xl text-sm text-navy-200">
          No new complicated software required—GoGaijin sends you qualified, structured client briefs.
        </p>

        <div className="mt-5 rounded-xl bg-white/10 p-4 ring-1 ring-white/15">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-navy-300">Your workflow</p>
          <div className="flex flex-wrap items-center gap-2">
            {WORKFLOW_STEPS.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white">
                  {step}
                </span>
                {i < WORKFLOW_STEPS.length - 1 && <ChevronRight className="h-3.5 w-3.5 text-navy-400" />}
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-navy-300">
            TokyoLuxe keeps its current workflow. GoGaijin simply prepares the client before the first conversation.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {LUXE_METRICS.map(({ label, value, icon, tone }) => {
          const Icon = metricIcons[icon];
          return (
            <div key={label} className="card-luxe p-5">
              <div className="flex items-center justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-3xl font-bold tracking-tight text-navy-900">{value}</span>
              </div>
              <p className="mt-3 text-sm font-semibold text-navy-800">{label}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-navy-900">Client request list</h2>
          <span className="text-xs font-medium text-navy-400">{leads.length} leads</span>
        </div>

        <div className="mt-3 card-luxe overflow-hidden">
          <div className="hidden border-b border-cream-200 bg-cream-50/50 px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-navy-400 sm:grid sm:grid-cols-12">
            <span className="col-span-3">Client</span>
            <span className="col-span-2">Goal</span>
            <span className="col-span-2">Budget</span>
            <span className="col-span-3">Areas</span>
            <span className="col-span-2">Status</span>
          </div>
          <ul className="divide-y divide-cream-100">
            {leads.map((lead) => (
              <li key={lead.id}>
                <button
                  onClick={() => onOpen(lead.id)}
                  className="grid w-full grid-cols-1 items-center gap-2 px-5 py-4 text-left transition-colors hover:bg-cream-50/60 sm:grid-cols-12 sm:gap-4"
                >
                  <span className="col-span-3 flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-100 text-sm font-bold text-gold-700">
                      {lead.name.charAt(0)}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-navy-900">{lead.name}</p>
                      <p className="text-xs text-navy-400">{lead.received}</p>
                    </div>
                  </span>
                  <span className="col-span-2 text-sm text-navy-600">{lead.goal}</span>
                  <span className="col-span-2 text-sm text-navy-600">{lead.budget}</span>
                  <span className="col-span-3 text-sm text-navy-600">{lead.areas}</span>
                  <span className="col-span-2 flex items-center justify-between">
                    <span className={`badge ${LEAD_STATUS_META[lead.status].tone}`}>{LEAD_STATUS_META[lead.status].label}</span>
                    <ChevronRight className="hidden h-4 w-4 text-navy-300 sm:block" />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-gradient-to-br from-gold-50 to-cream-50 p-6 ring-1 ring-gold-200">
        <div className="flex items-start gap-3">
          <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-terracotta-500" />
          <p className="text-sm font-semibold text-navy-900">
            {DASHBOARD_FOOTER_LINE}
          </p>
        </div>
      </div>
    </div>
  );
}

function LeadPanel({
  lead, onClose, onAction, onUpdate,
}: {
  lead: Lead;
  onClose: () => void;
  onAction: (msg: string) => void;
  onUpdate: (id: string, status: LeadStatus) => void;
}) {
  const details = [
    { icon: Sparkles, label: 'Client goal', value: `${lead.goal} · ${lead.timeline}` },
    { icon: MapPin, label: 'Areas', value: lead.areas },
    { icon: Wallet, label: 'Budget', value: lead.budget },
    { icon: Users, label: 'Household', value: `${lead.household}, pets: ${lead.pets.toLowerCase()}` },
    { icon: Globe, label: 'Language', value: lead.language },
    { icon: FileText, label: 'Visa / readiness', value: lead.visa },
    { icon: ShieldCheck, label: 'Documentation', value: lead.documentation },
  ];

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <div className="absolute inset-0 bg-navy-900/30 backdrop-blur-sm animate-fadeIn" onClick={onClose} />
      <div className="relative h-full w-full max-w-md animate-slideIn overflow-y-auto bg-white shadow-soft scrollbar-thin">
        <div className="sticky top-0 flex items-center justify-between border-b border-cream-200 bg-white/95 px-5 py-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-100 text-sm font-bold text-gold-700">
              {lead.name.charAt(0)}
            </span>
            <div>
              <h3 className="text-base font-bold text-navy-900">{lead.name}</h3>
              <span className={`badge mt-0.5 ${LEAD_STATUS_META[lead.status].tone}`}>{LEAD_STATUS_META[lead.status].label}</span>
            </div>
          </div>
          <button onClick={onClose} className="rounded-full p-2 text-navy-400 hover:bg-cream-50 hover:text-navy-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">Structured intake summary</p>
          <dl className="mt-3 grid gap-3.5">
            {details.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cream-100 text-navy-600">
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <div className="min-w-0">
                  <dt className="text-xs font-medium uppercase tracking-wider text-navy-400">{label}</dt>
                  <dd className="text-sm font-semibold text-navy-900">{value}</dd>
                </div>
              </div>
            ))}
          </dl>

          <div className="mt-5 rounded-xl bg-cream-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">Support requested</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {lead.supportRequested.map((s) => (
                <span key={s} className="chip bg-gold-100 text-gold-800">{s}</span>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-navy-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">Notes</p>
            <p className="mt-1.5 text-sm leading-relaxed text-navy-700">{lead.notes}</p>
          </div>

          <div className="mt-6 grid gap-2.5">
            <button
              onClick={() => onUpdate(lead.id, 'review-needed')}
              className="btn-luxe w-full"
            >
              <Check className="h-4 w-4" /> Mark reviewed
            </button>
            <div className="grid grid-cols-2 gap-2.5">
              <button onClick={() => onAction('Sent to email inbox')} className="btn-luxe-secondary w-full">
                <Mail className="h-4 w-4" /> Send to email
              </button>
              <button onClick={() => onAction('Sent to LINE')} className="btn-luxe-secondary w-full">
                <MessageCircle className="h-4 w-4" /> Send to LINE
              </button>
            </div>
            <button
              onClick={() => onUpdate(lead.id, 'consultation-booked')}
              className="btn-luxe-secondary w-full"
            >
              <Calendar className="h-4 w-4" /> Confirm consultation
            </button>
            <button onClick={() => onAction('Clarification requested from client')} className="btn-luxe-secondary w-full">
              <HelpCircle className="h-4 w-4" /> Request clarification
            </button>
            <button
              onClick={() => onUpdate(lead.id, 'property-search')}
              className="btn-luxe-ghost mt-1 w-full text-navy-500"
            >
              <Search className="h-4 w-4" /> Mark as property search started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ValuePage() {
  const maxPlans = Math.max(...LUXE_REPORTING.plans);
  const maxSupport = Math.max(...LUXE_REPORTING.supportAreas.map((s) => s.count));
  const maxLang = Math.max(...LUXE_REPORTING.languages.map((l) => l.count));

  return (
    <div className="animate-fadeIn">
      <h1 className="font-serif text-2xl font-semibold text-navy-900">Value and reporting</h1>
      <p className="mt-1 text-sm text-navy-500">How GoGaijin is streamlining TokyoLuxe's client intake.</p>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="card-luxe p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-navy-900">Plans submitted vs. consultations booked</h2>
            <span className="badge bg-gold-100 text-gold-700 ring-1 ring-gold-200">
              <TrendingUp className="h-3.5 w-3.5" /> Last 6 months
            </span>
          </div>
          <div className="mt-6 grid grid-cols-6 gap-3">
            {LUXE_REPORTING.months.map((m, i) => (
              <div key={m} className="flex flex-col items-center gap-2">
                <div className="flex h-40 w-full items-end justify-center gap-1">
                  <div className="w-1/2 rounded-t bg-navy-200" style={{ height: `${(LUXE_REPORTING.plans[i] / maxPlans) * 100}%` }} />
                  <div className="w-1/2 rounded-t bg-terracotta-400" style={{ height: `${(LUXE_REPORTING.consultations[i] / maxPlans) * 100}%` }} />
                </div>
                <span className="text-xs font-medium text-navy-500">{m}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-4 text-xs">
            <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-navy-200" /> Housing plans</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-terracotta-400" /> Consultations</span>
          </div>
        </div>

        <div className="card-luxe p-5">
          <h2 className="text-base font-bold text-navy-900">Average time saved</h2>
          <p className="mt-1 text-xs text-navy-500">Per first consultation</p>
          <div className="mt-5 space-y-4">
            {LUXE_REPORTING.avgTimeSaved.map((item) => (
              <div key={item.label}>
                <div className="flex items-end justify-between">
                  <span className="text-sm font-medium text-navy-700">{item.label}</span>
                  <span className={`text-2xl font-bold ${item.tone === 'gold' ? 'text-terracotta-500' : 'text-navy-400'}`}>
                    {item.minutes}<span className="text-sm font-medium">min</span>
                  </span>
                </div>
                <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-cream-100">
                  <div
                    className={`h-full rounded-full ${item.tone === 'gold' ? 'bg-terracotta-400' : 'bg-navy-300'}`}
                    style={{ width: `${(item.minutes / 35) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl bg-emerald-50 p-3 text-center">
            <p className="text-2xl font-bold text-emerald-600">23 min</p>
            <p className="text-xs font-medium text-emerald-700">saved per consultation</p>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="card-luxe p-5">
          <h2 className="text-base font-bold text-navy-900">Most-requested support areas</h2>
          <div className="mt-4 space-y-3">
            {LUXE_REPORTING.supportAreas.map((s) => (
              <div key={s.area}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-navy-700">{s.area}</span>
                  <span className="font-semibold text-navy-900">{s.count}</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-cream-100">
                  <div className="h-full rounded-full bg-gradient-to-r from-gold-400 to-terracotta-400" style={{ width: `${(s.count / maxSupport) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-luxe p-5">
          <h2 className="text-base font-bold text-navy-900">Languages requested</h2>
          <div className="mt-4 space-y-3">
            {LUXE_REPORTING.languages.map((l) => (
              <div key={l.lang}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-navy-700">{l.lang}</span>
                  <span className="font-semibold text-navy-900">{l.count}</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-cream-100">
                  <div className="h-full rounded-full bg-gradient-to-r from-navy-400 to-navy-600" style={{ width: `${(l.count / maxLang) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-gradient-to-br from-navy-900 to-navy-800 p-6 text-white">
        <h2 className="font-serif text-lg font-semibold text-white">What GoGaijin is doing for TokyoLuxe</h2>
        <ul className="mt-4 grid gap-2.5">
          {VALUE_BULLETS.map((b) => (
            <li key={b} className="flex items-start gap-2.5 text-sm text-navy-100">
              <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold-400" />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SetupPage() {
  const done = SETUP_CHECKLIST_LUXE.filter((c) => c.done).length;
  const pct = Math.round((done / SETUP_CHECKLIST_LUXE.length) * 100);

  return (
    <div className="animate-fadeIn">
      <h1 className="font-serif text-2xl font-semibold text-navy-900">Partner setup</h1>
      <p className="mt-1 text-sm text-navy-500">Complete your TokyoLuxe profile to receive the most relevant client briefs.</p>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <div className="card-luxe p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-navy-900">Profile completeness</h2>
            <span className="text-2xl font-bold text-terracotta-500">{pct}%</span>
          </div>
          <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-cream-100">
            <div className="h-full rounded-full bg-gradient-to-r from-gold-400 to-terracotta-500 transition-all" style={{ width: `${pct}%` }} />
          </div>
          <ul className="mt-5 grid gap-2.5">
            {SETUP_CHECKLIST_LUXE.map((c) => (
              <li key={c.id} className={`flex items-center justify-between rounded-xl px-4 py-3 ${c.done ? 'bg-emerald-50' : 'bg-gold-50'}`}>
                <span className="flex items-center gap-3 text-sm font-medium text-navy-800">
                  {c.done ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-gold-600" />
                  )}
                  {c.label}
                </span>
                {c.done ? (
                  <span className="text-xs font-semibold text-emerald-700">Complete</span>
                ) : (
                  <button className="text-xs font-semibold text-gold-700 hover:underline">Add now</button>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="card-luxe flex flex-col p-6">
          <h2 className="text-base font-bold text-navy-900">Client-facing journey</h2>
          <p className="mt-1.5 text-sm text-navy-500">
            Preview exactly what clients see before they reach TokyoLuxe.
          </p>
          <div className="mt-4 flex-1 rounded-xl bg-gradient-to-br from-cream-50 to-gold-50 p-4 ring-1 ring-cream-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">Preview</p>
            <p className="font-serif mt-1 text-lg font-semibold text-navy-900">Let&rsquo;s find your home in Japan</p>
            <p className="text-xs text-navy-500">GoGaijin × TokyoLuxe guided intake</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <span className="chip bg-terracotta-100 text-terracotta-700">Rent</span>
              <span className="chip bg-gold-100 text-gold-700">EN / 日本語 / Tiếng Việt</span>
            </div>
          </div>
          <button className="btn-luxe mt-4 w-full">
            Preview client-facing housing journey <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
