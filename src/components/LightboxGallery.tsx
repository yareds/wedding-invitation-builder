import React, { useState, useEffect } from 'react';
import { WeddingConfig, GalleryPhoto } from '../types';
import { THEME_PRESETS } from '../utils/themePresets';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface LightboxGalleryProps {
  config: WeddingConfig;
}

export const LightboxGallery: React.FC<LightboxGalleryProps> = ({ config }) => {
  const theme = THEME_PRESETS[config.themeId] || THEME_PRESETS.bordeaux;
  const colors = theme.colors;

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const imagesList = config.galleryImgs && config.galleryImgs.length > 0 ? config.galleryImgs : [
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80'
  ];

  // Keyboard navigation support in lightbox
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedIndex(null);
      } else if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) => (prev !== null ? (prev + 1) % imagesList.length : 0));
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) =>
          prev !== null ? (prev - 1 + imagesList.length) % imagesList.length : 0
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, imagesList.length]);

  // Touch swipe support in lightbox
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || selectedIndex === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      setSelectedIndex((prev) => (prev !== null ? (prev + 1) % imagesList.length : 0));
    } else if (diff < -50) {
      setSelectedIndex((prev) =>
        prev !== null ? (prev - 1 + imagesList.length) % imagesList.length : 0
      );
    }
    setTouchStartX(null);
  };

  const row1Images = imagesList.length >= 2 ? imagesList.filter((_, i) => i % 2 === 0) : imagesList;
  const row2Images = imagesList.length >= 2 ? imagesList.filter((_, i) => i % 2 === 1) : imagesList;

  // Quadruple arrays for seamless infinite marquee loop
  const marqueeRow1 = [...row1Images, ...row1Images, ...row1Images, ...row1Images];
  const marqueeRow2 = [...row2Images, ...row2Images, ...row2Images, ...row2Images];

  return (
    <section id="gallery-section" className="py-16 overflow-hidden max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-10 px-4">
        <p className="font-body text-xs uppercase tracking-[0.3em] font-semibold mb-2" style={{ color: colors.blush }}>
          Shared Moments
        </p>
        <h2 className="font-serif-heading text-3xl sm:text-4xl font-normal" style={{ color: colors.primary }}>
          Love Story Gallery
        </h2>
        <p className="font-quote text-xs italic mt-2 opacity-80" style={{ color: colors.primary }}>
          Hover to pause scrolling • Click any photo to expand
        </p>
        <div className="w-16 h-[2px] mx-auto mt-4" style={{ backgroundColor: colors.gold }} />
      </div>

      {/* Dual Row Infinite Animated Marquee */}
      <div className="space-y-6">
        {/* Top Row: Scrolls to the Right */}
        <div className="overflow-hidden py-2 relative">
          <div className="animate-scroll-right gap-4 px-2">
            {marqueeRow1.map((url, idx) => {
              const origIndex = imagesList.indexOf(url);
              return (
                <div
                  key={`r1-${idx}`}
                  onClick={() => setSelectedIndex(origIndex >= 0 ? origIndex : 0)}
                  className="group relative w-64 sm:w-80 aspect-[4/3] shrink-0 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border cursor-pointer"
                  style={{ borderColor: colors.blush + '40' }}
                >
                  <img
                    src={url}
                    alt={`Gallery photo ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white"
                    style={{
                      background: `linear-gradient(to top, ${colors.primary}E0, transparent)`
                    }}
                  >
                    <span className="font-serif-heading text-sm font-normal" style={{ color: colors.gold }}>
                      {config.groomEn || 'Sebastian'} &amp; {config.brideEn || 'Amara'}
                    </span>
                    <span className="font-body text-[11px] opacity-80">Click to expand</span>
                  </div>
                  <div
                    className="absolute top-3 right-3 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: colors.primary + 'AA', color: colors.gold }}
                  >
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Row: Scrolls to the Left */}
        <div className="overflow-hidden py-2 relative">
          <div className="animate-scroll-left gap-4 px-2">
            {marqueeRow2.map((url, idx) => {
              const origIndex = imagesList.indexOf(url);
              return (
                <div
                  key={`r2-${idx}`}
                  onClick={() => setSelectedIndex(origIndex >= 0 ? origIndex : 0)}
                  className="group relative w-64 sm:w-80 aspect-[4/3] shrink-0 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border cursor-pointer"
                  style={{ borderColor: colors.blush + '40' }}
                >
                  <img
                    src={url}
                    alt={`Gallery photo ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white"
                    style={{
                      background: `linear-gradient(to top, ${colors.primary}E0, transparent)`
                    }}
                  >
                    <span className="font-serif-heading text-sm font-normal" style={{ color: colors.gold }}>
                      {config.groomEn || 'Sebastian'} &amp; {config.brideEn || 'Amara'}
                    </span>
                    <span className="font-body text-[11px] opacity-80">Click to expand</span>
                  </div>
                  <div
                    className="absolute top-3 right-3 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: colors.primary + 'AA', color: colors.gold }}
                  >
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 backdrop-blur-md flex items-center justify-center p-4"
          style={{ backgroundColor: colors.primary + 'F0' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-6 right-6 p-3 rounded-full border transition-all cursor-pointer z-50 shadow-xl"
            style={{
              backgroundColor: colors.primary,
              borderColor: colors.gold,
              color: colors.gold
            }}
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          <button
            onClick={() =>
              setSelectedIndex((prev) =>
                prev !== null ? (prev - 1 + imagesList.length) % imagesList.length : 0
              )
            }
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full border transition-all cursor-pointer z-50"
            style={{
              backgroundColor: colors.primary + 'CC',
              borderColor: colors.gold + '80',
              color: colors.gold
            }}
            aria-label="Previous Photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={() =>
              setSelectedIndex((prev) =>
                prev !== null ? (prev + 1) % imagesList.length : 0
              )
            }
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full border transition-all cursor-pointer z-50"
            style={{
              backgroundColor: colors.primary + 'CC',
              borderColor: colors.gold + '80',
              color: colors.gold
            }}
            aria-label="Next Photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Photo View */}
          <div className="max-w-4xl w-full flex flex-col items-center">
            <div className="relative max-h-[75vh] rounded-2xl overflow-hidden border-2 shadow-2xl bg-black" style={{ borderColor: colors.gold }}>
              <img
                src={imagesList[selectedIndex]}
                alt={`Photo ${selectedIndex + 1}`}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] w-auto object-contain select-none"
              />
            </div>

            {/* Caption */}
            <div className="mt-4 text-center">
              <h3 className="font-serif-heading text-xl sm:text-2xl font-normal" style={{ color: colors.gold }}>
                Photo {selectedIndex + 1} of {imagesList.length}
              </h3>
              <p className="font-body text-xs sm:text-sm text-white/80">
                {config.groomEn || 'Sebastian'} &amp; {config.brideEn || 'Amara'}
              </p>
              <p className="font-quote text-[11px] mt-1" style={{ color: colors.blush }}>
                Swipe left/right or use arrow keys to browse
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

