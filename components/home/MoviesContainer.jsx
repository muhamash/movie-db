import InfiniteScrollMovies from '../InfinitySCrolling';

export default async function MoviesContainer ( { id, heading, isTrend, data } )
{
    return (
        <div id={id} className="flex flex-col space-x-4 overflow-x-auto pb-4">
            <h2 className="text-2xl font-bold font-dancingScript mb-4">{ heading }</h2>
            <InfiniteScrollMovies data={ data } />
        </div>
    );
}
