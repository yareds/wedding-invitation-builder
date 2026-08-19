import { FrameStyleId } from '../types';

export interface FrameStyleOption {
  id: FrameStyleId;
  name: string;
  category: 'Luxury' | 'Floral' | 'Minimalist' | 'Classic' | 'Romantic' | 'Contemporary' | 'Heritage' | 'Celestial';
  tag: string;
  description: string;
  previewSvg: string; // SVG path data or mini SVG for selector cards
}

export const FRAME_STYLE_OPTIONS: FrameStyleOption[] = [
  {
    id: 'royal-luxury',
    name: 'Royal Baroque Filigree',
    category: 'Luxury',
    tag: 'Royal & Ornate',
    description: 'Majestic imperial acanthus leaves, swirling baroque scrollwork, and regal crown crests.',
    previewSvg: `
      <svg viewBox="0 0 100 100" fill="none" class="w-full h-full">
        <rect x="8" y="8" width="84" height="84" rx="4" stroke="#C8A84B" stroke-width="1.5" stroke-opacity="0.7"/>
        <rect x="14" y="14" width="72" height="72" stroke="#C8A84B" stroke-width="0.75" stroke-dasharray="2 2" stroke-opacity="0.9"/>
        <!-- Top Left Flourish -->
        <path d="M 8 30 C 8 18, 18 8, 30 8" stroke="#C8A84B" stroke-width="2"/>
        <path d="M 14 14 C 18 20, 24 18, 28 14 C 28 24, 20 28, 14 28" fill="#C8A84B" fill-opacity="0.3" stroke="#C8A84B" stroke-width="1"/>
        <circle cx="20" cy="20" r="2.5" fill="#C8A84B"/>
        <!-- Top Right -->
        <path d="M 92 30 C 92 18, 82 8, 70 8" stroke="#C8A84B" stroke-width="2"/>
        <circle cx="80" cy="20" r="2.5" fill="#C8A84B"/>
        <!-- Center Medallion -->
        <g transform="translate(50, 8)">
          <path d="M-8,0 L0,-6 L8,0 L0,6 Z" fill="#C8A84B"/>
          <circle cx="0" cy="0" r="1.5" fill="#FAF4F6"/>
        </g>
        <!-- Bottom Left -->
        <path d="M 8 70 C 8 82, 18 92, 30 92" stroke="#C8A84B" stroke-width="2"/>
        <circle cx="20" cy="80" r="2.5" fill="#C8A84B"/>
        <!-- Bottom Right -->
        <path d="M 92 70 C 92 82, 82 92, 70 92" stroke="#C8A84B" stroke-width="2"/>
        <circle cx="80" cy="80" r="2.5" fill="#C8A84B"/>
      </svg>
    `
  },
  {
    id: 'botanical-floral',
    name: 'Lush Botanical Garden',
    category: 'Floral',
    tag: 'Organic & Floral',
    description: 'Handcrafted blooming rose bouquets, flowing ivy vines, and delicate garden leaves.',
    previewSvg: `
      <svg viewBox="0 0 100 100" fill="none" class="w-full h-full">
        <path d="M 12 88 C 12 35, 35 12, 88 12" stroke="#C8A84B" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M 18 88 C 18 42, 42 18, 88 18" stroke="#C8A84B" stroke-width="0.75" stroke-dasharray="3 3"/>
        <!-- Floral Centerpiece at Corner -->
        <g transform="translate(28, 28)">
          <circle cx="0" cy="0" r="3.5" fill="#B85B75"/>
          <circle cx="-5" cy="-2" r="3" fill="#C8A84B" fill-opacity="0.6"/>
          <circle cx="5" cy="2" r="3" fill="#C8A84B" fill-opacity="0.6"/>
          <circle cx="-2" cy="5" r="3" fill="#B85B75" fill-opacity="0.7"/>
          <circle cx="2" cy="-5" r="3" fill="#B85B75" fill-opacity="0.7"/>
          <circle cx="0" cy="0" r="1.5" fill="#FFF"/>
        </g>
        <!-- Leaf Sprigs -->
        <path d="M 16 55 C 8 46, 12 38, 20 48 C 20 48, 24 54, 16 55 Z" fill="#2D6A4F" fill-opacity="0.75"/>
        <path d="M 55 16 C 46 8, 38 12, 48 20 C 48 20, 54 24, 55 16 Z" fill="#2D6A4F" fill-opacity="0.75"/>
        <path d="M 22 72 C 15 65, 18 58, 25 66 Z" fill="#C8A84B"/>
        <path d="M 72 22 C 65 15, 58 18, 66 25 Z" fill="#C8A84B"/>
      </svg>
    `
  },
  {
    id: 'modern-minimalist',
    name: 'Modern Minimalist Hairline',
    category: 'Minimalist',
    tag: 'Sleek & Contemporary',
    description: 'Architectural double hairlines with precision floating corner notches and fine diamond points.',
    previewSvg: `
      <svg viewBox="0 0 100 100" fill="none" class="w-full h-full">
        <!-- Floating Outer Lines with Broken Corner Intersections -->
        <line x1="22" y1="12" x2="78" y2="12" stroke="#C8A84B" stroke-width="1.5"/>
        <line x1="22" y1="88" x2="78" y2="88" stroke="#C8A84B" stroke-width="1.5"/>
        <line x1="12" y1="22" x2="12" y2="78" stroke="#C8A84B" stroke-width="1.5"/>
        <line x1="88" y1="22" x2="88" y2="78" stroke="#C8A84B" stroke-width="1.5"/>
        <!-- Inner Subtle Offset -->
        <rect x="18" y="18" width="64" height="64" stroke="#C8A84B" stroke-width="0.75" stroke-opacity="0.5"/>
        <!-- Corner Diamond Accents -->
        <polygon points="12,8 16,12 12,16 8,12" fill="#C8A84B"/>
        <polygon points="88,8 92,12 88,16 84,12" fill="#C8A84B"/>
        <polygon points="12,84 16,88 12,92 8,88" fill="#C8A84B"/>
        <polygon points="88,84 92,88 88,92 84,88" fill="#C8A84B"/>
      </svg>
    `
  },
  {
    id: 'classic-arch',
    name: 'Classic Roman Arch',
    category: 'Classic',
    tag: 'Neoclassical & Grand',
    description: 'Timeless Roman cathedral curves, fluted borders, and symmetrical laurel crest arches.',
    previewSvg: `
      <svg viewBox="0 0 100 100" fill="none" class="w-full h-full">
        <!-- Archway Contour -->
        <path d="M 16 90 L 16 45 C 16 22, 84 22, 84 45 L 84 90" stroke="#C8A84B" stroke-width="2"/>
        <path d="M 22 90 L 22 46 C 22 28, 78 28, 78 46 L 78 90" stroke="#C8A84B" stroke-width="0.75" stroke-dasharray="2 2"/>
        <!-- Keystone Center Medallion -->
        <g transform="translate(50, 16)">
          <path d="M -6 0 L -8 10 L 8 10 L 6 0 Z" fill="#C8A84B"/>
          <circle cx="0" cy="4" r="2" fill="#FAF4F6"/>
        </g>
        <!-- Bottom Base Railing -->
        <line x1="10" y1="90" x2="90" y2="90" stroke="#C8A84B" stroke-width="1.5"/>
        <!-- Classical Pillared Dots -->
        <circle cx="16" cy="45" r="3" fill="#C8A84B"/>
        <circle cx="84" cy="45" r="3" fill="#C8A84B"/>
      </svg>
    `
  },
  {
    id: 'romantic-lace',
    name: 'Romantic Lace & Heart',
    category: 'Romantic',
    tag: 'Vintage Romance',
    description: 'Delicate scalloped lace embroidery, intertwined love ribbons, and soft heart flourishes.',
    previewSvg: `
      <svg viewBox="0 0 100 100" fill="none" class="w-full h-full">
        <!-- Scalloped Border Frame -->
        <rect x="12" y="12" width="76" height="76" rx="10" stroke="#C8A84B" stroke-width="1" stroke-dasharray="3 3"/>
        <!-- Corner Sweetheart Filigree -->
        <g transform="translate(24, 24) scale(0.9)">
          <path d="M0,4 C-4,-4 -12,-2 -12,4 C-12,12 0,18 0,20 C0,18 12,12 12,4 C12,-2 4,-4 0,4 Z" fill="#B85B75" fill-opacity="0.6" stroke="#C8A84B" stroke-width="1"/>
        </g>
        <g transform="translate(76, 24) scale(0.9)">
          <path d="M0,4 C-4,-4 -12,-2 -12,4 C-12,12 0,18 0,20 C0,18 12,12 12,4 C12,-2 4,-4 0,4 Z" fill="#B85B75" fill-opacity="0.6" stroke="#C8A84B" stroke-width="1"/>
        </g>
        <!-- Tiny Pearl Beads Along Perimeter -->
        <circle cx="50" cy="12" r="2.5" fill="#C8A84B"/>
        <circle cx="50" cy="88" r="2.5" fill="#C8A84B"/>
        <circle cx="12" cy="50" r="2.5" fill="#C8A84B"/>
        <circle cx="88" cy="50" r="2.5" fill="#C8A84B"/>
      </svg>
    `
  },
  {
    id: 'contemporary-geo',
    name: 'Art Deco Geometric Luxury',
    category: 'Contemporary',
    tag: 'Gatsby Glamour',
    description: '1920s stepped chevron corners, multi-faceted gold ray fans, and bold luxury angles.',
    previewSvg: `
      <svg viewBox="0 0 100 100" fill="none" class="w-full h-full">
        <!-- Stepped Outer Corners -->
        <path d="M 8 40 L 8 18 L 18 18 L 18 8 L 40 8" stroke="#C8A84B" stroke-width="2"/>
        <path d="M 60 8 L 82 8 L 82 18 L 92 18 L 92 40" stroke="#C8A84B" stroke-width="2"/>
        <path d="M 8 60 L 8 82 L 18 82 L 18 92 L 40 92" stroke="#C8A84B" stroke-width="2"/>
        <path d="M 60 92 L 82 92 L 82 82 L 92 82 L 92 60" stroke="#C8A84B" stroke-width="2"/>
        <!-- Inner Diamond & Chevron -->
        <rect x="24" y="24" width="52" height="52" stroke="#C8A84B" stroke-width="1"/>
        <polygon points="50,28 72,50 50,72 28,50" stroke="#C8A84B" stroke-width="0.75" stroke-dasharray="2 2"/>
        <!-- Corner Ray Lines -->
        <line x1="8" y1="8" x2="24" y2="24" stroke="#C8A84B" stroke-width="1.5"/>
        <line x1="92" y1="8" x2="76" y2="24" stroke="#C8A84B" stroke-width="1.5"/>
        <line x1="8" y1="92" x2="24" y2="76" stroke="#C8A84B" stroke-width="1.5"/>
        <line x1="92" y1="92" x2="76" y2="76" stroke="#C8A84B" stroke-width="1.5"/>
      </svg>
    `
  },
  {
    id: 'habesha-heritage',
    name: 'Habesha Tibeb Heritage',
    category: 'Heritage',
    tag: 'Authentic Ethiopian',
    description: 'Traditional Ethiopian cross (Meskel) geometry, hand-braided gold borders, and Tibeb motif.',
    previewSvg: `
      <svg viewBox="0 0 100 100" fill="none" class="w-full h-full">
        <!-- Braided Double Border -->
        <rect x="10" y="10" width="80" height="80" stroke="#C8A84B" stroke-width="1.5"/>
        <rect x="14" y="14" width="72" height="72" stroke="#C8A84B" stroke-width="0.75" stroke-dasharray="3 2"/>
        <!-- Ethiopian Meskel Cross Corner Medallion -->
        <g transform="translate(24, 24) scale(0.9)">
          <path d="M -3 -12 L 3 -12 L 3 -3 L 12 -3 L 12 3 L 3 3 L 3 12 L -3 12 L -3 3 L -12 3 L -12 -3 L -3 -3 Z" fill="#C8A84B" stroke="#59102E" stroke-width="0.5"/>
          <circle cx="0" cy="0" r="1.5" fill="#FAF4F6"/>
        </g>
        <g transform="translate(76, 24) scale(0.9)">
          <path d="M -3 -12 L 3 -12 L 3 -3 L 12 -3 L 12 3 L 3 3 L 3 12 L -3 12 L -3 3 L -12 3 L -12 -3 L -3 -3 Z" fill="#C8A84B" stroke="#59102E" stroke-width="0.5"/>
          <circle cx="0" cy="0" r="1.5" fill="#FAF4F6"/>
        </g>
        <!-- Center Diamond Tibeb Motif -->
        <g transform="translate(50, 10)">
          <polygon points="0,-4 5,0 0,4 -5,0" fill="#59102E" stroke="#C8A84B" stroke-width="1"/>
        </g>
        <g transform="translate(50, 90)">
          <polygon points="0,-4 5,0 0,4 -5,0" fill="#59102E" stroke="#C8A84B" stroke-width="1"/>
        </g>
      </svg>
    `
  },
  {
    id: 'celestial-sparkle',
    name: 'Celestial Starlight Glow',
    category: 'Celestial',
    tag: 'Starlit & Cosmic',
    description: 'Brilliant 4-point astral starbursts, sparkling diamond constellation dust, and crescent sweeps.',
    previewSvg: `
      <svg viewBox="0 0 100 100" fill="none" class="w-full h-full">
        <!-- Floating Fine Stardust Lines -->
        <rect x="12" y="12" width="76" height="76" rx="4" stroke="#C8A84B" stroke-width="1" stroke-dasharray="4 4" stroke-opacity="0.8"/>
        <!-- Grand Starburst at Top-Left Corner -->
        <g transform="translate(24, 24)">
          <path d="M 0 -14 Q 0 0 -14 0 Q 0 0 0 14 Q 0 0 14 0 Q 0 0 0 -14 Z" fill="#C8A84B"/>
          <circle cx="0" cy="0" r="2" fill="#FFF"/>
        </g>
        <!-- Grand Starburst at Bottom-Right Corner -->
        <g transform="translate(76, 76)">
          <path d="M 0 -14 Q 0 0 -14 0 Q 0 0 0 14 Q 0 0 14 0 Q 0 0 0 -14 Z" fill="#C8A84B"/>
          <circle cx="0" cy="0" r="2" fill="#FFF"/>
        </g>
        <!-- Satellite Stars -->
        <g transform="translate(76, 24) scale(0.6)">
          <path d="M 0 -10 Q 0 0 -10 0 Q 0 0 0 10 Q 0 0 10 0 Q 0 0 0 -10 Z" fill="#C8A84B"/>
        </g>
        <g transform="translate(24, 76) scale(0.6)">
          <path d="M 0 -10 Q 0 0 -10 0 Q 0 0 0 10 Q 0 0 10 0 Q 0 0 0 -10 Z" fill="#C8A84B"/>
        </g>
        <circle cx="50" cy="12" r="2" fill="#C8A84B"/>
        <circle cx="50" cy="88" r="2" fill="#C8A84B"/>
      </svg>
    `
  }
];
