import React, { useState, useEffect, useCallback } from 'react';
import { THEMES, FULL_QUOTE } from './data/quoteData';
import { ThemeId, DisplayMode } from './types';
import { BackgroundParticles } from './components/BackgroundParticles';
import { KineticQuoteCard } from './components/KineticQuoteCard';
import { KineticPoster } from './components/KineticPoster';
import { ControlsBar } from './components/ControlsBar';
import { ambientAudio } from './utils/audio';
import { exportPosterImage } from './utils/canvasExport';

export default function App() {
  const [animationKey, setAnimationKey] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isAudioOn, setIsAudioOn] = useState<boolean>(false);
  const [activeThemeId, setActiveThemeId] = useState<ThemeId>('do-dam');
  const [displayMode, setDisplayMode] = useState<DisplayMode>('cinematic');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activeTheme = THEMES.find((t) => t.id === activeThemeId) || THEMES[0];

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  }, []);

  // Replay kinetic animation
  const handleReplayAnimation = useCallback(() => {
    setAnimationKey((prev) => prev + 1);
    if (isAudioOn) {
      ambientAudio.triggerChime(783.99); // Solemn bell chime
    }
  }, [isAudioOn]);

  // Handle Audio toggle
  const handleToggleAudio = () => {
    if (isAudioOn) {
      ambientAudio.stop();
      setIsAudioOn(false);
      showToast('Đã tắt nhạc nền');
    } else {
      ambientAudio.start();
      setIsAudioOn(true);
      showToast('Đang phát nhạc nền trang trọng');
    }
  };

  // Fullscreen toggle
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === 'Space' || e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        handleReplayAnimation();
      } else if (e.key === 'm' || e.key === 'M') {
        handleToggleAudio();
      } else if (e.key === 'f' || e.key === 'F') {
        handleToggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleReplayAnimation, isAudioOn]);

  const handleCopyQuote = () => {
    const quoteText = `“${FULL_QUOTE.content}”\n\n— ${FULL_QUOTE.author}\n(${FULL_QUOTE.source})`;
    navigator.clipboard.writeText(quoteText).then(() => {
      showToast('Đã sao chép nội dung trích dẫn vào bộ nhớ tạm!');
    });
  };

  const handleExportPng = () => {
    showToast('Đang tạo và tải xuống tệp ảnh áp phích PNG chất lượng cao...');
    exportPosterImage(activeTheme.id);
  };

  return (
    <div
      className={`min-h-screen w-full flex flex-col justify-between relative overflow-hidden bg-gradient-to-b ${activeTheme.bgGradient} transition-colors duration-700 select-none text-[#FDE68A]`}
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

      {/* Top area is kept completely clean - only background and effects as requested */}
      <div className="w-full pt-4 sm:pt-6" />

      {/* Main Content Area - Item 6 with single pale yellow text */}
      <main className="flex-1 flex items-center justify-center relative w-full my-auto z-10">
        {displayMode === 'cinematic' ? (
          <KineticQuoteCard
            theme={activeTheme}
            animationKey={animationKey}
            onCopyQuote={handleCopyQuote}
            onExportPng={handleExportPng}
          />
        ) : (
          <KineticPoster
            theme={activeTheme}
            onExportPng={handleExportPng}
            onCopySuccess={() => showToast('Đã sao chép nội dung trích dẫn vào bộ nhớ tạm!')}
          />
        )}
      </main>

      {/* Bottom Controls Bar */}
      <ControlsBar
        isPlaying={false}
        playbackSpeed={playbackSpeed}
        isAudioOn={isAudioOn}
        activeThemeId={activeThemeId}
        displayMode={displayMode}
        isFullscreen={isFullscreen}
        onTogglePlay={handleReplayAnimation}
        onChangeSpeed={setPlaybackSpeed}
        onToggleAudio={handleToggleAudio}
        onSelectTheme={setActiveThemeId}
        onSelectDisplayMode={setDisplayMode}
        onToggleFullscreen={handleToggleFullscreen}
      />

      {/* Toast feedback banner */}
      {toastMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl bg-neutral-900/95 border border-[#FDE68A]/60 shadow-2xl text-xs sm:text-sm text-[#FDE68A] font-medium flex items-center gap-2 backdrop-blur-md animate-fade-in">
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-[#FDE68A] stroke-2">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

