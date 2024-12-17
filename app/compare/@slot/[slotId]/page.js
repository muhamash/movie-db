"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function DynamicSlotPage({ params }) {
  const { slotId } = params;
  const router = useRouter();
  const searchParams = useSearchParams();

  // Remove slotId and update the URL
  const handleClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("slotId", slotId);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="bg-zinc-900 rounded-lg p-4 flex flex-col min-h-[400px]">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleClose}
          className="text-gray-400 hover:text-white transition"
        >
          ✕x
        </button>
      </div>
      <div className="flex-grow flex flex-col items-center justify-center">
        <p className="text-white mb-4">Dynamic Slot: {slotId}</p>
        <button className="bg-zinc-800 text-white px-6 py-3 rounded hover:bg-zinc-700 transition">
          Select Movie
        </button>
      </div>
    </div>
  );
}