export type ThemeId = 'do-dam' | 'do-son-tram' | 'do-man';

export type DisplayMode = 'cinematic' | 'poster' | 'context';

export type MotifType = 
  | 'emblem'
  | 'campaign'
  | 'heart'
  | 'march'
  | 'peace'
  | 'grand-finale';

export interface SceneData {
  id: number;
  title: string;
  leadContext: string;
  quotePart: string;
  emphasisWord: string;
  subtext: string;
  historicalNote: string;
  motif: MotifType;
  durationSeconds: number; // Duration in standard 1x speed
}

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  subtitle: string;
  bgGradient: string;
  cardBg: string;
  borderAccent: string;
  goldAccent: string;
  tagColor: string;
  particleColor: string;
}
