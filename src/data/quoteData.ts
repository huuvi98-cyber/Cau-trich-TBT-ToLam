import { SceneData, ThemeConfig } from '../types';

export const FULL_QUOTE = {
  author: 'Tổng Bí thư, Chủ tịch nước Tô Lâm',
  source: 'Trong thư nhân kỷ niệm 79 năm Ngày Thương binh - Liệt sĩ',
  content: 'Chiến dịch 500 ngày đêm đẩy mạnh thực hiện tìm kiếm, quy tập và xác định danh tính hài cốt liệt sĩ là mệnh lệnh từ trái tim, là cuộc hành quân trong thời bình để tìm kiếm những người đã làm nên hòa bình.'
};

export const QUOTE_PHRASES = [
  {
    text: 'Chiến dịch 500 ngày đêm đẩy mạnh thực hiện tìm kiếm, quy tập và xác định danh tính hài cốt liệt sĩ',
    delay: 0.2
  },
  {
    text: 'là mệnh lệnh từ trái tim,',
    delay: 0.9
  },
  {
    text: 'là cuộc hành quân trong thời bình',
    delay: 1.5
  },
  {
    text: 'để tìm kiếm những người đã làm nên hòa bình.',
    delay: 2.1
  }
];

export const THEMES: ThemeConfig[] = [
  {
    id: 'do-dam',
    name: 'Đỏ Đậm Hào Khí',
    subtitle: 'Nền đỏ đậm trang nghiêm & linh thiêng',
    bgGradient: 'from-[#69080e] via-[#480307] to-[#2b0104]',
    cardBg: 'bg-gradient-to-br from-[#850b13] via-[#630409] to-[#3a0104]',
    borderAccent: 'border border-[#FDE68A]/35',
    goldAccent: 'text-[#FDE68A]',
    tagColor: 'bg-[#850b13]/80 text-[#FDE68A]',
    particleColor: '#FDE68A'
  },
  {
    id: 'do-son-tram',
    name: 'Đỏ Son Trầm',
    subtitle: 'Sắc son thắm thiêng liêng',
    bgGradient: 'from-[#700c12] via-[#52050b] to-[#2e0104]',
    cardBg: 'bg-gradient-to-br from-[#8a0e16] via-[#68060d] to-[#3e0205]',
    borderAccent: 'border border-[#FDE68A]/35',
    goldAccent: 'text-[#FDE68A]',
    tagColor: 'bg-[#8a0e16]/80 text-[#FDE68A]',
    particleColor: '#FDE68A'
  },
  {
    id: 'do-man',
    name: 'Đỏ Mận Sâu Lắng',
    subtitle: 'Sắc đỏ thẫm quý phái & sâu sắc',
    bgGradient: 'from-[#5e070e] via-[#400307] to-[#220103]',
    cardBg: 'bg-gradient-to-br from-[#770810] via-[#540409] to-[#320103]',
    borderAccent: 'border border-[#FDE68A]/35',
    goldAccent: 'text-[#FDE68A]',
    tagColor: 'bg-[#770810]/80 text-[#FDE68A]',
    particleColor: '#FDE68A'
  }
];


