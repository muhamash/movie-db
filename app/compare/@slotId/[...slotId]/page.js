'use client';

import Slot from "@/components/compare/Slot";
import { useState } from "react";

export default function SlotPage({ params }) {
    const [slotsData, setSlotsData] = useState(
        params?.slotId?.map((slotId) => ({ slotId, movieId: null })) || []
    );

    const handleUpdateSlot = (slotId, movieId) => {
        setSlotsData((prev) =>
            prev?.map((slot) =>
                slot?.slotId === slotId ? { ...slot, movieId } : slot
            )
        );
    };

    console.log( slotsData );
    return (
        <div className="grid gap-6 md:grid-cols-2">
            { slotsData.map( ( { slotId, movieId } ) => (
                <Slot
                    key={ slotId }
                    id={ slotId }
                    slots={ params?.slotId }
                    movieId={ movieId }
                    onUpdateSlot={ handleUpdateSlot }
                />
            ) ) }
        </div>
    );
}