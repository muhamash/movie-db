import { getCast, getMovieById, getMovieList } from "@/utils/getMovie";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import MovieDetails from "./MovieDetails";
import YouLike from "./YouLike";

export default async function MovieDetailsPage ( { id, userId } )
{    
    const  movieDataById  = getMovieById( id );
    const simMoviePromise = getMovieList( 1, "similar", id );
    const castPromise = getCast( id );

    const movieData = await movieDataById;
    
    if( movieData === undefined || movieData.error  || !movieData?.movieDataById )  {
        return notFound();
    }
    // console.log(simMoviePromise.data)
    return (
        <>
            <MovieDetails castData={ castPromise } movieData={ movieData?.movieDataById } userId={userId} movieId={id} />
            <Suspense fallback={
                <div
                    className="flex relative w-48 h-[288px] rounded-lg cursor-pointer hover:scale-105 transition-transform"
                >
                    <div className="w-48 h-[288px] rounded-lg bg-zinc-800 relative">
                        <div
                            className="absolute inset-0 w-full h-full rounded-lg overflow-hidden"
                        >
                            <div
                                className="animate-pulse w-full h-full bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 bg-[length:200%_100%] animate-[shimmer_.5s_infinite]"
                            >
                                
                            </div>
                        </div>
                    </div>
                </div>
            }>
                <YouLike movieId={id} data={ simMoviePromise } />
            </Suspense>
        </>
    );
}
