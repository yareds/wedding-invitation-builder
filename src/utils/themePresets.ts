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
    name: 'Royal Burgundy',
    themeStyle: 'Regal, Romantic & Timeless',
    description: 'Deep imperial maroon, gold crests, and velvet rose gold elegance.',
    colors: {
      primary: '#5A0A21',
      mid: '#781230',
      light: '#A31621',
      gold: '#C8A84B',
      goldLt: '#E2C873',
      goldPale: '#FFF8E7',
      blush: '#C86D84',
      blushLt: '#E59EAF',
      blushPale: '#FAD2D8',
      bg: '#FAF4F6',
      footerBg: '#FAF0F3',
      heroOv: 'rgba(90,10,33,0.55)'
    }
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald Garden',
    themeStyle: 'Fresh, Elegant & Botanical',
    description: 'Lush forest emerald green, sage eucalyptus, and warm golden foliage.',
    colors: {
      primary: '#1B4332',
      mid: '#2D6A4F',
      light: '#40916C',
      gold: '#C8A84B',
      goldLt: '#E9C46A',
      goldPale: '#F7F3E9',
      blush: '#74967E',
      blushLt: '#A3C1AB',
      blushPale: '#F5EBE1',
      bg: '#F5FAF7',
      footerBg: '#EEF7F2',
      heroOv: 'rgba(27,67,50,0.55)'
    }
  },
  rosegarden: {
    id: 'rosegarden',
    name: 'Rose Gold',
    themeStyle: 'Soft, Modern & Romantic',
    description: 'Soft dusty rose, champagne gold accents, and delicate botanical petals.',
    colors: {
      primary: '#7A223B',
      mid: '#9B3A55',
      light: '#B84566',
      gold: '#C8A84B',
      goldLt: '#F2D07E',
      goldPale: '#FFF5E5',
      blush: '#D67584',
      blushLt: '#F8BFCB',
      blushPale: '#F9D9D2',
      bg: '#FFF8F8',
      footerBg: '#FFF0F2',
      heroOv: 'rgba(122,34,59,0.55)'
    }
  },
  midnight: {
    id: 'midnight',
    name: 'Midnight Blue',
    themeStyle: 'Dramatic, Enchanting & Starlit',
    description: 'Deep starlit midnight blue, sapphire twilight, and glowing gold embellishments.',
    colors: {
      primary: '#0F1E36',
      mid: '#1F375B',
      light: '#2E4E7E',
      gold: '#C8A84B',
      goldLt: '#F5E4A8',
      goldPale: '#F8F6EF',
      blush: '#4A607A',
      blushLt: '#8B9EBA',
      blushPale: '#D8D3D6',
      bg: '#F4F7FB',
      footerBg: '#EBF1F8',
      heroOv: 'rgba(15,30,54,0.60)'
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
  },
  sapphire: {
    id: 'sapphire',
    name: 'Royal Sapphire',
    themeStyle: 'Regal Jewel & Rich Azure',
    description: 'Majestic deep sapphire blue, iced cerulean undertones, and shimmering royal gold.',
    colors: {
      primary: '#0A2540',
      mid: '#143E6D',
      light: '#1E5899',
      gold: '#D4AF37',
      goldLt: '#F2DF9B',
      goldPale: '#FBF8EF',
      blush: '#3E789B',
      blushLt: '#82B7D6',
      blushPale: '#EAF3F9',
      bg: '#F3F7FB',
      footerBg: '#E7F0F7',
      heroOv: 'rgba(10,37,64,0.60)'
    }
  },
  amethyst: {
    id: 'amethyst',
    name: 'Imperial Amethyst',
    themeStyle: 'Mystic Violet & Royal Glamour',
    description: 'Deep imperial purple, velvety amethyst twilight, and glowing antique gold.',
    colors: {
      primary: '#380E3B',
      mid: '#551959',
      light: '#7A2880',
      gold: '#CCA43B',
      goldLt: '#E9C86A',
      goldPale: '#FAF5E8',
      blush: '#965798',
      blushLt: '#CB98CC',
      blushPale: '#F6ECF7',
      bg: '#FAF5FA',
      footerBg: '#F3E8F4',
      heroOv: 'rgba(56,14,59,0.58)'
    }
  },
  rubyvelvet: {
    id: 'rubyvelvet',
    name: 'Crimson Ruby',
    themeStyle: 'Passionate Crimson & Garnet',
    description: 'Dramatic scarlet ruby red and rich garnet, illuminated by brilliant gold accents.',
    colors: {
      primary: '#6D0714',
      mid: '#911020',
      light: '#B81C30',
      gold: '#CCA43B',
      goldLt: '#E8C56D',
      goldPale: '#FAF4E8',
      blush: '#BA4E5D',
      blushLt: '#E3939F',
      blushPale: '#FCEAEB',
      bg: '#FCF5F6',
      footerBg: '#F8E8EA',
      heroOv: 'rgba(109,7,20,0.58)'
    }
  },
  lavender: {
    id: 'lavender',
    name: 'Lavender Mist',
    themeStyle: 'Ethereal Pastel & Soft Lilac',
    description: 'Delicate French lilac, whimsical lavender mist, and subtle champagne highlights.',
    colors: {
      primary: '#423752',
      mid: '#5E4E75',
      light: '#816D9E',
      gold: '#C49F52',
      goldLt: '#E5C989',
      goldPale: '#FAF6EE',
      blush: '#A68CBF',
      blushLt: '#CEBCDF',
      blushPale: '#F3EDF8',
      bg: '#F8F6FA',
      footerBg: '#EFEAF4',
      heroOv: 'rgba(66,55,82,0.52)'
    }
  },
  sagemint: {
    id: 'sagemint',
    name: 'Sage & Eucalyptus',
    themeStyle: 'Soft Pastel Meadow',
    description: 'Gentle pale sage, frosted mint leaves, and soft cream gold for an organic garden feel.',
    colors: {
      primary: '#243F31',
      mid: '#385F4B',
      light: '#538268',
      gold: '#C0A050',
      goldLt: '#E0C782',
      goldPale: '#F7F5EC',
      blush: '#7FA38B',
      blushLt: '#B0CCA9',
      blushPale: '#E8F2EB',
      bg: '#F3F7F4',
      footerBg: '#E8F0EA',
      heroOv: 'rgba(36,63,49,0.52)'
    }
  },
  peachblossom: {
    id: 'peachblossom',
    name: 'Peach Blossom',
    themeStyle: 'Warm Coral & Gentle Peach',
    description: 'Sweet apricot peach and warm pastel coral accented with sunny yellow gold.',
    colors: {
      primary: '#63281B',
      mid: '#8C3B29',
      light: '#B8533D',
      gold: '#C99E42',
      goldLt: '#EDC572',
      goldPale: '#FAF3E3',
      blush: '#DE8068',
      blushLt: '#F3B09E',
      blushPale: '#FBE8E3',
      bg: '#FFF8F5',
      footerBg: '#FAEDE7',
      heroOv: 'rgba(99,40,27,0.52)'
    }
  },
  terracotta: {
    id: 'terracotta',
    name: 'Tuscan Terracotta',
    themeStyle: 'Sunbaked Earth & Warm Clay',
    description: 'Rich earthy terracotta, warm rust clay, and rustic burnished gold for bohemian warmth.',
    colors: {
      primary: '#562113',
      mid: '#7C3420',
      light: '#A6482F',
      gold: '#C48D34',
      goldLt: '#E4B15F',
      goldPale: '#FAF0DE',
      blush: '#B6664C',
      blushLt: '#DC9680',
      blushPale: '#F6E5E0',
      bg: '#FAF3EE',
      footerBg: '#F3E7DF',
      heroOv: 'rgba(86,33,19,0.58)'
    }
  },
  olivebronze: {
    id: 'olivebronze',
    name: 'Olive & Antique Bronze',
    themeStyle: 'Mediterranean Warm Earth',
    description: 'Deep Mediterranean olive, warm khaki foliage, and weathered antique bronze.',
    colors: {
      primary: '#353418',
      mid: '#4E4D26',
      light: '#6E6C36',
      gold: '#B58732',
      goldLt: '#D7AE5F',
      goldPale: '#FAF4E8',
      blush: '#877E4C',
      blushLt: '#B8AF7F',
      blushPale: '#EFECE0',
      bg: '#F8F6EE',
      footerBg: '#EEEADB',
      heroOv: 'rgba(53,52,24,0.55)'
    }
  },
  desertsand: {
    id: 'desertsand',
    name: 'Desert Sand & Sienna',
    themeStyle: 'Golden Dune & Warm Caramel',
    description: 'Warm desert dunes, toasted sienna, and honeyed amber gold accents.',
    colors: {
      primary: '#472E16',
      mid: '#6C4824',
      light: '#946534',
      gold: '#C48E34',
      goldLt: '#E6B45E',
      goldPale: '#FAF2E1',
      blush: '#AD7644',
      blushLt: '#D7A478',
      blushPale: '#F5EAE0',
      bg: '#F9F5EE',
      footerBg: '#F1E9DB',
      heroOv: 'rgba(71,46,22,0.55)'
    }
  },
  slateplatinum: {
    id: 'slateplatinum',
    name: 'Slate & Platinum',
    themeStyle: 'Cool Architectural Neutral',
    description: 'Understated cool slate, crisp platinum gray, and pale champagne accents.',
    colors: {
      primary: '#1A2026',
      mid: '#2F3942',
      light: '#4C5A68',
      gold: '#BA9B4F',
      goldLt: '#D9BE78',
      goldPale: '#F5F5EE',
      blush: '#657685',
      blushLt: '#9BAAB7',
      blushPale: '#E5EBF0',
      bg: '#F3F5F7',
      footerBg: '#E8ECF0',
      heroOv: 'rgba(26,32,38,0.58)'
    }
  },
  espressopearl: {
    id: 'espressopearl',
    name: 'Espresso & Pearl',
    themeStyle: 'Rich Warm Mocha & Cream',
    description: 'Deep espresso roast, velvety mocha, and luminous pearl beige tones.',
    colors: {
      primary: '#261A14',
      mid: '#402E24',
      light: '#654B3B',
      gold: '#BF9240',
      goldLt: '#DFB76B',
      goldPale: '#FAF4E8',
      blush: '#906E5A',
      blushLt: '#C2A799',
      blushPale: '#EFE5DF',
      bg: '#FAF6F2',
      footerBg: '#F0E8E0',
      heroOv: 'rgba(38,26,20,0.58)'
    }
  },
  marigold: {
    id: 'marigold',
    name: 'Saffron Marigold',
    themeStyle: 'Vibrant Sunset & Royal Spices',
    description: 'Dazzling sunset marigold, rich saffron spice, and deep mahogany gold.',
    colors: {
      primary: '#5B1E07',
      mid: '#842D0B',
      light: '#B24114',
      gold: '#D47D14',
      goldLt: '#F1A23D',
      goldPale: '#FEF3E2',
      blush: '#D95E20',
      blushLt: '#F19565',
      blushPale: '#FCE7DB',
      bg: '#FFF8F0',
      footerBg: '#FDEEE0',
      heroOv: 'rgba(91,30,7,0.58)'
    }
  },
  peacockteal: {
    id: 'peacockteal',
    name: 'Peacock & Deep Teal',
    themeStyle: 'Luminescent Marine Jewel',
    description: 'Striking deep peacock ocean teal, turquoise highlights, and brilliant bright gold.',
    colors: {
      primary: '#083538',
      mid: '#0F4E54',
      light: '#1A7077',
      gold: '#C99B34',
      goldLt: '#E7BC60',
      goldPale: '#F9F5E8',
      blush: '#298188',
      blushLt: '#65BAC1',
      blushPale: '#DEF1F3',
      bg: '#F1F7F8',
      footerBg: '#E2EFF1',
      heroOv: 'rgba(8,53,56,0.58)'
    }
  },
  electricviolet: {
    id: 'electricviolet',
    name: 'Neon Orchid & Copper',
    themeStyle: 'Modern Avant-Garde Glam',
    description: 'Vibrant magenta orchid, deep midnight grape, and warm burnished copper.',
    colors: {
      primary: '#3C0B2D',
      mid: '#5D1446',
      light: '#892167',
      gold: '#C27538',
      goldLt: '#E09961',
      goldPale: '#FAF0E6',
      blush: '#B32C87',
      blushLt: '#DD62B4',
      blushPale: '#FBE5F4',
      bg: '#FAF3F8',
      footerBg: '#F3E6F0',
      heroOv: 'rgba(60,11,45,0.58)'
    }
  }
};

export const DEFAULT_WEDDING_CONFIG: WeddingConfig = {
  themeId: 'bordeaux',
  frameStyle: 'royal-luxury',
  groomEth: '',
  groomEn: '',
  brideEth: '',
  brideEn: '',
  dateGC: '',
  dateEC: '',
  dayName: 'Saturday · ቅዳሜ',
  timeDisplay: 'ከቀኑ 7:30 (01:30 PM EAT)',
  countdownDate: '2026-05-09T13:30:00',
  churchEth: '',
  churchEn: '',
  receptionEth: '',
  receptionEn: '',
  scripture: '“ስለዚህ ሰው አባቱንና እናቱን ይተዋል፥ ከሚስቱም ጋር ይተባበራል፥ ሁለቱም አንድ ሥጋ ይሆናሉ።”',
  scriptureRef: 'የማቴዎስ ወንጌል 19፥6',
  storyText: 'በእምነት እና በፍቅር የተሳሰረ ጉዟችን ዛሬ በአንድነት አምሮ ደምቋል። From our first meeting in Addis Ababa to this blessed covenant, our journey has been filled with faith, shared laughter, and unconditional love.',
  contactInfo: '',
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
      time: '7:00 – 8:00',
      title: 'አጃቢዎች በሙሽራው ቤት ይገኛሉ',
      location: "Groom's Residence / የሙሽራው ቤት",
      description: "Groomsmen Gather at Groom's Home"
    },
    {
      time: '9:00 – 9:30',
      title: 'ጉዞ ወደ ሙሽሪት ቤት (አድራሻ)',
      location: "Bride's Residence / የሙሽሪት ቤት",
      description: "Travel to Bride's Home"
    },
    {
      time: '10:30 – 12:00',
      title: 'የቃልኪዳን ስነስርዓት (ቅድስት ሥላሴ ካቴድራል)',
      location: 'ቅድስት ሥላሴ ካቴድራል (Holy Trinity Cathedral, Addis Ababa)',
      description: 'Vows & Worship Program'
    },
    {
      time: '1:00 – 2:30',
      title: 'የምሳ ፕሮግራም ግዮን ሆቴል',
      location: 'ግዮን ሆቴል (Ghion Hotel, Addis Ababa)',
      description: 'Lunch Reception at Ghion Hotel'
    },
    {
      time: '2:30 – 6:00',
      title: 'የኬክ ቆረሳ፣ ጭፈራ እና ፎቶ ፕሮግራም ግዮን ሆቴል',
      location: 'ግዮን ሆቴል (Ghion Hotel, Addis Ababa)',
      description: 'Cake, Music & Photography'
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
  receptionEth: 'ግዮን ሆቴል (ግራንድ ሆል)፤ አዲስ አበባ',
  receptionEn: 'Ghion Hotel Grand Hall, Addis Ababa',
  phone1: '+251 91 123 4567',
  phone2: '+251 92 234 5678'
};
