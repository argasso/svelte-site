/* eslint-disable */
/* tslint:disable */

export interface Kategori_OptimeringAvSökmotorerSEO {
  title?: string;
  description: string;
}

export interface Kategori {
  title: string;
  meny?: string;
  image?: string;
  seo: Kategori_OptimeringAvSökmotorerSEO;
}

export interface Författare {
  name: string;
  published?: boolean;
  image?: string;
}

export type Bok_Detaljer_Bindning_options = "Kartonnage" | "Häftad" | "Inbunden" | "Flexband" | "Danskt band" | "CD-bok";

export interface Bok_Detaljer {
  illustrations?: string;
  manuscript?: string;
  publishMonth?: string;
  binding?: Bok_Detaljer_Bindning_options;
  age?: string;
  numPages?: string;
}

export interface Bok_ÖversattBok {
  translator?: string;
  originalTitle?: string;
  contains?: string;
}

export interface Bok_Ljudbok {
  duration?: string;
  reciter?: string;
}

export interface Bok {
  title: string;
  author: string[];
  kategori?: string[];
  isbn: string;
  price?: number;
  published?: boolean;
  discontinued?: boolean;
  image?: string;
  shortDescription?: string;
  generalDetails?: Bok_Detaljer;
  translationDetails?: Bok_ÖversattBok;
  audioDetails?: Bok_Ljudbok;
}

export interface Startsida_Banners {
  name: string;
  image: string;
}

export interface Startsida_Kommande {
  bok: string;
  text: string;
}

export interface Startsida_OptimeringAvSökmotorerSEO {
  title?: string;
  description: string;
}

export interface Startsida {
  title: string;
  intro: string;
  banners: Startsida_Banners[];
  kommande: Startsida_Kommande[];
  seo: Startsida_OptimeringAvSökmotorerSEO;
}
