import MovieDetailsPage from "@/components/movieDetails/MovieDetailsPage";

export default async function MoviePage ({params})
{
  return (
    <div className="relative">
      <MovieDetailsPage id={ params.movieId } userId={ params.userId} /> 
    </div>
  )
}
