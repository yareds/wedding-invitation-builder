export interface RSVPData {
  guestName: string;
  phone?: string;
  attending: boolean | null;
  guestCount: number;
  message?: string;
  submittedAt?: string;
}

export interface TimelineEvent {
  id?: string;
  time: string;
  title: string;
  location: string;
  description: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  location: string;
  aspectRatio?: string;
}

export type ThemeId =
  | 'bordeaux'
  | 'emerald'
  | 'rosegarden'
  | 'midnight'
  | 'goldluxury'
  | 'classicivory'
  | 'sapphire'
  | 'amethyst'
  | 'rubyvelvet'
  | 'lavender'
  | 'sagemint'
  | 'peachblossom'
  | 'terracotta'
  | 'olivebronze'
  | 'desertsand'
  | 'slateplatinum'
  | 'espressopearl'
  | 'marigold'
  | 'peacockteal'
  | 'electricviolet';

export type FrameStyleId =
  | 'botanical-floral'
  | 'floral-garland'
  | 'royal-luxury'
  | 'luxury-sovereign'
  | 'modern-minimalist'
  | 'minimalist-horizon'
  | 'classic-arch'
  | 'classic-pediment'
  | 'romantic-lace'
  | 'romantic-ribbon'
  | 'contemporary-geo'
  | 'contemporary-prism'
  | 'habesha-heritage'
  | 'heritage-knotwork'
  | 'celestial-sparkle'
  | 'celestial-lunar';

export interface ThemeColors {
  primary: string;
  mid: string;
  light: string;
  gold: string;
  goldLt: string;
  goldPale: string;
  blush: string;
  blushLt: string;
  blushPale: string;
  bg: string;
  footerBg: string;
  heroOv: string;
}

export interface WeddingConfig {
  themeId: ThemeId;
  frameStyle?: FrameStyleId;
  groomEth: string;
  groomEn: string;
  brideEth: string;
  brideEn: string;
  dateGC: string;
  dateEC: string;
  dayName: string;
  timeDisplay: string;
  countdownDate: string;
  churchEth: string;
  churchEn: string;
  receptionEth: string;
  receptionEn: string;
  scripture: string;
  scriptureRef: string;
  storyText?: string;
  contactInfo?: string;
  phone1: string;
  phone2: string;
  whatsappNumber: string;
  telegramUsername: string;
  emailContact: string;
  rsvpDeadlineEn: string;
  rsvpDeadlineEth: string;
  rsvpMethod: 'sheets' | 'netlify' | 'direct';
  sheetsUrl: string;
  rsvpEnabled?: boolean;
  heroImg: string | null;
  bgMusicUrl: string | null;
  galleryImgs: string[];
  schedule: TimelineEvent[];
  bankDetails: BankDetail[];
}

export interface SavedProject {
  id: string; // e.g. WED-2026-98421
  coupleNames: string;
  themeId: string;
  themeName: string;
  createdAt: string;
  updatedAt: string;
  config: WeddingConfig;
  deploymentStatus: 'draft' | 'generated' | 'deployed';
  customUrl?: string;
  ownerUid?: string;
  orderStatus?: 'draft' | 'submitted' | 'approved';
  rsvpEnabled?: boolean;
  customerName?: string;
  customerPhone?: string;
  transactionRef?: string;
}

export interface BankDetail {
  bankName: string;
  accountName: string;
  accountNumber: string;
  iconName?: string;
}

