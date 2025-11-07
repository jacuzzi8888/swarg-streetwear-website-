import React, { useState } from 'react';
import { authService } from '../services/auth';

interface AdminLoginProps {
    navigate: (path: string) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ navigate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Mock password check - in a real app, this would be a secure API call.
        if (password !== 'password123') {
             setError('Invalid email or password.');
             return;
        }

        const user = authService.login(email);
        if (user) {
            navigate('/admin/dashboard');
        } else {
            setError('Invalid email or password.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="w-full max-w-md p-8 space-y-8 bg-gray-900 border border-gray-800 rounded-lg shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl font-black text-white tracking-widest">AURA</h1>
                    <p className="mt-2 text-gray-400">Admin Panel Login</p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && <p className="text-sm text-center text-red-400">{error}</p>}
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm rounded-t-md"
                                placeholder="Email address (e.g., admin@aura.com)"
                            />
                        </div>
                        <div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm rounded-b-md"
                                placeholder="Password (hint: password123)"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-cyan-500 hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 transition-colors"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
