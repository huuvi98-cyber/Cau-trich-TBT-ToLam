import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ThemeConfig } from '../types';
import { FULL_QUOTE } from '../data/quoteData';

interface KineticPosterProps {
  theme: ThemeConfig;
  onExportPng: () => void;
  onCopySuccess: () => void;
}

export const KineticPoster: React.FC<KineticPosterProps> = ({
  theme,
  onExportPng,
  onCopySuccess
}) => {
  const [activeHighlight, setActiveHighlight] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX(-y * 0.015);
    setRotateY(x * 0.015);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const handleCopyQuote = () => {
    const textToCopy = `“${FULL_QUOTE.content}”\n\n— ${FULL_QUOTE.author}\n(${FULL_QUOTE.source})`;
    navigator.clipboard.writeText(textToCopy);
    onCopySuccess();
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 flex flex-col items-center z-10">
      {/* 3D Interactive Poster Card */}
      <motion.div
        ref={cardRef}
        id="kinetic-quote-poster-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX,
          rotateY,
          transformPerspective: 1000
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        className={`relative w-full rounded-2xl p-6 sm:p-10 md:p-14 ${theme.cardBg} border-2 border-[#FDE68A]/40 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl overflow-hidden text-center transition-shadow duration-300 hover:shadow-[#FDE68A]/10`}
      >
        {/* Decorative corner ornaments */}
        <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#FDE68A]/70" />
        <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#FDE68A]/70" />
        <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#FDE68A]/70" />
        <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#FDE68A]/70" />

        {/* Ambient Top Light Beam */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-40 bg-[#FDE68A]/10 blur-3xl pointer-events-none rounded-full" />

        {/* Subtle Top Accent Divider */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="h-[1px] w-24 sm:w-40 bg-gradient-to-r from-transparent via-[#FDE68A]/60 to-transparent" />
        </div>

        {/* Main Quote Text - strictly one uniform pale yellow color */}
        <div className="relative my-4 sm:my-6 px-2 sm:px-6">
          <blockquote className="font-serif-quote text-xl sm:text-2xl md:text-3xl lg:text-[32px] leading-relaxed md:leading-[1.7] text-[#FDE68A] pale-yellow-glow font-medium text-center">
            Chiến dịch 500 ngày đêm đẩy mạnh thực hiện tìm kiếm, quy tập và xác định danh tính hài cốt liệt sĩ là mệnh lệnh từ trái tim, là cuộc hành quân trong thời bình để tìm kiếm những người đã làm nên hòa bình.
          </blockquote>
        </div>

        {/* Dynamic Highlight Tooltip/Badge */}
        <div className="h-8 my-2 flex items-center justify-center">
          <span className="text-xs text-[#FDE68A] bg-[#700000]/80 border border-[#FDE68A]/40 px-3.5 py-1 rounded-full">
            Lời tri ân sâu sắc gửi tới các anh hùng liệt sĩ và thân nhân liệt sĩ
          </span>
        </div>

        {/* Footer Attribution and Seal */}
        <div className="mt-6 pt-6 border-t border-[#FDE68A]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-base sm:text-lg font-bold text-[#FDE68A] font-sans-vietnam tracking-wide uppercase">
              {FULL_QUOTE.author}
            </h4>
            <p className="text-xs sm:text-sm text-[#FDE68A]/90 font-normal mt-1">
              Trong thư nhân kỷ niệm 79 năm Ngày Thương binh - Liệt sĩ
            </p>
          </div>

          {/* Traditional Red Seal Badge */}
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-lg border-2 border-[#FDE68A]/70 bg-[#8B0000]/90 p-1 flex flex-col items-center justify-center text-[#FDE68A] shadow-md shadow-black/50 rotate-[-2deg]">
              <span className="text-[9px] font-extrabold tracking-tighter leading-none text-[#FDE68A]">TRI ÂN</span>
              <span className="text-[10px] font-bold text-[#FDE68A] leading-tight">LIỆT SĨ</span>
              <span className="text-[8px] tracking-widest text-[#FDE68A]/80 mt-0.5">HÒA BÌNH</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons for Poster Mode */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          id="btn-copy-full-quote"
          onClick={handleCopyQuote}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 text-[#FDE68A] border border-[#FDE68A]/40 text-xs sm:text-sm font-medium transition-all shadow-md cursor-pointer hover:border-[#FDE68A]"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          <span>Sao chép trích dẫn</span>
        </button>

        <button
          id="btn-export-poster-png"
          onClick={onExportPng}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FDE68A] hover:bg-[#FEF08A] text-neutral-950 font-bold border border-[#FDE68A] text-xs sm:text-sm transition-all shadow-lg shadow-[#FDE68A]/20 cursor-pointer"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span>Tải áp phích độ nét cao (PNG)</span>
        </button>
      </div>

    </div>
  );
};
