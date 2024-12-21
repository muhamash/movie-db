import { getCast, getMovieById, getMovieList } from "@/utils/getMovie";
import { notFound } from "next/navigation";
import { Suspense } from "react";
// import MovieDetails from "./MovieDetails";
import dynamic from "next/dynamic";
import YouLike from "./YouLike";

const MovieDetails = dynamic( () => import( "./MovieDetails" ) );

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
                <p>loadinggg</p>
            }>
                <YouLike movieId={id} data={ simMoviePromise } />
            </Suspense>
        </>
    );
}
