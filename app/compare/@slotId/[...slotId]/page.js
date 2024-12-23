'use client';

import Slot from "@/components/compare/Slot";
import { useState } from "react";

export default function SlotPage({ params }) {
    const [slotsData, setSlotsData] = useState(
        params?.slotId?.map((slotId) => ({ slotId, movie: null })) || []
    );

    const handleUpdateSlot = (slotId, movie) => {
        setSlotsData((prev) =>
            prev.map((slot) =>
                slot.slotId === slotId ? { ...slot, movie } : slot
            )
        );
    };

    return (
        <div className="grid gap-6 md:grid-cols-2">
            {slotsData.map(({ slotId, movie }) => (
                <Slot
                    key={slotId}
                    id={slotId}
                    slots={params?.slotId}
                    movie={movie}
                    onUpdateSlot={handleUpdateSlot}
                />
            ))}
        </div>
    );
}