'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ComparePage() {
  const [slots, setSlots] = useState([]);
  const router = useRouter();

  const addSlot = () => {
    const slotId = `slotId=${Date.now()}`;
  
    const updatedSlots = [ ...slots, slotId ]; 
    const newUrl = `/compare/slots?${updatedSlots.join('&')}`;
e
    router.push(newUrl);
    setSlots(updatedSlots);
  };

  return (
    <div className="pt-[100px] font-lato">
      <h1>Main Page</h1>
      <button onClick={addSlot}>Add Slot</button>
    </div>
  );
}