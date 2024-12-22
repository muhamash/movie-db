export default function SearchModal({onClose}) {
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
        >
            <div className="bg-zinc-900 p-6 rounded-lg w-full max-w-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Search Movie</h2>
                    <button onClick={()=> onClose()} className="text-gray-400 hover:text-white">✕</button>
                </div>
                <input
                    type="text"
                    placeholder="Type movie name..."
                    className="w-full bg-zinc-800 text-white px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
                <div className="max-h-96 overflow-y-auto">
                        cvsdv
                </div>
            </div>
        </div>
    );
}
