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
  { id: 'weekday-morning', day: 'Weekday morning', time: '09:00–12:00' },
  { id: 'weekday-afternoon', day: 'Weekday afternoon', time: '12:00–17:00' },
  { id: 'weekday-evening', day: 'Weekday evening', time: '17:00–19:00' },
  { id: 'flexible', day: 'I’m flexible', time: 'TokyoLuxe can suggest a time' },
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
