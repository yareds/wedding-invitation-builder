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

  const getCornerInnerSvg = (innerContent: string) => {
    const groupTransform =
      position === 'top-right'
        ? 'transform="translate(150, 0) scale(-1, 1)"'
        : position === 'bottom-left'
        ? 'transform="translate(0, 150) scale(1, -1)"'
        : position === 'bottom-right'
        ? 'transform="translate(150, 150) scale(-1, -1)"'
        : '';

    return `
      <svg width="150" height="150" viewBox="0 0 150 150" fill="none" class="w-24 h-24 sm:w-36 sm:h-36 drop-shadow-sm">
        <g ${groupTransform}>
          ${innerContent}
        </g>
      </svg>
    `;
  };

  // BANNER / DIVIDER RENDERING
  if (position === 'banner-top' || position === 'banner-bottom' || position === 'divider') {
    const isBottom = position === 'banner-bottom';
    let bannerSvg = '';

    switch (effectiveFrame) {
      case 'botanical-floral':
        bannerSvg = `
          <svg viewBox="0 0 800 50" fill="none" class="w-full max-w-4xl h-auto opacity-90 ${isBottom ? 'rotate-180' : ''}">
            <path d="M 60 25 L 340 25 M 460 25 L 740 25" stroke="${goldColor}" stroke-width="2" stroke-linecap="round" />
            <!-- Left Botanical Line Sprig -->
            <path d="M 220 25 C 240 14, 270 14, 290 25" stroke="${goldColor}" stroke-width="1.8" stroke-linecap="round" />
            <path d="M 255 18 C 248 10, 260 8, 265 15 Z" fill="${leafColor}" />
            <path d="M 275 19 C 270 11, 282 9, 287 16 Z" fill="${blushColor}" />
            <!-- Right Botanical Line Sprig -->
            <path d="M 580 25 C 560 14, 530 14, 510 25" stroke="${goldColor}" stroke-width="1.8" stroke-linecap="round" />
            <path d="M 545 18 C 552 10, 540 8, 535 15 Z" fill="${leafColor}" />
            <path d="M 525 19 C 530 11, 518 9, 513 16 Z" fill="${blushColor}" />
            <!-- Center Minimal Botanical Leaf Medallion -->
            <g transform="translate(400, 25)">
              <circle cx="0" cy="0" r="4.5" fill="${goldColor}" />
              <path d="M -12 0 C -6 -10, 6 -10, 12 0 C 6 10, -6 10, -12 0 Z" fill="${leafColor}" opacity="0.85" />
              <circle cx="0" cy="0" r="2" fill="${primaryColor}" />
            </g>
          </svg>`;
        break;

      case 'modern-minimalist':
        bannerSvg = `
          <svg viewBox="0 0 800 50" fill="none" class="w-full max-w-4xl h-auto opacity-85 ${isBottom ? 'rotate-180' : ''}">
            <line x1="60" y1="25" x2="360" y2="25" stroke="${goldColor}" stroke-width="2" stroke-linecap="square" />
            <line x1="440" y1="25" x2="740" y2="25" stroke="${goldColor}" stroke-width="2" stroke-linecap="square" />
            <!-- Center Modern Diamond Emblem -->
            <g transform="translate(400, 25)">
              <polygon points="0,-12 12,0 0,12 -12,0" stroke="${goldColor}" stroke-width="2" fill="none" />
              <polygon points="0,-6 6,0 0,6 -6,0" fill="${goldColor}" />
            </g>
            <circle cx="200" cy="25" r="2.5" fill="${goldColor}" />
            <circle cx="600" cy="25" r="2.5" fill="${goldColor}" />
          </svg>`;
        break;

      case 'classic-arch':
        bannerSvg = `
          <svg viewBox="0 0 800 50" fill="none" class="w-full max-w-4xl h-auto opacity-90 ${isBottom ? 'rotate-180' : ''}">
            <path d="M 60 25 L 360 25 M 440 25 L 740 25" stroke="${goldColor}" stroke-width="2" stroke-linecap="round" />
            <line x1="120" y1="20" x2="340" y2="20" stroke="${goldColor}" stroke-width="0.8" stroke-opacity="0.6" />
            <line x1="460" y1="20" x2="680" y2="20" stroke="${goldColor}" stroke-width="0.8" stroke-opacity="0.6" />
            <g transform="translate(400, 25)">
              <circle cx="0" cy="0" r="12" stroke="${goldColor}" stroke-width="1.8" fill="none" />
              <polygon points="0,-6 6,0 0,6 -6,0" fill="${goldColor}" />
            </g>
          </svg>`;
        break;

      case 'romantic-lace':
        bannerSvg = `
          <svg viewBox="0 0 800 50" fill="none" class="w-full max-w-4xl h-auto opacity-90 ${isBottom ? 'rotate-180' : ''}">
            <path d="M 60 25 Q 200 12, 350 25 M 450 25 Q 600 38, 740 25" stroke="${goldColor}" stroke-width="2" stroke-linecap="round" />
            <!-- Sweetheart Center Filigree -->
            <g transform="translate(400, 22) scale(0.9)">
              <path d="M0,2 C-4,-5 -12,-3 -12,3 C-12,10 0,16 0,18 C0,16 12,10 12,3 C12,-3 4,-5 0,2 Z" fill="${blushColor}" fill-opacity="0.85" stroke="${goldColor}" stroke-width="1.2" />
              <circle cx="0" cy="7" r="2" fill="${lightGold}" />
            </g>
          </svg>`;
        break;

      case 'contemporary-geo':
        bannerSvg = `
          <svg viewBox="0 0 800 50" fill="none" class="w-full max-w-4xl h-auto opacity-90 ${isBottom ? 'rotate-180' : ''}">
            <path d="M 50 25 L 360 25 M 440 25 L 750 25" stroke="${goldColor}" stroke-width="2.5" stroke-linecap="square" />
            <path d="M 120 18 L 340 18 M 460 18 L 680 18" stroke="${goldColor}" stroke-width="1" stroke-opacity="0.7" />
            <!-- Art Deco Center Stepped Sunburst -->
            <g transform="translate(400, 25)">
              <polygon points="0,-14 14,0 0,14 -14,0" stroke="${goldColor}" stroke-width="2" fill="none" />
              <polygon points="0,-7 7,0 0,7 -7,0" fill="${goldColor}" />
            </g>
          </svg>`;
        break;

      case 'habesha-heritage':
        bannerSvg = `
          <svg viewBox="0 0 800 50" fill="none" class="w-full max-w-4xl h-auto opacity-90 ${isBottom ? 'rotate-180' : ''}">
            <path d="M 50 25 L 350 25 M 450 25 L 750 25" stroke="${goldColor}" stroke-width="2" stroke-linecap="round" />
            <!-- Ethiopian Cross Central Emblem -->
            <g transform="translate(400, 25) scale(0.9)">
              <path d="M -3 -12 L 3 -12 L 3 -3 L 12 -3 L 12 3 L 3 3 L 3 12 L -3 12 L -3 3 L -12 3 L -12 -3 L -3 -3 Z" fill="${goldColor}" stroke="${primaryColor}" stroke-width="0.8" />
              <circle cx="0" cy="0" r="2" fill="${primaryColor}" />
            </g>
            <!-- Tibeb Accent Diamonds -->
            <polygon points="200,22 204,25 200,28 196,25" fill="${primaryColor}" stroke="${goldColor}" stroke-width="1" />
            <polygon points="600,22 604,25 600,28 596,25" fill="${primaryColor}" stroke="${goldColor}" stroke-width="1" />
          </svg>`;
        break;

      case 'celestial-sparkle':
        bannerSvg = `
          <svg viewBox="0 0 800 50" fill="none" class="w-full max-w-4xl h-auto opacity-90 ${isBottom ? 'rotate-180' : ''}">
            <path d="M 60 25 L 360 25 M 440 25 L 740 25" stroke="${goldColor}" stroke-width="1.8" stroke-linecap="round" />
            <circle cx="200" cy="25" r="2.5" fill="${lightGold}" />
            <circle cx="600" cy="25" r="2.5" fill="${lightGold}" />
            <!-- Center 4-Point Cosmic Star -->
            <g transform="translate(400, 25)">
              <path d="M 0 -14 Q 0 0 -14 0 Q 0 0 0 14 Q 0 0 14 0 Q 0 0 0 -14 Z" fill="${goldColor}" />
              <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />
            </g>
          </svg>`;
        break;

      case 'minimalist-horizon':
        bannerSvg = `
          <svg viewBox="0 0 800 50" fill="none" class="w-full max-w-4xl h-auto opacity-85 ${isBottom ? 'rotate-180' : ''}">
            <line x1="40" y1="25" x2="350" y2="25" stroke="${goldColor}" stroke-width="2.5" stroke-linecap="square" />
            <line x1="450" y1="25" x2="760" y2="25" stroke="${goldColor}" stroke-width="2.5" stroke-linecap="square" />
            <line x1="100" y1="18" x2="330" y2="18" stroke="${goldColor}" stroke-width="1" stroke-opacity="0.7" />
            <line x1="470" y1="18" x2="700" y2="18" stroke="${goldColor}" stroke-width="1" stroke-opacity="0.7" />
            <!-- Center Precision Compass Reticle -->
            <g transform="translate(400, 25)">
              <rect x="-8" y="-8" width="16" height="16" stroke="${goldColor}" stroke-width="1.8" fill="none" transform="rotate(45)" />
              <circle cx="0" cy="0" r="3" fill="${goldColor}" />
            </g>
            <circle cx="200" cy="25" r="2" fill="${goldColor}" />
            <circle cx="600" cy="25" r="2" fill="${goldColor}" />
          </svg>`;
        break;

      case 'contemporary-prism':
        bannerSvg = `
          <svg viewBox="0 0 800 50" fill="none" class="w-full max-w-4xl h-auto opacity-90 ${isBottom ? 'rotate-180' : ''}">
            <path d="M 50 25 L 350 25 M 450 25 L 750 25" stroke="${goldColor}" stroke-width="2.5" stroke-linecap="square" />
            <path d="M 120 18 L 330 18 M 470 18 L 680 18" stroke="${goldColor}" stroke-width="1" stroke-opacity="0.8" />
            <!-- Chamfered Prism Center Crest -->
            <g transform="translate(400, 25)">
              <polygon points="0,-12 12,0 0,12 -12,0" fill="${primaryColor}" stroke="${goldColor}" stroke-width="1.8" />
              <polygon points="0,-6 6,0 0,6 -6,0" fill="${goldColor}" />
            </g>
          </svg>`;
        break;

      case 'heritage-knotwork':
        bannerSvg = `
          <svg viewBox="0 0 800 50" fill="none" class="w-full max-w-4xl h-auto opacity-90 ${isBottom ? 'rotate-180' : ''}">
            <path d="M 50 25 L 350 25 M 450 25 L 750 25" stroke="${goldColor}" stroke-width="2.5" stroke-linecap="square" />
            <!-- Meander Fretwork Accent Nodes -->
            <path d="M 220 20 L 240 20 L 240 30 L 230 30 L 230 25 L 235 25" stroke="${goldColor}" stroke-width="1.5" fill="none" />
            <path d="M 580 20 L 560 20 L 560 30 L 570 30 L 570 25 L 565 25" stroke="${goldColor}" stroke-width="1.5" fill="none" />
            <!-- Center Royal Solar Medallion -->
            <g transform="translate(400, 25)">
              <circle cx="0" cy="0" r="11" fill="${goldColor}" stroke="${primaryColor}" stroke-width="1.2" />
              <circle cx="0" cy="0" r="6" fill="none" stroke="#FAF4F6" stroke-width="1" />
              <polygon points="0,-3 3,0 0,3 -3,0" fill="#FAF4F6" />
            </g>
          </svg>`;
        break;

      case 'celestial-lunar':
        bannerSvg = `
          <svg viewBox="0 0 800 50" fill="none" class="w-full max-w-4xl h-auto opacity-90 ${isBottom ? 'rotate-180' : ''}">
            <path d="M 50 25 L 350 25 M 450 25 L 750 25" stroke="${goldColor}" stroke-width="1.8" stroke-linecap="round" />
            <!-- Center Lunar Crescent & Eclipse Orbit -->
            <g transform="translate(400, 25)">
              <path d="M 0 -12 A 12 12 0 1 0 0 12 A 9 9 0 1 1 0 -12 Z" fill="${goldColor}" />
              <circle cx="3" cy="0" r="4.5" fill="${primaryColor}" stroke="${goldColor}" stroke-width="1" />
              <circle cx="3" cy="0" r="1.5" fill="#FFFFFF" />
            </g>
            <circle cx="200" cy="25" r="2.5" fill="${lightGold}" />
            <circle cx="600" cy="25" r="2.5" fill="${lightGold}" />
          </svg>`;
        break;

      case 'luxury-sovereign':
        bannerSvg = `
          <svg viewBox="0 0 800 50" fill="none" class="w-full max-w-4xl h-auto opacity-90 ${isBottom ? 'rotate-180' : ''}">
            <line x1="40" y1="25" x2="340" y2="25" stroke="${goldColor}" stroke-width="2.8" stroke-linecap="square" />
            <line x1="460" y1="25" x2="760" y2="25" stroke="${goldColor}" stroke-width="2.8" stroke-linecap="square" />
            <line x1="120" y1="18" x2="330" y2="18" stroke="${goldColor}" stroke-width="1.2" stroke-opacity="0.8" />
            <line x1="470" y1="18" x2="680" y2="18" stroke="${goldColor}" stroke-width="1.2" stroke-opacity="0.8" />
            <!-- Sovereign Pavilion Crown & Diamond Medallion -->
            <g transform="translate(400, 24)">
              <polygon points="0,-14 12,0 0,8 -12,0" fill="${goldColor}" stroke="${primaryColor}" stroke-width="1" />
              <polygon points="0,-18 5,-13 -5,-13" fill="${goldColor}" />
              <circle cx="0" cy="-2" r="2.5" fill="#FFF8E7" />
            </g>
            <!-- Flanking Diamond Studs -->
            <polygon points="200,21 204,25 200,29 196,25" fill="${goldColor}" />
            <polygon points="600,21 604,25 600,29 596,25" fill="${goldColor}" />
          </svg>`;
        break;

      case 'floral-garland':
        bannerSvg = `
          <svg viewBox="0 0 800 50" fill="none" class="w-full max-w-4xl h-auto opacity-90 ${isBottom ? 'rotate-180' : ''}">
            <path d="M 60 25 Q 220 30 350 25 M 450 25 Q 580 30 740 25" stroke="${goldColor}" stroke-width="2" stroke-linecap="round" />
            <!-- Hanging Leaf Silhouettes -->
            <path d="M 220 27 C 215 35, 225 38, 230 30 Z" fill="${leafColor}" />
            <path d="M 280 26 C 275 34, 285 36, 290 28 Z" fill="${leafColor}" />
            <path d="M 580 27 C 585 35, 575 38, 570 30 Z" fill="${leafColor}" />
            <path d="M 520 26 C 525 34, 515 36, 510 28 Z" fill="${leafColor}" />
            <!-- Center Sculptural Blooming Magnolia -->
            <g transform="translate(400, 25)">
              <path d="M 0 -12 C -8 -16, -12 -5, 0 4 C 12 -5, 8 -16, 0 -12 Z" fill="${blushColor}" stroke="${goldColor}" stroke-width="1" />
              <path d="M -3 -8 C -12 -10, -14 0, -4 4 Z" fill="${blushColor}" />
              <path d="M 3 -8 C 12 -10, 14 0, 4 4 Z" fill="${blushColor}" />
              <circle cx="0" cy="-3" r="3" fill="${goldColor}" />
              <circle cx="0" cy="-3" r="1.2" fill="#FFFFFF" />
            </g>
          </svg>`;
        break;

      case 'romantic-ribbon':
        bannerSvg = `
          <svg viewBox="0 0 800 50" fill="none" class="w-full max-w-4xl h-auto opacity-90 ${isBottom ? 'rotate-180' : ''}">
            <path d="M 50 25 C 160 18, 250 32, 350 25 M 450 25 C 550 32, 640 18, 750 25" stroke="${blushColor}" stroke-width="2.2" stroke-linecap="round" />
            <path d="M 120 25 C 200 20, 270 30, 340 25 M 460 25 C 530 30, 600 20, 680 25" stroke="${goldColor}" stroke-width="1" stroke-opacity="0.75" />
            <!-- Central Interlocking Infinity Ribbon Loop -->
            <g transform="translate(400, 25)">
              <path d="M 0 0 C -7 -8, -14 -8, -14 0 C -14 8, -7 8, 0 0" stroke="${blushColor}" stroke-width="2.4" stroke-linecap="round" fill="none" />
              <path d="M 0 0 C 7 8, 14 8, 14 0 C 14 -8, 7 -8, 0 0" stroke="${blushColor}" stroke-width="2.4" stroke-linecap="round" fill="none" />
              <circle cx="0" cy="0" r="3.5" fill="${goldColor}" stroke="#FFF" stroke-width="0.8" />
              <path d="M 0 4 C -2 6, -2.5 9, 0 11 C 2.5 9, 2 6, 0 4 Z" fill="${goldColor}" />
            </g>
          </svg>`;
        break;

      case 'classic-pediment':
        bannerSvg = `
          <svg viewBox="0 0 800 50" fill="none" class="w-full max-w-4xl h-auto opacity-90 ${isBottom ? 'rotate-180' : ''}">
            <line x1="40" y1="28" x2="760" y2="28" stroke="${goldColor}" stroke-width="2.5" stroke-linecap="square" />
            <line x1="60" y1="22" x2="740" y2="22" stroke="${goldColor}" stroke-width="1.2" stroke-linecap="square" />
            <!-- Neoclassical Tympanum Gable & Classical Rosette -->
            <g transform="translate(400, 22)">
              <polygon points="-70,6 0,-14 70,6" stroke="${goldColor}" stroke-width="2" fill="none" />
              <circle cx="0" cy="-2" r="5" fill="${goldColor}" stroke="${primaryColor}" stroke-width="1" />
              <circle cx="0" cy="-2" r="2" fill="#FFF8E8" />
            </g>
          </svg>`;
        break;

      case 'royal-luxury':
      default:
        bannerSvg = `
          <svg viewBox="0 0 800 50" fill="none" class="w-full max-w-4xl h-auto opacity-90 ${isBottom ? 'rotate-180' : ''}">
            <path d="M 50 25 L 350 25 M 450 25 L 750 25" stroke="${goldColor}" stroke-width="2.2" stroke-linecap="square" />
            <!-- Royal Crown Apex Medallion -->
            <g transform="translate(400, 23)">
              <polygon points="0,-9 9,3 0,0 -9,3" fill="${goldColor}" stroke="${primaryColor}" stroke-width="0.8" />
              <circle cx="0" cy="-3" r="1.5" fill="#FAF4F6" />
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
      cornerSvg = getCornerInnerSvg(`
        <!-- Clean Outer Asymmetric Contour -->
        <path d="M 50 12 L 140 12" stroke="${goldColor}" stroke-width="2.5" stroke-linecap="round" />
        <path d="M 12 50 L 12 140" stroke="${goldColor}" stroke-width="2.5" stroke-linecap="round" />
        <!-- Confident Single Botanical Sprig -->
        <path d="M 10 50 Q 20 18, 50 10" stroke="${goldColor}" stroke-width="3" stroke-linecap="round" />
        <path d="M 22 36 C 18 24, 28 20, 36 28 C 34 36, 26 38, 22 36 Z" fill="${leafColor}" />
        <path d="M 36 22 C 24 18, 20 28, 28 36 C 36 34, 38 26, 36 22 Z" fill="${leafColor}" />
        <path d="M 44 14 C 46 6, 54 8, 52 16 C 50 20, 44 18, 44 14 Z" fill="${goldColor}" />
      `);
      break;

    case 'modern-minimalist':
      cornerSvg = getCornerInnerSvg(`
        <!-- Confident Floating L-Bar -->
        <path d="M 10 48 L 10 10 L 48 10" stroke="${goldColor}" stroke-width="3.5" stroke-linecap="square" />
        <!-- Sleek Secondary Hairline Axis -->
        <line x1="20" y1="20" x2="140" y2="20" stroke="${goldColor}" stroke-width="1" stroke-opacity="0.6" />
        <line x1="20" y1="20" x2="20" y2="140" stroke="${goldColor}" stroke-width="1" stroke-opacity="0.6" />
        <!-- Single Refined Diamond Stud -->
        <g transform="translate(10, 10)">
          <rect x="-3.5" y="-3.5" width="7" height="7" fill="${goldColor}" transform="rotate(45)" />
        </g>
      `);
      break;

    case 'classic-arch':
      cornerSvg = getCornerInnerSvg(`
        <!-- Monumental Cathedral Arch Corner Curve -->
        <path d="M 12 140 L 12 60 C 12 34, 34 12, 60 12 L 140 12" stroke="${goldColor}" stroke-width="3" stroke-linecap="round" />
        <path d="M 22 140 L 22 64 C 22 40, 40 22, 64 22 L 140 22" stroke="${goldColor}" stroke-width="1.2" stroke-opacity="0.75" />
        <!-- Clean Keystone Angle Pin -->
        <polygon points="56,8 64,8 62,16 58,16" fill="${goldColor}" />
      `);
      break;

    case 'romantic-lace':
      cornerSvg = getCornerInnerSvg(`
        <!-- Soft Pill-Curved Contour -->
        <path d="M 12 140 L 12 40 C 12 24, 24 12, 40 12 L 140 12" stroke="${blushColor}" stroke-width="3" stroke-linecap="round" />
        <path d="M 20 140 L 20 44 C 20 30, 30 20, 44 20 L 140 20" stroke="${goldColor}" stroke-width="1.2" stroke-opacity="0.8" />
        <!-- Minimal Sculptural Heart Silhouette -->
        <g transform="translate(38, 38) scale(0.9)">
          <path d="M 0,0 C -5,-6 -12,-4 -12,3 C -12,10 0,16 0,18 C 0,16 12,10 12,3 C 12,-4 5,-6 0,0 Z" fill="${blushColor}" fill-opacity="0.9" stroke="${goldColor}" stroke-width="1" />
        </g>
      `);
      break;

    case 'contemporary-geo':
      cornerSvg = getCornerInnerSvg(`
        <!-- Stepped Art Deco Geometric Corner -->
        <path d="M 10 50 L 10 24 L 24 24 L 24 10 L 50 10" stroke="${goldColor}" stroke-width="3.5" stroke-linecap="square" />
        <path d="M 60 10 L 140 10" stroke="${goldColor}" stroke-width="1.8" stroke-opacity="0.7" />
        <path d="M 10 60 L 10 140" stroke="${goldColor}" stroke-width="1.8" stroke-opacity="0.7" />
        <!-- Faceted Diamond Accent -->
        <g transform="translate(36, 36)">
          <polygon points="0,-10 10,0 0,10 -10,0" stroke="${goldColor}" stroke-width="2" fill="none" />
          <polygon points="0,-5 5,0 0,5 -5,0" fill="${goldColor}" />
        </g>
      `);
      break;

    case 'habesha-heritage':
      cornerSvg = getCornerInnerSvg(`
        <!-- Clean Habesha Corner Line -->
        <path d="M 12 140 L 12 12 L 140 12" stroke="${goldColor}" stroke-width="2.5" stroke-linecap="square" />
        <!-- Modern Meskel Cross Silhouette -->
        <g transform="translate(36, 36)">
          <path d="M -3 -12 L 3 -12 L 3 -3 L 12 -3 L 12 3 L 3 3 L 3 12 L -3 12 L -3 3 L -12 3 L -12 -3 L -3 -3 Z" fill="${goldColor}" stroke="${primaryColor}" stroke-width="1" />
          <circle cx="0" cy="0" r="2" fill="#FAF4F6" />
        </g>
        <polygon points="12,36 16,32 20,36 16,40" fill="${goldColor}" />
        <polygon points="36,12 32,16 36,20 40,16" fill="${goldColor}" />
      `);
      break;

    case 'celestial-sparkle':
      cornerSvg = getCornerInnerSvg(`
        <path d="M 12 140 L 12 24 C 12 17, 17 12, 24 12 L 140 12" stroke="${goldColor}" stroke-width="2" stroke-opacity="0.6" />
        <!-- Radiant 4-Point Polaris Starburst -->
        <g transform="translate(36, 36)">
          <path d="M 0 -20 Q 0 0 -20 0 Q 0 0 0 20 Q 0 0 20 0 Q 0 0 0 -20 Z" fill="${goldColor}" />
          <circle cx="0" cy="0" r="3.5" fill="#FFFFFF" />
        </g>
        <!-- Orbital Ring Arc -->
        <ellipse cx="36" cy="36" rx="24" ry="8" transform="rotate(-30 36 36)" stroke="${goldColor}" stroke-width="1.2" stroke-opacity="0.8" />
      `);
      break;

    case 'minimalist-horizon':
      cornerSvg = getCornerInnerSvg(`
        <!-- Cantilevered Horizon Rails -->
        <line x1="8" y1="24" x2="142" y2="24" stroke="${goldColor}" stroke-width="3" stroke-linecap="square" />
        <line x1="24" y1="8" x2="24" y2="142" stroke="${goldColor}" stroke-width="3" stroke-linecap="square" />
        <!-- Inner Inset Rail -->
        <line x1="36" y1="36" x2="142" y2="36" stroke="${goldColor}" stroke-width="1.2" stroke-opacity="0.7" />
        <line x1="36" y1="36" x2="36" y2="142" stroke="${goldColor}" stroke-width="1.2" stroke-opacity="0.7" />
        <!-- Corner Precision Diamond Stud -->
        <g transform="translate(24, 24)">
          <rect x="-4" y="-4" width="8" height="8" fill="${goldColor}" transform="rotate(45)" />
        </g>
      `);
      break;

    case 'contemporary-prism':
      cornerSvg = getCornerInnerSvg(`
        <!-- 45-degree Chamfered Corner Profile -->
        <path d="M 12 140 L 12 50 L 50 12 L 140 12" stroke="${goldColor}" stroke-width="3.5" stroke-linejoin="miter" stroke-linecap="square" />
        <path d="M 22 140 L 22 56 L 56 22 L 140 22" stroke="${goldColor}" stroke-width="1.2" stroke-opacity="0.75" />
        <!-- Interlocking Triangular Facet -->
        <polygon points="12,50 50,12 32,32" fill="${primaryColor}" stroke="${goldColor}" stroke-width="1" />
        <!-- Facet Diamond Stud -->
        <g transform="translate(48, 48)">
          <polygon points="0,-6 6,0 0,6 -6,0" fill="${goldColor}" />
        </g>
      `);
      break;

    case 'heritage-knotwork':
      cornerSvg = getCornerInnerSvg(`
        <!-- Outer Structural Boundary -->
        <path d="M 12 140 L 12 12 L 140 12" stroke="${goldColor}" stroke-width="2.5" stroke-linecap="square" />
        <!-- Bold Geometric Greek Meander Interlocking Fret -->
        <path d="M 12 52 L 40 52 L 40 24 L 28 24 L 28 38 L 12 38" stroke="${goldColor}" stroke-width="2.2" stroke-linecap="square" fill="none" />
        <path d="M 52 12 L 52 40 L 24 40 L 24 28 L 38 28 L 38 12" stroke="${goldColor}" stroke-width="2.2" stroke-linecap="square" fill="none" />
        <!-- Medallion Center Dot -->
        <circle cx="58" cy="58" r="4.5" fill="${goldColor}" stroke="${primaryColor}" stroke-width="1" />
      `);
      break;

    case 'celestial-lunar':
      cornerSvg = getCornerInnerSvg(`
        <path d="M 12 140 L 12 28 C 12 19, 19 12, 28 12 L 140 12" stroke="${goldColor}" stroke-width="2" stroke-opacity="0.7" />
        <!-- Corner Crescent Moon & Planetary Orbit -->
        <g transform="translate(42, 42)">
          <path d="M 0 -14 A 14 14 0 1 0 0 14 A 10 10 0 1 1 0 -14 Z" fill="${goldColor}" />
          <circle cx="3.5" cy="0" r="5" fill="${primaryColor}" stroke="${goldColor}" stroke-width="1" />
          <circle cx="3.5" cy="0" r="1.5" fill="#FFFFFF" />
        </g>
        <!-- Concentric Orbital Ring -->
        <circle cx="42" cy="42" r="28" stroke="${goldColor}" stroke-width="1" stroke-opacity="0.6" />
      `);
      break;

    case 'luxury-sovereign':
      cornerSvg = getCornerInnerSvg(`
        <!-- 45-degree Chamfered Shoulder Frame -->
        <path d="M 10 140 L 10 46 L 46 10 L 140 10" stroke="${goldColor}" stroke-width="3.5" stroke-linejoin="miter" stroke-linecap="square" />
        <path d="M 20 140 L 20 52 L 52 20 L 140 20" stroke="${goldColor}" stroke-width="1.2" stroke-opacity="0.75" />
        <!-- Shoulder Diamond Facet -->
        <polygon points="10,46 46,10 28,28" fill="${primaryColor}" stroke="${goldColor}" stroke-width="1" />
        <!-- Sovereign Crest Knot -->
        <g transform="translate(48, 48)">
          <polygon points="0,-8 8,0 0,6 -8,0" fill="${goldColor}" stroke="${primaryColor}" stroke-width="0.8" />
          <polygon points="0,-12 3,-8 -3,-8" fill="${goldColor}" />
          <circle cx="0" cy="-1" r="1.5" fill="#FFF8E7" />
        </g>
      `);
      break;

    case 'floral-garland':
      cornerSvg = getCornerInnerSvg(`
        <path d="M 14 140 L 14 42 C 14 24, 24 14, 42 14 L 140 14" stroke="${goldColor}" stroke-width="2" stroke-opacity="0.6" />
        <path d="M 16 80 Q 20 32 72 20" stroke="${goldColor}" stroke-width="2" stroke-linecap="round" fill="none" />
        <!-- Hanging Leaves -->
        <path d="M 26 52 C 20 46, 28 42, 32 48 Z" fill="${leafColor}" />
        <path d="M 52 26 C 46 20, 42 28, 48 32 Z" fill="${leafColor}" />
        <!-- Magnolia Flower Cluster -->
        <g transform="translate(42, 42)">
          <path d="M 0 -12 C -6 -14, -10 -4, 0 3 C 10 -4, 6 -14, 0 -12 Z" fill="${blushColor}" stroke="${goldColor}" stroke-width="0.8" />
          <path d="M -2 -7 C -9 -8, -10 0, -3 3 Z" fill="${blushColor}" />
          <path d="M 2 -7 C 9 -8, 10 0, 3 3 Z" fill="${blushColor}" />
          <circle cx="0" cy="-2" r="2.5" fill="${goldColor}" />
        </g>
      `);
      break;

    case 'romantic-ribbon':
      cornerSvg = getCornerInnerSvg(`
        <path d="M 12 140 L 12 38 C 12 22, 22 12, 38 12 L 140 12" stroke="${blushColor}" stroke-width="2.5" />
        <path d="M 18 140 L 18 42 C 18 28, 28 18, 42 18 L 140 18" stroke="${goldColor}" stroke-width="1.2" stroke-opacity="0.8" />
        <!-- Interlocking Corner Infinity Knot -->
        <g transform="translate(42, 42)">
          <path d="M 0 0 C -6 -7, -12 -7, -12 0 C -12 7, -6 7, 0 0" stroke="${blushColor}" stroke-width="2.2" stroke-linecap="round" fill="none" />
          <path d="M 0 0 C 6 7, 12 7, 12 0 C 12 -7, 6 -7, 0 0" stroke="${blushColor}" stroke-width="2.2" stroke-linecap="round" fill="none" />
          <circle cx="0" cy="0" r="3" fill="${goldColor}" />
          <path d="M 0 3 C -1.5 5, -2 7, 0 9 C 2 7, 1.5 5, 0 3 Z" fill="${goldColor}" />
        </g>
      `);
      break;

    case 'classic-pediment':
      cornerSvg = getCornerInnerSvg(`
        <!-- Neoclassical Fluted Column Corner -->
        <line x1="12" y1="140" x2="12" y2="40" stroke="${goldColor}" stroke-width="3" stroke-linecap="square" />
        <line x1="20" y1="140" x2="20" y2="40" stroke="${goldColor}" stroke-width="1.2" stroke-opacity="0.8" />
        <line x1="140" y1="12" x2="40" y2="12" stroke="${goldColor}" stroke-width="3" stroke-linecap="square" />
        <line x1="140" y1="20" x2="40" y2="20" stroke="${goldColor}" stroke-width="1.2" stroke-opacity="0.8" />
        <!-- Classical Ionic Scroll Volute -->
        <g transform="translate(36, 36)">
          <circle cx="-5" cy="-5" r="3.2" fill="${goldColor}" stroke="${primaryColor}" stroke-width="0.8" />
          <circle cx="5" cy="-5" r="3.2" fill="${goldColor}" stroke="${primaryColor}" stroke-width="0.8" />
          <rect x="-8" y="-1" width="16" height="4" fill="${goldColor}" rx="1" />
        </g>
      `);
      break;

    case 'royal-luxury':
    default:
      cornerSvg = getCornerInnerSvg(`
        <!-- Bold Architectural L-Bracket Corner -->
        <path d="M 8 40 L 8 8 L 40 8" stroke="${goldColor}" stroke-width="3.5" stroke-linecap="square" />
        <path d="M 16 140 L 16 16 L 140 16" stroke="${goldColor}" stroke-width="1.8" />
        <!-- Minimal Apex Chevron Crest -->
        <g transform="translate(36, 36)">
          <polygon points="0,-8 8,2 0,0 -8,2" fill="${goldColor}" stroke="${primaryColor}" stroke-width="0.8" />
          <circle cx="0" cy="-2" r="1.5" fill="#FAF4F6" />
        </g>
      `);
      break;
  }

  return `<div class="pointer-events-none select-none ${className}">${cornerSvg}</div>`;
}

export const BotanicalFrame: React.FC<BotanicalFrameProps> = ({
  className = '',
  position = 'top-left',
  themeId = 'bordeaux',
  frameStyle
}: BotanicalFrameProps) => {
  const html = getBotanicalFrameHtml(position, themeId, frameStyle, className);
  return <div dangerouslySetInnerHTML={{ __html: html }} style={{ display: 'contents' }} />;
};
