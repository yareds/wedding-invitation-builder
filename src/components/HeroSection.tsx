import React from 'react';
import { WeddingConfig } from '../types';
import { THEME_PRESETS } from '../utils/themePresets';
import { BotanicalFrame } from './BotanicalFrame';
import { Calendar, MapPin } from 'lucide-react';

interface HeroSectionProps {
  config: WeddingConfig;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ config }) => {
  const theme = THEME_PRESETS[config.themeId] || THEME_PRESETS.bordeaux;
  const colors = theme.colors;

  const groomInit = (config.groomEth || config.groomEn || 'የሙሽራው ስም').trim()[0] || 'የ';
  const brideInit = (config.brideEth || config.brideEn || 'የሙሽሪት ስም').trim()[0] || 'የ';

  return (
    <section
      id="hero-section"
      className="relative pt-20 pb-16 px-4 sm:px-6 md:px-8 overflow-hidden text-center transition-colors duration-500"
      style={{
        backgroundColor: colors.bg,
        color: colors.primary
      }}
    >
      {/* Background Image Layer if custom hero image is uploaded */}
      {config.heroImg && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={config.heroImg}
            alt="Hero Background"
            className="w-full h-full object-cover object-center scale-105 animate-fade-in"
          />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: colors.heroOv }}
          />
        </div>
      )}

      {/* Corner Botanical SVG Frames */}
      <BotanicalFrame position="top-left" themeId={config.themeId} className="absolute top-2 left-2 sm:top-6 sm:left-6 z-10" colorMode="gold" />
      <BotanicalFrame position="top-right" themeId={config.themeId} className="absolute top-2 right-2 sm:top-6 sm:right-6 z-10" colorMode="gold" />

      <div className={`max-w-4xl mx-auto relative z-10 flex flex-col items-center ${config.heroImg ? 'text-white' : ''}`}>
        {/* Monogram Circle in Hero */}
        <div className="relative mb-8 group cursor-pointer">
          <div
            className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-2 p-2 shadow-2xl transition-transform duration-500 hover:scale-105 flex items-center justify-center"
            style={{
              borderColor: colors.gold,
              backgroundColor: colors.primary
            }}
          >
            {/* Inner Decorative Bezel */}
            <div
              className="w-full h-full rounded-full border border-dashed flex items-center justify-center shadow-inner"
              style={{
                borderColor: colors.gold + '90',
                backgroundColor: '#3D0A1F'
              }}
            >
              <div className="text-center">
                <span
                  className="font-serif-heading text-3xl sm:text-4xl font-light tracking-widest block"
                  style={{ color: colors.gold }}
                >
                  {groomInit}{' '}
                  <span className="font-serif-heading text-xl sm:text-2xl font-normal" style={{ color: colors.blushLt || '#E5A4B5' }}>
                    &amp;
                  </span>{' '}
                  {brideInit}
                </span>
                <span className="font-quote italic text-[10px] sm:text-xs tracking-widest uppercase block mt-0.5 text-white/90">
                  EST. 2026
                </span>
              </div>
            </div>
          </div>
          {/* Subtle Accent Glow */}
          <div
            className="absolute inset-0 rounded-full border blur-sm pointer-events-none opacity-40"
            style={{ borderColor: colors.gold }}
          />
        </div>


        {/* Couple Names (Amharic & English) */}
        <div className="mb-4 max-w-3xl">
          {/* Amharic Heading */}
          <h1
            className="font-serif-heading text-3xl sm:text-5xl md:text-6xl font-normal leading-tight tracking-tight mb-2"
            style={{ color: config.heroImg ? '#FFFFFF' : colors.primary }}
          >
            {config.groomEth || config.groomEn || 'የሙሽራው ስም'}
            <span className="block font-quote italic text-2xl sm:text-4xl my-2 font-light" style={{ color: colors.gold }}>
              እና
            </span>
            {config.brideEth || config.brideEn || 'የሙሽሪት ስም'}
          </h1>

          {/* English Sub-heading */}
          {(config.groomEn || config.brideEn) && (
            <p
              className="font-quote italic text-base sm:text-xl tracking-wide mt-2 opacity-90"
              style={{ color: config.heroImg ? 'rgba(255,255,255,0.9)' : colors.primary }}
            >
              {config.groomEn} &amp; {config.brideEn}
            </p>
          )}
        </div>

        {/* Subtitle / Invitation Text */}
        <p
          className="font-body text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-8 opacity-90"
          style={{ color: config.heroImg ? 'rgba(255,255,255,0.9)' : colors.primary }}
        >
          request the honour of your presence as they exchange vows of everlasting love and celebrate their holy matrimony.
        </p>

        {/* Key Event Badges */}
        <div
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-body px-6 py-4 rounded-2xl border shadow-md backdrop-blur-md"
          style={{
            backgroundColor: config.heroImg ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.85)',
            borderColor: colors.gold + '60',
            color: config.heroImg ? '#FFFFFF' : colors.primary
          }}
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" style={{ color: colors.gold }} />
            <span className="font-semibold">{config.dateGC || 'Saturday, May 09, 2026'}</span>
          </div>
          <span className="hidden sm:inline" style={{ color: colors.blush }}>•</span>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" style={{ color: colors.blush }} />
            <span>{config.dateEC || 'ግንቦት 01, 2018 ዓ.ም'}</span>
          </div>
        </div>
      </div>

      {/* Banner Bottom Botanical Divider */}
      <BotanicalFrame position="banner-bottom" className="mt-12 z-10" colorMode="gold" />
    </section>
  );
};

