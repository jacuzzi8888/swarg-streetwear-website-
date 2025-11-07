
import React from 'react';

export const Footer: React.FC = () => {
  const socialLinks = ['Twitter', 'Instagram', 'TikTok'];
  return (
    <footer className="bg-black border-t border-gray-900 mt-24">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-black text-white tracking-widest">AURA</h2>
            <p className="text-gray-500 text-sm mt-1">&copy; {new Date().getFullYear()} AURA Industries. All Rights Reserved.</p>
          </div>
          <div className="flex items-center space-x-6">
            {socialLinks.map((link) => (
              <a key={link} href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                {link}
              </a>
            ))}
             <a
              href="/admin/login"
              className="border-2 px-3 py-1 rounded-md text-xs font-bold transition-all duration-300 border-gray-700 text-gray-400 hover:border-white hover:text-white"
            >
              Admin Login
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
