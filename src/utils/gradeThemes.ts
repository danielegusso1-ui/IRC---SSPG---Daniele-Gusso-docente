import { GradeId, ResourceType } from '../types/irc';

export interface GradeTheme {
  id: GradeId;
  label: string;
  shortLabel: string;
  subtitle: string;
  focusArea: string;
  primaryHex: string;
  secondaryHex: string;
  accentBg: string;
  accentBgHover: string;
  accentText: string;
  accentBorder: string;
  softSurface: string;
  softBorder: string;
  ringFocus: string;
  tabActive: string;
  gradientBanner: string;
}

export const GRADE_THEMES: Record<GradeId, GradeTheme> = {
  '1': {
    id: '1',
    label: 'Classe Prima',
    shortLabel: '1ª Media',
    subtitle: 'Origini, Bibbia, Ebraismo e primi simboli cristiani',
    focusArea: 'Alle radici della fede e della storia biblica',
    primaryHex: '#10B981',
    secondaryHex: '#0D9488',
    accentBg: 'bg-emerald-600',
    accentBgHover: 'hover:bg-emerald-700',
    accentText: 'text-emerald-700',
    accentBorder: 'border-emerald-600',
    softSurface: 'bg-emerald-50/70',
    softBorder: 'border-emerald-200',
    ringFocus: 'focus-visible:ring-emerald-600',
    tabActive: 'bg-emerald-600 text-white',
    gradientBanner: 'from-emerald-600 to-teal-600',
  },
  '2': {
    id: '2',
    label: 'Classe Seconda',
    shortLabel: '2ª Media',
    subtitle: 'Gesù nella storia, il Vangelo e il cammino della Chiesa',
    focusArea: 'Il messaggio evangelico e la storia cristiana',
    primaryHex: '#3B82F6',
    secondaryHex: '#4F46E5',
    accentBg: 'bg-blue-600',
    accentBgHover: 'hover:bg-blue-700',
    accentText: 'text-blue-700',
    accentBorder: 'border-blue-600',
    softSurface: 'bg-blue-50/70',
    softBorder: 'border-blue-200',
    ringFocus: 'focus-visible:ring-blue-600',
    tabActive: 'bg-blue-600 text-white',
    gradientBanner: 'from-blue-600 to-indigo-600',
  },
  '3': {
    id: '3',
    label: 'Classe Terza',
    shortLabel: '3ª Media',
    subtitle: 'Grandi religioni, scelte etiche, dialogo e pace',
    focusArea: 'Religioni del mondo, coscienza e cittadinanza',
    primaryHex: '#F59E0B',
    secondaryHex: '#EA580C',
    accentBg: 'bg-amber-600',
    accentBgHover: 'hover:bg-amber-700',
    accentText: 'text-amber-700',
    accentBorder: 'border-amber-600',
    softSurface: 'bg-amber-50/70',
    softBorder: 'border-amber-200',
    ringFocus: 'focus-visible:ring-amber-600',
    tabActive: 'bg-amber-600 text-white',
    gradientBanner: 'from-amber-500 to-orange-600',
  },
};

export const RESOURCE_TYPE_META: Record<
  ResourceType,
  { label: string; shortLabel: string; actionLabel: string; supportsLim: boolean }
> = {
  document: {
    label: 'Documentazione (PDF / Schede)',
    shortLabel: 'Documentazione',
    actionLabel: 'Apri scheda',
    supportsLim: true,
  },
  activity: {
    label: 'Attività per gli alunni',
    shortLabel: 'Attività',
    actionLabel: 'Svolgi attività',
    supportsLim: true,
  },
  image: {
    label: 'Immagini (Opere e Mappe)',
    shortLabel: 'Immagine',
    actionLabel: 'Ingrandisci immagine',
    supportsLim: true,
  },
  video: {
    label: 'Video (YouTube / Lezioni)',
    shortLabel: 'Video',
    actionLabel: 'Guarda video',
    supportsLim: false,
  },
  link: {
    label: 'Link Web (Siti selezionati)',
    shortLabel: 'Link Web',
    actionLabel: 'Visita sito',
    supportsLim: false,
  },
};

export const PRESET_IMAGES = [
  {
    label: 'Codice miniato e rotolo della Bibbia',
    url: '/src/assets/images/bibbia_codice_miniato_1795260414100.jpg',
  },
  {
    label: 'Sinagoga storica con Menorah',
    url: '/src/assets/images/sinagoga_menorah_1795260414066.jpg',
  },
  {
    label: 'Mosaico paleocristiano (colomba e ulivo)',
    url: '/src/assets/images/mosaico_arte_sacra_1795260414693.jpg',
  },
  {
    label: 'Villaggio della Galilea nel I secolo',
    url: '/src/assets/images/gerusalemme_antica_1795260415276.jpg',
  },
  {
    label: 'Chiostro medievale romanico',
    url: '/src/assets/images/chiesa_romanica_chiostro_1795260414033.jpg',
  },
  {
    label: 'Cortile del dialogo e della pace',
    url: '/src/assets/images/dialogo_religioni_pace_1795260415429.jpg',
  },
];
