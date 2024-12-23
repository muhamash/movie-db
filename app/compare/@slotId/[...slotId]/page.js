'use client';

import Slot from "@/components/compare/Slot";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";

export default function SlotPage ( { params } )
{
    
  // Initialize slotsData from cookies or params
    const [ slotsData, setSlotsData ] = useState( () =>
    {
        const storedSlotsData = Cookies.get( 'slotsData' );
        if ( storedSlotsData )
        {
            try
            {
                return JSON.parse( storedSlotsData );
            } catch ( e )
            {
                console.error( 'Error parsing cookies data:', e );
            }
        }

        return params?.slotId?.map( ( slotId ) => ( { slotId, movieId: null } ) ) || [];
    } );

  // Merge new slots with existing slots, preserving movieId values
  useEffect(() => {
    if (params?.slotId) {
      setSlotsData((prevSlotsData) => {
        const newSlots = params.slotId.map((slotId) => {
          const existingSlot = prevSlotsData.find(slot => slot.slotId === slotId);
          return existingSlot ? existingSlot : { slotId, movieId: null };
        });
        return newSlots;
      });
    }
  }, [params]);

  // Update cookies whenever slotsData changes
    useEffect( () =>
    {
        if ( slotsData.length > 0 )
        {
            Cookies.set( 'slotsData', JSON.stringify( slotsData ), { expires: 1 } );
        }
    }, [ slotsData ] );

  const handleUpdateSlot = (slotId, movieId) => {
    setSlotsData((prev) =>
      prev.map((slot) =>
        slot.slotId === slotId ? { ...slot, movieId } : slot
      )
    );
  };

    const removeSlot = ( slotIdToRemove ) =>
    {
        const updatedSlots = slotsData.filter( ( slot ) => slot.slotId !== slotIdToRemove );
        setSlotsData( updatedSlots );

        const newUrl = updatedSlots.length > 0
            ? `/compare/${updatedSlots.map( slot => slot.slotId ).join( '/' )}`
            : '/compare';

        window.history.replaceState( null, '', newUrl );
    };

    // console.log( 'slotsData:', slotsData );
    // console.log( 'params:', params );

    return (
        <div className="grid gap-6 md:grid-cols-2">
            { slotsData?.map( ( { slotId, movieId } ) => (
                <Slot
                    key={ slotId }
                    id={ slotId }
                    slots={ slotsData }
                    movieId={ movieId }
                    onUpdateSlot={ handleUpdateSlot }
                    onRemoveSlot={ removeSlot }
                />
            ) ) }
            { slotsData.length === 0 && (
                <p className="text-center">No slots remaining!!</p>
            ) }
        </div>
    );
}