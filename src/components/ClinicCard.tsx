import { CreditCard, Wallet, Stethoscope, MapPin, Languages, CheckCircle2 } from 'lucide-react';
import type { Clinic, PaymentMethod } from '@/data';
import { PAYMENT_LABELS } from '@/data';

const paymentIcon: Record<PaymentMethod, typeof CreditCard> = {
  nhi: Wallet,
  'credit-card': CreditCard,
  cash: Wallet,
};

export function ClinicCard({ clinic, onOpen }: { clinic: Clinic; onOpen: () => void }) {
  return (
    <article className="card group flex flex-col gap-4 p-5 transition-all hover:shadow-soft hover:ring-navy-200">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-navy-900">{clinic.name}</h3>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-navy-500">
            <span className="inline-flex items-center gap-1">
              <Stethoscope className="h-3.5 w-3.5 text-teal-600" />
              {clinic.specialty}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-teal-600" />
              {clinic.area}
            </span>
          </div>
        </div>
        {clinic.appointmentRequired && (
          <span className="badge bg-navy-50 text-navy-600 ring-1 ring-navy-100">Appointment required</span>
        )}
      </div>

      <div className="flex items-center gap-2 text-sm">
        <Languages className="h-4 w-4 text-teal-600" />
        <span className="font-medium text-navy-700">{clinic.englishSupportLabel}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {clinic.payments.map((p) => {
          const Icon = paymentIcon[p];
          return (
            <span
              key={p}
              className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-800 ring-1 ring-teal-100"
            >
              <Icon className="h-3.5 w-3.5" />
              {PAYMENT_LABELS[p]}
            </span>
          );
        })}
      </div>

      <button
        onClick={onOpen}
        className="btn-primary mt-1 w-full"
      >
        Request appointment
      </button>
    </article>
  );
}

export function EnglishBadge({ label }: { label: string }) {
  return (
    <span className="badge bg-teal-50 text-teal-800 ring-1 ring-teal-100">
      <CheckCircle2 className="h-3.5 w-3.5" />
      {label}
    </span>
  );
}
