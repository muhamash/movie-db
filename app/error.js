'use client';

import { usePathname, useRouter } from 'next/navigation';

export default function ErrorPage({ error, reset }) {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-700">
            <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
            <p className="text-lg mb-8">An unexpected error has occurred. Please try again.</p>
            <div className="flex space-x-4">
                <button
                    className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors font-nunito"
                    onClick={() => reset()}
                >
                    Reload
                </button>
                {pathname !== '/' && (
                    <button
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors font-nunito"
                        onClick={() => router.push('/')}
                    >
                        Back to Home
                    </button>
                )}
                {pathname !== '/' && (
                    <button
                        className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors font-lato"
                        onClick={() => router.back()}
                    >
                        Go Back
                    </button>
                )}
            </div>
        </div>
    );
}
