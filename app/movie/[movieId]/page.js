import MovieDetailsPage from "@/components/movieDetails/MovieDetailsPage";
import { getMovieById } from "@/utils/getMovie";

export async function generateMetadata(params) {
  const movieInfo = await getMovieById( params?.params?.movieId );
  // console.log( movieInfo?.movieDataById );
  return {
    title: movieInfo?.movieDataById?.original_title,
    description: movieInfo?.movieDataById?.original_title,
    openGraph: {
      images:
      {
        url: `https://movie-db-eight-sable.vercel.app/api/og?title=${encodeURIComponent(
          movieInfo?.movieDataById?.original_title
        )}&description=${encodeURIComponent( movieInfo?.movieDataById?.original_title )}&cover=${encodeURIComponent( movieInfo?.movieDataById?.poster_path  )}`,
        width: 1200,
        height: 600,
      }
    }
  };
};

export default async function MoviePage (params)
{
  // console.log(params)
  return (
    <>
      <MovieDetailsPage id={ params?.params?.movieId } userId={ params?.searchParams?.userId } />
    </>
  );
}
