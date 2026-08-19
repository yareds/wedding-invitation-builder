import React from 'react';
import { motion } from 'motion/react';
import { WeddingConfig } from '../types';
import { THEME_PRESETS } from '../utils/themePresets';
import { BotanicalFrame } from './BotanicalFrame';
import { Calendar, MapPin } from 'lucide-react';
import { FloatingSparkles } from './AnimatedHeroText';

interface HeroSectionProps {
  config: WeddingConfig;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ config }) => {
  const theme = THEME_PRESETS[config.themeId] || THEME_PRESETS.bordeaux;
  const colors = theme.colors;

  const groomInit = (config.groomEth || config.groomEn || 'የሙሽራው ስም').trim()[0] || 'የ';
  const brideInit = (config.brideEth || config.brideEn || 'የሙሽሪት ስም').trim()[0] || 'የ';

  const groomName = config.groomEth || config.groomEn || 'የሙሽራው ስም';
  const brideName = config.brideEth || config.brideEn || 'የሙሽሪት ስም';

  return (
    <section
      id="hero-section"
      className="relative pt-20 pb-16 px-4 sm:px-6 md:px-8 overflow-hidden text-center transition-colors duration-500"
      style={{
        backgroundColor: colors.bg,
        color: colors.primary
      }}
    >
      {/* Ambient Floating Sparkles */}
      <FloatingSparkles color={colors.gold || '#C8A84B'} />

      {/* Background Image Layer if custom hero image is uploaded */}
      {config.heroImg && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={config.heroImg}
            alt="Hero Background"
            className="w-full h-full object-cover object-center opacity-70 transition-opacity duration-700 pointer-events-none"
          />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: colors.heroOv || 'rgba(0,0,0,0.45)' }}
          />
        </div>
      )}

      {/* Corner Botanical SVG Frames */}
      <BotanicalFrame position="top-left" themeId={config.themeId} frameStyle={config.frameStyle} className="absolute top-2 left-2 sm:top-6 sm:left-6 z-10" colorMode="gold" />
      <BotanicalFrame position="top-right" themeId={config.themeId} frameStyle={config.frameStyle} className="absolute top-2 right-2 sm:top-6 sm:right-6 z-10" colorMode="gold" />

      <div className={`max-w-4xl mx-auto relative z-10 flex flex-col items-center ${config.heroImg ? 'text-white' : ''}`}>
        {/* Monogram Circle in Hero */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-28 h-28 sm:w-36 sm:h-36 mb-6 group cursor-pointer"
        >
          <div
            className="w-full h-full rounded-full border-2 p-2 shadow-2xl transition-all duration-500 hover:scale-105 flex items-center justify-center hover:shadow-[0_0_25px_rgba(200,168,75,0.3)]"
            style={{
              borderColor: colors.gold,
              backgroundColor: 'transparent'
            }}
          >
            {/* Inner Decorative Bezel */}
            <div
              className="w-full h-full rounded-full border border-dashed flex items-center justify-center shadow-inner"
              style={{
                borderColor: colors.gold + '90',
                backgroundColor: 'transparent'
              }}
            >
              <div className="text-center">
                <span
                  className="font-serif-heading text-3xl sm:text-4xl font-light tracking-widest block"
                  style={{ color: colors.gold }}
                >
                  {groomInit}{' '}
                  <span className="font-serif-heading text-xl sm:text-2xl font-normal" style={{ color: colors.blushLt || '#E5A4B5' }}>
                    &amp;
                  </span>{' '}
                  {brideInit}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Couple Names (Amharic & English) */}
        <div className="mb-4 max-w-3xl">
          {/* Amharic Heading with Word-by-Word Motion Reveal */}
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif-heading text-3xl sm:text-5xl md:text-6xl font-normal leading-tight tracking-tight mb-2"
            style={{ color: '#FFFFFF' }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="inline-block"
            >
              {groomName}
            </motion.span>

            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="block font-quote italic text-2xl sm:text-4xl my-2 font-light text-gold-shimmer-light"
            >
              እና
            </motion.span>

            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="inline-block"
            >
              {brideName}
            </motion.span>
          </motion.h1>

          {/* English Sub-heading */}
          {(config.groomEn || config.brideEn) && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75 }}
              className="font-quote italic text-base sm:text-xl tracking-wide mt-2 opacity-95"
              style={{ color: '#FFFFFF' }}
            >
              {config.groomEn} &amp; {config.brideEn}
            </motion.p>
          )}
        </div>

        {/* Subtitle / Scripture Text */}
        {config.scripture && config.scripture !== 'ሁሉን ያዘጋጀ ግን እግዚአብሔር ነው።' && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="font-serif-heading text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-8 opacity-90 tracking-wide"
            style={{ color: '#FFFFFF' }}
          >
            {config.scripture}
          </motion.p>
        )}

        {/* Key Event Date & Location Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-body tracking-wider uppercase font-medium"
          style={{
            color: '#FFFFFF'
          }}
        >
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-sm hover:border-[#C8A84B]/60 transition-colors">
            <Calendar className="w-4 h-4 text-gold-shimmer-light" />
            <span className="font-semibold">{config.dateGC || 'Saturday, May 09, 2026'}</span>
          </div>
          <span className="hidden sm:inline" style={{ color: colors.gold }}>•</span>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-sm hover:border-[#C8A84B]/60 transition-colors">
            <MapPin className="w-4 h-4 text-gold-shimmer-light" />
            <span>{config.dateEC || 'ግንቦት 01, 2018 ዓ.ም'}</span>
          </div>
        </motion.div>
      </div>

      {/* Banner Bottom Botanical Divider */}
      <BotanicalFrame position="banner-bottom" className="mt-12 z-10" colorMode="gold" />
    </section>
  );
};

