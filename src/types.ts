export type PageId = 'page1' | 'page2' | 'page3' | 'page4' | 'page5' | 'page6';

export interface MemoryPhoto {
  id: string;
  filename: string;
  title: string;
  subtitle: string;
  caption: string;
  tag: string;
  accentColor: string;
  fallbackIcon: string;
  vibe: string;
}

export interface RoastPhoto {
  id: string;
  filename: string;
  title: string;
  memeComment: string;
  sticker: string;
  dangerLevel: number;
}

export interface ChemistryElement {
  symbol: string;
  name: string;
  atomicNumber: number;
  atomicMass: string;
  description: string;
  color: string;
}
