import React from 'react';
import { WeddingConfig } from '../types';
import { THEME_PRESETS } from '../utils/themePresets';
import { BotanicalFrame } from './BotanicalFrame';

interface StoryQuoteSectionProps {
  config: WeddingConfig;
}

export const StoryQuoteSection: React.FC<StoryQuoteSectionProps> = ({ config }) => {
  const theme = THEME_PRESETS[config.themeId] || THEME_PRESETS.bordeaux;
  const colors = theme.colors;

  const groomName = config.groomEth || config.groomEn || 'የሙሽራው ስም';
  const brideName = config.brideEth || config.brideEn || 'የሙሽሪት ስም';

  return (
    <section
      id="story-quote-section"
      className="relative py-20 px-4 sm:px-6 overflow-hidden my-12 transition-colors duration-500"
      style={{
        backgroundColor: colors.blushPale,
        color: colors.primary
      }}
    >
      {/* Corner Botanical Frame Decorations */}
      <BotanicalFrame position="top-left" themeId={config.themeId} className="absolute top-2 left-2" colorMode="gold" />
      <BotanicalFrame position="top-right" themeId={config.themeId} className="absolute top-2 right-2" colorMode="gold" />
      <BotanicalFrame position="bottom-left" themeId={config.themeId} className="absolute bottom-2 left-2" colorMode="gold" />
      <BotanicalFrame position="bottom-right" themeId={config.themeId} className="absolute bottom-2 right-2" colorMode="gold" />

      <div className="max-w-3xl mx-auto text-center relative z-10 px-4">
        {/* Oversized Opening Quotation Mark */}
        <div
          className="font-serif-heading text-7xl sm:text-9xl leading-none opacity-80 -mb-8 sm:-mb-12 select-none font-serif"
          style={{ color: colors.gold }}
        >
          “
        </div>

        {/* Large Italic Love Quote */}
        <blockquote className="font-quote italic text-xl sm:text-3xl leading-relaxed mb-8 font-light max-w-2xl mx-auto">
          "{config.scripture || 'Whatever our souls are made of, his and hers are the same. A quiet symphony of shared laughter, enduring trust, and infinite devotion.'}"
        </blockquote>

        {/* Quote Attribution / Names */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className="h-[1px] w-12 opacity-60" style={{ backgroundColor: colors.gold }} />
          <span className="font-body text-xs uppercase tracking-[0.25em] font-medium" style={{ color: colors.gold }}>
            {groomName} እና {brideName}
          </span>
          <span className="h-[1px] w-12 opacity-60" style={{ backgroundColor: colors.gold }} />
        </div>

        {/* Brief Romantic Love Story */}
        <div
          className="rounded-3xl p-6 sm:p-10 border shadow-lg backdrop-blur-sm text-left sm:text-center space-y-4"
          style={{
            backgroundColor: '#FFFFFF',
            borderColor: colors.gold + '60'
          }}
        >
          <h3 className="font-serif-heading text-2xl text-center font-normal" style={{ color: colors.primary }}>
            Our Love Story
          </h3>
          <p className="font-body text-sm sm:text-base leading-relaxed opacity-90" style={{ color: colors.primary }}>
            {config.storyText ||
              'We first crossed paths five years ago. What began as an unexpected conversation over coffee quickly blossomed into a profound companionship built on shared dreams, art, and quiet Sunday strolls.'}
          </p>
        </div>
      </div>
    </section>
  );
};

