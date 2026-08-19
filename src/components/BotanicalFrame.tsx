import React from 'react';
import { ThemeId, FrameStyleId } from '../types';
import { THEME_PRESETS } from '../utils/themePresets';

export type BotanicalFramePosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'banner-top'
  | 'banner-bottom'
  | 'divider';

interface BotanicalFrameProps {
  className?: string;
  position?: BotanicalFramePosition;
  colorMode?: 'gold' | 'rose' | 'wine' | 'auto';
  themeId?: ThemeId;
  frameStyle?: FrameStyleId;
}

export function getBotanicalFrameHtml(
  position: BotanicalFramePosition = 'top-left',
  themeId: ThemeId = 'bordeaux',
  frameStyle?: FrameStyleId,
  className: string = ''
): string {
  // Resolve active theme colors
  const activePreset = THEME_PRESETS[themeId] || THEME_PRESETS.bordeaux;
  const goldColor = activePreset.colors.gold || '#C8A84B';
  const primaryColor = activePreset.colors.primary || '#59102E';
  const blushColor = activePreset.colors.blush || '#B85B75';
  const lightGold = activePreset.colors.goldLt || '#F3C969';
  const leafColor = activePreset.colors.mid || primaryColor;

  // Resolve default frame style from theme if not explicitly provided
  const effectiveFrame: FrameStyleId =
    frameStyle ||
    (themeId === 'emerald'
      ? 'botanical-floral'
      : themeId === 'midnight'
      ? 'celestial-sparkle'
      : themeId === 'goldluxury'
      ? 'contemporary-geo'
      : themeId === 'classicivory'
      ? 'classic-arch'
      : themeId === 'rosegarden'
      ? 'romantic-lace'
      : 'royal-luxury');

  const getTransform = () => {
    switch (position) {
      case 'top-right':
        return 'scaleX(-1)';
      case 'bottom-left':
        return 'scaleY(-1)';
      case 'bottom-right':
        return 'scale(-1, -1)';
      default:
        return 'none';
    }
  };

  // BANNER / DIVIDER RENDERING
  if (position === 'banner-top' || position === 'banner-bottom' || position === 'divider') {
    const isBottom = position === 'banner-bottom';
    let bannerSvg = '';

    switch (effectiveFrame) {
      case 'botanical-floral':
        bannerSvg = `
          <svg viewBox="0 0 800 60" fill="none" class="w-full max-w-4xl h-auto opacity-90 ${isBottom ? 'rotate-180' : ''}">
            <path d="M40 30 Q 200 15, 400 30 Q 600 45, 760 30" stroke="${goldColor}" stroke-width="1.5" stroke-linecap="round" />
            <!-- Left Vines & Leaves -->
            <path d="M 120 25 C 105 10, 90 16, 102 28 C 114 28, 126 25, 120 25 Z" fill="${leafColor}" opacity="0.9" />
            <path d="M 200 22 C 185 10, 170 16, 182 28 C 194 28, 206 25, 200 22 Z" fill="${blushColor}" opacity="0.9" />
            <path d="M 280 28 C 265 18, 250 24, 262 34 C 274 34, 286 31, 280 28 Z" fill="${leafColor}" opacity="0.9" />
            <!-- Right Vines & Leaves -->
            <path d="M 680 25 C 695 10, 710 16, 698 28 C 686 28, 674 25, 680 25 Z" fill="${leafColor}" opacity="0.9" />
            <path d="M 600 22 C 615 10, 630 16, 618 28 C 606 28, 594 25, 600 22 Z" fill="${blushColor}" opacity="0.9" />
            <path d="M 520 28 C 535 18, 550 24, 538 34 C 526 34, 514 31, 520 28 Z" fill="${leafColor}" opacity="0.9" />
            <!-- Center Rosette -->
            <g transform="translate(400, 30)">
              <circle cx="0" cy="0" r="5.5" fill="${goldColor}" />
              ${[0, 45, 90, 135, 180, 225, 270, 315]
                .map(
                  (ang) =>
                    `<path d="M0 0 C -5 -13, 5 -13, 0 0" fill="${blushColor}" stroke="${goldColor}" stroke-width="0.8" transform="rotate(${ang})" />`
                )
                .join('')}
              <circle cx="0" cy="0" r="2.5" fill="${primaryColor}" />
            </g>
          </svg>`;
        break;

      case 'modern-minimalist':
        bannerSvg = `
          <svg viewBox="0 0 800 50" fill="none" class="w-full max-w-4xl h-auto opacity-85 ${isBottom ? 'rotate-180' : ''}">
            <line x1="60" y1="25" x2="360" y2="25" stroke="${goldColor}" stroke-width="1.5" />
            <line x1="120" y1="21" x2="340" y2="21" stroke="${goldColor}" stroke-width="0.75" stroke-opacity="0.6" />
            <line x1="440" y1="25" x2="740" y2="25" stroke="${goldColor}" stroke-width="1.5" />
            <line x1="460" y1="21" x2="680" y2="21" stroke="${goldColor}" stroke-width="0.75" stroke-opacity="0.6" />
            <!-- Center Modern Diamond Emblem -->
            <g transform="translate(400, 25)">
              <polygon points="0,-12 12,0 0,12 -12,0" stroke="${goldColor}" stroke-width="1.5" fill="none" />
              <polygon points="0,-6 6,0 0,6 -6,0" fill="${goldColor}" />
            </g>
            <circle cx="200" cy="25" r="2" fill="${goldColor}" />
            <circle cx="600" cy="25" r="2" fill="${goldColor}" />
          </svg>`;
        break;

      case 'classic-arch':
        bannerSvg = `
          <svg viewBox="0 0 800 60" fill="none" class="w-full max-w-4xl h-auto opacity-90 ${isBottom ? 'rotate-180' : ''}">
            <path d="M 60 30 L 360 30 M 440 30 L 740 30" stroke="${goldColor}" stroke-width="1.5" />
            <path d="M 100 24 L 350 24 M 450 24 L 700 24" stroke="${goldColor}" stroke-width="0.75" stroke-dasharray="3 3" />
            <g transform="translate(400, 30)">
              <circle cx="0" cy="0" r="14" stroke="${goldColor}" stroke-width="1.5" fill="none" />
              <circle cx="0" cy="0" r="9" stroke="${goldColor}" stroke-width="0.8" stroke-dasharray="2 2" fill="none" />
              <polygon points="0,-5 5,0 0,5 -5,0" fill="${goldColor}" />
            </g>
          </svg>`;
        break;

      case 'romantic-lace':
        bannerSvg = `
          <svg viewBox="0 0 800 60" fill="none" class="w-full max-w-4xl h-auto opacity-90 ${isBottom ? 'rotate-180' : ''}">
            <path d="M 50 30 Q 150 15, 250 30 Q 350 45, 400 30 Q 450 15, 550 30 Q 650 45, 750 30" stroke="${goldColor}" stroke-width="1.5" />
            <path d="M 80 30 Q 150 20, 220 30 Q 290 40, 360 30" stroke="${blushColor}" stroke-width="0.8" stroke-dasharray="2 2" />
            <path d="M 440 30 Q 510 20, 580 30 Q 650 40, 720 30" stroke="${blushColor}" stroke-width="0.8" stroke-dasharray="2 2" />
            <!-- Sweetheart Center Filigree -->
            <g transform="translate(400, 26) scale(0.9)">
              <path d="M0,4 C-4,-4 -12,-2 -12,4 C-12,12 0,18 0,20 C0,18 12,12 12,4 C12,-2 4,-4 0,4 Z" fill="${blushColor}" fill-opacity="0.8" stroke="${goldColor}" stroke-width="1" />
              <circle cx="0" cy="8" r="2" fill="${lightGold}" />
            </g>
          </svg>`;
        break;

      case 'contemporary-geo':
        bannerSvg = `
          <svg viewBox="0 0 800 50" fill="none" class="w-full max-w-4xl h-auto opacity-90 ${isBottom ? 'rotate-180' : ''}">
            <path d="M 50 25 L 360 25 M 440 25 L 750 25" stroke="${goldColor}" stroke-width="2" />
            <path d="M 80 18 L 350 18 M 450 18 L 720 18" stroke="${goldColor}" stroke-width="1" />
            <!-- Art Deco Center Stepped Sunburst -->
            <g transform="translate(400, 25)">
              <polygon points="0,-16 16,0 0,16 -16,0" fill="${goldColor}" />
              <polygon points="0,-10 10,0 0,10 -10,0" fill="${primaryColor}" />
              <polygon points="0,-5 5,0 0,5 -5,0" fill="${lightGold}" />
            </g>
          </svg>`;
        break;

      case 'habesha-heritage':
        bannerSvg = `
          <svg viewBox="0 0 800 60" fill="none" class="w-full max-w-4xl h-auto opacity-90 ${isBottom ? 'rotate-180' : ''}">
            <path d="M 50 30 L 350 30 M 450 30 L 750 30" stroke="${goldColor}" stroke-width="1.8" />
            <path d="M 60 24 L 340 24 M 460 24 L 740 24" stroke="${goldColor}" stroke-width="0.8" stroke-dasharray="4 2" />
            <!-- Ethiopian Cross Central Emblem -->
            <g transform="translate(400, 30) scale(0.9)">
              <path d="M -3 -14 L 3 -14 L 3 -3 L 14 -3 L 14 3 L 3 3 L 3 14 L -3 14 L -3 3 L -14 3 L -14 -3 L -3 -3 Z" fill="${goldColor}" stroke="${primaryColor}" stroke-width="0.8" />
              <circle cx="0" cy="0" r="2.5" fill="${primaryColor}" />
            </g>
            <!-- Tibeb Accent Diamonds -->
            <polygon points="200,26 204,30 200,34 196,30" fill="${primaryColor}" stroke="${goldColor}" stroke-width="0.8" />
            <polygon points="600,26 604,30 600,34 596,30" fill="${primaryColor}" stroke="${goldColor}" stroke-width="0.8" />
          </svg>`;
        break;

      case 'celestial-sparkle':
        bannerSvg = `
          <svg viewBox="0 0 800 60" fill="none" class="w-full max-w-4xl h-auto opacity-90 ${isBottom ? 'rotate-180' : ''}">
            <path d="M 60 30 L 360 30 M 440 30 L 740 30" stroke="${goldColor}" stroke-width="1.2" stroke-dasharray="5 3" />
            <circle cx="150" cy="30" r="2" fill="${goldColor}" />
            <circle cx="250" cy="30" r="3" fill="${lightGold}" />
            <circle cx="550" cy="30" r="3" fill="${lightGold}" />
            <circle cx="650" cy="30" r="2" fill="${goldColor}" />
            <!-- Center 8-Point Cosmic Star -->
            <g transform="translate(400, 30)">
              <path d="M 0 -16 Q 0 0 -16 0 Q 0 0 0 16 Q 0 0 16 0 Q 0 0 0 -16 Z" fill="${goldColor}" />
              <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
            </g>
          </svg>`;
        break;

      case 'royal-luxury':
      default:
        bannerSvg = `
          <svg viewBox="0 0 800 60" fill="none" class="w-full max-w-4xl h-auto opacity-90 ${isBottom ? 'rotate-180' : ''}">
            <path d="M 50 30 Q 200 15, 400 30 Q 600 45, 750 30" stroke="${goldColor}" stroke-width="1.8" stroke-linecap="round" />
            <path d="M 120 25 C 105 12, 90 18, 105 28 C 120 28, 130 25, 120 25 Z" fill="${blushColor}" opacity="0.9" />
            <path d="M 680 25 C 695 12, 710 18, 695 28 C 680 28, 670 25, 680 25 Z" fill="${blushColor}" opacity="0.9" />
            <!-- Royal Crown Crest Medallion -->
            <g transform="translate(400, 24) scale(0.95)">
              <path d="M-16,12 L-12,-6 L-5,2 L0,-12 L5,2 L12,-6 L16,12 Z" fill="${goldColor}" stroke="${primaryColor}" stroke-width="0.8" />
              <rect x="-16" y="12" width="32" height="4" rx="1" fill="${lightGold}" />
              <circle cx="0" cy="-14" r="2" fill="${lightGold}" />
              <circle cx="-12" cy="-8" r="1.5" fill="${blushColor}" />
              <circle cx="12" cy="-8" r="1.5" fill="${blushColor}" />
            </g>
          </svg>`;
        break;
    }

    return `<div class="w-full overflow-hidden pointer-events-none flex justify-center py-2 ${className}">${bannerSvg}</div>`;
  }

  // CORNER SVG RENDERING
  let cornerSvg = '';

  switch (effectiveFrame) {
    case 'botanical-floral':
      cornerSvg = `
        <svg width="150" height="150" viewBox="0 0 150 150" fill="none" class="w-24 h-24 sm:w-36 sm:h-36 drop-shadow-sm">
          <path d="M 10 140 C 10 65, 65 10, 140 10" stroke="${goldColor}" stroke-width="2" stroke-linecap="round" />
          <path d="M 18 140 C 18 73, 73 18, 140 18" stroke="${leafColor}" stroke-width="1" stroke-dasharray="3 3" />
          <!-- Rose Bouquet Cluster -->
          <g transform="translate(48, 48)">
            <circle cx="0" cy="0" r="6" fill="${lightGold}" />
            ${[0, 60, 120, 180, 240, 300]
              .map(
                (angle) =>
                  `<path d="M0 0 C -7 -16, 7 -16, 0 0" fill="${blushColor}" stroke="${goldColor}" stroke-width="0.8" transform="rotate(${angle})" />`
              )
              .join('')}
            <circle cx="0" cy="0" r="2.5" fill="${primaryColor}" />
          </g>
          <!-- Flowing Botanical Leaves -->
          <path d="M 25 90 C 10 75, 2 85, 15 98 C 28 98, 32 94, 25 90 Z" fill="${leafColor}" opacity="0.9" />
          <path d="M 90 25 C 75 10, 85 2, 98 15 C 98 28, 94 32, 90 25 Z" fill="${leafColor}" opacity="0.9" />
          <path d="M 36 116 C 22 106, 16 114, 26 124 Z" fill="${blushColor}" opacity="0.85" />
          <path d="M 116 36 C 106 22, 114 16, 124 26 Z" fill="${blushColor}" opacity="0.85" />
        </svg>`;
      break;

    case 'modern-minimalist':
      cornerSvg = `
        <svg width="150" height="150" viewBox="0 0 150 150" fill="none" class="w-24 h-24 sm:w-36 sm:h-36 drop-shadow-sm">
          <!-- Floating Outer Precision Hairlines -->
          <path d="M 32 10 L 140 10" stroke="${goldColor}" stroke-width="1.8" stroke-linecap="round" />
          <path d="M 10 32 L 10 140" stroke="${goldColor}" stroke-width="1.8" stroke-linecap="round" />
          <!-- Inner Offset Border -->
          <path d="M 22 140 L 22 22 L 140 22" stroke="${goldColor}" stroke-width="0.75" stroke-opacity="0.6" />
          <!-- Sleek Corner Chamfer Notch with Floating Diamond Point -->
          <line x1="10" y1="32" x2="32" y2="10" stroke="${goldColor}" stroke-width="1.8" />
          <polygon points="21,13 29,21 21,29 13,21" fill="${goldColor}" />
          <circle cx="21" cy="21" r="1.5" fill="#FFFFFF" />
          <circle cx="50" cy="10" r="1.5" fill="${goldColor}" />
          <circle cx="10" cy="50" r="1.5" fill="${goldColor}" />
        </svg>`;
      break;

    case 'classic-arch':
      cornerSvg = `
        <svg width="150" height="150" viewBox="0 0 150 150" fill="none" class="w-24 h-24 sm:w-36 sm:h-36 drop-shadow-sm">
          <!-- Architectural Arch Curve & Fluting -->
          <path d="M 12 140 L 12 50 C 12 28, 28 12, 50 12 L 140 12" stroke="${goldColor}" stroke-width="2" />
          <path d="M 20 140 L 20 54 C 20 34, 34 20, 54 20 L 140 20" stroke="${goldColor}" stroke-width="0.8" stroke-dasharray="2 2" />
          <!-- Neoclassical Rosette Corner Medallion -->
          <g transform="translate(34, 34)">
            <circle cx="0" cy="0" r="10" fill="${primaryColor}" stroke="${goldColor}" stroke-width="1" />
            <polygon points="0,-6 6,0 0,6 -6,0" fill="${goldColor}" />
            <circle cx="0" cy="0" r="2" fill="#FFFFFF" />
          </g>
          <circle cx="12" cy="50" r="2.5" fill="${goldColor}" />
          <circle cx="50" cy="12" r="2.5" fill="${goldColor}" />
        </svg>`;
      break;

    case 'romantic-lace':
      cornerSvg = `
        <svg width="150" height="150" viewBox="0 0 150 150" fill="none" class="w-24 h-24 sm:w-36 sm:h-36 drop-shadow-sm">
          <!-- Scalloped Lace Contour -->
          <path d="M 12 140 C 12 60, 60 12, 140 12" stroke="${goldColor}" stroke-width="1.8" />
          <path d="M 22 140 C 22 70, 70 22, 140 22" stroke="${blushColor}" stroke-width="1" stroke-dasharray="3 2" />
          <!-- Delicate Heart Filigree Emblem -->
          <g transform="translate(36, 36) scale(0.95)">
            <path d="M0,4 C-5,-6 -14,-4 -14,4 C-14,14 0,22 0,24 C0,22 14,14 14,4 C14,-4 5,-6 0,4 Z" fill="${blushColor}" fill-opacity="0.85" stroke="${goldColor}" stroke-width="1.2" />
            <circle cx="0" cy="9" r="2.5" fill="${lightGold}" />
          </g>
          <!-- Scalloped Beads -->
          <circle cx="18" cy="80" r="2.5" fill="${goldColor}" />
          <circle cx="80" cy="18" r="2.5" fill="${goldColor}" />
          <circle cx="20" cy="115" r="2" fill="${blushColor}" />
          <circle cx="115" cy="20" r="2" fill="${blushColor}" />
        </svg>`;
      break;

    case 'contemporary-geo':
      cornerSvg = `
        <svg width="150" height="150" viewBox="0 0 150 150" fill="none" class="w-24 h-24 sm:w-36 sm:h-36 drop-shadow-sm">
          <!-- 1920s Gatsby Stepped Chevron Corner -->
          <path d="M 10 140 L 10 42 L 24 42 L 24 24 L 42 24 L 42 10 L 140 10" stroke="${goldColor}" stroke-width="2.2" />
          <path d="M 20 130 L 20 52 L 34 52 L 34 34 L 52 34 L 52 20 L 130 20" stroke="${goldColor}" stroke-width="1" stroke-dasharray="3 2" />
          <!-- Radiating Gold Ray Fans -->
          <g transform="translate(38, 38)">
            <polygon points="0,-12 12,0 0,12 -12,0" fill="${goldColor}" />
            <polygon points="0,-6 6,0 0,6 -6,0" fill="${primaryColor}" />
            <circle cx="0" cy="0" r="1.5" fill="${lightGold}" />
          </g>
          <line x1="10" y1="10" x2="38" y2="38" stroke="${goldColor}" stroke-width="1.8" />
        </svg>`;
      break;

    case 'habesha-heritage':
      cornerSvg = `
        <svg width="150" height="150" viewBox="0 0 150 150" fill="none" class="w-24 h-24 sm:w-36 sm:h-36 drop-shadow-sm">
          <!-- Hand-Braided Double Border -->
          <path d="M 12 140 L 12 12 L 140 12" stroke="${goldColor}" stroke-width="2" />
          <path d="M 20 140 L 20 20 L 140 20" stroke="${primaryColor}" stroke-width="1.2" stroke-dasharray="4 2" />
          <!-- Traditional Ethiopian Cross (Meskel) Medallion -->
          <g transform="translate(38, 38) scale(1.1)">
            <path d="M -4 -16 L 4 -16 L 4 -4 L 16 -4 L 16 4 L 4 4 L 4 16 L -4 16 L -4 4 L -16 4 L -16 -4 L -4 -4 Z" fill="${goldColor}" stroke="${primaryColor}" stroke-width="1" />
            <circle cx="0" cy="0" r="3" fill="${primaryColor}" />
            <circle cx="0" cy="0" r="1" fill="#FFFFFF" />
          </g>
          <!-- Tibeb Diamond Accents -->
          <polygon points="12,70 16,74 12,78 8,74" fill="${primaryColor}" stroke="${goldColor}" stroke-width="0.8" />
          <polygon points="70,12 74,16 78,12 74,8" fill="${primaryColor}" stroke="${goldColor}" stroke-width="0.8" />
        </svg>`;
      break;

    case 'celestial-sparkle':
      cornerSvg = `
        <svg width="150" height="150" viewBox="0 0 150 150" fill="none" class="w-24 h-24 sm:w-36 sm:h-36 drop-shadow-sm">
          <path d="M 12 140 C 12 60, 60 12, 140 12" stroke="${goldColor}" stroke-width="1.4" stroke-dasharray="4 3" />
          <!-- Majestic 4-Point Astral Starburst -->
          <g transform="translate(36, 36)">
            <path d="M 0 -18 Q 0 0 -18 0 Q 0 0 0 18 Q 0 0 18 0 Q 0 0 0 -18 Z" fill="${goldColor}" />
            <circle cx="0" cy="0" r="3.5" fill="#FFFFFF" />
          </g>
          <!-- Orbiting Satellite Stars -->
          <g transform="translate(85, 22) scale(0.65)">
            <path d="M 0 -12 Q 0 0 -12 0 Q 0 0 0 12 Q 0 0 12 0 Q 0 0 0 -12 Z" fill="${lightGold}" />
          </g>
          <g transform="translate(22, 85) scale(0.65)">
            <path d="M 0 -12 Q 0 0 -12 0 Q 0 0 0 12 Q 0 0 12 0 Q 0 0 0 -12 Z" fill="${lightGold}" />
          </g>
          <circle cx="115" cy="35" r="2" fill="${goldColor}" />
          <circle cx="35" cy="115" r="2" fill="${goldColor}" />
        </svg>`;
      break;

    case 'royal-luxury':
    default:
      cornerSvg = `
        <svg width="150" height="150" viewBox="0 0 150 150" fill="none" class="w-24 h-24 sm:w-36 sm:h-36 drop-shadow-sm">
          <!-- Imperial Baroque Double Curve Frame -->
          <path d="M 12 140 C 12 60, 60 12, 140 12" stroke="${goldColor}" stroke-width="2.2" stroke-linecap="round" />
          <path d="M 22 140 C 22 72, 72 22, 140 22" stroke="${blushColor}" stroke-width="1" stroke-dasharray="3 3" />
          <!-- Royal Baroque Acanthus Leaf & Crown Crest -->
          <g transform="translate(38, 38) scale(1.05)">
            <path d="M-15,10 L-12,-6 L-5,1 L0,-12 L5,1 L12,-6 L15,10 Z" fill="${goldColor}" stroke="${primaryColor}" stroke-width="0.8" />
            <rect x="-15" y="10" width="30" height="4" rx="1" fill="${lightGold}" />
            <circle cx="0" cy="-14" r="2" fill="${lightGold}" />
            <circle cx="-12" cy="-8" r="1.5" fill="${blushColor}" />
            <circle cx="12" cy="-8" r="1.5" fill="${blushColor}" />
          </g>
          <!-- Flourish Tendril Nodes -->
          <path d="M 28 92 C 16 80, 6 86, 18 98 C 30 98, 36 94, 28 92 Z" fill="${blushColor}" opacity="0.9" />
          <path d="M 92 28 C 80 16, 86 6, 98 18 C 98 30, 94 36, 92 28 Z" fill="${blushColor}" opacity="0.9" />
          <circle cx="12" cy="120" r="2" fill="${goldColor}" />
          <circle cx="120" cy="12" r="2" fill="${goldColor}" />
        </svg>`;
      break;
  }

  return `<div class="pointer-events-none select-none ${className}" style="transform: ${getTransform()}">${cornerSvg}</div>`;
}

export const BotanicalFrame: React.FC<BotanicalFrameProps> = ({
  className = '',
  position = 'top-left',
  themeId = 'bordeaux',
  frameStyle
}: BotanicalFrameProps) => {
  const html = getBotanicalFrameHtml(position, themeId, frameStyle, className);
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};
