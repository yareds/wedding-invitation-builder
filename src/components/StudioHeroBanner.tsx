import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Calendar,
  Music,
  Heart,
  Gem,
  MapPin,
  Menu,
  ChevronLeft,
  ChevronRight,
  Share,
  Bookmark,
  Layers,
  Sparkles
} from 'lucide-react';
import { ThemePreset } from '../utils/themePresets';

interface StudioHeroBannerProps {
  onStartBuilding: () => void;
  onViewDemo: (preset?: ThemePreset) => void;
}

export const StudioHeroBanner: React.FC<StudioHeroBannerProps> = ({
  onStartBuilding,
  onViewDemo
}) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Warm Ambient Glow Background */}
      <div className="absolute -inset-4 bg-gradient-to-r from-[#C8A84B]/25 via-[#B85B75]/20 to-[#C8A84B]/25 rounded-3xl blur-2xl opacity-80 pointer-events-none" />

      {/* Main Luxury Frame Card with Website-Themed Warm Blush/Ivory Gradient */}
      <div className="relative bg-gradient-to-b from-[#FAF4F6] via-[#F6E9EF] to-[#EEDAE3] rounded-3xl border-2 border-[#C8A84B]/60 shadow-2xl pt-6 sm:pt-8 lg:pt-10 pb-6 sm:pb-9 lg:pb-12 px-4 sm:px-8 lg:px-12 overflow-hidden">
        
        {/* Subtle Traditional Watermark / Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#C8A84B_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
        
        {/* Corner Flourish Accents */}
        <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#C8A84B]" />
        <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#C8A84B]" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#C8A84B]" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#C8A84B]" />

        {/* Inner Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          
          {/* LEFT COLUMN: Majestic Display Typography with clean responsive framing */}
          <div className="lg:col-span-6 text-center lg:text-left space-y-2 sm:space-y-3 relative p-2 pt-2 sm:pt-4 lg:pt-0 lg:-mt-4">
            
            {/* DYNAMIC FLASHING LIGHT AURA & SWEEPING LIGHT BEAMS BEHIND HEADLINES */}
            <div className="absolute -top-10 -left-10 w-96 h-96 bg-gradient-to-tr from-[#C8A84B]/40 via-[#FAF0C5]/40 to-[#B85B75]/35 rounded-full blur-3xl pointer-events-none animate-flash-aura" />
            <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-gradient-to-br from-[#FAF0C5]/60 via-[#C8A84B]/25 to-transparent rounded-full blur-2xl pointer-events-none animate-pulse-glow" />
            
            {/* Sweeping Light Ray Beam */}
            <div className="absolute -inset-x-20 top-0 bottom-0 pointer-events-none overflow-hidden z-0">
              <div className="w-48 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent blur-xl transform -skew-x-25 animate-sweep-light" />
            </div>

            {/* Main Word Art Title: DESIGN YOUR DREAM in Cinzel Decorative */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-1 select-none relative z-10"
            >
              {/* Line 1: DESIGN with Cinzel Decorative */}
              <div className="flex items-baseline justify-center lg:justify-start">
                <h1 className="font-cinzel font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl tracking-wider text-dynamic-headline-gold leading-[1.05] uppercase drop-shadow-sm">
                  DESIGN
                </h1>
              </div>

              {/* Line 2: Your with Geraldine Calligraphic Script */}
              <div className="flex items-baseline justify-center lg:justify-start pl-2 sm:pl-5 -my-1 sm:-my-2">
                <span className="font-geraldine font-normal text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl tracking-wide text-[#4A0E17] leading-[1.1] drop-shadow-sm hover:scale-105 transition-transform duration-300 select-none">
                  Your
                </span>
              </div>

              {/* Line 3: DREAM with Cinzel Decorative */}
              <div className="flex items-baseline justify-center lg:justify-start">
                <span className="font-cinzel font-bold text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl tracking-wider text-dynamic-headline-wine leading-[1.05] uppercase drop-shadow-sm">
                  DREAM
                </span>
              </div>

              {/* Digital Wedding Invitations Subtitle Tag */}
              <div className="flex items-center justify-center lg:justify-start pt-1.5 sm:pt-2">
                <span className="font-cormorant text-xl sm:text-2xl md:text-3xl font-bold tracking-wide text-[#6B1728] uppercase drop-shadow-xs">
                  Digital Wedding Invitations
                </span>
              </div>
            </motion.div>

            {/* Amharic Heading matching reference image with authentic Ethiopian Serif */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="space-y-1 sm:space-y-2 pt-1 relative z-10"
            >
              <h2 className="font-amharic text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#3B0B1F] tracking-wide leading-tight drop-shadow-xs">
                ማራኪ የሰርግ ጥሪ
              </h2>
              <h2 className="font-amharic text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#3B0B1F] tracking-wide leading-tight drop-shadow-xs">
                ድረ ገጽ ይፍጠሩ
              </h2>
            </motion.div>

            {/* Brand Label matching reference image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-2 space-y-0.5 relative z-10"
            >
              <p className="font-body text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em] text-[#4A0E17]">
                WITH ADDIS WEDDING
              </p>
              <p className="font-body text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em] text-[#4A0E17]">
                STUDIO
              </p>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Realistic Phone Mockup with 100% Permanently Attached Node Badges */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative pt-4 lg:pt-0">
            
            {/* Synchronized Aspect Ratio Stage for Phone + Golden Circuit Lines + Badges */}
            <div className="relative w-full max-w-[480px] aspect-[480/520] flex items-center justify-center select-none">
              
              {/* SVG Connecting Golden Circuit Lines (Locked 1:1 to Badge & Phone Anchors) */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
                viewBox="0 0 480 520"
                preserveAspectRatio="xMidYMid meet"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Subtle golden route glow */}
                <g filter="drop-shadow(0px 0px 4px rgba(200, 168, 75, 0.4))">
                  {/* Node 1 Top Left (Center: 52, 70) -> Phone Left Edge (115, 110) */}
                  <path d="M 52 70 H 90 L 115 110" stroke="#C8A84B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="52" cy="70" r="4" fill="#C8A84B" />
                  <circle cx="115" cy="110" r="4" fill="#4A0E17" stroke="#C8A84B" strokeWidth="1.5" />

                  {/* Node 2 Mid Left (Center: 44, 260) -> Phone Left Edge (115, 260) */}
                  <path d="M 44 260 H 115" stroke="#C8A84B" strokeWidth="2.2" strokeLinecap="round" />
                  <circle cx="44" cy="260" r="4" fill="#C8A84B" />
                  <circle cx="115" cy="260" r="4" fill="#4A0E17" stroke="#C8A84B" strokeWidth="1.5" />

                  {/* Node 3 Bottom Left (Center: 52, 430) -> Phone Left Edge (115, 390) */}
                  <path d="M 52 430 H 90 L 115 390" stroke="#C8A84B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="52" cy="430" r="4" fill="#C8A84B" />
                  <circle cx="115" cy="390" r="4" fill="#4A0E17" stroke="#C8A84B" strokeWidth="1.5" />

                  {/* Node 4 Top Right (Center: 428, 70) -> Phone Right Edge (365, 110) */}
                  <path d="M 428 70 H 390 L 365 110" stroke="#C8A84B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="428" cy="70" r="4" fill="#C8A84B" />
                  <circle cx="365" cy="110" r="4" fill="#4A0E17" stroke="#C8A84B" strokeWidth="1.5" />

                  {/* Node 5 Bottom Right (Center: 428, 430) -> Phone Right Edge (365, 390) */}
                  <path d="M 428 430 H 390 L 365 390" stroke="#C8A84B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="428" cy="430" r="4" fill="#C8A84B" />
                  <circle cx="365" cy="390" r="4" fill="#4A0E17" stroke="#C8A84B" strokeWidth="1.5" />
                </g>
              </svg>

              {/* 5 Interactive Feature Badges (Percentage locked to SVG coordinates) */}
              
              {/* Badge 1: Calendar (52/480 = 10.8%, 70/520 = 13.5%) */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
                onMouseEnter={() => setActiveTooltip('calendar')}
                onMouseLeave={() => setActiveTooltip(null)}
                style={{ left: '10.8%', top: '13.5%' }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center group cursor-pointer"
                title="Gregorian & Ethiopian Calendar Date Countdown"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border-2 border-[#C8A84B] shadow-md flex items-center justify-center group-hover:scale-115 group-hover:bg-[#FAF0F3] group-hover:border-[#4A0E17] group-hover:shadow-lg transition-all duration-300">
                  <Calendar className="w-5 h-5 text-[#4A0E17]" />
                </div>
              </motion.div>

              {/* Badge 2: Music (44/480 = 9.2%, 260/520 = 50%) */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.45, type: 'spring' }}
                onMouseEnter={() => setActiveTooltip('music')}
                onMouseLeave={() => setActiveTooltip(null)}
                style={{ left: '9.2%', top: '50%' }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center group cursor-pointer"
                title="Traditional Ethiopian Kebero & Modern Music Audio"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border-2 border-[#C8A84B] shadow-md flex items-center justify-center group-hover:scale-115 group-hover:bg-[#FAF0F3] group-hover:border-[#4A0E17] group-hover:shadow-lg transition-all duration-300">
                  <Music className="w-5 h-5 text-[#4A0E17]" />
                </div>
              </motion.div>

              {/* Badge 3: Couple Details (52/480 = 10.8%, 430/520 = 82.7%) */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, type: 'spring' }}
                onMouseEnter={() => setActiveTooltip('couple')}
                onMouseLeave={() => setActiveTooltip(null)}
                style={{ left: '10.8%', top: '82.7%' }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center group cursor-pointer"
                title="Personalized Couple Love Story & Details"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border-2 border-[#C8A84B] shadow-md flex items-center justify-center group-hover:scale-115 group-hover:bg-[#FAF0F3] group-hover:border-[#4A0E17] group-hover:shadow-lg transition-all duration-300">
                  <Heart className="w-5 h-5 text-[#B85B75]" />
                </div>
              </motion.div>

              {/* Badge 4: Luxury Theme (428/480 = 89.2%, 70/520 = 13.5%) */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.35, type: 'spring' }}
                onMouseEnter={() => setActiveTooltip('luxury')}
                onMouseLeave={() => setActiveTooltip(null)}
                style={{ left: '89.2%', top: '13.5%' }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center group cursor-pointer"
                title="Luxury Gold Borders & Traditional Design Presets"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border-2 border-[#C8A84B] shadow-md flex items-center justify-center group-hover:scale-115 group-hover:bg-[#FAF0F3] group-hover:border-[#4A0E17] group-hover:shadow-lg transition-all duration-300">
                  <Gem className="w-5 h-5 text-[#C8A84B]" />
                </div>
              </motion.div>

              {/* Badge 5: Venues / Map (428/480 = 89.2%, 430/520 = 82.7%) */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                onMouseEnter={() => setActiveTooltip('location')}
                onMouseLeave={() => setActiveTooltip(null)}
                style={{ left: '89.2%', top: '82.7%' }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center group cursor-pointer"
                title="Interactive Church & Reception Venues with Maps"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border-2 border-[#C8A84B] shadow-md flex items-center justify-center group-hover:scale-115 group-hover:bg-[#FAF0F3] group-hover:border-[#4A0E17] group-hover:shadow-lg transition-all duration-300">
                  <MapPin className="w-5 h-5 text-[#4A0E17]" />
                </div>
              </motion.div>

              {/* REALISTIC 3D SMARTPHONE MOCKUP (Locked to Exact Center of Stage) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-[250px] sm:w-[260px] rounded-[42px] bg-[#1E1E24] p-2.5 sm:p-3 shadow-[0_25px_60px_-15px_rgba(59,11,31,0.35)] border-4 border-[#3A3A40] group cursor-pointer"
                onClick={() => onViewDemo()}
              >
                {/* Phone Screen Container */}
                <div className="relative rounded-[34px] overflow-hidden bg-white shadow-inner flex flex-col h-[470px] sm:h-[490px] border border-black/10">
                  
                  {/* Dynamic Island Notch */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4.5 bg-black rounded-full z-30 flex items-center justify-between px-2 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-[#111] border border-white/20" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#080808]" />
                  </div>

                  {/* Status Bar */}
                  <div className="h-8 bg-[#4A0E17] flex items-center justify-between px-5 pt-1 text-[10px] font-medium text-white/90 select-none z-20">
                    <span>9:41</span>
                    <div className="flex items-center gap-1 opacity-90">
                      <span className="text-[9px]">5G</span>
                      <div className="w-3.5 h-2 border border-white/80 rounded-xs flex items-center p-0.5">
                        <div className="w-full h-full bg-white" />
                      </div>
                    </div>
                  </div>

                  {/* App Website Header inside Phone */}
                  <div className="bg-[#4A0E17] px-3.5 py-2 flex items-center justify-between border-b border-[#C8A84B]/40 text-white z-20">
                    <div className="flex items-center gap-2">
                      <div className="w-5.5 h-5.5 rounded-full border border-[#C8A84B] flex items-center justify-center">
                        <span className="text-[9px] text-[#C8A84B] font-serif">⚭</span>
                      </div>
                      <div>
                        <span className="font-serif-heading text-xs font-bold tracking-wider block leading-none">
                          Addis Wedding
                        </span>
                        <span className="text-[7px] tracking-widest text-[#C8A84B] uppercase block">
                          INVITATION STUDIO
                        </span>
                      </div>
                    </div>
                    <Menu className="w-3.5 h-3.5 text-white/80" />
                  </div>

                  {/* Scrollable Preview Screen Content */}
                  <div className="flex-1 overflow-y-auto no-scrollbar bg-[#FAF0F3]">
                    
                    {/* Habesha / Black Couple Hero Photo with Clearly Visible Smiling Faces */}
                    <div className="relative h-56 overflow-hidden bg-[#2D0A14]">
                      <img
                        src="https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&w=800&q=80"
                        alt="Habesha Wedding Couple"
                        className="w-full h-full object-cover object-[center_22%] group-hover:scale-105 transition-transform duration-700"
                      />
                      {/* Subtle bottom-only gradient overlay so faces remain bright & fully visible */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                      
                      {/* Floating RSVP Button inside preview */}
                      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2">
                        <div className="px-4 py-1 rounded-full bg-[#C8A84B] text-[#3B0B1F] text-[10px] font-bold uppercase tracking-wider shadow-lg flex items-center gap-1 hover:bg-[#E2C873] transition-colors">
                          <span>RSVP</span>
                          <span>&rarr;</span>
                        </div>
                      </div>
                    </div>

                    {/* Preset Content Description */}
                    <div className="p-3.5 text-center space-y-1.5">
                      <span className="text-[8px] font-extrabold uppercase tracking-widest text-[#A87B1B] block">
                        FEATURED DESIGN PRESET
                      </span>
                      <h3 className="font-serif-heading text-lg text-[#3B0B1F] font-bold leading-tight">
                        Royal Imperial
                      </h3>
                      <p className="text-[10px] text-gray-700 leading-relaxed font-body px-1">
                        Complete with traditional Ethiopian golds, borders, countdown timers, dual Amharic/English typography, and interactive RSVP.
                      </p>
                      <div className="pt-1">
                        <span className="inline-block px-3 py-0.5 rounded-full bg-[#3B0B1F] text-white text-[8.5px] font-semibold tracking-wider uppercase shadow-xs">
                          Click to Preview
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Safari / Browser Navigation Controls */}
                  <div className="bg-[#F8F8F8] border-t border-gray-200 px-3.5 py-1.5 flex items-center justify-between text-gray-500 text-xs select-none">
                    <ChevronLeft className="w-3.5 h-3.5 text-gray-600" />
                    <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                    <Share className="w-3 h-3 text-gray-600" />
                    <Bookmark className="w-3 h-3 text-gray-600" />
                    <Layers className="w-3 h-3 text-gray-600" />
                  </div>

                  {/* Home Indicator Bar */}
                  <div className="bg-[#F8F8F8] pb-1 flex justify-center">
                    <div className="w-20 h-1 bg-gray-400 rounded-full" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* DUAL ACTION BUTTONS (Single pill container matching image) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
              className="mt-6 p-1.5 sm:p-2 rounded-full border-2 border-[#C8A84B] bg-[#FAF4F6] backdrop-blur-sm shadow-lg flex items-center gap-2 sm:gap-3"
            >
              <button
                onClick={onStartBuilding}
                className="px-6 sm:px-8 py-3 rounded-full bg-[#4A0E17] text-[#FAF0F3] border border-[#C8A84B]/70 font-body text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-[#3B0B1F] hover:shadow-lg hover:scale-102 transition-all cursor-pointer shadow-sm whitespace-nowrap"
              >
                START BUILDING
              </button>
              
              <button
                onClick={() => onViewDemo()}
                className="px-6 sm:px-8 py-3 rounded-full bg-[#4A0E17] text-[#FAF0F3] border border-[#C8A84B]/70 font-body text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-[#3B0B1F] hover:shadow-lg hover:scale-102 transition-all cursor-pointer shadow-sm whitespace-nowrap"
              >
                VIEW DEMO
              </button>
            </motion.div>
          </div>
        </div>

        {/* BOTTOM SIGNATURE TAGLINE BAR */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-12 sm:mt-16 pt-6 border-t border-[#C8A84B]/40 flex items-center justify-center"
        >
          <div className="flex items-center gap-3 sm:gap-6 text-center">
            {/* Left 4-Point Star Sparkle */}
            <span className="text-[#C8A84B] text-lg sm:text-xl font-serif">✦</span>

            {/* Text Trio */}
            <div className="font-serif-heading text-base sm:text-2xl font-normal text-[#3B0B1F] tracking-wide flex items-center gap-2 sm:gap-4">
              <span>Personalized</span>
              <span className="text-[#C8A84B] font-light">|</span>
              <span>Elegant</span>
              <span className="text-[#C8A84B] font-light">|</span>
              <span>Effortless</span>
            </div>

            {/* Right 4-Point Star Sparkle */}
            <span className="text-[#C8A84B] text-lg sm:text-xl font-serif">✦</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};


