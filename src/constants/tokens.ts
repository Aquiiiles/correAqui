import { SportKey } from '../types';

export const BASE = {
  bg: '#faf9f6',
  surface: '#ffffff',
  soft: '#f3f2ef',
  ink: '#2a2926',
  ink2: '#7a7872',
  ink3: '#a3a19a',
  line: 'rgba(30,28,20,0.09)',
  line2: 'rgba(30,28,20,0.06)',
};

export const THEME = {
  key: 'A' as const,
  name: 'Pulso',
  accent: '#2e8b57',
  accentDim: '#267249',
  onAccent: '#ffffff',
  pop: '#7ddf64',
  tint: '#e8f5e9',
  tintInk: '#1b5e30',
};

export const SPORTS: Record<SportKey, { label: string; hue: number }> = {
  corrida: { label: 'Corrida', hue: 32 },
  pelada: { label: 'Pelada', hue: 152 },
  ciclismo: { label: 'Ciclismo', hue: 252 },
  beach: { label: 'Beach tennis', hue: 78 },
  basquete: { label: 'Basquete', hue: 50 },
  trilha: { label: 'Trilha', hue: 138 },
  volei: { label: 'Vôlei', hue: 205 },
};

const SPORT_COLORS: Record<SportKey, { cover: string; cover2: string; ink: string }> = {
  corrida: { cover: '#f5dcc4', cover2: '#ecc9a5', ink: '#8b5e3c' },
  pelada: { cover: '#c4f5d4', cover2: '#a5ecba', ink: '#3c8b5e' },
  ciclismo: { cover: '#c4c8f5', cover2: '#a5abed', ink: '#3c3e8b' },
  beach: { cover: '#eef5c4', cover2: '#e2ecab', ink: '#6e7b30' },
  basquete: { cover: '#f5e8c4', cover2: '#ecdaa5', ink: '#8b7030' },
  trilha: { cover: '#c4f5cc', cover2: '#a5ecb2', ink: '#3c8b4e' },
  volei: { cover: '#c4e4f5', cover2: '#a5d4ec', ink: '#3c6e8b' },
};

export function sportColors(sport: SportKey) {
  return SPORT_COLORS[sport];
}

export const FONT_FAMILY = {
  hanken: {
    regular: 'HankenGrotesk_400Regular',
    medium: 'HankenGrotesk_500Medium',
    semiBold: 'HankenGrotesk_600SemiBold',
    bold: 'HankenGrotesk_700Bold',
    extraBold: 'HankenGrotesk_800ExtraBold',
  },
  space: {
    regular: 'SpaceGrotesk_400Regular',
    medium: 'SpaceGrotesk_500Medium',
    semiBold: 'SpaceGrotesk_600SemiBold',
    bold: 'SpaceGrotesk_700Bold',
  },
};

export const SPACING = {
  screenPadding: 18,
  cardGap: 14,
  chipGap: 9,
  cardPadding: 14,
  cardRadius: 20,
  coverRadius: 16,
  inputRadius: 13,
  chipRadius: 11,
  buttonRadius: 15,
  inputHeight: 48,
  ctaHeight: 52,
  statusBarHeight: 50,
};

export const SHADOWS = {
  card: {
    shadowColor: 'rgb(20,20,15)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  glass: {
    shadowColor: 'rgb(20,20,15)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  cta: {
    shadowColor: '#2e8b57',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
};
