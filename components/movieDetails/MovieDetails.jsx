import Image from "next/image";

export default async function MovieDetails ( { movieData, castData } )
{
    const cast = await castData;
        // console.log( cast?.castData?.cast );
    return (
        <div id="movieDetails" className="min-h-screen pt-20 mb-8">
            {/* Background Image */ }
            <div className="relative h-screen">
                <div className="absolute inset-0">
                    <Image
                        src={ `https://image.tmdb.org/t/p/original${movieData?.backdrop_path}` }
                        alt="Smile 2 Background"
                        className="w-full h-full object-cover"
                        fill
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70"></div>
                </div>

                {/* Content */ }
                <div className=" container md:relative mx-auto px-4 pt-32">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Movie Poster */ }
                        <div className=" md:w-1/3 relative hover:scale-110 duration-200 transition-all hover:border-[0.5px] border-green-700 rounded-md cursor-pointer hover:shadow-md hover:shadow-slate-500">
                            <Image
                                width={ 400 }
                                height={ 300 }
                                src={ `https://image.tmdb.org/t/p/original${movieData?.poster_path}` }
                                alt="Smile 2 Poster"
                                className="w-full rounded-lg shadow-lg"
                            />
                        </div>

                        {/* Movie Details */ }
                        <div className="md:w-2/3 w-full relative">
                            <h1 className="text-4xl font-bold mb-4 font-dancingScript">{ movieData?.original_title }</h1>

                            {/* Metadata */ }
                            <div className="flex items-center mb-4 space-x-4 font-nunito">
                                <span className="text-green-500 font-nunito">{ new Date( movieData?.release_date ).toLocaleDateString( "en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric"
                                } ) }</span>
                                <span>|</span>
                                <span>{ movieData?.runtime } min</span>
                            </div>

                            {/* Synopsis */ }
                            <p className="text-lg mb-6 font-lato">
                                {movieData?.overview}
                            </p>

                            {/* Genres */ }
                            <div className="mb-6">
                                <h3 className="text-gray-400 mb-2 ">Genres</h3>
                                <div className="flex flex-wrap gap-2 font-manrope">
                                    {
                                        movieData?.genres?.map( g => (
                                            <span key={ g?.id } className="px-3 py-1 bg-gray-800 rounded-full text-sm">{ g?.name }</span>
                                        ))
                                    }
                                </div>
                            </div>

                            {/* Cast */ }
                            <div className="mb-6 w-full">
                                <h3 className="text-gray-400 mb-2">Cast</h3>
                                <div className="flex flex-wrap gap-4 font-nunito h-[300px] overflow-y-scroll">
                                    { cast?.castData?.cast.map( ( cst, index ) => (
                                        <div key={ index } className="text-center">
                                            <Image
                                                width={ 400 }
                                                height={ 300 }
                                                src={ `https://image.tmdb.org/t/p/original${cst.profile_path}` }
                                                alt={ `${cast.name}` }
                                                className="w-24 h-24 rounded-full object-cover mb-2"
                                            />
                                            <p className="text-sm">{ cst?.name }</p>
                                        </div>
                                    ) ) }
                                </div>
                            </div>

                            {/* Actions */ }
                            <div className="mb-6 font-manrope">
                                <div className="flex flex-wrap gap-4">
                                    <button className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                                            <path d="M17 21H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
                                            <path d="M12 11v6" />
                                            <path d="M9 14h6" />
                                        </svg>
                                        Add to Watch List
                                    </button>
                                    <button className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg text-green-600">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path d="M7 12l5 5L22 7" />
                                            <path d="M2 12l5 5 5-5-5-5" />
                                        </svg>
                                        Added to Watch List
                                    </button>
                                </div>
                            </div>

                            {/* Share Buttons */ }
                            <div className="mb-6">
                                <h3 className="text-gray-400 mb-2">Share on social media</h3>
                                <div className="flex gap-4 font-manrope">
                                    { [
                                        { name: "Facebook", img: "http://facebook.com/favicon.ico" },
                                        { name: "X", img: "http://x.com/favicon.ico" },
                                        { name: "LinkedIn", img: "http://linkedin.com/favicon.ico" },
                                    ].map( ( platform, index ) => (
                                        <button key={ index } className="text-center cursor-pointer">
                                            <Image
                                                width={ 400 }
                                                height={ 300 }
                                                src={ platform.img }
                                                alt={ platform.name }
                                                className="w-8 h-8 rounded-full object-cover mb-2 mx-auto"
                                            />
                                            <p className="text-sm">{ platform.name }</p>
                                        </button>
                                    ) ) }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}