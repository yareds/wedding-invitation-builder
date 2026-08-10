import React, { useState, useEffect } from 'react';
import { WeddingConfig } from '../types';
import { THEME_PRESETS } from '../utils/themePresets';
import { saveProjectToDatabase, submitProjectOrder, SavedProject } from '../utils/projectDatabase';
import { X, Send, Copy, Check, MessageSquare, ShieldCheck, Banknote, AlertCircle, Lock, User, Phone, FileText, AlertTriangle, ArrowLeft } from 'lucide-react';

interface OrderModalProps {
  config: WeddingConfig;
  isOpen: boolean;
  onClose: () => void;
  onUpdateConfig?: (updated: WeddingConfig) => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({ config, isOpen, onClose, onUpdateConfig }) => {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [sentSuccess, setSentSuccess] = useState<string | null>(null);
  const [currentProject, setCurrentProject] = useState<SavedProject | null>(null);

  // Customer Order & Contact Form State
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [isOrderSubmitted, setIsOrderSubmitted] = useState<boolean>(false);
  const [showValidationErrors, setShowValidationErrors] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      // Save project record in database registry for admin processing
      saveProjectToDatabase(config, currentProject?.id).then((savedRecord) => {
        setCurrentProject(savedRecord);
      });
    }
  }, [isOpen, config]);

  if (!isOpen) return null;

  const currentTheme = THEME_PRESETS[config.themeId] || THEME_PRESETS.bordeaux;

  const groom = (config.groomEn || config.groomEth || '').trim();
  const bride = (config.brideEn || config.brideEth || '').trim();
  const dateGC = (config.dateGC || '').trim();
  const church = (config.churchEn || config.churchEth || '').trim();
  const reception = (config.receptionEn || config.receptionEth || '').trim();
  const contactPhone = (config.phone1 || '').trim();
  const projectId = currentProject?.id || 'WED-2026-TEMP';

  // Check validity of essential wedding fields
  const isGroomValid = Boolean(groom && groom !== 'የሙሽራው ስም');
  const isBrideValid = Boolean(bride && bride !== 'የሙሽሪት ስም');
  const isDateValid = Boolean(dateGC);
  const isChurchValid = Boolean(church);
  const isReceptionValid = Boolean(reception);
  const isPhone1Valid = Boolean(contactPhone);

  // Missing essential wedding fields
  const essentialWeddingMissing: { key: string; label: string }[] = [];
  if (!isGroomValid) essentialWeddingMissing.push({ key: 'groom', label: "Groom's Name" });
  if (!isBrideValid) essentialWeddingMissing.push({ key: 'bride', label: "Bride's Name" });
  if (!isDateValid) essentialWeddingMissing.push({ key: 'dateGC', label: "Wedding Date" });
  if (!isChurchValid) essentialWeddingMissing.push({ key: 'church', label: "Ceremony Venue" });
  if (!isReceptionValid) essentialWeddingMissing.push({ key: 'reception', label: "Reception Venue" });
  if (!isPhone1Valid) essentialWeddingMissing.push({ key: 'phone1', label: "Contact Phone Number" });

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

  // Filter out Awash Bank tile & fallback to default Telebirr and CBE details
  const fallbackBankDetails = [
    {
      bankName: 'Telebirr SuperApp',
      accountName: 'Yared Abegaz',
      accountNumber: '0995967804'
    },
    {
      bankName: 'Commercial Bank of Ethiopia (CBE)',
      accountName: 'Yared Abegaz',
      accountNumber: '1000450356817'
    }
  ];

  const rawBankDetails = config.bankDetails && config.bankDetails.length > 0
    ? config.bankDetails
    : fallbackBankDetails;

  const activeBankDetails = rawBankDetails.filter(
    (b) => !b.bankName.toLowerCase().includes('awash')
  );

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
• Package Price: 30,000 ETB
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

        {/* Validation Warning Alert (If missing information) */}
        {(!isAllInfoComplete || showValidationErrors) && (
          <div className="p-4 bg-amber-50 rounded-2xl border-2 border-amber-400 text-amber-950 text-xs font-body mb-5 shadow-sm space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 animate-bounce" />
              <span>Incomplete Information — Cannot Submit Order Yet</span>
            </div>
            <p className="text-amber-800 leading-relaxed">
              You must provide all required order contact information and wedding invitation details before submitting your order and payment receipt.
            </p>
            <div className="pt-2 border-t border-amber-200">
              <p className="font-bold text-amber-900 mb-1">Missing Required Fields ({missingFields.length}):</p>
              <div className="flex flex-wrap gap-1.5">
                {missingFields.map((f) => (
                  <span
                    key={f.key}
                    className="px-2.5 py-1 rounded-md bg-amber-100 border border-amber-300 text-amber-900 text-[11px] font-semibold flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3 text-red-500 shrink-0" />
                    {f.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

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
            <span className="font-semibold text-sm text-[#3D0A1F]">2. Wedding Invitation Information Check:</span>
            <span className="font-serif-heading font-bold text-base text-[#A68224]">30,000 ETB</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[#3D0A1F]">
            <div>
              <label className="block text-[11px] font-semibold text-[#A68224] mb-0.5">
                Groom Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={config.groomEn || config.groomEth || ''}
                onChange={(e) => {
                  updateConfigField('groomEn', e.target.value);
                  updateConfigField('groomEth', e.target.value);
                }}
                placeholder="Groom's Full Name"
                className={`w-full px-2.5 py-1.5 rounded-lg bg-[#FAF7F2] border text-xs text-[#3D0A1F] ${
                  !isGroomValid ? 'border-red-500' : 'border-[#D8C7A8]'
                }`}
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#A68224] mb-0.5">
                Bride Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={config.brideEn || config.brideEth || ''}
                onChange={(e) => {
                  updateConfigField('brideEn', e.target.value);
                  updateConfigField('brideEth', e.target.value);
                }}
                placeholder="Bride's Full Name"
                className={`w-full px-2.5 py-1.5 rounded-lg bg-[#FAF7F2] border text-xs text-[#3D0A1F] ${
                  !isBrideValid ? 'border-red-500' : 'border-[#D8C7A8]'
                }`}
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
                  !isDateValid ? 'border-red-500' : 'border-[#D8C7A8]'
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
                  !isChurchValid ? 'border-red-500' : 'border-[#D8C7A8]'
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
                  !isReceptionValid ? 'border-red-500' : 'border-[#D8C7A8]'
                }`}
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#A68224] mb-0.5">
                Contact Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={config.phone1 || ''}
                onChange={(e) => updateConfigField('phone1', e.target.value)}
                placeholder="Primary Contact Phone"
                className={`w-full px-2.5 py-1.5 rounded-lg bg-[#FAF7F2] border text-xs text-[#3D0A1F] ${
                  !isPhone1Valid ? 'border-red-500' : 'border-[#D8C7A8]'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Bank Payment Information */}
        <div className="mb-6">
          <h3 className="font-serif-heading text-lg font-normal mb-2 flex items-center gap-2 text-[#3D0A1F]">
            <Banknote className="w-5 h-5 text-[#A68224]" />
            Payment Information (Bank Transfer &amp; Telebirr)
          </h3>
          <p className="font-body text-xs text-[#5C3240] mb-3 leading-relaxed">
            Please transfer the 30,000 ETB fee to any of our official accounts below:
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

          <button
            onClick={() => {
              if (!isAllInfoComplete) {
                setShowValidationErrors(true);
                return;
              }
              saveProjectToDatabase(config, currentProject?.id).then(() => {
                setIsOrderSubmitted(true);
              });
            }}
            disabled={!isAllInfoComplete}
            className={`w-full py-4 px-6 rounded-2xl font-body text-sm font-bold uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 ${
              isAllInfoComplete
                ? 'bg-[#3D0A1F] text-[#FAF5F0] hover:bg-[#2D0817] cursor-pointer hover:shadow-xl border-2 border-[#C8A84B]'
                : 'bg-gray-200 text-gray-500 opacity-60 cursor-not-allowed border border-gray-300'
            }`}
          >
            <Check className="w-5 h-5 text-[#C8A84B]" />
            <span>Submit Order</span>
          </button>

          {/* Optional Direct Messaging Channels */}
          <div className="pt-2 border-t border-[#E0D0B8]/60 space-y-2">
            <p className="text-[11px] font-body text-[#6B4752] text-center">
              Or send your order details directly via messaging app:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => {
                  if (!isAllInfoComplete) {
                    setShowValidationErrors(true);
                    return;
                  }
                  saveProjectToDatabase(config, currentProject?.id).then(() => {
                    setIsOrderSubmitted(true);
                    handleAttemptSend('Telegram');
                  });
                }}
                disabled={!isAllInfoComplete}
                className={`py-2.5 px-3 rounded-xl font-body text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  isAllInfoComplete
                    ? 'bg-[#0088cc] text-white hover:bg-[#0077b5] shadow-sm cursor-pointer'
                    : 'bg-gray-200 text-gray-500 opacity-60 cursor-not-allowed border border-gray-300'
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>Notify via Telegram</span>
              </button>

              <button
                onClick={() => {
                  if (!isAllInfoComplete) {
                    setShowValidationErrors(true);
                    return;
                  }
                  saveProjectToDatabase(config, currentProject?.id).then(() => {
                    setIsOrderSubmitted(true);
                    handleAttemptSend('WhatsApp');
                  });
                }}
                disabled={!isAllInfoComplete}
                className={`py-2.5 px-3 rounded-xl font-body text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  isAllInfoComplete
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

