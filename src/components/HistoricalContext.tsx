import React from 'react';
import { motion } from 'motion/react';
import { ThemeConfig } from '../types';

interface HistoricalContextProps {
  theme: ThemeConfig;
  onBackToCinematic: () => void;
}

export const HistoricalContext: React.FC<HistoricalContextProps> = ({
  theme,
  onBackToCinematic
}) => {
  const sections = [
    {
      title: 'Ý Nghĩa Thiêng Liêng 27/7',
      badge: 'Đạo Lý Dân Tộc',
      color: 'border-red-500/40 text-rose-300',
      content:
        'Kỷ niệm 79 năm Ngày Thương binh - Liệt sĩ (27/7) là dịp toàn Đảng, toàn dân và toàn quân tưởng nhớ, tri ân sâu sắc các bậc tiền bối cách mạng, các anh hùng liệt sĩ đã ngã xuống vì độc lập, chủ quyền Tổ quốc và hạnh phúc của nhân dân.'
    },
    {
      title: 'Chiến Dịch 500 Ngày Đêm',
      badge: 'Quyết Tâm Lịch Sử',
      color: 'border-amber-500/40 text-amber-300',
      content:
        'Được triển khai với tinh thần khẩn trương và trách nhiệm cao nhất, kết hợp giữa kinh nghiệm thực tiễn tìm kiếm của các lực lượng vũ trang và tiến bộ khoa học kỹ thuật hiện đại: ngân hàng gen (ADN) thân nhân liệt sĩ, đối sánh sinh trắc học để sớm trả lại danh tính cho các anh.'
    },
    {
      title: 'Mệnh Lệnh Từ Trái Tim',
      badge: 'Lương Tri & Nghĩa Tình',
      color: 'border-rose-500/40 text-rose-200',
      content:
        'Không chỉ là nhiệm vụ được giao phó, việc tìm kiếm và quy tập hài cốt liệt sĩ xuất phát từ lòng biết ơn vô hạn, nỗi đau xót trước những mất mát và trách nhiệm đạo đức cao cả của thế hệ hôm nay đối với những người đã ngã xuống.'
    },
    {
      title: 'Cuộc Hành Quân Thời Bình',
      badge: 'Ý Chí Kiên Cường',
      color: 'border-amber-400/40 text-amber-200',
      content:
        'Hình ảnh các cán bộ, chiến sĩ Đội chuyên trách (Đội K) ngày đêm lặn lội nơi rừng thiêng nước độc, núi cao hiểm trở, biên giới và nước bạn Lào, Campuchia; đối mặt với hiểm nguy bom mìn để đưa các anh về đất mẹ.'
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 z-10">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif-display text-amber-300">
            Bối Cảnh & Ý Nghĩa Lịch Sử
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Tìm hiểu sâu hơn về thông điệp của Tổng Bí thư, Chủ tịch nước Tô Lâm
          </p>
        </div>

        <button
          id="btn-return-cinematic"
          onClick={onBackToCinematic}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-xs sm:text-sm font-medium text-neutral-200 border border-neutral-700 hover:border-amber-400/50 transition-all cursor-pointer"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span>Quay lại Trình chiếu</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {sections.map((sec, idx) => (
          <motion.div
            key={sec.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="p-5 sm:p-6 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-amber-500/30 transition-all backdrop-blur-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border bg-neutral-950/60 ${sec.color}`}>
                {sec.badge}
              </span>
              <span className="text-xs text-neutral-500 font-mono">0{idx + 1}</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-neutral-100 font-sans-vietnam mb-2">
              {sec.title}
            </h3>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
              {sec.content}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Quote summary callout */}
      <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-red-950/40 via-stone-900/60 to-amber-950/40 border border-amber-500/30 text-center">
        <p className="font-serif-quote text-base sm:text-lg text-amber-200/90 italic max-w-3xl mx-auto leading-relaxed">
          “Chiến dịch 500 ngày đêm đẩy mạnh thực hiện tìm kiếm, quy tập và xác định danh tính hài cốt liệt sĩ là mệnh lệnh từ trái tim, là cuộc hành quân trong thời bình để tìm kiếm những người đã làm nên hòa bình.”
        </p>
        <p className="text-xs text-neutral-400 mt-2 font-medium uppercase tracking-wider">
          — Tổng Bí thư, Chủ tịch nước Tô Lâm —
        </p>
      </div>
    </div>
  );
};
