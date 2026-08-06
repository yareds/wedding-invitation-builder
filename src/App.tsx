import React, { useState, useEffect } from 'react';
import { WeddingConfig, ThemeId } from './types';
import { DEFAULT_WEDDING_CONFIG, THEME_PRESETS } from './utils/themePresets';
import { LandingPage } from './components/LandingPage';
import { WeddingBuilder } from './components/WeddingBuilder';
import { OrderModal } from './components/OrderModal';
import { ProjectRegistryModal } from './components/ProjectRegistryModal';
import { SplashScreen } from './components/SplashScreen';
import { MusicPlayer } from './components/MusicPlayer';
import { HeroSection } from './components/HeroSection';
import { DateCard } from './components/DateCard';
import { DetailsSection } from './components/DetailsSection';
import { StoryQuoteSection } from './components/StoryQuoteSection';
import { TimelineSection } from './components/TimelineSection';
import { LightboxGallery } from './components/LightboxGallery';
import { RSVPModal } from './components/RSVPModal';
import { BotanicalFooter } from './components/BotanicalFooter';
import { romanticPiano } from './utils/audioEngine';
import { Eye, Smartphone, Monitor, ShoppingBag, Sparkles, FolderOpen, ShieldCheck, Lock, UserCheck, Home } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'builder'>('landing');
  const [config, setConfig] = useState<WeddingConfig>(DEFAULT_WEDDING_CONFIG);
  const [showSplash, setShowSplash] = useState<boolean>(false);
  const [isRSVPOpen, setIsRSVPOpen] = useState<boolean>(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);
  const [isRegistryOpen, setIsRegistryOpen] = useState<boolean>(false);
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');
  const [activeViewMode, setActiveViewMode] = useState<'split' | 'guest'>('split');

  const handleOpenInvitation = () => {
    setShowSplash(false);
    romanticPiano.start();
  };

  const handleStartBuilding = (presetThemeId?: ThemeId) => {
    if (presetThemeId && THEME_PRESETS[presetThemeId]) {
      setConfig((prev) => ({
        ...prev,
        themeId: presetThemeId
      }));
    }
    setCurrentPage('builder');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const theme = THEME_PRESETS[config.themeId] || THEME_PRESETS.bordeaux;
  const colors = theme.colors;

  // Render Marketing Landing Page by Default
  if (currentPage === 'landing') {
    return (
      <>
        <LandingPage
          onStartBuilding={handleStartBuilding}
          onOpenAdmin={() => setIsRegistryOpen(true)}
        />

        {/* Admin Studio Portal & Customer Projects Registry Modal */}
        <ProjectRegistryModal
          isOpen={isRegistryOpen}
          onClose={() => setIsRegistryOpen(false)}
          onLoadProject={(loadedConfig) => {
            setConfig(loadedConfig);
            setCurrentPage('builder');
          }}
          currentConfig={config}
        />
      </>
    );
  }

  // Render Wedding Invitation Builder Page
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-body selection:bg-[#D4849A] selection:text-white">
      {/* Top Application Bar */}
      <header className="bg-[#3B0B1F] text-[#FDF0F3] px-4 py-2.5 flex flex-wrap items-center justify-between border-b border-[#C8A84B]/40 shadow-md z-30 gap-2">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentPage('landing')}
            className="px-3 py-1.5 rounded-full bg-[#2D0817] border border-[#C8A84B]/40 text-[#FDF0F3] hover:text-[#C8A84B] font-body text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:border-[#C8A84B]"
            title="Return to Studio Landing Homepage"
          >
            <Home className="w-3.5 h-3.5 text-[#C8A84B]" />
            <span>Studio Homepage</span>
          </button>

          <div className="flex items-center gap-2 border-l border-[#C8A84B]/30 pl-3">
            <div className="w-7 h-7 rounded-full border border-[#C8A84B] flex items-center justify-center bg-[#2D0817]">
              <Sparkles className="w-3.5 h-3.5 text-[#C8A84B]" />
            </div>
            <div>
              <span className="font-serif-heading text-sm font-semibold tracking-wider text-[#FDF0F3]">
                Addis Wedding Studio
              </span>
              <span className="hidden sm:inline-block text-[10px] text-[#D4849A] ml-2 font-mono">
                [Live Customizer]
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mode switch: Split Builder vs Full Guest Preview */}
          <div className="flex items-center bg-[#2D0817] p-1 rounded-full border border-[#C8A84B]/30 text-xs font-body">
            <button
              onClick={() => setActiveViewMode('split')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                activeViewMode === 'split' ? 'bg-[#C8A84B] text-[#3B0B1F] font-bold shadow-sm' : 'text-[#FDF0F3]/70 hover:text-white'
              }`}
            >
              Builder Mode
            </button>
            <button
              onClick={() => setActiveViewMode('guest')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                activeViewMode === 'guest' ? 'bg-[#C8A84B] text-[#3B0B1F] font-bold shadow-sm' : 'text-[#FDF0F3]/70 hover:text-white'
              }`}
            >
              Full Page View
            </button>
          </div>

          {/* Admin Studio Portal Trigger */}
          <button
            onClick={() => setIsRegistryOpen(true)}
            id="top-admin-btn"
            className="px-3.5 py-1.5 rounded-full bg-[#2D0817] border border-[#C8A84B]/60 text-[#C8A84B] hover:text-white font-body text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            title="Log in"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#C8A84B]" />
            <span>Log in</span>
          </button>

          <button
            onClick={() => setIsOrderModalOpen(true)}
            id="top-order-btn"
            className="px-4 py-1.5 rounded-full bg-[#C8A84B] text-[#3B0B1F] font-body text-xs font-semibold uppercase tracking-wider hover:bg-[#E2C873] transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Order &amp; Pay</span>
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Left Sidebar Builder Controls (visible in split mode) */}
        {activeViewMode === 'split' && (
          <WeddingBuilder
            config={config}
            onChangeConfig={setConfig}
            onOpenOrderModal={() => setIsOrderModalOpen(true)}
            deviceMode={deviceMode}
            onToggleDeviceMode={setDeviceMode}
          />
        )}

        {/* Right Live Interactive Preview */}
        <div className="flex-1 bg-gray-200/80 overflow-y-auto flex flex-col items-center p-2 sm:p-6 transition-all">
          <div
            className={`transition-all duration-300 w-full shadow-2xl rounded-2xl overflow-hidden my-auto ${
              deviceMode === 'mobile' && activeViewMode === 'split'
                ? 'max-w-[395px] min-h-[750px] border-[12px] border-gray-900 rounded-[40px] my-6'
                : 'max-w-5xl'
            }`}
            style={{ backgroundColor: colors.blushPale }}
          >
            {/* Live Website Preview Container */}
            <div className="min-h-screen text-[#3B0B1F] font-body relative" style={{ backgroundColor: colors.blushPale }}>
              {/* Optional Splash Screen trigger test */}
              {showSplash && (
                <SplashScreen config={config} onOpenInvitation={handleOpenInvitation} />
              )}

              {/* Floating Music Control */}
              {!showSplash && <MusicPlayer config={config} />}

              <HeroSection config={config} />

              <DateCard config={config} onOpenRSVP={() => setIsRSVPOpen(true)} />

              <DetailsSection config={config} />

              <StoryQuoteSection config={config} />

              <TimelineSection config={config} />

              <LightboxGallery config={config} />

              {/* RSVP Banner */}
              <section
                className="py-12 text-center px-4 my-8 transition-colors duration-500"
                style={{
                  backgroundColor: colors.primary,
                  color: colors.blushPale
                }}
              >
                <div className="max-w-2xl mx-auto space-y-4">
                  <h3 className="font-serif-heading text-2xl sm:text-3xl font-normal" style={{ color: colors.gold }}>
                    Will You Join Our Celebration?
                  </h3>
                  <p className="font-body text-xs sm:text-sm opacity-80">
                    Please let us know your attendance and meal preferences by {config.rsvpDeadlineEn}.
                  </p>
                  <button
                    onClick={() => setIsRSVPOpen(true)}
                    id="banner-rsvp-btn"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-body text-xs font-semibold uppercase tracking-wider shadow-xl hover:scale-105 transition-all cursor-pointer"
                    style={{
                      backgroundColor: colors.gold,
                      color: colors.primary
                    }}
                  >
                    <span>Respond to Invitation</span>
                  </button>
                </div>
              </section>

              <BotanicalFooter config={config} />
            </div>
          </div>
        </div>
      </div>

      {/* RSVP Modal Dialog */}
      <RSVPModal config={config} isOpen={isRSVPOpen} onClose={() => setIsRSVPOpen(false)} />

      {/* Order & Payment Summary Gateway Modal (Customer Facing) */}
      <OrderModal
        config={config}
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />

      {/* Admin Studio Portal & Customer Projects Registry Modal (Admin Facing) */}
      <ProjectRegistryModal
        isOpen={isRegistryOpen}
        onClose={() => setIsRegistryOpen(false)}
        onLoadProject={(loadedConfig) => setConfig(loadedConfig)}
        currentConfig={config}
      />
    </div>
  );
}

