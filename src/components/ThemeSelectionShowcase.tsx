import React from 'react';
import { motion } from 'motion/react';
import { Check, Lock, Sparkles, ArrowRight, Eye } from 'lucide-react';
import { ThemeId } from '../types';
import { THEME_PRESETS, ThemePreset } from '../utils/themePresets';

interface ThemeSelectionShowcaseProps {
  selectedThemeId?: ThemeId;
  onSelectTheme: (themeId: ThemeId) => void;
  onPreviewTheme?: (themePreset: ThemePreset) => void;
  showFullPageDecorations?: boolean;
}

export function ThemeSelectionShowcase({
  selectedThemeId = 'bordeaux',
  onSelectTheme,
  onPreviewTheme,
  showFullPageDecorations = true
}: ThemeSelectionShowcaseProps) {

  const themes = [
    {
      id: 'bordeaux' as ThemeId,
      name: 'Royal Burgundy',
      description: 'Regal, romantic and timeless. Perfect for a luxurious celebration.',
      headerBg: '#5A0A21',
      swatches: ['#5A0A21', '#C86D84', '#FAD2D8', '#C8A84B'],
      renderArtwork: () => (
        <div className="relative w-full h-44 sm:h-52 overflow-hidden bg-[#4A0A1A] flex items-center justify-center">
          {/* Deep Burgundy Velvet Textured Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#3D0513] via-[#5A0A21] to-[#30030E] opacity-95" />
          <div className="absolute inset-0 bg-[radial-gradient(#C8A84B_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />
          
          {/* Outer Gold Border Accents */}
          <div className="absolute inset-2 border border-[#C8A84B]/40 rounded-sm pointer-events-none" />
          <div className="absolute inset-3 border border-[#C8A84B]/20 border-dashed rounded-sm pointer-events-none" />

          {/* SVG Classical Roman Archway with Soft Pink Roses & Gold Foliage */}
          <svg viewBox="0 0 400 240" className="w-full h-full object-contain relative z-10 filter drop-shadow-md" fill="none">
            {/* Background Arch Shadow */}
            <path d="M140 240 L140 100 C140 60, 260 60, 260 100 L260 240 Z" fill="#2E040D" opacity="0.6" />
            
            {/* Outer Classical Arch Structure */}
            <path d="M130 240 L130 95 C130 45, 270 45, 270 95 L270 240" stroke="#E2C873" strokeWidth="4" strokeLinecap="round" />
            <path d="M140 240 L140 98 C140 55, 260 55, 260 98 L260 240" stroke="#C8A84B" strokeWidth="2" strokeDasharray="3 3" />
            <path d="M152 240 L152 105 C152 70, 248 70, 248 105 L248 240" stroke="#FAF0F3" strokeWidth="1.5" opacity="0.8" />

            {/* Arch Pillars / Fluted Columns */}
            <rect x="120" y="210" width="24" height="30" rx="2" fill="#FAF0F3" stroke="#C8A84B" strokeWidth="1" />
            <rect x="256" y="210" width="24" height="30" rx="2" fill="#FAF0F3" stroke="#C8A84B" strokeWidth="1" />
            <rect x="122" y="85" width="20" height="15" rx="2" fill="#FAF0F3" stroke="#C8A84B" strokeWidth="1" />
            <rect x="258" y="85" width="20" height="15" rx="2" fill="#FAF0F3" stroke="#C8A84B" strokeWidth="1" />

            {/* Classical Keystone Medallion */}
            <g transform="translate(200, 52)">
              <polygon points="0,-10 10,0 0,10 -10,0" fill="#C8A84B" stroke="#FAF0F3" strokeWidth="1" />
              <circle cx="0" cy="0" r="3" fill="#5A0A21" />
            </g>

            {/* Blooming Watercolor Roses on Bottom Right of Arch */}
            <g transform="translate(250, 160)">
              {/* Green/Gold Foliage */}
              <path d="M-20 -10 C-35 -25 -10 -40 0 -20 C-10 -10 -20 -10 -20 -10 Z" fill="#3D5A40" opacity="0.8" />
              <path d="M15 10 C30 -5 45 10 20 20 Z" fill="#C8A84B" opacity="0.75" />
              <path d="M-10 20 C-25 35 -40 10 -20 0 Z" fill="#2D4A30" opacity="0.8" />
              
              {/* Grand Pink Rose Cluster */}
              <circle cx="0" cy="0" r="16" fill="#E59EAF" />
              <circle cx="-3" cy="-3" r="12" fill="#C86D84" />
              <circle cx="2" cy="2" r="8" fill="#FAD2D8" />
              <circle cx="0" cy="0" r="4" fill="#5A0A21" />

              {/* Smaller Satellite Roses */}
              <circle cx="22" cy="12" r="10" fill="#FAD2D8" />
              <circle cx="20" cy="10" r="7" fill="#C86D84" />
              
              <circle cx="-16" cy="18" r="11" fill="#E59EAF" />
              <circle cx="-18" cy="16" r="7" fill="#5A0A21" />
            </g>

            {/* Golden Ornamental Corner Lines */}
            <path d="M20 20 L60 20 M20 20 L20 60" stroke="#C8A84B" strokeWidth="1.5" />
            <circle cx="20" cy="20" r="3" fill="#C8A84B" />
            <path d="M380 20 L340 20 M380 20 L380 60" stroke="#C8A84B" strokeWidth="1.5" />
            <circle cx="380" cy="20" r="3" fill="#C8A84B" />
          </svg>
        </div>
      )
    },
    {
      id: 'emerald' as ThemeId,
      name: 'Emerald Garden',
      description: 'Fresh, elegant and inspired by nature. Ideal for garden and outdoor weddings.',
      headerBg: '#1B4332',
      swatches: ['#1B4332', '#74967E', '#F5EBE1', '#C8A84B'],
      renderArtwork: () => (
        <div className="relative w-full h-44 sm:h-52 overflow-hidden bg-[#F7F4EC] flex items-center justify-center">
          {/* Parchment Watercolor Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#FDFBF7] via-[#F4EDE2] to-[#EAE2D3] opacity-90" />
          
          {/* Subtle botanical leafy background watermark */}
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover absolute inset-0 z-0 opacity-15" fill="none">
            <path d="M0 0 C 100 80, 200 40, 400 0" stroke="#1B4332" strokeWidth="20" />
          </svg>

          {/* Watercolor Foliage & Floral Garland Sprigs */}
          <svg viewBox="0 0 400 240" className="w-full h-full object-contain relative z-10" fill="none">
            {/* Top-Left Eucalyptus Swag */}
            <g transform="translate(10, 10)">
              <path d="M 0 0 C 40 30, 80 20, 140 50" stroke="#74967E" strokeWidth="2.5" strokeLinecap="round" />
              {/* Eucalyptus Leaves */}
              <ellipse cx="30" cy="12" rx="14" ry="9" fill="#2D6A4F" opacity="0.85" transform="rotate(-20 30 12)" />
              <ellipse cx="65" cy="24" rx="15" ry="10" fill="#74967E" opacity="0.9" transform="rotate(15 65 24)" />
              <ellipse cx="100" cy="32" rx="13" ry="8" fill="#40916C" opacity="0.85" transform="rotate(-10 100 32)" />
              <ellipse cx="125" cy="48" rx="12" ry="7" fill="#2D6A4F" opacity="0.8" transform="rotate(30 125 48)" />

              {/* Pastel Pink Blossom Flowers */}
              <g transform="translate(75, 45)">
                <circle cx="0" cy="0" r="10" fill="#F8BFCB" />
                <circle cx="0" cy="0" r="6" fill="#E59EAF" />
                <circle cx="0" cy="0" r="2.5" fill="#C8A84B" />
              </g>
              <g transform="translate(35, 30)">
                <circle cx="0" cy="0" r="7" fill="#F8BFCB" />
                <circle cx="0" cy="0" r="2" fill="#C8A84B" />
              </g>
            </g>

            {/* Bottom-Right Watercolor Foliage Branch with Blooming Peonies */}
            <g transform="translate(390, 230) rotate(180)">
              <path d="M 0 0 C 50 40, 100 30, 160 60" stroke="#74967E" strokeWidth="3" strokeLinecap="round" />
              <ellipse cx="35" cy="15" rx="16" ry="10" fill="#1B4332" opacity="0.9" transform="rotate(-25 35 15)" />
              <ellipse cx="80" cy="30" rx="18" ry="11" fill="#74967E" opacity="0.95" transform="rotate(20 80 30)" />
              <ellipse cx="120" cy="42" rx="15" ry="9" fill="#40916C" opacity="0.85" transform="rotate(-15 120 42)" />
              
              {/* Lush Watercolor Peony Rose */}
              <g transform="translate(90, 60)">
                <circle cx="0" cy="0" r="16" fill="#FAD2D8" />
                <circle cx="-3" cy="-2" r="11" fill="#E59EAF" />
                <circle cx="2" cy="2" r="6" fill="#C86D84" />
                <circle cx="0" cy="0" r="2.5" fill="#C8A84B" />
              </g>
              <g transform="translate(135, 75)">
                <circle cx="0" cy="0" r="10" fill="#FAD2D8" />
                <circle cx="0" cy="0" r="3" fill="#C8A84B" />
              </g>
            </g>

            {/* Gold Botanical Branch Accents */}
            <path d="M 220 70 Q 260 90, 300 65" stroke="#C8A84B" strokeWidth="1.2" strokeDasharray="3 2" />
            <circle cx="260" cy="80" r="2" fill="#C8A84B" />
          </svg>
        </div>
      )
    },
    {
      id: 'rosegarden' as ThemeId,
      name: 'Rose Gold',
      description: 'Soft, modern and full of warmth. A beautiful blend of romance and elegance.',
      headerBg: '#C97D8B',
      swatches: ['#D67584', '#F8BFCB', '#F9D9D2', '#C8A84B'],
      renderArtwork: () => (
        <div className="relative w-full h-44 sm:h-52 overflow-hidden bg-[#FAF0F2] flex items-center justify-center">
          {/* Dreamy Blush Pink Watercolor Wash */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFF5F7] via-[#FCE4EC] to-[#F8D2DB] opacity-95" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#FAD2D8] rounded-full blur-2xl opacity-60" />

          {/* SVG Circular Golden Wreath with Pastel Blooming Roses */}
          <svg viewBox="0 0 400 240" className="w-full h-full object-contain relative z-10" fill="none">
            {/* Delicate Circular / Oval Golden Wreath Ring */}
            <circle cx="200" cy="115" r="62" stroke="#C8A84B" strokeWidth="1.8" strokeDasharray="4 2" />
            <circle cx="200" cy="115" r="68" stroke="#D67584" strokeWidth="0.8" opacity="0.6" />

            {/* Left Floral Arch on Wreath */}
            <g transform="translate(135, 120)">
              {/* Foliage */}
              <ellipse cx="-15" cy="-20" rx="14" ry="7" fill="#C8A84B" opacity="0.7" transform="rotate(-40 -15 -20)" />
              <ellipse cx="-25" cy="10" rx="12" ry="6" fill="#A84A63" opacity="0.6" transform="rotate(30 -25 10)" />

              {/* Large Soft Rose */}
              <circle cx="-5" cy="0" r="18" fill="#F8BFCB" />
              <circle cx="-7" cy="-2" r="13" fill="#D67584" />
              <circle cx="-4" cy="2" r="8" fill="#F9D9D2" />
              <circle cx="-5" cy="0" r="3" fill="#7A223B" />

              {/* Satellite Rose */}
              <circle cx="-10" cy="-22" r="11" fill="#F9D9D2" />
              <circle cx="-10" cy="-22" r="7" fill="#D67584" />
              <circle cx="-10" cy="-22" r="2.5" fill="#C8A84B" />
            </g>

            {/* Right Floral Sprigs on Wreath */}
            <g transform="translate(265, 120)">
              <ellipse cx="15" cy="-15" rx="13" ry="6" fill="#C8A84B" opacity="0.7" transform="rotate(40 15 -15)" />
              <ellipse cx="20" cy="15" rx="11" ry="5" fill="#A84A63" opacity="0.6" transform="rotate(-30 20 15)" />

              {/* Rose Gold Blossom */}
              <circle cx="5" cy="0" r="16" fill="#F8BFCB" />
              <circle cx="7" cy="-2" r="11" fill="#D67584" />
              <circle cx="4" cy="2" r="6" fill="#F9D9D2" />
              <circle cx="5" cy="0" r="2.5" fill="#7A223B" />

              <circle cx="10" cy="20" r="10" fill="#F9D9D2" />
              <circle cx="10" cy="20" r="6" fill="#D67584" />
            </g>

            {/* Top Wreath Gold Sparkles & Foliage */}
            <g transform="translate(200, 48)">
              <path d="M-15 0 C-5 -10 5 -10 15 0" stroke="#C8A84B" strokeWidth="1.5" />
              <circle cx="0" cy="-6" r="3" fill="#C8A84B" />
            </g>
          </svg>
        </div>
      )
    },
    {
      id: 'midnight' as ThemeId,
      name: 'Midnight Blue',
      description: 'Dramatic, sophisticated and enchanting. Made for a night to remember.',
      headerBg: '#0F1E36',
      swatches: ['#0F1E36', '#4A607A', '#D8D3D6', '#C8A84B'],
      renderArtwork: () => (
        <div className="relative w-full h-44 sm:h-52 overflow-hidden bg-[#0A1124] flex items-center justify-center">
          {/* Deep Twilight Celestial Starry Sky */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#060B18] via-[#0F1E36] to-[#081226]" />
          
          {/* Sparkling Stardust Nebula Glow */}
          <div className="absolute top-1/3 right-1/4 w-36 h-36 bg-[#2B4C7E]/40 rounded-full blur-2xl" />
          <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-[#C8A84B]/20 rounded-full blur-2xl" />

          {/* SVG Luminous Golden Crescent Moon & Constellations */}
          <svg viewBox="0 0 400 240" className="w-full h-full object-contain relative z-10" fill="none">
            {/* Constellation Dots & Fine Lines */}
            <circle cx="60" cy="50" r="1.5" fill="#FFFFFF" opacity="0.9" />
            <circle cx="95" cy="70" r="1" fill="#FFFFFF" opacity="0.7" />
            <circle cx="140" cy="45" r="2" fill="#E2C873" opacity="0.9" />
            <circle cx="180" cy="80" r="1" fill="#FFFFFF" opacity="0.8" />
            <circle cx="80" cy="180" r="1.5" fill="#FFFFFF" opacity="0.8" />
            <circle cx="120" cy="200" r="1" fill="#FFFFFF" opacity="0.6" />
            <circle cx="220" cy="190" r="1.5" fill="#E2C873" opacity="0.9" />
            <circle cx="340" cy="180" r="1.5" fill="#FFFFFF" opacity="0.8" />
            
            <line x1="60" y1="50" x2="95" y2="70" stroke="#FFFFFF" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.4" />
            <line x1="95" y1="70" x2="140" y2="45" stroke="#FFFFFF" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.4" />

            {/* Glowing Golden Crescent Moon on Top Left */}
            <g transform="translate(135, 80) scale(1.15)">
              {/* Moon Glow Aura */}
              <circle cx="0" cy="0" r="26" fill="#C8A84B" opacity="0.15" />
              
              {/* Crescent Moon Path */}
              <path
                d="M 12 -24 A 26 26 0 1 0 12 24 A 20 20 0 1 1 12 -24 Z"
                fill="url(#moonGoldGrad)"
                stroke="#FFE7A3"
                strokeWidth="0.8"
              />

              {/* Sparkling 4-Point Starlight near Moon */}
              <g transform="translate(24, 18) scale(0.8)">
                <path d="M 0 -12 Q 0 0 -12 0 Q 0 0 0 12 Q 0 0 12 0 Q 0 0 0 -12 Z" fill="#FFE7A3" />
                <circle cx="0" cy="0" r="2" fill="#FFFFFF" />
              </g>
            </g>

            {/* Cascading Golden Starlight Botanical Branch on Right */}
            <g transform="translate(320, 110)">
              <path d="M -10 -70 Q 20 0, -30 80" stroke="#C8A84B" strokeWidth="1.8" strokeLinecap="round" />
              
              {/* Golden Leaf Constellations */}
              <ellipse cx="5" cy="-45" rx="10" ry="4" fill="#C8A84B" transform="rotate(25 5 -45)" />
              <ellipse cx="-8" cy="-25" rx="8" ry="4" fill="#FFE7A3" transform="rotate(-35 -8 -25)" />
              <ellipse cx="12" cy="5" rx="10" ry="5" fill="#C8A84B" transform="rotate(15 12 5)" />
              <ellipse cx="-15" cy="30" rx="9" ry="4" fill="#FFE7A3" transform="rotate(-25 -15 30)" />
              <ellipse cx="-10" cy="60" rx="8" ry="4" fill="#C8A84B" transform="rotate(30 -10 60)" />

              {/* Radiant Starbursts */}
              <g transform="translate(-10, -5)">
                <path d="M 0 -10 Q 0 0 -10 0 Q 0 0 0 10 Q 0 0 10 0 Q 0 0 0 -10 Z" fill="#FFE7A3" />
                <circle cx="0" cy="0" r="1.5" fill="#FFF" />
              </g>
              <g transform="translate(15, 45) scale(0.6)">
                <path d="M 0 -10 Q 0 0 -10 0 Q 0 0 0 10 Q 0 0 10 0 Q 0 0 0 -10 Z" fill="#FFE7A3" />
              </g>
            </g>

            <defs>
              <linearGradient id="moonGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF2B8" />
                <stop offset="50%" stopColor="#E2C873" />
                <stop offset="100%" stopColor="#C8A84B" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )
    }
  ];

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16 text-[#3B0B1F]">
      {/* Surrounding Soft Watercolor Flower Corner Borders (matching user reference screenshot) */}
      {showFullPageDecorations && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
          {/* Top-Left Floral Bouquet */}
          <div className="absolute -top-6 -left-6 w-36 h-36 sm:w-56 sm:h-56 opacity-85">
            <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
              <ellipse cx="40" cy="60" rx="25" ry="12" fill="#74967E" transform="rotate(-30 40 60)" opacity="0.8" />
              <ellipse cx="60" cy="30" rx="22" ry="10" fill="#C8A84B" transform="rotate(40 60 30)" opacity="0.75" />
              <circle cx="70" cy="70" r="30" fill="#FAD2D8" />
              <circle cx="65" cy="65" r="22" fill="#E59EAF" />
              <circle cx="72" cy="72" r="14" fill="#C86D84" />
              <circle cx="70" cy="70" r="5" fill="#5A0A21" />
              <circle cx="120" cy="40" r="18" fill="#FAD2D8" />
              <circle cx="118" cy="38" r="12" fill="#E59EAF" />
            </svg>
          </div>

          {/* Top-Right Floral Bouquet */}
          <div className="absolute -top-6 -right-6 w-36 h-36 sm:w-56 sm:h-56 opacity-85 scale-x-[-1]">
            <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
              <ellipse cx="40" cy="60" rx="25" ry="12" fill="#74967E" transform="rotate(-30 40 60)" opacity="0.8" />
              <ellipse cx="60" cy="30" rx="22" ry="10" fill="#C8A84B" transform="rotate(40 60 30)" opacity="0.75" />
              <circle cx="70" cy="70" r="30" fill="#FAD2D8" />
              <circle cx="65" cy="65" r="22" fill="#E59EAF" />
              <circle cx="72" cy="72" r="14" fill="#C86D84" />
              <circle cx="70" cy="70" r="5" fill="#5A0A21" />
              <circle cx="120" cy="40" r="18" fill="#FAD2D8" />
              <circle cx="118" cy="38" r="12" fill="#E59EAF" />
            </svg>
          </div>

          {/* Bottom-Left Floral Bouquet */}
          <div className="absolute -bottom-6 -left-6 w-36 h-36 sm:w-56 sm:h-56 opacity-85 scale-y-[-1]">
            <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
              <ellipse cx="40" cy="60" rx="25" ry="12" fill="#74967E" transform="rotate(-30 40 60)" opacity="0.8" />
              <circle cx="70" cy="70" r="30" fill="#FAD2D8" />
              <circle cx="65" cy="65" r="22" fill="#E59EAF" />
              <circle cx="72" cy="72" r="14" fill="#C86D84" />
            </svg>
          </div>

          {/* Bottom-Right Floral Bouquet */}
          <div className="absolute -bottom-6 -right-6 w-36 h-36 sm:w-56 sm:h-56 opacity-85 scale-[-1]">
            <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
              <ellipse cx="40" cy="60" rx="25" ry="12" fill="#74967E" transform="rotate(-30 40 60)" opacity="0.8" />
              <circle cx="70" cy="70" r="30" fill="#FAD2D8" />
              <circle cx="65" cy="65" r="22" fill="#E59EAF" />
              <circle cx="72" cy="72" r="14" fill="#C86D84" />
            </svg>
          </div>
        </div>
      )}

      {/* Center Section Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto mb-10 sm:mb-14 relative z-10">
        {/* Top Decorative Gold Leaf & Heart Divider */}
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

        {/* Title in Romantic Wine/Burgundy Serif */}
        <h2 className="font-serif-heading text-3xl sm:text-5xl font-normal text-[#5A0A21] tracking-tight">
          Choose Your Theme
        </h2>

        {/* Subtitle */}
        <p className="font-body text-xs sm:text-base text-[#3B0B1F]/75 max-w-lg mx-auto leading-relaxed">
          Select a theme to create a wedding invitation as unique as your love story.
        </p>

        {/* Bottom Decorative Gold Leaf & Heart Divider */}
        <div className="flex items-center justify-center gap-2 select-none pt-1">
          <svg width="40" height="16" viewBox="0 0 40 16" fill="none" className="text-[#C8A84B]">
            <path d="M40 8 C30 4, 15 12, 0 8" stroke="currentColor" strokeWidth="1.2" />
            <ellipse cx="12" cy="4" rx="4" ry="2" fill="currentColor" opacity="0.8" />
          </svg>
          <div className="text-[#C8A84B] flex items-center justify-center">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="#C8A84B">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <svg width="40" height="16" viewBox="0 0 40 16" fill="none" className="text-[#C8A84B] scale-x-[-1]">
            <path d="M40 8 C30 4, 15 12, 0 8" stroke="currentColor" strokeWidth="1.2" />
            <ellipse cx="12" cy="4" rx="4" ry="2" fill="currentColor" opacity="0.8" />
          </svg>
        </div>
      </div>

      {/* 2x2 Grid of Luxury Theme Cards (Exact match to Reference Screenshot) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 relative z-10">
        {themes.map((theme) => {
          const isSelected = selectedThemeId === theme.id;
          const presetData = THEME_PRESETS[theme.id];

          return (
            <motion.div
              key={theme.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              onClick={() => onSelectTheme(theme.id)}
              className={`bg-white rounded-3xl overflow-hidden border-2 transition-all duration-300 shadow-lg cursor-pointer flex flex-col relative group ${
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

              {/* Theme Illustrated Artwork Canvas */}
              <div className="relative">
                {theme.renderArtwork()}
              </div>

              {/* Solid Color-Blocked Title Banner */}
              <div
                className="py-3 px-4 text-center transition-colors shadow-inner"
                style={{ backgroundColor: theme.headerBg }}
              >
                <h3 className="font-serif-heading text-lg sm:text-xl font-normal text-white tracking-wide">
                  {theme.name}
                </h3>
              </div>

              {/* Body: Description & 4-Swatch Color Palette */}
              <div className="p-5 sm:p-6 text-center space-y-4 flex-1 flex flex-col justify-between bg-white">
                <p className="font-body text-xs sm:text-sm text-[#3B0B1F]/75 leading-relaxed min-h-[2.5rem]">
                  {theme.description}
                </p>

                {/* 4 Rounded Rectangular Color Swatches */}
                <div className="flex items-center justify-center gap-2 pt-1">
                  {theme.swatches.map((color, idx) => (
                    <div
                      key={idx}
                      className="w-10 h-7 rounded-lg border border-black/10 shadow-sm transition-transform hover:scale-110"
                      style={{ backgroundColor: color }}
                      title={`Color ${idx + 1}: ${color}`}
                    />
                  ))}
                </div>

                {/* Optional Preview / Select Actions */}
                <div className="pt-2 flex items-center justify-center gap-3 border-t border-gray-100 mt-2">
                  {onPreviewTheme && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPreviewTheme(presetData);
                      }}
                      className="text-[11px] font-semibold text-[#A87B1B] hover:text-[#5A0A21] flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Live Preview</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectTheme(theme.id);
                    }}
                    className={`text-[11px] font-bold px-4 py-1.5 rounded-full transition-all flex items-center gap-1 cursor-pointer ${
                      isSelected
                        ? 'bg-[#5A0A21] text-[#FAF0F3] shadow-xs'
                        : 'bg-[#FAF0F3] text-[#5A0A21] hover:bg-[#5A0A21] hover:text-white'
                    }`}
                  >
                    <span>{isSelected ? 'Active Theme' : 'Choose Theme'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Footer Note with Lock Icon (as in user's image) */}
      <div className="mt-12 sm:mt-16 text-center relative z-10">
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#3B0B1F]/80 font-body bg-white/70 backdrop-blur-xs px-5 py-2.5 rounded-full border border-[#C8A84B]/30 shadow-xs">
          <Lock className="w-4 h-4 text-[#5A0A21] shrink-0" />
          <span>All themes are fully customizable in our invitation builder.</span>
        </div>
      </div>
    </div>
  );
}
