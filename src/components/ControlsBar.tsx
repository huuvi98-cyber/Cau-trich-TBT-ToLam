import React from 'react';
import { THEMES } from '../data/quoteData';
import { ThemeId, DisplayMode } from '../types';

interface ControlsBarProps {
  currentSceneIndex?: number;
  isPlaying: boolean;
  playbackSpeed: number;
  isAudioOn: boolean;
  activeThemeId: ThemeId;
  displayMode: DisplayMode;
  isFullscreen: boolean;
  onTogglePlay: () => void;
  onNextScene?: () => void;
  onPrevScene?: () => void;
  onSelectScene?: (index: number) => void;
  onChangeSpeed: (speed: number) => void;
  onToggleAudio: () => void;
  onSelectTheme: (themeId: ThemeId) => void;
  onSelectDisplayMode: (mode: DisplayMode) => void;
  onToggleFullscreen: () => void;
}

export const ControlsBar: React.FC<ControlsBarProps> = ({
  isPlaying,
  playbackSpeed,
  isAudioOn,
  activeThemeId,
  displayMode,
  isFullscreen,
  onTogglePlay,
  onChangeSpeed,
  onToggleAudio,
  onSelectTheme,
  onSelectDisplayMode,
  onToggleFullscreen
}) => {
  return (
    <footer className="w-full max-w-5xl mx-auto px-3 sm:px-6 py-4 flex flex-col gap-3.5 z-20">
      {/* Top row: Indicator that only Item 6 is active */}
      <div className="w-full flex items-center justify-between gap-2 px-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FDE68A] animate-pulse" />
          <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#FDE68A]">
            Mục số 6: Toàn văn thông điệp - Tổng Bí thư, Chủ tịch nước Tô Lâm
          </span>
        </div>

        <span className="text-[11px] sm:text-xs font-mono text-[#FDE68A]/80 pl-2">
          Chữ màu vàng nhạt • Đồ họa động
        </span>
      </div>

      {/* Main control console container */}
      <div className="w-full p-2.5 sm:p-3 rounded-2xl bg-[#520000]/85 border border-[#FDE68A]/35 backdrop-blur-xl shadow-2xl flex flex-wrap items-center justify-between gap-3">
        {/* Left: View Mode Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[#3B0000] border border-[#FDE68A]/30">
          <button
            id="tab-cinematic-mode"
            onClick={() => onSelectDisplayMode('cinematic')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              displayMode === 'cinematic'
                ? 'bg-[#FDE68A] text-neutral-950 shadow-md font-bold'
                : 'text-[#FDE68A]/70 hover:text-[#FDE68A]'
            }`}
          >
            Đồ Họa Động
          </button>
          <button
            id="tab-poster-mode"
            onClick={() => onSelectDisplayMode('poster')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              displayMode === 'poster'
                ? 'bg-[#FDE68A] text-neutral-950 shadow-md font-bold'
                : 'text-[#FDE68A]/70 hover:text-[#FDE68A]'
            }`}
          >
            Áp Phích
          </button>
        </div>

        {/* Center: Replay Animation & Speed Controls */}
        <div className="flex items-center gap-2">
          <button
            id="btn-toggle-play"
            onClick={onTogglePlay}
            className="px-4 py-2 rounded-xl bg-[#FDE68A] hover:bg-[#FEF08A] text-neutral-950 font-bold flex items-center gap-2 shadow-lg shadow-[#FDE68A]/20 cursor-pointer text-xs sm:text-sm transition-all"
            title="Phát lại hiệu ứng động của câu nói"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            <span>Phát lại hoạt họa</span>
          </button>

          {/* Speed toggle */}
          <div className="flex items-center ml-1 bg-[#3B0000] rounded-lg p-0.5 border border-[#FDE68A]/30 text-[11px]">
            {[0.75, 1, 1.25].map((speed) => (
              <button
                key={speed}
                id={`btn-speed-${speed}x`}
                onClick={() => onChangeSpeed(speed)}
                className={`px-2.5 py-1 rounded cursor-pointer font-medium ${
                  playbackSpeed === speed
                    ? 'bg-[#FDE68A]/20 text-[#FDE68A] font-bold'
                    : 'text-[#FDE68A]/60 hover:text-[#FDE68A]'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>

        {/* Right: Audio Ambient, Themes & Fullscreen */}
        <div className="flex items-center gap-2">
          {/* Solemn Ambient Audio Toggle */}
          <button
            id="btn-toggle-solemn-audio"
            onClick={onToggleAudio}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
              isAudioOn
                ? 'bg-[#3B0000] border-[#FDE68A]/60 text-[#FDE68A]'
                : 'bg-[#3B0000] border-[#FDE68A]/30 text-[#FDE68A]/70 hover:text-[#FDE68A]'
            }`}
            title={isAudioOn ? 'Tắt âm nhạc tưởng niệm' : 'Bật nhạc nền chuông ngân trang trọng'}
          >
            {isAudioOn ? (
              <>
                <span className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 h-2 bg-[#FDE68A] animate-pulse" />
                  <span className="w-0.5 h-3 bg-[#FDE68A] animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <span className="w-0.5 h-1.5 bg-[#FDE68A] animate-pulse" style={{ animationDelay: '0.4s' }} />
                </span>
                <span className="hidden sm:inline">Nhạc nền</span>
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-2">
                  <line x1="1" y1="1" x2="23" y2="23" />
                  <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
                  <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
                  <line x1="12" y1="19" x2="12" y2="23" />
                  <line x1="8" y1="23" x2="16" y2="23" />
                </svg>
                <span className="hidden sm:inline">Nhạc nền</span>
              </>
            )}
          </button>

          {/* Theme Dropdown / Switcher */}
          <div className="flex items-center bg-[#3B0000] p-1 rounded-lg border border-[#FDE68A]/30">
            {THEMES.map((th) => (
              <button
                key={th.id}
                id={`btn-theme-${th.id}`}
                onClick={() => onSelectTheme(th.id)}
                className={`w-5 h-5 rounded-full mx-1 transition-transform cursor-pointer border ${
                  activeThemeId === th.id
                    ? 'ring-2 ring-[#FDE68A] ring-offset-1 ring-offset-neutral-950 scale-110'
                    : 'opacity-60 hover:opacity-100'
                }`}
                style={{
                  backgroundColor:
                    th.id === 'do-dam'
                      ? '#8B0000'
                      : th.id === 'do-son-tram'
                      ? '#9B111E'
                      : '#800020',
                  borderColor: '#FDE68A'
                }}
                title={th.name}
              />
            ))}
          </div>

          {/* Fullscreen Toggle */}
          <button
            id="btn-toggle-fullscreen"
            onClick={onToggleFullscreen}
            className="p-2 rounded-lg bg-[#3B0000] hover:bg-[#4D0000] text-[#FDE68A] border border-[#FDE68A]/30 cursor-pointer hover:border-[#FDE68A]"
            title={isFullscreen ? 'Thoát toàn màn hình' : 'Toàn màn hình'}
          >
            {isFullscreen ? (
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </footer>
  );
};
