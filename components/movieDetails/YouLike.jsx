import MovieCard from "../home/MovieCard";

export default async function YouLike() {
    return (
        <div className='container mx-auto px-4 py-8'>
            <h2 className="text-2xl font-bold mb-4">More Like This</h2>
            <div className="flex relative">
                <div
                    className="flex w-48 h-[288px] rounded-lg cursor-pointer hover:scale-105 transition-transform"
                >
                    <div className="w-48 h-[288px] rounded-lg bg-zinc-800 relative">
                        <div
                            className="absolute inset-0 w-full h-full rounded-lg overflow-hidden"
                        >
                            <div
                                className="animate-pulse w-full h-full bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 bg-[length:200%_100%] animate-[shimmer_.5s_infinite]"
                            ></div>
                        </div>
                    </div>
                </div>
          
                <MovieCard isTrend={ false } />
            </div>
        </div>
    );
}
