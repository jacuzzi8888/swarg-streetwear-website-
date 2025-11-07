import React, { useState } from 'react';
import type { UpcomingItem, EditableItem } from '../types';
import { AdminEditModal } from '../components/AdminEditModal';

interface AdminUpcomingProps {
    upcomingItems: UpcomingItem[];
    onSaveItem: (item: EditableItem) => void;
    onDeleteItem: (item: EditableItem) => void;
}

const AdminUpcoming: React.FC<AdminUpcomingProps> = ({ upcomingItems, onSaveItem, onDeleteItem }) => {
    const [editingItem, setEditingItem] = useState<UpcomingItem | null>(null);

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
                <h1 className="text-3xl font-bold text-white">Manage Upcoming Items</h1>
                <button className="px-4 py-2 rounded-md text-sm font-bold bg-cyan-500 text-black hover:bg-white transition-colors">Add New Item</button>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-800">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Description</th>
                                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {upcomingItems.map(item => (
                                <tr key={item.id} className="hover:bg-gray-800 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <img className="h-10 w-10 rounded-md object-cover" src={item.imageUrl} alt="" />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-white">{item.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 max-w-sm truncate">{item.description}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        <button onClick={() => setEditingItem(item)} className="text-cyan-400 hover:text-cyan-300">Edit</button>
                                        <button onClick={() => onDeleteItem(item)} className="text-red-500 hover:text-red-400">Delete</button>
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

export default AdminUpcoming;
