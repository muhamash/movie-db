'use client';

import Slot from "@/components/compare/Slot";
import { useEffect, useState } from "react";

export default function SlotPage({ params }) {
  const [slotsData, setSlotsData] = useState(
    params?.slotId?.map((slotId) => ({ slotId, movieId: null })) || []
  );

  useEffect(() => {
    const handleSlotAdded = (event) => {
      const { newSlotId } = event.detail;
      setSlotsData((prev) => [...prev, { slotId: newSlotId, movieId: null }]);
    };

    window.addEventListener('slotAdded', handleSlotAdded);

    return () => {
      window.removeEventListener('slotAdded', handleSlotAdded);
    };
  }, []);

  const handleUpdateSlot = (slotId, movieId) => {
    setSlotsData((prev) =>
      prev?.map((slot) =>
        slot?.slotId === slotId ? { ...slot, movieId } : slot
      )
    );
  };

  const removeSlot = (slotIdToRemove) => {
    const updatedSlots = slotsData.filter((slot) => slot.slotId !== slotIdToRemove);
    setSlotsData(updatedSlots);

    const newUrl = updatedSlots.length > 0
      ? `/compare/${updatedSlots.map(slot => slot.slotId).join('/')}`
      : '/compare';

    window.history.replaceState(null, '', newUrl);
  };

  console.log(slotsData);
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {slotsData?.map(({ slotId, movieId }) => (
        <Slot
          key={slotId}
          id={slotId}
          slots={slotsData}
          movieId={movieId}
          onUpdateSlot={handleUpdateSlot}
          onRemoveSlot={removeSlot}
        />
      ))}
      {slotsData.length === 0 && (
        <p className="text-center">No slots remaining!!</p>
      )}
    </div>
  );
}