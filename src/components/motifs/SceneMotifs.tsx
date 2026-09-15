import React from 'react';
import { motion } from 'motion/react';
import { MotifType } from '../../types';

interface MotifProps {
  type: MotifType;
  accentColor?: string;
}

export const SceneMotif: React.FC<MotifProps> = ({ type, accentColor = '#F59E0B' }) => {
  switch (type) {
    case 'emblem':
      return (
        <motion.div
          key="motif-emblem"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative flex items-center justify-center w-28 h-28 md:w-36 md:h-36 mx-auto mb-6"
        >
          {/* Radiant pulse rings */}
          <div className="absolute inset-0 rounded-full border border-amber-500/20 animate-ping opacity-40" style={{ animationDuration: '3s' }} />
          <div className="absolute -inset-3 rounded-full border border-amber-400/30 animate-pulse-slow" />
          
          {/* Circular badge */}
          <div className="w-full h-full rounded-full bg-gradient-to-br from-red-700 via-red-900 to-amber-950 p-1 shadow-2xl shadow-red-950/80 flex items-center justify-center border-2 border-amber-400/60">
            {/* Inner gear/sunburst ring */}
            <div className="w-full h-full rounded-full border border-dashed border-amber-300/40 flex items-center justify-center p-3 relative overflow-hidden">
              <div className="absolute inset-0 bg-radial from-amber-400/20 to-transparent" />
              {/* Quotation emblem */}
              <svg viewBox="0 0 24 24" className="w-14 h-14 md:w-16 md:h-16 drop-shadow-[0_0_15px_rgba(253,230,138,0.8)] fill-[#FDE68A]">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
          </div>
        </motion.div>
      );

    case 'campaign':
      return (
        <motion.div
          key="motif-campaign"
          initial={{ scale: 0.85, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative flex flex-col items-center justify-center mx-auto mb-6"
        >
          <div className="relative flex items-center justify-center">
            {/* Outer radar pulse */}
            <div className="absolute -inset-4 rounded-2xl border border-amber-500/30 animate-pulse" />
            <div className="relative px-6 py-3 rounded-xl bg-gradient-to-r from-red-900/80 via-amber-900/60 to-red-950/80 border border-amber-400/50 shadow-xl flex items-center gap-3">
              <span className="text-3xl md:text-4xl font-extrabold font-serif-display text-amber-300 tracking-wider">
                500
              </span>
              <div className="text-left border-l border-amber-400/40 pl-3">
                <div className="text-xs tracking-widest uppercase font-bold text-amber-200">
                  NGÀY ĐÊM
                </div>
                <div className="text-[11px] text-amber-100/70 font-light">
                  Quyết tâm cao độ
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      );

    case 'heart':
      return (
        <motion.div
          key="motif-heart"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative flex items-center justify-center w-24 h-24 md:w-32 md:h-32 mx-auto mb-6"
        >
          {/* Pulsing acoustic heart waves */}
          <div className="absolute inset-0 rounded-full bg-red-600/20 blur-xl animate-pulse" />
          <div className="absolute -inset-4 rounded-full border border-red-500/30 animate-ping opacity-30" style={{ animationDuration: '2s' }} />

          <div className="relative z-10 p-4 rounded-full bg-gradient-to-br from-red-600 to-rose-950 border-2 border-amber-400/70 shadow-[0_0_30px_rgba(225,29,72,0.6)] animate-heartbeat">
            <svg viewBox="0 0 24 24" className="w-12 h-12 md:w-16 md:h-16 fill-amber-300 stroke-red-100 stroke-1 drop-shadow-md">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        </motion.div>
      );

    case 'march':
      return (
        <motion.div
          key="motif-march"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative flex items-center justify-center gap-4 mx-auto mb-6 py-2 px-6 rounded-full bg-neutral-900/60 border border-amber-500/30"
        >
          {/* Marching footprints & star indicator */}
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.3, scale: 0.8 }}
                animate={{ opacity: [0.3, 1, 0.4], scale: [0.8, 1.1, 0.9] }}
                transition={{ repeat: Infinity, duration: 1.8, delay: i * 0.4 }}
                className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B]"
              />
            ))}
          </div>
          <span className="text-xs md:text-sm font-semibold tracking-wider text-amber-200 uppercase">
            Hành quân thời bình • Tiếp bước cha anh
          </span>
        </motion.div>
      );

    case 'peace':
      return (
        <motion.div
          key="motif-peace"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative flex items-center justify-center w-24 h-24 md:w-32 md:h-32 mx-auto mb-6"
        >
          <div className="absolute inset-0 rounded-full bg-amber-400/15 blur-xl animate-pulse" />
          
          <div className="relative p-4 rounded-full bg-gradient-to-tr from-amber-900/60 via-stone-900 to-emerald-950 border border-amber-400/50 shadow-2xl flex items-center justify-center">
            {/* Peace Olive & Golden Flame motif */}
            <svg viewBox="0 0 24 24" className="w-12 h-12 md:w-16 md:h-16 stroke-amber-300 fill-amber-400/20 stroke-1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v6m0 0a4 4 0 0 1 4 4v7a3 3 0 0 1-3 3H11a3 3 0 0 1-3-3v-7a4 4 0 0 1 4-4zm-7 8a7 7 0 0 0 7 7m7-7a7 7 0 0 1-7 7" />
              {/* Flame top */}
              <circle cx="12" cy="5" r="2.5" className="fill-amber-400 animate-pulse" />
            </svg>
          </div>
        </motion.div>
      );

    case 'grand-finale':
      return (
        <motion.div
          key="motif-grand-finale"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="h-[1px] w-12 md:w-20 bg-gradient-to-r from-transparent to-[#FDE68A]/70" />
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FDE68A]/40 bg-neutral-900/60">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#FDE68A]">
              <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
            </svg>
            <span className="text-xs tracking-widest text-[#FDE68A] font-semibold uppercase">
              Tổ Quốc Ghi Công • Đời Đời Nhớ Ơn
            </span>
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#FDE68A]">
              <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
            </svg>
          </div>
          <div className="h-[1px] w-12 md:w-20 bg-gradient-to-l from-transparent to-[#FDE68A]/70" />
        </motion.div>
      );

    default:
      return null;
  }
};
