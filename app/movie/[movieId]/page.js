import MovieDetailsPage from "@/components/movieDetails/MovieDetailsPage";

export default async function MoviePage (params)
{
  // console.log(params)
  return (
    <>
      <MovieDetailsPage id={ params?.params?.movieId } userId={ params?.searchParams?.userId } />
    </>
  );
}
