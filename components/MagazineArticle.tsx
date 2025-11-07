import React from 'react';
// FIX: Alias the imported type to avoid a name collision with the component.
import type { MagazineArticle as MagazineArticleType } from '../types';

interface MagazineArticleProps {
  article: MagazineArticleType;
}

export const MagazineArticle: React.FC<MagazineArticleProps> = ({ article }) => {
  return (
    <div className="group relative aspect-w-16 aspect-h-9 w-full overflow-hidden rounded-lg">
      <img
        src={article.imageUrl}
        alt={article.title}
        className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6 md:p-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">{article.type}</span>
        <h2 className="mt-2 text-2xl md:text-3xl font-bold text-white">{article.title}</h2>
        <p className="mt-1 text-sm text-gray-300">{article.subtitle}</p>
      </div>
    </div>
  );
};
