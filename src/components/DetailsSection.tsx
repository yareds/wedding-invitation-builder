import React from 'react';
import { WeddingConfig } from '../types';
import { THEME_PRESETS } from '../utils/themePresets';
import { Church, Wine, Shirt, Hotel, Navigation } from 'lucide-react';

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

      {/* Four Left-Bordered Cards Stacked Vertical */}
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
                  {config.timeDisplay || '02:00 PM'}
                </span>
                <span style={{ color: colors.blush }}>•</span>
                <span className="font-body text-xs opacity-70" style={{ color: colors.primary }}>Sacred Matrimony</span>
              </div>
              <h3 className="font-serif-heading text-xl sm:text-2xl font-normal mb-2" style={{ color: colors.primary }}>
                {config.churchEth || 'ካቴድራል ኦፍ ዘ ብለስድ ሳክራመንት'}
              </h3>
              {config.churchEn && (
                <p className="font-body text-sm font-semibold mb-2" style={{ color: colors.primary }}>
                  {config.churchEn}
                </p>
              )}
              <p className="font-quote italic text-xs" style={{ color: colors.blush }}>
                Organ prelude begins 30 minutes prior. Doors close promptly for the processional.
              </p>
            </div>
          </div>

          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(config.churchEn || config.churchEth)}`}
            target="_blank"
            rel="noopener noreferrer"
            id="ceremony-map-btn"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border font-body text-xs font-semibold hover:opacity-90 transition-all shrink-0 cursor-pointer self-start md:self-center shadow-sm"
            style={{
              borderColor: colors.gold,
              color: colors.primary
            }}
          >
            <Navigation className="w-4 h-4" style={{ color: colors.gold }} />
            <span>Map &amp; Directions</span>
          </a>
        </div>

        {/* Card 2: Vineyard Reception */}
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
                  Grand Celebration
                </span>
                <span style={{ color: colors.blush }}>•</span>
                <span className="font-body text-xs opacity-70" style={{ color: colors.primary }}>Reception &amp; Dinner</span>
              </div>
              <h3 className="font-serif-heading text-xl sm:text-2xl font-normal mb-2" style={{ color: colors.primary }}>
                {config.receptionEth || 'ሴንት ሄሌና ቪንያርድ ኤስቴት'}
              </h3>
              {config.receptionEn && (
                <p className="font-body text-sm font-semibold mb-2" style={{ color: colors.primary }}>
                  {config.receptionEn}
                </p>
              )}
              <p className="font-quote italic text-xs" style={{ color: colors.blush }}>
                Cocktails, traditional toast, multi-course banquet dinner, and live orchestra dancing.
              </p>
            </div>
          </div>

          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(config.receptionEn || config.receptionEth)}`}
            target="_blank"
            rel="noopener noreferrer"
            id="reception-map-btn"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border font-body text-xs font-semibold transition-all shrink-0 cursor-pointer self-start md:self-center shadow-sm"
            style={{
              borderColor: colors.primary,
              backgroundColor: colors.primary,
              color: colors.blushPale
            }}
          >
            <Navigation className="w-4 h-4" style={{ color: colors.gold }} />
            <span>Map &amp; Directions</span>
          </a>
        </div>

        {/* Card 3: Dress Code */}
        <div
          className="bg-white rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all border-l-4 flex flex-col md:flex-row md:items-center justify-between gap-6 group"
          style={{ borderLeftColor: colors.blush }}
        >
          <div className="flex items-start gap-4">
            {/* Icon Circle */}
            <div
              className="w-12 h-12 rounded-full border flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
              style={{
                backgroundColor: colors.blushPale,
                borderColor: colors.blush + '60'
              }}
            >
              <Shirt className="w-6 h-6" style={{ color: colors.blush }} />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-body text-[11px] uppercase tracking-widest font-semibold" style={{ color: colors.blush }}>
                  Attire Guidance
                </span>
              </div>
              <h3 className="font-serif-heading text-xl sm:text-2xl font-normal mb-2" style={{ color: colors.primary }}>
                {config.dressCode || 'Black-Tie Formal & Traditional Elegance'}
              </h3>
              <p className="font-body text-sm leading-relaxed mb-2 opacity-80" style={{ color: colors.primary }}>
                We kindly request formal attire or traditional Ethiopian celebration wear.
              </p>
              <div className="flex items-center gap-2 mt-3">
                <span className="font-body text-xs opacity-70" style={{ color: colors.primary }}>Palette Inspiration:</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full border shadow-sm" style={{ backgroundColor: colors.primary, borderColor: '#FFF' }} />
                  <span className="w-4 h-4 rounded-full border shadow-sm" style={{ backgroundColor: colors.blush, borderColor: '#FFF' }} />
                  <span className="w-4 h-4 rounded-full border shadow-sm" style={{ backgroundColor: colors.gold, borderColor: '#FFF' }} />
                  <span className="w-4 h-4 rounded-full border shadow-sm" style={{ backgroundColor: colors.bg, borderColor: '#DDD' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: Accommodations & Travel */}
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
              <Hotel className="w-6 h-6" style={{ color: colors.gold }} />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-body text-[11px] uppercase tracking-widest font-semibold" style={{ color: colors.blush }}>
                  Contact &amp; Assistance
                </span>
              </div>
              <h3 className="font-serif-heading text-xl sm:text-2xl font-normal mb-2" style={{ color: colors.primary }}>
                Wedding Hotline &amp; Inquiry
              </h3>
              <p className="font-body text-sm leading-relaxed" style={{ color: colors.primary }}>
                For special assistance, travel advice, or dietary requirements, please reach us directly:
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-semibold" style={{ color: colors.primary }}>
                {config.phone1 && <span className="px-3 py-1 rounded-full bg-slate-100 border">📞 {config.phone1}</span>}
                {config.phone2 && <span className="px-3 py-1 rounded-full bg-slate-100 border">📞 {config.phone2}</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

