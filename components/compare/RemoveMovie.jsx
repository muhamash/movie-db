'use client';

import { useRouter } from 'next/navigation';

export default function RemoveMovie({ id, slots }) {
  const router = useRouter();

    const removeSlot = ( slotIdToRemove ) =>
    {
        const updatedSlots = slots.filter( ( slotId ) => slotId !== slotIdToRemove );

        const newUrl = updatedSlots.length > 0
            ? `/compare/${updatedSlots.join( '/' )}`
            : '/compare';
        router.push( newUrl );
    };

  return (
    <div className="flex justify-end mb-4">
      <button
        onClick={() => removeSlot(id)}
        className="text-gray-400 hover:text-white"
      >
        ✕
      </button>
    </div>
  );
}