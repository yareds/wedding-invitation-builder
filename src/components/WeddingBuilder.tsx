import React, { useState, useEffect } from 'react';
import { WeddingConfig, ThemeId, FrameStyleId, TimelineEvent } from '../types';
import { THEME_PRESETS, SAMPLE_WEDDING_CONFIG, DEFAULT_WEDDING_CONFIG } from '../utils/themePresets';
import { FRAME_STYLE_OPTIONS } from '../utils/frameStyles';
import { saveDraftFilesLocally, getDraftFilesLocally, saveLocalDraftConfig } from '../utils/projectDatabase';
import { Palette, Heart, Image as ImageIcon, Music, MapPin, Plus, Trash2, Check, ShoppingBag, Monitor, Smartphone, Upload, AlertCircle, Sparkles, RefreshCw, Loader2, X, Frame, Layers } from 'lucide-react';

interface WeddingBuilderProps {
  config: WeddingConfig;
  onChangeConfig: (newConfig: WeddingConfig) => void;
  onOpenOrderModal: () => void;
  deviceMode: 'desktop' | 'mobile';
  onToggleDeviceMode: (mode: 'desktop' | 'mobile') => void;
  projectId: string;
}

export const WeddingBuilder: React.FC<WeddingBuilderProps> = ({
  config,
  onChangeConfig,
  onOpenOrderModal,
  deviceMode,
  onToggleDeviceMode,
  projectId
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [step1Tab, setStep1Tab] = useState<'palettes' | 'frames'>('palettes');
  const [selectedFrameCategory, setSelectedFrameCategory] = useState<string>('All');
  const [selectedThemeCategory, setSelectedThemeCategory] = useState<string>('All');

  const steps = [
    { id: 1, title: 'Color & Theme', icon: Palette },
    { id: 2, title: 'Hero & Audio', icon: Music },
    { id: 3, title: 'Couple & Date', icon: Heart },
    { id: 4, title: 'Venues & Schedules', icon: MapPin },
    { id: 5, title: 'Story & Gallery', icon: ImageIcon }
  ];

  // Raw File objects stored locally in React state for pending upload
  const [rawHeroFile, setRawHeroFile] = useState<File | undefined>(undefined);
  const [rawMusicFile, setRawMusicFile] = useState<File | undefined>(undefined);
  const [rawGalleryFiles, setRawGalleryFiles] = useState<File[]>([]);

  // Load existing draft files on mount or projectId change
  useEffect(() => {
    let isMounted = true;
    if (projectId) {
      getDraftFilesLocally(projectId).then((draft) => {
        if (!isMounted || !draft) return;

        let updated = { ...config };
        let configChanged = false;

        if (draft.heroImgFile) {
          setRawHeroFile(draft.heroImgFile);
          updated.heroImg = URL.createObjectURL(draft.heroImgFile);
          configChanged = true;
        }

        if (draft.bgMusicFile) {
          setRawMusicFile(draft.bgMusicFile);
          updated.bgMusicUrl = URL.createObjectURL(draft.bgMusicFile);
          configChanged = true;
        }

        if (draft.galleryFiles && draft.galleryFiles.length > 0) {
          setRawGalleryFiles(draft.galleryFiles);
          const freshBlobUrls = draft.galleryFiles.map((f) => URL.createObjectURL(f));
          const existingNonBlob = (config.galleryImgs || []).filter((url) => !url.startsWith('blob:'));
          updated.galleryImgs = [...existingNonBlob, ...freshBlobUrls];
          configChanged = true;
        }

        if (configChanged) {
          onChangeConfig(updated);
        }
      });
    }

    return () => {
      isMounted = false;
    };
  }, [projectId]);

  // Debounced autosave (~1s) of text config fields to IndexedDB/localStorage only
  useEffect(() => {
    const timer = setTimeout(() => {
      if (projectId && config) {
        saveLocalDraftConfig(config, projectId);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [config, projectId]);

  // Handler for text input updates
  const handleTextChange = (field: keyof WeddingConfig, val: any) => {
    onChangeConfig({
      ...config,
      [field]: val
    });
  };

  const [heroUploadError, setHeroUploadError] = useState<string | null>(null);
  const [musicUploadError, setMusicUploadError] = useState<string | null>(null);
  const [galleryUploadError, setGalleryUploadError] = useState<string | null>(null);

  // Constants for max upload sizes
  const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
  const MAX_AUDIO_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

  // Image Upload handler for Hero Background (local preview + IndexedDB draft store)
  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      setHeroUploadError('Image file is too large (max 5MB). Please choose a smaller photo.');
      e.target.value = '';
      return;
    }

    setHeroUploadError(null);
    try {
      const previewUrl = URL.createObjectURL(file);
      handleTextChange('heroImg', previewUrl);
      setRawHeroFile(file);

      await saveDraftFilesLocally(projectId, {
        heroImgFile: file,
        bgMusicFile: rawMusicFile,
        galleryFiles: rawGalleryFiles
      });
    } catch (err: any) {
      console.error('Hero Image Local Save Error:', err);
      setHeroUploadError('Photo failed to load. Please try again.');
    } finally {
      e.target.value = '';
    }
  };

  // Audio Upload handler for Background Music (local preview + IndexedDB draft store)
  const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_AUDIO_SIZE_BYTES) {
      setMusicUploadError('Audio file is too large (max 10MB). Please choose a smaller audio file.');
      e.target.value = '';
      return;
    }

    setMusicUploadError(null);

    try {
      const previewUrl = URL.createObjectURL(file);
      handleTextChange('bgMusicUrl', previewUrl);
      setRawMusicFile(file);

      await saveDraftFilesLocally(projectId, {
        heroImgFile: rawHeroFile,
        bgMusicFile: file,
        galleryFiles: rawGalleryFiles
      });
    } catch (err: any) {
      console.error('Audio Local Save Error:', err);
      setMusicUploadError('Audio failed to load. Please try again.');
    } finally {
      e.target.value = '';
    }
  };

  // Gallery Image Upload (local previews + IndexedDB draft store)
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

    setGalleryUploadError(null);

    try {
      const previewUrls = filesToProcess.map((f) => URL.createObjectURL(f));
      const updatedGalleryImgs = [...currentGallery, ...previewUrls];
      const updatedRawGalleryFiles = [...rawGalleryFiles, ...filesToProcess];

      onChangeConfig({
        ...config,
        galleryImgs: updatedGalleryImgs
      });
      setRawGalleryFiles(updatedRawGalleryFiles);

      await saveDraftFilesLocally(projectId, {
        heroImgFile: rawHeroFile,
        bgMusicFile: rawMusicFile,
        galleryFiles: updatedRawGalleryFiles
      });
    } catch (err: any) {
      console.error('Gallery Local Save Error:', err);
      setGalleryUploadError('Photos failed to load. Please try again.');
    } finally {
      e.target.value = '';
    }
  };

  const removeGalleryImage = async (index: number) => {
    const currentImgs = config.galleryImgs || [];
    const removedUrl = currentImgs[index];
    const updatedConfigImgs = currentImgs.filter((_, idx) => idx !== index);

    let updatedRawFiles = [...rawGalleryFiles];
    if (removedUrl && removedUrl.startsWith('blob:') && rawGalleryFiles.length > 0) {
      const blobUrls = currentImgs.filter((u) => u.startsWith('blob:'));
      const blobIdx = blobUrls.indexOf(removedUrl);
      if (blobIdx >= 0 && blobIdx < updatedRawFiles.length) {
        updatedRawFiles.splice(blobIdx, 1);
      }
    }

    handleTextChange('galleryImgs', updatedConfigImgs);
    setRawGalleryFiles(updatedRawFiles);

    await saveDraftFilesLocally(projectId, {
      heroImgFile: rawHeroFile,
      bgMusicFile: rawMusicFile,
      galleryFiles: updatedRawFiles
    });
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
    <aside className="w-full lg:h-full bg-white border-b lg:border-b-0 lg:border-r border-[#C8A84B]/30 flex flex-col shadow-lg shrink-0">
      {/* Sticky Top Builder Branding Header & Customization Step Navigation Menu */}
      <div className="sticky top-0 z-20 bg-white border-b border-[#C8A84B]/40 shadow-xs shrink-0">
        <div className="p-3.5 sm:p-4 bg-[#FAF0F3] text-[#3B0B1F] border-b border-[#C8A84B]/40 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-body text-[10px] uppercase tracking-[0.2em] text-[#B85B75] font-bold">
                Studio Customizer
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C8A84B]" />
              <span className="text-[10px] text-gray-500 font-mono">Ethiopian Edition</span>
            </div>
            <h1 className="font-serif-heading text-base sm:text-lg font-normal text-[#3B0B1F]">
              Wedding Invitation Builder
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile Jump to Preview Button */}
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('live-invitation-preview');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="lg:hidden px-2.5 py-1 text-[11px] font-bold rounded-full bg-[#3B0B1F] text-[#FAF0F3] border border-[#C8A84B]/50 hover:bg-[#C8A84B] hover:text-[#3B0B1F] transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
            >
              <span>Preview Below ↓</span>
            </button>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-[#C8A84B]/40 shadow-sm">
              <button
                onClick={() => onToggleDeviceMode('desktop')}
                className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                  deviceMode === 'desktop' ? 'bg-[#C8A84B] text-[#3B0B1F]' : 'text-[#3B0B1F]/60 hover:text-[#3B0B1F]'
                }`}
                title="Desktop Preview Mode"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => onToggleDeviceMode('mobile')}
                className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                  deviceMode === 'mobile' ? 'bg-[#C8A84B] text-[#3B0B1F]' : 'text-[#3B0B1F]/60 hover:text-[#3B0B1F]'
                }`}
                title="Mobile Device Preview"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Step Navigation Tabs */}
        <div className="bg-[#3B0B1F] p-2 sm:p-2.5 shadow-md border-b-2 border-[#C8A84B]">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
            {steps.map((step) => {
              const IconComp = step.icon;
              const isActive = activeStep === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-body font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 border ${
                    isActive
                      ? 'bg-[#C8A84B] text-[#3B0B1F] border-[#FFF2C2] shadow-lg scale-102 ring-2 ring-[#C8A84B]/40'
                      : 'bg-white/10 text-white/90 border-white/15 hover:bg-white/20 hover:text-white hover:border-[#C8A84B]/60'
                  }`}
                >
                  <IconComp className={`w-3.5 h-3.5 ${isActive ? 'text-[#3B0B1F]' : 'text-[#C8A84B]'}`} />
                  <span>{step.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Builder Step Form Body - Natural Flow on Mobile/Tablet, Independently Scrollable on Desktop */}
      <div className="p-4 sm:p-5 space-y-6 lg:flex-1 lg:overflow-y-auto lg:overscroll-contain">
        {/* STEP 1: COLOR PALETTE & VISUAL THEME */}
        {activeStep === 1 && (
          <div className="space-y-5">
            {/* Sticky Sub-Tab Menu & Category Navigation for Color & Frame Styling */}
            <div className="sticky -top-4 sm:-top-5 z-20 bg-white/95 backdrop-blur-md pt-1 pb-3 -mx-4 sm:-mx-5 px-4 sm:px-5 border-b border-[#C8A84B]/30 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif-heading text-base sm:text-lg font-normal text-[#3B0B1F]">
                    Design, Color &amp; Frame Styling
                  </h3>
                  <p className="font-body text-[11px] text-[#3B0B1F]/70">
                    Browse 6 color palettes &amp; 8 handcrafted luxury frame styles.
                  </p>
                </div>
              </div>

              {/* Sub-Tab Navigation Switcher (Sticky at top of builder) */}
              <div className="grid grid-cols-2 p-1 bg-[#FAF0F3] border border-[#C8A84B]/40 rounded-2xl gap-1 shadow-inner">
                <button
                  type="button"
                  onClick={() => setStep1Tab('palettes')}
                  className={`py-2 px-3 rounded-xl font-body text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    step1Tab === 'palettes'
                      ? 'bg-[#3B0B1F] text-[#FAF0F3] shadow-md border border-[#C8A84B]/50 font-bold'
                      : 'text-[#3B0B1F] hover:bg-white/60'
                  }`}
                >
                  <Palette className="w-3.5 h-3.5 text-[#C8A84B]" />
                  <span>Color Themes ({Object.keys(THEME_PRESETS).length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStep1Tab('frames')}
                  className={`py-2 px-3 rounded-xl font-body text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    step1Tab === 'frames'
                      ? 'bg-[#3B0B1F] text-[#FAF0F3] shadow-md border border-[#C8A84B]/50 font-bold'
                      : 'text-[#3B0B1F] hover:bg-white/60'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-[#C8A84B]" />
                  <span>Frame Styles ({FRAME_STYLE_OPTIONS.length})</span>
                </button>
              </div>

              {/* Sticky Category Filter Chips when Palettes tab is active */}
              {step1Tab === 'palettes' && (
                <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none text-xs">
                  {['All', 'Jewel Tones', 'Pastels & Florals', 'Earth Tones', 'Neutrals & Classic', 'Bold & Modern'].map((cat) => {
                    const isCatActive = selectedThemeCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedThemeCategory(cat)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                          isCatActive
                            ? 'bg-[#C8A84B] text-[#3B0B1F] shadow-sm font-bold'
                            : 'bg-white border border-gray-200 text-[#3B0B1F]/70 hover:border-[#C8A84B]'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Sticky Category Filter Chips when Frame Styles tab is active */}
              {step1Tab === 'frames' && (
                <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none text-xs">
                  {['All', 'Luxury', 'Floral', 'Minimalist', 'Classic', 'Romantic', 'Contemporary', 'Heritage', 'Celestial'].map((cat) => {
                    const isCatActive = selectedFrameCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedFrameCategory(cat)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                          isCatActive
                            ? 'bg-[#C8A84B] text-[#3B0B1F] shadow-sm font-bold'
                            : 'bg-white border border-gray-200 text-[#3B0B1F]/70 hover:border-[#C8A84B]'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* TAB 1: COLOR PALETTES */}
            {step1Tab === 'palettes' && (
              <div className="space-y-3 animate-in fade-in duration-200 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#A87B1B] uppercase tracking-wider">
                    Select Visual Color Palette ({
                      Object.values(THEME_PRESETS).filter((t) => {
                        if (selectedThemeCategory === 'All') return true;
                        const themeCatMap: Record<string, string> = {
                          bordeaux: 'Jewel Tones',
                          sapphire: 'Jewel Tones',
                          amethyst: 'Jewel Tones',
                          rubyvelvet: 'Jewel Tones',
                          peacockteal: 'Jewel Tones',
                          emerald: 'Pastels & Florals',
                          rosegarden: 'Pastels & Florals',
                          lavender: 'Pastels & Florals',
                          sagemint: 'Pastels & Florals',
                          peachblossom: 'Pastels & Florals',
                          terracotta: 'Earth Tones',
                          olivebronze: 'Earth Tones',
                          desertsand: 'Earth Tones',
                          espressopearl: 'Earth Tones',
                          goldluxury: 'Neutrals & Classic',
                          classicivory: 'Neutrals & Classic',
                          slateplatinum: 'Neutrals & Classic',
                          midnight: 'Bold & Modern',
                          marigold: 'Bold & Modern',
                          electricviolet: 'Bold & Modern'
                        };
                        return themeCatMap[t.id] === selectedThemeCategory;
                      }).length
                    })
                  </span>
                  <button
                    type="button"
                    onClick={() => setStep1Tab('frames')}
                    className="text-[11px] text-[#3B0B1F] hover:text-[#A87B1B] font-semibold underline cursor-pointer"
                  >
                    Customize Frame &rarr;
                  </button>
                </div>

                {Object.values(THEME_PRESETS)
                  .filter((t) => {
                    if (selectedThemeCategory === 'All') return true;
                    const themeCatMap: Record<string, string> = {
                      bordeaux: 'Jewel Tones',
                      sapphire: 'Jewel Tones',
                      amethyst: 'Jewel Tones',
                      rubyvelvet: 'Jewel Tones',
                      peacockteal: 'Jewel Tones',
                      emerald: 'Pastels & Florals',
                      rosegarden: 'Pastels & Florals',
                      lavender: 'Pastels & Florals',
                      sagemint: 'Pastels & Florals',
                      peachblossom: 'Pastels & Florals',
                      terracotta: 'Earth Tones',
                      olivebronze: 'Earth Tones',
                      desertsand: 'Earth Tones',
                      espressopearl: 'Earth Tones',
                      goldluxury: 'Neutrals & Classic',
                      classicivory: 'Neutrals & Classic',
                      slateplatinum: 'Neutrals & Classic',
                      midnight: 'Bold & Modern',
                      marigold: 'Bold & Modern',
                      electricviolet: 'Bold & Modern'
                    };
                    return themeCatMap[t.id] === selectedThemeCategory;
                  })
                  .map((t) => {
                  const isSelected = config.themeId === t.id;
                  return (
                    <div
                      key={t.id}
                      onClick={() => handleTextChange('themeId', t.id as ThemeId)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#C8A84B] bg-[#FDF0F3] shadow-md ring-2 ring-[#C8A84B]/20'
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
            )}

            {/* TAB 2: FRAME & BORDER STYLES */}
            {step1Tab === 'frames' && (
              <div className="space-y-3 animate-in fade-in duration-200 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#A87B1B] uppercase tracking-wider">
                    Select Ornamental Frame Style ({FRAME_STYLE_OPTIONS.filter((f) => selectedFrameCategory === 'All' || f.category === selectedFrameCategory).length})
                  </span>
                  <button
                    type="button"
                    onClick={() => setStep1Tab('palettes')}
                    className="text-[11px] text-[#3B0B1F] hover:text-[#A87B1B] font-semibold underline cursor-pointer"
                  >
                    &larr; Color Palettes
                  </button>
                </div>

                {/* Frame Style Options List */}
                <div className="space-y-3">
                  {FRAME_STYLE_OPTIONS.filter((f) => selectedFrameCategory === 'All' || f.category === selectedFrameCategory).map((frame) => {
                    const currentEffectiveFrame: FrameStyleId =
                      config.frameStyle ||
                      (config.themeId === 'emerald'
                        ? 'botanical-floral'
                        : config.themeId === 'midnight'
                        ? 'celestial-sparkle'
                        : config.themeId === 'goldluxury'
                        ? 'contemporary-geo'
                        : config.themeId === 'classicivory'
                        ? 'classic-arch'
                        : config.themeId === 'rosegarden'
                        ? 'romantic-lace'
                        : 'royal-luxury');

                    const isSelected = currentEffectiveFrame === frame.id;

                    return (
                      <div
                        key={frame.id}
                        onClick={() => handleTextChange('frameStyle', frame.id as FrameStyleId)}
                        className={`group relative p-3.5 sm:p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col gap-3 ${
                          isSelected
                            ? 'border-[#C8A84B] bg-[#FDF0F3] shadow-md ring-2 ring-[#C8A84B]/25'
                            : 'border-gray-200 bg-white hover:border-[#D4849A]/50 hover:shadow-sm'
                        }`}
                      >
                        {/* Large Vector Frame Artwork Preview Box */}
                        <div className={`relative w-full h-32 sm:h-36 rounded-xl border p-2 flex items-center justify-center overflow-hidden transition-colors ${
                          isSelected
                            ? 'bg-gradient-to-br from-[#FAF4F6] to-[#F6E8EE] border-[#C8A84B] shadow-inner'
                            : 'bg-[#FAF8F5] border-gray-200 group-hover:bg-[#FFFDFB]'
                        }`}>
                          <div
                            className="w-full h-full max-w-[220px] mx-auto flex items-center justify-center"
                            dangerouslySetInnerHTML={{ __html: frame.previewSvg }}
                          />

                          {/* Gold Checkmark Badge in Top-Right Corner when selected */}
                          {isSelected && (
                            <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-[#3B0B1F] border border-[#C8A84B] flex items-center justify-center shadow-md animate-in fade-in zoom-in-75 duration-200">
                              <Check className="w-3.5 h-3.5 text-[#C8A84B]" />
                            </div>
                          )}
                        </div>

                        {/* Frame Details below preview */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="font-serif-heading text-sm sm:text-base font-semibold text-[#3B0B1F] flex items-center gap-1.5 truncate">
                              <span>{frame.name}</span>
                            </h4>
                            <span className="font-body text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-[#3B0B1F] text-[#C8A84B] shrink-0">
                              {frame.tag}
                            </span>
                          </div>

                          <p className="font-body text-xs text-[#3B0B1F]/75 leading-relaxed">
                            {frame.description}
                          </p>

                          <div className="pt-1 flex items-center justify-between text-[11px]">
                            <span className="text-[#A87B1B] font-semibold flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-[#C8A84B]" />
                              {frame.category} Style
                            </span>
                            {isSelected && (
                              <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#C8A84B]/20 text-[#3B0B1F] border border-[#C8A84B]/40">
                                Selected Frame
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: HERO IMAGE & BACKGROUND MUSIC */}
        {activeStep === 2 && (
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
                    <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#3B0B1F] text-[#FDF0F3] font-body text-xs font-semibold cursor-pointer hover:bg-[#2D0817] shadow-sm">
                      <Upload className="w-4 h-4 text-[#C8A84B]" />
                      <span>Upload Custom Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleHeroImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
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
                    <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FDF0F3] border border-[#C8A84B] text-[#3B0B1F] font-body text-xs font-semibold cursor-pointer hover:bg-[#D4849A]/20">
                      <Music className="w-4 h-4 text-[#C8A84B]" />
                      <span>Upload MP3 File</span>
                      <input
                        type="file"
                        accept="audio/*"
                        onChange={handleAudioUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

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

        {/* STEP 3: COUPLE & DATE INFO */}
        {activeStep === 3 && (
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
                  placeholder="e.g. Dawit Tesfaye"
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
                  placeholder="e.g. ዳዊት ተስፋዬ"
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
                  placeholder="e.g. Selamawit Bekele"
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
                  placeholder="e.g. ሰላማዊት በቀለ"
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
                1. Sacred Matrimony . የቃልኪዳን ስነስርዓት
              </h4>
              <input
                type="text"
                value={config.churchEn}
                onChange={(e) => handleTextChange('churchEn', e.target.value)}
                placeholder="e.g. Holy Trinity Cathedral, Addis Ababa"
                className="w-full px-3 py-1.5 rounded-lg border text-xs bg-white text-[#3B0B1F]"
              />
              <input
                type="text"
                value={config.churchEth}
                onChange={(e) => handleTextChange('churchEth', e.target.value)}
                placeholder="e.g. ቅድስት ሥላሴ ካቴድራል፤ አዲስ አበባ"
                className="w-full px-3 py-1.5 rounded-lg border text-xs bg-white text-[#3B0B1F]"
              />
            </div>

            {/* Reception Details */}
            <div className="space-y-2 p-3 bg-[#FDF0F3]/50 rounded-2xl border border-[#D4849A]/30">
              <h4 className="font-serif-heading text-xs font-bold text-[#3B0B1F] uppercase tracking-wider">
                2. Reception &amp; Dinner . የምሳ/እራት ግብዣ ቦታ
              </h4>
              <input
                type="text"
                value={config.receptionEn}
                onChange={(e) => handleTextChange('receptionEn', e.target.value)}
                placeholder="e.g. Ghion Hotel Grand Hall, Addis Ababa"
                className="w-full px-3 py-1.5 rounded-lg border text-xs bg-white text-[#3B0B1F]"
              />
              <input
                type="text"
                value={config.receptionEth}
                onChange={(e) => handleTextChange('receptionEth', e.target.value)}
                placeholder="e.g. ግዮን ሆቴል (ግራንድ ሆል)፤ አዲስ አበባ"
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
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#3B0B1F] text-[#FDF0F3] font-body text-xs font-semibold cursor-pointer hover:bg-[#2D0817]">
                    <Plus className="w-4 h-4 text-[#C8A84B]" />
                    <span>Add Photos</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleGalleryUpload}
                      className="hidden"
                    />
                  </label>
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

