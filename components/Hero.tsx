
import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="relative h-[70vh] w-full overflow-hidden rounded-2xl mb-16">
      <img
        src="https://picsum.photos/seed/aura-hero/1920/1080"
        alt="AURA Brand Hero"
        className="h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center">
        <div className="px-8 md:px-16 max-w-2xl">
          <span className="text-cyan-400 font-bold tracking-widest uppercase text-sm mb-4 block">New Collection 2024</span>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter mb-6">
            SYSTEM <br />
            OVERRIDE
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed">
            Reimagining the urban uniform. Tactical aesthetics meet minimalist design in our latest drop.
          </p>
          <button className="bg-white text-black px-8 py-4 rounded-full font-bold text-sm tracking-widest hover:bg-cyan-500 hover:text-black transition-all duration-300 transform hover:scale-105">
            SHOP THE DROP
          </button>
        </div>
      </div>
      <div className="absolute bottom-8 right-8 hidden md:flex space-x-4">
        <div className="flex flex-col items-end">
            <span className="text-gray-500 text-xs uppercase tracking-widest">Featured</span>
            <span className="text-white text-sm font-bold">Tech Shell V2</span>
        </div>
      </div>
    </div>
  );
};
