import { getMovieList } from "@/utils/getMovie";
// import InfiniteScrollWrapper from "../InfinitySCrolling";
import dynamic from "next/dynamic";
import { Suspense } from "react";
// import MovieCard from "./MovieCard";

const InfiniteScrollWrapper = dynamic( () => import( '../InfinitySCrolling' ) );

export default async function MoviesContainer ( { id, heading, isTrend } )
{
    const { data, error } = await getMovieList( 1, id );
    
    return (
        <Suspense fallback={ <div className="animate-pulse w-full h-[288px] bg-zinc-800 rounded-lg" /> }>
            <div id={ id } className="flex flex-col space-x-4 overflow-x-auto pb-4">
                <h2 className="text-2xl font-bold font-dancingScript mb-4">{ heading }</h2>
                <InfiniteScrollWrapper
                    initialData={ data }
                    type={ id }
                    isTrend={ isTrend }
                />
            </div>
        </Suspense>
    );
}