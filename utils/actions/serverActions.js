'use server';

export async function handleMovieClick(movieId, auth) {
    try 
    {
      if ( !movieId ) throw new Error( "Movie ID is required." );
      const userId = auth?.id ?? 'notLoggedIn';
      const redirectUrl = `https://movie-db-eight-sable.vercel.app/movie/${movieId}?userId=${userId}`;
      
      return redirectUrl;
      
    } catch (error) {
        console.error("Error in handleMovieClick:", error);
        // return `/error?message=${encodeURIComponent("Failed to redirect to the movie page.")}`;
    }
};

export async function handleWatchListClick ( userId )
{ 
  if (userId) {
    // return `/watchList/${userId}`;
    return `https://movie-db-eight-sable.vercel.app/watchList/${userId}`;
  }
  else {
    // return `/login`;
    return `https://movie-db-eight-sable.vercel.app/login`;
  }
};