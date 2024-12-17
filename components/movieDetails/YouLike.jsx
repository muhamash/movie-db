import MovieCard from "../home/MovieCard";

export default async function YouLike ( { data } )
{
    const simData = await data;
    
    return (
        <div className='container mx-auto px-4 py-8'>
            <h2 className="text-2xl font-bold mb-4">More Like This</h2>
            <div className="flex relative flex-nowrap space-x-4 overflow-x-auto pb-4">
                {
                    simData?.simMovie?.results?.map( ( data ) => (
                        <MovieCard key={data?.id} movie={data} isTrend={true}/>
                    ))
                }
            </div>
        </div>
    );
}
