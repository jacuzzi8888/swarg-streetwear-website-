
import type { Product, UpcomingItem, MagazineArticle } from './types';

export const PRODUCTS: Product[] = [
  { id: 1, name: 'Acid Wash Hoodie', category: 'Hoodies', price: 120, imageUrl: 'https://picsum.photos/seed/prod1/600/800' },
  { id: 2, name: 'Graphic Tee "Glitch"', category: 'Tees', price: 45, imageUrl: 'https://picsum.photos/seed/prod2/600/800' },
  { id: 3, name: 'Utility Cargo Pants', category: 'Pants', price: 150, imageUrl: 'https://picsum.photos/seed/prod3/600/800' },
  { id: 4, name: 'Chrome Beanie', category: 'Accessories', price: 35, imageUrl: 'https://picsum.photos/seed/prod4/600/800' },
  { id: 5, name: 'Oversized "AURA" Hoodie', category: 'Hoodies', price: 135, imageUrl: 'https://picsum.photos/seed/prod5/600/800' },
  { id: 6, name: 'Vintage Boxy Tee', category: 'Tees', price: 50, imageUrl: 'https://picsum.photos/seed/prod6/600/800' },
  { id: 7, name: 'Techwear Joggers', category: 'Pants', price: 110, imageUrl: 'https://picsum.photos/seed/prod7/600/800' },
  { id: 8, name: 'Reflective Crossbody Bag', category: 'Accessories', price: 75, imageUrl: 'https://picsum.photos/seed/prod8/600/800' },
  { id: 9, name: 'Distressed Denim Jacket', category: 'Hoodies', price: 180, imageUrl: 'https://picsum.photos/seed/prod9/600/800' }, // categorizing as hoodie for variety
  { id: 10, name: 'Long Sleeve "Circuit"', category: 'Tees', price: 60, imageUrl: 'https://picsum.photos/seed/prod10/600/800' },
  { id: 11, name: 'Parachute Pants', category: 'Pants', price: 125, imageUrl: 'https://picsum.photos/seed/prod11/600/800' },
  { id: 12, name: '"AURA" Logo Cap', category: 'Accessories', price: 40, imageUrl: 'https://picsum.photos/seed/prod12/600/800' },
];

export const UPCOMING_ITEMS: UpcomingItem[] = [
  { id: 1, name: 'AURA_01 Sneakers', description: 'Our first footwear release. Limited to 100 pairs.', imageUrl: 'https://picsum.photos/seed/up1/800/600' },
  { id: 2, name: 'FW24 "System Override" Collection', description: 'The full fall/winter lineup. Get notified for the drop.', imageUrl: 'https://picsum.photos/seed/up2/800/600' },
  { id: 3, name: 'Leather Duffle Bag', description: 'Premium materials, functional design. Coming soon.', imageUrl: 'https://picsum.photos/seed/up3/800/600' },
];

export const MAGAZINE_ARTICLES: MagazineArticle[] = [
  { id: 1, title: 'Downtown Dystopia', subtitle: 'A look at our latest collection on the streets.', type: 'Photoshoot', imageUrl: 'https://picsum.photos/seed/mag1/1200/800' },
  { id: 2, title: 'Current Lineup: SS24', subtitle: 'Explore the pieces defining this season.', type: 'Lineup', imageUrl: 'https://picsum.photos/seed/mag2/1200/800' },
  { id: 3, title: 'Behind the Seams', subtitle: 'A teaser for the upcoming FW24 collection.', type: 'Teaser', imageUrl: 'https://picsum.photos/seed/mag3/1200/800' },
  { id: 4, title: 'Concrete Jungle', subtitle: 'Editorial shot in the heart of the city.', type: 'Photoshoot', imageUrl: 'https://picsum.photos/seed/mag4/1200/800' },
];
