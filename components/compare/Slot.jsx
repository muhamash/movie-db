import RemoveMovie from "./RemoveMovie";

export default async function Slot ( { id, slots } )
{
    return (
        <div className="bg-zinc-900 font-lato rounded-lg p-4 flex flex-col min-h-[400px]">
            <RemoveMovie id={id} slots={slots}/>
            <div className="flex-grow flex flex-col items-center justify-center">
                <p>{ id }</p>
                <button
                    // href="./search.html"
                    className="bg-zinc-800 text-white px-6 py-3 rounded hover:bg-zinc-700 transition-colors cursor-pointer"
                >
                    Select Movie
                </button>
            </div>
        </div>
    );
}
