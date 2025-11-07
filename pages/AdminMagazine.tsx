import React, { useState } from 'react';
import type { MagazineArticle as MagazineArticleType, EditableItem } from '../types';
import { AdminEditModal } from '../components/AdminEditModal';

interface AdminMagazineProps {
    magazineArticles: MagazineArticleType[];
    onSaveItem: (item: EditableItem) => void;
    onDeleteItem: (item: EditableItem) => void;
}

const AdminMagazine: React.FC<AdminMagazineProps> = ({ magazineArticles, onSaveItem, onDeleteItem }) => {
    const [editingItem, setEditingItem] = useState<MagazineArticleType | null>(null);

    return (
        <div>
            {editingItem && (
                <AdminEditModal
                    item={editingItem}
                    onClose={() => setEditingItem(null)}
                    onSave={onSaveItem}
                />
            )}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">Manage Magazine</h1>
                <button className="px-4 py-2 rounded-md text-sm font-bold bg-cyan-500 text-black hover:bg-white transition-colors">Add New Article</button>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-800">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Title</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {magazineArticles.map(article => (
                                <tr key={article.id} className="hover:bg-gray-800 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <img className="h-10 w-10 rounded-md object-cover" src={article.imageUrl} alt="" />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-white">{article.title}</div>
                                                <div className="text-sm text-gray-500">{article.subtitle}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            article.type === 'Photoshoot' ? 'bg-cyan-900 text-cyan-300' :
                                            article.type === 'Lineup' ? 'bg-indigo-900 text-indigo-300' :
                                            'bg-purple-900 text-purple-300'
                                        }`}>
                                            {article.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        <button onClick={() => setEditingItem(article)} className="text-cyan-400 hover:text-cyan-300">Edit</button>
                                        <button onClick={() => onDeleteItem(article)} className="text-red-500 hover:text-red-400">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminMagazine;
