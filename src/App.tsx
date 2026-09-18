import React, { useState, useEffect, useCallback } from 'react';
import { THEMES } from './data/quoteData';
import { ThemeId } from './types';
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

  // Handle Audio toggle via keyboard shortcut (phím M)
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
      className={`min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b ${activeTheme.bgGradient} select-none p-3 sm:p-6 md:p-8`}
    >
      {/* Subtle static deep ambient glow in the center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-red-600/[0.12] blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#FDE68A]/[0.03] blur-[100px] pointer-events-none rounded-full" />

      {/* Main Content Area - Max width 700px */}
      <main className="relative w-full max-w-[700px] z-10 flex flex-col items-center justify-center">
        <KineticQuoteCard
          theme={activeTheme}
          animationKey={animationKey}
          onReplay={handleReplayAnimation}
        />
      </main>
    </div>
  );
}

