import React, { useState, useEffect } from 'react';
import type { AdminUser, Role } from '../types';
import { authService } from '../services/auth';

interface AdminUsersProps {
    adminUsers: AdminUser[];
    onSaveUser: (user: AdminUser) => void;
    navigate: (path: string) => void;
}

const AdminUsers: React.FC<AdminUsersProps> = ({ adminUsers, onSaveUser, navigate }) => {
    // Role check
    useEffect(() => {
        if (!authService.hasRole('Senior Admin')) {
            alert('Access denied. You must be a Senior Admin to view this page.');
            navigate('/admin/dashboard');
        }
    }, [navigate]);

    if (!authService.hasRole('Senior Admin')) {
        return null;
    }

    const handleRoleChange = (user: AdminUser, newRole: Role) => {
        if (window.confirm(`Are you sure you want to change ${user.name}'s role to ${newRole}?`)) {
            onSaveUser({ ...user, role: newRole });
        }
    };
    
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">Manage Users</h1>
                 <button className="px-4 py-2 rounded-md text-sm font-bold bg-cyan-500 text-black hover:bg-white transition-colors">Authorize New User</button>
            </div>
            <p className="text-sm text-gray-400 mb-6">Only Senior Admins can access this page to authorize, revoke, and modify other admin accounts.</p>
            
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-800">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Role</th>
                                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {adminUsers.map(user => (
                                <tr key={user.id} className="hover:bg-gray-800 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-white">{user.name}</div>
                                        <div className="text-sm text-gray-500">{user.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            user.role === 'Senior Admin' ? 'bg-yellow-900 text-yellow-300' : 'bg-gray-700 text-gray-300'
                                        }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        <select 
                                          value={user.role}
                                          onChange={(e) => handleRoleChange(user, e.target.value as Role)}
                                          className="bg-gray-700 text-white text-xs rounded p-1 border-transparent focus:ring-cyan-500 focus:border-cyan-500"
                                        >
                                            <option>Admin</option>
                                            <option>Senior Admin</option>
                                        </select>
                                        <button className="text-red-500 hover:text-red-400">Revoke Access</button>
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

export default AdminUsers;
