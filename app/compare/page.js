"use client";

import Link from "next/link";

export default function ComparePage() {
  return (
    <div className="flex justify-between items-center my-8">
      <h1 className="text-3xl font-bold mb-4">Compare Movies</h1>

      <div className="mb-6">
        <Link
          href={`?slotId=slot-${Date.now()}`}
          className="bg-red-600 px-6 py-2 rounded hover:bg-red-700 transition-colors font-lato"
        >
          Add Movie +
        </Link>
      </div>
    </div>
  );
}