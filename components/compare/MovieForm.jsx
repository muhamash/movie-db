import Image from "next/image";

export default function MovieForm({ movie }) {
    return (
        <div className="grid grid-cols-5 gap-8">
            <div className="col-span-2 h-full">
                <Image
                    width={ 220 }
                    height={400}
                    src={
                movie?.poster_path
                  ? `https://image.tmdb.org/t/p/original${movie?.poster_path}`
                  : '/assets/icons/commingSoon.svg'
              }
                    alt={ movie?.original_title }
                    className="w-full rounded-lg mb-4 object-contain max-h-full"
                />
                <h2 className="text-xl font-bold mb-2 text-center">{ movie?.original_title }</h2>
            </div>
            <div className="w-full space-y-4 col-span-3">
                <div className="bg-zinc-800 p-3 rounded">
                    <span className="text-gray-400">Rating:</span>
                    <span className="float-right">{ movie?.vote_average }</span>
                </div>
                <div className="bg-zinc-800 p-3 rounded">
                    <span className="text-gray-400">Release Date:</span>
                    <span className="float-right">{ movie?.release_date }</span>
                </div>
                <div className="bg-zinc-800 p-3 rounded">
                    <span className="text-gray-400">Runtime:</span>
                    <span className="float-right">{ movie?.runtime }</span>
                </div>
                <div className="bg-zinc-800 p-3 rounded">
                    <span className="text-gray-400">Budget:</span>
                    <span className="float-right">{ movie?.budget }</span>
                </div>
                <div className="bg-zinc-800 p-3 rounded">
                    <span className="text-gray-400">Revenue:</span>
                    <span className="float-right">{ movie?.revenue }</span>
                </div>
                <div className="bg-zinc-800 p-3 rounded">
                    <span className="text-gray-400">Genres:</span>
                    <div className="mt-2 flex flex-wrap gap-2">
                        { movie?.genres?.length > 0 ? (
                            movie?.genres?.map( ( genre, index ) => (
                                <span key={ index } className="bg-zinc-700 px-2 py-1 rounded-full text-sm">
                                    { genre }
                                </span>
                            ) )
                        ) : (
                            <span className="text-gray-400">N/A</span>
                        ) }
                    </div>
                </div>
            </div>
        </div>
    );
}