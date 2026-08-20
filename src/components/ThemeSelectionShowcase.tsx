import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Lock, Sparkles, ArrowRight, Eye, Palette } from 'lucide-react';
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
  artStyle: 'classical-arch' | 'botanical-swag' | 'floral-wreath' | 'celestial-night' | 'geometric-deco' | 'cathedral-crest' | 'sapphire-jewel' | 'amethyst-filigree' | 'ruby-garland' | 'lavender-mist' | 'sage-meadow' | 'peach-blossom' | 'terracotta-arch' | 'olive-foliage' | 'desert-dune' | 'slate-platinum' | 'espresso-pearl' | 'marigold-sun' | 'peacock-plume' | 'electric-neon';
}

const SHOWCASE_THEMES: ShowcaseThemeItem[] = [
  { id: 'bordeaux', category: 'Jewel Tones', artStyle: 'classical-arch' },
  { id: 'sapphire', category: 'Jewel Tones', artStyle: 'sapphire-jewel' },
  { id: 'amethyst', category: 'Jewel Tones', artStyle: 'amethyst-filigree' },
  { id: 'rubyvelvet', category: 'Jewel Tones', artStyle: 'ruby-garland' },
  { id: 'peacockteal', category: 'Jewel Tones', artStyle: 'peacock-plume' },

  { id: 'emerald', category: 'Pastels & Florals', artStyle: 'botanical-swag' },
  { id: 'rosegarden', category: 'Pastels & Florals', artStyle: 'floral-wreath' },
  { id: 'lavender', category: 'Pastels & Florals', artStyle: 'lavender-mist' },
  { id: 'sagemint', category: 'Pastels & Florals', artStyle: 'sage-meadow' },
  { id: 'peachblossom', category: 'Pastels & Florals', artStyle: 'peach-blossom' },

  { id: 'terracotta', category: 'Earth Tones', artStyle: 'terracotta-arch' },
  { id: 'olivebronze', category: 'Earth Tones', artStyle: 'olive-foliage' },
  { id: 'desertsand', category: 'Earth Tones', artStyle: 'desert-dune' },
  { id: 'espressopearl', category: 'Earth Tones', artStyle: 'espresso-pearl' },

  { id: 'goldluxury', category: 'Neutrals & Classic', artStyle: 'geometric-deco' },
  { id: 'classicivory', category: 'Neutrals & Classic', artStyle: 'cathedral-crest' },
  { id: 'slateplatinum', category: 'Neutrals & Classic', artStyle: 'slate-platinum' },

  { id: 'midnight', category: 'Bold & Modern', artStyle: 'celestial-night' },
  { id: 'marigold', category: 'Bold & Modern', artStyle: 'marigold-sun' },
  { id: 'electricviolet', category: 'Bold & Modern', artStyle: 'electric-neon' }
];

export function ThemeSelectionShowcase({
  selectedThemeId = 'bordeaux',
  onSelectTheme,
  onPreviewTheme,
  showFullPageDecorations = true
}: ThemeSelectionShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState<ThemeCategory>('All');

  const categories: { label: ThemeCategory; count: number }[] = [
    { label: 'All', count: SHOWCASE_THEMES.length },
    { label: 'Jewel Tones', count: SHOWCASE_THEMES.filter((t) => t.category === 'Jewel Tones').length },
    { label: 'Pastels & Florals', count: SHOWCASE_THEMES.filter((t) => t.category === 'Pastels & Florals').length },
    { label: 'Earth Tones', count: SHOWCASE_THEMES.filter((t) => t.category === 'Earth Tones').length },
    { label: 'Neutrals & Classic', count: SHOWCASE_THEMES.filter((t) => t.category === 'Neutrals & Classic').length },
    { label: 'Bold & Modern', count: SHOWCASE_THEMES.filter((t) => t.category === 'Bold & Modern').length }
  ];

  const filteredThemes = activeCategory === 'All'
    ? SHOWCASE_THEMES
    : SHOWCASE_THEMES.filter((t) => t.category === activeCategory);

  const renderThemeArtwork = (item: ShowcaseThemeItem, preset: ThemePreset) => {
    const c = preset.colors;

    return (
      <div
        className="relative w-full h-44 sm:h-52 overflow-hidden flex items-center justify-center transition-colors duration-300"
        style={{ backgroundColor: c.bg }}
      >
        {/* Background Ambient Tint / Glow */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 40%, ${c.goldLt} 0%, transparent 70%)`
          }}
        />

        {/* Outer Frame Lines */}
        <div
          className="absolute inset-2.5 rounded-xl border opacity-50 pointer-events-none"
          style={{ borderColor: c.gold }}
        />
        <div
          className="absolute inset-4 rounded-lg border border-dashed opacity-30 pointer-events-none"
          style={{ borderColor: c.gold }}
        />

        {/* Vector SVG Composition */}
        <svg viewBox="0 0 400 240" className="w-full h-full object-contain relative z-10 filter drop-shadow-sm" fill="none">
          {/* Top-Center Decorative Emblem or Arch */}
          {item.artStyle === 'classical-arch' && (
            <g>
              <path d="M130 240 L130 95 C130 45, 270 45, 270 95 L270 240" stroke={c.goldLt} strokeWidth="3.5" strokeLinecap="round" />
              <path d="M145 240 L145 105 C145 65, 255 65, 255 105 L255 240" stroke={c.gold} strokeWidth="1.8" strokeDasharray="3 3" />
              {/* Rosette Bouquet */}
              <g transform="translate(250, 160)">
                <circle cx="0" cy="0" r="16" fill={c.blushLt} />
                <circle cx="-3" cy="-3" r="12" fill={c.blush} />
                <circle cx="2" cy="2" r="8" fill={c.blushPale} />
                <circle cx="0" cy="0" r="4" fill={c.primary} />
                <ellipse cx="-18" cy="12" rx="10" ry="5" fill={c.mid} transform="rotate(-30 -18 12)" />
              </g>
              <polygon points="200,45 208,55 200,65 192,55" fill={c.gold} />
            </g>
          )}

          {item.artStyle === 'sapphire-jewel' && (
            <g>
              <polygon points="200,30 250,90 200,190 150,90" stroke={c.gold} strokeWidth="2.5" fill={c.primary} fillOpacity="0.15" />
              <polygon points="200,48 236,92 200,170 164,92" stroke={c.goldLt} strokeWidth="1.2" />
              <circle cx="200" cy="92" r="8" fill={c.light} />
              <circle cx="200" cy="92" r="4" fill="#FFFFFF" />
              {/* Surrounding starbursts */}
              <path d="M100 80 Q100 100 80 100 Q100 100 100 120 Q100 100 120 100 Q100 100 100 80 Z" fill={c.gold} />
              <path d="M300 80 Q300 100 280 100 Q300 100 300 120 Q300 100 320 100 Q300 100 300 80 Z" fill={c.gold} />
              <line x1="60" y1="120" x2="340" y2="120" stroke={c.gold} strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
            </g>
          )}

          {item.artStyle === 'amethyst-filigree' && (
            <g>
              <circle cx="200" cy="115" r="55" stroke={c.gold} strokeWidth="2" />
              <circle cx="200" cy="115" r="45" stroke={c.blushLt} strokeWidth="1.5" strokeDasharray="3 3" />
              <g transform="translate(200, 115)">
                <polygon points="0,-25 18,0 0,25 -18,0" fill={c.primary} stroke={c.goldLt} strokeWidth="1.5" />
                <circle cx="0" cy="0" r="6" fill={c.gold} />
              </g>
              {/* Symmetrical Ornamental Wings */}
              <path d="M140 115 C110 80, 80 110, 60 115 C80 120, 110 150, 140 115 Z" fill={c.blush} fillOpacity="0.4" stroke={c.gold} strokeWidth="1" />
              <path d="M260 115 C290 80, 320 110, 340 115 C320 120, 290 150, 260 115 Z" fill={c.blush} fillOpacity="0.4" stroke={c.gold} strokeWidth="1" />
            </g>
          )}

          {item.artStyle === 'ruby-garland' && (
            <g>
              <path d="M70 60 Q200 120 330 60" stroke={c.gold} strokeWidth="2.5" strokeLinecap="round" />
              <path d="M90 75 Q200 135 310 75" stroke={c.primary} strokeWidth="1.5" strokeDasharray="4 2" />
              {/* Ruby Clusters */}
              <g transform="translate(200, 120)">
                <circle cx="0" cy="0" r="14" fill={c.primary} />
                <circle cx="-2" cy="-2" r="9" fill={c.light} />
                <circle cx="1" cy="1" r="5" fill={c.blushLt} />
                <polygon points="0,-20 6,-8 0,-4 -6,-8" fill={c.gold} />
              </g>
              <g transform="translate(130, 95)">
                <circle cx="0" cy="0" r="10" fill={c.primary} />
                <circle cx="0" cy="0" r="6" fill={c.light} />
                <circle cx="0" cy="0" r="2" fill={c.goldLt} />
              </g>
              <g transform="translate(270, 95)">
                <circle cx="0" cy="0" r="10" fill={c.primary} />
                <circle cx="0" cy="0" r="6" fill={c.light} />
                <circle cx="0" cy="0" r="2" fill={c.goldLt} />
              </g>
            </g>
          )}

          {item.artStyle === 'peacock-plume' && (
            <g>
              <path d="M120 180 C150 100, 180 50, 200 30 C220 50, 250 100, 280 180" stroke={c.light} strokeWidth="2.5" strokeLinecap="round" />
              <g transform="translate(200, 80)">
                <ellipse cx="0" cy="0" rx="28" ry="40" fill={c.mid} />
                <ellipse cx="0" cy="6" rx="20" ry="28" fill={c.light} />
                <ellipse cx="0" cy="12" rx="12" ry="16" fill={c.primary} />
                <circle cx="0" cy="14" r="6" fill={c.gold} />
              </g>
              <circle cx="140" cy="140" r="4" fill={c.gold} />
              <circle cx="260" cy="140" r="4" fill={c.gold} />
            </g>
          )}

          {item.artStyle === 'botanical-swag' && (
            <g>
              {/* Eucalyptus Foliage Arch */}
              <path d="M50 30 C120 80, 280 80, 350 30" stroke={c.mid} strokeWidth="2.5" strokeLinecap="round" />
              <ellipse cx="120" cy="50" rx="14" ry="8" fill={c.light} transform="rotate(-15 120 50)" />
              <ellipse cx="170" cy="65" rx="15" ry="9" fill={c.blush} transform="rotate(10 170 65)" />
              <ellipse cx="230" cy="65" rx="15" ry="9" fill={c.light} transform="rotate(-10 230 65)" />
              <ellipse cx="280" cy="50" rx="14" ry="8" fill={c.blush} transform="rotate(15 280 50)" />
              <g transform="translate(200, 70)">
                <circle cx="0" cy="0" r="12" fill={c.blushPale} stroke={c.gold} strokeWidth="1.5" />
                <circle cx="0" cy="0" r="4" fill={c.gold} />
              </g>
            </g>
          )}

          {item.artStyle === 'floral-wreath' && (
            <g>
              <circle cx="200" cy="115" r="55" stroke={c.gold} strokeWidth="2" strokeDasharray="4 2" />
              <g transform="translate(145, 115)">
                <circle cx="0" cy="0" r="15" fill={c.blushLt} />
                <circle cx="-2" cy="-2" r="10" fill={c.blush} />
                <circle cx="0" cy="0" r="3" fill={c.primary} />
                <ellipse cx="-12" cy="-14" rx="8" ry="4" fill={c.gold} transform="rotate(-30 -12 -14)" />
              </g>
              <g transform="translate(255, 115)">
                <circle cx="0" cy="0" r="15" fill={c.blushLt} />
                <circle cx="2" cy="-2" r="10" fill={c.blush} />
                <circle cx="0" cy="0" r="3" fill={c.primary} />
                <ellipse cx="12" cy="-14" rx="8" ry="4" fill={c.gold} transform="rotate(30 12 -14)" />
              </g>
            </g>
          )}

          {item.artStyle === 'lavender-mist' && (
            <g>
              <path d="M160 210 Q190 120 180 50" stroke={c.mid} strokeWidth="2" strokeLinecap="round" />
              <path d="M200 210 Q200 110 200 40" stroke={c.mid} strokeWidth="2.5" strokeLinecap="round" />
              <path d="M240 210 Q210 120 220 50" stroke={c.mid} strokeWidth="2" strokeLinecap="round" />
              {/* Lavender Buds */}
              {[45, 60, 75, 90, 105, 120].map((y, i) => (
                <g key={i}>
                  <ellipse cx="192" cy={y} rx="6" ry="3.5" fill={c.light} transform={`rotate(-25 192 ${y})`} />
                  <ellipse cx="208" cy={y} rx="6" ry="3.5" fill={c.blush} transform={`rotate(25 208 ${y})`} />
                  <circle cx="200" cy={y - 4} r="2.5" fill={c.gold} />
                </g>
              ))}
            </g>
          )}

          {item.artStyle === 'sage-meadow' && (
            <g>
              <circle cx="200" cy="115" r="60" stroke={c.gold} strokeWidth="1.5" />
              <path d="M120 160 C150 70, 250 70, 280 160" stroke={c.mid} strokeWidth="2.5" strokeLinecap="round" />
              <ellipse cx="160" cy="95" rx="14" ry="7" fill={c.blush} transform="rotate(-30 160 95)" />
              <ellipse cx="200" cy="80" rx="15" ry="8" fill={c.light} transform="rotate(0 200 80)" />
              <ellipse cx="240" cy="95" rx="14" ry="7" fill={c.blush} transform="rotate(30 240 95)" />
              <circle cx="200" cy="115" r="5" fill={c.gold} />
            </g>
          )}

          {item.artStyle === 'peach-blossom' && (
            <g>
              <path d="M80 140 Q200 40 320 140" stroke={c.gold} strokeWidth="2.5" strokeLinecap="round" />
              <g transform="translate(200, 85)">
                <circle cx="0" cy="0" r="18" fill={c.blushLt} />
                <circle cx="0" cy="0" r="12" fill={c.blush} />
                <circle cx="0" cy="0" r="6" fill={c.light} />
                <circle cx="0" cy="0" r="2.5" fill={c.gold} />
              </g>
              <g transform="translate(130, 110)">
                <circle cx="0" cy="0" r="12" fill={c.blushLt} />
                <circle cx="0" cy="0" r="7" fill={c.blush} />
                <circle cx="0" cy="0" r="2" fill={c.gold} />
              </g>
              <g transform="translate(270, 110)">
                <circle cx="0" cy="0" r="12" fill={c.blushLt} />
                <circle cx="0" cy="0" r="7" fill={c.blush} />
                <circle cx="0" cy="0" r="2" fill={c.gold} />
              </g>
            </g>
          )}

          {item.artStyle === 'terracotta-arch' && (
            <g>
              {/* Stepped Mediterranean Archway */}
              <path d="M120 240 L120 100 C120 50, 280 50, 280 100 L280 240" stroke={c.primary} strokeWidth="4" strokeLinecap="round" />
              <path d="M140 240 L140 110 C140 70, 260 70, 260 110 L260 240" stroke={c.mid} strokeWidth="2" />
              <path d="M160 240 L160 120 C160 90, 240 90, 240 120 L240 240" stroke={c.gold} strokeWidth="2" strokeDasharray="4 3" />
              <g transform="translate(200, 60)">
                <circle cx="0" cy="0" r="10" fill={c.goldLt} stroke={c.gold} strokeWidth="2" />
                <circle cx="0" cy="0" r="3.5" fill={c.primary} />
              </g>
            </g>
          )}

          {item.artStyle === 'olive-foliage' && (
            <g>
              <circle cx="200" cy="115" r="58" stroke={c.gold} strokeWidth="2" />
              <path d="M110 130 C150 50, 250 50, 290 130" stroke={c.mid} strokeWidth="3" strokeLinecap="round" />
              {/* Olive leaves and berries */}
              <ellipse cx="150" cy="85" rx="16" ry="6" fill={c.primary} transform="rotate(-35 150 85)" />
              <ellipse cx="200" cy="65" rx="16" ry="7" fill={c.light} />
              <ellipse cx="250" cy="85" rx="16" ry="6" fill={c.primary} transform="rotate(35 250 85)" />
              <circle cx="165" cy="98" r="4.5" fill={c.gold} />
              <circle cx="235" cy="98" r="4.5" fill={c.gold} />
            </g>
          )}

          {item.artStyle === 'desert-dune' && (
            <g>
              <path d="M40 180 Q130 110 220 160 T400 130" stroke={c.mid} strokeWidth="3" fill={c.blushPale} fillOpacity="0.5" />
              <path d="M0 210 Q140 130 260 180 T400 170" stroke={c.primary} strokeWidth="2.5" fill={c.blushLt} fillOpacity="0.3" />
              <circle cx="200" cy="70" r="24" fill={c.goldLt} stroke={c.gold} strokeWidth="2" />
              <polygon points="200,20 206,34 200,30 194,34" fill={c.gold} />
            </g>
          )}

          {item.artStyle === 'espresso-pearl' && (
            <g>
              <circle cx="200" cy="115" r="54" stroke={c.gold} strokeWidth="2.5" />
              <circle cx="200" cy="115" r="42" stroke={c.blush} strokeWidth="1.2" strokeDasharray="3 3" />
              <g transform="translate(200, 115)">
                <rect x="-18" y="-18" width="36" height="36" rx="4" fill={c.primary} stroke={c.goldLt} strokeWidth="1.5" transform="rotate(45)" />
                <circle cx="0" cy="0" r="5" fill={c.goldPale} />
              </g>
              <path d="M60 115 L120 115 M280 115 L340 115" stroke={c.gold} strokeWidth="1.5" strokeLinecap="round" />
            </g>
          )}

          {item.artStyle === 'geometric-deco' && (
            <g>
              <rect x="130" y="45" width="140" height="140" stroke={c.gold} strokeWidth="2.5" fill="none" transform="rotate(45 200 115)" />
              <rect x="145" y="60" width="110" height="110" stroke={c.goldLt} strokeWidth="1.5" fill="none" transform="rotate(45 200 115)" />
              <g transform="translate(200, 115)">
                <polygon points="0,-18 18,0 0,18 -18,0" fill={c.primary} stroke={c.gold} strokeWidth="1" />
                <circle cx="0" cy="0" r="4" fill={c.goldLt} />
              </g>
            </g>
          )}

          {item.artStyle === 'cathedral-crest' && (
            <g>
              <path d="M120 230 L120 110 C120 40, 200 10, 200 10 C200 10, 280 40, 280 110 L280 230" stroke={c.primary} strokeWidth="3" strokeLinecap="round" />
              <path d="M136 230 L136 115 C136 55, 200 30, 200 30 C200 30, 264 55, 264 115 L264 230" stroke={c.gold} strokeWidth="1.5" strokeDasharray="4 2" />
              <polygon points="200,10 206,24 200,20 194,24" fill={c.gold} />
              <circle cx="200" cy="110" r="16" stroke={c.gold} strokeWidth="1.8" fill={c.goldPale} />
              <polygon points="200,100 207,110 200,120 193,110" fill={c.gold} />
            </g>
          )}

          {item.artStyle === 'slate-platinum' && (
            <g>
              <line x1="60" y1="115" x2="340" y2="115" stroke={c.primary} strokeWidth="2.5" />
              <line x1="60" y1="105" x2="340" y2="105" stroke={c.gold} strokeWidth="1" strokeOpacity="0.7" />
              <line x1="60" y1="125" x2="340" y2="125" stroke={c.gold} strokeWidth="1" strokeOpacity="0.7" />
              <g transform="translate(200, 115)">
                <polygon points="0,-30 30,0 0,30 -30,0" fill={c.primary} stroke={c.gold} strokeWidth="2" />
                <polygon points="0,-16 16,0 0,16 -16,0" fill={c.mid} stroke={c.goldLt} strokeWidth="1" />
                <circle cx="0" cy="0" r="3.5" fill="#FFFFFF" />
              </g>
            </g>
          )}

          {item.artStyle === 'celestial-night' && (
            <g>
              {/* Golden Crescent Moon and Polaris */}
              <g transform="translate(150, 95)">
                <path d="M 10 -20 A 22 22 0 1 0 10 20 A 16 16 0 1 1 10 -20 Z" fill={c.gold} stroke={c.goldLt} strokeWidth="1" />
              </g>
              <g transform="translate(250, 95)">
                <path d="M 0 -22 Q 0 0 -22 0 Q 0 0 0 22 Q 0 0 22 0 Q 0 0 0 -22 Z" fill={c.goldLt} />
                <circle cx="0" cy="0" r="4" fill="#FFFFFF" />
              </g>
              {/* Constellation Dots */}
              <circle cx="80" cy="60" r="2" fill={c.goldLt} />
              <circle cx="120" cy="160" r="2" fill={c.goldLt} />
              <circle cx="320" cy="70" r="2" fill={c.goldLt} />
              <circle cx="290" cy="160" r="2" fill={c.goldLt} />
            </g>
          )}

          {item.artStyle === 'marigold-sun' && (
            <g>
              <circle cx="200" cy="115" r="35" fill={c.light} stroke={c.gold} strokeWidth="2" />
              {/* Radial Sunburst Rays */}
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
                <line
                  key={i}
                  x1="200"
                  y1="115"
                  x2={200 + Math.cos((deg * Math.PI) / 180) * 65}
                  y2={115 + Math.sin((deg * Math.PI) / 180) * 65}
                  stroke={c.gold}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ))}
              <circle cx="200" cy="115" r="18" fill={c.gold} />
              <circle cx="200" cy="115" r="7" fill={c.primary} />
            </g>
          )}

          {item.artStyle === 'electric-neon' && (
            <g>
              <polygon points="200,30 260,115 200,200 140,115" stroke={c.blush} strokeWidth="3" fill={c.primary} fillOpacity="0.2" />
              <circle cx="200" cy="115" r="40" stroke={c.gold} strokeWidth="2.5" strokeDasharray="6 3" />
              <g transform="translate(200, 115)">
                <circle cx="0" cy="0" r="12" fill={c.blushLt} />
                <circle cx="0" cy="0" r="6" fill={c.gold} />
              </g>
            </g>
          )}
        </svg>
      </div>
    );
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 text-[#3B0B1F]">
      {/* Surrounding Soft Watercolor Flower Corner Borders */}
      {showFullPageDecorations && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
          <div className="absolute -top-6 -left-6 w-36 h-36 sm:w-56 sm:h-56 opacity-85">
            <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
              <ellipse cx="40" cy="60" rx="25" ry="12" fill="#74967E" transform="rotate(-30 40 60)" opacity="0.8" />
              <ellipse cx="60" cy="30" rx="22" ry="10" fill="#C8A84B" transform="rotate(40 60 30)" opacity="0.75" />
              <circle cx="70" cy="70" r="30" fill="#FAD2D8" />
              <circle cx="65" cy="65" r="22" fill="#E59EAF" />
              <circle cx="72" cy="72" r="14" fill="#C86D84" />
              <circle cx="70" cy="70" r="5" fill="#5A0A21" />
            </svg>
          </div>
          <div className="absolute -top-6 -right-6 w-36 h-36 sm:w-56 sm:h-56 opacity-85 scale-x-[-1]">
            <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
              <ellipse cx="40" cy="60" rx="25" ry="12" fill="#74967E" transform="rotate(-30 40 60)" opacity="0.8" />
              <ellipse cx="60" cy="30" rx="22" ry="10" fill="#C8A84B" transform="rotate(40 60 30)" opacity="0.75" />
              <circle cx="70" cy="70" r="30" fill="#FAD2D8" />
              <circle cx="65" cy="65" r="22" fill="#E59EAF" />
              <circle cx="72" cy="72" r="14" fill="#C86D84" />
            </svg>
          </div>
        </div>
      )}

      {/* Center Section Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto mb-8 sm:mb-12 relative z-10">
        <div className="flex items-center justify-center gap-2 select-none">
          <svg width="40" height="16" viewBox="0 0 40 16" fill="none" className="text-[#C8A84B]">
            <path d="M40 8 C30 4, 15 12, 0 8" stroke="currentColor" strokeWidth="1.2" />
            <ellipse cx="12" cy="4" rx="4" ry="2" fill="currentColor" opacity="0.8" />
            <ellipse cx="26" cy="12" rx="4" ry="2" fill="currentColor" opacity="0.8" />
          </svg>
          <div className="text-[#C8A84B] flex items-center justify-center">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="#C8A84B">
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
                onClick={() => setActiveCategory(cat.label)}
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
          {filteredThemes.map((item) => {
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

                {/* Theme Illustrated Artwork Canvas */}
                <div className="relative">
                  {renderThemeArtwork(item, preset)}
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
