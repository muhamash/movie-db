'use client'

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
        <>
            {Object.keys(slotsData).map((slotId) => (
                <Slot
                    slots={params?.slotId}
                    key={slotId}
                    id={slotId}
                    movie={slotsData[slotId]}
                    onUpdateSlot={handleUpdateSlot}
                />
            ))}
        </>
    );
}