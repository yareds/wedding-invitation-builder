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
  timeDisplay: 'ከቀኑ 7:30 (01:30 PM EAT)',
  countdownDate: '2026-05-09T13:30:00',
  dressCode: 'Traditional Habesha Attire / Black-Tie Formal (የባህል ልብስ ወይም ፎርማል)',
  churchEth: '',
  churchEn: '',
  receptionEth: '',
  receptionEn: '',
  scripture: '“ስለዚህ ሰው አባቱንና እናቱን ይተዋል፥ ከሚስቱም ጋር ይተባበራል፥ ሁለቱም አንድ ሥጋ ይሆናሉ።”',
  scriptureRef: 'የማቴዎስ ወንጌል 19፥6',
  storyText: 'በእምነት እና በፍቅር የተሳሰረ ጉዟችን ዛሬ በአንድነት አምሮ ደምቋል። From our first meeting in Addis Ababa to this blessed covenant, our journey has been filled with faith, shared laughter, and unconditional love.',
  phone1: '+251 91 123 4567',
  phone2: '+251 92 234 5678',
  whatsappNumber: '+251 91 123 4567',
  telegramUsername: 'AddisWedding2026',
  emailContact: 'dawit.selamawit.wedding@gmail.com',
  rsvpDeadlineEn: 'April 25, 2026',
  rsvpDeadlineEth: 'ሚያዝያ 17, 2018 ዓ.ም',
  rsvpMethod: 'direct',
  sheetsUrl: '',
  heroImg: null,
  bgMusicUrl: null,
  galleryImgs: [
    'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80'
  ],
  schedule: [
    {
      time: '01:30 PM',
      title: 'የተቀደሰ የጋብቻ ሥነ-ሥርዓት (Holy Matrimony)',
      location: 'ቅድስት ሥላሴ ካቴድራል (Holy Trinity Cathedral, Addis Ababa)',
      description: 'የኪዳን ጸሎት፣ የጋብቻ ቀለበት ማሰር እና የቅዳሴ ቡራኬ ሥነ-ሥርዓት።'
    },
    {
      time: '04:30 PM',
      title: 'የሰርግ ድግስ እና አቀባበል (Grand Reception & Dinner)',
      location: 'ሼራተን አዲስ ግራንድ ቦልሩም (Sheraton Addis Grand Ballroom)',
      description: 'የክብር ሻምፓኝ፣ የባህል ድግስ፣ የሠርግ ኬክ መቁረጥ እና የሙዚቃ ድግስ።'
    },
    {
      time: '08:00 PM',
      title: 'የእስክስታ እና ዳንስ ጭፈራ (Cultural Eskista & Dance)',
      location: 'ሼራተን አዲስ (Sheraton Addis)',
      description: 'ከቤተሰብ እና ከወዳጅ ዘመድ ጋር የደመቀ ባህላዊ ጭፈራ እና የመልስ ድግስ።'
    }
  ],
  bankDetails: [
    {
      bankName: 'Telebirr (ቴሌብር)',
      accountName: 'Dawit Tesfaye / Selamawit Bekele',
      accountNumber: '0911234567'
    },
    {
      bankName: 'Commercial Bank of Ethiopia (CBE / የኢትዮጵያ ንግድ ባንክ)',
      accountName: 'Dawit Tesfaye & Selamawit Bekele',
      accountNumber: '1000450356817'
    },
    {
      bankName: 'Awash Bank (አዋሽ ባንክ)',
      accountName: 'Dawit Tesfaye / Selamawit Bekele',
      accountNumber: '01304123456700'
    }
  ]
};

export const SAMPLE_WEDDING_CONFIG: WeddingConfig = {
  ...DEFAULT_WEDDING_CONFIG,
  groomEth: 'ዳዊት',
  groomEn: 'Dawit Tesfaye',
  brideEth: 'ሰላማዊት',
  brideEn: 'Selamawit Bekele',
  dateGC: 'Saturday, May 09, 2026',
  dateEC: 'ግንቦት 01, 2018 ዓ.ም',
  churchEth: 'ቅድስት ሥላሴ ካቴድራል፤ አዲስ አበባ',
  churchEn: 'Holy Trinity Cathedral, Addis Ababa',
  receptionEth: 'ሼራተን አዲስ ላግዠሪ ሆቴል (ግራንድ ቦልሩም)',
  receptionEn: 'Sheraton Addis Luxury Collection Grand Ballroom, Addis Ababa',
  phone1: '+251 91 123 4567',
  phone2: '+251 92 234 5678'
};
