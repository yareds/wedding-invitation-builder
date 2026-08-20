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
    name: 'Modern Imperial Luxury',
    category: 'Luxury',
    tag: 'Bold & Regal',
    description: 'Clean architectural double framing with bold geometric corner brackets and a minimal crown crest.',
    previewSvg: `
      <svg viewBox="0 0 100 100" fill="none" class="w-full h-full">
        <defs>
          <linearGradient id="g-royal-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFF3D4" />
            <stop offset="40%" stop-color="#D4AF37" />
            <stop offset="85%" stop-color="#996D14" />
            <stop offset="100%" stop-color="#F2D785" />
          </linearGradient>
          <filter id="shadow-royal" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" flood-color="#4A0A1A" flood-opacity="0.25" />
          </filter>
        </defs>

        <!-- Bold Minimal Outer Frame -->
        <rect x="12" y="12" width="76" height="76" rx="2" stroke="url(#g-royal-gold)" stroke-width="2.5" filter="url(#shadow-royal)" />
        <rect x="18" y="18" width="64" height="64" rx="1" stroke="url(#g-royal-gold)" stroke-width="1" stroke-opacity="0.7" />

        <!-- Bold Geometric L-Bracket Corners -->
        <path d="M 8 28 L 8 8 L 28 8" stroke="url(#g-royal-gold)" stroke-width="3.5" stroke-linecap="square" filter="url(#shadow-royal)" />
        <path d="M 92 28 L 92 8 L 72 8" stroke="url(#g-royal-gold)" stroke-width="3.5" stroke-linecap="square" filter="url(#shadow-royal)" />
        <path d="M 8 72 L 8 92 L 28 92" stroke="url(#g-royal-gold)" stroke-width="3.5" stroke-linecap="square" filter="url(#shadow-royal)" />
        <path d="M 92 72 L 92 92 L 72 92" stroke="url(#g-royal-gold)" stroke-width="3.5" stroke-linecap="square" filter="url(#shadow-royal)" />

        <!-- Confident Minimal Apex Crown Emblem -->
        <g transform="translate(50, 12)" filter="url(#shadow-royal)">
          <polygon points="0,-7 8,2 0,0 -8,2" fill="url(#g-royal-gold)" />
          <circle cx="0" cy="-2" r="1.5" fill="#FAF4F6" />
        </g>

        <!-- Base Minimal Notch -->
        <polygon points="46,88 50,84 54,88" fill="url(#g-royal-gold)" />
      </svg>
    `
  },
  {
    id: 'botanical-floral',
    name: 'Contemporary Botanical',
    category: 'Floral',
    tag: 'Modern Foliage',
    description: 'A single confident botanical line sprig with clean curving stems and sleek modern leaf silhouettes.',
    previewSvg: `
      <svg viewBox="0 0 100 100" fill="none" class="w-full h-full">
        <defs>
          <linearGradient id="g-floral-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFF3D4" />
            <stop offset="50%" stop-color="#D4AF37" />
            <stop offset="100%" stop-color="#9B7825" />
          </linearGradient>
          <linearGradient id="g-floral-leaf" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#84D8A7" />
            <stop offset="100%" stop-color="#1B4332" />
          </linearGradient>
          <filter id="shadow-floral" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" flood-color="#1B4332" flood-opacity="0.2" />
          </filter>
        </defs>

        <!-- Clean Asymmetric Frame with Botanical Breakaway -->
        <path d="M 40 12 L 88 12 L 88 88 L 12 88 L 12 40" stroke="url(#g-floral-gold)" stroke-width="2.5" stroke-linecap="round" filter="url(#shadow-floral)" />

        <!-- Confident, Single Botanical Sprig Branch -->
        <path d="M 8 46 Q 16 16, 46 8" stroke="url(#g-floral-gold)" stroke-width="3" stroke-linecap="round" filter="url(#shadow-floral)" />
        
        <!-- Large Modern Leaf Silhouettes -->
        <path d="M 18 32 C 14 20, 24 16, 30 24 C 28 32, 22 34, 18 32 Z" fill="url(#g-floral-leaf)" filter="url(#shadow-floral)" />
        <path d="M 32 18 C 20 14, 16 24, 24 30 C 32 28, 34 22, 32 18 Z" fill="url(#g-floral-leaf)" filter="url(#shadow-floral)" />
        <path d="M 38 12 C 40 4, 48 6, 46 14 C 44 18, 38 16, 38 12 Z" fill="url(#g-floral-gold)" />

        <!-- Minimalist Corner Accent at Bottom-Right -->
        <circle cx="80" cy="80" r="3" fill="url(#g-floral-gold)" />
      </svg>
    `
  },
  {
    id: 'modern-minimalist',
    name: 'Architectural Minimalist',
    category: 'Minimalist',
    tag: 'Sleek & Editorial',
    description: 'Sculptural floating axis lines, clean corner notches, and minimal asymmetric point marks.',
    previewSvg: `
      <svg viewBox="0 0 100 100" fill="none" class="w-full h-full">
        <defs>
          <linearGradient id="g-mini-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFF3D4" />
            <stop offset="50%" stop-color="#C8A84B" />
            <stop offset="100%" stop-color="#8C6819" />
          </linearGradient>
          <filter id="shadow-mini" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" flood-color="#8C6819" flood-opacity="0.25" />
          </filter>
        </defs>

        <!-- Confident Asymmetric Diagonal Floating Bars -->
        <path d="M 10 38 L 10 10 L 38 10" stroke="url(#g-mini-gold)" stroke-width="3.5" stroke-linecap="square" filter="url(#shadow-mini)" />
        <path d="M 90 62 L 90 90 L 62 90" stroke="url(#g-mini-gold)" stroke-width="3.5" stroke-linecap="square" filter="url(#shadow-mini)" />

        <!-- Minimal Hairline Axis Sub-lines -->
        <line x1="16" y1="20" x2="84" y2="20" stroke="url(#g-mini-gold)" stroke-width="1" stroke-opacity="0.6" />
        <line x1="20" y1="16" x2="20" y2="84" stroke="url(#g-mini-gold)" stroke-width="1" stroke-opacity="0.6" />
        <line x1="16" y1="80" x2="84" y2="80" stroke="url(#g-mini-gold)" stroke-width="1" stroke-opacity="0.6" />
        <line x1="80" y1="16" x2="80" y2="84" stroke="url(#g-mini-gold)" stroke-width="1" stroke-opacity="0.6" />

        <!-- Single Bold Architectural Diamond Pin -->
        <g transform="translate(10, 10)" filter="url(#shadow-mini)">
          <rect x="-3" y="-3" width="6" height="6" fill="url(#g-mini-gold)" transform="rotate(45)" />
        </g>
        <g transform="translate(90, 90)" filter="url(#shadow-mini)">
          <rect x="-3" y="-3" width="6" height="6" fill="url(#g-mini-gold)" transform="rotate(45)" />
        </g>
      </svg>
    `
  },
  {
    id: 'classic-arch',
    name: 'Modern Cathedral Arch',
    category: 'Classic',
    tag: 'Monumental & Refined',
    description: 'Clean continuous cathedral arch silhouette with a confident keystone accent and minimalist base line.',
    previewSvg: `
      <svg viewBox="0 0 100 100" fill="none" class="w-full h-full">
        <defs>
          <linearGradient id="g-arch-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FDF1D6" />
            <stop offset="45%" stop-color="#D4AF37" />
            <stop offset="100%" stop-color="#996D14" />
          </linearGradient>
          <filter id="shadow-arch" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" flood-color="#4A0A1A" flood-opacity="0.25" />
          </filter>
        </defs>

        <!-- Bold Continuous Monumental Arch -->
        <path d="M 16 88 L 16 46 A 34 34 0 0 1 84 46 L 84 88" stroke="url(#g-arch-gold)" stroke-width="3.5" stroke-linecap="round" filter="url(#shadow-arch)" />
        <!-- Inner Fine Arch -->
        <path d="M 24 88 L 24 48 A 26 26 0 0 1 76 48 L 76 88" stroke="url(#g-arch-gold)" stroke-width="1.2" stroke-opacity="0.75" />

        <!-- Confident Keystone Emblem at Peak -->
        <polygon points="46,10 54,10 52,18 48,18" fill="url(#g-arch-gold)" filter="url(#shadow-arch)" />

        <!-- Minimal Base Baseline -->
        <line x1="10" y1="88" x2="90" y2="88" stroke="url(#g-arch-gold)" stroke-width="2.5" stroke-linecap="round" />
      </svg>
    `
  },
  {
    id: 'romantic-lace',
    name: 'Modern Romantic Contour',
    category: 'Romantic',
    tag: 'Soft & Sculptural',
    description: 'Smooth pill-curved contour framing with a clean sculptural heart crest and minimalist rose-gold accents.',
    previewSvg: `
      <svg viewBox="0 0 100 100" fill="none" class="w-full h-full">
        <defs>
          <linearGradient id="g-lace-rose" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FCE7EC" />
            <stop offset="40%" stop-color="#E295A8" />
            <stop offset="100%" stop-color="#A24861" />
          </linearGradient>
          <linearGradient id="g-lace-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFF3D4" />
            <stop offset="60%" stop-color="#D4AF37" />
            <stop offset="100%" stop-color="#996D14" />
          </linearGradient>
          <filter id="shadow-lace" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" flood-color="#8C1D40" flood-opacity="0.25" />
          </filter>
        </defs>

        <!-- Bold Soft Rounded Contour Frame -->
        <rect x="12" y="12" width="76" height="76" rx="20" stroke="url(#g-lace-rose)" stroke-width="3" filter="url(#shadow-lace)" />
        <rect x="18" y="18" width="64" height="64" rx="14" stroke="url(#g-lace-gold)" stroke-width="1.2" stroke-opacity="0.8" />

        <!-- Confident Sculptural Heart Silhouette Crest -->
        <g transform="translate(50, 12)" filter="url(#shadow-lace)">
          <path d="M 0,0 C -5,-6 -12,-4 -12,3 C -12,10 0,16 0,18 C 0,16 12,10 12,3 C 12,-4 5,-6 0,0 Z" fill="url(#g-lace-rose)" stroke="url(#g-lace-gold)" stroke-width="1" />
        </g>

        <!-- Minimalist Anchor Accent at Bottom -->
        <circle cx="50" cy="88" r="2.5" fill="url(#g-lace-gold)" />
      </svg>
    `
  },
  {
    id: 'contemporary-geo',
    name: 'Art Deco Geometric Precision',
    category: 'Contemporary',
    tag: 'Bold & Geometric',
    description: 'Bold stepped corner chevrons, faceted angle brackets, and an asymmetric diamond centerpiece.',
    previewSvg: `
      <svg viewBox="0 0 100 100" fill="none" class="w-full h-full">
        <defs>
          <linearGradient id="g-deco-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFF0CE" />
            <stop offset="35%" stop-color="#E2C873" />
            <stop offset="70%" stop-color="#C8A84B" />
            <stop offset="100%" stop-color="#876214" />
          </linearGradient>
          <filter id="shadow-deco" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" flood-color="#876214" flood-opacity="0.3" />
          </filter>
        </defs>

        <!-- Bold Stepped Art Deco Corner Brackets -->
        <path d="M 10 36 L 10 18 L 18 18 L 18 10 L 36 10" stroke="url(#g-deco-gold)" stroke-width="3.5" stroke-linecap="square" filter="url(#shadow-deco)" />
        <path d="M 90 64 L 90 82 L 82 82 L 82 90 L 64 90" stroke="url(#g-deco-gold)" stroke-width="3.5" stroke-linecap="square" filter="url(#shadow-deco)" />

        <!-- Crisp Perimeter Connecting Lines -->
        <path d="M 44 10 L 82 10 L 82 18 L 90 18 L 90 44" stroke="url(#g-deco-gold)" stroke-width="1.8" stroke-opacity="0.7" />
        <path d="M 10 56 L 10 82 L 18 82 L 18 90 L 56 90" stroke="url(#g-deco-gold)" stroke-width="1.8" stroke-opacity="0.7" />

        <!-- Central Bold Faceted Diamond Crest -->
        <g transform="translate(50, 50)" filter="url(#shadow-deco)">
          <polygon points="0,-12 12,0 0,12 -12,0" stroke="url(#g-deco-gold)" stroke-width="2.5" fill="none" />
          <polygon points="0,-6 6,0 0,6 -6,0" fill="url(#g-deco-gold)" />
        </g>
      </svg>
    `
  },
  {
    id: 'habesha-heritage',
    name: 'Modern Habesha Geometry',
    category: 'Heritage',
    tag: 'Authentic & Modern',
    description: 'Contemporary Ethiopian Meskel cross silhouette with bold geometric Tibeb chevron framing.',
    previewSvg: `
      <svg viewBox="0 0 100 100" fill="none" class="w-full h-full">
        <defs>
          <linearGradient id="g-tibeb-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFF2D6" />
            <stop offset="40%" stop-color="#D4AF37" />
            <stop offset="80%" stop-color="#A87B1B" />
            <stop offset="100%" stop-color="#F2D785" />
          </linearGradient>
          <linearGradient id="g-tibeb-burgundy" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#8C1434" />
            <stop offset="100%" stop-color="#3D0513" />
          </linearGradient>
          <filter id="shadow-tibeb" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" flood-color="#3D0513" flood-opacity="0.3" />
          </filter>
        </defs>

        <!-- Clean Bold Woven Border -->
        <rect x="12" y="12" width="76" height="76" rx="2" stroke="url(#g-tibeb-gold)" stroke-width="2.5" filter="url(#shadow-tibeb)" />

        <!-- Bold Ethiopian Meskel Cross Emblem (Apex) -->
        <g transform="translate(50, 12)" filter="url(#shadow-tibeb)">
          <path d="M -3 -10 L 3 -10 L 3 -3 L 10 -3 L 10 3 L 3 3 L 3 10 L -3 10 L -3 3 L -10 3 L -10 -3 L -3 -3 Z" fill="url(#g-tibeb-gold)" stroke="url(#g-tibeb-burgundy)" stroke-width="1" />
          <circle cx="0" cy="0" r="1.5" fill="#FAF4F6" />
        </g>

        <!-- Modern Tibeb Geometric Chevrons at Bottom -->
        <g transform="translate(50, 88)" filter="url(#shadow-tibeb)">
          <polygon points="0,-6 7,0 0,6 -7,0" fill="url(#g-tibeb-burgundy)" stroke="url(#g-tibeb-gold)" stroke-width="1.5" />
        </g>

        <!-- Clean Corner Notches -->
        <polygon points="12,24 16,20 20,24 16,28" fill="url(#g-tibeb-gold)" />
        <polygon points="88,24 84,20 80,24 84,28" fill="url(#g-tibeb-gold)" />
      </svg>
    `
  },
  {
    id: 'celestial-sparkle',
    name: 'Modern Celestial Polaris',
    category: 'Celestial',
    tag: 'Cosmic & Minimal',
    description: 'A single radiant 4-point Polaris starburst with sleek cosmic orbital rings and clean starlight coordinates.',
    previewSvg: `
      <svg viewBox="0 0 100 100" fill="none" class="w-full h-full">
        <defs>
          <linearGradient id="g-celestial-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFFFFF" />
            <stop offset="30%" stop-color="#FDF1D6" />
            <stop offset="65%" stop-color="#D4AF37" />
            <stop offset="100%" stop-color="#8C6819" />
          </linearGradient>
          <filter id="shadow-celestial" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="2" flood-color="#D4AF37" flood-opacity="0.35" />
          </filter>
        </defs>

        <!-- Sleek Minimal Frame with Dynamic Arc Break -->
        <rect x="12" y="12" width="76" height="76" rx="4" stroke="url(#g-celestial-gold)" stroke-width="2" stroke-opacity="0.6" filter="url(#shadow-celestial)" />
        
        <!-- Large Confident 4-Point Polaris Starburst at Top-Left (28, 28) -->
        <g transform="translate(28, 28)" filter="url(#shadow-celestial)">
          <path d="M 0 -18 Q 0 0 -18 0 Q 0 0 0 18 Q 0 0 18 0 Q 0 0 0 -18 Z" fill="url(#g-celestial-gold)" />
          <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
        </g>

        <!-- Orbital Ring Trajectory -->
        <ellipse cx="28" cy="28" rx="22" ry="7" transform="rotate(-30 28 28)" stroke="url(#g-celestial-gold)" stroke-width="1.2" stroke-opacity="0.85" />

        <!-- Minimal Complementary Satellite Star at Bottom-Right -->
        <g transform="translate(74, 74) scale(0.6)" filter="url(#shadow-celestial)">
          <path d="M 0 -12 Q 0 0 -12 0 Q 0 0 0 12 Q 0 0 12 0 Q 0 0 0 -12 Z" fill="url(#g-celestial-gold)" />
          <circle cx="0" cy="0" r="2" fill="#FFFFFF" />
        </g>
      </svg>
    `
  }
];
