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
  },
  {
    id: 'minimalist-horizon',
    name: 'Precision Linear Horizon',
    category: 'Minimalist',
    tag: 'Linear & Pure',
    description: 'Dual cantilevered horizon bars with intersecting corner crosshairs and solid geometric compass notches.',
    previewSvg: `
      <svg viewBox="0 0 100 100" fill="none" class="w-full h-full">
        <defs>
          <linearGradient id="g-horizon-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFF3D4" />
            <stop offset="45%" stop-color="#C8A84B" />
            <stop offset="90%" stop-color="#8C6819" />
          </linearGradient>
          <filter id="shadow-horizon" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" flood-color="#8C6819" flood-opacity="0.25" />
          </filter>
        </defs>

        <!-- Bold Cantilevered Horizon Horizontal Rails -->
        <line x1="6" y1="16" x2="94" y2="16" stroke="url(#g-horizon-gold)" stroke-width="3" stroke-linecap="square" filter="url(#shadow-horizon)" />
        <line x1="6" y1="84" x2="94" y2="84" stroke="url(#g-horizon-gold)" stroke-width="3" stroke-linecap="square" filter="url(#shadow-horizon)" />

        <!-- Vertical Crosshair Posts -->
        <line x1="16" y1="6" x2="16" y2="94" stroke="url(#g-horizon-gold)" stroke-width="3" stroke-linecap="square" filter="url(#shadow-horizon)" />
        <line x1="84" y1="6" x2="84" y2="94" stroke="url(#g-horizon-gold)" stroke-width="3" stroke-linecap="square" filter="url(#shadow-horizon)" />

        <!-- Inner Inset Clean Frame -->
        <rect x="24" y="24" width="52" height="52" stroke="url(#g-horizon-gold)" stroke-width="1.2" stroke-opacity="0.75" />

        <!-- Corner Solid Diamond Intersection Points -->
        <g transform="translate(16, 16)" filter="url(#shadow-horizon)">
          <rect x="-3" y="-3" width="6" height="6" fill="url(#g-horizon-gold)" transform="rotate(45)" />
        </g>
        <g transform="translate(84, 16)" filter="url(#shadow-horizon)">
          <rect x="-3" y="-3" width="6" height="6" fill="url(#g-horizon-gold)" transform="rotate(45)" />
        </g>
        <g transform="translate(16, 84)" filter="url(#shadow-horizon)">
          <rect x="-3" y="-3" width="6" height="6" fill="url(#g-horizon-gold)" transform="rotate(45)" />
        </g>
        <g transform="translate(84, 84)" filter="url(#shadow-horizon)">
          <rect x="-3" y="-3" width="6" height="6" fill="url(#g-horizon-gold)" transform="rotate(45)" />
        </g>

        <!-- Center Compass Markers -->
        <g transform="translate(50, 16)">
          <circle cx="0" cy="0" r="2.5" fill="url(#g-horizon-gold)" />
        </g>
        <g transform="translate(50, 84)">
          <circle cx="0" cy="0" r="2.5" fill="url(#g-horizon-gold)" />
        </g>
      </svg>
    `
  },
  {
    id: 'contemporary-prism',
    name: 'Prismatic Chamfer Matrix',
    category: 'Contemporary',
    tag: 'Faceted & Modern',
    description: 'Bold 45-degree chamfered octagonal boundary contours, interlocking isometric prism bevels, and angled facet crests.',
    previewSvg: `
      <svg viewBox="0 0 100 100" fill="none" class="w-full h-full">
        <defs>
          <linearGradient id="g-prism-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFF5DB" />
            <stop offset="40%" stop-color="#E2C873" />
            <stop offset="80%" stop-color="#B88A22" />
            <stop offset="100%" stop-color="#6E500E" />
          </linearGradient>
          <linearGradient id="g-prism-accent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#8C1D40" />
            <stop offset="100%" stop-color="#4A0A1A" />
          </linearGradient>
          <filter id="shadow-prism" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" flood-color="#4A0A1A" flood-opacity="0.3" />
          </filter>
        </defs>

        <!-- Bold 45-Degree Chamfered Octagonal Perimeter -->
        <path d="M 26 10 L 74 10 L 90 26 L 90 74 L 74 90 L 26 90 L 10 74 L 10 26 Z" stroke="url(#g-prism-gold)" stroke-width="3" stroke-linejoin="miter" filter="url(#shadow-prism)" />

        <!-- Concentric Inner Chamfered Line -->
        <path d="M 30 16 L 70 16 L 84 30 L 84 70 L 70 84 L 30 84 L 16 70 L 16 30 Z" stroke="url(#g-prism-gold)" stroke-width="1.2" stroke-opacity="0.8" />

        <!-- Interlocking Corner Prism Triangular Facets -->
        <polygon points="10,26 26,10 18,18" fill="url(#g-prism-accent)" stroke="url(#g-prism-gold)" stroke-width="0.8" />
        <polygon points="90,26 74,10 82,18" fill="url(#g-prism-accent)" stroke="url(#g-prism-gold)" stroke-width="0.8" />
        <polygon points="10,74 26,90 18,82" fill="url(#g-prism-accent)" stroke="url(#g-prism-gold)" stroke-width="0.8" />
        <polygon points="90,74 74,90 82,82" fill="url(#g-prism-accent)" stroke="url(#g-prism-gold)" stroke-width="0.8" />

        <!-- Apex Faceted Diamond Crest -->
        <g transform="translate(50, 10)" filter="url(#shadow-prism)">
          <polygon points="0,-6 7,0 0,6 -7,0" fill="url(#g-prism-gold)" stroke="url(#g-prism-accent)" stroke-width="1" />
          <circle cx="0" cy="0" r="1.5" fill="#FAF4F6" />
        </g>
        <g transform="translate(50, 90)" filter="url(#shadow-prism)">
          <polygon points="0,-4 5,0 0,4 -5,0" fill="url(#g-prism-gold)" />
        </g>
      </svg>
    `
  },
  {
    id: 'heritage-knotwork',
    name: 'Royal Meander Knotwork',
    category: 'Heritage',
    tag: 'Regal & Monumental',
    description: 'Interlocking Greek meander fretwork corners with a bold monumental solar disc seal and solid gold contour framing.',
    previewSvg: `
      <svg viewBox="0 0 100 100" fill="none" class="w-full h-full">
        <defs>
          <linearGradient id="g-knot-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFF2D6" />
            <stop offset="40%" stop-color="#D4AF37" />
            <stop offset="85%" stop-color="#996D14" />
            <stop offset="100%" stop-color="#F2D785" />
          </linearGradient>
          <linearGradient id="g-knot-rich" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#661026" />
            <stop offset="100%" stop-color="#2D030D" />
          </linearGradient>
          <filter id="shadow-knot" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" flood-color="#2D030D" flood-opacity="0.3" />
          </filter>
        </defs>

        <!-- Bold Outer Structural Frame -->
        <rect x="10" y="10" width="80" height="80" rx="1" stroke="url(#g-knot-gold)" stroke-width="2.5" filter="url(#shadow-knot)" />

        <!-- Bold Interlocking Geometric Greek Meander Corners -->
        <path d="M 10 32 L 24 32 L 24 18 L 18 18 L 18 24 L 10 24" stroke="url(#g-knot-gold)" stroke-width="2" stroke-linecap="square" fill="none" />
        <path d="M 90 32 L 76 32 L 76 18 L 82 18 L 82 24 L 90 24" stroke="url(#g-knot-gold)" stroke-width="2" stroke-linecap="square" fill="none" />
        <path d="M 10 68 L 24 68 L 24 82 L 18 82 L 18 76 L 10 76" stroke="url(#g-knot-gold)" stroke-width="2" stroke-linecap="square" fill="none" />
        <path d="M 90 68 L 76 68 L 76 82 L 82 82 L 82 76 L 90 76" stroke="url(#g-knot-gold)" stroke-width="2" stroke-linecap="square" fill="none" />

        <!-- Monumental Solar Heritage Medallion at Apex -->
        <g transform="translate(50, 10)" filter="url(#shadow-knot)">
          <circle cx="0" cy="0" r="7.5" fill="url(#g-knot-gold)" stroke="url(#g-knot-rich)" stroke-width="1" />
          <circle cx="0" cy="0" r="4.5" fill="none" stroke="#FAF4F6" stroke-width="0.8" />
          <polygon points="0,-2.5 2.5,0 0,2.5 -2.5,0" fill="#FAF4F6" />
        </g>

        <!-- Base Stepped Heritage Chevron -->
        <polygon points="44,90 50,84 56,90" fill="url(#g-knot-gold)" />
      </svg>
    `
  },
  {
    id: 'celestial-lunar',
    name: 'Cosmic Eclipse & Lunar Orbit',
    category: 'Celestial',
    tag: 'Astral & Dramatic',
    description: 'Monumental crescent moon silhouette with interlocking solar eclipse rings and radiant golden planetary orbits.',
    previewSvg: `
      <svg viewBox="0 0 100 100" fill="none" class="w-full h-full">
        <defs>
          <linearGradient id="g-lunar-gold" x1="0%" x1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFFFFF" />
            <stop offset="35%" stop-color="#F7DF94" />
            <stop offset="70%" stop-color="#D4AF37" />
            <stop offset="100%" stop-color="#8C6819" />
          </linearGradient>
          <linearGradient id="g-lunar-night" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#142850" />
            <stop offset="100%" stop-color="#07101E" />
          </linearGradient>
          <filter id="shadow-lunar" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="2" flood-color="#D4AF37" flood-opacity="0.35" />
          </filter>
        </defs>

        <!-- Rounded Cosmic Outer Frame -->
        <rect x="12" y="12" width="76" height="76" rx="8" stroke="url(#g-lunar-gold)" stroke-width="2" stroke-opacity="0.65" filter="url(#shadow-lunar)" />

        <!-- Inner Circular Planetary Orbit -->
        <circle cx="50" cy="50" r="32" stroke="url(#g-lunar-gold)" stroke-width="1.2" stroke-opacity="0.75" />

        <!-- Monumental Apex Eclipse Crescent & Disc at (50, 12) -->
        <g transform="translate(50, 12)" filter="url(#shadow-lunar)">
          <path d="M 0 -9 A 9 9 0 1 0 0 9 A 6.5 6.5 0 1 1 0 -9 Z" fill="url(#g-lunar-gold)" />
          <circle cx="2.5" cy="0" r="3.5" fill="url(#g-lunar-night)" stroke="url(#g-lunar-gold)" stroke-width="0.8" />
          <circle cx="2.5" cy="0" r="1.2" fill="#FFFFFF" />
        </g>

        <!-- Starburst Cardinal Corner Markers -->
        <g transform="translate(24, 24) scale(0.6)" filter="url(#shadow-lunar)">
          <path d="M 0 -8 Q 0 0 -8 0 Q 0 0 0 8 Q 0 0 8 0 Q 0 0 0 -8 Z" fill="url(#g-lunar-gold)" />
          <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
        </g>
        <g transform="translate(76, 76) scale(0.6)" filter="url(#shadow-lunar)">
          <path d="M 0 -8 Q 0 0 -8 0 Q 0 0 0 8 Q 0 0 8 0 Q 0 0 0 -8 Z" fill="url(#g-lunar-gold)" />
          <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
        </g>
        <g transform="translate(50, 88)" filter="url(#shadow-lunar)">
          <polygon points="0,-4 4,0 0,4 -4,0" fill="url(#g-lunar-gold)" />
        </g>
      </svg>
    `
  },
  {
    id: 'luxury-sovereign',
    name: 'Sovereign Pavilion Crest',
    category: 'Luxury',
    tag: 'Regal & Architectural',
    description: 'Multi-tiered gold sovereign chevron pediment, flanking faceted diamond shoulder brackets, and an apex fleur-de-lis seal.',
    previewSvg: `
      <svg viewBox="0 0 100 100" fill="none" class="w-full h-full">
        <defs>
          <linearGradient id="g-sovereign-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFF8E7" />
            <stop offset="35%" stop-color="#E5C365" />
            <stop offset="75%" stop-color="#AA7E1F" />
            <stop offset="100%" stop-color="#59400B" />
          </linearGradient>
          <linearGradient id="g-sovereign-ruby" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#731131" />
            <stop offset="100%" stop-color="#360514" />
          </linearGradient>
          <filter id="shadow-sovereign" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" flood-color="#360514" flood-opacity="0.3" />
          </filter>
        </defs>

        <!-- Bold Chamfered Pavilion Outer Structural Frame -->
        <path d="M 12 34 L 34 12 L 66 12 L 88 34 L 88 88 L 12 88 Z" stroke="url(#g-sovereign-gold)" stroke-width="3" stroke-linejoin="miter" stroke-linecap="square" filter="url(#shadow-sovereign)" />

        <!-- Concentric Inner Fillet -->
        <path d="M 18 36 L 36 18 L 64 18 L 82 36 L 82 82 L 18 82 Z" stroke="url(#g-sovereign-gold)" stroke-width="1.2" stroke-opacity="0.75" />

        <!-- Flanking Shoulder Diamond Facets -->
        <polygon points="12,34 34,12 24,24" fill="url(#g-sovereign-ruby)" stroke="url(#g-sovereign-gold)" stroke-width="1" />
        <polygon points="88,34 66,12 76,24" fill="url(#g-sovereign-ruby)" stroke="url(#g-sovereign-gold)" stroke-width="1" />

        <!-- Apex Sovereign Crown / Fleur Medallion -->
        <g transform="translate(50, 12)" filter="url(#shadow-sovereign)">
          <!-- Multi-tiered Crown Crest -->
          <polygon points="0,-9 9,0 0,6 -9,0" fill="url(#g-sovereign-gold)" stroke="url(#g-sovereign-ruby)" stroke-width="1" />
          <polygon points="0,-13 4,-8 -4,-8" fill="url(#g-sovereign-gold)" />
          <polygon points="-8,-4 -12,-8 -5,-8" fill="url(#g-sovereign-gold)" />
          <polygon points="8,-4 12,-8 5,-8" fill="url(#g-sovereign-gold)" />
          <circle cx="0" cy="-1.5" r="1.8" fill="#FFF8E7" />
        </g>

        <!-- Base Stepped Royal Tier -->
        <g transform="translate(50, 88)" filter="url(#shadow-sovereign)">
          <polygon points="0,-6 8,0 0,2 -8,0" fill="url(#g-sovereign-gold)" />
          <line x1="-16" y1="0" x2="16" y2="0" stroke="url(#g-sovereign-gold)" stroke-width="2" stroke-linecap="square" />
        </g>
      </svg>
    `
  },
  {
    id: 'floral-garland',
    name: 'Symmetrical Magnolia Garland',
    category: 'Floral',
    tag: 'Botanical Garland',
    description: 'Symmetrical twin botanical leaf swags arching toward a central sculptural blooming magnolia blossom with cascading floral buds.',
    previewSvg: `
      <svg viewBox="0 0 100 100" fill="none" class="w-full h-full">
        <defs>
          <linearGradient id="g-garland-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFF6E0" />
            <stop offset="45%" stop-color="#D8B24C" />
            <stop offset="100%" stop-color="#8F6A15" />
          </linearGradient>
          <linearGradient id="g-garland-petal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FDE8EE" />
            <stop offset="50%" stop-color="#E289A2" />
            <stop offset="100%" stop-color="#8F1D3E" />
          </linearGradient>
          <linearGradient id="g-garland-leaf" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#A5E5BA" />
            <stop offset="100%" stop-color="#245A41" />
          </linearGradient>
          <filter id="shadow-garland" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" flood-color="#245A41" flood-opacity="0.25" />
          </filter>
        </defs>

        <!-- Symmetrical Arching Perimeter Frame -->
        <path d="M 14 88 L 14 36 C 14 18, 28 14, 50 14 C 72 14, 86 18, 86 36 L 86 88 Z" stroke="url(#g-garland-gold)" stroke-width="2.5" stroke-linecap="round" filter="url(#shadow-garland)" />
        <path d="M 20 84 L 20 38 C 20 24, 32 20, 50 20 C 68 20, 80 24, 80 38 L 80 84" stroke="url(#g-garland-gold)" stroke-width="1" stroke-opacity="0.7" />

        <!-- Twin Symmetrical Botanical Branch Swags -->
        <path d="M 18 36 Q 30 18, 44 18" stroke="url(#g-garland-gold)" stroke-width="2" stroke-linecap="round" />
        <path d="M 82 36 Q 70 18, 56 18" stroke="url(#g-garland-gold)" stroke-width="2" stroke-linecap="round" />

        <!-- Symmetrical Hanging Leaf Silhouettes -->
        <path d="M 26 26 C 22 18, 30 16, 34 22 C 32 28, 28 30, 26 26 Z" fill="url(#g-garland-leaf)" filter="url(#shadow-garland)" />
        <path d="M 74 26 C 78 18, 70 16, 66 22 C 68 28, 72 30, 74 26 Z" fill="url(#g-garland-leaf)" filter="url(#shadow-garland)" />
        <path d="M 38 18 C 34 10, 42 8, 45 14 C 43 20, 39 21, 38 18 Z" fill="url(#g-garland-leaf)" />
        <path d="M 62 18 C 66 10, 58 8, 55 14 C 57 20, 61 21, 62 18 Z" fill="url(#g-garland-leaf)" />

        <!-- Central Blooming Magnolia Crest at Apex -->
        <g transform="translate(50, 14)" filter="url(#shadow-garland)">
          <!-- Outer Back Petals -->
          <path d="M 0 -8 C -6 -12, -9 -4, 0 3 C 9 -4, 6 -12, 0 -8 Z" fill="url(#g-garland-petal)" stroke="url(#g-garland-gold)" stroke-width="0.8" />
          <!-- Flanking Petals -->
          <path d="M -2 -5 C -9 -7, -11 0, -3 3 Z" fill="url(#g-garland-petal)" />
          <path d="M 2 -5 C 9 -7, 11 0, 3 3 Z" fill="url(#g-garland-petal)" />
          <!-- Center Gold Bud Core -->
          <circle cx="0" cy="-2" r="2.2" fill="url(#g-garland-gold)" />
          <circle cx="0" cy="-2" r="1" fill="#FFF6E0" />
        </g>

        <!-- Lower Symmetrical Petal Drops -->
        <circle cx="14" cy="88" r="2.5" fill="url(#g-garland-gold)" />
        <circle cx="86" cy="88" r="2.5" fill="url(#g-garland-gold)" />
      </svg>
    `
  },
  {
    id: 'romantic-ribbon',
    name: 'Interlocking Infinity Ribbon',
    category: 'Romantic',
    tag: 'Endless Love & Ribbon',
    description: 'Intertwined dual infinity ribbon curves with sculpted sweetheart shoulder scallops and radiant rose-gold droplet centerpieces.',
    previewSvg: `
      <svg viewBox="0 0 100 100" fill="none" class="w-full h-full">
        <defs>
          <linearGradient id="g-ribbon-rose" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFE5EC" />
            <stop offset="45%" stop-color="#E88CA4" />
            <stop offset="100%" stop-color="#A52C53" />
          </linearGradient>
          <linearGradient id="g-ribbon-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFF2D6" />
            <stop offset="40%" stop-color="#D4AF37" />
            <stop offset="100%" stop-color="#8C6517" />
          </linearGradient>
          <filter id="shadow-ribbon" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" flood-color="#8C1D40" flood-opacity="0.25" />
          </filter>
        </defs>

        <!-- Sculpted Sweetheart Undulating Outer Frame -->
        <path d="M 12 40 C 12 20, 24 12, 38 12 C 44 12, 48 16, 50 18 C 52 16, 56 12, 62 12 C 76 12, 88 20, 88 40 L 88 72 C 88 82, 78 88, 50 88 C 22 88, 12 82, 12 72 Z" stroke="url(#g-ribbon-rose)" stroke-width="2.5" filter="url(#shadow-ribbon)" />
        <path d="M 18 42 C 18 26, 26 18, 38 18 C 43 18, 47 21, 50 24 C 53 21, 57 18, 62 18 C 74 18, 82 26, 82 42 L 82 70 C 82 78, 72 82, 50 82 C 28 82, 18 78, 18 70 Z" stroke="url(#g-ribbon-gold)" stroke-width="1.2" stroke-opacity="0.8" />

        <!-- Central Interlocking Infinity Ribbon Loop at Apex -->
        <g transform="translate(50, 18)" filter="url(#shadow-ribbon)">
          <!-- Left Infinity Loop -->
          <path d="M 0 0 C -5 -6, -11 -6, -11 0 C -11 6, -5 6, 0 0" stroke="url(#g-ribbon-rose)" stroke-width="2.2" stroke-linecap="round" fill="none" />
          <!-- Right Infinity Loop -->
          <path d="M 0 0 C 5 6, 11 6, 11 0 C 11 -6, 5 -6, 0 0" stroke="url(#g-ribbon-rose)" stroke-width="2.2" stroke-linecap="round" fill="none" />
          <!-- Center Gold Ribbon Knot Ring -->
          <circle cx="0" cy="0" r="2.8" fill="url(#g-ribbon-gold)" stroke="#FFF" stroke-width="0.6" />
          <!-- Pendant Pearl Drop -->
          <path d="M 0 3 C -1.5 5, -2 7, 0 9 C 2 7, 1.5 5, 0 3 Z" fill="url(#g-ribbon-gold)" />
        </g>

        <!-- Flowing Ribbon Flank Swirls at Lower Sides -->
        <path d="M 14 66 C 18 70, 22 72, 28 70" stroke="url(#g-ribbon-gold)" stroke-width="1.8" stroke-linecap="round" />
        <path d="M 86 66 C 82 70, 78 72, 72 70" stroke="url(#g-ribbon-gold)" stroke-width="1.8" stroke-linecap="round" />
      </svg>
    `
  },
  {
    id: 'classic-pediment',
    name: 'Neoclassical Palladian Pediment',
    category: 'Classic',
    tag: 'Timeless & Architectural',
    description: 'Neoclassical triangular pediment gable with dentil triglyph accents, twin fluted Ionic column borders, and a stepped plinth base.',
    previewSvg: `
      <svg viewBox="0 0 100 100" fill="none" class="w-full h-full">
        <defs>
          <linearGradient id="g-pediment-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFF8E8" />
            <stop offset="40%" stop-color="#DFBF68" />
            <stop offset="80%" stop-color="#A88124" />
            <stop offset="100%" stop-color="#5E430B" />
          </linearGradient>
          <filter id="shadow-pediment" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" flood-color="#5E430B" flood-opacity="0.3" />
          </filter>
        </defs>

        <!-- Neoclassical Triangular Pediment Gable at Top -->
        <polygon points="10,24 50,8 90,24" stroke="url(#g-pediment-gold)" stroke-width="3" stroke-linejoin="miter" fill="none" filter="url(#shadow-pediment)" />
        <line x1="8" y1="24" x2="92" y2="24" stroke="url(#g-pediment-gold)" stroke-width="2.5" stroke-linecap="square" />
        <line x1="12" y1="28" x2="88" y2="28" stroke="url(#g-pediment-gold)" stroke-width="1.5" stroke-linecap="square" />

        <!-- Tympanum Rosette Emblem -->
        <g transform="translate(50, 18)" filter="url(#shadow-pediment)">
          <circle cx="0" cy="0" r="3.5" fill="url(#g-pediment-gold)" />
          <circle cx="0" cy="0" r="1.5" fill="#FFF8E8" />
        </g>

        <!-- Fluted Left Ionic Column -->
        <line x1="14" y1="28" x2="14" y2="84" stroke="url(#g-pediment-gold)" stroke-width="2.5" stroke-linecap="square" />
        <line x1="20" y1="28" x2="20" y2="84" stroke="url(#g-pediment-gold)" stroke-width="1.2" stroke-opacity="0.8" />

        <!-- Fluted Right Ionic Column -->
        <line x1="86" y1="28" x2="86" y2="84" stroke="url(#g-pediment-gold)" stroke-width="2.5" stroke-linecap="square" />
        <line x1="80" y1="28" x2="80" y2="84" stroke="url(#g-pediment-gold)" stroke-width="1.2" stroke-opacity="0.8" />

        <!-- Column Capital Volutes / Scrolls -->
        <g transform="translate(17, 30)">
          <circle cx="-3" cy="0" r="1.8" fill="url(#g-pediment-gold)" />
          <circle cx="3" cy="0" r="1.8" fill="url(#g-pediment-gold)" />
        </g>
        <g transform="translate(83, 30)">
          <circle cx="-3" cy="0" r="1.8" fill="url(#g-pediment-gold)" />
          <circle cx="3" cy="0" r="1.8" fill="url(#g-pediment-gold)" />
        </g>

        <!-- Stepped Classical Plinth Base at Bottom -->
        <line x1="10" y1="84" x2="90" y2="84" stroke="url(#g-pediment-gold)" stroke-width="2" stroke-linecap="square" filter="url(#shadow-pediment)" />
        <line x1="6" y1="88" x2="94" y2="88" stroke="url(#g-pediment-gold)" stroke-width="3" stroke-linecap="square" filter="url(#shadow-pediment)" />
      </svg>
    `
  }
];
