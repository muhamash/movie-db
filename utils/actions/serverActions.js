'use server';

export async function handleMovieClick( movieId, auth ) {
  // return `/movie/${movieId}?userId=${auth?.id === undefined ? 'notLoggedIn' : auth?.id}`;

  return `https://movie-db-eight-sable.vercel.app/movie/${movieId}?userId=${auth?.id === undefined ? 'notLoggedIn' : auth?.id}`;
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