import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Palette,
  Music,
  Image as ImageIcon,
  CalendarCheck,
  MapPin,
  Clock,
  Smartphone,
  Share2,
  Zap,
  ShieldCheck,
  ChevronDown,
  CheckCircle2,
  ArrowRight,
  Send,
  MessageSquare,
  Instagram,
  Facebook,
  Mail,
  Phone,
  Eye,
  Check,
  X,
  Play,
  Heart
} from 'lucide-react';
import { THEME_PRESETS, ThemePreset, DEFAULT_WEDDING_CONFIG } from '../utils/themePresets';
import { ThemeId, WeddingConfig } from '../types';
import { StudioHeroBanner } from './StudioHeroBanner';
import { HeroSection } from './HeroSection';
import { WordReveal, GentleFadeUp, FloatingSparkles } from './AnimatedHeroText';

interface LandingPageProps {
  onStartBuilding: (presetThemeId?: ThemeId) => void;
  onOpenAdmin: () => void;
}

// Custom Wedding Ring Logo Component
function WeddingRingLogo({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full text-[#C8A84B]" fill="none" stroke="currentColor" strokeWidth="6">
        {/* Left Ring */}
        <circle cx="38" cy="54" r="26" className="text-[#C8A84B]" />
        {/* Right Ring */}
        <circle cx="62" cy="54" r="26" className="text-[#E2C873]" />
        {/* Diamond Sparkle on Left Ring */}
        <path d="M38 18 L41 24 L47 27 L41 30 L38 36 L35 30 L29 27 L35 24 Z" fill="#C8A84B" stroke="none" />
      </svg>
    </div>
  );
}

export function LandingPage({ onStartBuilding, onOpenAdmin }: LandingPageProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedDemoTheme, setSelectedDemoTheme] = useState<ThemePreset | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const templatesList = [
    {
      id: 'bordeaux' as ThemeId,
      name: 'Royal Burgundy',
      style: 'Ethiopian Imperial Romance',
      description: 'Deep imperial maroon, gold crests, and velvet rose gold elegance.',
      bgGradient: 'from-[#4A0E17] via-[#721121] to-[#210206]',
      accentColor: '#D4AF37',
      previewImg: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      tags: ['Popular', 'Imperial Gold', 'Habesha Traditional']
    },
    {
      id: 'emerald' as ThemeId,
      name: 'Emerald Garden',
      style: 'Botanical & Leafy Elegance',
      description: 'Lush forest emerald green, sage eucalyptus, and warm golden foliage.',
      bgGradient: 'from-[#1B4332] via-[#2D6A4F] to-[#081C15]',
      accentColor: '#E9C46A',
      previewImg: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      tags: ['Botanical', 'Natural Sage', 'Gold Accent']
    },
    {
      id: 'blush' as ThemeId,
      name: 'Rose Blush & Gold',
      style: 'Romantic & Floral Warmth',
      description: 'Soft dusty rose, champagne gold accents, and delicate botanical petals.',
      bgGradient: 'from-[#8C4A60] via-[#A85872] to-[#3B0B1F]',
      accentColor: '#F3C969',
      previewImg: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
      tags: ['Romantic', 'Rose Gold', 'Soft Blush']
    },
    {
      id: 'gold' as ThemeId,
      name: 'Champagne Luxury',
      style: 'Classic White & Sparkling Gold',
      description: 'Timeless ivory canvas, sparkling champagne gold borders, and royal serif typography.',
      bgGradient: 'from-[#5A4518] via-[#8C6D2B] to-[#2B1F08]',
      accentColor: '#F7E5A9',
      previewImg: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
      tags: ['Luxury Gold', 'Ivory Classic', 'High Contrast']
    },
    {
      id: 'midnight' as ThemeId,
      name: 'Royal Midnight',
      style: 'Starlit Evening Luxury',
      description: 'Deep starlit midnight blue, sapphire twilight, and glowing gold embellishments.',
      bgGradient: 'from-[#1C1040] via-[#2E1D6B] to-[#0B051D]',
      accentColor: '#F3C969',
      previewImg: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
      tags: ['Midnight Blue', 'Starlit Glow', 'Modern Luxury']
    }
  ];

  const featuresList = [
    {
      icon: Palette,
      title: 'Professionally Crafted Themes',
      desc: 'Choose from Royal Burgundy, Emerald Garden, Rose Gold, and Habesha traditional palettes tailored for Ethiopian weddings.'
    },
    {
      icon: Sparkles,
      title: 'Live Instant Customizer',
      desc: 'Edit titles, dates, church details, venue names, and love story quotes with real-time visual preview.'
    },
    {
      icon: Music,
      title: 'Background Music & Audio',
      desc: 'Embed romantic piano loops or upload custom Ethiopian wedding songs with auto-play background audio.'
    },
    {
      icon: ImageIcon,
      title: 'Personal Photo Gallery',
      desc: 'Showcase your engagement photo album in a high-resolution lightbox gallery with smooth zoom features.'
    },
    {
      icon: CalendarCheck,
      title: 'Interactive RSVP Management',
      desc: 'Collect guest attendances, meal preferences, and custom congratulations notes stored directly in your portal.'
    },
    {
      icon: MapPin,
      title: 'Google Maps Directions',
      desc: 'Embedded interactive maps leading your guests directly to your Church ceremony and Reception hall.'
    },
    {
      icon: Clock,
      title: 'Live Event Countdown',
      desc: 'Dynamic real-time countdown timer tracking days, hours, minutes, and seconds until your special day.'
    },
    {
      icon: Smartphone,
      title: '100% Mobile & Tablet Responsive',
      desc: 'Flawlessly optimized across iPhone, Android, tablets, and desktop computers.'
    },
    {
      icon: Share2,
      title: 'One-Click Link Sharing',
      desc: 'Share your personal wedding website instantly via Telegram, WhatsApp, SMS, or social media.'
    },
    {
      icon: Zap,
      title: 'Ultra-Fast Page Speed',
      desc: 'Optimized image loading and micro-animations ensure your invitation opens instantly anywhere.'
    },
    {
      icon: ShieldCheck,
      title: 'Premium Hosting & Web Domain',
      desc: 'Reliable cloud deployment with your custom web link (e.g. yournames@web.app) included.'
    },
    {
      icon: Heart,
      title: 'Bilingual Support (Amharic & English)',
      desc: 'Display names, greeting messages, and venue details in both Amharic and English scripts.'
    }
  ];

  const stepsList = [
    {
      num: '01',
      title: 'Select Your Theme',
      desc: 'Pick your preferred visual aesthetic from our collection of luxury Ethiopian and international wedding designs.'
    },
    {
      num: '02',
      title: 'Personalize Details',
      desc: 'Fill in bride & groom names, date, Church venue, Reception hall, photo gallery, and background music.'
    },
    {
      num: '03',
      title: 'Preview Live',
      desc: 'See how your invitation looks instantly on both desktop and smartphone screens before publishing.'
    },
    {
      num: '04',
      title: 'Publish & Share',
      desc: 'Order your website link and share your personalized wedding invitation with family and guests worldwide!'
    }
  ];

  const faqList = [
    {
      q: 'How long does it take to create my wedding website?',
      a: 'You can design and preview your complete wedding invitation website in under 10 minutes using our live customizer! Once you submit your order, your custom web link is activated.'
    },
    {
      q: 'Can I upload our own background music and photos?',
      a: 'Yes! You can upload high-resolution engagement photos into your personal photo gallery and choose or upload background audio songs for your guests.'
    },
    {
      q: 'Does the website work on mobile phones and tablets?',
      a: 'Absolutely. Every invitation website built with Addis Wedding Invitation Studio is 100% responsive and looks stunning on iPhones, Android smartphones, tablets, and computers.'
    },
    {
      q: 'How do guests RSVP to our wedding?',
      a: 'Guests simply click the "Respond to Invitation" button on your website, fill in their attendance and meal preferences, and their response is recorded instantly.'
    },
    {
      q: 'How do I receive my custom invitation website link?',
      a: 'Once you click "Order & Pay" and confirm your payment receipt via Telegram or WhatsApp, our team will deploy your invitation online and send you your custom web link (e.g. yourname@web.app).'
    },
    {
      q: 'Can I edit or update wedding details later?',
      a: 'Yes! You can load your saved project anytime by logging in to make updates to dates, times, or venue information.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF4F6] text-[#3B0B1F] font-body selection:bg-[#C8A84B] selection:text-[#3B0B1F]">
      {/* 1. STICKY NAVIGATION BAR */}
      <header className="sticky top-0 z-50 bg-[#59102e]/95 backdrop-blur-md border-b border-[#C8A84B]/40 shadow-xl transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="p-1.5 rounded-full bg-[#3D0A1F] border border-[#C8A84B]/60 shadow-inner">
              <WeddingRingLogo className="w-7 h-7" />
            </div>
            <div>
              <span className="font-serif-heading text-lg sm:text-xl font-bold tracking-wider text-[#FAF0F3] block leading-tight">
                Addis Wedding
              </span>
              <span className="text-[10px] sm:text-xs font-body font-semibold tracking-widest text-[#C8A84B] uppercase block">
                Invitation Studio
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold tracking-wide text-[#FAF0F3]/90 uppercase">
            <a href="#features" className="hover:text-[#C8A84B] transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-[#C8A84B] transition-colors">How It Works</a>
            <a href="#templates" className="hover:text-[#C8A84B] transition-colors">Showcase</a>
            <a href="#pricing" className="hover:text-[#C8A84B] transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-[#C8A84B] transition-colors">FAQ</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onStartBuilding()}
              className="px-5 py-2.5 rounded-full bg-[#C8A84B] text-[#59102e] font-body text-xs font-bold uppercase tracking-wider hover:bg-[#D8B85B] hover:shadow-lg transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Start Building</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#59102e]" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF4F6] via-[#F6E8EE] to-[#EED9E2] text-[#3B0B1F] pt-4 sm:pt-6 lg:pt-10 pb-16 sm:pb-20 lg:pb-28 border-b border-[#C8A84B]/30">
        {/* Luxury Background Decor Patterns */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C8A84B_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#C8A84B]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 -right-20 w-96 h-96 bg-[#B85B75]/15 rounded-full blur-3xl pointer-events-none" />
        <FloatingSparkles color="#C8A84B" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <StudioHeroBanner
            onStartBuilding={() => onStartBuilding()}
            onViewDemo={(preset) => setSelectedDemoTheme(preset || THEME_PRESETS.bordeaux)}
          />
        </div>
      </section>

      {/* 3. WHY CHOOSE / FEATURES SECTION */}
      <section id="features" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#C8A84B] uppercase tracking-widest block">
            Why Choose Addis Wedding Studio
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#3B0B1F] font-normal">
            Everything You Need for a Flawless Wedding Website
          </h2>
          <p className="text-xs sm:text-sm text-[#3B0B1F]/70 font-body leading-relaxed">
            Designed specifically to make wedding planning stress-free, elegant, and memorable for couples in Ethiopia and around the world.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuresList.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 sm:p-7 rounded-2xl border border-[#C8A84B]/30 shadow-sm hover:shadow-xl hover:border-[#C8A84B] transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FDF0F3] border border-[#C8A84B]/40 flex items-center justify-center text-[#3B0B1F] group-hover:bg-[#3B0B1F] group-hover:text-[#C8A84B] transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif-heading text-lg font-bold text-[#3B0B1F] group-hover:text-[#C8A84B] transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-gray-600 font-body leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-20 sm:py-28 bg-[#FAF0F3] text-[#3B0B1F] border-y border-[#C8A84B]/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-[#A87B1B] uppercase tracking-widest block">
              Simple 4-Step Process
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-normal text-[#3B0B1F]">
              How to Build Your Invitation in Minutes
            </h2>
            <p className="text-xs sm:text-sm text-[#3B0B1F]/80 font-body leading-relaxed max-w-xl mx-auto">
              Follow four easy steps to create, preview, and share your wedding website with all your guests.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
            {stepsList.map((step, idx) => {
              const cardStyles = [
                'bg-gradient-to-br from-white via-[#FFF5F8] to-[#FFEBF1] border-2 border-[#E892A8]/60 shadow-sm hover:shadow-md hover:border-[#E892A8]',
                'bg-gradient-to-br from-white via-[#FFFDF2] to-[#FEF9C3] border-2 border-[#EAB308]/60 shadow-sm hover:shadow-md hover:border-[#EAB308]',
                'bg-gradient-to-br from-white via-[#F0FDF4] to-[#DCFCE7] border-2 border-[#4ADE80]/60 shadow-sm hover:shadow-md hover:border-[#4ADE80]',
                'bg-gradient-to-br from-white via-[#FAF5FF] to-[#EDE9FE] border-2 border-[#A78BFA]/60 shadow-sm hover:shadow-md hover:border-[#A78BFA]',
              ];
              const numColors = ['text-[#9E1B42]', 'text-[#8C6B1B]', 'text-[#15803D]', 'text-[#6B21A8]'];
              return (
                <div
                  key={idx}
                  className={`p-7 rounded-2xl space-y-4 relative flex flex-col justify-between transition-all ${cardStyles[idx % cardStyles.length]}`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`font-serif-heading text-3xl font-extrabold ${numColors[idx % numColors.length]}`}>
                        {step.num}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white border border-[#C8A84B]/40 flex items-center justify-center shadow-xs">
                        <Check className={`w-4 h-4 ${numColors[idx % numColors.length]}`} />
                      </div>
                    </div>
                    <h3 className="font-serif-heading text-lg font-bold text-[#2A0815]">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#3D1A27] font-body font-medium leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Amharic Website Template Structure Breakdown */}
          <div className="bg-white p-6 sm:p-10 rounded-3xl border-2 border-[#C8A84B]/60 shadow-xl space-y-8 text-left max-w-6xl mx-auto my-12">
            <div className="border-b border-[#C8A84B]/30 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl sm:text-3xl">💍</span>
                <div>
                  <h3 className="font-serif-heading text-xl sm:text-2xl font-bold text-[#4A0E17]">
                    የሰርግ ጥሪ ድረ-ገጽ መዋቅር (Website Template)
                  </h3>
                  <span className="text-xs text-gray-700 font-body font-medium">
                    የሚቀርቡልዎ ዋና ዋና ክፍሎች፣ ይዘቶች እና ደረጃዎች
                  </span>
                </div>
              </div>
              <span className="px-3.5 py-1 rounded-full bg-[#C8A84B] text-[#3B0B1F] text-xs font-bold uppercase tracking-wider shadow-sm">
                ሙሉ የሰርግ ድረ-ገጽ
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Step 1. Home / Welcome Page */}
              <div className="bg-gradient-to-br from-[#FFF0F4] via-[#FCE4EC] to-[#F8BBD0]/40 p-5 rounded-2xl border-2 border-[#E892A8] shadow-md space-y-3.5 hover:shadow-lg transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[#3B0B1F] font-bold">
                    <span className="w-7 h-7 rounded-full bg-[#3B0B1F] text-[#C8A84B] font-extrabold flex items-center justify-center text-xs shadow-sm shrink-0">1</span>
                    <h4 className="font-serif-heading text-base font-bold text-[#3B0B1F]">
                      ዋናው ገጽ <span className="text-xs font-normal text-[#59102E] block">(Home Page)</span>
                    </h4>
                  </div>
                  <ul className="text-xs text-[#2A0513] font-medium space-y-2.5 leading-relaxed">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#9E1B42] font-bold">•</span>
                      <span><strong>ማራኪ የሰርግ ዲዛይን:</strong> ከሰርግዎ ቀለም እና ስታይል ጋር የሚስማማ Template ይምረጡ።</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#9E1B42] font-bold">•</span>
                      <span><strong>ዋና ምስል (Hero Image):</strong> የእጮኛሞች ፎቶ (Pre-wedding photo)።</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#9E1B42] font-bold">•</span>
                      <span><strong>የጀርባ ሙዚቃ:</strong> የሚፈልጉትን የMP3 ሙዚቃ እንደ ምርጫዎ ማካተት።</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#9E1B42] font-bold">•</span>
                      <span><strong>ዋና መረጃ:</strong> የሙሽራው እና ሙሽሪት ስም፣ የሰርጉ ቀን እና ቦታ።</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#9E1B42] font-bold">•</span>
                      <span><strong>የቀናት መቁጠሪያ:</strong> Countdown Timer።</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Step 2. Our Story */}
              <div className="bg-gradient-to-br from-[#FFFDF0] via-[#FEF3C7] to-[#FDE68A]/40 p-5 rounded-2xl border-2 border-[#D4AF37] shadow-md space-y-3.5 hover:shadow-lg transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[#4A3200] font-bold">
                    <span className="w-7 h-7 rounded-full bg-[#8C6B1B] text-white font-extrabold flex items-center justify-center text-xs shadow-sm shrink-0">2</span>
                    <h4 className="font-serif-heading text-base font-bold text-[#4A3200]">
                      የፍቅር ታሪክ <span className="text-xs font-normal text-[#6E4F02] block">(Our Story &amp; Gallery)</span>
                    </h4>
                  </div>
                  <ul className="text-xs text-[#332200] font-medium space-y-2.5 leading-relaxed">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#8C6B1B] font-bold">•</span>
                      <span><strong>እንዴት ተገናኘን?</strong> ጥንዶቹ ለመጀመሪያ ጊዜ እንዴት እንደተገናኙ የሚተርክ ጽሑፍ።</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#8C6B1B] font-bold">•</span>
                      <span><strong>የጥያቄው ቀን (Proposal):</strong> የጋብቻ ጥያቄ የተጠየቀበት አጭር ታሪክ እና ፎቶዎች።</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#8C6B1B] font-bold">•</span>
                      <span><strong>የፎቶ ጋለሪ (Gallery):</strong> የሙሽሮች ድንቅ ፎቶዎች ስብስብ።</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Step 3. Schedule & Venue */}
              <div className="bg-gradient-to-br from-[#F0FDF4] via-[#DCFCE7] to-[#86EFAC]/40 p-5 rounded-2xl border-2 border-[#4ADE80] shadow-md space-y-3.5 hover:shadow-lg transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[#064E3B] font-bold">
                    <span className="w-7 h-7 rounded-full bg-[#166534] text-white font-extrabold flex items-center justify-center text-xs shadow-sm shrink-0">3</span>
                    <h4 className="font-serif-heading text-base font-bold text-[#064E3B]">
                      ፕሮግራም እና ቦታ <span className="text-xs font-normal text-[#0F5237] block">(Schedule &amp; Venue)</span>
                    </h4>
                  </div>
                  <div className="text-xs text-[#022C22] font-medium space-y-2.5 leading-relaxed">
                    <div className="p-2.5 rounded-xl bg-white/90 border border-[#4ADE80]/60 space-y-1 shadow-2xs">
                      <p className="font-bold text-[#14532D]">የቃል ኪዳን ስነ-ስርዓት (Ceremony):</p>
                      <p className="text-[11px] text-[#064E3B]">⏰ ሰዓት: ሰዓት ያስገቡ</p>
                      <p className="text-[11px] text-[#064E3B]">📍 ቦታ: ቦታ / አድራሻ</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/90 border border-[#4ADE80]/60 space-y-1 shadow-2xs">
                      <p className="font-bold text-[#14532D]">የሰርግ ግብዣ (Reception):</p>
                      <p className="text-[11px] text-[#064E3B]">⏰ ሰዓት: ሰዓት ያስገቡ</p>
                      <p className="text-[11px] text-[#064E3B]">📍 ቦታ: የሆቴል/አዳራሽ አድራሻ</p>
                    </div>
                    <p className="text-[11px] font-bold text-[#15803D] flex items-center gap-1">
                      🗺️ Google Maps ቀጥታ አቅጣጫ ማሳያ
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 4. Share & Link Delivery */}
              <div className="bg-gradient-to-br from-[#FAF5FF] via-[#EDE9FE] to-[#DDD6FE]/40 p-5 rounded-2xl border-2 border-[#A78BFA] shadow-md space-y-3.5 hover:shadow-lg transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[#3B0764] font-bold">
                    <span className="w-7 h-7 rounded-full bg-[#5B21B6] text-white font-extrabold flex items-center justify-center text-xs shadow-sm shrink-0">4</span>
                    <h4 className="font-serif-heading text-base font-bold text-[#3B0764]">
                      ማጋራት እና RSVP <span className="text-xs font-normal text-[#5B21B6] block">(Share &amp; Link Delivery)</span>
                    </h4>
                  </div>
                  <ul className="text-xs text-[#2E1065] font-medium space-y-2.5 leading-relaxed">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#6B21A8] font-bold">•</span>
                      <span><strong>ቀጥታ ድረ-ገጽ ሊንክ:</strong> ለእንግዶችዎ በTelegram/WhatsApp በቀላሉ የሚልኩት ሊንክ።</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#6B21A8] font-bold">•</span>
                      <span><strong>የክፍያ ማረጋገጫ:</strong> ክፍያዎን ሲፈጽሙ ወዲያውኑ ድረ-ገጽዎ online post ይደረጋል።</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#6B21A8] font-bold">•</span>
                      <span><strong>የእንግዶች RSVP:</strong> እንግዶችዎ መምጣታቸውን የሚያረጋግጡበት ቅጽ ያገኛሉ።</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center pt-6">
            <button
              onClick={() => onStartBuilding()}
              className="px-8 py-4 rounded-full bg-[#C8A84B] text-[#3B0B1F] font-body text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-[#E2C873] hover:scale-105 transition-all shadow-xl inline-flex items-center gap-3 cursor-pointer"
            >
              <span>Start Building Your Invitation Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. SHOWCASE / FINISHED TEMPLATES SECTION */}
      <section id="templates" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#C8A84B] uppercase tracking-widest block">
            Exquisite Design Styles
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#3B0B1F] font-normal">
            Choose Your Favorite Theme Preset
          </h2>
          <p className="text-xs sm:text-sm text-[#3B0B1F]/70 font-body leading-relaxed">
            Every template is fully customizable with your photos, background music, church details, and event schedules.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templatesList.map((tpl) => (
            <div
              key={tpl.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#C8A84B]/30 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-60 overflow-hidden cursor-pointer" onClick={() => setSelectedDemoTheme(THEME_PRESETS[tpl.id])}>
                  <img
                    src={tpl.previewImg}
                    alt={tpl.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${tpl.bgGradient} opacity-60`} />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {tpl.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[#3B0B1F] text-[10px] font-bold uppercase tracking-wider shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white font-serif-heading">
                    <span className="text-lg font-bold">{tpl.name}</span>
                    <span className="text-xs opacity-90">{tpl.style}</span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <p className="text-xs text-gray-600 font-body leading-relaxed">
                    {tpl.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedDemoTheme(THEME_PRESETS[tpl.id])}
                  className="flex-1 py-2.5 px-3 rounded-xl border border-[#C8A84B]/50 hover:bg-[#FAF0F3] text-[#3B0B1F] text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-[#A87B1B]" />
                  <span>Preview</span>
                </button>

                <button
                  type="button"
                  onClick={() => onStartBuilding(tpl.id)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#4A0E17] text-[#FAF0F3] hover:bg-[#3B0B1F] text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
                >
                  <span>Select &amp; Build</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. PRICING SECTION */}
      <section id="pricing" className="py-20 sm:py-28 bg-[#FAF0F3] border-y border-[#C8A84B]/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-[#A87B1B] uppercase tracking-widest block">
              Transparent &amp; Affordable Pricing
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#3B0B1F] font-normal">
              One Flat Price &bull; Complete Wedding Package
            </h2>
            <p className="text-xs sm:text-sm text-[#3B0B1F]/70 font-body leading-relaxed max-w-lg mx-auto">
              Get full access to all themes, custom domain hosting, RSVP tracking, music player, and venue directions with zero hidden fees.
            </p>
          </div>

          <div className="max-w-xl mx-auto">
            <div className="bg-white rounded-3xl border-2 border-[#C8A84B] shadow-xl overflow-hidden p-8 sm:p-10 text-center space-y-8 relative">
              <div className="absolute top-0 right-0 bg-[#C8A84B] text-[#3B0B1F] text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-bl-xl shadow-sm">
                Most Popular Package
              </div>

              <div className="space-y-2 pt-2">
                <span className="font-serif-heading text-xl font-bold text-[#3B0B1F] block">
                  Premium Digital Wedding Invitation
                </span>
                <div className="flex items-center justify-center gap-1 pt-2">
                  <span className="font-serif-heading text-4xl sm:text-5xl font-bold text-[#3B0B1F]">
                    25,000
                  </span>
                  <span className="font-body text-base font-bold text-[#A87B1B]">
                    ETB (Birr)
                  </span>
                </div>
                <p className="text-xs text-gray-500 font-body">
                  One-time payment &bull; Full hosting &amp; setup included
                </p>
              </div>

              <div className="border-t border-b border-gray-100 py-6 text-left space-y-3.5">
                {[
                  'Complete personalized wedding invitation website',
                  'Unlimited guest RSVP tracking & management',
                  'Background music player with romantic presets or custom audio',
                  'High-resolution photo gallery & love story timeline',
                  'Interactive Church & Reception Google Maps integration',
                  'Live event countdown timer (Days, Hours, Minutes, Seconds)',
                  '100% mobile, tablet, and desktop responsive',
                  'Premium cloud deployment with custom website link (yourname@web.app)',
                  'Dedicated technical support & updates'
                ].map((item, iIdx) => (
                  <div key={iIdx} className="flex items-start gap-3 text-xs text-gray-700 font-body">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div>
                <button
                  onClick={() => onStartBuilding()}
                  className="w-full py-4 px-6 rounded-2xl bg-[#4A0E17] text-[#FAF0F3] font-body text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-[#3B0B1F] hover:scale-[1.01] transition-all shadow-xl flex items-center justify-center gap-3 cursor-pointer"
                >
                  <span>Build My Invitation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ SECTION */}
      <section id="faq" className="py-20 sm:py-28 bg-[#FAF4F6] max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#C8A84B]/20">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#A87B1B] uppercase tracking-widest block">
            Got Questions?
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#3B0B1F] font-normal">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqList.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#C8A84B]/30 shadow-sm overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-serif-heading text-base font-semibold text-[#3B0B1F] hover:text-[#A87B1B] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#A87B1B] transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-xs text-gray-600 font-body leading-relaxed border-t border-gray-100 pt-4 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. FINAL CALL TO ACTION BANNER */}
      <section className="py-20 sm:py-28 bg-gradient-to-br from-[#FFF0F3] via-[#FAF0F4] to-[#F5E6EB] text-[#3B0B1F] border-t border-[#C8A84B]/30 relative overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          <div className="p-3 rounded-full bg-white border border-[#C8A84B]/50 w-16 h-16 mx-auto flex items-center justify-center shadow-md">
            <WeddingRingLogo className="w-10 h-10" />
          </div>

          <div className="space-y-4">
            <h2 className="font-serif-heading text-3xl sm:text-5xl font-normal text-[#3B0B1F]">
              Ready to Create Your Dream Wedding Invitation?
            </h2>
            <p className="font-body text-xs sm:text-base text-[#3B0B1F]/80 max-w-xl mx-auto leading-relaxed">
              Join dozens of happy couples who created stunning digital wedding invitation websites with Addis Wedding Invitation Studio.
            </p>
          </div>

          <div>
            <button
              onClick={() => onStartBuilding()}
              className="px-10 py-5 rounded-full bg-[#C8A84B] text-[#3B0B1F] font-body text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-[#E2C873] hover:scale-105 transition-all shadow-2xl inline-flex items-center gap-3 cursor-pointer"
            >
              <span>Start Building Your Invitation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer className="bg-[#59102e] text-[#FAF0F3] py-16 border-t border-[#C8A84B]/40 text-xs font-body">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand column */}
            <div className="space-y-4 md:col-span-1">
              <div className="flex items-center gap-2">
                <WeddingRingLogo className="w-6 h-6" />
                <span className="font-serif-heading text-lg font-bold text-[#FAF0F3]">
                  Addis Wedding Studio
                </span>
              </div>
              <p className="text-[11px] text-[#FAF0F3]/80 leading-relaxed">
                Ethiopia's premier luxury digital wedding invitation platform. Beautiful responsive websites designed with elegance and romance.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <h4 className="font-serif-heading text-sm font-bold text-[#C8A84B] uppercase tracking-wider">
                Quick Navigation
              </h4>
              <ul className="space-y-2 text-[11px]">
                <li><a href="#features" className="hover:text-[#C8A84B] transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-[#C8A84B] transition-colors">How It Works</a></li>
                <li><a href="#templates" className="hover:text-[#C8A84B] transition-colors">Showcase Templates</a></li>
                <li><a href="#pricing" className="hover:text-[#C8A84B] transition-colors">Pricing Plan</a></li>
                <li><a href="#faq" className="hover:text-[#C8A84B] transition-colors">FAQ</a></li>
              </ul>
            </div>

            {/* Contact Details */}
            <div className="space-y-3">
              <h4 className="font-serif-heading text-sm font-bold text-[#C8A84B] uppercase tracking-wider">
                Contact &amp; Support
              </h4>
              <ul className="space-y-2 text-[11px] text-[#FAF0F3]/85">
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#C8A84B]" />
                  <span>Phone / WhatsApp: +1 (571) 474-9554</span>
                </li>
                <li className="flex items-center gap-2">
                  <Send className="w-3.5 h-3.5 text-[#C8A84B]" />
                  <span>Telegram: @yared_abegaz (+15714749554)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#C8A84B]" />
                  <span>yared.abegaz@gmail.com</span>
                </li>
              </ul>
            </div>

            {/* Social & Admin */}
            <div className="space-y-3">
              <h4 className="font-serif-heading text-sm font-bold text-[#C8A84B] uppercase tracking-wider">
                Connect With Us
              </h4>
              <div className="flex items-center gap-3">
                <a href="https://t.me" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#3D0A1F] border border-[#C8A84B]/40 flex items-center justify-center hover:bg-[#C8A84B] hover:text-[#59102e] transition-all">
                  <Send className="w-4 h-4 text-[#C8A84B] hover:text-[#59102e]" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#3D0A1F] border border-[#C8A84B]/40 flex items-center justify-center hover:bg-[#C8A84B] hover:text-[#59102e] transition-all">
                  <Instagram className="w-4 h-4 text-[#C8A84B] hover:text-[#59102e]" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#3D0A1F] border border-[#C8A84B]/40 flex items-center justify-center hover:bg-[#C8A84B] hover:text-[#59102e] transition-all">
                  <Facebook className="w-4 h-4 text-[#C8A84B] hover:text-[#59102e]" />
                </a>
              </div>
              <div className="pt-2">
                <button
                  onClick={onOpenAdmin}
                  className="text-[11px] text-[#C8A84B] font-semibold underline hover:text-[#FAF0F3] cursor-pointer"
                >
                  Log in
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-[#C8A84B]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#FAF0F3]/60">
            <p>© {new Date().getFullYear()} Addis Wedding Invitation Studio. All Rights Reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-[#FAF0F3] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#FAF0F3] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* 11. DEMO PREVIEW MODAL */}
      {selectedDemoTheme && (() => {
        const demoConfig: WeddingConfig = {
          ...DEFAULT_WEDDING_CONFIG,
          themeId: selectedDemoTheme.id,
          groomEth: 'የሙሽራው ስም',
          brideEth: 'የሙሽሪት ስም',
          groomEn: '',
          brideEn: '',
        };

        return (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
            <div className="bg-[#FAF4F6] w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#C8A84B] flex flex-col">
              {/* Modal Header */}
              <div className="bg-[#FAF0F3] text-[#3B0B1F] px-6 py-4 flex items-center justify-between border-b border-[#C8A84B]/40 shrink-0">
                <div className="flex items-center gap-3">
                  <WeddingRingLogo className="w-6 h-6" />
                  <div>
                    <h3 className="font-serif-heading text-base font-bold text-[#3B0B1F]">
                      {selectedDemoTheme.name} Preset Preview
                    </h3>
                    <span className="text-[11px] text-[#A87B1B] font-mono">
                      {selectedDemoTheme.themeStyle}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      const themeId = selectedDemoTheme.id;
                      setSelectedDemoTheme(null);
                      onStartBuilding(themeId);
                    }}
                    className="px-4 py-2 rounded-full bg-[#C8A84B] text-[#3B0B1F] text-xs font-bold uppercase tracking-wider hover:bg-[#E2C873] cursor-pointer shadow-md transition-all"
                  >
                    Start Building With This Theme
                  </button>

                  <button
                    onClick={() => setSelectedDemoTheme(null)}
                    className="p-1.5 rounded-full hover:bg-[#C8A84B]/20 text-gray-600 hover:text-[#3B0B1F] cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Sample Content - Hero Section Preview */}
              <div className="flex-1 overflow-y-auto">
                <HeroSection config={demoConfig} />
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
