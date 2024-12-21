'use server';

export async function handleMovieClick( movieId, auth ) {
  return `/movie/${movieId}?userId=${auth?.id === undefined ? 'notLoggedIn' : auth?.id}`;
};

export async function handleWatchListClick ( userId )
{ 
  if (userId) {
    return `/watchList/${userId}`;
  }

  else {
    return `/login`;
  }
};

