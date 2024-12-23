'use client';

import { usePathname } from 'next/navigation';

export default function AddMovie() {
  const pathname = usePathname();

  const addSlot = () => {
    const newSlotId = `${Date.now()}`;

    const newUrl = pathname.startsWith('/compare')
      ? `${pathname}/${newSlotId}`
      : `/compare/${newSlotId}`;

    // Update the URL without reloading the page
    window.history.replaceState(null, '', newUrl);

    // Trigger a custom event to notify SlotPage to add the slot
    window.dispatchEvent(new CustomEvent('slotAdded', { detail: { newSlotId } }));
  };

  return (
    <button
      className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors font-lato"
      onClick={addSlot}
    >
      Add Movie +
    </button>
  );
}