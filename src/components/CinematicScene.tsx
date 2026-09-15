import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SceneData, ThemeConfig } from '../types';
import { SceneMotif } from './motifs/SceneMotifs';

interface CinematicSceneProps {
  scene: SceneData;
  theme: ThemeConfig;
  onExploreContext?: () => void;
}

export const CinematicScene: React.FC<CinematicSceneProps> = ({
  scene,
  theme,
  onExploreContext
}) => {
  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 md:px-8 py-8 flex flex-col items-center justify-center min-h-[520px] text-center z-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={`scene-${scene.id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="w-full flex flex-col items-center"
        >
          {/* Visual Motif */}
          <SceneMotif type={scene.motif} accentColor={theme.goldAccent} />

          {/* Lead Context Tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider mb-6 border border-[#FDE68A]/40 bg-neutral-900/60 text-[#FDE68A]"
          >
            <span className="w-2 h-2 rounded-full bg-[#FDE68A] animate-ping" />
            <span className="uppercase">{scene.leadContext || 'Kỷ niệm 79 năm Ngày Thương binh - Liệt sĩ (27/7)'}</span>
          </motion.div>

          {/* Primary Cinematic Text Block - strictly one pale yellow color #FDE68A */}
          <div className="space-y-6 max-w-4xl">
            <motion.blockquote
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25, duration: 0.8 }}
              className="font-serif-quote text-2xl md:text-3xl lg:text-4xl leading-relaxed md:leading-[1.7] font-semibold text-[#FDE68A] pale-yellow-glow tracking-normal px-2 md:px-6 relative"
            >
              <span className="text-[#FDE68A]/60 font-serif text-4xl md:text-5xl select-none mr-2">“</span>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="text-[#FDE68A]"
              >
                Chiến dịch 500 ngày đêm đẩy mạnh thực hiện tìm kiếm, quy tập và xác định danh tính hài cốt liệt sĩ
              </motion.span>{' '}
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="text-[#FDE68A]"
              >
                là mệnh lệnh từ trái tim,
              </motion.span>{' '}
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.6 }}
                className="text-[#FDE68A]"
              >
                là cuộc hành quân trong thời bình
              </motion.span>{' '}
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.6 }}
                className="text-[#FDE68A]"
              >
                để tìm kiếm những người đã làm nên hòa bình.
              </motion.span>
              <span className="text-[#FDE68A]/60 font-serif text-4xl md:text-5xl select-none ml-2">”</span>
            </motion.blockquote>

            {/* Attribution - strictly one pale yellow color */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.3, duration: 0.6 }}
              className="pt-6 flex flex-col items-center"
            >
              <div className="h-0.5 w-16 bg-[#FDE68A]/60 mb-3" />
              <h3 className="text-base md:text-xl font-bold tracking-wide text-[#FDE68A] uppercase font-sans-vietnam">
                Tổng Bí thư, Chủ tịch nước Tô Lâm
              </h3>
              <p className="text-xs md:text-sm text-[#FDE68A]/85 mt-1 font-normal">
                Trích Thư nhân kỷ niệm 79 năm Ngày Thương binh - Liệt sĩ (27/7)
              </p>
            </motion.div>
          </div>


          {/* Historical Note Accordion / Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-8"
          >
            <button
              id={`btn-explore-context-scene-${scene.id}`}
              onClick={onExploreContext}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-amber-200/90 hover:text-amber-100 bg-neutral-900/60 hover:bg-neutral-800/80 border border-amber-500/20 hover:border-amber-400/50 transition-all shadow-sm cursor-pointer"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <span>Xem bối cảnh lịch sử & ý nghĩa</span>
            </button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
