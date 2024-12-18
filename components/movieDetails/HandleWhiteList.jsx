"use client"

import { useAuth } from "@/hooks/useAuth";

export default function HandleWhiteList ( { id } )
{
    const { auth } = useAuth();
    console.log( id, auth );
    
    return (
        <div className="mb-6 font-manrope">
            <div className="flex flex-wrap gap-4">
                <button className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                        <path d="M17 21H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
                        <path d="M12 11v6" />
                        <path d="M9 14h6" />
                    </svg>
                    Add to Watch List
                </button>
                <button className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg text-green-600">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M7 12l5 5L22 7" />
                        <path d="M2 12l5 5 5-5-5-5" />
                    </svg>
                    Added to Watch List
                </button>
            </div>
        </div>
    );
}
