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

export const getPopularMovie = async (page = 1) => {
    const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
    
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzgxODZhMjA2NjY3N2M2NzQwMzFmMWQ2ZGNiMzljNCIsIm5iZiI6MTczNDI5ODA3OS42NzYsInN1YiI6IjY3NWY0OWRmZjc0YzNhMTM4OGJhMjIzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vSW8VAinEvzEMpxcGOGAIZb4Wo70KMlfktbWImpv5LI'
        }
    };

    try {
        const res = await fetch(url, options);
        if (!res.ok) {
            throw new Error(`Error: ${res.statusText}`);
        }
        const data = await res.json();
        return { data, error: null };
    } catch (err) {
        console.error('Error fetching popular movies:', err);
        return { data: null, error: err.message || 'An unknown error occurred' };
    }
};
