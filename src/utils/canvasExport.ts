import { FULL_QUOTE } from '../data/quoteData';

export function exportPosterImage(themeId: string): void {
  const canvas = document.createElement('canvas');
  const width = 1200;
  const height = 800;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Background gradient depending on theme - Deep Vibrant Red
  const bg = ctx.createLinearGradient(0, 0, width, height);
  if (themeId === 'do-son-tram') {
    bg.addColorStop(0, '#9B111E');
    bg.addColorStop(0.5, '#70000A');
    bg.addColorStop(1, '#3E0005');
  } else if (themeId === 'do-man') {
    bg.addColorStop(0, '#800020');
    bg.addColorStop(0.5, '#560015');
    bg.addColorStop(1, '#30000B');
  } else {
    // Default 'do-dam' (nền đỏ đậm)
    bg.addColorStop(0, '#8B0000');
    bg.addColorStop(0.5, '#620000');
    bg.addColorStop(1, '#380000');
  }

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  // Subtle radial center warmth
  const centerRadial = ctx.createRadialGradient(width / 2, height / 2, 80, width / 2, height / 2, 500);
  centerRadial.addColorStop(0, 'rgba(253, 230, 138, 0.12)');
  centerRadial.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = centerRadial;
  ctx.fillRect(0, 0, width, height);

  // Outer border
  ctx.strokeStyle = 'rgba(253, 230, 138, 0.4)';
  ctx.lineWidth = 3;
  ctx.strokeRect(30, 30, width - 60, height - 60);

  // Inner border
  ctx.strokeStyle = 'rgba(253, 230, 138, 0.2)';
  ctx.lineWidth = 1;
  ctx.strokeRect(40, 40, width - 80, height - 80);

  // Corner ornaments
  const corners = [
    [40, 40],
    [width - 40, 40],
    [40, height - 40],
    [width - 40, height - 40]
  ];
  ctx.fillStyle = '#FDE68A';
  corners.forEach(([cx, cy]) => {
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fill();
  });

  // Top divider line (no text)
  ctx.strokeStyle = 'rgba(253, 230, 138, 0.4)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 120, 140);
  ctx.lineTo(width / 2 + 120, 140);
  ctx.stroke();

  // Quote text wrapped - ALL in pale yellow #FDE68A
  ctx.font = '600 32px "Spectral", "Playfair Display", serif';
  ctx.fillStyle = '#FDE68A';
  
  const text = FULL_QUOTE.content;
  const maxWidth = 880;
  const lineHeight = 54;
  
  // Custom text wrap helper
  const words = text.split(' ');
  let line = '';
  const lines: string[] = [];

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      lines.push(line);
      line = words[n] + ' ';
    } else {
      line = testLine;
    }
  }
  lines.push(line);

  let startY = 270;
  lines.forEach((l) => {
    ctx.fillText(l.trim(), width / 2, startY);
    startY += lineHeight;
  });

  // Bottom attribution
  const bottomY = startY + 50;
  ctx.strokeStyle = 'rgba(253, 230, 138, 0.5)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 40, bottomY);
  ctx.lineTo(width / 2 + 40, bottomY);
  ctx.stroke();

  ctx.font = '700 24px "Be Vietnam Pro", sans-serif';
  ctx.fillStyle = '#FDE68A';
  ctx.fillText(FULL_QUOTE.author.toUpperCase(), width / 2, bottomY + 45);

  ctx.font = '400 16px "Be Vietnam Pro", sans-serif';
  ctx.fillStyle = 'rgba(253, 230, 138, 0.9)';
  ctx.fillText(FULL_QUOTE.source, width / 2, bottomY + 75);

  // Download trigger
  const link = document.createElement('a');
  link.download = `Trich-dan-Tong-Bi-thu-To-Lam.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}
