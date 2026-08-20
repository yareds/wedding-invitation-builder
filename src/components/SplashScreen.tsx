import React, { useState } from 'react';
import { WeddingConfig } from '../types';
import { THEME_PRESETS } from '../utils/themePresets';
import { BotanicalFrame } from './BotanicalFrame';
import { Sparkles, Music } from 'lucide-react';

interface SplashScreenProps {
  config: WeddingConfig;
  onOpenInvitation: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ config, onOpenInvitation }) => {
  const [isOpening, setIsOpening] = useState(false);
  const theme = THEME_PRESETS[config.themeId] || THEME_PRESETS.bordeaux;
  const colors = theme.colors;

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpenInvitation();
    }, 700);
  };

  const groomFullName = [config.groomEn, config.groomEth].filter(Boolean).join(' ').trim() || 'የሙሽራው ስም';
  const brideFullName = [config.brideEn, config.brideEth].filter(Boolean).join(' ').trim() || 'የሙሽሪት ስም';
  const groomInit = (config.groomEn || config.groomEth || 'የሙሽራው ስም').trim()[0] || 'የ';
  const brideInit = (config.brideEn || config.brideEth || 'የሙሽሪት ስም').trim()[0] || 'የ';

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
        isOpening ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{ backgroundColor: colors.bg, color: colors.primary }}
    >
      {/* Hand-drawn Botanical SVG Corner Illustrations */}
      <BotanicalFrame position="top-left" themeId={config.themeId} className="absolute top-0 left-0" colorMode="gold" />
      <BotanicalFrame position="top-right" themeId={config.themeId} className="absolute top-0 right-0" colorMode="gold" />
      <BotanicalFrame position="bottom-left" themeId={config.themeId} className="absolute bottom-0 left-0" colorMode="gold" />
      <BotanicalFrame position="bottom-right" themeId={config.themeId} className="absolute bottom-0 right-0" colorMode="gold" />

      {/* Decorative Outer Border Box */}
      <div
        className="relative w-[90%] max-w-lg mx-auto p-8 sm:p-12 text-center border rounded-sm shadow-2xl backdrop-blur-md flex flex-col items-center"
        style={{
          borderColor: colors.gold + '60',
          backgroundColor: colors.primary + 'E6'
        }}
      >
        {/* Subtle Gold Inner Double Line */}
        <div className="absolute inset-2 border rounded-sm pointer-events-none" style={{ borderColor: colors.gold + '40' }} />

        {/* Monogram Badge */}
        <div className="relative mb-6">
          <div
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 flex items-center justify-center p-1 shadow-lg"
            style={{ borderColor: colors.gold, backgroundColor: 'transparent' }}
          >
            <div className="w-full h-full rounded-full border flex items-center justify-center" style={{ borderColor: colors.blush + '50', backgroundColor: 'transparent' }}>
              <span className="font-serif-heading text-2xl sm:text-3xl tracking-widest font-light" style={{ color: colors.gold }}>
                {groomInit} <span className="text-lg font-normal" style={{ color: colors.blush }}>እና</span> {brideInit}
              </span>
            </div>
          </div>
        </div>


        {/* Couple Names */}
        <h1 className="font-serif-heading text-2xl sm:text-4xl font-normal leading-tight mb-3" style={{ color: colors.blushPale }}>
          {groomFullName}{' '}
          <span className="font-serif-heading italic text-xl sm:text-3xl" style={{ color: colors.gold }}>እና</span>{' '}
          {brideFullName}
        </h1>

        {/* Date and Location */}
        <div className="flex items-center justify-center gap-3 my-4" style={{ color: colors.gold }}>
          <span className="h-[1px] w-8 opacity-40" style={{ backgroundColor: colors.gold }}></span>
          <p className="font-quote italic text-sm sm:text-base" style={{ color: colors.blushPale }}>
            {config.dateGC || 'May 09, 2026'} • {config.dateEC || 'ግንቦት 01, 2018 ዓ.ም'}
          </p>
          <span className="h-[1px] w-8 opacity-40" style={{ backgroundColor: colors.gold }}></span>
        </div>

        <p className="font-body text-xs mb-8 max-w-xs leading-relaxed opacity-80" style={{ color: colors.blushPale }}>
          You are cordially invited to celebrate our wedding ceremony and grand celebration.
        </p>

        {/* "Open Invitation" Button */}
        <button
          onClick={handleOpen}
          disabled={isOpening}
          id="open-invitation-btn"
          className="group relative inline-flex items-center gap-3 px-8 py-3.5 font-body text-sm font-semibold tracking-wider uppercase rounded-full shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border cursor-pointer"
          style={{
            backgroundColor: colors.gold,
            color: colors.primary,
            borderColor: colors.blushPale + '50'
          }}
        >
          <Music className="w-4 h-4 group-hover:rotate-12 transition-transform" style={{ color: colors.primary }} />
          <span>Open Invitation</span>
          <Sparkles className="w-4 h-4 animate-pulse" style={{ color: colors.primary }} />
        </button>

        {/* Subtle music note hint */}
        <p className="mt-4 text-[11px] font-body flex items-center gap-1.5 opacity-80" style={{ color: colors.blush }}>
          <span>♪ Includes romantic background audio</span>
        </p>
      </div>
    </div>
  );
};
