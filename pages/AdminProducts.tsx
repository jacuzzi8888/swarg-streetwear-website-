import React, { useState } from 'react';
import type { Product, EditableItem } from '../types';
import { AdminEditModal } from '../components/AdminEditModal';

interface AdminProductsProps {
    products: Product[];
    onSaveItem: (item: EditableItem) => void;
    onDeleteItem: (item: EditableItem) => void;
}

const AdminProducts: React.FC<AdminProductsProps> = ({ products, onSaveItem, onDeleteItem }) => {
    const [editingItem, setEditingItem] = useState<Product | null>(null);

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
                <h1 className="text-3xl font-bold text-white">Manage Products</h1>
                <button className="px-4 py-2 rounded-md text-sm font-bold bg-cyan-500 text-black hover:bg-white transition-colors">Add New Product</button>
            </div>
            
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-800">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Price</th>
                                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {products.map(product => (
                                <tr key={product.id} className="hover:bg-gray-800 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <img className="h-10 w-10 rounded-md object-cover" src={product.imageUrl} alt="" />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-white">{product.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{product.category}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">${product.price.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        <button onClick={() => setEditingItem(product)} className="text-cyan-400 hover:text-cyan-300">Edit</button>
                                        <button onClick={() => onDeleteItem(product)} className="text-red-500 hover:text-red-400">Delete</button>
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

export default AdminProducts;
