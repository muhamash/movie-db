export default async function page() {
    return (
        <div className="flex w-[90%] mx-auto flex-col items-center justify-center gap-5 text-2xl font-semibold text-violet-500 text-center">
            <div className="notFoundLoader"></div>
            <p>There is no Slot!!</p>
            <p>If you wanted any slot please click on <span className="font-lato text-bold text-lg text-red-700">Add movie +</span> button</p>
        </div>
    );
}
