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
        <defs>
          <linearGradient id="g-royal-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FBF2D5" />
            <stop offset="35%" stop-color="#D4AF37" />
            <stop offset="70%" stop-color="#A87B1B" />
            <stop offset="100%" stop-color="#F3DA8C" />
          </linearGradient>
          <linearGradient id="g-royal-accent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#D4AF37" />
            <stop offset="100%" stop-color="#5A0A21" />
          </linearGradient>
          <filter id="shadow-royal" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" flood-color="#5A0A21" flood-opacity="0.3" />
          </filter>
        </defs>

        <!-- Outer Double Frame Borders -->
        <rect x="7" y="7" width="86" height="86" rx="6" stroke="url(#g-royal-gold)" stroke-width="3" filter="url(#shadow-royal)" />
        <rect x="13" y="13" width="74" height="74" rx="3" stroke="url(#g-royal-gold)" stroke-width="1.8" stroke-opacity="0.9" />

        <!-- Top-Left Baroque Corner Flourish -->
        <path d="M 7 32 C 7 16, 16 7, 32 7" stroke="url(#g-royal-gold)" stroke-width="3" stroke-linecap="round" />
        <path d="M 13 13 C 20 22, 28 18, 30 13 C 30 26, 20 30, 13 30 Z" fill="url(#g-royal-gold)" fill-opacity="0.45" stroke="url(#g-royal-gold)" stroke-width="1.5" />
        <circle cx="21" cy="21" r="3.2" fill="url(#g-royal-gold)" />
        <circle cx="21" cy="21" r="1.2" fill="#FAF4F6" />

        <!-- Top-Right Baroque Corner Flourish -->
        <path d="M 93 32 C 93 16, 84 7, 68 7" stroke="url(#g-royal-gold)" stroke-width="3" stroke-linecap="round" />
        <path d="M 87 13 C 80 22, 72 18, 70 13 C 70 26, 80 30, 87 30 Z" fill="url(#g-royal-gold)" fill-opacity="0.45" stroke="url(#g-royal-gold)" stroke-width="1.5" />
        <circle cx="79" cy="21" r="3.2" fill="url(#g-royal-gold)" />
        <circle cx="79" cy="21" r="1.2" fill="#FAF4F6" />

        <!-- Bottom-Left Baroque Corner Flourish -->
        <path d="M 7 68 C 7 84, 16 93, 32 93" stroke="url(#g-royal-gold)" stroke-width="3" stroke-linecap="round" />
        <path d="M 13 87 C 20 78, 28 82, 30 87 C 30 74, 20 70, 13 70 Z" fill="url(#g-royal-gold)" fill-opacity="0.45" stroke="url(#g-royal-gold)" stroke-width="1.5" />
        <circle cx="21" cy="79" r="3.2" fill="url(#g-royal-gold)" />
        <circle cx="21" cy="79" r="1.2" fill="#FAF4F6" />

        <!-- Bottom-Right Baroque Corner Flourish -->
        <path d="M 93 68 C 93 84, 84 93, 68 93" stroke="url(#g-royal-gold)" stroke-width="3" stroke-linecap="round" />
        <path d="M 87 87 C 80 78, 72 82, 70 87 C 70 74, 80 70, 87 70 Z" fill="url(#g-royal-gold)" fill-opacity="0.45" stroke="url(#g-royal-gold)" stroke-width="1.5" />
        <circle cx="79" cy="79" r="3.2" fill="url(#g-royal-gold)" />
        <circle cx="79" cy="79" r="1.2" fill="#FAF4F6" />

        <!-- Top Crown Medallion -->
        <g transform="translate(50, 7)" filter="url(#shadow-royal)">
          <path d="M -10 0 L -6 -6 L 0 -2 L 6 -6 L 10 0 L 0 6 Z" fill="url(#g-royal-gold)" stroke="url(#g-royal-accent)" stroke-width="1" />
          <circle cx="0" cy="0" r="1.8" fill="#FAF4F6" />
        </g>

        <!-- Bottom Royal Seal Medallion -->
        <g transform="translate(50, 93)" filter="url(#shadow-royal)">
          <path d="M -8 0 L 0 -5 L 8 0 L 0 5 Z" fill="url(#g-royal-gold)" />
          <circle cx="0" cy="0" r="1.5" fill="#5A0A21" />
        </g>
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
        <defs>
          <linearGradient id="g-floral-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FBF2D5" />
            <stop offset="40%" stop-color="#D4AF37" />
            <stop offset="100%" stop-color="#9B7825" />
          </linearGradient>
          <linearGradient id="g-floral-rose" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FAD2D8" />
            <stop offset="50%" stop-color="#D4849A" />
            <stop offset="100%" stop-color="#8C1D40" />
          </linearGradient>
          <linearGradient id="g-floral-leaf" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#74C69D" />
            <stop offset="100%" stop-color="#1B4332" />
          </linearGradient>
          <filter id="shadow-floral" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" flood-color="#1B4332" flood-opacity="0.25" />
          </filter>
        </defs>

        <!-- Sweeping Botanical Vine Borders -->
        <path d="M 10 90 C 10 32, 32 10, 90 10" stroke="url(#g-floral-gold)" stroke-width="3.5" stroke-linecap="round" filter="url(#shadow-floral)" />
        <path d="M 17 90 C 17 40, 40 17, 90 17" stroke="url(#g-floral-gold)" stroke-width="2" stroke-linecap="round" />

        <!-- Top-Left Blooming Rose & Foliage Bouquet -->
        <g transform="translate(28, 28)" filter="url(#shadow-floral)">
          <!-- Outer Rose Petals -->
          <circle cx="0" cy="0" r="6.5" fill="url(#g-floral-rose)" />
          <circle cx="-4" cy="-3" r="4.5" fill="url(#g-floral-rose)" fill-opacity="0.9" />
          <circle cx="4" cy="3" r="4.5" fill="url(#g-floral-rose)" fill-opacity="0.9" />
          <circle cx="-3" cy="4" r="4.2" fill="url(#g-floral-rose)" fill-opacity="0.95" />
          <circle cx="3" cy="-4" r="4.2" fill="url(#g-floral-rose)" fill-opacity="0.95" />
          <!-- Gold Core Pistil -->
          <circle cx="0" cy="0" r="3" fill="url(#g-floral-gold)" />
          <circle cx="0" cy="0" r="1.2" fill="#FFFFFF" />
        </g>

        <!-- Sprouting Leaf Sprigs Along Vines -->
        <path d="M 14 58 C 5 47, 10 38, 20 48 C 20 48, 24 55, 14 58 Z" fill="url(#g-floral-leaf)" stroke="url(#g-floral-gold)" stroke-width="1.2" />
        <path d="M 58 14 C 47 5, 38 10, 48 20 C 48 20, 55 24, 58 14 Z" fill="url(#g-floral-leaf)" stroke="url(#g-floral-gold)" stroke-width="1.2" />
        <path d="M 22 75 C 14 66, 18 57, 27 67 Z" fill="url(#g-floral-gold)" />
        <path d="M 75 22 C 66 14, 57 18, 67 27 Z" fill="url(#g-floral-gold)" />

        <!-- Bottom-Right Complementary Floral Accent -->
        <g transform="translate(80, 80)">
          <circle cx="0" cy="0" r="4" fill="url(#g-floral-rose)" />
          <circle cx="0" cy="0" r="1.8" fill="url(#g-floral-gold)" />
          <path d="M -5 0 C -10 -4, -4 -10, 0 -5 Z" fill="url(#g-floral-leaf)" />
        </g>
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

        <!-- Bold Architectural Outer Floating Bars -->
        <line x1="24" y1="10" x2="76" y2="10" stroke="url(#g-mini-gold)" stroke-width="3" stroke-linecap="round" filter="url(#shadow-mini)" />
        <line x1="24" y1="90" x2="76" y2="90" stroke="url(#g-mini-gold)" stroke-width="3" stroke-linecap="round" filter="url(#shadow-mini)" />
        <line x1="10" y1="24" x2="10" y2="76" stroke="url(#g-mini-gold)" stroke-width="3" stroke-linecap="round" filter="url(#shadow-mini)" />
        <line x1="90" y1="24" x2="90" y2="76" stroke="url(#g-mini-gold)" stroke-width="3" stroke-linecap="round" filter="url(#shadow-mini)" />

        <!-- Inner Solid Precision Border -->
        <rect x="17" y="17" width="66" height="66" rx="3" stroke="url(#g-mini-gold)" stroke-width="2" stroke-opacity="0.9" />

        <!-- 4 Precision Corner Diamond Studs with Gold Gradient -->
        <g filter="url(#shadow-mini)">
          <polygon points="10,4 16,10 10,16 4,10" fill="url(#g-mini-gold)" stroke="#FFFFFF" stroke-width="1" />
          <circle cx="10" cy="10" r="1.5" fill="#3B0B1F" />

          <polygon points="90,4 96,10 90,16 84,10" fill="url(#g-mini-gold)" stroke="#FFFFFF" stroke-width="1" />
          <circle cx="90" cy="10" r="1.5" fill="#3B0B1F" />

          <polygon points="10,84 16,90 10,96 4,90" fill="url(#g-mini-gold)" stroke="#FFFFFF" stroke-width="1" />
          <circle cx="10" cy="90" r="1.5" fill="#3B0B1F" />

          <polygon points="90,84 96,90 90,96 84,90" fill="url(#g-mini-gold)" stroke="#FFFFFF" stroke-width="1" />
          <circle cx="90" cy="90" r="1.5" fill="#3B0B1F" />
        </g>

        <!-- Subtle Notch Accent Pins -->
        <circle cx="50" cy="17" r="2.2" fill="url(#g-mini-gold)" />
        <circle cx="50" cy="83" r="2.2" fill="url(#g-mini-gold)" />
        <circle cx="17" cy="50" r="2.2" fill="url(#g-mini-gold)" />
        <circle cx="83" cy="50" r="2.2" fill="url(#g-mini-gold)" />
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
        <defs>
          <linearGradient id="g-arch-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FDF1D6" />
            <stop offset="45%" stop-color="#D4AF37" />
            <stop offset="100%" stop-color="#996D14" />
          </linearGradient>
          <linearGradient id="g-arch-cream" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FAF0F3" />
            <stop offset="100%" stop-color="#F0D9E0" />
          </linearGradient>
          <filter id="shadow-arch" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" flood-color="#4A0A1A" flood-opacity="0.3" />
          </filter>
        </defs>

        <!-- Grand Roman Cathedral Outer Arch Structure -->
        <path d="M 14 90 L 14 44 C 14 18, 86 18, 86 44 L 86 90" stroke="url(#g-arch-gold)" stroke-width="3.5" stroke-linecap="round" filter="url(#shadow-arch)" />
        <!-- Inner Concentric Archway -->
        <path d="M 21 90 L 21 46 C 21 26, 79 26, 79 46 L 79 90" stroke="url(#g-arch-gold)" stroke-width="2" stroke-linecap="round" />

        <!-- Archway Base Plinth Railing -->
        <rect x="8" y="87" width="84" height="6" rx="2" fill="url(#g-arch-gold)" filter="url(#shadow-arch)" />

        <!-- Architectural Keystone Medallion at Apex -->
        <g transform="translate(50, 14)" filter="url(#shadow-arch)">
          <path d="M -8 -2 L -10 9 L 10 9 L 8 -2 Z" fill="url(#g-arch-gold)" stroke="#FFFFFF" stroke-width="0.8" />
          <circle cx="0" cy="4" r="2.2" fill="#5A0A21" />
        </g>

        <!-- Classical Column Capitals -->
        <rect x="9" y="42" width="10" height="5" rx="1.5" fill="url(#g-arch-gold)" />
        <rect x="81" y="42" width="10" height="5" rx="1.5" fill="url(#g-arch-gold)" />

        <!-- Symmetrical Classical Dots / Pearls -->
        <circle cx="14" cy="65" r="2.5" fill="url(#g-arch-gold)" />
        <circle cx="86" cy="65" r="2.5" fill="url(#g-arch-gold)" />
        <circle cx="50" cy="34" r="2" fill="url(#g-arch-gold)" />
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
        <defs>
          <linearGradient id="g-lace-rose" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FCE7EC" />
            <stop offset="40%" stop-color="#E295A8" />
            <stop offset="100%" stop-color="#B85B75" />
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

        <!-- Scalloped Outer Border Frame -->
        <rect x="9" y="9" width="82" height="82" rx="14" stroke="url(#g-lace-rose)" stroke-width="3" filter="url(#shadow-lace)" />
        <rect x="15" y="15" width="70" height="70" rx="9" stroke="url(#g-lace-gold)" stroke-width="2" />

        <!-- 4 Corner Sweetheart Filigree Medallions -->
        <g transform="translate(24, 24)" filter="url(#shadow-lace)">
          <path d="M 0,3 C -5,-5 -14,-3 -14,4 C -14,13 0,19 0,21 C 0,19 14,13 14,4 C 14,-3 5,-5 0,3 Z" fill="url(#g-lace-rose)" stroke="url(#g-lace-gold)" stroke-width="1.2" />
          <circle cx="0" cy="8" r="2.2" fill="#FAF4F6" />
        </g>

        <g transform="translate(76, 24)" filter="url(#shadow-lace)">
          <path d="M 0,3 C -5,-5 -14,-3 -14,4 C -14,13 0,19 0,21 C 0,19 14,13 14,4 C 14,-3 5,-5 0,3 Z" fill="url(#g-lace-rose)" stroke="url(#g-lace-gold)" stroke-width="1.2" />
          <circle cx="0" cy="8" r="2.2" fill="#FAF4F6" />
        </g>

        <g transform="translate(24, 76)" filter="url(#shadow-lace)">
          <path d="M 0,-3 C -5,5 -14,3 -14,-4 C -14,-13 0,-19 0,-21 C 0,-19 14,-13 14,-4 C 14,3 5,5 0,-3 Z" fill="url(#g-lace-rose)" stroke="url(#g-lace-gold)" stroke-width="1.2" />
          <circle cx="0" cy="-8" r="2.2" fill="#FAF4F6" />
        </g>

        <g transform="translate(76, 76)" filter="url(#shadow-lace)">
          <path d="M 0,-3 C -5,5 -14,3 -14,-4 C -14,-13 0,-19 0,-21 C 0,-19 14,-13 14,-4 C 14,3 5,5 0,-3 Z" fill="url(#g-lace-rose)" stroke="url(#g-lace-gold)" stroke-width="1.2" />
          <circle cx="0" cy="-8" r="2.2" fill="#FAF4F6" />
        </g>

        <!-- Lustrous Pearl Beads Along Perimeter -->
        <circle cx="50" cy="9" r="3.2" fill="url(#g-lace-gold)" filter="url(#shadow-lace)" />
        <circle cx="50" cy="91" r="3.2" fill="url(#g-lace-gold)" filter="url(#shadow-lace)" />
        <circle cx="9" cy="50" r="3.2" fill="url(#g-lace-gold)" filter="url(#shadow-lace)" />
        <circle cx="91" cy="50" r="3.2" fill="url(#g-lace-gold)" filter="url(#shadow-lace)" />
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
        <defs>
          <linearGradient id="g-deco-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFF0CE" />
            <stop offset="35%" stop-color="#E2C873" />
            <stop offset="70%" stop-color="#C8A84B" />
            <stop offset="100%" stop-color="#876214" />
          </linearGradient>
          <linearGradient id="g-deco-amber" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#E2C873" />
            <stop offset="100%" stop-color="#5A0A21" />
          </linearGradient>
          <filter id="shadow-deco" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" flood-color="#876214" flood-opacity="0.3" />
          </filter>
        </defs>

        <!-- Bold Stepped Art Deco Outer Brackets -->
        <path d="M 6 42 L 6 18 L 18 18 L 18 6 L 42 6" stroke="url(#g-deco-gold)" stroke-width="3.5" stroke-linecap="square" filter="url(#shadow-deco)" />
        <path d="M 58 6 L 82 6 L 82 18 L 94 18 L 94 42" stroke="url(#g-deco-gold)" stroke-width="3.5" stroke-linecap="square" filter="url(#shadow-deco)" />
        <path d="M 6 58 L 6 82 L 18 82 L 18 94 L 42 94" stroke="url(#g-deco-gold)" stroke-width="3.5" stroke-linecap="square" filter="url(#shadow-deco)" />
        <path d="M 58 94 L 82 94 L 82 82 L 94 82 L 94 58" stroke="url(#g-deco-gold)" stroke-width="3.5" stroke-linecap="square" filter="url(#shadow-deco)" />

        <!-- Inner Solid Square & Nested Diamond Frame -->
        <rect x="22" y="22" width="56" height="56" stroke="url(#g-deco-gold)" stroke-width="2" />
        <polygon points="50,26 74,50 50,74 26,50" stroke="url(#g-deco-gold)" stroke-width="2" fill="url(#g-deco-amber)" fill-opacity="0.15" />

        <!-- Corner Geometric Sunburst Rays -->
        <line x1="6" y1="6" x2="22" y2="22" stroke="url(#g-deco-gold)" stroke-width="2.5" />
        <line x1="94" y1="6" x2="78" y2="22" stroke="url(#g-deco-gold)" stroke-width="2.5" />
        <line x1="6" y1="94" x2="22" y2="78" stroke="url(#g-deco-gold)" stroke-width="2.5" />
        <line x1="94" y1="94" x2="78" y2="78" stroke="url(#g-deco-gold)" stroke-width="2.5" />

        <!-- Center Diamond Medallion -->
        <g transform="translate(50, 50)" filter="url(#shadow-deco)">
          <polygon points="0,-7 7,0 0,7 -7,0" fill="url(#g-deco-gold)" />
          <circle cx="0" cy="0" r="2" fill="#5A0A21" />
        </g>
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
        <defs>
          <linearGradient id="g-tibeb-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFF2D6" />
            <stop offset="40%" stop-color="#D4AF37" />
            <stop offset="80%" stop-color="#A87B1B" />
            <stop offset="100%" stop-color="#F2D785" />
          </linearGradient>
          <linearGradient id="g-tibeb-burgundy" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#7C112E" />
            <stop offset="100%" stop-color="#3D0513" />
          </linearGradient>
          <filter id="shadow-tibeb" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" flood-color="#3D0513" flood-opacity="0.35" />
          </filter>
        </defs>

        <!-- Braided Double Structural Borders -->
        <rect x="8" y="8" width="84" height="84" rx="4" stroke="url(#g-tibeb-gold)" stroke-width="3" filter="url(#shadow-tibeb)" />
        <rect x="14" y="14" width="72" height="72" rx="2" stroke="url(#g-tibeb-gold)" stroke-width="2" />

        <!-- 4 Ethiopian Meskel Cross Corner Medallions -->
        <g transform="translate(24, 24)" filter="url(#shadow-tibeb)">
          <path d="M -4 -13 L 4 -13 L 4 -4 L 13 -4 L 13 4 L 4 4 L 4 13 L -4 13 L -4 4 L -13 4 L -13 -4 L -4 -4 Z" fill="url(#g-tibeb-gold)" stroke="url(#g-tibeb-burgundy)" stroke-width="1.2" />
          <circle cx="0" cy="0" r="2" fill="#FAF4F6" />
        </g>

        <g transform="translate(76, 24)" filter="url(#shadow-tibeb)">
          <path d="M -4 -13 L 4 -13 L 4 -4 L 13 -4 L 13 4 L 4 4 L 4 13 L -4 13 L -4 4 L -13 4 L -13 -4 L -4 -4 Z" fill="url(#g-tibeb-gold)" stroke="url(#g-tibeb-burgundy)" stroke-width="1.2" />
          <circle cx="0" cy="0" r="2" fill="#FAF4F6" />
        </g>

        <g transform="translate(24, 76)" filter="url(#shadow-tibeb)">
          <path d="M -4 -13 L 4 -13 L 4 -4 L 13 -4 L 13 4 L 4 4 L 4 13 L -4 13 L -4 4 L -13 4 L -13 -4 L -4 -4 Z" fill="url(#g-tibeb-gold)" stroke="url(#g-tibeb-burgundy)" stroke-width="1.2" />
          <circle cx="0" cy="0" r="2" fill="#FAF4F6" />
        </g>

        <g transform="translate(76, 76)" filter="url(#shadow-tibeb)">
          <path d="M -4 -13 L 4 -13 L 4 -4 L 13 -4 L 13 4 L 4 4 L 4 13 L -4 13 L -4 4 L -13 4 L -13 -4 L -4 -4 Z" fill="url(#g-tibeb-gold)" stroke="url(#g-tibeb-burgundy)" stroke-width="1.2" />
          <circle cx="0" cy="0" r="2" fill="#FAF4F6" />
        </g>

        <!-- Center Diamond Tibeb Motifs -->
        <g transform="translate(50, 8)" filter="url(#shadow-tibeb)">
          <polygon points="0,-6 7,0 0,6 -7,0" fill="url(#g-tibeb-burgundy)" stroke="url(#g-tibeb-gold)" stroke-width="1.5" />
          <circle cx="0" cy="0" r="1.5" fill="#FAF4F6" />
        </g>
        <g transform="translate(50, 92)" filter="url(#shadow-tibeb)">
          <polygon points="0,-6 7,0 0,6 -7,0" fill="url(#g-tibeb-burgundy)" stroke="url(#g-tibeb-gold)" stroke-width="1.5" />
          <circle cx="0" cy="0" r="1.5" fill="#FAF4F6" />
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
        <defs>
          <linearGradient id="g-celestial-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFFFFF" />
            <stop offset="30%" stop-color="#FDF1D6" />
            <stop offset="65%" stop-color="#D4AF37" />
            <stop offset="100%" stop-color="#8C6819" />
          </linearGradient>
          <filter id="shadow-celestial" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="2" flood-color="#D4AF37" flood-opacity="0.4" />
          </filter>
        </defs>

        <!-- Starlight Dual Border Frame with Notched Corners -->
        <rect x="10" y="10" width="80" height="80" rx="6" stroke="url(#g-celestial-gold)" stroke-width="3" filter="url(#shadow-celestial)" />
        <rect x="16" y="16" width="68" height="68" rx="4" stroke="url(#g-celestial-gold)" stroke-width="1.8" stroke-opacity="0.85" />

        <!-- Grand Astral Starburst at Top-Left (24, 24) -->
        <g transform="translate(24, 24)" filter="url(#shadow-celestial)">
          <path d="M 0 -17 Q 0 0 -17 0 Q 0 0 0 17 Q 0 0 17 0 Q 0 0 0 -17 Z" fill="url(#g-celestial-gold)" />
          <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
        </g>

        <!-- Grand Astral Starburst at Bottom-Right (76, 76) -->
        <g transform="translate(76, 76)" filter="url(#shadow-celestial)">
          <path d="M 0 -17 Q 0 0 -17 0 Q 0 0 0 17 Q 0 0 17 0 Q 0 0 0 -17 Z" fill="url(#g-celestial-gold)" />
          <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
        </g>

        <!-- Satellite Starbursts at Top-Right & Bottom-Left -->
        <g transform="translate(76, 24) scale(0.65)" filter="url(#shadow-celestial)">
          <path d="M 0 -14 Q 0 0 -14 0 Q 0 0 0 14 Q 0 0 14 0 Q 0 0 0 -14 Z" fill="url(#g-celestial-gold)" />
          <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />
        </g>

        <g transform="translate(24, 76) scale(0.65)" filter="url(#shadow-celestial)">
          <path d="M 0 -14 Q 0 0 -14 0 Q 0 0 0 14 Q 0 0 14 0 Q 0 0 0 -14 Z" fill="url(#g-celestial-gold)" />
          <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />
        </g>

        <!-- Stardust Diamond Sparkles -->
        <polygon points="50,6 53,10 50,14 47,10" fill="url(#g-celestial-gold)" filter="url(#shadow-celestial)" />
        <polygon points="50,86 53,90 50,94 47,90" fill="url(#g-celestial-gold)" filter="url(#shadow-celestial)" />
        <polygon points="6,50 10,53 14,50 10,47" fill="url(#g-celestial-gold)" filter="url(#shadow-celestial)" />
        <polygon points="86,50 90,53 94,50 90,47" fill="url(#g-celestial-gold)" filter="url(#shadow-celestial)" />
      </svg>
    `
  }
];
