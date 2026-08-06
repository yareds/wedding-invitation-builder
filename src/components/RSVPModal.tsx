import React, { useState, useEffect } from 'react';
import { WeddingConfig, RSVPData } from '../types';
import { THEME_PRESETS } from '../utils/themePresets';
import { X, CheckCircle2, Send } from 'lucide-react';

interface RSVPModalProps {
  config: WeddingConfig;
  isOpen: boolean;
  onClose: () => void;
}

export const RSVPModal: React.FC<RSVPModalProps> = ({ config, isOpen, onClose }) => {
  const theme = THEME_PRESETS[config.themeId] || THEME_PRESETS.bordeaux;
  const colors = theme.colors;

  const [formData, setFormData] = useState<RSVPData>({
    guestName: '',
    phone: '',
    attending: true,
    guestCount: 1,
    message: ''
  });

  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const savedRSVP = localStorage.getItem('wedding_rsvp_submission');
    if (savedRSVP) {
      try {
        const parsed = JSON.parse(savedRSVP);
        setFormData(parsed);
        setSubmitted(true);
      } catch (err) {
        // ignore
      }
    }
  }, []);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submission: RSVPData = {
      ...formData,
      submittedAt: new Date().toISOString()
    };
    localStorage.setItem('wedding_rsvp_submission', JSON.stringify(submission));
    setSubmitted(true);
  };

  const handleReset = () => {
    localStorage.removeItem('wedding_rsvp_submission');
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
    <div className="fixed inset-0 z-50 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto" style={{ backgroundColor: colors.primary + '80' }}>
      <div className="relative w-full max-w-xl bg-white rounded-3xl border-2 shadow-2xl p-6 sm:p-10 my-8 overflow-hidden" style={{ borderColor: colors.gold, color: colors.primary }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          id="close-rsvp-btn"
          className="absolute top-4 right-4 p-2 rounded-full transition-all cursor-pointer"
          style={{ backgroundColor: colors.blushPale, color: colors.primary }}
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          /* Gold-stamped digital confirmation view */
          <div className="text-center py-6 space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 shadow-lg" style={{ backgroundColor: colors.blushPale, borderColor: colors.gold }}>
              <CheckCircle2 className="w-8 h-8" style={{ color: colors.gold }} />
            </div>

            <div>
              <p className="font-body text-xs uppercase tracking-[0.3em] font-semibold mb-1" style={{ color: colors.blush }}>
                Response Received
              </p>
              <h3 className="font-serif-heading text-2xl sm:text-3xl font-normal" style={{ color: colors.primary }}>
                Thank You, {formData.guestName}!
              </h3>
            </div>

            <div className="p-6 rounded-2xl border text-left space-y-2 text-xs sm:text-sm" style={{ backgroundColor: colors.blushPale, borderColor: colors.gold + '40' }}>
              <p>
                <strong>Status:</strong>{' '}
                <span className={formData.attending ? 'font-semibold' : ''} style={{ color: formData.attending ? colors.primary : colors.blush }}>
                  {formData.attending ? 'Joyfully Attending' : 'Regretfully Declining'}
                </span>
              </p>
              {formData.phone && (
                <p><strong>Phone Number:</strong> {formData.phone}</p>
              )}
              {formData.attending && (
                <p><strong>Guests Attending:</strong> {formData.guestCount} Seat(s)</p>
              )}
            </div>

            <p className="font-quote italic text-sm opacity-80">
              "We look forward to celebrating this joyful milestone together."
            </p>

            <div className="flex justify-center gap-4 pt-2">
              <button
                onClick={handleReset}
                className="px-5 py-2 text-xs font-body underline cursor-pointer"
                style={{ color: colors.blush }}
              >
                Update Response
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full font-body text-xs font-semibold uppercase tracking-wider shadow-md cursor-pointer"
                style={{ backgroundColor: colors.primary, color: colors.blushPale }}
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          /* RSVP Form */
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="text-center mb-6">
              <p className="font-body text-xs uppercase tracking-[0.3em] font-semibold mb-1" style={{ color: colors.blush }}>
                Kindly Respond By {config.rsvpDeadlineEn || 'April 1, 2026'} ({config.rsvpDeadlineEth || 'መጋቢት 23, 2018'})
              </p>
              <h3 className="font-serif-heading text-2xl sm:text-3xl font-normal" style={{ color: colors.primary }}>
                RSVP to {groomName} እና {brideName}
              </h3>
              <div className="w-12 h-[1.5px] mx-auto mt-2" style={{ backgroundColor: colors.gold }} />
            </div>

            {/* Guest Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-body text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: colors.primary }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.guestName}
                  onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                  placeholder="e.g. Abebe Kebede"
                  className="w-full px-4 py-2.5 rounded-xl border focus:outline-none text-sm font-body"
                  style={{ backgroundColor: colors.blushPale, borderColor: colors.blush + '40', color: colors.primary }}
                />
              </div>

              <div>
                <label className="block font-body text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: colors.primary }}>
                  Phone Number / ስልክ ቁጥር *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. +251 911 234567"
                  className="w-full px-4 py-2.5 rounded-xl border focus:outline-none text-sm font-body"
                  style={{ backgroundColor: colors.blushPale, borderColor: colors.blush + '40', color: colors.primary }}
                />
              </div>
            </div>

            {/* Attendance Toggle */}
            <div>
              <label className="block font-body text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: colors.primary }}>
                Will you be attending? *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attending: true })}
                  className={`py-3 px-4 rounded-xl border text-xs font-body font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    formData.attending
                      ? 'shadow-md'
                      : 'hover:border-amber-400'
                  }`}
                  style={{
                    backgroundColor: formData.attending ? colors.primary : colors.blushPale,
                    color: formData.attending ? colors.blushPale : colors.primary,
                    borderColor: colors.primary
                  }}
                >
                  Joyfully Accepts
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attending: false })}
                  className={`py-3 px-4 rounded-xl border text-xs font-body font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    !formData.attending
                      ? 'shadow-md'
                      : 'hover:border-amber-400'
                  }`}
                  style={{
                    backgroundColor: !formData.attending ? colors.blush : colors.blushPale,
                    color: !formData.attending ? '#FFFFFF' : colors.primary,
                    borderColor: colors.blush
                  }}
                >
                  Regretfully Declines
                </button>
              </div>
            </div>

            {formData.attending && (
              <div>
                <label className="block font-body text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: colors.primary }}>
                  Number of Guests
                </label>
                <select
                  value={formData.guestCount}
                  onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 rounded-xl border focus:outline-none text-sm font-body"
                  style={{ backgroundColor: colors.blushPale, borderColor: colors.blush + '40', color: colors.primary }}
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4 Guests</option>
                  <option value={5}>5 Guests</option>
                </select>
              </div>
            )}

            {/* Note to Couple */}
            <div>
              <label className="block font-body text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: colors.primary }}>
                Personal Message to {groomName} &amp; {brideName}
              </label>
              <textarea
                rows={2}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Warm wishes, memories, or notes..."
                className="w-full px-4 py-2.5 rounded-xl border focus:outline-none text-sm font-body"
                style={{ backgroundColor: colors.blushPale, borderColor: colors.blush + '40', color: colors.primary }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              id="submit-rsvp-btn"
              className="w-full py-3.5 rounded-full font-body text-xs font-semibold uppercase tracking-widest shadow-xl hover:shadow-2xl transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
              style={{ backgroundColor: colors.primary, color: colors.blushPale }}
            >
              <Send className="w-4 h-4" style={{ color: colors.gold }} />
              <span>Confirm RSVP Response</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

