import React from 'react';
import { WeddingConfig } from '../types';
import { THEME_PRESETS } from '../utils/themePresets';
import { PhoneCall } from 'lucide-react';

interface ContactSectionProps {
  config: WeddingConfig;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ config }) => {
  const theme = THEME_PRESETS[config.themeId] || THEME_PRESETS.bordeaux;
  const colors = theme.colors;
  const contactText = config.contactInfo?.trim() || '+251 91 123 4567 / +251 92 234 5678 · info@wedding.et';

  return (
    <section
      id="contact-section"
      className="py-8 px-4 text-center border-t transition-colors duration-500"
      style={{
        backgroundColor: colors.footerBg || colors.primary,
        borderColor: colors.gold + '40',
        color: '#FAF0F3'
      }}
    >
      <div className="max-w-2xl mx-auto space-y-3">
        <div
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest border shadow-xs"
          style={{
            borderColor: colors.gold + '60',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            color: colors.gold
          }}
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Contact &amp; Assistance Info</span>
        </div>
        <p className="font-body text-xs sm:text-sm leading-relaxed whitespace-pre-line opacity-95 text-[#FAF0F3]">
          {contactText}
        </p>
      </div>
    </section>
  );
};
