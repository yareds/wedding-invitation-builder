import React from 'react';
import { WeddingConfig } from '../types';
import { THEME_PRESETS } from '../utils/themePresets';
import { BotanicalFrame } from './BotanicalFrame';

interface BotanicalFooterProps {
  config: WeddingConfig;
}

export const BotanicalFooter: React.FC<BotanicalFooterProps> = ({ config }) => {
  const theme = THEME_PRESETS[config.themeId] || THEME_PRESETS.bordeaux;
  const colors = theme.colors;

  const groomFullName = [config.groomEn, config.groomEth].filter(Boolean).join(' ').trim() || 'የሙሽራው ስም';
  const brideFullName = [config.brideEn, config.brideEth].filter(Boolean).join(' ').trim() || 'የሙሽሪት ስም';
  const groomInit = (config.groomEn || config.groomEth || 'የሙሽራው ስም').trim()[0] || 'የ';
  const brideInit = (config.brideEn || config.brideEth || 'የሙሽሪት ስም').trim()[0] || 'የ';

  return (
    <footer
      id="botanical-footer"
      className="relative pt-12 pb-16 px-4 text-center overflow-hidden border-t-2 transition-colors duration-500"
      style={{
        backgroundColor: colors.primary,
        borderColor: colors.gold,
        color: '#FAF0F3'
      }}
    >
      {/* Top SVG Vine-and-Flower Band */}
      <BotanicalFrame position="banner-top" themeId={config.themeId} frameStyle={config.frameStyle} colorMode="gold" className="-mt-8 mb-4" />

      <div className="max-w-2xl mx-auto relative z-10 space-y-4 my-4">
        {/* Monogram Circle */}
        <div
          className="inline-flex items-center justify-center w-14 h-14 rounded-full border shadow-lg mb-2"
          style={{
            borderColor: colors.gold,
            backgroundColor: 'transparent'
          }}
        >
          <span className="font-serif-heading text-lg tracking-widest" style={{ color: colors.gold }}>
            {groomInit} እና {brideInit}
          </span>
        </div>

        <h3 className="font-serif-heading text-2xl sm:text-3xl font-normal text-[#FAF0F3]">
          {groomFullName} እና {brideFullName}
        </h3>

        <p className="font-quote italic text-sm max-w-md mx-auto text-[#E5A4B5]">
          "We cannot wait to share the magic of our wedding day with you."
        </p>

        <p className="font-body text-xs tracking-widest uppercase pt-4 text-[#FAF0F3]/80">
          {config.dateGC || 'May 09, 2026'} • {config.dateEC || 'ግንቦት 01, 2018 ዓ.ም'}
        </p>
      </div>

      {/* Bottom SVG Vine-and-Flower Band */}
      <BotanicalFrame position="banner-bottom" themeId={config.themeId} frameStyle={config.frameStyle} colorMode="gold" className="mt-8 -mb-12" />
    </footer>
  );
};

