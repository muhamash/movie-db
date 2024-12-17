import Hero from "./home/Hero";
import MoviesContainer from "./home/MoviesContainer";

export default async function HomePage ()
{  
    return (
        <div className="container mx-auto px-4 py-8">
            <Hero />
            <div className="mb-8">
                <MoviesContainer isTrend={true} id="upcoming" heading="Trending Now" />
            </div>
            <div className="mb-8">
                <MoviesContainer
                    isTrend={false}
                    id="popular"
                    heading="Popular on MOVIE DB"
                />
            </div>
            <div className="mb-8">
                <MoviesContainer isTrend={false} id="top_rated" heading="Top Rated" />
            </div>
        </div>
    );
}