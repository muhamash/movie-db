import dynamic from "next/dynamic";
import { Suspense } from "react";
// import MovieCard from "../home/MovieCard";
// import InfiniteScrollWrapper from "../InfinitySCrolling";

const InfiniteScrollWrapper = dynamic( () => import( '../InfinitySCrolling' ) );

export default async function YouLike ( { data, movieId } )
{
    const simData = await data;
    
    return (
        <Suspense fallback={ <div className="animate-pulse w-full h-[288px] bg-zinc-800 rounded-lg" /> }>
            <div className='container mx-auto px-4 py-8'>
                <h2 className="text-2xl font-bold mb-4">More Like This</h2>
                <div className="flex flex-nowrap space-x-4 overflow-x-auto pb-4">
                    {/* {
                    simData?.simMovie?.results?.map( ( data ) => (
                        <MovieCard key={ data?.id } movie={ data } isTrend={ true } />
                    ) )
                } */}
                    <InfiniteScrollWrapper
                        initialData={ simData?.data }
                        type={ 'similar' }
                        isTrend={ true }
                        movieId={ movieId }
                    />
                </div>
            </div>
        </Suspense>
    );
}
