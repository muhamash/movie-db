import Image from "next/image";

export default async function Template ( { movie, userId, onRemove } )
{
    
    return (
        <div className="bg-moviedb-black rounded-lg overflow-hidden shadow-lg group cursor-pointer relative">
            <Image
                width={ 300 }
                height={ 400 }
                src={ `https://image.tmdb.org/t/p/original${movie?.poster_path}` }
                alt={ movie?.original_title || "Movie Poster" }
                className="w-full h-[450px] object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h2 className="text-xl font-bold text-light mb-2">{ movie?.original_title }</h2>
                <div className="flex justify-between items-center">
                    <span className="text-primary font-nunito">
                        { new Date( movie?.release_date ).getFullYear() }
                    </span>
                    <form action={ onRemove }>
                        <input type="hidden" name="movieId" value={ movie?.id } />
                        <button
                            type="submit"
                            className="bg-moviedb-red text-light px-3 py-1 rounded-full hover:bg-moviedb-red/80 transition font-lato hover:scale-105"
                        >
                            Remove
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};