'use client';

import Slot from "@/components/compare/Slot";
import { useState } from "react";

export default function SlotPage({ params }) {
    const [slotsData, setSlotsData] = useState(
        params?.slotId?.reduce((acc, slotId) => ({ ...acc, [slotId]: null }), {})
    );

    const handleUpdateSlot = (slotId, movie) => {
        setSlotsData((prev) => ({
            ...prev,
            [slotId]: movie,
        }));
    };

    return (
        <div className="grid gap-4">
            {Object.keys(slotsData).map((slotId) => (
                <Slot
                    key={slotId}
                    id={slotId}
                    slots={params?.slotId}
                    movie={slotsData[slotId]}
                    onUpdateSlot={handleUpdateSlot}
                />
            ))}
        </div>
    );
}