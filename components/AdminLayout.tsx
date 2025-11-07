import React from 'react';
import { authService } from '../services/auth';
import type { Role } from '../types';

interface NavItemProps {
    href: string;
    icon: React.ReactNode;
    label: string;
    currentPath: string;
    navigate: (path: string) => void;
    minRole?: Role;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon, label, currentPath, navigate, minRole }) => {
    const user = authService.getCurrentUser();
    if (minRole === 'Senior Admin' && user?.role !== 'Senior Admin') {
        return null;
    }

    const isActive = currentPath === href;

    return (
        <a
            href={href}
            onClick={(e) => {
                e.preventDefault();
                navigate(href);
            }}
            className={`flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
        >
            {icon}
            <span className="ml-3">{label}</span>
        </a>
    );
}

const AdminLayout: React.FC<{ children: React.ReactNode; navigate: (path: string) => void; }> = ({ children, navigate }) => {
    const currentUser = authService.getCurrentUser();
    const currentPath = window.location.pathname;
    
    const handleLogout = () => {
        authService.logout();
        navigate('/admin/login');
    };

    const navItems = [
        { href: '/admin/dashboard', label: 'Dashboard', icon: <IconDashboard /> },
        { href: '/admin/products', label: 'Products', icon: <IconProducts /> },
        { href: '/admin/upcoming', label: 'Upcoming', icon: <IconUpcoming /> },
        { href: '/admin/magazine', label: 'Magazine', icon: <IconMagazine /> },
        { href: '/admin/users', label: 'Users', icon: <IconUsers />, minRole: 'Senior Admin' as Role },
    ];
    
    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col p-4">
                <div className="flex items-center mb-8">
                    <h1 className="text-2xl font-black text-white tracking-widest">AURA</h1>
                    <span className="ml-2 bg-cyan-500 text-black text-xs font-bold px-2 py-0.5 rounded-md">ADMIN</span>
                </div>
                <nav className="flex-1 space-y-2">
                    {navItems.map(item => <NavItem key={item.href} {...item} currentPath={currentPath} navigate={navigate} />)}
                </nav>
                <div className="mt-auto">
                     <a href="/" className="flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors text-gray-400 hover:bg-gray-800 hover:text-white">
                        <IconExternalLink />
                        <span className="ml-3">View Public Site</span>
                    </a>
                    <button onClick={handleLogout} className="w-full flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors text-gray-400 hover:bg-red-900/50 hover:text-red-300">
                        <IconLogout />
                        <span className="ml-3">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 px-8 py-4 flex justify-end items-center">
                    <div className="text-right">
                        <p className="font-semibold text-white">{currentUser?.name}</p>
                        <p className="text-xs text-cyan-400">{currentUser?.role}</p>
                    </div>
                </header>
                <main className="flex-1 p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

// SVG Icons
const IconDashboard = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>;
const IconProducts = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" /></svg>;
const IconUpcoming = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>;
const IconMagazine = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h.01a1 1 0 100-2H10zm3 0a1 1 0 000 2h.01a1 1 0 100-2H13zM7 12a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h.01a1 1 0 100-2H10zm3 0a1 1 0 100 2h.01a1 1 0 100-2H13z" clipRule="evenodd" /></svg>;
const IconUsers = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg>;
const IconLogout = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" /></svg>;
const IconExternalLink = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" /><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" /></svg>;

export default AdminLayout;
