import React from 'react';
import { WeddingConfig } from '../types';
import { THEME_PRESETS } from '../utils/themePresets';
import { Clock, MapPin } from 'lucide-react';

interface TimelineSectionProps {
  config: WeddingConfig;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({ config }) => {
  const theme = THEME_PRESETS[config.themeId] || THEME_PRESETS.bordeaux;
  const colors = theme.colors;

  const scheduleList = config.schedule && config.schedule.length > 0 ? config.schedule : [
    {
      time: '7:00 – 8:00',
      title: 'አጃቢዎች በሙሽራው ቤት ይገኛሉ',
      location: "Groom's Residence / የሙሽራው ቤት",
      description: "Groomsmen Gather at Groom's Home"
    },
    {
      time: '9:00 – 9:30',
      title: 'ጉዞ ወደ ሙሽሪት ቤት (አድራሻ)',
      location: "Bride's Residence / የሙሽሪት ቤት",
      description: "Travel to Bride's Home"
    },
    {
      time: '10:30 – 12:00',
      title: 'የቃልኪዳን ስነስርዓት (ቅድስት ሥላሴ ካቴድራል)',
      location: 'ቅድስት ሥላሴ ካቴድራል (Holy Trinity Cathedral, Addis Ababa)',
      description: 'Vows & Worship Program'
    },
    {
      time: '1:00 – 2:30',
      title: 'የምሳ ፕሮግራም ግዮን ሆቴል',
      location: 'ግዮን ሆቴል (Ghion Hotel, Addis Ababa)',
      description: 'Lunch Reception at Ghion Hotel'
    },
    {
      time: '2:30 – 6:00',
      title: 'የኬክ ቆረሳ፣ ጭፈራ እና ፎቶ ፕሮግራም ግዮን ሆቴል',
      location: 'ግዮን ሆቴል (Ghion Hotel, Addis Ababa)',
      description: 'Cake, Music & Photography'
    }
  ];

  return (
    <section id="timeline-section" className="py-16 px-4 sm:px-6 max-w-3xl mx-auto">
      {/* Section Title */}
      <div className="text-center mb-14">
        <p className="font-body text-xs uppercase tracking-[0.3em] font-semibold mb-2" style={{ color: colors.blush }}>
          Day of Celebration
        </p>
        <h2 className="font-serif-heading text-3xl sm:text-4xl font-normal" style={{ color: colors.primary }}>
          Wedding Day Schedule
        </h2>
        <div className="w-16 h-[2px] mx-auto mt-4" style={{ backgroundColor: colors.gold }} />
      </div>

      {/* Vertical Line with Diamond Gem Bullets */}
      <div
        className="relative pl-6 sm:pl-10 border-l-2 space-y-8 my-8 transition-colors duration-500"
        style={{ borderColor: colors.gold + '60' }}
      >
        {scheduleList.map((evt, idx) => (
          <div key={idx} className="relative group">
            {/* Diamond Gem Bullet on the Vertical Line */}
            <div
              className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rotate-45 border-2 shadow-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-125 cursor-pointer"
              style={{
                backgroundColor: colors.primary,
                borderColor: colors.gold
              }}
            >
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.blushPale }} />
            </div>

            {/* Event Content Box */}
            <div
              className="rounded-2xl p-6 shadow-md border transition-all hover:shadow-lg"
              style={{
                backgroundColor: '#FFFDF9',
                borderColor: colors.gold + '50'
              }}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span
                  className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full font-body text-xs font-bold border"
                  style={{
                    backgroundColor: colors.blushPale || '#FAF0F3',
                    color: colors.primary,
                    borderColor: colors.gold + '60'
                  }}
                >
                  <Clock className="w-3.5 h-3.5 text-[#C8A84B]" />
                  {evt.time}
                </span>
                <span className="font-body text-xs font-semibold flex items-center gap-1 text-[#8C5A6A]">
                  <MapPin className="w-3.5 h-3.5 text-[#C8A84B]" />
                  {evt.location}
                </span>
              </div>

              <h3 className="font-serif-heading text-xl font-normal mb-1.5" style={{ color: colors.primary }}>
                {evt.title}
              </h3>
              <p className="font-body text-sm leading-relaxed text-[#593E46]">
                {evt.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

