'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ComparePage() {
  const [slots, setSlots] = useState([]);
  const router = useRouter();

  const addSlot = () => {
    // Generate a unique slotId based on the current time
    const slotId = `slotId=${Date.now()}`;
    
    // Add the new slotId to the slots array
    const updatedSlots = [...slots, slotId];

    // Build the new URL with the updated slotIds as query params
    // Ensure it's relative and doesn't repeat the "compare" path
    const newUrl = `/compare/slots?${updatedSlots.join('&')}`;

    // Update the URL without reloading the page
    router.push(newUrl);
    setSlots(updatedSlots); // Update state with the new slots
  };

  return (
    <div className="pt-[100px] font-lato">
      <h1>Main Page</h1>
      <button onClick={addSlot}>Add Slot</button>
    </div>
  );
}