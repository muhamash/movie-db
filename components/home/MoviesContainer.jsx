import { getMovieList } from "@/utils/getMovie";
import InfiniteScrollWrapper from "../InfinitySCrolling";
import MovieCard from "./MovieCard";

export default async function MoviesContainer ( { id, heading, isTrend } )
{
    
    const { data, error } = await getMovieList( 1, id );
    
    return (
        <div id={ id } className="flex flex-col space-x-4 overflow-x-auto pb-4">
            <h2 className="text-2xl font-bold font-dancingScript mb-4">{ heading }</h2>
            <InfiniteScrollWrapper
                MovieCard={ MovieCard }
                initialData={ data }
                type={ id }
                isTrend={ isTrend }
            />
        </div>
    );
}