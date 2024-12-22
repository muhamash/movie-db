'use client';

import { usePathname, useRouter } from 'next/navigation';

export default function AddMovie() {
  const router = useRouter();
  const pathname = usePathname();

  const addSlot = () => {
    const newSlotId = `${Date.now()}`;

    if (pathname.startsWith('/compare')) {
      router.push(`${pathname}/${newSlotId}`);
    } else {
      router.push(`/compare/${newSlotId}`);
    }
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