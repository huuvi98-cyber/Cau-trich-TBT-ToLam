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
    subtitle: 'Nền đỏ đậm trang trọng',
    bgGradient: 'from-[#8B0000] via-[#650000] to-[#380000]',
    cardBg: 'bg-[#6B0000]/75 border-[#FDE68A]/40 backdrop-blur-md',
    borderAccent: 'border-[#FDE68A]/40',
    goldAccent: 'text-[#FDE68A]',
    tagColor: 'bg-[#7A0000]/80 text-[#FDE68A] border-[#FDE68A]/40',
    particleColor: '#FDE68A'
  },
  {
    id: 'do-son-tram',
    name: 'Đỏ Son Sắt',
    subtitle: 'Sắc son thắm hào hùng',
    bgGradient: 'from-[#9B111E] via-[#75000A] to-[#420005]',
    cardBg: 'bg-[#7B0C15]/75 border-[#FDE68A]/40 backdrop-blur-md',
    borderAccent: 'border-[#FDE68A]/40',
    goldAccent: 'text-[#FDE68A]',
    tagColor: 'bg-[#8B101B]/80 text-[#FDE68A] border-[#FDE68A]/40',
    particleColor: '#FDE68A'
  },
  {
    id: 'do-man',
    name: 'Đỏ Mận Sâu Lắng',
    subtitle: 'Sắc mận chín sâu lắng & thiêng liêng',
    bgGradient: 'from-[#800020] via-[#5C0017] to-[#36000D]',
    cardBg: 'bg-[#66001B]/75 border-[#FDE68A]/40 backdrop-blur-md',
    borderAccent: 'border-[#FDE68A]/40',
    goldAccent: 'text-[#FDE68A]',
    tagColor: 'bg-[#75001E]/80 text-[#FDE68A] border-[#FDE68A]/40',
    particleColor: '#FDE68A'
  }
];


