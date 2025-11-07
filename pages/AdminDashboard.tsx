import React from 'react';
import type { Product, UpcomingItem, MagazineArticle as MagazineArticleType } from '../types';

interface AdminDashboardProps {
    products: Product[];
    upcomingItems: UpcomingItem[];
    magazineArticles: MagazineArticleType[];
    navigate: (path: string) => void;
}

const StatCard: React.FC<{ title: string; value: number; link: string; navigate: (path: string) => void; }> = ({ title, value, link, navigate }) => (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <p className="text-sm font-medium text-gray-400">{title}</p>
        <p className="mt-2 text-3xl font-bold text-white">{value}</p>
        <a 
            href={link}
            onClick={e => { e.preventDefault(); navigate(link); }}
            className="mt-4 inline-block text-sm font-semibold text-cyan-400 hover:text-cyan-300"
        >
            Manage &rarr;
        </a>
    </div>
);


const AdminDashboard: React.FC<AdminDashboardProps> = ({ products, upcomingItems, magazineArticles, navigate }) => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Products" value={products.length} link="/admin/products" navigate={navigate} />
                <StatCard title="Upcoming Items" value={upcomingItems.length} link="/admin/upcoming" navigate={navigate} />
                <StatCard title="Magazine Articles" value={magazineArticles.length} link="/admin/magazine" navigate={navigate} />
            </div>
             <div className="mt-10 bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                <h2 className="text-xl font-bold text-white mb-4">Audit Log (Mock)</h2>
                <p className="text-sm text-gray-400 mb-4">This is a placeholder for a real audit trail. In a production app, all admin actions would be logged here for security and accountability.</p>
                <div className="font-mono text-xs text-gray-500 space-y-2 max-h-60 overflow-y-auto">
                   <p><span className="text-cyan-400">[2024-07-21 10:32:15]</span> USER 'senior.admin@aura.com' LOGGED IN.</p>
                   <p><span className="text-yellow-400">[2024-07-21 10:31:50]</span> FAILED LOGIN ATTEMPT for user 'test@example.com'.</p>
                   <p><span className="text-cyan-400">[2024-07-20 16:45:02]</span> USER 'admin@aura.com' UPDATED Product ID #5.</p>
                   <p><span className="text-cyan-400">[2024-07-20 16:44:10]</span> USER 'admin@aura.com' LOGGED IN.</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
