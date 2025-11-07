
import React from 'react';
import type { UpcomingItem } from '../types';

interface UpcomingItemCardProps {
  item: UpcomingItem;
}

export const UpcomingItemCard: React.FC<UpcomingItemCardProps> = ({ item }) => {
    const handleWaitlist = () => {
        const email = prompt(`Enter your email to join the waitlist for ${item.name}:`);
        if (email) {
            alert(`Thank you! You've been added to the waitlist for ${item.name} at ${email}.`);
        }
    };

  return (
    <div className="group relative flex flex-col h-full bg-gray-900/50 rounded-lg overflow-hidden border border-gray-800">
      <div className="relative aspect-w-16 aspect-h-9 w-full overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="h-full w-full object-cover object-center transition-opacity duration-500 group-hover:opacity-90"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-white">{item.name}</h3>
        <p className="mt-2 text-sm text-gray-400 flex-grow">{item.description}</p>
        <div className="mt-6 flex items-center space-x-2">
            <button 
              onClick={handleWaitlist}
              className="w-full bg-cyan-500 text-black py-2 px-4 rounded-md text-sm font-bold transition-all duration-300 hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black">
              Join Waitlist
            </button>
        </div>
      </div>
    </div>
  );
};
