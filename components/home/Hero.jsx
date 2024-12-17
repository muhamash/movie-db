import { getNowPlayingMovie } from "@/utils/getMovie";

export default async function Hero() {
    const { data, error } = await getNowPlayingMovie();

    // Handle errors
    if (error) {
        return (
            <div className="text-center text-red-500 mt-12">
                <p>There was an error fetching the movie data. Please try again later.</p>
            </div>
        );
    }

    // Check if data exists and has results
    const movie = data?.results?.[1];

    if (!movie) {
        return (
            <div className="text-center text-red-500 mt-12">
                <p>No movie data available.</p>
            </div>
        );
    }

    return (
        <div
            id="hero"
            className="relative h-screen"
            style={{
                backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`,
                backgroundSize: "cover",
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-t from-black"></div>
            <div className="absolute bottom-0 left-0 p-12">
                <h1 id="heroTitle" className="text-5xl font-bold mb-4">
                    {movie.title}
                </h1>
                <p id="heroOverview" className="text-lg font-nunito max-w-2xl mb-4">
                    {movie.overview}
                </p>
                <button className="bg-white font-lato text-black px-8 py-2 rounded-lg font-bold hover:bg-opacity-80">
                    ▶ Play
                </button>
            </div>
        </div>
    );
};