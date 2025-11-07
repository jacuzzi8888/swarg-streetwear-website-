import React from 'react';
import { Page } from '../types';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  cartCount: number;
}

const NavLink: React.FC<{
  page: Page;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  children: React.ReactNode;
}> = ({ page, currentPage, setCurrentPage, children }) => {
  const isActive = currentPage === page;
  return (
    <button
      onClick={() => setCurrentPage(page)}
      className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 ${
        isActive ? 'text-white' : 'text-gray-400 hover:text-white'
      }`}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-cyan-400 rounded-full"></span>
      )}
    </button>
  );
};


export const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage, cartCount }) => {
  return (
    <header className="sticky top-0 z-50 bg-black bg-opacity-80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-black text-white tracking-widest cursor-pointer" onClick={() => setCurrentPage(Page.Store)}>AURA</h1>
          </div>
          <nav className="hidden md:flex md:items-center md:space-x-4">
            <NavLink page={Page.Store} currentPage={currentPage} setCurrentPage={setCurrentPage}>Store</NavLink>
            <NavLink page={Page.Upcoming} currentPage={currentPage} setCurrentPage={setCurrentPage}>Upcoming</NavLink>
            <NavLink page={Page.Magazine} currentPage={currentPage} setCurrentPage={setCurrentPage}>Magazine</NavLink>
          </nav>
          <div className="flex items-center">
             <button className="relative p-2 text-gray-400 hover:text-white transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 block h-4 w-4 transform translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500 text-black text-xs font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
             </button>
          </div>
        </div>
         {/* Mobile Nav */}
        <nav className="md:hidden flex items-center justify-center space-x-6 py-2 border-t border-gray-800">
            <NavLink page={Page.Store} currentPage={currentPage} setCurrentPage={setCurrentPage}>Store</NavLink>
            <NavLink page={Page.Upcoming} currentPage={currentPage} setCurrentPage={setCurrentPage}>Upcoming</NavLink>
            <NavLink page={Page.Magazine} currentPage={currentPage} setCurrentPage={setCurrentPage}>Magazine</NavLink>
        </nav>
      </div>
    </header>
  );
};