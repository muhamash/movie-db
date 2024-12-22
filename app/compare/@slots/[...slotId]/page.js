export default async function SlotPage({ searchParams }) {
    const slotIds = Array.isArray(searchParams?.slotId) 
        ? searchParams?.slotId
        : searchParams?.slotId 
        ? [searchParams?.slotId] 
        : [];

    console.log(searchParams)
    return (
        <div className="bg-red-500 text-lato m-3 p-3 flex flex-col gap-5">
            <p>slots</p>
            <div className="flex flex-wrap gap-5">
                {
                    slotIds.map(slot => (
                        <p key={slot}>
                            id : {slot}
                        </p>
                    ))
                }
            </div>
        </div>
    );
}
