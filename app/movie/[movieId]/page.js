import MovieDetailsPage from "@/components/movieDetails/MovieDetailsPage";

export default async function MoviePage (params)
{
  // console.log(params)
  return (
    <div className="relative">
      <MovieDetailsPage id={ params?.params?.movieId } userId={ params?.searchParams?.userId } />
    </div>
  );
}
