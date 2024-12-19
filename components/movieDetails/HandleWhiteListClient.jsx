"use client";

import { addWhiteList } from "@/utils/actions/whiteListAction";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function HandleWhiteListClient({ id, initialInterested }) {
    const [interested, setInterested] = useState(initialInterested);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleWhiteListButton = async () => {
        try {
            await addWhiteList(String(auth?.id), id);
            setInterested(!interested);
        } catch (error) {
            console.error("Error updating whitelist:", error);
        }
    };

    return (
        <div className="mb-6 font-manrope">
            <div className="flex flex-wrap gap-4">
                <button
                    onClick={() => startTransition(() => handleWhiteListButton())}
                    className={`${interested ? "flex items-center gap-2 bg-black/40 text-green-700 px-4 py-2 rounded-lg" : "flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg"}`}
                >
                    {
                        isPending ? (
                            <span className="whiteListLoader"></span>
                        ) : (
                            !interested ? (
                                <>
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
                                </>
                            ) : (
                                <>
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
                                </>
                            )
                        )
                    }
                </button>
            </div>
        </div>
    );
}