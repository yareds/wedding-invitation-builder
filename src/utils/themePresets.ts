import { ThemeId, ThemeColors, WeddingConfig, BankDetail } from '../types';

export interface ThemePreset {
  id: ThemeId;
  name: string;
  themeStyle: string;
  description: string;
  colors: ThemeColors;
}

export const THEME_PRESETS: Record<ThemeId, ThemePreset> = {
  bordeaux: {
    id: 'bordeaux',
    name: 'Bordeaux Burgundy',
    themeStyle: 'Royal Imperial',
    description: 'Deep imperial wine, crown crests, and velvet rose gold romance.',
    colors: {
      primary: '#59102e',
      mid: '#721121',
      light: '#A31621',
      gold: '#C8A84B',
      goldLt: '#F3C969',
      goldPale: '#FFF7D6',
      blush: '#B85B75',
      blushLt: '#E5A4B5',
      blushPale: '#FAF0F3',
      bg: '#FAF4F6',
      footerBg: '#FAF0F3',
      heroOv: 'rgba(89,16,46,0.55)'
    }
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald Forest',
    themeStyle: 'Botanical Garden',
    description: 'Lush forest emerald, sage eucalyptus leaves, and warm golden foliage.',
    colors: {
      primary: '#1B4332',
      mid: '#2D6A4F',
      light: '#40916C',
      gold: '#C8A84B',
      goldLt: '#E9C46A',
      goldPale: '#F4F1DE',
      blush: '#40916C',
      blushLt: '#74C69D',
      blushPale: '#D8F3DC',
      bg: '#F4FAF6',
      footerBg: '#EDF7F1',
      heroOv: 'rgba(27,67,50,0.55)'
    }
  },
  midnight: {
    id: 'midnight',
    name: 'Royal Midnight',
    themeStyle: 'Celestial Starlit',
    description: 'Deep violet, twilight indigo, and glowing gold accents.',
    colors: {
      primary: '#1C1040',
      mid: '#2E1D6B',
      light: '#4A35A0',
      gold: '#C8A84B',
      goldLt: '#F5E4A8',
      goldPale: '#FDF8E8',
      blush: '#8B5CF6',
      blushLt: '#DDD6FE',
      blushPale: '#F5F3FF',
      bg: '#FAFAFF',
      footerBg: '#F5F3FF',
      heroOv: 'rgba(28,16,64,0.55)'
    }
  },
  rosegarden: {
    id: 'rosegarden',
    name: 'Amber Rust',
    themeStyle: 'Vintage Terracotta',
    description: 'Warm terracotta, amber gold, and romantic blush tone.',
    colors: {
      primary: '#7C2D12',
      mid: '#9A3412',
      light: '#C2410C',
      gold: '#C8A84B',
      goldLt: '#FDE68A',
      goldPale: '#FFFBEB',
      blush: '#E11D48',
      blushLt: '#FECACA',
      blushPale: '#FFF5F5',
      bg: '#FFFBF7',
      footerBg: '#FFF5F5',
      heroOv: 'rgba(124,45,18,0.55)'
    }
  },
  goldluxury: {
    id: 'goldluxury',
    name: 'Obsidian & Gold',
    themeStyle: 'Black Tie Glamour',
    description: 'Ultra-luxurious obsidian black paired with high-contrast champagne gold.',
    colors: {
      primary: '#1A1A1A',
      mid: '#2D2D2D',
      light: '#4A4A4A',
      gold: '#C8A84B',
      goldLt: '#F3E5AB',
      goldPale: '#FAF6E8',
      blush: '#B88E2B',
      blushLt: '#E6C994',
      blushPale: '#FAF8F5',
      bg: '#FAFAFA',
      footerBg: '#FAF8F5',
      heroOv: 'rgba(26,26,26,0.55)'
    }
  },
  classicivory: {
    id: 'classicivory',
    name: 'Ivory & Warm Gold',
    themeStyle: 'Traditional Minimalist',
    description: 'Timeless ivory elegance, warm cream undertones, and regal gold trim.',
    colors: {
      primary: '#2C2A29',
      mid: '#423E3C',
      light: '#615C59',
      gold: '#B8860B',
      goldLt: '#DAA520',
      goldPale: '#FFF8DC',
      blush: '#A88352',
      blushLt: '#E6D7C3',
      blushPale: '#FAF5EF',
      bg: '#FAF8F5',
      footerBg: '#FAF5EF',
      heroOv: 'rgba(44,42,41,0.55)'
    }
  }
};

export const DEFAULT_WEDDING_CONFIG: WeddingConfig = {
  themeId: 'bordeaux',
  groomEth: '',
  groomEn: '',
  brideEth: '',
  brideEn: '',
  dateGC: '',
  dateEC: '',
  dayName: 'Saturday · ቅዳሜ',
  timeDisplay: 'ከቀኑ 8:00 (02:00 PM PST)',
  countdownDate: '2026-05-09T14:00:00',
  dressCode: 'Black-Tie Formal & Evening Gowns',
  churchEth: '',
  churchEn: '',
  receptionEth: '',
  receptionEn: '',
  scripture: '',
  scriptureRef: '',
  storyText: 'Whatever our souls are made of, his and hers are the same. Our story has been a quiet symphony of trust, laughter, and infinite love.',
  phone1: '+15714749554',
  phone2: '0995967804',
  whatsappNumber: '+15714749554',
  telegramUsername: 'yared_abegaz',
  emailContact: 'yared.abegaz@gmail.com',
  rsvpDeadlineEn: 'April 01, 2026',
  rsvpDeadlineEth: 'መጋቢት 23, 2018 ዓ.ም',
  rsvpMethod: 'direct',
  sheetsUrl: '',
  heroImg: null,
  bgMusicUrl: null,
  galleryImgs: [
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80'
  ],
  schedule: [
    {
      time: '02:00 PM',
      title: 'Holy Matrimony Ceremony',
      location: 'Cathedral / Church',
      description: 'Nuptial mass, exchange of vows, and sacred musical performance.'
    },
    {
      time: '05:00 PM',
      title: 'Reception & Grand Celebration',
      location: 'Reception Hall / Resort',
      description: 'Grand dinner, wine toast, wedding speeches, and dancing.'
    }
  ],
  bankDetails: [
    {
      bankName: 'Telebirr SuperApp',
      accountName: 'Yared Abegaz',
      accountNumber: '0995967804'
    },
    {
      bankName: 'Commercial Bank of Ethiopia (CBE)',
      accountName: 'Yared Abegaz',
      accountNumber: '1000450356817'
    }
  ]
};

export const SAMPLE_WEDDING_CONFIG: WeddingConfig = {
  ...DEFAULT_WEDDING_CONFIG,
  groomEth: 'ሰባስቲያን',
  groomEn: 'Sebastian Thornton',
  brideEth: 'አማራ',
  brideEn: 'Amara Grace',
  dateGC: 'Saturday, May 09, 2026',
  dateEC: 'ግንቦት 01, 2018 ዓ.ም',
  churchEth: 'ካቴድራል ኦፍ ዘ ብለስድ ሳክራመንት',
  churchEn: 'Cathedral of the Blessed Sacrament, Sacramento',
  receptionEth: 'ሴንት ሄሌና ቪንያርድ ኤስቴት',
  receptionEn: 'St. Helena Vineyard Estate, Napa Valley',
  phone1: '+251 911 234 567',
  phone2: '+251 922 888 999'
};
