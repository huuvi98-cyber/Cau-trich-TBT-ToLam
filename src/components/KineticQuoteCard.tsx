import React, { useState, useRef, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { FULL_QUOTE } from '../data/quoteData';
import { ThemeConfig } from '../types';

interface KineticQuoteCardProps {
  theme: ThemeConfig;
  animationKey: number;
  onReplay?: () => void;
  onCopyQuote?: () => void;
  onExportPng?: () => void;
}

// Gentle solemn golden floating embers inside the card
const EMBERS = [
  { left: '12%', top: '22%', size: 3, delay: 0, duration: 4.2 },
  { left: '26%', top: '78%', size: 2.5, delay: 1.2, duration: 5.1 },
  { left: '46%', top: '16%', size: 3.5, delay: 0.5, duration: 4.5 },
  { left: '68%', top: '82%', size: 2, delay: 2, duration: 3.8 },
  { left: '84%', top: '28%', size: 3, delay: 1.5, duration: 4.4 },
  { left: '91%', top: '68%', size: 2.5, delay: 0.8, duration: 5.2 },
  { left: '16%', top: '56%', size: 2, delay: 2.5, duration: 4.8 },
  { left: '76%', top: '18%', size: 3.2, delay: 1.8, duration: 4.0 },
];

export const KineticQuoteCard: React.FC<KineticQuoteCardProps> = ({
  theme,
  animationKey,
  onReplay
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 350, y: 150 });

  // Split quote into words for the kinetic running text effect
  const words = useMemo(() => FULL_QUOTE.content.split(' '), []);
  const [revealedCount, setRevealedCount] = useState<number>(0);
  const [isDone, setIsDone] = useState<boolean>(false);

  // Progressive kinetic running text with dignified, smooth, and slow cadence ("mượt và chậm hơn")
  useEffect(() => {
    setRevealedCount(0);
    setIsDone(false);

    let intervalId: NodeJS.Timeout | null = null;
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        setRevealedCount((prev) => {
          if (prev + 1 >= words.length) {
            if (intervalId) clearInterval(intervalId);
            setIsDone(true);
            return words.length;
          }
          return prev + 1;
        });
      }, 235); // Slower, solemn kinetic reading pace
    }, 350);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [animationKey, words.length]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -y * 0.008,
      y: x * 0.008
    });
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="w-full max-w-[700px] mx-auto px-4 py-3 flex flex-col items-center z-10">
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
          className={`relative w-full rounded-2xl px-7 sm:px-9 md:px-10 py-5 sm:py-6 md:py-7 ${theme.cardBg} border border-[#FDE68A]/35 hover:border-[#FDE68A]/55 shadow-[0_30px_90px_rgba(20,0,2,0.85),0_12px_40px_rgba(0,0,0,0.55),inset_0_1px_0_0_rgba(253,230,138,0.12)] text-center overflow-hidden cursor-pointer select-none transition-all duration-300 hover:shadow-[0_35px_100px_rgba(25,0,3,0.95),0_16px_45px_rgba(0,0,0,0.65)]`}
          title="Nhấp vào khung để phát lại hoạt họa"
        >
          {/* Subtle mouse spotlight aura - no harsh border */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
            style={{
              background: `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, rgba(253,230,138,0.11), transparent 70%)`
            }}
          />

          {/* Diagonal Golden Shimmer Ray Sweep effect */}
          <motion.div
            aria-hidden="true"
            initial={{ x: '-130%', opacity: 0 }}
            animate={{ x: '180%', opacity: [0, 0.35, 0.7, 0.35, 0] }}
            transition={{
              repeat: Infinity,
              repeatDelay: 5.5,
              duration: 2.2,
              ease: 'easeInOut'
            }}
            className="absolute -top-1/2 -bottom-1/2 w-48 bg-gradient-to-r from-transparent via-[#FDE68A]/18 to-transparent skew-x-[-22deg] pointer-events-none blur-sm z-10"
          />

          {/* Ambient center warm glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-36 bg-[#FDE68A]/12 blur-3xl pointer-events-none rounded-full" />
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-96 h-40 bg-red-600/25 blur-3xl pointer-events-none rounded-full" />

          {/* Floating golden remembrance embers */}
          {EMBERS.map((ember, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              className="absolute rounded-full bg-[#FDE68A] pointer-events-none z-0"
              style={{
                left: ember.left,
                top: ember.top,
                width: ember.size,
                height: ember.size,
                boxShadow: '0 0 8px 1px rgba(253,230,138,0.7)'
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.15, 0.8, 0.15],
                scale: [0.8, 1.3, 0.8]
              }}
              transition={{
                duration: ember.duration,
                repeat: Infinity,
                delay: ember.delay,
                ease: 'easeInOut'
              }}
            />
          ))}

          {/* Main Full Quote Display with Kinetic Running Text & Traveling Quotation Mark */}
          <div className="relative my-2 sm:my-2.5 px-2 sm:px-4 min-h-[130px] sm:min-h-[145px] md:min-h-[155px] flex items-start justify-center z-10">
            <LayoutGroup id={`quote-flow-${animationKey}`}>
              <blockquote className="font-serif-quote text-xl sm:text-2xl md:text-[26px] lg:text-[28px] leading-[1.65] md:leading-[1.72] text-[#FDE68A] pale-yellow-glow font-semibold text-center tracking-[0.01em]">
                {/* Opening quote */}
                <motion.span
                  aria-hidden="true"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="inline-block text-3xl sm:text-4xl md:text-5xl font-serif-display text-[#FDE68A]/90 align-top leading-none -mt-1 sm:-mt-2 mr-1.5 select-none"
                >
                  “
                </motion.span>

                {/* Displayed words up to revealedCount with ultra-gentle typography fade */}
                {words.slice(0, revealedCount).map((word, idx) => {
                  const isLatest = idx === revealedCount - 1;
                  return (
                    <React.Fragment key={idx}>
                      <motion.span
                        initial={{ opacity: 0, y: 3, filter: 'blur(5px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                        className={`inline-block mr-[0.28em] transition-colors duration-700 ${
                          isLatest && !isDone ? 'text-[#FFFDEB]' : 'text-[#FDE68A]'
                        }`}
                      >
                        {word}
                      </motion.span>

                      {/* Closing quotation mark smoothly gliding with the running text */}
                      {isLatest && (
                        <motion.span
                          aria-hidden="true"
                          layoutId="traveling-closing-quote"
                          transition={{
                            type: 'spring',
                            stiffness: 150,
                            damping: 26,
                            mass: 0.85
                          }}
                          className="inline-block text-3xl sm:text-4xl md:text-5xl font-serif-display text-[#FDE68A] align-bottom leading-none ml-1 select-none filter drop-shadow-[0_0_12px_rgba(253,230,138,0.65)]"
                        >
                          ”
                        </motion.span>
                      )}
                    </React.Fragment>
                  );
                })}
              </blockquote>
            </LayoutGroup>
          </div>

          {/* Author Attribution Block - Fades in upon completion */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isDone ? 1 : 0, y: isDone ? 0 : 10 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mt-4 sm:mt-4.5 flex flex-col items-center z-10 relative"
          >
            {/* Thin line above author */}
            <div className="w-24 sm:w-32 h-[1px] bg-gradient-to-r from-transparent via-[#FDE68A]/50 to-transparent mb-2" />

            <h3 className="text-xs sm:text-[13px] font-semibold tracking-wider text-[#FDE68A]/90 font-sans-vietnam uppercase text-center">
              {FULL_QUOTE.author}
            </h3>
            <p className="text-[11px] sm:text-xs text-[#FDE68A]/75 mt-0.5 font-normal tracking-wide text-center max-w-md">
              {FULL_QUOTE.source}
            </p>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
