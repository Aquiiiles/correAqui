export type SportKey = 'corrida' | 'pelada' | 'ciclismo' | 'beach' | 'basquete' | 'trilha' | 'volei';

export type BucketId = 'soon' | 'weekend' | 'next' | 'two' | 'july';

export interface Event {
  id: string;
  sport: SportKey;
  bucket: BucketId;
  title: string;
  day: string;
  date: string;
  time: string;
  neighborhood: string;
  city: string;
  meta: string;
  level: string;
  price: string;
  going: number;
  spots?: number;
  host: string;
  hostInitial: string;
  featured?: boolean;
  mine?: boolean;
  people: string[];
  blurb: string;
  unit?: 'times';
}

export interface Sport {
  label: string;
  hue: number;
}

export interface Bucket {
  id: BucketId;
  label: string;
  range: string;
}

export type Screen = 'home' | 'detail' | 'create';
