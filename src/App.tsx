import React, { useState, useEffect, useCallback } from 'react';
import { THEMES } from './data/quoteData';
import { ThemeId } from './types';
import { BackgroundParticles } from './components/BackgroundParticles';
import { KineticQuoteCard } from './components/KineticQuoteCard';
import { ambientAudio } from './utils/audio';

export default function App() {
  const [animationKey, setAnimationKey] = useState<number>(0);
  const [isAudioOn, setIsAudioOn] = useState<boolean>(false);
  const [activeThemeId] = useState<ThemeId>('do-dam');

  const activeTheme = THEMES.find((t) => t.id === activeThemeId) || THEMES[0];

  // Replay kinetic animation
  const handleReplayAnimation = useCallback(() => {
    setAnimationKey((prev) => prev + 1);
    if (isAudioOn) {
      ambientAudio.triggerChime(783.99); // Solemn bell chime
    }
  }, [isAudioOn]);

  // Handle Audio toggle via keyboard shortcut
  const handleToggleAudio = useCallback(() => {
    if (isAudioOn) {
      ambientAudio.stop();
      setIsAudioOn(false);
    } else {
      ambientAudio.start();
      setIsAudioOn(true);
    }
  }, [isAudioOn]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === 'Space' || e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        handleReplayAnimation();
      } else if (e.key === 'm' || e.key === 'M') {
        handleToggleAudio();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleReplayAnimation, handleToggleAudio]);

  return (
    <div
      className={`min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-gradient-to-b ${activeTheme.bgGradient} select-none text-[#FDE68A] p-4 sm:p-6 md:p-8`}
    >
      {/* Background Interactive Ambient Particles Canvas */}
      <BackgroundParticles particleColor="#FDE68A" />

      {/* Vibrant Red Ambient Atmosphere Overlays */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-red-600/25 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-red-600/30 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-red-600/20 blur-[150px] pointer-events-none rounded-full" />

      {/* Decorative Golden Corner Accents */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-[#FDE68A]/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-[#FDE68A]/10 to-transparent pointer-events-none" />

      {/* Main Content Area - Only the quote inside the frame */}
      <main className="relative w-full max-w-4xl z-10 flex items-center justify-center">
        <KineticQuoteCard
          theme={activeTheme}
          animationKey={animationKey}
          onReplay={handleReplayAnimation}
        />
      </main>
    </div>
  );
}

