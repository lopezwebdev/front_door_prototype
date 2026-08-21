import { useState } from 'react';
import {
  Inbox, CheckCircle2, AlertCircle, Mail, MessageCircle, ShieldCheck,
  ChevronRight, X, Calendar, Clock, Globe, Phone, Mail as MailIcon,
  MessageSquare, Send, Check, BarChart3, Settings, LayoutDashboard,
  Sparkles, TrendingUp, ArrowUpRight,
} from 'lucide-react';
import {
  INITIAL_REQUESTS, STATUS_META, TIME_WINDOW_LABELS, CONTACT_LABELS,
  NHI_LABELS, CONFIRM_SLOTS, MONTHLY_DATA, SETUP_CHECKLIST,
  type AppointmentRequest, type RequestStatus,
} from '@/data';

type ClinicPage = 'dashboard' | 'monthly' | 'setup';

export function ClinicExperience() {
  const [page, setPage] = useState<ClinicPage>('dashboard');
  const [requests, setRequests] = useState<AppointmentRequest[]>(INITIAL_REQUESTS);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [confirmingReq, setConfirmingReq] = useState<AppointmentRequest | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const selected = requests.find((r) => r.id === selectedId) ?? null;

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2600);
  };

  const updateStatus = (id: string, status: RequestStatus) => {
    setRequests((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const nav: { id: ClinicPage; label: string; icon: typeof Inbox }[] = [
    { id: 'dashboard', label: 'Requests', icon: LayoutDashboard },
    { id: 'monthly', label: 'Monthly value', icon: BarChart3 },
    { id: 'setup', label: 'Clinic setup', icon: Settings },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
      <div className="flex flex-col gap-6 lg:flex-row">
        <aside className="lg:w-56 lg:shrink-0">
          <div className="card p-2 lg:sticky lg:top-24">
            <nav className="flex gap-1 lg:flex-col">
              {nav.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setPage(id)}
                  className={`flex flex-1 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all lg:flex-none ${
                    page === id
                      ? 'bg-navy-900 text-white'
                      : 'text-navy-600 hover:bg-navy-50'
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
            <Dashboard
              requests={requests}
              onOpen={(id) => setSelectedId(id)}
              onConfirm={(req) => setConfirmingReq(req)}
              onAction={showToast}
              onResolve={(id) => updateStatus(id, 'resolved')}
            />
          )}
          {page === 'monthly' && <MonthlyValue />}
          {page === 'setup' && <ClinicSetup />}
        </main>
      </div>

      {selected && (
        <RequestPanel
          request={selected}
          onClose={() => setSelectedId(null)}
          onConfirm={(req) => {
            setConfirmingReq(req);
          }}
          onAction={(msg) => {
            showToast(msg);
          }}
          onResolve={(id) => {
            updateStatus(id, 'resolved');
            setSelectedId(null);
            showToast('Request marked as resolved');
          }}
        />
      )}

      {confirmingReq && (
        <ConfirmModal
          request={confirmingReq}
          onClose={() => setConfirmingReq(null)}
          onConfirm={() => {
            updateStatus(confirmingReq.id, 'confirmed');
            setConfirmingReq(null);
            setSelectedId(null);
            showToast('Confirmation prepared for patient');
          }}
        />
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 animate-toastIn">
          <div className="flex items-center gap-2.5 rounded-full bg-navy-900 px-5 py-3 text-sm font-medium text-white shadow-soft">
            <CheckCircle2 className="h-4.5 w-4.5 text-teal-300" />
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}

function Dashboard({
  requests, onOpen, onConfirm, onAction, onResolve,
}: {
  requests: AppointmentRequest[];
  onOpen: (id: string) => void;
  onConfirm: (req: AppointmentRequest) => void;
  onAction: (msg: string) => void;
  onResolve: (id: string) => void;
}) {
  const newCount = requests.filter((r) => r.status === 'new').length;
  const confirmedCount = requests.filter((r) => r.status === 'confirmed').length;
  const followUpCount = requests.filter((r) => r.status === 'needs-follow-up').length;

  const metrics = [
    { label: 'New requests this week', value: 8, icon: Inbox, tone: 'bg-teal-100 text-teal-700', sub: `${newCount} unread in list` },
    { label: 'Confirmed appointments', value: 5, icon: CheckCircle2, tone: 'bg-emerald-100 text-emerald-700', sub: 'Patients notified' },
    { label: 'Requests needing follow-up', value: 3, icon: AlertCircle, tone: 'bg-amber-100 text-amber-700', sub: 'Action suggested' },
  ];

  return (
    <div className="animate-fadeIn">
      <div className="rounded-2xl bg-gradient-to-br from-navy-900 to-navy-800 p-6 text-white shadow-soft sm:p-8">
        <h1 className="text-2xl font-bold sm:text-[26px]">Sakura Family Clinic</h1>
        <p className="mt-1 text-base font-medium text-teal-200">International Patient Requests</p>
        <p className="mt-2 max-w-xl text-sm text-navy-200">
          Manage foreign-patient appointment requests using your existing workflow.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3 rounded-xl bg-white/10 p-3.5 ring-1 ring-white/15">
          <span className="text-sm font-semibold text-white">Your preferred workflow:</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white">
            <Mail className="h-3.5 w-3.5" /> Email inbox
          </span>
          <span className="text-navy-300">+</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white">
            <MessageCircle className="h-3.5 w-3.5" /> LINE
          </span>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-200 ring-1 ring-emerald-400/30">
            <ShieldCheck className="h-3.5 w-3.5" /> No new software portal required for staff
          </span>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {metrics.map(({ label, value, icon: Icon, tone, sub }) => (
          <div key={label} className="card p-5">
            <div className="flex items-center justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone}`}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-3xl font-bold tracking-tight text-navy-900">{value}</span>
            </div>
            <p className="mt-3 text-sm font-semibold text-navy-800">{label}</p>
            <p className="mt-0.5 text-xs text-navy-400">{sub}</p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-navy-900">Request list</h2>
          <span className="text-xs font-medium text-navy-400">{requests.length} total</span>
        </div>

        <div className="mt-3 card overflow-hidden">
          <div className="hidden border-b border-navy-100 bg-navy-50/50 px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-navy-400 sm:grid sm:grid-cols-12">
            <span className="col-span-3">Patient</span>
            <span className="col-span-2">Language</span>
            <span className="col-span-3">Preferred</span>
            <span className="col-span-2">NHI</span>
            <span className="col-span-2">Status</span>
          </div>
          <ul className="divide-y divide-navy-50">
            {requests.map((r) => (
              <li key={r.id}>
                <button
                  onClick={() => onOpen(r.id)}
                  className="grid w-full grid-cols-1 items-center gap-2 px-5 py-4 text-left transition-colors hover:bg-navy-50/60 sm:grid-cols-12 sm:gap-4"
                >
                  <span className="col-span-3 flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-50 text-sm font-bold text-teal-700">
                      {r.patientName.charAt(0)}
                    </span>
                    <span className="text-sm font-semibold text-navy-900">{r.patientName}</span>
                  </span>
                  <span className="col-span-2 text-sm text-navy-600">{r.language}</span>
                  <span className="col-span-3 text-sm text-navy-600">
                    {r.preferredDay} {TIME_WINDOW_LABELS[r.timeWindow].toLowerCase()}
                  </span>
                  <span className="col-span-2 text-sm text-navy-600">{NHI_LABELS[r.nhiStatus]}</span>
                  <span className="col-span-2 flex items-center justify-between">
                    <span className={`badge ${STATUS_META[r.status].tone}`}>{STATUS_META[r.status].label}</span>
                    <ChevronRight className="hidden h-4 w-4 text-navy-300 sm:block" />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const contactIcon = { email: MailIcon, phone: Phone, whatsapp: MessageSquare };

function RequestPanel({
  request, onClose, onConfirm, onAction, onResolve,
}: {
  request: AppointmentRequest;
  onClose: () => void;
  onConfirm: (req: AppointmentRequest) => void;
  onAction: (msg: string) => void;
  onResolve: (id: string) => void;
}) {
  const ContactIcon = contactIcon[request.contactMethod];
  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <div className="absolute inset-0 bg-navy-900/30 backdrop-blur-sm animate-fadeIn" onClick={onClose} />
      <div className="relative h-full w-full max-w-md animate-slideIn overflow-y-auto bg-white shadow-soft scrollbar-thin">
        <div className="sticky top-0 flex items-center justify-between border-b border-navy-100 bg-white/95 px-5 py-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 text-sm font-bold text-teal-700">
              {request.patientName.charAt(0)}
            </span>
            <div>
              <h3 className="text-base font-bold text-navy-900">{request.patientName}</h3>
              <span className={`badge mt-0.5 ${STATUS_META[request.status].tone}`}>{STATUS_META[request.status].label}</span>
            </div>
          </div>
          <button onClick={onClose} className="rounded-full p-2 text-navy-400 hover:bg-navy-50 hover:text-navy-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5">
          <dl className="grid gap-4">
            <Detail icon={Globe} label="Language" value={request.language} />
            <Detail icon={Calendar} label="Preferred date" value={request.preferredDay} />
            <Detail icon={Clock} label="Time window" value={TIME_WINDOW_LABELS[request.timeWindow]} />
            <Detail icon={ShieldCheck} label="Insurance status" value={NHI_LABELS[request.nhiStatus]} />
            <Detail icon={ContactIcon} label="Preferred contact method" value={CONTACT_LABELS[request.contactMethod]} />
          </dl>

          <div className="mt-5 rounded-xl bg-navy-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">Non-medical note</p>
            <p className="mt-1.5 text-sm leading-relaxed text-navy-700">{request.note}</p>
          </div>

          <div className="mt-6 grid gap-2.5">
            <button onClick={() => onConfirm(request)} className="btn-primary w-full">
              <Calendar className="h-4 w-4" /> Confirm a time
            </button>
            <div className="grid grid-cols-2 gap-2.5">
              <button onClick={() => onAction('Another time suggested for patient')} className="btn-secondary w-full">
                <Clock className="h-4 w-4" /> Suggest another time
              </button>
              <button onClick={() => onAction('Sent to clinic email inbox')} className="btn-secondary w-full">
                <Mail className="h-4 w-4" /> Send to clinic email
              </button>
            </div>
            <button onClick={() => onAction('Sent to LINE')} className="btn-secondary w-full">
              <MessageCircle className="h-4 w-4" /> Send to LINE
            </button>
            <button onClick={() => onResolve(request.id)} className="btn-ghost mt-1 w-full text-navy-500">
              <Check className="h-4 w-4" /> Mark as resolved
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Detail({ icon: Icon, label, value }: { icon: typeof Globe; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-600">
        <Icon className="h-4.5 w-4.5" />
      </div>
      <div className="min-w-0">
        <dt className="text-xs font-medium uppercase tracking-wider text-navy-400">{label}</dt>
        <dd className="text-sm font-semibold text-navy-900">{value}</dd>
      </div>
    </div>
  );
}

function ConfirmModal({
  request, onClose, onConfirm,
}: { request: AppointmentRequest; onClose: () => void; onConfirm: () => void }) {
  const [slotId, setSlotId] = useState<string | null>(null);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy-900/40 backdrop-blur-sm animate-fadeIn" onClick={onClose} />
      <div className="relative w-full max-w-md animate-scaleIn rounded-2xl bg-white p-6 shadow-soft">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-navy-900">Confirm a time</h3>
            <p className="mt-1 text-sm text-navy-500">
              Choose a time for {request.patientName}. A confirmation will be prepared for the patient.
            </p>
          </div>
          <button onClick={onClose} className="rounded-full p-1.5 text-navy-400 hover:bg-navy-50">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 grid gap-2">
          {CONFIRM_SLOTS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSlotId(s.id)}
              className={`flex items-center justify-between rounded-xl px-4 py-3 text-left transition-all ${
                slotId === s.id
                  ? 'bg-teal-500 text-white ring-2 ring-teal-500'
                  : 'bg-navy-50 text-navy-700 hover:bg-navy-100'
              }`}
            >
              <span className="flex items-center gap-2.5 text-sm font-medium">
                <Calendar className="h-4 w-4" /> {s.date}
              </span>
              <span className="flex items-center gap-2.5 text-sm font-semibold">
                {s.time}
                {slotId === s.id && <Check className="h-4 w-4" />}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={onConfirm}
          disabled={!slotId}
          className="btn-primary mt-5 w-full"
        >
          <Send className="h-4 w-4" /> Send confirmation
        </button>
      </div>
    </div>
  );
}

function MonthlyValue() {
  const max = Math.max(...MONTHLY_DATA.requests);
  const maxLang = Math.max(...MONTHLY_DATA.languages.map((l) => l.count));

  return (
    <div className="animate-fadeIn">
      <h1 className="text-2xl font-bold text-navy-900">International Patient Activity</h1>
      <p className="mt-1 text-sm text-navy-500">A simple view of how international patients are reaching your clinic.</p>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="card p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-navy-900">Requests vs. confirmations</h2>
            <span className="badge bg-teal-50 text-teal-700 ring-1 ring-teal-100">
              <TrendingUp className="h-3.5 w-3.5" /> Last 6 months
            </span>
          </div>
          <div className="mt-6 grid grid-cols-6 gap-3">
            {MONTHLY_DATA.months.map((m, i) => (
              <div key={m} className="flex flex-col items-center gap-2">
                <div className="flex h-40 w-full items-end justify-center gap-1">
                  <div className="w-1/2 rounded-t bg-navy-200 transition-all" style={{ height: `${(MONTHLY_DATA.requests[i] / max) * 100}%` }} />
                  <div className="w-1/2 rounded-t bg-teal-500 transition-all" style={{ height: `${(MONTHLY_DATA.confirmed[i] / max) * 100}%` }} />
                </div>
                <span className="text-xs font-medium text-navy-500">{m}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-4 text-xs">
            <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-navy-200" /> Appointment requests</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-teal-500" /> Confirmed</span>
            <span className="ml-auto inline-flex items-center gap-1.5 text-navy-400">
              <span className="h-2.5 w-2.5 rounded-sm bg-amber-300" /> Cancelled: {MONTHLY_DATA.cancelled.reduce((a, b) => a + b, 0)}
            </span>
          </div>
        </div>

        <div className="card p-5">
          <h2 className="text-base font-bold text-navy-900">Most requested languages</h2>
          <div className="mt-4 grid gap-3">
            {MONTHLY_DATA.languages.map((l) => (
              <div key={l.lang}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-navy-700">{l.lang}</span>
                  <span className="font-semibold text-navy-900">{l.count}</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-navy-100">
                  <div className="h-full rounded-full bg-gradient-to-r from-teal-400 to-teal-600" style={{ width: `${(l.count / maxLang) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Appointment requests', value: MONTHLY_DATA.requests.reduce((a, b) => a + b, 0), icon: Inbox, tone: 'text-navy-700' },
          { label: 'Confirmed appointments', value: MONTHLY_DATA.confirmed.reduce((a, b) => a + b, 0), icon: CheckCircle2, tone: 'text-emerald-600' },
          { label: 'Cancelled requests', value: MONTHLY_DATA.cancelled.reduce((a, b) => a + b, 0), icon: X, tone: 'text-amber-600' },
        ].map(({ label, value, icon: Icon, tone }) => (
          <div key={label} className="card flex items-center gap-4 p-5">
            <Icon className={`h-7 w-7 ${tone}`} />
            <div>
              <p className="text-2xl font-bold text-navy-900">{value}</p>
              <p className="text-xs font-medium text-navy-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-start gap-4 rounded-2xl bg-gradient-to-br from-teal-50 to-navy-50 p-6 ring-1 ring-teal-100">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-500 text-white">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-navy-900">A prepared path for every international patient</p>
          <p className="mt-1 text-sm text-navy-600">
            GoGaijin Clinic Connect helps your clinic provide a clear, prepared path for international patients before they arrive.
          </p>
        </div>
      </div>
    </div>
  );
}

function ClinicSetup() {
  const done = SETUP_CHECKLIST.filter((c) => c.done).length;
  const pct = Math.round((done / SETUP_CHECKLIST.length) * 100);

  return (
    <div className="animate-fadeIn">
      <h1 className="text-2xl font-bold text-navy-900">Clinic setup</h1>
      <p className="mt-1 text-sm text-navy-500">Complete your profile so international patients can find and request care confidently.</p>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-navy-900">Clinic profile completeness</h2>
            <span className="text-2xl font-bold text-teal-600">{pct}%</span>
          </div>
          <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-navy-100">
            <div className="h-full rounded-full bg-gradient-to-r from-teal-400 to-teal-600 transition-all" style={{ width: `${pct}%` }} />
          </div>
          <ul className="mt-5 grid gap-2.5">
            {SETUP_CHECKLIST.map((c) => (
              <li key={c.id} className={`flex items-center justify-between rounded-xl px-4 py-3 ${
                c.done ? 'bg-emerald-50' : 'bg-amber-50'
              }`}>
                <span className="flex items-center gap-3 text-sm font-medium text-navy-800">
                  {c.done ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-amber-600" />
                  )}
                  {c.label}
                </span>
                {c.done ? (
                  <span className="text-xs font-semibold text-emerald-700">Complete</span>
                ) : (
                  <button className="text-xs font-semibold text-amber-700 hover:underline">Add now</button>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="card flex flex-col p-6">
          <h2 className="text-base font-bold text-navy-900">Patient-facing profile</h2>
          <p className="mt-1.5 text-sm text-navy-500">
            See exactly how international patients view your clinic before they send a request.
          </p>
          <div className="mt-4 flex-1 rounded-xl bg-gradient-to-br from-navy-50 to-teal-50 p-4 ring-1 ring-navy-100">
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">Preview</p>
            <p className="mt-1 text-sm font-bold text-navy-900">Sakura Family Clinic</p>
            <p className="text-xs text-navy-500">Internal Medicine · Minato</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <span className="chip bg-teal-50 text-teal-700">English-speaking doctor</span>
              <span className="chip bg-teal-50 text-teal-700">NHI accepted</span>
            </div>
          </div>
          <button className="btn-primary mt-4 w-full">
            Preview patient-facing clinic profile <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
