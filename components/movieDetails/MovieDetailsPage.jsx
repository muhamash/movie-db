import MovieDetails from "./MovieDetails";
import YouLike from "./YouLike";

export default async function MovieDetailsPage ( { id } )
{
    return (
        <>
            <MovieDetails id={ id } />
            <YouLike/>
        </>
    );
}
