'use client';

import { useRouter } from 'next/navigation';

export default function RemoveMovie({ id,  onRemoveSlot }) {
    const router = useRouter();

    const removeSlot = (slotIdToRemove) => {
        onRemoveSlot(slotIdToRemove);
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