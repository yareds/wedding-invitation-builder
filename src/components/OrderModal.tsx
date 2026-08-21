import React, { useState, useEffect } from 'react';
import { WeddingConfig } from '../types';
import { THEME_PRESETS } from '../utils/themePresets';
import {
  saveProjectToDatabase,
  submitProjectOrder,
  getDraftFilesLocally,
  clearDraftFilesLocally,
  getAllSavedProjects,
  SavedProject
} from '../utils/projectDatabase';
import { uploadFileToFirebaseStorage } from '../lib/firebase';
import { X, Send, Copy, Check, MessageSquare, ShieldCheck, Banknote, AlertCircle, Lock, User, Phone, FileText, AlertTriangle, ArrowLeft, Loader2, RotateCw } from 'lucide-react';

interface OrderModalProps {
  config: WeddingConfig;
  isOpen: boolean;
  onClose: () => void;
  onUpdateConfig?: (updated: WeddingConfig) => void;
  projectId: string;
}

// Helper to upload a file to Firebase Storage with retries and a descriptive error message identifying which file failed
async function uploadFileWithRetry(
  file: File | Blob,
  folder: string,
  fileLabel: string,
  timeoutMs: number,
  maxRetries = 2
): Promise<string> {
  let lastError: any = null;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await uploadFileToFirebaseStorage(file, folder, undefined, timeoutMs);
    } catch (err: any) {
      lastError = err;
      console.warn(`[Upload Attempt ${attempt}/${maxRetries} Failed] ${fileLabel}:`, err);
      if (attempt < maxRetries) {
        await new Promise((res) => setTimeout(res, 1200));
      }
    }
  }
  const detail = lastError?.message ? ` (${lastError.message})` : '';
  throw new Error(`${fileLabel} failed to upload — please try again${detail}`);
}

export const OrderModal: React.FC<OrderModalProps> = ({ config, isOpen, onClose, onUpdateConfig, projectId }) => {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [sentSuccess, setSentSuccess] = useState<string | null>(null);
  const [currentProject, setCurrentProject] = useState<SavedProject | null>(null);

  // Customer Order & Contact Form State
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [isOrderSubmitted, setIsOrderSubmitted] = useState<boolean>(false);
  const [showValidationErrors, setShowValidationErrors] = useState<boolean>(false);

  // Submission process state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatusText, setSubmitStatusText] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [lastActionType, setLastActionType] = useState<'submit_only' | 'Telegram' | 'WhatsApp'>('submit_only');

  useEffect(() => {
    if (!isOpen || !projectId) return;
    const existing = getAllSavedProjects().find((p) => p.id === projectId);
    if (existing) {
      setCurrentProject(existing);
      if (existing.customerName && !customerName) {
        setCustomerName(existing.customerName);
      }
      if (existing.customerPhone && !customerPhone) {
        setCustomerPhone(existing.customerPhone);
      }
      if (existing.orderStatus === 'submitted') {
        setIsOrderSubmitted(true);
      }
    }
  }, [isOpen, projectId]);

  if (!isOpen) return null;

  const handleSubmitOrder = async (actionType: 'submit_only' | 'Telegram' | 'WhatsApp' = lastActionType) => {
    if (isOrderSubmitted) {
      if (actionType === 'Telegram') {
        const text = encodeURIComponent(
          `Hello! I am sending my order confirmation for my wedding invitation:\n\nCustomer: ${customerName}\nPhone: ${customerPhone}\nProject ID: ${projectId}`
        );
        window.open(`https://t.me/yared_abegaz?text=${text}`, '_blank');
        setSentSuccess('Telegram');
      } else if (actionType === 'WhatsApp') {
        const text = encodeURIComponent(
          `Hello! I am sending my order confirmation for my wedding invitation:\n\nCustomer: ${customerName}\nPhone: ${customerPhone}\nProject ID: ${projectId}`
        );
        window.open(`https://wa.me/15714749554?text=${text}`, '_blank');
        setSentSuccess('WhatsApp');
      }
      return;
    }
    setLastActionType(actionType);
    if (!isAllInfoComplete) {
      setShowValidationErrors(true);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitStatusText('Preparing files for upload...');

    try {
      // 1. Retrieve pending draft files from IndexedDB
      const draftFiles = await getDraftFilesLocally(projectId);

      let finalHeroImg = config.heroImg;
      let finalBgMusicUrl = config.bgMusicUrl;
      let finalGalleryImgs = [...(config.galleryImgs || [])];

      // 2. Prepare upload promises to run all uploads in parallel
      const heroPromise: Promise<string | null> = draftFiles?.heroImgFile
        ? uploadFileWithRetry(draftFiles.heroImgFile, 'hero_images', 'Your hero image', 90000, 2)
        : Promise.resolve(null);

      // Increase audio upload timeout to 300000ms (5 minutes)
      const audioPromise: Promise<string | null> = draftFiles?.bgMusicFile
        ? uploadFileWithRetry(draftFiles.bgMusicFile, 'audio', 'Your audio file', 300000, 2)
        : Promise.resolve(null);

      // Parallelize gallery photos uploads as well
      const galleryPromises: Promise<string>[] = (draftFiles?.galleryFiles || []).map((file, idx) =>
        uploadFileWithRetry(file, 'gallery', `Gallery photo #${idx + 1}`, 90000, 2)
      );

      const hasMediaToUpload = Boolean(
        draftFiles?.heroImgFile || draftFiles?.bgMusicFile || (draftFiles?.galleryFiles && draftFiles.galleryFiles.length > 0)
      );

      if (hasMediaToUpload) {
        setSubmitStatusText('Uploading media files in parallel...');
      }

      // Parallel execution via Promise.all - if ANY fails, Promise.all rejects immediately
      const [uploadedHeroUrl, uploadedAudioUrl, uploadedGalleryUrls] = await Promise.all([
        heroPromise,
        audioPromise,
        Promise.all(galleryPromises)
      ]);

      if (uploadedHeroUrl) {
        finalHeroImg = uploadedHeroUrl;
      }
      if (uploadedAudioUrl) {
        finalBgMusicUrl = uploadedAudioUrl;
      }
      if (uploadedGalleryUrls && uploadedGalleryUrls.length > 0) {
        let uploadedIdx = 0;
        finalGalleryImgs = finalGalleryImgs.map((imgUrl) => {
          if (imgUrl.startsWith('blob:') && uploadedIdx < uploadedGalleryUrls.length) {
            return uploadedGalleryUrls[uploadedIdx++];
          }
          return imgUrl;
        });

        while (uploadedIdx < uploadedGalleryUrls.length) {
          finalGalleryImgs.push(uploadedGalleryUrls[uploadedIdx++]);
        }
      }

      // Ensure no local blob URLs remain in final config
      if (finalHeroImg && finalHeroImg.startsWith('blob:')) {
        finalHeroImg = '';
      }
      if (finalBgMusicUrl && finalBgMusicUrl.startsWith('blob:')) {
        finalBgMusicUrl = '';
      }
      finalGalleryImgs = finalGalleryImgs.filter((u) => !u.startsWith('blob:'));

      const finalConfig: WeddingConfig = {
        ...config,
        heroImg: finalHeroImg,
        bgMusicUrl: finalBgMusicUrl,
        galleryImgs: finalGalleryImgs
      };

      setSubmitStatusText('Saving project to database...');

      // 3. Save project to local + Firestore database (strictly only executes when all uploads succeed)
      const savedRecord = await saveProjectToDatabase(finalConfig, projectId);
      setCurrentProject(savedRecord);

      setSubmitStatusText('Submitting order details...');

      // 4. Submit order details so orderStatus becomes 'submitted' from its very first cloud save
      await submitProjectOrder(projectId, {
        customerName,
        customerPhone,
        transactionRef: ''
      });

      // 5. Clear pending draft files from IndexedDB
      await clearDraftFilesLocally(projectId);

      if (onUpdateConfig) {
        onUpdateConfig({ ...finalConfig, orderStatus: 'submitted' });
      }

      setIsOrderSubmitted(true);

      // 6. Optional messaging app redirects
      if (actionType === 'Telegram') {
        const text = encodeURIComponent(
          `Hello! I am sending my order confirmation for my wedding invitation:\n\nCustomer: ${customerName}\nPhone: ${customerPhone}\nProject ID: ${projectId}`
        );
        window.open(`https://t.me/yared_abegaz?text=${text}`, '_blank');
        setSentSuccess('Telegram');
      } else if (actionType === 'WhatsApp') {
        const text = encodeURIComponent(
          `Hello! I am sending my order confirmation for my wedding invitation:\n\nCustomer: ${customerName}\nPhone: ${customerPhone}\nProject ID: ${projectId}`
        );
        window.open(`https://wa.me/15714749554?text=${text}`, '_blank');
        setSentSuccess('WhatsApp');
      }
    } catch (err: any) {
      console.error('Order submission failed:', err);
      setSubmitError(
        err?.message || 'Order submission failed. Please check your network connection and try again.'
      );
    } finally {
      setIsSubmitting(false);
      setSubmitStatusText(null);
    }
  };

  if (!isOpen) return null;

  const currentTheme = THEME_PRESETS[config.themeId] || THEME_PRESETS.bordeaux;

  const groom = [config.groomEn, config.groomEth].filter(Boolean).join(' ').trim();
  const bride = [config.brideEn, config.brideEth].filter(Boolean).join(' ').trim();
  const dateGC = (config.dateGC || '').trim();
  const heroImg = (config.heroImg || '').trim();
  const church = (config.churchEn || config.churchEth || '').trim();
  const reception = (config.receptionEn || config.receptionEth || '').trim();
  const contactPhone = (config.phone1 || '').trim();
  const activeProjectId = currentProject?.id || projectId;

  // Check validity of essential wedding fields
  const isHeroImgValid = Boolean(heroImg);
  const isGroomValid = Boolean(groom && groom !== 'የሙሽራው ስም');
  const isBrideValid = Boolean(bride && bride !== 'የሙሽሪት ስም');
  const isDateValid = Boolean(dateGC);
  const isChurchValid = Boolean(church);
  const isReceptionValid = Boolean(reception);

  // Missing essential wedding fields
  const essentialWeddingMissing: { key: string; label: string }[] = [];
  if (!isHeroImgValid) essentialWeddingMissing.push({ key: 'heroImg', label: "Hero Background Photo / Image" });
  if (!isGroomValid) essentialWeddingMissing.push({ key: 'groom', label: "Groom's Name" });
  if (!isBrideValid) essentialWeddingMissing.push({ key: 'bride', label: "Bride's Name" });
  if (!isDateValid) essentialWeddingMissing.push({ key: 'dateGC', label: "Wedding Date" });
  if (!isChurchValid) essentialWeddingMissing.push({ key: 'church', label: "Ceremony Venue (Church/Cathedral)" });
  if (!isReceptionValid) essentialWeddingMissing.push({ key: 'reception', label: "Reception Venue (Hall/Resort)" });

  const isEssentialWeddingComplete = essentialWeddingMissing.length === 0;

  // Check customer contact details validity
  const isCustomerNameValid = Boolean(customerName.trim());
  const isCustomerPhoneValid = Boolean(customerPhone.trim());

  // Combined missing list
  const missingFields: { key: string; label: string }[] = [...essentialWeddingMissing];
  if (!isCustomerNameValid) missingFields.push({ key: 'customerName', label: 'Your Full Name' });
  if (!isCustomerPhoneValid) missingFields.push({ key: 'customerPhone', label: 'Your Contact Phone Number' });

  const isAllInfoComplete = isEssentialWeddingComplete && isCustomerNameValid && isCustomerPhoneValid;

  // Render Basic Notification View if essential wedding information is missing
  if (!isEssentialWeddingComplete) {
    return (
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
        <div className="relative w-full max-w-md bg-[#FAF5F0] text-[#3D0A1F] rounded-3xl border-2 border-[#C8A84B] shadow-2xl p-6 sm:p-8 text-center my-auto">
          <button
            onClick={onClose}
            aria-label="Close Modal"
            className="absolute top-4 right-4 p-2 rounded-full bg-[#F5EBE1] text-[#3D0A1F] hover:bg-[#C8A84B] hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-full bg-amber-100 border-2 border-amber-500 flex items-center justify-center mx-auto mb-4 text-amber-700">
            <AlertTriangle className="w-8 h-8 text-amber-600 animate-pulse" />
          </div>

          <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-300">
            Essential Information Missing
          </span>

          <h2 className="font-serif-heading text-2xl font-bold text-[#3D0A1F] mb-2">
            Please Complete Essential Details
          </h2>

          <p className="font-body text-xs text-[#5C3240] leading-relaxed mb-5">
            You have not entered all essential wedding information. Please go back to the <strong>Wedding Builder</strong> to complete the missing details before submitting your order and paying.
          </p>

          <div className="bg-white rounded-2xl p-4 border border-amber-300 text-left mb-6 space-y-2 shadow-sm">
            <p className="font-body text-xs font-bold text-amber-900">
              Missing Essential Fields ({essentialWeddingMissing.length}):
            </p>
            <div className="space-y-1.5">
              {essentialWeddingMissing.map((f) => (
                <div key={f.key} className="flex items-center gap-2 text-xs text-[#3D0A1F]">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <span className="font-medium">{f.label}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#C8A84B] hover:bg-[#b0923e] text-[#3D0A1F] font-body text-xs font-bold uppercase tracking-wider shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back to Builder to Enter Info</span>
          </button>
        </div>
      </div>
    );
  }

  // Official payment accounts for hosting order (TeleBirr & CBE)
  const activeBankDetails = [
    {
      bankName: 'TeleBirr',
      accountName: 'Yared Abegaz',
      accountNumber: '0995967804'
    },
    {
      bankName: 'Commercial Bank of Ethiopia (CBE)',
      accountName: 'Yared Abegaz',
      accountNumber: '1000450356817'
    }
  ];

  const orderSummaryText = `
💒 WEDDING WEBSITE ORDER SUBMISSION:
• Order ID: ${projectId}
• Customer Full Name: ${customerName}
• Customer Phone: ${customerPhone}
----------------------------------
• Couple: ${groom} & ${bride}
• Date (GC): ${dateGC}
• Date (EC): ${config.dateEC}
• Theme: ${currentTheme.name}
• Ceremony Venue: ${church}
• Reception Venue: ${reception}
• Contact Phone: ${contactPhone}
• RSVP Deadline: ${config.rsvpDeadlineEn}
• Package Price: 25,000 ETB
----------------------------------
Order details submitted for online hosting.
  `.trim();

  const handleCopyAccount = (acc: string) => {
    navigator.clipboard.writeText(acc);
    setCopiedAccount(acc);
    setTimeout(() => setCopiedAccount(null), 3000);
  };

  const handleAttemptSend = async (type: 'Telegram' | 'WhatsApp') => {
    if (!isAllInfoComplete) {
      setShowValidationErrors(true);
      return;
    }

    if (projectId) {
      try {
        await submitProjectOrder(projectId, {
          customerName,
          customerPhone,
        });
      } catch (err) {
        console.error('Error setting order status to submitted:', err);
      }
    }

    const text = encodeURIComponent(`Hello! I am sending my payment receipt for my wedding invitation order:\n\n${orderSummaryText}`);
    if (type === 'Telegram') {
      window.open(`https://t.me/yared_abegaz?text=${text}`, '_blank');
      setSentSuccess('Telegram');
    } else {
      window.open(`https://wa.me/15714749554?text=${text}`, '_blank');
      setSentSuccess('WhatsApp');
    }
  };

  const updateConfigField = (field: keyof WeddingConfig, val: any) => {
    if (onUpdateConfig) {
      onUpdateConfig({
        ...config,
        [field]: val
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#FAF5F0] text-[#3D0A1F] rounded-3xl border-2 border-[#C8A84B] shadow-2xl p-6 sm:p-8 my-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6 border-b border-[#C8A84B]/40 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5EBE1] text-[#A68224] font-body text-xs font-semibold uppercase tracking-wider mb-2 border border-[#C8A84B]/40">
              <ShieldCheck className="w-4 h-4 text-[#A68224]" />
              Order ID: <span className="font-mono text-[#3D0A1F] font-bold">{projectId}</span>
            </div>
            <h2 className="font-serif-heading text-2xl sm:text-3xl font-normal text-[#3D0A1F]">
              Order Confirmation &amp; Payment
            </h2>
            <p className="font-body text-xs text-[#6B4752] mt-1">
              Please enter your contact &amp; payment details below. All fields must be filled to submit your order and pay.
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Modal"
            className="p-2 rounded-full bg-[#F5EBE1] text-[#3D0A1F] hover:bg-[#C8A84B] hover:text-white transition-all cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section 1: Customer Contact Info Inputs */}
        <div className="bg-white rounded-2xl p-4 border border-[#E0D0B8] mb-5 space-y-3 shadow-sm">
          <h3 className="font-serif-heading text-base font-semibold text-[#3D0A1F] flex items-center gap-1.5">
            <User className="w-4 h-4 text-[#A68224]" />
            1. Your Order &amp; Contact Details (Required)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-semibold text-[#3D0A1F] mb-1 flex items-center justify-between">
                <span>Your Full Name <span className="text-red-500">*</span></span>
                {!isCustomerNameValid && showValidationErrors && (
                  <span className="text-red-500 text-[10px]">Required</span>
                )}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Abebe Kebede"
                  className={`w-full pl-8 pr-3 py-2 rounded-xl bg-[#FAF7F2] border text-xs text-[#3D0A1F] focus:outline-none focus:border-[#C8A84B] focus:bg-white ${
                    !isCustomerNameValid && showValidationErrors
                      ? 'border-red-500 ring-2 ring-red-500/20'
                      : 'border-[#D8C7A8]'
                  }`}
                />
                <User className="w-3.5 h-3.5 text-[#A68224] absolute left-2.5 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#3D0A1F] mb-1 flex items-center justify-between">
                <span>Your Phone Number <span className="text-red-500">*</span></span>
                {!isCustomerPhoneValid && showValidationErrors && (
                  <span className="text-red-500 text-[10px]">Required</span>
                )}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="e.g. +251 911 234567"
                  className={`w-full pl-8 pr-3 py-2 rounded-xl bg-[#FAF7F2] border text-xs text-[#3D0A1F] focus:outline-none focus:border-[#C8A84B] focus:bg-white ${
                    !isCustomerPhoneValid && showValidationErrors
                      ? 'border-red-500 ring-2 ring-red-500/20'
                      : 'border-[#D8C7A8]'
                  }`}
                />
                <Phone className="w-3.5 h-3.5 text-[#A68224] absolute left-2.5 top-2.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Wedding Invitation Details Summary & Quick Edit */}
        <div className="bg-white rounded-2xl p-4 border border-[#E0D0B8] mb-5 space-y-3 text-xs font-body text-[#3D0A1F] shadow-sm">
          <div className="flex items-center justify-between border-b border-[#E0D0B8] pb-2">
            <span className="font-semibold text-sm text-[#3D0A1F] flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#A68224]" />
              2. Wedding Invitation Information Check (Required):
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[#3D0A1F]">
            <div>
              <label className="block text-[11px] font-semibold text-[#A68224] mb-0.5">
                Groom's First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={config.groomEn || ''}
                onChange={(e) => updateConfigField('groomEn', e.target.value)}
                placeholder="e.g. Dawit"
                className={`w-full px-2.5 py-1.5 rounded-lg bg-[#FAF7F2] border text-xs text-[#3D0A1F] ${
                  !isGroomValid ? 'border-red-500 ring-1 ring-red-500/20' : 'border-[#D8C7A8]'
                }`}
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#A68224] mb-0.5">
                Groom's Last Name
              </label>
              <input
                type="text"
                value={config.groomEth || ''}
                onChange={(e) => updateConfigField('groomEth', e.target.value)}
                placeholder="e.g. Tesfaye / ተስፋዬ"
                className="w-full px-2.5 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#D8C7A8] text-xs text-[#3D0A1F]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#A68224] mb-0.5">
                Bride's First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={config.brideEn || ''}
                onChange={(e) => updateConfigField('brideEn', e.target.value)}
                placeholder="e.g. Selamawit"
                className={`w-full px-2.5 py-1.5 rounded-lg bg-[#FAF7F2] border text-xs text-[#3D0A1F] ${
                  !isBrideValid ? 'border-red-500 ring-1 ring-red-500/20' : 'border-[#D8C7A8]'
                }`}
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#A68224] mb-0.5">
                Bride's Last Name
              </label>
              <input
                type="text"
                value={config.brideEth || ''}
                onChange={(e) => updateConfigField('brideEth', e.target.value)}
                placeholder="e.g. Bekele / በቀለ"
                className="w-full px-2.5 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#D8C7A8] text-xs text-[#3D0A1F]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#A68224] mb-0.5">
                Wedding Date <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={config.dateGC || ''}
                onChange={(e) => updateConfigField('dateGC', e.target.value)}
                placeholder="e.g. Saturday, May 09, 2026"
                className={`w-full px-2.5 py-1.5 rounded-lg bg-[#FAF7F2] border text-xs text-[#3D0A1F] ${
                  !isDateValid ? 'border-red-500 ring-1 ring-red-500/20' : 'border-[#D8C7A8]'
                }`}
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#A68224] mb-0.5">
                Ceremony Venue <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={config.churchEn || config.churchEth || ''}
                onChange={(e) => {
                  updateConfigField('churchEn', e.target.value);
                  updateConfigField('churchEth', e.target.value);
                }}
                placeholder="Church / Cathedral"
                className={`w-full px-2.5 py-1.5 rounded-lg bg-[#FAF7F2] border text-xs text-[#3D0A1F] ${
                  !isChurchValid ? 'border-red-500 ring-1 ring-red-500/20' : 'border-[#D8C7A8]'
                }`}
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#A68224] mb-0.5">
                Reception Venue <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={config.receptionEn || config.receptionEth || ''}
                onChange={(e) => {
                  updateConfigField('receptionEn', e.target.value);
                  updateConfigField('receptionEth', e.target.value);
                }}
                placeholder="Reception Hall / Resort"
                className={`w-full px-2.5 py-1.5 rounded-lg bg-[#FAF7F2] border text-xs text-[#3D0A1F] ${
                  !isReceptionValid ? 'border-red-500 ring-1 ring-red-500/20' : 'border-[#D8C7A8]'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Bank Payment Information */}
        <div className="mb-6">
          <h3 className="font-serif-heading text-lg font-normal mb-2 flex items-center gap-2 text-[#3D0A1F]">
            <Banknote className="w-5 h-5 text-[#A68224]" />
            Payment Information (Bank Transfer &amp; TeleBirr)
          </h3>
          <p className="font-body text-xs text-[#5C3240] mb-3 leading-relaxed">
            Please transfer the <strong className="font-bold text-[#3D0A1F]">25,000 Birr</strong> fee to any of our official accounts below:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeBankDetails.map((bank, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-3 border border-[#E0D0B8] shadow-sm flex items-center justify-between"
              >
                <div>
                  <p className="font-body text-xs font-bold text-[#3D0A1F]">{bank.bankName}</p>
                  <p className="font-body text-xs text-[#6B4752]">{bank.accountName}</p>
                  <p className="font-mono text-xs font-bold text-[#A68224] mt-0.5">{bank.accountNumber}</p>
                </div>
                <button
                  onClick={() => handleCopyAccount(bank.accountNumber)}
                  className="p-2 rounded-lg bg-[#F5EBE1] hover:bg-[#C8A84B] hover:text-white text-[#3D0A1F] transition-colors cursor-pointer"
                  title="Copy account number"
                >
                  {copiedAccount === bank.accountNumber ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-[#A68224]" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Confirmation Message Card when order is submitted */}
        {isOrderSubmitted && (
          <div className="p-6 bg-emerald-50 rounded-2xl border-2 border-emerald-500 text-[#3D0A1F] space-y-3 text-center my-4 shadow-lg animate-in fade-in">
            <div className="w-14 h-14 rounded-full bg-emerald-100 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-700 shadow-inner">
              <Check className="w-7 h-7 text-emerald-600" />
            </div>
            <h3 className="font-serif-heading text-2xl font-bold text-emerald-950">
              Your order is submitted!
            </h3>
            <p className="font-body text-sm text-emerald-900 leading-relaxed max-w-md mx-auto font-medium">
              Once we receive your payment we will host your invitation online and will send you the link.
            </p>
            <div className="pt-2 border-t border-emerald-200/80">
              <p className="font-mono text-xs font-semibold text-emerald-800">
                Order ID: <span className="font-bold text-emerald-950">{projectId}</span>
              </p>
            </div>
          </div>
        )}

        {/* Submit Order Action Controls */}
        <div className="space-y-3 pt-4 border-t border-[#E0D0B8]">
          <div className="flex items-center justify-between">
            <p className="font-body text-xs font-semibold text-[#3D0A1F] uppercase tracking-wider">
              Submit Order &amp; Confirm
            </p>
            {!isAllInfoComplete && (
              <span className="text-[11px] font-semibold text-amber-700 flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" /> Complete required fields to submit
              </span>
            )}
          </div>

          {/* Submission Loading & Error Feedback with Retry Option */}
          {submitError && (
            <div className="p-4 bg-red-50 border-2 border-red-300 rounded-2xl text-red-800 text-xs space-y-2.5 animate-in fade-in mb-3 shadow-xs">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div className="flex-1 space-y-1">
                  <p className="font-semibold text-sm text-red-900">Upload / Submission Notice</p>
                  <p className="font-medium text-red-700 leading-relaxed">{submitError}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSubmitError(null)}
                  className="p-1 text-red-400 hover:text-red-600 rounded-lg cursor-pointer transition-colors"
                  title="Dismiss error"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="pt-2 flex items-center justify-end gap-2 border-t border-red-200/80">
                <button
                  type="button"
                  onClick={() => handleSubmitOrder(lastActionType)}
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-semibold text-xs transition-all cursor-pointer shadow-xs"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  Retry Submission
                </button>
              </div>
            </div>
          )}

          {isSubmitting && (
            <div className="p-4 bg-[#FDF0F3] border border-[#C8A84B] rounded-2xl text-[#3D0A1F] text-xs flex items-center justify-center gap-3 animate-pulse mb-3">
              <Loader2 className="w-5 h-5 text-[#C8A84B] animate-spin shrink-0" />
              <span className="font-semibold text-sm">{submitStatusText || 'Processing order...'}</span>
            </div>
          )}

          <button
            onClick={() => handleSubmitOrder('submit_only')}
            disabled={!isAllInfoComplete || isSubmitting || isOrderSubmitted}
            className={`w-full py-4 px-6 rounded-2xl font-body text-sm font-bold uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 ${
              isAllInfoComplete && !isSubmitting && !isOrderSubmitted
                ? 'bg-[#3D0A1F] text-[#FAF5F0] hover:bg-[#2D0817] cursor-pointer hover:shadow-xl border-2 border-[#C8A84B]'
                : 'bg-gray-200 text-gray-500 opacity-60 cursor-not-allowed border border-gray-300'
            }`}
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 text-[#C8A84B] animate-spin" />
            ) : isOrderSubmitted ? (
              <Check className="w-5 h-5 text-emerald-600" />
            ) : (
              <Check className="w-5 h-5 text-[#C8A84B]" />
            )}
            <span>
              {isSubmitting
                ? 'Submitting Order...'
                : isOrderSubmitted
                ? 'Order Submitted'
                : 'Submit Order'}
            </span>
          </button>

          {/* Optional Direct Messaging Channels */}
          <div className="pt-2 border-t border-[#E0D0B8]/60 space-y-2">
            <p className="text-xs font-body font-semibold text-[#3D0A1F] text-center">
              Message us via:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => handleSubmitOrder('Telegram')}
                disabled={!isAllInfoComplete || isSubmitting}
                className={`py-2.5 px-3 rounded-xl font-body text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  isAllInfoComplete && !isSubmitting
                    ? 'bg-[#0088cc] text-white hover:bg-[#0077b5] shadow-sm cursor-pointer'
                    : 'bg-gray-200 text-gray-500 opacity-60 cursor-not-allowed border border-gray-300'
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>Notify via Telegram</span>
              </button>

              <button
                onClick={() => handleSubmitOrder('WhatsApp')}
                disabled={!isAllInfoComplete || isSubmitting}
                className={`py-2.5 px-3 rounded-xl font-body text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  isAllInfoComplete && !isSubmitting
                    ? 'bg-[#25D366] text-white hover:bg-[#20ba5a] shadow-sm cursor-pointer'
                    : 'bg-gray-200 text-gray-500 opacity-60 cursor-not-allowed border border-gray-300'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Notify via WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

