export type Section =
  | "diplomacy"
  | "foreign-policy"
  | "world"
  | "analysis"
  | "opinion"
  | "magazine";

export interface Author {
  name: string;
  role: string;
  avatar?: string;
}

export interface Article {
  slug: string;
  section: Section;
  title: string;
  dek: string;
  image: string;
  author: Author;
  publishedAt: string;
  words: number;
  tags: string[];
  region?: string;
  featured?: boolean;
  premium?: boolean;
  body?: string[];
}

export interface Country {
  slug: string;
  name: string;
  region: string;
  capital: string;
  flagEmoji: string;
  population: string;
  government: string;
  gdp: string;
  riskLevel: "Low" | "Guarded" | "Elevated" | "High";
  summary: string;
  headlineSlugs: string[];
  coordinates: { x: number; y: number };
}

export interface Embassy {
  country: string;
  city: string;
  ambassador: string;
  address: string;
  phone: string;
  type: "Embassy" | "Consulate" | "Mission";
}

export interface TickerItem {
  label: string;
  value: string;
  trend: "up" | "down" | "flat";
}
