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

  const groomInit = (config.groomEth || config.groomEn || 'የሙሽራው ስም').trim()[0] || 'የ';
  const brideInit = (config.brideEth || config.brideEn || 'የሙሽሪት ስም').trim()[0] || 'የ';

  return (
    <footer
      id="botanical-footer"
      className="relative pt-12 pb-16 px-4 text-center overflow-hidden border-t-2 transition-colors duration-500"
      style={{
        backgroundColor: colors.footerBg,
        borderColor: colors.gold + '60',
        color: colors.blushPale
      }}
    >
      {/* Top SVG Vine-and-Flower Band */}
      <BotanicalFrame position="banner-top" themeId={config.themeId} colorMode="gold" className="-mt-8 mb-4" />

      <div className="max-w-2xl mx-auto relative z-10 space-y-4 my-4">
        {/* Monogram Circle */}
        <div
          className="inline-flex items-center justify-center w-14 h-14 rounded-full border shadow-lg mb-2"
          style={{
            borderColor: colors.gold,
            backgroundColor: colors.primary
          }}
        >
          <span className="font-serif-heading text-lg tracking-widest" style={{ color: colors.gold }}>
            {groomInit} እና {brideInit}
          </span>
        </div>

        <h3 className="font-serif-heading text-2xl sm:text-3xl font-normal" style={{ color: colors.blushPale }}>
          {config.groomEth || config.groomEn || 'የሙሽራው ስም'} እና {config.brideEth || config.brideEn || 'የሙሽሪት ስም'}
        </h3>

        <p className="font-quote italic text-sm max-w-md mx-auto" style={{ color: colors.blush }}>
          "We cannot wait to share the magic of our wedding day with you."
        </p>

        <p className="font-body text-xs tracking-widest uppercase pt-4 opacity-70">
          {config.dateGC || 'May 09, 2026'} • {config.dateEC || 'ግንቦት 01, 2018 ዓ.ም'}
        </p>
      </div>

      {/* Bottom SVG Vine-and-Flower Band */}
      <BotanicalFrame position="banner-bottom" themeId={config.themeId} colorMode="gold" className="mt-8 -mb-12" />
    </footer>
  );
};

