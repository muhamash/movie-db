'use client';

import { usePathname, useRouter } from 'next/navigation';

export default function AddMovie() {
  const pathname = usePathname();
  const router = useRouter()

  const addSlot = () =>
  {
    const newSlotId = `${Date.now()}`;

    const newUrl = pathname.startsWith( '/compare' )
      ? `${pathname}/${newSlotId}`
      : `/compare/${newSlotId}`;

    // window.history.replaceState( null, '', newUrl );

    // window.dispatchEvent( new CustomEvent( 'slotAdded', { detail: { newSlotId } } ) );
    router.push( newUrl );
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