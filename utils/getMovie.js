export const getNowPlayingMovie = async () =>
{
    const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
    
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzgxODZhMjA2NjY3N2M2NzQwMzFmMWQ2ZGNiMzljNCIsIm5iZiI6MTczNDI5ODA3OS42NzYsInN1YiI6IjY3NWY0OWRmZjc0YzNhMTM4OGJhMjIzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vSW8VAinEvzEMpxcGOGAIZb4Wo70KMlfktbWImpv5LI'
        }
    };

    try
    {
        const res = await fetch( url, options );
        // console.log(res)
        if ( !res.ok )
        {
            throw new Error( `Error: ${res.statusText}` );
        }
        const data = await res.json();
        return { data, error: null };
    } catch ( err )
    {
        console.error( 'Error fetching now playing movies:', err );
        return { data: null, error: err.message || 'An unknown error occurred' };  
    }
};

export const getMovieList = async ( page, types, movieId ) =>
{
    let url = '';

    if ( types === 'trending' )
    {
        url = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${page}`;
    } else if ( types === 'top_rated' )
    {
        url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`;
    } else if ( types === 'popular' )
    {
        url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
    } else if ( types === 'similar' && movieId )
    {
        url = `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=${page}`;
    } else
    {
        throw new Error( 'Invalid movie type' );
    }

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzgxODZhMjA2NjY3N2M2NzQwMzFmMWQ2ZGNiMzljNCIsIm5iZiI6MTczNDI5ODA3OS42NzYsInN1YiI6IjY3NWY0OWRmZjc0YzNhMTM4OGJhMjIzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vSW8VAinEvzEMpxcGOGAIZb4Wo70KMlfktbWImpv5LI',
        },
    };

    try
    {
        const res = await fetch( url, options );

        if ( !res.ok )
        {
            throw new Error( `Error: ${res.statusText}` );
        }

        const data = await res.json();
        // console.log( data, movieId );
        return { data, error: null };
    } catch ( err )
    {
        console.error( 'Error fetching movie list:', err );
        return { data: null, error: err.message || 'An unknown error occurred' };
    }
};

export const getMovieById = async (movieId) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzgxODZhMjA2NjY3N2M2NzQwMzFmMWQ2ZGNiMzljNCIsIm5iZiI6MTczNDI5ODA3OS42NzYsInN1YiI6IjY3NWY0OWRmZjc0YzNhMTM4OGJhMjIzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vSW8VAinEvzEMpxcGOGAIZb4Wo70KMlfktbWImpv5LI',
        },
    };

    try {
        const res = await fetch(url, options);
        if (!res.ok) {
            throw new Error(`Error: ${res.statusText}`);
        }
        const movieDataById = await res.json();
        return { movieDataById, error: null };
    } catch (err) {
        console.error('Error fetching movie data:', err);
        return { data: null, error: err.message || 'An unknown error occurred' };
    }
};

export const getSimMovie = async ( movieId ) =>
{
    const url = `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`;
    // https://api.themoviedb.org/3/movie/11216/similar?language=en-US&page=1
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzgxODZhMjA2NjY3N2M2NzQwMzFmMWQ2ZGNiMzljNCIsIm5iZiI6MTczNDI5ODA3OS42NzYsInN1YiI6IjY3NWY0OWRmZjc0YzNhMTM4OGJhMjIzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vSW8VAinEvzEMpxcGOGAIZb4Wo70KMlfktbWImpv5LI',
        },
    };

    try
    {
        const res = await fetch( url, options );
        // console.log(res)
        if ( !res.ok )
        {
            throw new Error( `Error: ${res.statusText}` );
        }
        const simMovie = await res.json();
        // console.log(simMovie)
        return { simMovie, error: null };
    } catch ( err )
    {
        console.error( 'Error fetching popular movies:', err );
        return { data: null, error: err.message || 'An unknown error occurred' };
    }
};

export const getCast = async (movieId) =>
{
    const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzgxODZhMjA2NjY3N2M2NzQwMzFmMWQ2ZGNiMzljNCIsIm5iZiI6MTczNDI5ODA3OS42NzYsInN1YiI6IjY3NWY0OWRmZjc0YzNhMTM4OGJhMjIzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vSW8VAinEvzEMpxcGOGAIZb4Wo70KMlfktbWImpv5LI'
        }
    };

    try
    {
        const res = await fetch( url, options );
        // console.log(res)
        if ( !res.ok )
        {
            throw new Error( `Error: ${res.statusText}` );
        }
        const castData = await res.json();
        // console.log(castData)
        return { castData, error: null };
    } catch ( err )
    {
        console.error( 'Error fetching popular movies:', err );
        return { data: null, error: err.message || 'An unknown error occurred' };
    }
}

export const searchMovie = async ( movie, page = 1 ) =>
{
    const url = `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=${page}`;

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzgxODZhMjA2NjY3N2M2NzQwMzFmMWQ2ZGNiMzljNCIsIm5iZiI6MTczNDI5ODA3OS42NzYsInN1YiI6IjY3NWY0OWRmZjc0YzNhMTM4OGJhMjIzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vSW8VAinEvzEMpxcGOGAIZb4Wo70KMlfktbWImpv5LI'
        }
    };

    try
    {
        const res = await fetch( url, options );
        // console.log(res)
        if ( !res.ok )
        {
            throw new Error( `Error: ${res.statusText}` );
        }
        const searchData = await res.json();
        // console.log(castData)
        return { searchData, error: null };
    } catch ( err )
    {
        console.error( 'Error fetching popular movies:', err );
        return { data: null, error: err.message || 'An unknown error occurred' };
    }
}