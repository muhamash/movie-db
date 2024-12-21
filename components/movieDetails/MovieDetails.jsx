import Image from "next/image";
// import Cast from "./Cast";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import HandleWhiteListServer from "./HandleWhiteListServer";
import ShareButtons from "./ShareButtons";

const Cast = dynamic( () => import( "./Cast" ) );

export default async function MovieDetails ( { movieData, castData, userId, movieId } )
{
    
    // const cast = await castData;
    const title = movieData?.original_title;
    const description = movieData?.overview;
    const image = `https://image.tmdb.org/t/p/original${movieData?.poster_path}`;

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
                <div className="container md:relative mx-auto px-4 pt-32">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Movie Poster */ }
                        <div className="md:w-1/3 relative hover:scale-110 duration-200 transition-all hover:border-[0.5px] border-green-700 rounded-md cursor-pointer hover:shadow-md hover:shadow-slate-500">
                            <Image
                                width={ 400 }
                                height={ 300 }
                                src={ image }
                                alt="Smile 2 Poster"
                                className="w-full rounded-lg shadow-lg"
                            />
                        </div>

                        {/* Movie Details */ }
                        <div className="md:w-2/3 w-full relative">
                            <h1 className="text-4xl font-bold mb-4 font-dancingScript">{ title }</h1>

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
                                { description }
                            </p>
                            {/* Genres */ }
                            <div className="mb-6">
                                <h3 className="text-gray-400 mb-2 ">Genres</h3>
                                <div className="flex flex-wrap gap-2 font-manrope">
                                    { movieData?.genres?.map( g => (
                                        <span key={ g?.id } className="px-3 py-1 bg-gray-800 rounded-full text-sm">{ g?.name }</span>
                                    ) ) }
                                </div>
                            </div>

                            {/* Cast */ }
                            <Suspense fallback={
                                <p>loadinggg</p>
                            }>
                                <Cast cast={ castData } />
                            </Suspense>

                            {/* Actions */ }
                            <HandleWhiteListServer userId={ userId } movieId={ movieId } />

                            {/* Share Buttons */ }
                            <ShareButtons title={ title } description={ description } image={ image } />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};