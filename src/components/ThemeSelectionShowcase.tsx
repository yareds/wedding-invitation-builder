import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Lock, ArrowRight, Eye } from 'lucide-react';
import { ThemeId } from '../types';
import { THEME_PRESETS, ThemePreset } from '../utils/themePresets';

interface ThemeSelectionShowcaseProps {
  selectedThemeId?: ThemeId;
  onSelectTheme: (themeId: ThemeId) => void;
  onPreviewTheme?: (themePreset: ThemePreset) => void;
  showFullPageDecorations?: boolean;
}

export type ThemeCategory =
  | 'All'
  | 'Jewel Tones'
  | 'Pastels & Florals'
  | 'Earth Tones'
  | 'Neutrals & Classic'
  | 'Bold & Modern';

interface ShowcaseThemeItem {
  id: ThemeId;
  category: ThemeCategory;
}

const SHOWCASE_THEMES: ShowcaseThemeItem[] = [
  { id: 'bordeaux', category: 'Jewel Tones' },
  { id: 'sapphire', category: 'Jewel Tones' },
  { id: 'amethyst', category: 'Jewel Tones' },
  { id: 'rubyvelvet', category: 'Jewel Tones' },
  { id: 'peacockteal', category: 'Jewel Tones' },

  { id: 'emerald', category: 'Pastels & Florals' },
  { id: 'rosegarden', category: 'Pastels & Florals' },
  { id: 'lavender', category: 'Pastels & Florals' },
  { id: 'sagemint', category: 'Pastels & Florals' },
  { id: 'peachblossom', category: 'Pastels & Florals' },

  { id: 'terracotta', category: 'Earth Tones' },
  { id: 'olivebronze', category: 'Earth Tones' },
  { id: 'desertsand', category: 'Earth Tones' },
  { id: 'espressopearl', category: 'Earth Tones' },

  { id: 'goldluxury', category: 'Neutrals & Classic' },
  { id: 'classicivory', category: 'Neutrals & Classic' },
  { id: 'slateplatinum', category: 'Neutrals & Classic' },

  { id: 'midnight', category: 'Bold & Modern' },
  { id: 'marigold', category: 'Bold & Modern' },
  { id: 'electricviolet', category: 'Bold & Modern' }
];

export function ThemeSelectionShowcase({
  selectedThemeId = 'bordeaux',
  onSelectTheme,
  onPreviewTheme,
  showFullPageDecorations = true
}: ThemeSelectionShowcaseProps) {
  const sectionTopRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<ThemeCategory>('All');
  const [visibleCount, setVisibleCount] = useState<number>(3);

  const categories: { label: ThemeCategory; count: number }[] = [
    { label: 'All', count: SHOWCASE_THEMES.length },
    { label: 'Jewel Tones', count: SHOWCASE_THEMES.filter((t) => t.category === 'Jewel Tones').length },
    { label: 'Pastels & Florals', count: SHOWCASE_THEMES.filter((t) => t.category === 'Pastels & Florals').length },
    { label: 'Earth Tones', count: SHOWCASE_THEMES.filter((t) => t.category === 'Earth Tones').length },
    { label: 'Neutrals & Classic', count: SHOWCASE_THEMES.filter((t) => t.category === 'Neutrals & Classic').length },
    { label: 'Bold & Modern', count: SHOWCASE_THEMES.filter((t) => t.category === 'Bold & Modern').length }
  ];

  const handleCategoryChange = (category: ThemeCategory) => {
    setActiveCategory(category);
    setVisibleCount(3);
  };

  const handleShowLess = () => {
    setVisibleCount(3);
    sectionTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const filteredThemes = activeCategory === 'All'
    ? SHOWCASE_THEMES
    : SHOWCASE_THEMES.filter((t) => t.category === activeCategory);

  const visibleThemes = filteredThemes.slice(0, visibleCount);

  const renderThemeColorGradient = (preset: ThemePreset) => {
    const c = preset.colors;

    return (
      <div
        className="relative w-full h-40 sm:h-48 overflow-hidden transition-all duration-300"
        style={{
          background: `linear-gradient(135deg, ${c.primary} 0%, ${c.blush} 50%, ${c.gold} 100%)`
        }}
      >
        {/* Soft atmospheric overlay for smooth tonal blend */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 80% 20%, ${c.goldLt || c.gold} 0%, transparent 60%)`
          }}
        />
      </div>
    );
  };

  return (
    <div ref={sectionTopRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative scroll-mt-12">
      {/* Background Decorative Flourishes if enabled */}
      {showFullPageDecorations && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#D4849A]/20 blur-3xl" />
          <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-[#C8A84B]/20 blur-3xl" />
        </div>
      )}

      {/* Section Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto mb-10 sm:mb-14 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#5A0A21]/10 text-[#5A0A21] border border-[#5A0A21]/20 font-body text-xs font-semibold uppercase tracking-widest">
          <span>20 Signature Color Themes</span>
        </div>

        {/* Decorative Top Accent */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <svg width="40" height="16" viewBox="0 0 40 16" fill="none" className="text-[#C8A84B]">
            <path d="M0 8 C10 4, 25 12, 40 8" stroke="currentColor" strokeWidth="1.2" />
            <ellipse cx="28" cy="4" rx="4" ry="2" fill="currentColor" opacity="0.8" />
            <ellipse cx="14" cy="12" rx="4" ry="2" fill="currentColor" opacity="0.8" />
          </svg>
          <div className="w-6 h-6 rounded-full bg-[#FAF0F3] border border-[#C8A84B] flex items-center justify-center shadow-xs">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#C8A84B">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <svg width="40" height="16" viewBox="0 0 40 16" fill="none" className="text-[#C8A84B] scale-x-[-1]">
            <path d="M40 8 C30 4, 15 12, 0 8" stroke="currentColor" strokeWidth="1.2" />
            <ellipse cx="12" cy="4" rx="4" ry="2" fill="currentColor" opacity="0.8" />
            <ellipse cx="26" cy="12" rx="4" ry="2" fill="currentColor" opacity="0.8" />
          </svg>
        </div>

        <h2 className="font-serif-heading text-3xl sm:text-5xl font-normal text-[#5A0A21] tracking-tight">
          Choose Your Theme
        </h2>

        <p className="font-body text-xs sm:text-base text-[#3B0B1F]/75 max-w-lg mx-auto leading-relaxed">
          Select from 20 bespoke palettes crafted across jewel tones, pastels, rich earth tones, neutrals, and modern luxury aesthetics.
        </p>

        {/* Category Filter Pills */}
        <div className="pt-4 flex items-center justify-center gap-2 flex-wrap">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.label;
            return (
              <button
                key={cat.label}
                type="button"
                onClick={() => handleCategoryChange(cat.label)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#3B0B1F] text-[#FAF0F3] shadow-md border border-[#C8A84B]'
                    : 'bg-white/80 border border-[#C8A84B]/40 text-[#3B0B1F]/80 hover:bg-white hover:border-[#C8A84B]'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-[#C8A84B] text-[#3B0B1F]' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Luxury Theme Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative z-10">
        <AnimatePresence mode="popLayout">
          {visibleThemes.map((item) => {
            const preset = THEME_PRESETS[item.id] || THEME_PRESETS.bordeaux;
            const isSelected = selectedThemeId === item.id;
            const swatches = [
              preset.colors.primary,
              preset.colors.blush,
              preset.colors.blushLt,
              preset.colors.gold
            ];

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={() => onSelectTheme(item.id)}
                className={`bg-white rounded-3xl overflow-hidden border-2 transition-all duration-300 shadow-md cursor-pointer flex flex-col relative group hover:-translate-y-1 ${
                  isSelected
                    ? 'border-[#C8A84B] ring-4 ring-[#C8A84B]/20 shadow-2xl scale-[1.01]'
                    : 'border-[#EAE0D5] hover:border-[#C8A84B]/70 hover:shadow-xl'
                }`}
              >
                {/* Golden Checkmark Badge on Top Right when Selected */}
                {isSelected && (
                  <div className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-[#C8A84B] border-2 border-white flex items-center justify-center shadow-lg animate-in zoom-in duration-200">
                    <Check className="w-5 h-5 text-[#5A0A21] stroke-[2.5]" />
                  </div>
                )}

                {/* Category Tag on Top Left */}
                <div className="absolute top-3 left-3 z-20">
                  <span className="font-body text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-[#3B0B1F]/90 text-[#C8A84B] shadow-sm backdrop-blur-xs">
                    {item.category}
                  </span>
                </div>

                {/* Theme Purely Color-Focused Gradient Preview */}
                <div className="relative">
                  {renderThemeColorGradient(preset)}
                </div>

                {/* Solid Color-Blocked Title Banner */}
                <div
                  className="py-3 px-4 text-center transition-colors shadow-inner flex items-center justify-between"
                  style={{ backgroundColor: preset.colors.primary }}
                >
                  <h3 className="font-serif-heading text-base sm:text-lg font-normal text-white tracking-wide truncate">
                    {preset.name}
                  </h3>
                  <span className="text-[10px] font-body font-semibold text-[#E2C873] uppercase tracking-wider shrink-0 ml-2">
                    {preset.themeStyle.split('&')[0].trim()}
                  </span>
                </div>

                {/* Body: Description & 4-Swatch Color Palette */}
                <div className="p-5 sm:p-6 text-center space-y-4 flex-1 flex flex-col justify-between bg-white">
                  <p className="font-body text-xs text-[#3B0B1F]/75 leading-relaxed min-h-[2.5rem]">
                    {preset.description}
                  </p>

                  {/* 4 Rounded Rectangular Color Swatches */}
                  <div className="flex items-center justify-center gap-2 pt-1">
                    {swatches.map((color, idx) => (
                      <div
                        key={idx}
                        className="w-9 h-6 rounded-md border border-black/10 shadow-xs transition-transform hover:scale-110"
                        style={{ backgroundColor: color }}
                        title={`Color ${idx + 1}: ${color}`}
                      />
                    ))}
                  </div>

                  {/* Preview / Select Actions */}
                  <div className="pt-3 flex items-center justify-between gap-2 border-t border-gray-100 mt-2">
                    {onPreviewTheme && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onPreviewTheme(preset);
                        }}
                        className="text-[11px] font-semibold text-[#A87B1B] hover:text-[#5A0A21] flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectTheme(item.id);
                      }}
                      className={`text-[11px] font-bold px-4 py-1.5 rounded-full transition-all flex items-center gap-1 cursor-pointer ml-auto ${
                        isSelected
                          ? 'bg-[#5A0A21] text-[#FAF0F3] shadow-xs'
                          : 'bg-[#FAF0F3] text-[#5A0A21] hover:bg-[#5A0A21] hover:text-white'
                      }`}
                    >
                      <span>{isSelected ? 'Active Theme' : 'Choose'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Show More / Show Less Button */}
      {filteredThemes.length > 3 && (
        <div className="mt-8 sm:mt-10 flex justify-center relative z-10">
          {visibleCount < filteredThemes.length ? (
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 3)}
              className="px-6 py-2.5 rounded-full bg-white border-2 border-[#C8A84B] text-[#3B0B1F] font-body text-xs sm:text-sm font-semibold uppercase tracking-wider hover:bg-[#FAF0F3] hover:border-[#3B0B1F] shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Show More</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleShowLess}
              className="px-6 py-2.5 rounded-full bg-white border-2 border-[#C8A84B] text-[#3B0B1F] font-body text-xs sm:text-sm font-semibold uppercase tracking-wider hover:bg-[#FAF0F3] hover:border-[#3B0B1F] shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Show Less</span>
            </button>
          )}
        </div>
      )}

      {/* Bottom Footer Note with Lock Icon */}
      <div className="mt-12 sm:mt-16 text-center relative z-10">
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#3B0B1F]/80 font-body bg-white/70 backdrop-blur-xs px-5 py-2.5 rounded-full border border-[#C8A84B]/30 shadow-xs">
          <Lock className="w-4 h-4 text-[#5A0A21] shrink-0" />
          <span>All 20 themes are fully customizable in our live invitation builder.</span>
        </div>
      </div>
    </div>
  );
}
