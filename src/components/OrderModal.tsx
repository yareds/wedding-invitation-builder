import React, { useState, useEffect } from 'react';
import { WeddingConfig } from '../types';
import { THEME_PRESETS } from '../utils/themePresets';
import { saveProjectToDatabase, SavedProject } from '../utils/projectDatabase';
import { X, Send, Copy, Check, MessageSquare, ShieldCheck, Banknote } from 'lucide-react';

interface OrderModalProps {
  config: WeddingConfig;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({ config, isOpen, onClose }) => {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [sentSuccess, setSentSuccess] = useState<string | null>(null);
  const [currentProject, setCurrentProject] = useState<SavedProject | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Save project record in database registry for admin processing
      const savedRecord = saveProjectToDatabase(config, currentProject?.id);
      setCurrentProject(savedRecord);
    }
  }, [isOpen, config]);

  if (!isOpen) return null;

  const currentTheme = THEME_PRESETS[config.themeId] || THEME_PRESETS.bordeaux;

  const groom = config.groomEth || config.groomEn || 'የሙሽራው ስም';
  const bride = config.brideEth || config.brideEn || 'የሙሽሪት ስም';
  const projectId = currentProject?.id || 'WED-2026-TEMP';

  // Filter out Awash Bank tile
  const activeBankDetails = (config.bankDetails || []).filter(
    (b) => !b.bankName.toLowerCase().includes('awash')
  );

  const orderSummaryText = `
💒 WEDDING WEBSITE ORDER DETAILS:
• Order ID: ${projectId}
• Couple: ${groom} እና ${bride}
• Date (GC): ${config.dateGC}
• Date (EC): ${config.dateEC}
• Theme: ${currentTheme.name}
• Ceremony Venue: ${config.churchEn || 'Church/Cathedral'}
• Reception Venue: ${config.receptionEn || 'Reception Venue'}
• Package Price: 30,000 ETB

Payment Receipt Confirmation requested for online publishing.
  `.trim();

  const handleCopyAccount = (acc: string) => {
    navigator.clipboard.writeText(acc);
    setCopiedAccount(acc);
    setTimeout(() => setCopiedAccount(null), 3000);
  };

  const handleSendTelegram = () => {
    const text = encodeURIComponent(`Hello! I am sending my payment receipt for my wedding invitation order:\n\n${orderSummaryText}`);
    window.open(`https://t.me/share/url?url=https://wedding-invitations.et&text=${text}`, '_blank');
    setSentSuccess('Telegram');
  };

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(`Hello! I am sending my payment receipt for my wedding invitation order:\n\n${orderSummaryText}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
    setSentSuccess('WhatsApp');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border-2 border-[#C8A84B] shadow-2xl p-6 sm:p-8 my-auto text-[#3B0B1F]">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6 border-b border-[#D4849A]/30 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDF0F3] text-[#C8A84B] font-body text-xs font-semibold uppercase tracking-wider mb-2 border border-[#C8A84B]/30">
              <ShieldCheck className="w-4 h-4" />
              Order ID: <span className="font-mono text-[#3B0B1F] font-bold">{projectId}</span>
            </div>
            <h2 className="font-serif-heading text-2xl sm:text-3xl font-normal text-[#3B0B1F]">
              Order Confirmation &amp; Payment
            </h2>
            <p className="font-body text-xs text-[#3B0B1F]/70 mt-1">
              Review your order details, copy payment info, and click "Send Payment Receipt" to publish your live wedding invitation online.
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Modal"
            className="p-2 rounded-full bg-[#FDF0F3] text-[#3B0B1F]/70 hover:text-[#3B0B1F] hover:bg-[#D4849A]/20 transition-all cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Details Summary */}
        <div className="bg-[#FDF0F3] rounded-2xl p-4 border border-[#D4849A]/30 mb-5 space-y-2 text-xs font-body">
          <div className="flex items-center justify-between border-b border-[#D4849A]/30 pb-2">
            <span className="font-semibold text-sm text-[#3B0B1F]">Package Total Fee:</span>
            <span className="font-serif-heading font-bold text-base text-[#C8A84B]">30,000 ETB</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#3B0B1F]">
            <p><strong>Couple:</strong> {groom} እና {bride}</p>
            <p><strong>Theme:</strong> {currentTheme.name}</p>
            <p><strong>Date (GC):</strong> {config.dateGC}</p>
            <p><strong>Date (EC):</strong> {config.dateEC}</p>
            <p><strong>RSVP Deadline:</strong> {config.rsvpDeadlineEn}</p>
            <p><strong>Photos Included:</strong> {config.galleryImgs?.length || 0}</p>
          </div>
        </div>

        {/* Customer Notification Banner */}
        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-950 text-xs font-body leading-relaxed mb-5 shadow-sm">
          <p className="font-bold text-emerald-900 mb-1 flex items-center gap-1.5">
            <span>✨ We have received your invitation order!</span>
          </p>
          <p className="text-emerald-800">
            Please click <strong>"Send Payment Receipt"</strong> below. Once your payment is received, we will upload and make your invitation online and send you your custom website link (<code className="bg-emerald-100 px-1.5 py-0.5 rounded text-[11px] font-mono font-bold text-emerald-900">yourname@web.app</code>).
          </p>
        </div>

        {/* Bank Payment Information */}
        <div className="mb-6">
          <h3 className="font-serif-heading text-lg font-normal mb-2 flex items-center gap-2 text-[#3B0B1F]">
            <Banknote className="w-5 h-5 text-[#C8A84B]" />
            Payment Information (Bank Transfer &amp; Telebirr)
          </h3>
          <p className="font-body text-xs text-[#3B0B1F]/70 mb-3 leading-relaxed">
            Please transfer the 30,000 ETB fee to any of our official accounts below:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeBankDetails.map((bank, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-3 border border-[#C8A84B]/40 shadow-sm flex items-center justify-between"
              >
                <div>
                  <p className="font-body text-xs font-bold text-[#3B0B1F]">{bank.bankName}</p>
                  <p className="font-body text-xs text-[#3B0B1F]/80">{bank.accountName}</p>
                  <p className="font-mono text-xs font-semibold text-[#C8A84B] mt-0.5">{bank.accountNumber}</p>
                </div>
                <button
                  onClick={() => handleCopyAccount(bank.accountNumber)}
                  className="p-2 rounded-lg bg-[#FDF0F3] hover:bg-[#D4849A]/20 text-[#3B0B1F] transition-colors cursor-pointer"
                  title="Copy account number"
                >
                  {copiedAccount === bank.accountNumber ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-[#C8A84B]" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Order Buttons */}
        <div className="space-y-3 pt-4 border-t border-[#D4849A]/30">
          <p className="font-body text-xs font-semibold text-center text-[#3B0B1F] uppercase tracking-wider">
            Send Payment Receipt
          </p>

          {sentSuccess && (
            <div className="p-3 bg-green-50 border border-green-200 text-green-800 text-xs rounded-xl text-center font-medium">
              ✓ Redirecting to {sentSuccess} to send payment receipt for Order ID <code className="font-mono font-bold">{projectId}</code>!
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleSendTelegram}
              className="py-3.5 px-4 rounded-xl bg-[#0088cc] text-white font-body text-xs font-semibold uppercase tracking-wider hover:bg-[#0077b5] shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Payment Receipt (Telegram)</span>
            </button>

            <button
              onClick={handleSendWhatsApp}
              className="py-3.5 px-4 rounded-xl bg-[#25D366] text-white font-body text-xs font-semibold uppercase tracking-wider hover:bg-[#20ba5a] shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Send Payment Receipt (WhatsApp)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
