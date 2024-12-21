'use client'

import { useAuth } from '@/hooks/useAuth';
import { performLogin } from '@/utils/actions/formAction';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); 
    const router = useRouter();

    const { auth, setAuth } = useAuth();

    async function onSubmit(event) {
        event.preventDefault();
        setError(""); 
        setLoading(true); 

        try {
            const formData = new FormData(event.currentTarget);
            const found = await performLogin(formData);

            if ( found )
            {
                setAuth( found );
                router.push('/');
            } else {
                setError('Please provide valid login credentials.');
            }
        } catch (err) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full max-w-md bg-black/70 rounded-lg p-8 shadow-xl">
            <div className="text-center mb-6">
                <h1 className="text-white text-3xl font-bold mb-4">Sign In</h1>

                {error && (
                    <div className="text-red-500 text-sm mb-4 font-lato">
                        {error}
                    </div>
                )}

                <form id="loginForm" className="space-y-4" onSubmit={onSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email or phone number"
                        className="w-full font-nunito p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full font-nunito p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading} 
                        className={`w-full font-manrope py-3 rounded duration-200 transition-transform ${
                            loading 
                                ? 'bg-gray-500 cursor-not-allowed' 
                                : 'bg-moviedb-red text-white hover:scale-90 hover:bg-red-700'
                        }`}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-4 flex justify-between text-moviedb-gray text-sm">
                    <label className="flex items-center font-manrope text-slate-400">
                        <input type="checkbox" className="mr-2" />
                        Remember me
                    </label>
                    <a href="#" className="hover:underline text-slate-400 font-manrope">Need help?</a>
                </div>

                <div className="mt-6 font-manrope text-moviedb-gray">
                    New to moviedb?
                    <Link href="/registration" className="text-white hover:underline font-manrope px-2">Sign up now</Link>
                </div>
            </div>
        </div>
    );
}