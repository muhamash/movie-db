import Slot from "@/components/compare/Slot";

export default async function SlotPage({ params }) {
    const { slotId } = params;
    console.log( params )
    
    return (
        <>
            {
                params?.slotId?.map( ( slot ) => (
                    <Slot key={slot} id={slot} slots={params.slotId}/>
                ))
            }
        </>
    );
};