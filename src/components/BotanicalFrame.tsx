import React from 'react';
import { ThemeId } from '../types';

interface BotanicalFrameProps {
  className?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'banner-top' | 'banner-bottom';
  colorMode?: 'gold' | 'rose' | 'wine';
  themeId?: ThemeId;
}

export const BotanicalFrame: React.FC<BotanicalFrameProps> = ({
  className = '',
  position = 'top-left',
  themeId = 'bordeaux'
}) => {
  // Theme-specific colors for SVG elements
  const getThemeColors = () => {
    switch (themeId) {
      case 'emerald':
        return {
          gold: '#D4AF37',
          leaf: '#2D6A4F',
          petal: '#52B788',
          accent: '#E9C46A'
        };
      case 'midnight':
        return {
          gold: '#E8C96A',
          leaf: '#2E1D6B',
          petal: '#7C3AED',
          accent: '#DDD6FE'
        };
      case 'rosegarden':
        return {
          gold: '#FCD34D',
          leaf: '#9A3412',
          petal: '#C2410C',
          accent: '#FCA5A5'
        };
      case 'goldluxury':
        return {
          gold: '#D4AF37',
          leaf: '#2D2D2D',
          petal: '#4A4A4A',
          accent: '#F3E5AB'
        };
      case 'classicivory':
        return {
          gold: '#B8860B',
          leaf: '#423E3C',
          petal: '#615C59',
          accent: '#E6D7C3'
        };
      case 'bordeaux':
      default:
        return {
          gold: '#C8A84B',
          leaf: '#721121',
          petal: '#E5989B',
          accent: '#F3C969'
        };
    }
  };

  const { gold: goldColor, leaf: leafColor, petal: petalColor, accent: accentColor } = getThemeColors();

  // Rotation / flip transforms based on corner position
  const getTransform = () => {
    switch (position) {
      case 'top-right': return 'scaleX(-1)';
      case 'bottom-left': return 'scaleY(-1)';
      case 'bottom-right': return 'scale(-1, -1)';
      default: return 'none';
    }
  };

  // BANNER POSITIONS (banner-top, banner-bottom)
  if (position === 'banner-top' || position === 'banner-bottom') {
    const isBottom = position === 'banner-bottom';
    return (
      <div className={`w-full overflow-hidden pointer-events-none flex justify-center py-2 ${className}`}>
        {themeId === 'emerald' && (
          /* 1. Botanical Garden Banner (Lush Eucalyptus Vine & Garden Blossom Garland) */
          <svg viewBox="0 0 800 60" fill="none" className={`w-full max-w-4xl h-auto opacity-90 ${isBottom ? 'rotate-180' : ''}`}>
            <path d="M50 30 Q 200 15, 400 30 Q 600 45, 750 30" stroke={goldColor} strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 120 25 C 110 12, 95 18, 105 28 C 115 28, 125 25, 120 25 Z" fill={leafColor} opacity="0.9" />
            <path d="M 200 23 C 190 12, 175 18, 185 28 C 195 28, 205 25, 200 23 Z" fill={petalColor} opacity="0.9" />
            <path d="M 280 28 C 270 18, 255 24, 265 34 C 275 34, 285 31, 280 28 Z" fill={leafColor} opacity="0.9" />
            <path d="M 680 25 C 690 12, 705 18, 695 28 C 685 28, 675 25, 680 25 Z" fill={leafColor} opacity="0.9" />
            <path d="M 600 23 C 610 12, 625 18, 615 28 C 605 28, 595 25, 600 23 Z" fill={petalColor} opacity="0.9" />
            <path d="M 520 28 C 530 18, 545 24, 535 34 C 525 34, 515 31, 520 28 Z" fill={leafColor} opacity="0.9" />
            <g transform="translate(400, 30)">
              <circle cx="0" cy="0" r="5" fill={accentColor} />
              {[0, 60, 120, 180, 240, 300].map((angle, idx) => (
                <path key={idx} d="M0 0 C -6 -14, 6 -14, 0 0" fill={petalColor} stroke={goldColor} strokeWidth="0.8" transform={`rotate(${angle})`} />
              ))}
              <circle cx="0" cy="0" r="2" fill={leafColor} />
            </g>
          </svg>
        )}

        {themeId === 'midnight' && (
          /* 2. Celestial Starlit Banner (Moon & Starlight Constellation) */
          <svg viewBox="0 0 800 60" fill="none" className={`w-full max-w-4xl h-auto opacity-90 ${isBottom ? 'rotate-180' : ''}`}>
            <path d="M50 30 L 350 30 M 450 30 L 750 30" stroke={goldColor} strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="150" cy="30" r="2" fill={goldColor} />
            <circle cx="250" cy="30" r="3" fill={accentColor} />
            <circle cx="550" cy="30" r="3" fill={accentColor} />
            <circle cx="650" cy="30" r="2" fill={goldColor} />
            <g transform="translate(400, 30)">
              <path d="M -12 -12 A 16 16 0 1 0 10 12 A 12 12 0 1 1 -12 -12 Z" fill={goldColor} />
              <polygon points="10,-6 12,-1 17,0 13,3 14,8 10,5 6,8 7,3 3,0 8,-1" fill={accentColor} />
            </g>
          </svg>
        )}

        {themeId === 'rosegarden' && (
          /* 3. Vintage Terracotta Banner (Antique Sunburst & Scroll Arch) */
          <svg viewBox="0 0 800 60" fill="none" className={`w-full max-w-4xl h-auto opacity-85 ${isBottom ? 'rotate-180' : ''}`}>
            <path d="M 60 40 Q 200 10, 400 15 Q 600 10, 740 40" stroke={goldColor} strokeWidth="1.5" />
            <path d="M 100 45 Q 250 20, 400 25 Q 550 20, 700 45" stroke={goldColor} strokeWidth="0.8" strokeDasharray="3 3" />
            <g transform="translate(400, 25)">
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((ang, i) => (
                <line key={i} x1="0" y1="0" x2="16" y2="0" stroke={goldColor} strokeWidth="1" transform={`rotate(${ang})`} />
              ))}
              <circle cx="0" cy="0" r="6" fill={leafColor} stroke={goldColor} strokeWidth="1" />
            </g>
          </svg>
        )}

        {themeId === 'goldluxury' && (
          /* 4. Black Tie Glamour Banner (Art Deco Geometric Chevrons) */
          <svg viewBox="0 0 800 60" fill="none" className={`w-full max-w-4xl h-auto opacity-90 ${isBottom ? 'rotate-180' : ''}`}>
            <path d="M 50 30 L 370 30 M 430 30 L 750 30" stroke={goldColor} strokeWidth="1.5" />
            <path d="M 70 25 L 360 25 M 440 25 L 730 25" stroke={goldColor} strokeWidth="0.8" />
            <g transform="translate(400, 30)">
              <polygon points="0,-16 16,0 0,16 -16,0" fill={goldColor} />
              <polygon points="0,-10 10,0 0,10 -10,0" fill="#1A1A1A" />
              <polygon points="0,-5 5,0 0,5 -5,0" fill={accentColor} />
            </g>
          </svg>
        )}

        {themeId === 'classicivory' && (
          /* 5. Traditional Minimalist Banner (Fine Hairline & Ring) */
          <svg viewBox="0 0 800 60" fill="none" className={`w-full max-w-4xl h-auto opacity-80 ${isBottom ? 'rotate-180' : ''}`}>
            <line x1="80" y1="30" x2="380" y2="30" stroke={goldColor} strokeWidth="1" />
            <line x1="420" y1="30" x2="720" y2="30" stroke={goldColor} strokeWidth="1" />
            <circle cx="400" cy="30" r="5" stroke={goldColor} strokeWidth="1" fill="none" />
            <circle cx="400" cy="30" r="2" fill={goldColor} />
          </svg>
        )}

        {(themeId === 'bordeaux' || !themeId) && (
          /* 6. Royal Imperial Banner (Imperial Crown & Scrollwork) */
          <svg viewBox="0 0 800 60" fill="none" className={`w-full max-w-4xl h-auto opacity-85 ${isBottom ? 'rotate-180' : ''}`}>
            <path d="M50 30 Q 200 15, 400 30 Q 600 45, 750 30" stroke={goldColor} strokeWidth="1.5" strokeLinecap="round" />
            <path d="M200 23 C 190 12, 175 18, 185 28 C 195 28, 205 25, 200 23 Z" fill={leafColor} opacity="0.85" />
            <path d="M600 23 C 610 12, 625 18, 615 28 C 605 28, 595 25, 600 23 Z" fill={leafColor} opacity="0.85" />
            <g transform="translate(400, 24) scale(0.9)">
              <path d="M-15,10 L-12,-5 L-5,2 L0,-10 L5,2 L12,-5 L15,10 Z" fill={goldColor} stroke={leafColor} strokeWidth="0.8" />
              <rect x="-15" y="10" width="30" height="4" fill={accentColor} />
              <circle cx="0" cy="-12" r="2" fill={accentColor} />
              <circle cx="-12" cy="-7" r="1.5" fill={petalColor} />
              <circle cx="12" cy="-7" r="1.5" fill={petalColor} />
            </g>
          </svg>
        )}
      </div>
    );
  }

  // CORNER POSITIONS (top-left, top-right, bottom-left, bottom-right)
  return (
    <div className={`pointer-events-none select-none ${className}`} style={{ transform: getTransform() }}>
      {themeId === 'emerald' && (
        /* Botanical Garden Corner SVG (Eucalyptus Leaves & Blooming Mint/Gold Garden Flower) */
        <svg width="150" height="150" viewBox="0 0 150 150" fill="none" className="w-24 h-24 sm:w-36 sm:h-36">
          <path d="M 10 140 C 10 65, 65 10, 140 10" stroke={goldColor} strokeWidth="2" strokeLinecap="round" />
          <path d="M 18 140 C 18 73, 73 18, 140 18" stroke={leafColor} strokeWidth="1" strokeDasharray="3 3" />
          {/* Garden Blossom at (50, 50) */}
          <g transform="translate(50, 50)">
            <circle cx="0" cy="0" r="5" fill={accentColor} />
            {[0, 60, 120, 180, 240, 300].map((angle, idx) => (
              <path key={idx} d="M0 0 C -7 -15, 7 -15, 0 0" fill={petalColor} stroke={leafColor} strokeWidth="0.8" transform={`rotate(${angle})`} />
            ))}
            <circle cx="0" cy="0" r="2" fill={goldColor} />
          </g>
          {/* Eucalyptus Leaf Cluster */}
          <path d="M 25 90 C 10 75, 2 85, 15 98 C 28 98, 32 94, 25 90 Z" fill={leafColor} opacity="0.9" />
          <path d="M 90 25 C 75 10, 85 2, 98 15 C 98 28, 94 32, 90 25 Z" fill={leafColor} opacity="0.9" />
          <path d="M 35 115 C 22 105, 15 112, 25 122 Z" fill={petalColor} opacity="0.8" />
          <path d="M 115 35 C 105 22, 112 15, 122 25 Z" fill={petalColor} opacity="0.8" />
        </svg>
      )}

      {themeId === 'midnight' && (
        /* Celestial Starlit Corner SVG (Crescent Moon & Starbursts) */
        <svg width="150" height="150" viewBox="0 0 150 150" fill="none" className="w-24 h-24 sm:w-36 sm:h-36">
          <path d="M 12 138 C 12 60, 60 12, 138 12" stroke={goldColor} strokeWidth="1.2" strokeDasharray="3 3" />
          <g transform="translate(42, 42)">
            <path d="M -10 -10 A 14 14 0 1 0 10 10 A 10 10 0 1 1 -10 -10 Z" fill={goldColor} />
          </g>
          <g transform="translate(85, 25)">
            <polygon points="0,-8 2,-2 8,0 2,2 0,8 -2,2 -8,0 -2,-2" fill={accentColor} />
          </g>
          <g transform="translate(25, 85)">
            <polygon points="0,-8 2,-2 8,0 2,2 0,8 -2,2 -8,0 -2,-2" fill={accentColor} />
          </g>
          <circle cx="110" cy="40" r="2" fill={goldColor} />
          <circle cx="40" cy="110" r="2" fill={goldColor} />
        </svg>
      )}

      {themeId === 'rosegarden' && (
        /* Vintage Terracotta Corner SVG (Victorian Arch & Sunburst) */
        <svg width="150" height="150" viewBox="0 0 150 150" fill="none" className="w-24 h-24 sm:w-36 sm:h-36">
          <path d="M 10 140 L 10 10 L 140 10" stroke={goldColor} strokeWidth="2" />
          <path d="M 18 140 L 18 18 L 140 18" stroke={leafColor} strokeWidth="0.8" />
          <g transform="translate(18, 18)">
            {[0, 18, 36, 54, 72, 90].map((ang, i) => (
              <line key={i} x1="0" y1="0" x2="30" y2="0" stroke={goldColor} strokeWidth="1" transform={`rotate(${ang})`} />
            ))}
            <circle cx="0" cy="0" r="6" fill={leafColor} />
          </g>
        </svg>
      )}

      {themeId === 'goldluxury' && (
        /* Black Tie Glamour Corner SVG (Art Deco Diamond Lines) */
        <svg width="150" height="150" viewBox="0 0 150 150" fill="none" className="w-24 h-24 sm:w-36 sm:h-36">
          <path d="M 10 140 L 10 35 L 35 10 L 140 10" stroke={goldColor} strokeWidth="2" />
          <path d="M 20 130 L 20 40 L 40 20 L 130 20" stroke={goldColor} strokeWidth="0.8" />
          <g transform="translate(35, 35)">
            <polygon points="0,-10 10,0 0,10 -10,0" fill={goldColor} />
            <polygon points="0,-5 5,0 0,5 -5,0" fill="#1A1A1A" />
          </g>
        </svg>
      )}

      {themeId === 'classicivory' && (
        /* Traditional Minimalist Corner SVG (Fine Double Hairline & Ring) */
        <svg width="150" height="150" viewBox="0 0 150 150" fill="none" className="w-24 h-24 sm:w-36 sm:h-36">
          <path d="M 12 140 L 12 12 L 140 12" stroke={goldColor} strokeWidth="1" />
          <path d="M 20 140 L 20 20 L 140 20" stroke={goldColor} strokeWidth="0.5" />
          <circle cx="12" cy="12" r="3" fill={goldColor} />
        </svg>
      )}

      {(themeId === 'bordeaux' || !themeId) && (
        /* Royal Imperial Corner SVG (Crown & Fleur-de-lis Scrollwork) */
        <svg width="150" height="150" viewBox="0 0 150 150" fill="none" className="w-24 h-24 sm:w-36 sm:h-36">
          <path d="M 12 140 C 12 60, 60 12, 140 12" stroke={goldColor} strokeWidth="1.8" />
          <g transform="translate(32, 32) scale(0.9)">
            <path d="M-12,8 L-10,-4 L-4,1 L0,-8 L4,1 L10,-4 L12,8 Z" fill={goldColor} stroke={leafColor} strokeWidth="0.8" />
            <rect x="-12" y="8" width="24" height="3" fill={accentColor} />
            <circle cx="0" cy="-9" r="1.5" fill={accentColor} />
          </g>
          <path d="M 25 85 C 15 75, 5 80, 15 90 Z" fill={leafColor} opacity="0.8" />
          <path d="M 85 25 C 75 15, 80 5, 90 15 Z" fill={leafColor} opacity="0.8" />
        </svg>
      )}
    </div>
  );
};
