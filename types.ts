
export enum Page {
  Store = 'STORE',
  Upcoming = 'UPCOMING',
  Magazine = 'MAGAZINE',
}

export type Category = 'All' | 'Hoodies' | 'Tees' | 'Pants' | 'Accessories';

export interface Product {
  id: number;
  name: string;
  category: Omit<Category, 'All'>;
  price: number;
  imageUrl: string;
}

export interface UpcomingItem {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

export interface MagazineArticle {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  type: 'Photoshoot' | 'Lineup' | 'Teaser';
}
