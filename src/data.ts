export type Experience = 'patient' | 'clinic';
export type Lang = 'en' | 'ja' | 'es';

export type ClinicEnglishSupport = 'english-speaking-doctor' | 'english-front-desk' | 'english-support-available';
export type PaymentMethod = 'nhi' | 'credit-card' | 'cash';

export interface Clinic {
  id: string;
  name: string;
  specialty: string;
  area: string;
  station: string;
  address: string;
  englishSupport: ClinicEnglishSupport;
  englishSupportLabel: string;
  payments: PaymentMethod[];
  appointmentRequired: boolean;
  description: string;
}

export type RequestStatus = 'new' | 'needs-follow-up' | 'confirmed' | 'resolved';
export type TimeWindow = 'morning' | 'afternoon' | 'evening';
export type ContactMethod = 'email' | 'phone' | 'whatsapp';

export interface AppointmentRequest {
  id: string;
  patientName: string;
  language: string;
  preferredDay: string;
  timeWindow: TimeWindow;
  nhiStatus: 'yes' | 'no' | 'not-sure';
  contactMethod: ContactMethod;
  note: string;
  status: RequestStatus;
  received: string;
}

export const CLINICS: Clinic[] = [
  {
    id: 'sakura',
    name: 'Sakura Family Clinic',
    specialty: 'Internal Medicine',
    area: 'Minato',
    station: 'Hiroo Station (3 min walk)',
    address: '2-14-7 Hiroo, Shibuya-ku, Tokyo',
    englishSupport: 'english-speaking-doctor',
    englishSupportLabel: 'English-speaking doctor',
    payments: ['nhi', 'credit-card'],
    appointmentRequired: false,
    description:
      'A calm, family-oriented clinic in central Tokyo offering general internal medicine with an English-speaking doctor on staff. We help international residents and visitors feel prepared before their visit.',
  },
  {
    id: 'smile-dental',
    name: 'Tokyo Smile Dental',
    specialty: 'Dentistry',
    area: 'Shibuya',
    station: 'Shibuya Station (8 min walk)',
    address: '1-22-3 Jinnan, Shibuya-ku, Tokyo',
    englishSupport: 'english-front-desk',
    englishSupportLabel: 'English-speaking front desk',
    payments: ['nhi', 'credit-card'],
    appointmentRequired: false,
    description:
      'Modern dental care in the heart of Shibuya. Our English-speaking front desk will guide you through every step, from your first request to your appointment confirmation.',
  },
  {
    id: 'harajuku-womens',
    name: "Harajuku Women's Clinic",
    specialty: "Women's Health",
    area: 'Shibuya',
    station: 'Harajuku Station (5 min walk)',
    address: '3-18-1 Jingumae, Shibuya-ku, Tokyo',
    englishSupport: 'english-support-available',
    englishSupportLabel: 'English support available',
    payments: ['nhi', 'credit-card', 'cash'],
    appointmentRequired: true,
    description:
      'A dedicated women\u2019s health clinic near Harajuku offering respectful, English-supported care. Appointments are required so we can prepare for your visit.',
  },
];

export const CLINIC_BY_ID: Record<string, Clinic> = Object.fromEntries(
  CLINICS.map((c) => [c.id, c]),
);

export const INITIAL_REQUESTS: AppointmentRequest[] = [
  {
    id: 'req-1',
    patientName: 'Alex M.',
    language: 'English',
    preferredDay: 'Tuesday',
    timeWindow: 'morning',
    nhiStatus: 'yes',
    contactMethod: 'email',
    note: 'I need help choosing a suitable appointment time. I am available weekday mornings.',
    status: 'new',
    received: '2 hours ago',
  },
  {
    id: 'req-2',
    patientName: 'Maria R.',
    language: 'Spanish',
    preferredDay: 'Thursday',
    timeWindow: 'afternoon',
    nhiStatus: 'no',
    contactMethod: 'whatsapp',
    note: 'I am visiting Tokyo for two weeks and do not have Japanese insurance. Please explain expected costs before confirmation.',
    status: 'needs-follow-up',
    received: '5 hours ago',
  },
  {
    id: 'req-3',
    patientName: 'Daniel K.',
    language: 'English',
    preferredDay: 'Friday',
    timeWindow: 'morning',
    nhiStatus: 'not-sure',
    contactMethod: 'phone',
    note: 'I just enrolled and am not sure if my card is active yet.',
    status: 'confirmed',
    received: 'Yesterday',
  },
  {
    id: 'req-4',
    patientName: 'Yuki T.',
    language: 'English',
    preferredDay: 'Monday',
    timeWindow: 'evening',
    nhiStatus: 'yes',
    contactMethod: 'email',
    note: 'Workdays are busy; evening appointments would be ideal.',
    status: 'new',
    received: 'Today',
  },
  {
    id: 'req-5',
    patientName: 'Priya S.',
    language: 'English',
    preferredDay: 'Wednesday',
    timeWindow: 'afternoon',
    nhiStatus: 'no',
    contactMethod: 'whatsapp',
    note: 'Traveling with my child; we may need two back-to-back slots.',
    status: 'needs-follow-up',
    received: 'Today',
  },
];

export const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  nhi: 'National Health Insurance',
  'credit-card': 'Credit cards',
  cash: 'Cash',
};

export const STATUS_META: Record<RequestStatus, { label: string; tone: string }> = {
  new: { label: 'New', tone: 'bg-teal-100 text-teal-800 ring-1 ring-teal-200' },
  'needs-follow-up': { label: 'Needs follow-up', tone: 'bg-amber-100 text-amber-800 ring-1 ring-amber-200' },
  confirmed: { label: 'Confirmed', tone: 'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200' },
  resolved: { label: 'Resolved', tone: 'bg-navy-100 text-navy-700 ring-1 ring-navy-200' },
};

export const TIME_WINDOW_LABELS: Record<TimeWindow, string> = {
  morning: 'Morning',
  afternoon: 'Afternoon',
  evening: 'Evening',
};

export const CONTACT_LABELS: Record<ContactMethod, string> = {
  email: 'Email',
  phone: 'Phone',
  whatsapp: 'WhatsApp',
};

export const NHI_LABELS: Record<AppointmentRequest['nhiStatus'], string> = {
  yes: 'Yes',
  no: 'No',
  'not-sure': 'Not sure',
};

export const MONTHLY_DATA = {
  months: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
  requests: [12, 18, 22, 26, 31, 38],
  confirmed: [8, 12, 15, 19, 23, 27],
  cancelled: [2, 3, 4, 4, 5, 6],
  languages: [
    { lang: 'English', count: 64 },
    { lang: 'Spanish', count: 18 },
    { lang: 'French', count: 9 },
    { lang: 'Chinese', count: 7 },
    { lang: 'Other', count: 5 },
  ],
};

export const SETUP_CHECKLIST = [
  { id: 'desc', label: 'English clinic description', done: true },
  { id: 'support', label: 'English-support level', done: true },
  { id: 'payment', label: 'Payment methods', done: true },
  { id: 'insurance', label: 'Insurance information', done: true },
  { id: 'directions', label: 'Directions from nearest station', done: true },
  { id: 'channel', label: 'Preferred request channel: Email / LINE', done: false },
];

export const CONFIRM_SLOTS = [
  { id: 's1', date: 'Tuesday, Aug 25', time: '9:30 AM' },
  { id: 's2', date: 'Tuesday, Aug 25', time: '11:00 AM' },
  { id: 's3', date: 'Wednesday, Aug 26', time: '2:00 PM' },
  { id: 's4', date: 'Thursday, Aug 27', time: '10:15 AM' },
  { id: 's5', date: 'Friday, Aug 28', time: '4:00 PM' },
];
