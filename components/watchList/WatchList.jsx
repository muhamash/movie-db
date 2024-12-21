import { getMovieById } from '@/utils/getMovie';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import NoList from './NoList';
// import Template from './Template';

const Template = dynamic( () => import( './Template' ) );

export default async function WatchList({ id }) {
    let data = null;
    let movieData = [];

    try {
        const response = await fetch(`http://localhost:3000/api/whiteList?userId=${id}`, {
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(`not found! status: ${response.status}`);
        }

        data = await response.json();

        if (data?.data?.length > 0) {
            const moviePromises = data.data.map(movieId => getMovieById(movieId));
            movieData = await Promise.all(moviePromises);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    // console.log(movieData);
    // console.log(data);

    return (
        <div className="container mx-auto pt-24 pb-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold text-white">Watch Later</h1>
                <p className="text-light/70 mt-2 font-lato">
                    Movies you&#39;ve saved to watch in the future
                </p>
            </header>

            <Suspense fallback={ <div className="animate-pulse w-full h-[288px] bg-zinc-800 rounded-lg" /> }>
                <div id="watchLaterList" className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    { movieData.length > 0 && movieData.map( ( movie, index ) => (
                        <Template key={ index } movie={ movie.movieDataById } />
                    ) ) }
                </div>
            </Suspense>
            {
                movieData.length === 0 && ( <div className="w-full flex items-center justify-center">
                    <NoList />
                </div> )
            }
        </div>
    );
}