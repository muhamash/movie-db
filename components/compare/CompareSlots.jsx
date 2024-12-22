"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function CompareSlots() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [slotIds, setSlotIds] = useState(() => searchParams.getAll("slotId"));

  useEffect(() => {
    setSlotIds(searchParams.getAll("slotId"));
  }, [searchParams]);

  const addNewSlot = () => {
    const newSlotId = `slot-${Date.now()}`;
    const params = new URLSearchParams(searchParams);
    params.append("slotId", newSlotId);
    router.push(`?${params.toString()}`);
  };

  const removeSlot = (slotIdToRemove) => {
    const params = new URLSearchParams(searchParams);
    params.delete("slotId", slotIdToRemove);
    router.push(`?${params.toString()}`);
  };

    return (
        <div className="container mx-auto pt-[100px] px-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Compare Movies</h1>
                <button
                    onClick={ addNewSlot }
                    className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition font-lato"
                >
                    Add Movie +
                </button>
            </div>
            <Suspense fallback={ <p>loading...</p> }>
                <div className="grid gap-6 md:grid-cols-2">
                    { slotIds.length === 0 ? (
                        <p className="text-white text-center font-lato">No Movie Slots Added Yet!</p>
                    ) : (
                        slotIds.map( ( id ) => (
                            <div key={ id } className="bg-zinc-900 rounded-lg p-4 flex flex-col min-h-[400px]">
                                <div className="flex justify-end mb-4">
                                    <button
                                        onClick={ () => removeSlot( id ) }
                                        className="text-gray-400 hover:text-white px-4 py-1 bg-rose-600 rounded-md"
                                    >
                                        ✕
                                    </button>
                                </div>
                                <div className="flex-grow flex flex-col items-center justify-center">
                                    <a
                                        href="./search.html"
                                        className="bg-zinc-800 text-white px-6 py-3 rounded hover:bg-zinc-700 transition-colors font-lato cursor-pointer"
                                    >
                                        Select Movie
                                    </a>
                                </div>
                            </div>
                        ) )
                    ) }
                </div>
            </Suspense>
        </div>
    );
};
