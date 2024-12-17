"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function ComparePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slotIds = searchParams.getAll("slotId");

  const addNewSlot = () => {
    const newSlotId = `slot-${Date.now()}`;
    const params = new URLSearchParams(searchParams);
    params.append("slotId", newSlotId);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="container mx-auto my-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Compare Movies</h1>
        <button
          onClick={addNewSlot}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
        >
          Add Movie +
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {slotIds.length === 0 ? (
          <p className="text-white text-center font-lato">No Movie Slots Added Yet</p>
        ) : (
          slotIds.map((id) => (
            <Link
              key={id}
              href={`?${searchParams.toString()}`}
              className="bg-zinc-800 rounded-lg p-6 text-white text-center"
            >
              {id}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}