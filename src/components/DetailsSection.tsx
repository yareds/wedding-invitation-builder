import React from 'react';
import { WeddingConfig } from '../types';
import { THEME_PRESETS } from '../utils/themePresets';
import { Church, Wine } from 'lucide-react';

interface DetailsSectionProps {
  config: WeddingConfig;
}

export const DetailsSection: React.FC<DetailsSectionProps> = ({ config }) => {
  const theme = THEME_PRESETS[config.themeId] || THEME_PRESETS.bordeaux;
  const colors = theme.colors;

  return (
    <section id="details-section" className="py-16 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Section Heading */}
      <div className="text-center mb-12">
        <p className="font-body text-xs uppercase tracking-[0.3em] font-semibold mb-2" style={{ color: colors.blush }}>
          Celebration Guide
        </p>
        <h2 className="font-serif-heading text-3xl sm:text-4xl font-normal" style={{ color: colors.primary }}>
          Wedding Details &amp; Event Locations
        </h2>
        <div className="w-16 h-[2px] mx-auto mt-4" style={{ backgroundColor: colors.gold }} />
      </div>

      {/* Event Cards Stacked Vertical */}
      <div className="space-y-6">
        {/* Card 1: Sacred Ceremony */}
        <div
          className="bg-white rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all border-l-4 flex flex-col md:flex-row md:items-center justify-between gap-6 group"
          style={{ borderLeftColor: colors.gold }}
        >
          <div className="flex items-start gap-4">
            {/* Icon Circle */}
            <div
              className="w-12 h-12 rounded-full border flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
              style={{
                backgroundColor: colors.blushPale,
                borderColor: colors.gold + '60'
              }}
            >
              <Church className="w-6 h-6" style={{ color: colors.gold }} />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-body text-[11px] uppercase tracking-widest font-semibold" style={{ color: colors.blush }}>
                  Sacred Matrimony . የቃልኪዳን ስነስርዓት
                </span>
              </div>
              <h3 className="font-serif-heading text-xl sm:text-2xl font-normal mb-2" style={{ color: colors.primary }}>
                {config.churchEth || 'ቅድስት ሥላሴ ካቴድራል፤ አዲስ አበባ'}
              </h3>
              <p className="font-body text-sm font-semibold mb-2" style={{ color: colors.primary }}>
                {config.churchEn || 'Holy Trinity Cathedral, Addis Ababa'}
              </p>
              <p className="font-quote italic text-xs" style={{ color: colors.blush }}>
                Organ prelude begins 30 minutes prior. Doors close promptly for the processional.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Reception & Dinner */}
        <div
          className="bg-white rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all border-l-4 flex flex-col md:flex-row md:items-center justify-between gap-6 group"
          style={{ borderLeftColor: colors.primary }}
        >
          <div className="flex items-start gap-4">
            {/* Icon Circle */}
            <div
              className="w-12 h-12 rounded-full border flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
              style={{
                backgroundColor: colors.primary,
                borderColor: colors.gold + '60'
              }}
            >
              <Wine className="w-6 h-6" style={{ color: colors.gold }} />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-body text-[11px] uppercase tracking-widest font-semibold" style={{ color: colors.blush }}>
                  Reception &amp; Dinner . የምሳ/እራት ግብዣ ቦታ
                </span>
              </div>
              <h3 className="font-serif-heading text-xl sm:text-2xl font-normal mb-2" style={{ color: colors.primary }}>
                {config.receptionEth || 'ግዮን ሆቴል (ግራንድ ሆል)፤ አዲስ አበባ'}
              </h3>
              <p className="font-body text-sm font-semibold mb-2" style={{ color: colors.primary }}>
                {config.receptionEn || 'Ghion Hotel Grand Hall, Addis Ababa'}
              </p>
              <p className="font-quote italic text-xs" style={{ color: colors.blush }}>
                Cocktails, traditional toast, lunch &amp; dinner banquet, and live music celebration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


