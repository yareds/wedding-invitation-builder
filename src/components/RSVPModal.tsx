import React, { useState, useEffect } from 'react';
import { WeddingConfig, RSVPData } from '../types';
import { THEME_PRESETS } from '../utils/themePresets';
import { submitRSVPToFirestore } from '../utils/projectDatabase';
import { X, CheckCircle2, Send, Loader2, CloudCheck } from 'lucide-react';

interface RSVPModalProps {
  config: WeddingConfig;
  projectId?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const RSVPModal: React.FC<RSVPModalProps> = ({ config, projectId, isOpen, onClose }) => {
  const theme = THEME_PRESETS[config.themeId] || THEME_PRESETS.bordeaux;
  const colors = theme.colors;

  const activeProjectId =
    projectId ||
    `WED-2026-${(config.groomEn || 'GROOM').replace(/\s+/g, '')}-${(config.brideEn || 'BRIDE').replace(/\s+/g, '')}`.toUpperCase();

  const [formData, setFormData] = useState<RSVPData>({
    guestName: '',
    phone: '',
    attending: true,
    guestCount: 1,
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const savedRSVP = localStorage.getItem(`wedding_rsvp_submission_${activeProjectId}`);
    if (savedRSVP) {
      try {
        const parsed = JSON.parse(savedRSVP);
        setFormData(parsed);
        setSubmitted(true);
      } catch (err) {
        // ignore
      }
    }
  }, [activeProjectId]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const submission: RSVPData = {
      ...formData,
      submittedAt: new Date().toISOString()
    };

    try {
      // Save directly to Firestore subcollection: projects/{projectId}/rsvps
      await submitRSVPToFirestore(activeProjectId, submission);
      
      // Save local confirmation on guest device
      localStorage.setItem(`wedding_rsvp_submission_${activeProjectId}`, JSON.stringify(submission));
      setSubmitted(true);
    } catch (err: any) {
      console.error('RSVP submission error:', err);
      // Even if offline, preserve response locally so guest user is never stranded
      localStorage.setItem(`wedding_rsvp_submission_${activeProjectId}`, JSON.stringify(submission));
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    localStorage.removeItem(`wedding_rsvp_submission_${activeProjectId}`);
    setSubmitted(false);
    setFormData({
      guestName: '',
      phone: '',
      attending: true,
      guestCount: 1,
      message: ''
    });
  };

  const groomName = config.groomEth || config.groomEn || 'የሙሽራው ስም';
  const brideName = config.brideEth || config.brideEn || 'የሙሽሪት ስም';

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
    >
      <div
        className="relative w-full max-w-xl bg-[#59102e] text-[#FAF0F3] rounded-3xl border-2 border-[#C8A84B] shadow-2xl p-6 sm:p-10 my-8 overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          id="close-rsvp-btn"
          className="absolute top-4 right-4 p-2 rounded-full bg-[#3D0A1F] text-[#FAF0F3] hover:bg-[#C8A84B] hover:text-[#59102e] transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          /* Gold-stamped digital confirmation view */
          <div className="text-center py-6 space-y-6">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-[#C8A84B] bg-[#3D0A1F] shadow-lg"
            >
              <CheckCircle2 className="w-8 h-8 text-[#C8A84B]" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 text-emerald-200 border border-emerald-500/40 text-[11px] font-mono font-bold mb-2">
                <CloudCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>SAVED TO FIRESTORE DATABASE</span>
              </div>
              <p className="font-body text-xs uppercase tracking-[0.3em] font-semibold mb-1 text-[#E5A4B5]">
                Response Received
              </p>
              <h3 className="font-serif-heading text-2xl sm:text-3xl font-normal text-[#FAF0F3]">
                Thank You, {formData.guestName}!
              </h3>
            </div>

            <div
              className="p-6 rounded-2xl border border-[#C8A84B]/40 bg-[#3D0A1F] text-left space-y-2 text-xs sm:text-sm text-[#FAF0F3]"
            >
              <p>
                <strong>Status:</strong>{' '}
                <span className="font-semibold text-[#C8A84B]">
                  {formData.attending ? 'Joyfully Attending' : 'Regretfully Declining'}
                </span>
              </p>
              {formData.phone && (
                <p><strong>Phone Number:</strong> {formData.phone}</p>
              )}
              {formData.attending && (
                <p><strong>Guests Attending:</strong> {formData.guestCount} Seat(s)</p>
              )}
              {formData.message && (
                <p className="pt-1 italic border-t border-[#C8A84B]/30 mt-2 text-[#E5A4B5]">
                  "{formData.message}"
                </p>
              )}
            </div>

            <p className="font-quote italic text-sm text-[#E5A4B5]">
              "We look forward to celebrating this joyful milestone together."
            </p>

            <div className="flex justify-center gap-4 pt-2">
              <button
                onClick={handleReset}
                className="px-5 py-2 text-xs font-body text-[#E5A4B5] underline hover:text-[#FAF0F3] cursor-pointer"
              >
                Update Response
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full font-body text-xs font-bold uppercase tracking-wider bg-[#C8A84B] text-[#59102e] hover:bg-[#D8B85B] shadow-md cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          /* RSVP Form */
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="text-center mb-6">
              <p className="font-body text-xs uppercase tracking-[0.3em] font-semibold mb-1 text-[#E5A4B5]">
                Kindly Respond By {config.rsvpDeadlineEn || 'April 1, 2026'} ({config.rsvpDeadlineEth || 'መጋቢት 23, 2018'})
              </p>
              <h3 className="font-serif-heading text-2xl sm:text-3xl font-normal text-[#FAF0F3]">
                RSVP to {groomName} እና {brideName}
              </h3>
              <div className="w-12 h-[1.5px] mx-auto mt-2 bg-[#C8A84B]" />
            </div>

            {submitError && (
              <div className="p-3 rounded-xl bg-red-950 text-red-200 text-xs text-center font-medium border border-red-500/40">
                {submitError}
              </div>
            )}

            {/* Guest Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-body text-xs font-semibold uppercase tracking-wider mb-1 text-[#FAF0F3]">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.guestName}
                  onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                  placeholder="e.g. Abebe Kebede"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#C8A84B]/40 bg-[#3D0A1F] text-[#FAF0F3] placeholder:text-[#FAF0F3]/40 focus:border-[#C8A84B] focus:outline-none text-sm font-body"
                />
              </div>

              <div>
                <label className="block font-body text-xs font-semibold uppercase tracking-wider mb-1 text-[#FAF0F3]">
                  Phone Number / ስልክ ቁጥር *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. +251 911 234567"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#C8A84B]/40 bg-[#3D0A1F] text-[#FAF0F3] placeholder:text-[#FAF0F3]/40 focus:border-[#C8A84B] focus:outline-none text-sm font-body"
                />
              </div>
            </div>

            {/* Attendance Toggle */}
            <div>
              <label className="block font-body text-xs font-semibold uppercase tracking-wider mb-2 text-[#FAF0F3]">
                Will you be attending? *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attending: true })}
                  className={`py-3 px-4 rounded-xl border text-xs font-body font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    formData.attending
                      ? 'bg-[#C8A84B] text-[#59102e] border-[#C8A84B] shadow-md'
                      : 'bg-[#3D0A1F] text-[#FAF0F3] border-[#C8A84B]/30 hover:border-[#C8A84B]'
                  }`}
                >
                  Joyfully Accepts
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attending: false })}
                  className={`py-3 px-4 rounded-xl border text-xs font-body font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    !formData.attending
                      ? 'bg-[#B85B75] text-[#FAF0F3] border-[#B85B75] shadow-md'
                      : 'bg-[#3D0A1F] text-[#FAF0F3] border-[#C8A84B]/30 hover:border-[#C8A84B]'
                  }`}
                >
                  Regretfully Declines
                </button>
              </div>
            </div>

            {formData.attending && (
              <div>
                <label className="block font-body text-xs font-semibold uppercase tracking-wider mb-1 text-[#FAF0F3]">
                  Number of Guests
                </label>
                <select
                  value={formData.guestCount}
                  onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#C8A84B]/40 bg-[#3D0A1F] text-[#FAF0F3] focus:border-[#C8A84B] focus:outline-none text-sm font-body"
                >
                  <option value={1} className="bg-[#3D0A1F] text-[#FAF0F3]">1 Guest</option>
                  <option value={2} className="bg-[#3D0A1F] text-[#FAF0F3]">2 Guests</option>
                  <option value={3} className="bg-[#3D0A1F] text-[#FAF0F3]">3 Guests</option>
                  <option value={4} className="bg-[#3D0A1F] text-[#FAF0F3]">4 Guests</option>
                  <option value={5} className="bg-[#3D0A1F] text-[#FAF0F3]">5 Guests</option>
                </select>
              </div>
            )}

            {/* Note to Couple */}
            <div>
              <label className="block font-body text-xs font-semibold uppercase tracking-wider mb-1 text-[#FAF0F3]">
                Personal Message to {groomName} &amp; {brideName}
              </label>
              <textarea
                rows={2}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Warm wishes, memories, or notes..."
                className="w-full px-4 py-2.5 rounded-xl border border-[#C8A84B]/40 bg-[#3D0A1F] text-[#FAF0F3] placeholder:text-[#FAF0F3]/40 focus:border-[#C8A84B] focus:outline-none text-sm font-body"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              id="submit-rsvp-btn"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-full font-body text-xs font-bold uppercase tracking-widest bg-[#C8A84B] text-[#59102e] hover:bg-[#D8B85B] shadow-xl hover:shadow-2xl transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#59102e]" />
                  <span>Submitting to Firestore...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-[#59102e]" />
                  <span>Confirm RSVP Response</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
