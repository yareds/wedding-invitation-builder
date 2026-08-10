import React, { useEffect, useState, useRef } from 'react';
import { WeddingConfig } from '../types';
import { romanticPiano } from '../utils/audioEngine';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface MusicPlayerProps {
  config?: WeddingConfig;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ config }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [hasAudioError, setHasAudioError] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const customAudioUrl = config?.bgMusicUrl && config.bgMusicUrl.trim() !== '' ? config.bgMusicUrl : null;

  useEffect(() => {
    // Reset state on audio URL change
    setHasAudioError(false);
    setIsPlaying(false);

    // Mute/pause existing playbacks
    romanticPiano.pause();
    if (audioRef.current) {
      audioRef.current.pause();
      try {
        audioRef.current.currentTime = 0;
      } catch {
        // ignore
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA' ||
        document.activeElement?.tagName === 'SELECT'
      ) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        handleToggle();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [customAudioUrl]);

  const handleToggle = async () => {
    if (isPlaying) {
      // Pause everything
      if (audioRef.current) {
        audioRef.current.pause();
      }
      romanticPiano.pause();
      setIsPlaying(false);
      return;
    }

    // Starting playback
    if (customAudioUrl && audioRef.current && !hasAudioError) {
      romanticPiano.pause();
      try {
        audioRef.current.currentTime = audioRef.current.currentTime || 0;
        await audioRef.current.play();
        setIsPlaying(true);
        setHasAudioError(false);
      } catch (err) {
        console.warn('Custom audio playback failed, resorting to romantic piano synth:', err);
        setHasAudioError(true);
        romanticPiano.start();
        setIsPlaying(true);
      }
    } else {
      // Use built-in Romantic Piano Synth
      const started = romanticPiano.toggle();
      setIsPlaying(started);
    }
  };

  return (
    <div className="fixed top-5 right-5 z-40 flex items-center gap-2">
      {/* Hidden HTML5 Audio Element for custom MP3 uploads / URLs */}
      {customAudioUrl && (
        <audio
          key={customAudioUrl}
          ref={audioRef}
          src={customAudioUrl}
          preload="auto"
          playsInline
          loop
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={() => {
            // Only flag error if error happens during active playback
            if (isPlaying) {
              setHasAudioError(true);
              setIsPlaying(false);
              romanticPiano.start();
              setIsPlaying(true);
            }
          }}
        />
      )}

      {/* Tooltip hint */}
      {showTooltip && (
        <div className="bg-[#3B0B1F] text-[#FDF0F3] text-xs px-3 py-1.5 rounded-md border border-[#C8A84B]/40 shadow-lg font-body animate-fade-in whitespace-nowrap">
          {hasAudioError
            ? 'Custom audio unplayable – playing Romantic Piano Synth'
            : customAudioUrl
            ? 'Click to toggle custom soundtrack'
            : 'Click to toggle Romantic Piano Synth'}
        </div>
      )}

      {/* ♪ Toggle Button */}
      <button
        onClick={handleToggle}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        id="music-toggle-btn"
        aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
        className={`relative p-3 rounded-full border transition-all duration-300 shadow-xl cursor-pointer flex items-center justify-center ${
          isPlaying
            ? 'bg-[#3B0B1F] border-[#C8A84B] text-[#C8A84B] ring-2 ring-[#C8A84B]/30 scale-105'
            : 'bg-[#FDF0F3] border-[#D4849A] text-[#3B0B1F]/60 opacity-60 hover:opacity-100'
        }`}
      >
        {isPlaying ? (
          <div className="flex items-center gap-1">
            <Music className="w-5 h-5 text-[#C8A84B] animate-bounce" />
            <span className="text-xs font-serif-heading text-[#C8A84B]">♪</span>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <VolumeX className="w-5 h-5 text-[#3B0B1F]/60" />
            <span className="text-xs font-serif-heading text-[#3B0B1F]/60">♪</span>
          </div>
        )}

        {/* Pulsing ring indicator when playing */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full border border-[#C8A84B] animate-ping opacity-30 pointer-events-none" />
        )}
      </button>
    </div>
  );
};

