import { addWhiteList } from "@/utils/actions/whiteListAction";
import { getMovieById } from "@/utils/getMovie";
import { Suspense } from "react";
import NoList from "./NoList";
import Template from "./Template";

export default async function WatchList({ id }) {
  let data = null;
  let movieData = [];

    try 
    {
        const response = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/whiteList?userId=${id}`, {
            cache: "no-store",
        } );

        if (!response.success) {
            throw new Error(`Error fetching data: ${response.message}`);
        };

        data = await response.json();

        if (data?.data?.length > 0) {
            const moviePromises = data.data.map((movieId) => getMovieById(movieId));
            movieData = await Promise.all(moviePromises);
        }
    }
     
    catch ( error )
    {
        console.error("Error fetching watch list:", error);
    };

    async function handleRemove ( data ) 
    {
        const movieId = data.get( "movieId" );
        console.log( movieId );

        try 
        {
            await addWhiteList(id, movieId);
            movieData = movieData.filter(movie => movie?.id !== movieId);
        }
        
        catch ( error )
        {
            console.error( "Error removing movie:", error );
        };
    };

    return (
        <div className="container mx-auto pt-24 pb-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold text-white">Watch Later</h1>
                <p className="text-light/70 mt-2 font-lato">
                    Movies you&#39;ve saved to watch in the future
                </p>
            </header>

            <div id="watchLaterList" className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                { movieData.length > 0 ? (
                    movieData.map( ( movie, index ) => (
                        <Suspense key={ index } fallback={
                            <p>
                                loading....
                            </p>
                        }>
                            <Template movie={ movie?.movieDataById } userId={ id } onRemove={ handleRemove } />
                        </Suspense>
                    ) )
                ) : (
                    <div className="w-[95%] h-full mx-auto flex items-center justify-center">
                        <NoList />
                    </div>
                ) }
            </div>
        </div>
    );
};