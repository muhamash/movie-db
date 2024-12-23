'use server';

export async function handleMovieClick(movieId, auth) {
    try 
    {
      if ( !movieId ) throw new Error( "Movie ID is required." );
      const userId = auth?.id ?? 'notLoggedIn';
      const redirectUrl = `${process.env.NEXT_PUBLIC_URL}/movie/${movieId}?userId=${userId}`;
      
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
    return `${process.env.NEXT_PUBLIC_URL}/watchList/${userId}`;
  }
  else {
    // return `/login`;
    return `${process.env.NEXT_PUBLIC_URL}/login`;
  }
};