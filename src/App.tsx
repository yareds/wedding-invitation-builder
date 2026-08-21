import React, { useState, useEffect } from 'react';
import { WeddingConfig, ThemeId } from './types';
import { DEFAULT_WEDDING_CONFIG, THEME_PRESETS } from './utils/themePresets';
import { generateProjectId } from './utils/projectDatabase';
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
import { Eye, Smartphone, Monitor, ShoppingBag, Sparkles, FolderOpen, ShieldCheck, Lock, UserCheck, Home, AlertTriangle, CheckCircle, X } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'builder'>('landing');
  const [config, setConfig] = useState<WeddingConfig>(DEFAULT_WEDDING_CONFIG);
  const [showSplash, setShowSplash] = useState<boolean>(false);
  const [isRSVPOpen, setIsRSVPOpen] = useState<boolean>(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);
  const [isRegistryOpen, setIsRegistryOpen] = useState<boolean>(false);
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');
  const [activeViewMode, setActiveViewMode] = useState<'split' | 'guest'>('split');
  const [currentProjectId, setCurrentProjectId] = useState<string>(() => generateProjectId());
  const [cloudSaveError, setCloudSaveError] = useState<string | null>(null);
  const [orderSubmittedToast, setOrderSubmittedToast] = useState<string | null>(null);

  const isOrderSubmitted = config.orderStatus === 'submitted' || config.orderStatus === 'approved';

  const handleOpenOrder = () => {
    if (isOrderSubmitted) {
      setOrderSubmittedToast("Your order has already been submitted — we'll be in touch soon!");
      return;
    }
    setIsOrderModalOpen(true);
  };

  useEffect(() => {
    const handleSaveError = (e: any) => {
      const msg = e?.detail?.message || 'Failed to save project to cloud database.';
      setCloudSaveError(msg);
    };
    window.addEventListener('firestore-save-error', handleSaveError);
    return () => {
      window.removeEventListener('firestore-save-error', handleSaveError);
    };
  }, []);

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
    <div className="h-screen flex flex-col bg-gray-100 font-body selection:bg-[#D4849A] selection:text-white overflow-hidden">
      {/* Top Application Bar (Sticky Banner) */}
      <header className="shrink-0 z-40 bg-[#3B0B1F] text-[#FDF0F3] px-4 py-2.5 flex flex-wrap items-center justify-between border-b border-[#C8A84B]/40 shadow-md gap-2">
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
          {/* Mode switch: Split/Stacked Builder vs Full Invitation Page */}
          <div className="flex items-center bg-[#2D0817] p-1 rounded-full border border-[#C8A84B]/30 text-xs font-body">
            <button
              onClick={() => setActiveViewMode('split')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                activeViewMode === 'split' ? 'bg-[#C8A84B] text-[#3B0B1F] font-bold shadow-sm' : 'text-[#FDF0F3]/70 hover:text-white'
              }`}
            >
              Builder &amp; Preview
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

          <button
            onClick={handleOpenOrder}
            id="top-order-btn"
            className={`px-4 py-1.5 rounded-full font-body text-xs font-semibold uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5 cursor-pointer ${
              isOrderSubmitted
                ? 'bg-emerald-800 text-emerald-100 border border-emerald-500/50 hover:bg-emerald-700'
                : 'bg-[#C8A84B] text-[#3B0B1F] hover:bg-[#E2C873]'
            }`}
          >
            {isOrderSubmitted ? (
              <>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-300" />
                <span>{config.orderStatus === 'approved' ? 'Order Approved ✓' : 'Order Submitted ✓'}</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Order &amp; Pay</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Workspace (Stacked on Mobile/Tablet, Side-by-Side on Desktop) */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden relative h-[calc(100vh-53px)]">
        {/* Builder Controls: Top on Mobile/Tablet, Left Sidebar on Desktop */}
        {activeViewMode === 'split' && (
          <div
            id="wedding-builder-panel"
            className="w-full lg:w-[460px] xl:w-[500px] lg:h-full shrink-0 flex flex-col"
          >
            <WeddingBuilder
              config={config}
              onChangeConfig={setConfig}
              onOpenOrderModal={handleOpenOrder}
              deviceMode={deviceMode}
              onToggleDeviceMode={setDeviceMode}
              projectId={currentProjectId}
            />
          </div>
        )}

        {/* Live Interactive Preview: Directly under Builder on Mobile/Tablet, Right Panel on Desktop */}
        <div
          id="live-invitation-preview"
          className={`w-full min-w-0 bg-[#EAE5DF] flex flex-col items-center p-2 sm:p-6 pb-24 transition-all ${
            activeViewMode === 'guest'
              ? 'flex-1 h-full overflow-y-auto overscroll-contain'
              : 'lg:flex-1 lg:h-full lg:overflow-y-auto lg:overscroll-contain'
          }`}
        >
            {/* Preview Navigation & Quick Anchor Bar */}
            <div className="w-full max-w-5xl flex flex-wrap items-center justify-between gap-2 px-3 py-2 mb-3 bg-white/80 backdrop-blur-md rounded-xl border border-[#C8A84B]/30 shadow-xs text-xs text-[#3B0B1F] font-body shrink-0 sticky top-0 z-30">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-serif-heading font-semibold text-sm text-[#3B0B1F]">
                  Live Invitation Page
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#FAF0F3] text-[#B85B75] border border-[#C8A84B]/30 hidden sm:inline">
                  {deviceMode === 'mobile' ? 'Mobile Width' : 'Responsive Full Width'}
                </span>
              </div>

              {/* Quick Jump Section Links */}
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
                {[
                  { label: 'Top', id: 'hero-section' },
                  { label: 'Date', id: 'date-card-section' },
                  { label: 'Details', id: 'details-section' },
                  { label: 'Story', id: 'story-quote-section' },
                  { label: 'Timeline', id: 'timeline-section' },
                  { label: 'Gallery', id: 'gallery-section' },
                  { label: 'RSVP', id: 'rsvp-banner-section' },
                  { label: 'Footer', id: 'botanical-footer' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      const el = document.getElementById(item.id);
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-[#FAF0F3] hover:bg-[#3B0B1F] hover:text-[#FAF0F3] border border-[#C8A84B]/40 transition-colors cursor-pointer shrink-0"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Interactive Page Card Container */}
            <div
              className={`transition-all duration-300 w-full shadow-2xl rounded-2xl overflow-visible mb-16 ${
                deviceMode === 'mobile' && activeViewMode === 'split'
                  ? 'max-w-[395px] border-[10px] border-gray-900 rounded-[36px] shadow-2xl my-2'
                  : 'max-w-5xl my-0'
              }`}
              style={{ backgroundColor: colors.blushPale }}
            >
              {/* Live Website Preview Container */}
              <div className="w-full min-h-screen text-[#3B0B1F] font-body relative rounded-2xl overflow-hidden" style={{ backgroundColor: colors.blushPale }}>
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
                  id="rsvp-banner-section"
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
      <RSVPModal config={config} projectId={currentProjectId} isOpen={isRSVPOpen} onClose={() => setIsRSVPOpen(false)} />

      {/* Order & Payment Summary Gateway Modal (Customer Facing) */}
      <OrderModal
        config={config}
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        onUpdateConfig={setConfig}
        projectId={currentProjectId}
      />

      {/* Order Submitted Notification Toast Banner */}
      {orderSubmittedToast && (
        <div className="fixed bottom-5 right-5 z-[9999] max-w-md bg-emerald-950 text-emerald-100 border-2 border-emerald-500 rounded-2xl p-4 shadow-2xl flex items-start gap-3 animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="flex-1 text-xs">
            <p className="font-bold uppercase tracking-wider mb-1 text-emerald-300">Order Confirmed</p>
            <p className="leading-relaxed opacity-95">{orderSubmittedToast}</p>
          </div>
          <button
            onClick={() => setOrderSubmittedToast(null)}
            className="p-1 hover:bg-emerald-900 rounded-lg text-emerald-300 hover:text-white transition-colors cursor-pointer"
            title="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Cloud Save Error Alert Toast Banner */}
      {cloudSaveError && (
        <div className="fixed bottom-5 right-5 z-[9999] max-w-md bg-red-950 text-red-100 border-2 border-red-500 rounded-2xl p-4 shadow-2xl flex items-start gap-3 animate-in fade-in slide-in-from-bottom-5">
          <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5 animate-pulse" />
          <div className="flex-1 text-xs">
            <p className="font-bold uppercase tracking-wider mb-1 text-red-300">Cloud Sync Warning</p>
            <p className="leading-relaxed opacity-90">{cloudSaveError}</p>
          </div>
          <button
            onClick={() => setCloudSaveError(null)}
            className="p-1 hover:bg-red-900 rounded-lg text-red-300 hover:text-white transition-colors cursor-pointer"
            title="Dismiss error notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

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

