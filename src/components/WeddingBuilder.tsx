import React, { useState } from 'react';
import { WeddingConfig, ThemeId, TimelineEvent } from '../types';
import { THEME_PRESETS, SAMPLE_WEDDING_CONFIG, DEFAULT_WEDDING_CONFIG } from '../utils/themePresets';
import { uploadFileToFirebaseStorage } from '../lib/firebase';
import { Palette, Heart, Image as ImageIcon, Music, MapPin, Plus, Trash2, Check, ShoppingBag, Monitor, Smartphone, Upload, AlertCircle, Sparkles, RefreshCw, Loader2, X } from 'lucide-react';

interface WeddingBuilderProps {
  config: WeddingConfig;
  onChangeConfig: (newConfig: WeddingConfig) => void;
  onOpenOrderModal: () => void;
  deviceMode: 'desktop' | 'mobile';
  onToggleDeviceMode: (mode: 'desktop' | 'mobile') => void;
}

export const WeddingBuilder: React.FC<WeddingBuilderProps> = ({
  config,
  onChangeConfig,
  onOpenOrderModal,
  deviceMode,
  onToggleDeviceMode
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    { id: 1, title: 'Color & Theme', icon: Palette },
    { id: 2, title: 'Couple & Date', icon: Heart },
    { id: 3, title: 'Hero & Audio', icon: Music },
    { id: 4, title: 'Venues & RSVP', icon: MapPin },
    { id: 5, title: 'Story & Gallery', icon: ImageIcon }
  ];

  // Handler for text input updates
  const handleTextChange = (field: keyof WeddingConfig, val: any) => {
    onChangeConfig({
      ...config,
      [field]: val
    });
  };

  const [isUploadingHero, setIsUploadingHero] = useState<boolean>(false);
  const [heroProgress, setHeroProgress] = useState<number | null>(null);
  const [heroUploadError, setHeroUploadError] = useState<string | null>(null);

  const [isUploadingMusic, setIsUploadingMusic] = useState<boolean>(false);
  const [musicProgress, setMusicProgress] = useState<number | null>(null);
  const [musicUploadError, setMusicUploadError] = useState<string | null>(null);

  const [isUploadingGallery, setIsUploadingGallery] = useState<boolean>(false);
  const [galleryProgress, setGalleryProgress] = useState<number | null>(null);
  const [galleryUploadError, setGalleryUploadError] = useState<string | null>(null);

  // Constants for max upload sizes
  const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
  const MAX_AUDIO_SIZE_BYTES = 8 * 1024 * 1024; // 8MB

  // Image Upload handler for Hero Background (Uploads directly to Firebase Storage)
  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      setHeroUploadError('Image file is too large (max 5MB). Please choose a smaller photo.');
      e.target.value = '';
      return;
    }

    setIsUploadingHero(true);
    setHeroProgress(0);
    setHeroUploadError(null);
    try {
      const downloadUrl = await uploadFileToFirebaseStorage(
        file,
        'hero_images',
        (progress) => setHeroProgress(progress),
        90000
      );
      handleTextChange('heroImg', downloadUrl);
    } catch (err: any) {
      console.error('Hero Image Upload Error:', err);
      setHeroUploadError('Photo failed to upload. Please try again or select a smaller photo.');
    } finally {
      setIsUploadingHero(false);
      setHeroProgress(null);
      e.target.value = '';
    }
  };

  // Audio Upload handler for Background Music
  const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_AUDIO_SIZE_BYTES) {
      setMusicUploadError('Audio file is too large (max 8MB). Please choose a smaller audio file.');
      e.target.value = '';
      return;
    }

    setIsUploadingMusic(true);
    setMusicProgress(0);
    setMusicUploadError(null);

    try {
      const downloadUrl = await uploadFileToFirebaseStorage(
        file,
        'audio',
        (progress) => setMusicProgress(progress),
        160000
      );
      handleTextChange('bgMusicUrl', downloadUrl);
    } catch (err: any) {
      console.error('Audio Upload Error:', err);
      setMusicUploadError('Audio failed to upload. Please try again or choose a smaller file.');
    } finally {
      setIsUploadingMusic(false);
      setMusicProgress(null);
      e.target.value = '';
    }
  };

  // Gallery Image Upload (up to 8 images directly to Firebase Storage)
  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files: File[] = Array.from(e.target.files);
    if (!files.length) return;

    const currentGallery = config.galleryImgs || [];
    const MAX_GALLERY_PHOTOS = 8;
    const remainingSlots = MAX_GALLERY_PHOTOS - currentGallery.length;
    if (remainingSlots <= 0) {
      setGalleryUploadError(`You have reached the maximum limit of ${MAX_GALLERY_PHOTOS} gallery photos.`);
      e.target.value = '';
      return;
    }

    const filesToProcess = files.slice(0, remainingSlots);

    const oversizedFiles = filesToProcess.filter((f) => f.size > MAX_IMAGE_SIZE_BYTES);
    if (oversizedFiles.length > 0) {
      setGalleryUploadError('One or more photos exceed the 5MB limit. Please select smaller images.');
      e.target.value = '';
      return;
    }

    setIsUploadingGallery(true);
    setGalleryProgress(0);
    setGalleryUploadError(null);

    const fileProgresses = new Array(filesToProcess.length).fill(0);
    const updateOverallProgress = (index: number, p: number) => {
      fileProgresses[index] = p;
      const avg = Math.round(fileProgresses.reduce((a, b) => a + b, 0) / filesToProcess.length);
      setGalleryProgress(avg);
    };

    try {
      const uploadedUrls = await Promise.all(
        filesToProcess.map((f, idx) =>
          uploadFileToFirebaseStorage(
            f,
            'gallery',
            (p) => updateOverallProgress(idx, p),
            90000
          )
        )
      );
      const validUrls = uploadedUrls.filter(Boolean);
      if (validUrls.length > 0) {
        onChangeConfig({
          ...config,
          galleryImgs: [...(config.galleryImgs || []), ...validUrls]
        });
      }
    } catch (err: any) {
      console.error('Gallery Upload Error:', err);
      setGalleryUploadError('Photo failed to upload. Please try again or select smaller photos.');
    } finally {
      setIsUploadingGallery(false);
      setGalleryProgress(null);
      e.target.value = '';
    }
  };

  const removeGalleryImage = (index: number) => {
    const updated = (config.galleryImgs || []).filter((_, idx) => idx !== index);
    handleTextChange('galleryImgs', updated);
  };

  // Calendar date picker change handler
  const handleCalendarDateChange = (dateStr: string) => {
    if (!dateStr) return;
    const d = new Date(dateStr + 'T14:00:00');
    if (!isNaN(d.getTime())) {
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const formattedGC = `${days[d.getDay()]}, ${months[d.getMonth()]} ${String(d.getDate()).padStart(2, '0')}, ${d.getFullYear()}`;
      
      onChangeConfig({
        ...config,
        countdownDate: `${dateStr}T14:00:00`,
        dateGC: formattedGC
      });
    }
  };

  // Schedule Event Handlers
  const handleScheduleChange = (index: number, field: keyof TimelineEvent, val: string) => {
    const updated = [...(config.schedule || [])];
    updated[index] = { ...updated[index], [field]: val };
    handleTextChange('schedule', updated);
  };

  const handleAddScheduleEvent = () => {
    const newEvent: TimelineEvent = {
      time: '04:00 PM',
      title: 'New Program Event',
      location: 'Reception Hall',
      description: 'Brief description of the event details.'
    };
    handleTextChange('schedule', [...(config.schedule || []), newEvent]);
  };

  const handleRemoveScheduleEvent = (index: number) => {
    const updated = (config.schedule || []).filter((_, idx) => idx !== index);
    handleTextChange('schedule', updated);
  };

  return (
    <aside className="w-full lg:w-[450px] xl:w-[480px] bg-white border-r border-[#D4849A]/30 flex flex-col h-full shadow-lg overflow-hidden shrink-0">
      {/* Sticky Top Builder Branding Header & Customization Step Navigation Menu */}
      <div className="sticky top-0 z-20 bg-white border-b border-[#C8A84B]/40 shadow-xs shrink-0">
        <div className="p-4 bg-[#FAF0F3] text-[#3B0B1F] border-b border-[#C8A84B]/40 flex items-center justify-between">
          <div>
            <span className="font-body text-[10px] uppercase tracking-[0.25em] text-[#B85B75] block font-semibold">
              Real-Time Customizer
            </span>
            <h1 className="font-serif-heading text-lg font-normal text-[#3B0B1F]">
              Wedding Invitation Builder
            </h1>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-[#C8A84B]/40 shadow-sm">
            <button
              onClick={() => onToggleDeviceMode('desktop')}
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                deviceMode === 'desktop' ? 'bg-[#C8A84B] text-[#3B0B1F]' : 'text-[#3B0B1F]/60 hover:text-[#3B0B1F]'
              }`}
              title="Desktop View"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => onToggleDeviceMode('mobile')}
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                deviceMode === 'mobile' ? 'bg-[#C8A84B] text-[#3B0B1F]' : 'text-[#3B0B1F]/60 hover:text-[#3B0B1F]'
              }`}
              title="Mobile View"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Step Navigation Tabs */}
        <div className="flex items-center justify-between bg-[#FAF0F3]/80 px-2 py-2 overflow-x-auto no-scrollbar">
          {steps.map((step) => {
            const IconComp = step.icon;
            const isActive = activeStep === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-body font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#4A0E17] text-[#FAF0F3] shadow-md'
                    : 'text-[#3B0B1F]/70 hover:text-[#3B0B1F] hover:bg-[#B85B75]/15'
                }`}
              >
                <IconComp className={`w-3.5 h-3.5 ${isActive ? 'text-[#C8A84B]' : 'text-[#3B0B1F]'}`} />
                <span>{step.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Builder Step Form Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* STEP 1: COLOR PALETTE & VISUAL THEME */}
        {activeStep === 1 && (
          <div className="space-y-5">
            <div>
              <h3 className="font-serif-heading text-lg font-normal text-[#3B0B1F]">
                Choose Color Palette &amp; Theme
              </h3>
              <p className="font-body text-xs text-[#3B0B1F]/70">
                Select a visual theme style and color palette. The live preview updates instantly.
              </p>
            </div>

            <div className="space-y-3">
              {Object.values(THEME_PRESETS).map((t) => {
                const isSelected = config.themeId === t.id;
                return (
                  <div
                    key={t.id}
                    onClick={() => handleTextChange('themeId', t.id as ThemeId)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#C8A84B] bg-[#FDF0F3] shadow-md'
                        : 'border-gray-200 bg-white hover:border-[#D4849A]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-serif-heading text-sm font-semibold text-[#3B0B1F] flex items-center gap-2">
                        {t.name}
                        {isSelected && <Check className="w-4 h-4 text-[#C8A84B]" />}
                      </h4>
                      <span className="font-body text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-[#3B0B1F] text-[#C8A84B]">
                        {t.themeStyle}
                      </span>
                    </div>

                    <p className="font-body text-[11px] text-[#3B0B1F]/70 mb-3">{t.description}</p>

                    {/* Color Swatch Strips */}
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-full border border-black/10 shadow-inner"
                        style={{ backgroundColor: t.colors.primary }}
                        title="Primary Color"
                      />
                      <div
                        className="w-6 h-6 rounded-full border border-black/10 shadow-inner"
                        style={{ backgroundColor: t.colors.blush }}
                        title="Accent Color"
                      />
                      <div
                        className="w-6 h-6 rounded-full border border-black/10 shadow-inner"
                        style={{ backgroundColor: t.colors.gold }}
                        title="Gold Accent"
                      />
                      <div
                        className="w-6 h-6 rounded-full border border-black/10 shadow-inner"
                        style={{ backgroundColor: t.colors.blushPale }}
                        title="Background Tint"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: COUPLE & DATE INFO */}
        {activeStep === 2 && (
          <div className="space-y-4">
            <div>
              <h3 className="font-serif-heading text-lg font-normal text-[#3B0B1F]">
                Personalized Couple &amp; Date Info
              </h3>
              <p className="font-body text-xs text-[#3B0B1F]/70">
                Enter couple names in English and Amharic, plus select your date via calendar.
              </p>
            </div>

            {/* Quick Helper Buttons for Testing Essential Info */}
            <div className="flex items-center justify-between gap-2 p-2.5 bg-[#FAF0F3] rounded-xl border border-[#C8A84B]/40">
              <span className="text-[11px] font-semibold text-[#3B0B1F]">Quick Presets:</span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => onChangeConfig(SAMPLE_WEDDING_CONFIG)}
                  className="px-2.5 py-1 rounded-lg bg-[#C8A84B] text-[#3B0B1F] text-[11px] font-bold hover:bg-[#b0923e] transition-all flex items-center gap-1 cursor-pointer shadow-sm"
                  title="Fill sample demo data to test full order confirmation modal"
                >
                  <Sparkles className="w-3 h-3 text-[#3B0B1F]" />
                  <span>Load Sample Demo</span>
                </button>
                <button
                  type="button"
                  onClick={() => onChangeConfig(DEFAULT_WEDDING_CONFIG)}
                  className="px-2.5 py-1 rounded-lg bg-gray-200 text-gray-800 text-[11px] font-bold hover:bg-gray-300 transition-all flex items-center gap-1 cursor-pointer shadow-sm"
                  title="Clear essential fields to test basic notification modal"
                >
                  <RefreshCw className="w-3 h-3 text-gray-700" />
                  <span>Clear Info</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-body text-xs font-semibold text-[#3B0B1F] uppercase mb-1">
                  Groom Name (English)
                </label>
                <input
                  type="text"
                  value={config.groomEn}
                  onChange={(e) => handleTextChange('groomEn', e.target.value)}
                  placeholder="e.g. Sebastian"
                  className="w-full px-3 py-2 rounded-xl border border-[#D4849A]/40 bg-[#FDF0F3]/30 text-xs text-[#3B0B1F] focus:outline-none focus:border-[#C8A84B]"
                />
              </div>
              <div>
                <label className="block font-body text-xs font-semibold text-[#3B0B1F] uppercase mb-1">
                  Groom Name (Amharic)
                </label>
                <input
                  type="text"
                  value={config.groomEth}
                  onChange={(e) => handleTextChange('groomEth', e.target.value)}
                  placeholder="e.g. ሴባስቲያን"
                  className="w-full px-3 py-2 rounded-xl border border-[#D4849A]/40 bg-[#FDF0F3]/30 text-xs text-[#3B0B1F] focus:outline-none focus:border-[#C8A84B]"
                />
              </div>

              <div>
                <label className="block font-body text-xs font-semibold text-[#3B0B1F] uppercase mb-1">
                  Bride Name (English)
                </label>
                <input
                  type="text"
                  value={config.brideEn}
                  onChange={(e) => handleTextChange('brideEn', e.target.value)}
                  placeholder="e.g. Amara"
                  className="w-full px-3 py-2 rounded-xl border border-[#D4849A]/40 bg-[#FDF0F3]/30 text-xs text-[#3B0B1F] focus:outline-none focus:border-[#C8A84B]"
                />
              </div>
              <div>
                <label className="block font-body text-xs font-semibold text-[#3B0B1F] uppercase mb-1">
                  Bride Name (Amharic)
                </label>
                <input
                  type="text"
                  value={config.brideEth}
                  onChange={(e) => handleTextChange('brideEth', e.target.value)}
                  placeholder="e.g. አማራ"
                  className="w-full px-3 py-2 rounded-xl border border-[#D4849A]/40 bg-[#FDF0F3]/30 text-xs text-[#3B0B1F] focus:outline-none focus:border-[#C8A84B]"
                />
              </div>
            </div>

            {/* Calendar Picker & Dates */}
            <div className="pt-3 border-t border-[#D4849A]/30 space-y-3">
              <div>
                <label className="block font-body text-xs font-semibold text-[#3B0B1F] uppercase mb-1 flex items-center justify-between">
                  <span>Pick Wedding Date (Calendar)</span>
                  <span className="text-[10px] text-[#C8A84B] font-bold">Auto-updates Countdown</span>
                </label>
                <input
                  type="date"
                  onChange={(e) => handleCalendarDateChange(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border-2 border-[#C8A84B] bg-white text-xs font-body font-semibold text-[#3B0B1F] focus:outline-none shadow-sm cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-body text-xs font-semibold text-[#3B0B1F] uppercase mb-1">
                    Date (Gregorian GC)
                  </label>
                  <input
                    type="text"
                    value={config.dateGC}
                    onChange={(e) => handleTextChange('dateGC', e.target.value)}
                    placeholder="e.g. Saturday, May 09, 2026"
                    className="w-full px-3 py-2 rounded-xl border border-[#D4849A]/40 bg-[#FDF0F3]/30 text-xs text-[#3B0B1F] focus:outline-none focus:border-[#C8A84B]"
                  />
                </div>
                <div>
                  <label className="block font-body text-xs font-semibold text-[#3B0B1F] uppercase mb-1">
                    Date (Ethiopian EC)
                  </label>
                  <input
                    type="text"
                    value={config.dateEC}
                    onChange={(e) => handleTextChange('dateEC', e.target.value)}
                    placeholder="e.g. ግንቦት 01, 2018 ዓ.ም"
                    className="w-full px-3 py-2 rounded-xl border border-[#D4849A]/40 bg-[#FDF0F3]/30 text-xs text-[#3B0B1F] focus:outline-none focus:border-[#C8A84B]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: HERO IMAGE & BACKGROUND MUSIC */}
        {activeStep === 3 && (
          <div className="space-y-5">
            <div>
              <h3 className="font-serif-heading text-lg font-normal text-[#3B0B1F]">
                Hero Background &amp; Music
              </h3>
              <p className="font-body text-xs text-[#3B0B1F]/70">
                Upload your custom couple photo for the main hero section and custom audio soundtrack.
              </p>
            </div>

            {/* Hero Image Upload */}
            <div className="space-y-2">
              <label className="block font-body text-xs font-semibold text-[#3B0B1F] uppercase">
                Hero Section Background Image
              </label>
              <div className="flex items-center gap-3">
                <div className="w-20 h-20 rounded-xl overflow-hidden border border-[#C8A84B] shadow-sm bg-gray-100 flex-shrink-0 relative">
                  {config.heroImg ? (
                    <img src={config.heroImg} alt="Hero Preview" className="w-full h-full object-cover object-top" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">Default</div>
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <label className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#3B0B1F] text-[#FDF0F3] font-body text-xs font-semibold cursor-pointer hover:bg-[#2D0817] shadow-sm ${isUploadingHero ? 'opacity-70 pointer-events-none' : ''}`}>
                      {isUploadingHero ? (
                        <Loader2 className="w-4 h-4 text-[#C8A84B] animate-spin" />
                      ) : (
                        <Upload className="w-4 h-4 text-[#C8A84B]" />
                      )}
                      <span>
                        {isUploadingHero
                          ? `Uploading (${heroProgress ?? 0}%)`
                          : 'Upload Custom Image'}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={isUploadingHero}
                        onChange={handleHeroImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {isUploadingHero && (
                    <div className="w-full max-w-xs bg-[#FDF0F3] border border-[#C8A84B]/40 rounded-full h-2 overflow-hidden p-0.5 shadow-inner">
                      <div
                        className="bg-[#C8A84B] h-full rounded-full transition-all duration-150"
                        style={{ width: `${heroProgress ?? 0}%` }}
                      />
                    </div>
                  )}
                  {heroUploadError && (
                    <div className="flex items-center gap-2 p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl mt-2 animate-in fade-in">
                      <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                      <span className="flex-1 font-medium">{heroUploadError}</span>
                      <button
                        type="button"
                        onClick={() => setHeroUploadError(null)}
                        className="p-1 text-red-400 hover:text-red-600 rounded-lg cursor-pointer"
                        title="Dismiss error"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                  <p className="text-[11px] text-[#3B0B1F]/60 font-body">
                    Recommended high-resolution couple photo or wedding banner.
                  </p>
                </div>
              </div>
            </div>

            {/* Background Music / Soundtrack Customization */}
            <div className="space-y-3 pt-3 border-t border-[#D4849A]/30">
              <div className="flex items-center justify-between">
                <label className="block font-body text-xs font-semibold text-[#3B0B1F] uppercase">
                  Background Music / Soundtrack
                </label>
                {config.bgMusicUrl && (
                  <button
                    type="button"
                    onClick={() => handleTextChange('bgMusicUrl', '')}
                    className="text-[11px] text-red-600 hover:text-red-800 underline font-body font-medium cursor-pointer"
                  >
                    Reset to Default Piano Synth
                  </button>
                )}
              </div>

              {/* Music Presets */}
              <div className="space-y-1.5">
                <span className="text-[11px] text-[#3B0B1F]/70 font-body font-medium block">
                  Quick Soundtrack Presets:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleTextChange('bgMusicUrl', '')}
                    className={`px-3 py-2 rounded-xl text-xs text-left font-body font-medium transition-all cursor-pointer border ${
                      !config.bgMusicUrl
                        ? 'bg-[#3B0B1F] text-[#FDF0F3] border-[#C8A84B]'
                        : 'bg-white text-[#3B0B1F] border-gray-200 hover:border-[#D4849A]'
                    }`}
                  >
                    🎹 Romantic Piano Synth (Built-in)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTextChange('bgMusicUrl', 'https://upload.wikimedia.org/wikipedia/commons/5/52/Pachelbel_Canon_in_D_Major_Piano.mp3')}
                    className={`px-3 py-2 rounded-xl text-xs text-left font-body font-medium transition-all cursor-pointer border ${
                      config.bgMusicUrl === 'https://upload.wikimedia.org/wikipedia/commons/5/52/Pachelbel_Canon_in_D_Major_Piano.mp3'
                        ? 'bg-[#3B0B1F] text-[#FDF0F3] border-[#C8A84B]'
                        : 'bg-white text-[#3B0B1F] border-gray-200 hover:border-[#D4849A]'
                    }`}
                  >
                    🎻 Canon in D (Piano MP3)
                  </button>
                </div>
              </div>

              {/* Custom Audio URL Input or MP3 File Upload */}
              <div className="space-y-2 pt-2">
                <span className="text-[11px] text-[#3B0B1F]/70 font-body font-medium block">
                  Or use Custom MP3 File / Direct URL:
                </span>
                
                <div className="flex flex-col gap-2">
                  <input
                    type="url"
                    value={config.bgMusicUrl || ''}
                    onChange={(e) => handleTextChange('bgMusicUrl', e.target.value)}
                    placeholder="Paste Direct Audio MP3 URL (https://...)"
                    className="w-full px-3 py-2 rounded-xl border border-[#D4849A]/40 text-xs text-[#3B0B1F] bg-white focus:outline-none focus:border-[#C8A84B]"
                  />

                  <div className="flex items-center gap-2">
                    <label className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FDF0F3] border border-[#C8A84B] text-[#3B0B1F] font-body text-xs font-semibold cursor-pointer hover:bg-[#D4849A]/20 ${isUploadingMusic ? 'opacity-70 pointer-events-none' : ''}`}>
                      {isUploadingMusic ? (
                        <Loader2 className="w-4 h-4 text-[#C8A84B] animate-spin" />
                      ) : (
                        <Music className="w-4 h-4 text-[#C8A84B]" />
                      )}
                      <span>
                        {isUploadingMusic
                          ? `Uploading (${musicProgress ?? 0}%)`
                          : 'Upload MP3 File'}
                      </span>
                      <input
                        type="file"
                        accept="audio/*"
                        disabled={isUploadingMusic}
                        onChange={handleAudioUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {isUploadingMusic && (
                    <div className="w-full max-w-sm bg-[#FDF0F3] border border-[#C8A84B]/40 rounded-full h-2 overflow-hidden p-0.5 shadow-inner">
                      <div
                        className="bg-[#C8A84B] h-full rounded-full transition-all duration-150"
                        style={{ width: `${musicProgress ?? 0}%` }}
                      />
                    </div>
                  )}

                  {musicUploadError && (
                    <div className="flex items-center gap-2 p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl mt-1 animate-in fade-in">
                      <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                      <span className="flex-1 font-medium">{musicUploadError}</span>
                      <button
                        type="button"
                        onClick={() => setMusicUploadError(null)}
                        className="p-1 text-red-400 hover:text-red-600 rounded-lg cursor-pointer"
                        title="Dismiss error"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <p className="text-[11px] text-[#3B0B1F]/60 font-body">
                    Active Soundtrack:{' '}
                    <span className="font-mono text-[10px] text-[#C8A84B]">
                      {config.bgMusicUrl ? (config.bgMusicUrl.length > 40 ? `${config.bgMusicUrl.slice(0, 40)}...` : config.bgMusicUrl) : 'Default Romantic Piano (Synthesized)'}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: VENUES, DETAILS & WEDDING DAY SCHEDULE */}
        {activeStep === 4 && (
          <div className="space-y-5">
            <div>
              <h3 className="font-serif-heading text-lg font-normal text-[#3B0B1F]">
                Event Venues &amp; Wedding Day Schedule
              </h3>
              <p className="font-body text-xs text-[#3B0B1F]/70">
                Customize ceremony &amp; reception locations, RSVP details, and full day schedule timeline.
              </p>
            </div>

            {/* Ceremony Details */}
            <div className="space-y-2 p-3 bg-[#FDF0F3]/50 rounded-2xl border border-[#D4849A]/30">
              <h4 className="font-serif-heading text-xs font-bold text-[#3B0B1F] uppercase tracking-wider">
                1. Holy Matrimony Ceremony
              </h4>
              <input
                type="text"
                value={config.churchEn}
                onChange={(e) => handleTextChange('churchEn', e.target.value)}
                placeholder="Ceremony Venue Name (English)"
                className="w-full px-3 py-1.5 rounded-lg border text-xs bg-white text-[#3B0B1F]"
              />
              <input
                type="text"
                value={config.churchEth}
                onChange={(e) => handleTextChange('churchEth', e.target.value)}
                placeholder="Ceremony Venue Name (Amharic)"
                className="w-full px-3 py-1.5 rounded-lg border text-xs bg-white text-[#3B0B1F]"
              />
            </div>

            {/* Reception Details */}
            <div className="space-y-2 p-3 bg-[#FDF0F3]/50 rounded-2xl border border-[#D4849A]/30">
              <h4 className="font-serif-heading text-xs font-bold text-[#3B0B1F] uppercase tracking-wider">
                2. Grand Reception &amp; Dinner
              </h4>
              <input
                type="text"
                value={config.receptionEn}
                onChange={(e) => handleTextChange('receptionEn', e.target.value)}
                placeholder="Reception Venue Name (English)"
                className="w-full px-3 py-1.5 rounded-lg border text-xs bg-white text-[#3B0B1F]"
              />
              <input
                type="text"
                value={config.receptionEth}
                onChange={(e) => handleTextChange('receptionEth', e.target.value)}
                placeholder="Reception Venue Name (Amharic)"
                className="w-full px-3 py-1.5 rounded-lg border text-xs bg-white text-[#3B0B1F]"
              />
            </div>

            {/* Wedding Day Schedule Editor */}
            <div className="space-y-3 pt-3 border-t border-[#D4849A]/30">
              <div className="flex items-center justify-between">
                <h4 className="font-serif-heading text-sm font-bold text-[#3B0B1F]">
                  Wedding Day Schedule Information
                </h4>
                <button
                  type="button"
                  onClick={handleAddScheduleEvent}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#3B0B1F] text-[#FDF0F3] text-[11px] font-body font-semibold hover:bg-[#2D0817] cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-[#C8A84B]" />
                  <span>Add Event</span>
                </button>
              </div>

              <div className="space-y-3">
                {config.schedule && config.schedule.map((event, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-2xl border border-[#D4849A]/40 shadow-sm space-y-2 relative group">
                    <button
                      type="button"
                      onClick={() => handleRemoveScheduleEvent(idx)}
                      className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50 cursor-pointer"
                      title="Delete event"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="grid grid-cols-2 gap-2 pr-6">
                      <input
                        type="text"
                        value={event.time}
                        onChange={(e) => handleScheduleChange(idx, 'time', e.target.value)}
                        placeholder="Time (e.g. 11:00 AM)"
                        className="px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-[#3B0B1F]"
                      />
                      <input
                        type="text"
                        value={event.title}
                        onChange={(e) => handleScheduleChange(idx, 'title', e.target.value)}
                        placeholder="Event Title"
                        className="px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs text-[#3B0B1F]"
                      />
                    </div>
                    <input
                      type="text"
                      value={event.location || ''}
                      onChange={(e) => handleScheduleChange(idx, 'location', e.target.value)}
                      placeholder="Location"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs text-[#3B0B1F]"
                    />
                    <input
                      type="text"
                      value={event.description || ''}
                      onChange={(e) => handleScheduleChange(idx, 'description', e.target.value)}
                      placeholder="Description"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs text-[#3B0B1F]/70"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* RSVP Deadline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block font-body text-xs font-semibold text-[#3B0B1F] uppercase mb-1">
                  RSVP Deadline (GC)
                </label>
                <input
                  type="text"
                  value={config.rsvpDeadlineEn}
                  onChange={(e) => handleTextChange('rsvpDeadlineEn', e.target.value)}
                  placeholder="e.g. April 1, 2026"
                  className="w-full px-3 py-2 rounded-xl border text-xs text-[#3B0B1F]"
                />
              </div>
              <div>
                <label className="block font-body text-xs font-semibold text-[#3B0B1F] uppercase mb-1">
                  RSVP Deadline (EC)
                </label>
                <input
                  type="text"
                  value={config.rsvpDeadlineEth}
                  onChange={(e) => handleTextChange('rsvpDeadlineEth', e.target.value)}
                  placeholder="e.g. መጋቢት 23, 2018"
                  className="w-full px-3 py-2 rounded-xl border text-xs text-[#3B0B1F]"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: STORY & GALLERY */}
        {activeStep === 5 && (
          <div className="space-y-5">
            <div>
              <h3 className="font-serif-heading text-lg font-normal text-[#3B0B1F]">
                Love Story &amp; Image Gallery
              </h3>
              <p className="font-body text-xs text-[#3B0B1F]/70">
                Write your love story narrative, upload gallery photos, and add romantic quotes.
              </p>
            </div>

            {/* Story Piece Text Area */}
            <div className="space-y-2">
              <label className="block font-body text-xs font-semibold text-[#3B0B1F] uppercase">
                Our Love Story Narrative
              </label>
              <textarea
                rows={4}
                value={config.storyText || ''}
                onChange={(e) => handleTextChange('storyText', e.target.value)}
                placeholder="Share how you met, your journey together, or memorable milestones..."
                className="w-full px-3 py-2 rounded-xl border border-[#D4849A]/40 text-xs text-[#3B0B1F] focus:outline-none focus:border-[#C8A84B] leading-relaxed"
              />
            </div>

            {/* Gallery Uploader */}
            <div className="pt-3 border-t border-[#D4849A]/30">
              <div className="flex items-[#3B0B1F] justify-between mb-2">
                <div className="flex flex-col">
                  <span className="font-body text-xs font-semibold text-[#3B0B1F]">
                    Gallery Photos (Max 8): {config.galleryImgs?.length || 0} / 8
                  </span>
                  <p className="text-[11px] text-[#C8A84B] font-body font-medium italic mt-0.5">
                    You can delete the sample images and replace them with your own.
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <label className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#3B0B1F] text-[#FDF0F3] font-body text-xs font-semibold cursor-pointer hover:bg-[#2D0817] ${isUploadingGallery ? 'opacity-70 pointer-events-none' : ''}`}>
                    {isUploadingGallery ? (
                      <Loader2 className="w-4 h-4 text-[#C8A84B] animate-spin" />
                    ) : (
                      <Plus className="w-4 h-4 text-[#C8A84B]" />
                    )}
                    <span>
                      {isUploadingGallery
                        ? `Uploading (${galleryProgress ?? 0}%)`
                        : 'Add Photos'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      disabled={isUploadingGallery}
                      onChange={handleGalleryUpload}
                      className="hidden"
                    />
                  </label>
                  {isUploadingGallery && (
                    <div className="w-32 bg-[#FDF0F3] border border-[#C8A84B]/40 rounded-full h-1.5 overflow-hidden p-0.5 shadow-inner">
                      <div
                        className="bg-[#C8A84B] h-full rounded-full transition-all duration-150"
                        style={{ width: `${galleryProgress ?? 0}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {galleryUploadError && (
                <div className="flex items-center gap-2 p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl mb-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <span className="flex-1 font-medium">{galleryUploadError}</span>
                  <button
                    type="button"
                    onClick={() => setGalleryUploadError(null)}
                    className="p-1 text-red-400 hover:text-red-600 rounded-lg cursor-pointer"
                    title="Dismiss error"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Gallery Thumbnails Grid */}
              <div className="grid grid-cols-4 gap-2 border border-[#D4849A]/30 p-2.5 rounded-2xl bg-[#FDF0F3]/40 min-h-[100px]">
                {config.galleryImgs && config.galleryImgs.map((imgUrl, idx) => (
                  <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-[#C8A84B]/40 group shadow-sm">
                    <img src={imgUrl} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                    <button
                      onClick={() => removeGalleryImage(idx)}
                      className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-md"
                      title="Delete Photo"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}

                {(!config.galleryImgs || config.galleryImgs.length === 0) && (
                  <div className="col-span-4 flex items-center justify-center py-6 text-center text-xs text-[#3B0B1F]/60">
                    No custom photos added yet. Click 'Add Photos' to upload.
                  </div>
                )}
              </div>
            </div>

            {/* Love Quote */}
            <div className="space-y-2 pt-3 border-t border-[#D4849A]/30">
              <label className="block font-body text-xs font-semibold text-[#3B0B1F] uppercase">
                Love Story Quote / Scripture
              </label>
              <textarea
                rows={2}
                value={config.scripture}
                onChange={(e) => handleTextChange('scripture', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#D4849A]/40 text-xs text-[#3B0B1F]"
              />
              <input
                type="text"
                value={config.scriptureRef}
                onChange={(e) => handleTextChange('scriptureRef', e.target.value)}
                placeholder="Author / Attribution"
                className="w-full px-3 py-1.5 rounded-xl border border-[#D4849A]/40 text-xs text-[#3B0B1F]"
              />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Sticky CTA Footer */}
      <div className="p-4 bg-[#FDF0F3] border-t border-[#D4849A]/30 space-y-2">
        {(() => {
          const groom = (config.groomEn || config.groomEth || '').trim();
          const bride = (config.brideEn || config.brideEth || '').trim();
          const isGroomValid = Boolean(groom && groom !== 'የሙሽራው ስም');
          const isBrideValid = Boolean(bride && bride !== 'የሙሽሪት ስም');
          const isDateValid = Boolean(config.dateGC?.trim());
          const isChurchValid = Boolean((config.churchEn || config.churchEth || '').trim());
          const isReceptionValid = Boolean((config.receptionEn || config.receptionEth || '').trim());
          const isPhoneValid = Boolean(config.phone1?.trim());
          const missingCount = [isGroomValid, isBrideValid, isDateValid, isChurchValid, isReceptionValid, isPhoneValid].filter(v => !v).length;

          return (
            <div>
              {missingCount > 0 && (
                <div className="mb-2 text-[11px] font-semibold text-amber-800 bg-amber-100 border border-amber-300 rounded-lg p-2 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    {missingCount} required detail{missingCount > 1 ? 's' : ''} to complete in order form
                  </span>
                  <span className="text-[10px] text-amber-900 underline font-bold">Fill In Order</span>
                </div>
              )}
              <button
                onClick={onOpenOrderModal}
                id="submit-order-btn"
                className="w-full py-3.5 rounded-full bg-[#3B0B1F] text-[#FDF0F3] font-body text-xs font-semibold uppercase tracking-wider hover:bg-[#2D0817] shadow-xl hover:shadow-2xl transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-[#C8A84B]" />
                <span>Submit Order &amp; Pay</span>
              </button>
            </div>
          );
        })()}
      </div>
    </aside>
  );
};

