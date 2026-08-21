import React, { useState, useEffect } from 'react';
import { WeddingConfig } from '../types';
import { THEME_PRESETS } from '../utils/themePresets';
import { CheckCircle2 } from 'lucide-react';

interface DateCardProps {
  config: WeddingConfig;
  onOpenRSVP: () => void;
}

export const DateCard: React.FC<DateCardProps> = ({ config, onOpenRSVP }) => {
  const theme = THEME_PRESETS[config.themeId] || THEME_PRESETS.bordeaux;
  const colors = theme.colors;

  // Robust Target Date calculation
  const getTargetTimestamp = () => {
    if (config.countdownDate) {
      const parsed = new Date(config.countdownDate).getTime();
      if (!isNaN(parsed)) return parsed;
    }
    if (config.dateGC) {
      const parsed = new Date(config.dateGC).getTime();
      if (!isNaN(parsed)) return parsed;
    }
    return new Date('2026-05-09T14:00:00').getTime();
  };

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTime = () => {
      const targetTime = getTargetTimestamp();
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [config.countdownDate, config.dateGC]);

  // Extract month, day, and year for big display
  const getParsedDateDisplay = () => {
    const dateObj = new Date(getTargetTimestamp());
    const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    
    // Fallback if Date object parsing produced NaN
    if (isNaN(dateObj.getTime())) {
      return { monthName: 'MAY', dayNum: '09', yearNum: '2026' };
    }

    const monthName = months[dateObj.getMonth()];
    const dayNum = String(dateObj.getDate()).padStart(2, '0');
    const yearNum = String(dateObj.getFullYear());
    return { monthName, dayNum, yearNum };
  };

  const { monthName, dayNum, yearNum } = getParsedDateDisplay();

  return (
    <section id="date-card-section" className="py-12 px-4 sm:px-6 max-w-3xl mx-auto">
      {/* Centered Bordered Save the Date Card */}
      <div
        className="relative bg-white rounded-3xl border-2 p-8 sm:p-12 text-center shadow-2xl overflow-hidden group transition-colors duration-500"
        style={{ borderColor: colors.gold + '90' }}
      >
        {/* Decorative Inner Corner Accents */}
        <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2" style={{ borderColor: colors.gold }} />
        <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2" style={{ borderColor: colors.gold }} />
        <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2" style={{ borderColor: colors.gold }} />
        <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2" style={{ borderColor: colors.gold }} />

        {/* Card Header */}
        <p className="font-body text-xs uppercase tracking-[0.3em] font-semibold mb-2" style={{ color: colors.blush }}>
          Save the Date
        </p>

        {/* Large Single-Month Typography */}
        <div className="my-6">
          <span
            className="block font-serif-heading text-4xl sm:text-6xl font-normal tracking-wider uppercase"
            style={{ color: colors.primary }}
          >
            {monthName}
          </span>
          <div className="flex items-center justify-center gap-4 my-2">
            <span className="h-[2px] w-12" style={{ backgroundColor: colors.gold }} />
            <span
              className="font-serif-heading text-6xl sm:text-8xl font-semibold leading-none"
              style={{ color: colors.gold }}
            >
              {dayNum}
            </span>
            <span className="h-[2px] w-12" style={{ backgroundColor: colors.gold }} />
          </div>
          <span
            className="block font-serif-heading text-2xl sm:text-3xl tracking-widest font-light"
            style={{ color: colors.primary }}
          >
            {yearNum}
          </span>
        </div>

        <p className="font-quote italic text-base sm:text-lg mb-8 max-w-md mx-auto leading-relaxed" style={{ color: colors.primary + 'D0' }}>
          {config.scripture ? `"${config.scripture}"` : "We request the honor of your presence as we exchange our vows of everlasting love and celebrate our holy matrimony."}
        </p>

        {/* Countdown Timer Grid */}
        <div
          className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto mb-8 p-4 rounded-2xl border"
          style={{
            backgroundColor: colors.blushPale,
            borderColor: colors.blush + '40'
          }}
        >
          <div className="p-2 sm:p-3 text-center">
            <span className="block font-body text-2xl sm:text-4xl font-semibold" style={{ color: colors.primary }}>
              {timeLeft.days}
            </span>
            <span className="font-body text-[10px] sm:text-xs uppercase tracking-wider font-medium" style={{ color: colors.blush }}>
              Days
            </span>
          </div>
          <div className="p-2 sm:p-3 text-center border-l" style={{ borderColor: colors.blush + '30' }}>
            <span className="block font-body text-2xl sm:text-4xl font-semibold" style={{ color: colors.primary }}>
              {timeLeft.hours}
            </span>
            <span className="font-body text-[10px] sm:text-xs uppercase tracking-wider font-medium" style={{ color: colors.blush }}>
              Hours
            </span>
          </div>
          <div className="p-2 sm:p-3 text-center border-l" style={{ borderColor: colors.blush + '30' }}>
            <span className="block font-body text-2xl sm:text-4xl font-semibold" style={{ color: colors.primary }}>
              {timeLeft.minutes}
            </span>
            <span className="font-body text-[10px] sm:text-xs uppercase tracking-wider font-medium" style={{ color: colors.blush }}>
              Mins
            </span>
          </div>
          <div className="p-2 sm:p-3 text-center border-l" style={{ borderColor: colors.blush + '30' }}>
            <span className="block font-body text-2xl sm:text-4xl font-semibold" style={{ color: colors.gold }}>
              {timeLeft.seconds}
            </span>
            <span className="font-body text-[10px] sm:text-xs uppercase tracking-wider font-medium" style={{ color: colors.blush }}>
              Secs
            </span>
          </div>
        </div>

        {/* Action Button (RSVP Online) */}
        <div className="flex justify-center">
          <button
            onClick={onOpenRSVP}
            id="rsvp-now-btn"
            className="inline-flex items-center justify-center gap-2 px-10 py-3.5 rounded-full font-body text-xs font-semibold uppercase tracking-wider shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
            style={{
              backgroundColor: colors.primary,
              color: colors.blushPale
            }}
          >
            <CheckCircle2 className="w-4 h-4" style={{ color: colors.gold }} />
            <span>RSVP Online</span>
          </button>
        </div>
      </div>
    </section>
  );
};


