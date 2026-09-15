import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FULL_QUOTE, QUOTE_PHRASES } from '../data/quoteData';
import { ThemeConfig } from '../types';

interface KineticQuoteCardProps {
  theme: ThemeConfig;
  animationKey: number;
  onReplay?: () => void;
  onCopyQuote?: () => void;
  onExportPng?: () => void;
}

export const KineticQuoteCard: React.FC<KineticQuoteCardProps> = ({
  theme,
  animationKey,
  onReplay
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -y * 0.012,
      y: x * 0.012
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4 sm:py-8 flex flex-col items-center z-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={`quote-card-${animationKey}`}
          ref={cardRef}
          id="kinetic-quote-card-container"
          onClick={onReplay}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          animate={{
            rotateX: tilt.x,
            rotateY: tilt.y,
            transformPerspective: 1000
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className={`relative w-full rounded-2xl p-6 sm:p-10 md:p-14 ${theme.cardBg} border-2 border-[#FDE68A]/40 shadow-[0_20px_60px_rgba(0,0,0,0.85)] text-center overflow-hidden cursor-pointer`}
          title="Nhấp để phát lại hoạt họa"
        >
          {/* Subtle decorative corner notches in pale yellow */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#FDE68A]/70" />
          <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#FDE68A]/70" />
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#FDE68A]/70" />
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#FDE68A]/70" />

          {/* Soft ambient center warmth */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-32 bg-[#FDE68A]/10 blur-3xl pointer-events-none rounded-full" />

          {/* Main Full Quote Display - strictly 1 color: pale yellow (#FDE68A) */}
          <div className="relative my-4 sm:my-6 px-2 sm:px-6">
            <blockquote className="font-serif-quote text-xl sm:text-2xl md:text-3xl lg:text-[34px] leading-relaxed md:leading-[1.75] text-[#FDE68A] pale-yellow-glow font-medium text-center">
              {QUOTE_PHRASES.map((phrase, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: phrase.delay, duration: 0.65, ease: 'easeOut' }}
                  className="inline"
                >
                  {idx === 0 ? '' : ' '}
                  {phrase.text}
                </motion.span>
              ))}
            </blockquote>
          </div>

          {/* Author Attribution Block - strictly in pale yellow */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.7 }}
            className="mt-8 pt-6 border-t border-[#FDE68A]/30 flex flex-col items-center"
          >
            <h3 className="text-base sm:text-xl font-bold tracking-wider text-[#FDE68A] font-sans-vietnam uppercase">
              {FULL_QUOTE.author}
            </h3>
            <p className="text-xs sm:text-sm text-[#FDE68A]/85 mt-1.5 font-normal tracking-wide">
              {FULL_QUOTE.source}
            </p>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
