export type LuxeLang = 'en' | 'ja' | 'vi';

export type HousingGoal =
  | 'rent'
  | 'buy'
  | 'investment'
  | 'relocation';

export interface GoalOption {
  id: HousingGoal;
  title: string;
  desc: string;
}

export const GOAL_OPTIONS: GoalOption[] = [
  { id: 'rent', title: 'Rent a home', desc: 'Find a rental that fits your life in Japan.' },
  { id: 'buy', title: 'Buy a home', desc: 'Explore purchasing a property in Tokyo.' },
  { id: 'investment', title: 'Explore property investment', desc: 'Understand investment opportunities.' },
  { id: 'relocation', title: 'Relocation and settling-in support', desc: 'End-to-end help for your move.' },
];

export const TRUST_ROW = [
  'English, Japanese, Vietnamese, and Chinese support',
  'Clear guidance before your consultation',
  'No obligation to proceed',
];

export const TIMELINE_OPTIONS = [
  'Within 1 month',
  '1–3 months',
  '3–6 months',
  'Just researching',
];

export const HOUSEHOLD_OPTIONS = ['Just me', 'Couple', 'Family', 'Other'];
export const PET_OPTIONS = ['No', 'Yes', 'Planning to have one'];
export const SUPPORT_LANGUAGES = ['English', 'Japanese', 'Vietnamese', 'Chinese'];

export const BUDGET_OPTIONS = [
  'Under ¥100,000',
  '¥100,000–¥150,000',
  '¥150,000–¥200,000',
  '¥200,000+',
];

export const AREA_EXAMPLES = ['Shinjuku', 'Nakano', 'Kichijoji', 'Shinagawa'];

export const FURNISH_OPTIONS = ['Furnished', 'Unfurnished', 'Either is fine'];
export const SIZE_OPTIONS = ['Studio / 1K', '1LDK', '2LDK+', 'Not sure yet'];

export const LOCATION_OPTIONS = ['Already in Japan', 'Moving from overseas'];

export const VISA_OPTIONS = [
  'Already secured',
  'In process',
  'Need guidance',
  'Prefer to discuss',
];

export const INCOME_OPTIONS = ['Ready', 'Can prepare it', 'Need guidance'];

export const HELP_OPTIONS = [
  'Understanding the rental process',
  'Guarantor requirements',
  'Utilities and move-in setup',
  'SIM/mobile connectivity',
  'Healthcare and local services',
  'None of these yet',
];

export const CONSULTATION_SLOTS = [
  { id: 't1', day: 'Tuesday', time: '15:00' },
  { id: 't2', day: 'Wednesday', time: '11:30' },
  { id: 't3', day: 'Thursday', time: '18:00' },
];

export const NEXT_STEPS = [
  {
    id: 'mobal',
    title: 'Get connected in Japan',
    provider: 'Mobal',
    desc: 'Mobile connectivity and SIM setup for new arrivals.',
    icon: 'sim',
  },
  {
    id: 'healthcare',
    title: 'Prepare for healthcare in Japan',
    provider: 'GoGaijin Healthcare',
    desc: 'Find English-friendly clinics and understand insurance.',
    icon: 'heart',
  },
  {
    id: 'medic',
    title: 'Translation and medication-import support',
    provider: 'MedicTranslate',
    desc: 'Medical translation and continued-medication support.',
    icon: 'pill',
  },
];

export type LeadStatus =
  | 'consultation-booked'
  | 'review-needed'
  | 'needs-follow-up'
  | 'property-search';

export interface Lead {
  id: string;
  name: string;
  goal: string;
  budget: string;
  areas: string;
  status: LeadStatus;
  received: string;
  timeline: string;
  household: string;
  pets: string;
  language: string;
  visa: string;
  documentation: string;
  supportRequested: string[];
  notes: string;
}

export const LEAD_STATUS_META: Record<LeadStatus, { label: string; tone: string }> = {
  'consultation-booked': { label: 'Consultation booked', tone: 'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200' },
  'review-needed': { label: 'Review needed', tone: 'bg-gold-100 text-gold-800 ring-1 ring-gold-200' },
  'needs-follow-up': { label: 'Needs follow-up', tone: 'bg-terracotta-100 text-terracotta-800 ring-1 ring-terracotta-200' },
  'property-search': { label: 'Property search started', tone: 'bg-navy-100 text-navy-700 ring-1 ring-navy-200' },
};

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-1',
    name: 'Maria Rodriguez',
    goal: 'Rent',
    budget: '¥150k–¥200k',
    areas: 'Nakano / Kichijoji',
    status: 'consultation-booked',
    received: '1 hour ago',
    timeline: '1–3 months',
    household: 'Couple',
    pets: 'No',
    language: 'English',
    visa: 'Already secured',
    documentation: 'Ready',
    supportRequested: ['Guarantor requirements', 'Utilities and move-in setup', 'SIM/mobile connectivity'],
    notes: 'Moving with partner from Singapore. Works remotely. Flexible on furnishings.',
  },
  {
    id: 'lead-2',
    name: 'Daniel Chen',
    goal: 'Buy',
    budget: '¥60M–¥80M',
    areas: 'Meguro',
    status: 'review-needed',
    received: '3 hours ago',
    timeline: '3–6 months',
    household: 'Family',
    pets: 'Yes',
    language: 'English',
    visa: 'Already secured',
    documentation: 'Ready',
    supportRequested: ['Understanding the rental process', 'Healthcare and local services'],
    notes: 'Looking for a family home near international schools. Budget flexible for the right property.',
  },
  {
    id: 'lead-3',
    name: 'Sofia Nguyen',
    goal: 'Rent',
    budget: '¥100k–¥150k',
    areas: 'Shinjuku',
    status: 'needs-follow-up',
    received: 'Today',
    timeline: 'Within 1 month',
    household: 'Just me',
    pets: 'No',
    language: 'Vietnamese',
    visa: 'In process',
    documentation: 'Can prepare it',
    supportRequested: ['Guarantor requirements', 'SIM/mobile connectivity'],
    notes: 'Arriving next month from Vietnam. Needs help with guarantor and setting up utilities.',
  },
  {
    id: 'lead-4',
    name: 'Alex Martin',
    goal: 'Relocation support',
    budget: '—',
    areas: 'Tokyo',
    status: 'consultation-booked',
    received: 'Yesterday',
    timeline: '1–3 months',
    household: 'Couple',
    pets: 'Planning to have one',
    language: 'English',
    visa: 'Need guidance',
    documentation: 'Need guidance',
    supportRequested: ['Understanding the rental process', 'Utilities and move-in setup', 'Healthcare and local services'],
    notes: 'First time moving to Japan. Wants comprehensive settling-in support.',
  },
];

export const LUXE_METRICS = [
  { label: 'New housing plans', value: 12, icon: 'inbox', tone: 'bg-gold-100 text-gold-700' },
  { label: 'Consultations booked', value: 8, icon: 'check', tone: 'bg-emerald-100 text-emerald-700' },
  { label: 'High-readiness clients', value: 5, icon: 'star', tone: 'bg-navy-100 text-navy-700' },
  { label: 'Needs follow-up', value: 3, icon: 'alert', tone: 'bg-terracotta-100 text-terracotta-700' },
];

export const WORKFLOW_STEPS = [
  'GoGaijin Intake',
  'Client summary',
  'TokyoLuxe review',
  'Consultation',
  'Property search',
];

export const LUXE_REPORTING = {
  months: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
  plans: [8, 14, 19, 24, 28, 32],
  consultations: [4, 8, 11, 15, 19, 22],
  avgTimeSaved: [
    { label: 'Before GoGaijin', minutes: 35, tone: 'navy' },
    { label: 'With GoGaijin', minutes: 12, tone: 'gold' },
  ],
  supportAreas: [
    { area: 'Guarantor requirements', count: 28 },
    { area: 'Utilities setup', count: 22 },
    { area: 'SIM / mobile', count: 19 },
    { area: 'Rental process', count: 16 },
    { area: 'Healthcare', count: 11 },
  ],
  languages: [
    { lang: 'English', count: 58 },
    { lang: 'Vietnamese', count: 21 },
    { lang: 'Japanese', count: 14 },
    { lang: 'Chinese', count: 9 },
  ],
};

export const VALUE_BULLETS = [
  'Replaces vague contact-form messages with structured housing briefs',
  'Prepares foreign clients before the first conversation',
  'Reduces repetitive qualification work',
  'Gives TokyoLuxe clearer context before each consultation',
  'Creates a guided path to useful partner services after housing',
];

export const SETUP_CHECKLIST_LUXE = [
  { id: 'profile', label: 'TokyoLuxe profile complete', done: true },
  { id: 'languages', label: 'Languages and service areas added', done: true },
  { id: 'intake', label: 'Intake questions customized', done: true },
  { id: 'calendar', label: 'Calendar connection placeholder', done: true },
  { id: 'routing', label: 'Preferred inquiry routing selected', done: true },
  { id: 'resources', label: 'Optional GoGaijin move-in resources selected', done: false },
];

export const DASHBOARD_FOOTER_LINE =
  'GoGaijin becomes TokyoLuxe\u2019s multilingual front door: guiding clients before the consultation and delivering a clearer, more qualified first conversation.';
