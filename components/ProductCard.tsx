import React from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
  onVisualize: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onVisualize }) => {
  return (
    <div className="group relative flex flex-col h-full">
      <div className="aspect-w-3 aspect-h-4 w-full overflow-hidden rounded-md bg-gray-800">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        {/* The entire card is still clickable via the link below */}
        <a href="#" className="absolute inset-0"><span className="sr-only">View {product.name}</span></a>

         {/* Visualize Button Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onVisualize(product);
                }}
                className="relative z-10 p-3 bg-white/20 text-white rounded-full opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 backdrop-blur-sm hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                aria-label={`Visualize ${product.name} on a model`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
            </button>
        </div>
      </div>
      <div className="mt-4 flex flex-col flex-grow">
        <div className="flex justify-between">
            <div>
              <h3 className="text-sm text-white">
                {product.name}
              </h3>
              <p className="mt-1 text-sm text-gray-500">{product.category}</p>
            </div>
            <p className="text-sm font-medium text-gray-300">${product.price}</p>
        </div>
        <div className="mt-auto pt-4">
            <button
                onClick={(e) => {
                    e.preventDefault(); // Prevent the link wrapper from navigating
                    e.stopPropagation();
                    onAddToCart();
                }}
                className="relative z-10 w-full bg-gray-700 text-white py-2 px-4 rounded-md text-sm font-bold transition-colors duration-300 hover:bg-cyan-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black"
            >
                Add to Cart
            </button>
        </div>
      </div>
    </div>
  );
};