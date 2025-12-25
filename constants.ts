
import type { Product, UpcomingItem, MagazineArticle, AdminUser } from './types';

export const PRODUCTS: Product[] = [
  { id: 1, name: 'Acid Wash Hoodie', category: 'Hoodies', price: 120, imageUrl: 'https://picsum.photos/seed/aura-hoodie-1/600/800' },
  { id: 2, name: 'Graphic Tee "Glitch"', category: 'Tees', price: 45, imageUrl: 'https://picsum.photos/seed/aura-tee-1/600/800' },
  { id: 3, name: 'Utility Cargo Pants', category: 'Pants', price: 150, imageUrl: 'https://picsum.photos/seed/aura-pants-1/600/800' },
  { id: 4, name: 'Chrome Beanie', category: 'Accessories', price: 35, imageUrl: 'https://picsum.photos/seed/aura-acc-1/600/800' },
  { id: 5, name: 'Oversized "AURA" Hoodie', category: 'Hoodies', price: 135, imageUrl: 'https://picsum.photos/seed/aura-hoodie-2/600/800' },
  { id: 6, name: 'Vintage Boxy Tee', category: 'Tees', price: 50, imageUrl: 'https://picsum.photos/seed/aura-tee-2/600/800' },
  { id: 7, name: 'Techwear Joggers', category: 'Pants', price: 110, imageUrl: 'https://picsum.photos/seed/aura-pants-2/600/800' },
  { id: 8, name: 'Reflective Crossbody Bag', category: 'Accessories', price: 75, imageUrl: 'https://picsum.photos/seed/aura-acc-2/600/800' },
  { id: 9, name: 'Distressed Denim Jacket', category: 'Hoodies', price: 180, imageUrl: 'https://picsum.photos/seed/aura-jacket-1/600/800' },
  { id: 10, name: 'Long Sleeve "Circuit"', category: 'Tees', price: 60, imageUrl: 'https://picsum.photos/seed/aura-tee-3/600/800' },
  { id: 11, name: 'Parachute Pants', category: 'Pants', price: 125, imageUrl: 'https://picsum.photos/seed/aura-pants-3/600/800' },
  { id: 12, name: '"AURA" Logo Cap', category: 'Accessories', price: 40, imageUrl: 'https://picsum.photos/seed/aura-acc-3/600/800' },
  { id: 13, name: 'Cyberpunk Windbreaker', category: 'Hoodies', price: 195, imageUrl: 'https://picsum.photos/seed/aura-jacket-2/600/800' },
  { id: 14, name: 'Oversized Scarf', category: 'Accessories', price: 55, imageUrl: 'https://picsum.photos/seed/aura-acc-4/600/800' },
  { id: 15, name: 'Cargo Vest "Tactical"', category: 'Tees', price: 85, imageUrl: 'https://picsum.photos/seed/aura-vest-1/600/800' },
  { id: 16, name: 'Baggy Denim "Orbit"', category: 'Pants', price: 140, imageUrl: 'https://picsum.photos/seed/aura-pants-4/600/800' },
  { id: 17, name: 'Split-Color Hoodie', category: 'Hoodies', price: 115, imageUrl: 'https://picsum.photos/seed/aura-hoodie-3/600/800' },
  { id: 18, name: 'Minimalist Tote', category: 'Accessories', price: 65, imageUrl: 'https://picsum.photos/seed/aura-acc-5/600/800' },
  { id: 19, name: 'Abstract Print Tee', category: 'Tees', price: 48, imageUrl: 'https://picsum.photos/seed/aura-tee-4/600/800' },
  { id: 20, name: 'Stitch Detail Slacks', category: 'Pants', price: 130, imageUrl: 'https://picsum.photos/seed/aura-pants-5/600/800' },
  { id: 21, name: 'Fleece Quarter-Zip', category: 'Hoodies', price: 95, imageUrl: 'https://picsum.photos/seed/aura-hoodie-4/600/800' },
  { id: 22, name: 'Industrial Belt', category: 'Accessories', price: 30, imageUrl: 'https://picsum.photos/seed/aura-acc-6/600/800' },
  { id: 23, name: 'Neon Accent Tee', category: 'Tees', price: 52, imageUrl: 'https://picsum.photos/seed/aura-tee-5/600/800' },
  { id: 24, name: 'Wide Leg Trousers', category: 'Pants', price: 145, imageUrl: 'https://picsum.photos/seed/aura-pants-6/600/800' },
];

export const UPCOMING_ITEMS: UpcomingItem[] = [
  { id: 1, name: 'AURA_01 Sneakers', description: 'Our first footwear release. Limited to 100 pairs.', imageUrl: 'https://picsum.photos/seed/aura-up-1/800/600' },
  { id: 2, name: 'FW24 "System Override" Collection', description: 'The full fall/winter lineup. Get notified for the drop.', imageUrl: 'https://picsum.photos/seed/aura-up-2/800/600' },
  { id: 3, name: 'Leather Duffle Bag', description: 'Premium materials, functional design. Coming soon.', imageUrl: 'https://picsum.photos/seed/aura-up-3/800/600' },
  { id: 4, name: 'Tech Shell V2', description: 'Advanced weatherproofing meets urban aesthetics.', imageUrl: 'https://picsum.photos/seed/aura-up-4/800/600' },
  { id: 5, name: 'Graphic Hardware Collab', description: 'A limited capsule with local digital artists.', imageUrl: 'https://picsum.photos/seed/aura-up-5/800/600' },
  { id: 6, name: 'Cargo Shorts "Summer"', description: 'Transitioning to the warmer months with utility.', imageUrl: 'https://picsum.photos/seed/aura-up-6/800/600' },
];

export const MAGAZINE_ARTICLES: MagazineArticle[] = [
  { id: 1, title: 'Downtown Dystopia', subtitle: 'A look at our latest collection on the streets.', type: 'Photoshoot', imageUrl: 'https://picsum.photos/seed/aura-mag-1/1200/800' },
  { id: 2, title: 'Current Lineup: SS24', subtitle: 'Explore the pieces defining this season.', type: 'Lineup', imageUrl: 'https://picsum.photos/seed/aura-mag-2/1200/800' },
  { id: 3, title: 'Behind the Seams', subtitle: 'A teaser for the upcoming FW24 collection.', type: 'Teaser', imageUrl: 'https://picsum.photos/seed/aura-mag-3/1200/800' },
  { id: 4, title: 'Concrete Jungle', subtitle: 'Editorial shot in the heart of the city.', type: 'Photoshoot', imageUrl: 'https://picsum.photos/seed/aura-mag-4/1200/800' },
  { id: 5, title: 'Minimalist Movement', subtitle: 'Why less is more in the new urban era.', type: 'Teaser', imageUrl: 'https://picsum.photos/seed/aura-mag-5/1200/800' },
  { id: 6, title: 'Night Vision', subtitle: 'Exploring the utility of reflective materials.', type: 'Photoshoot', imageUrl: 'https://picsum.photos/seed/aura-mag-6/1200/800' },
  { id: 7, title: 'The Designer Notes', subtitle: 'A deep dive into the system override concept.', type: 'Lineup', imageUrl: 'https://picsum.photos/seed/aura-mag-7/1200/800' },
  { id: 8, title: 'Street Level', subtitle: 'Community spotlight: How you wear AURA.', type: 'Photoshoot', imageUrl: 'https://picsum.photos/seed/aura-mag-8/1200/800' },
];

export const ADMIN_USERS: AdminUser[] = [
    { id: 1, name: 'Alex Doe', email: 'senior.admin@aura.com', role: 'Senior Admin' },
    { id: 2, name: 'Blake Smith', email: 'admin@aura.com', role: 'Admin' },
];
