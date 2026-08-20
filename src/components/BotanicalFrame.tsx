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
      cornerSvg = `
        <svg width="150" height="150" viewBox="0 0 150 150" fill="none" class="w-24 h-24 sm:w-36 sm:h-36 drop-shadow-sm">
          <!-- Clean Outer Asymmetric Contour -->
          <path d="M 50 12 L 140 12" stroke="${goldColor}" stroke-width="2.5" stroke-linecap="round" />
          <path d="M 12 50 L 12 140" stroke="${goldColor}" stroke-width="2.5" stroke-linecap="round" />
          <!-- Confident Single Botanical Sprig -->
          <path d="M 10 50 Q 20 18, 50 10" stroke="${goldColor}" stroke-width="3" stroke-linecap="round" />
          <path d="M 22 36 C 18 24, 28 20, 36 28 C 34 36, 26 38, 22 36 Z" fill="${leafColor}" />
          <path d="M 36 22 C 24 18, 20 28, 28 36 C 36 34, 38 26, 36 22 Z" fill="${leafColor}" />
          <path d="M 44 14 C 46 6, 54 8, 52 16 C 50 20, 44 18, 44 14 Z" fill="${goldColor}" />
        </svg>`;
      break;

    case 'modern-minimalist':
      cornerSvg = `
        <svg width="150" height="150" viewBox="0 0 150 150" fill="none" class="w-24 h-24 sm:w-36 sm:h-36 drop-shadow-sm">
          <!-- Confident Floating L-Bar -->
          <path d="M 10 48 L 10 10 L 48 10" stroke="${goldColor}" stroke-width="3.5" stroke-linecap="square" />
          <!-- Sleek Secondary Hairline Axis -->
          <line x1="20" y1="20" x2="140" y2="20" stroke="${goldColor}" stroke-width="1" stroke-opacity="0.6" />
          <line x1="20" y1="20" x2="20" y2="140" stroke="${goldColor}" stroke-width="1" stroke-opacity="0.6" />
          <!-- Single Refined Diamond Stud -->
          <g transform="translate(10, 10)">
            <rect x="-3.5" y="-3.5" width="7" height="7" fill="${goldColor}" transform="rotate(45)" />
          </g>
        </svg>`;
      break;

    case 'classic-arch':
      cornerSvg = `
        <svg width="150" height="150" viewBox="0 0 150 150" fill="none" class="w-24 h-24 sm:w-36 sm:h-36 drop-shadow-sm">
          <!-- Monumental Cathedral Arch Corner Curve -->
          <path d="M 12 140 L 12 60 C 12 34, 34 12, 60 12 L 140 12" stroke="${goldColor}" stroke-width="3" stroke-linecap="round" />
          <path d="M 22 140 L 22 64 C 22 40, 40 22, 64 22 L 140 22" stroke="${goldColor}" stroke-width="1.2" stroke-opacity="0.75" />
          <!-- Clean Keystone Angle Pin -->
          <polygon points="56,8 64,8 62,16 58,16" fill="${goldColor}" />
        </svg>`;
      break;

    case 'romantic-lace':
      cornerSvg = `
        <svg width="150" height="150" viewBox="0 0 150 150" fill="none" class="w-24 h-24 sm:w-36 sm:h-36 drop-shadow-sm">
          <!-- Soft Pill-Curved Contour -->
          <path d="M 12 140 L 12 40 C 12 24, 24 12, 40 12 L 140 12" stroke="${blushColor}" stroke-width="3" stroke-linecap="round" />
          <path d="M 20 140 L 20 44 C 20 30, 30 20, 44 20 L 140 20" stroke="${goldColor}" stroke-width="1.2" stroke-opacity="0.8" />
          <!-- Minimal Sculptural Heart Silhouette -->
          <g transform="translate(38, 38) scale(0.9)">
            <path d="M 0,0 C -5,-6 -12,-4 -12,3 C -12,10 0,16 0,18 C 0,16 12,10 12,3 C 12,-4 5,-6 0,0 Z" fill="${blushColor}" fill-opacity="0.9" stroke="${goldColor}" stroke-width="1" />
          </g>
        </svg>`;
      break;

    case 'contemporary-geo':
      cornerSvg = `
        <svg width="150" height="150" viewBox="0 0 150 150" fill="none" class="w-24 h-24 sm:w-36 sm:h-36 drop-shadow-sm">
          <!-- Stepped Art Deco Geometric Corner -->
          <path d="M 10 50 L 10 24 L 24 24 L 24 10 L 50 10" stroke="${goldColor}" stroke-width="3.5" stroke-linecap="square" />
          <path d="M 60 10 L 140 10" stroke="${goldColor}" stroke-width="1.8" stroke-opacity="0.7" />
          <path d="M 10 60 L 10 140" stroke="${goldColor}" stroke-width="1.8" stroke-opacity="0.7" />
          <!-- Faceted Diamond Accent -->
          <g transform="translate(36, 36)">
            <polygon points="0,-10 10,0 0,10 -10,0" stroke="${goldColor}" stroke-width="2" fill="none" />
            <polygon points="0,-5 5,0 0,5 -5,0" fill="${goldColor}" />
          </g>
        </svg>`;
      break;

    case 'habesha-heritage':
      cornerSvg = `
        <svg width="150" height="150" viewBox="0 0 150 150" fill="none" class="w-24 h-24 sm:w-36 sm:h-36 drop-shadow-sm">
          <!-- Clean Habesha Corner Line -->
          <path d="M 12 140 L 12 12 L 140 12" stroke="${goldColor}" stroke-width="2.5" stroke-linecap="square" />
          <!-- Modern Meskel Cross Silhouette -->
          <g transform="translate(36, 36)">
            <path d="M -3 -12 L 3 -12 L 3 -3 L 12 -3 L 12 3 L 3 3 L 3 12 L -3 12 L -3 3 L -12 3 L -12 -3 L -3 -3 Z" fill="${goldColor}" stroke="${primaryColor}" stroke-width="1" />
            <circle cx="0" cy="0" r="2" fill="#FAF4F6" />
          </g>
          <polygon points="12,36 16,32 20,36 16,40" fill="${goldColor}" />
          <polygon points="36,12 32,16 36,20 40,16" fill="${goldColor}" />
        </svg>`;
      break;

    case 'celestial-sparkle':
      cornerSvg = `
        <svg width="150" height="150" viewBox="0 0 150 150" fill="none" class="w-24 h-24 sm:w-36 sm:h-36 drop-shadow-sm">
          <path d="M 12 140 L 12 24 C 12 17, 17 12, 24 12 L 140 12" stroke="${goldColor}" stroke-width="2" stroke-opacity="0.6" />
          <!-- Radiant 4-Point Polaris Starburst -->
          <g transform="translate(36, 36)">
            <path d="M 0 -20 Q 0 0 -20 0 Q 0 0 0 20 Q 0 0 20 0 Q 0 0 0 -20 Z" fill="${goldColor}" />
            <circle cx="0" cy="0" r="3.5" fill="#FFFFFF" />
          </g>
          <!-- Orbital Ring Arc -->
          <ellipse cx="36" cy="36" rx="24" ry="8" transform="rotate(-30 36 36)" stroke="${goldColor}" stroke-width="1.2" stroke-opacity="0.8" />
        </svg>`;
      break;

    case 'royal-luxury':
    default:
      cornerSvg = `
        <svg width="150" height="150" viewBox="0 0 150 150" fill="none" class="w-24 h-24 sm:w-36 sm:h-36 drop-shadow-sm">
          <!-- Bold Architectural L-Bracket Corner -->
          <path d="M 8 40 L 8 8 L 40 8" stroke="${goldColor}" stroke-width="3.5" stroke-linecap="square" />
          <path d="M 16 140 L 16 16 L 140 16" stroke="${goldColor}" stroke-width="1.8" />
          <!-- Minimal Apex Chevron Crest -->
          <g transform="translate(36, 36)">
            <polygon points="0,-8 8,2 0,0 -8,2" fill="${goldColor}" stroke="${primaryColor}" stroke-width="0.8" />
            <circle cx="0" cy="-2" r="1.5" fill="#FAF4F6" />
          </g>
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
