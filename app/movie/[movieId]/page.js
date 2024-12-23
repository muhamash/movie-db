import MovieDetailsPage from "@/components/movieDetails/MovieDetailsPage";
import { getMovieById } from "@/utils/getMovie";
import { Suspense } from "react";

export async function generateMetadata(params) {
  const movieInfo = await getMovieById( params?.params?.movieId );
  // console.log( movieInfo?.movieDataById.overview );
  
  return {
    title: movieInfo?.movieDataById?.original_title,
    description: movieInfo?.movieDataById?.overview,
    openGraph: {
      images:
      {
        url : `${process.env.NEXT_PUBLIC_API_URL}/og?title=${encodeURIComponent(
          movieInfo?.movieDataById?.original_title
        )}&description=${encodeURIComponent( movieInfo?.movieDataById?.overview )}&cover=${encodeURIComponent( `https://image.tmdb.org/t/p/original${movieInfo?.movieDataById?.poster_path}` )}`,
        width: 1200,
        height: 600,
      }
    }
  };
};

export default async function MoviePage (params)
{
  return (
    <Suspense fallback={
      <p>
        loading
      </p>
    }>
      <MovieDetailsPage id={ params?.params?.movieId } userId={ params?.searchParams?.userId } />
    </Suspense>
  );
}
