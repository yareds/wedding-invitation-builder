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
      primary: '#4A0E17',
      mid: '#721121',
      light: '#A31621',
      gold: '#D4AF37',
      goldLt: '#F3C969',
      goldPale: '#FFF7D6',
      blush: '#E5989B',
      blushLt: '#FFCDB2',
      blushPale: '#FDF0F3',
      bg: '#FFF0F3',
      footerBg: '#210206',
      heroOv: 'rgba(74,14,23,0.72)'
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
      gold: '#D4AF37',
      goldLt: '#E9C46A',
      goldPale: '#F4F1DE',
      blush: '#52B788',
      blushLt: '#74C69D',
      blushPale: '#D8F3DC',
      bg: '#EDF7F1',
      footerBg: '#081C15',
      heroOv: 'rgba(27,67,50,0.75)'
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
      gold: '#E8C96A',
      goldLt: '#F5E4A8',
      goldPale: '#FDF8E8',
      blush: '#A78BFA',
      blushLt: '#DDD6FE',
      blushPale: '#F5F3FF',
      bg: '#F8F7FF',
      footerBg: '#0D0820',
      heroOv: 'rgba(28,16,64,0.72)'
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
      gold: '#FCD34D',
      goldLt: '#FDE68A',
      goldPale: '#FFFBEB',
      blush: '#FCA5A5',
      blushLt: '#FECACA',
      blushPale: '#FFF5F5',
      bg: '#FFFAF5',
      footerBg: '#3D1206',
      heroOv: 'rgba(124,45,18,0.70)'
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
      gold: '#D4AF37',
      goldLt: '#F3E5AB',
      goldPale: '#FAF6E8',
      blush: '#C5A059',
      blushLt: '#E6C994',
      blushPale: '#FAF8F5',
      bg: '#FAF9F6',
      footerBg: '#111111',
      heroOv: 'rgba(26,26,26,0.75)'
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
      blush: '#D2B48C',
      blushLt: '#E6D7C3',
      blushPale: '#FAF5EF',
      bg: '#FAF5EF',
      footerBg: '#1A1918',
      heroOv: 'rgba(44,42,41,0.70)'
    }
  }
};

export const DEFAULT_WEDDING_CONFIG: WeddingConfig = {
  themeId: 'bordeaux',
  groomEth: 'የሙሽራው ስም',
  groomEn: 'Sebastian Thornton',
  brideEth: 'የሙሽሪት ስም',
  brideEn: 'Amara Grace',
  dateGC: 'Saturday, May 09, 2026',
  dateEC: 'ግንቦት 01, 2018 ዓ.ም',
  dayName: 'Saturday · ቅዳሜ',
  timeDisplay: 'ከቀኑ 8:00 (02:00 PM PST)',
  countdownDate: '2026-05-09T14:00:00',
  dressCode: 'Black-Tie Formal & Evening Gowns',
  churchEth: 'ካቴድራል ኦፍ ዘ ብለስድ ሳክራመንት',
  churchEn: 'Cathedral of the Blessed Sacrament, Sacramento',
  receptionEth: 'ሴንት ሄሌና ቪንያርድ ኤስቴት',
  receptionEn: 'St. Helena Vineyard Estate, Napa Valley',
  scripture: 'ሁሉን ያዘጋጀ ግን እግዚአብሔር ነው።',
  scriptureRef: 'ዕብራውያን 3፡4',
  storyText: 'Whatever our souls are made of, his and hers are the same. From Sacramento to the golden vineyards of Napa, our story has been a quiet symphony of trust, laughter, and infinite love.',
  phone1: '+251 911 234 567',
  phone2: '+251 922 888 999',
  whatsappNumber: '+251911234567',
  telegramUsername: 'wedding_invitation_order',
  emailContact: 'orders@weddingethiopia.com',
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
      location: 'Cathedral of the Blessed Sacrament',
      description: 'Nuptial mass, exchange of vows, and sacred musical performance.'
    },
    {
      time: '03:30 PM',
      title: 'Cathedral Steps Toast & Send-off',
      location: 'Cathedral Courtyard',
      description: 'Petal shower send-off and ceremonial brass fanfare as newlyweds depart.'
    },
    {
      time: '05:00 PM',
      title: 'Vineyard Cocktail Hour & Strings',
      location: 'St. Helena Winery Lawn',
      description: 'Artisanal charcuterie, vintage Napa wines, and live string quartet.'
    },
    {
      time: '06:30 PM',
      title: 'Grand Dinner & Wedding Speeches',
      location: 'Estate Glasshouse Pavilion',
      description: 'Three-course wine-paired dinner curated by Michelin-trained chefs.'
    },
    {
      time: '08:30 PM',
      title: 'First Dance & Celebration',
      location: 'Courtyard Terrace',
      description: 'Live 10-piece orchestra, custom cocktails, and late-night dessert bar.'
    }
  ],
  bankDetails: [
    {
      bankName: 'Telebirr SuperApp',
      accountName: 'Wedding Website Services',
      accountNumber: '0911234567'
    },
    {
      bankName: 'Commercial Bank of Ethiopia (CBE)',
      accountName: 'Wedding Services PLC',
      accountNumber: '1000123456789'
    }
  ]
};
