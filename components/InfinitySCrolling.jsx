"use client";

import { useEffect, useState } from "react";
import MovieCard from "./home/MovieCard";

export default function InfiniteScrollMovies({ initialData, type, isTrend }) {
  const [movies, setMovies] = useState(initialData?.results || []);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(2); 
  const [noMoreMovies, setNoMoreMovies] = useState(false); 

  const handleScroll = (e) => {
    const { scrollLeft, scrollWidth, clientWidth } = e.target;
    const isAtEnd = scrollLeft + clientWidth === scrollWidth;

    if (isAtEnd && !loading && !noMoreMovies) {
      setPage((prevPage) => prevPage + 1);
    }
  };
    // console.log(id)

    useEffect( () =>
    {
        const fetchMoreMovies = async () =>
        {
            if ( loading ) return;

            setLoading( true );
            try
            {
                const response = await fetch( `/api/movies?page=${page}&id=${type}` );
                // console.log( response );
                if ( !response.ok ) throw new Error( "Failed to fetch more movies." );
                const data = await response.json();

                if ( data.data?.length > 0 )
                {
                    setMovies( ( prevMovies ) => [ ...prevMovies, ...data?.data ] );
                } else
                {
                    setNoMoreMovies( true );
                }
            } catch ( error )
            {
                console.error( "Error fetching more movies:", error );
                setNoMoreMovies( true );
            } finally
            {
                setLoading( false );
            }
        };

        if ( page > 2 )
        {
            fetchMoreMovies();
        }
    }, [ page, type ] );

    return (
        <div
            id="moviesContainer"
            className="flex flex-nowrap space-x-4 overflow-x-auto pb-4"
            onScroll={ handleScroll }
            style={ { maxHeight: "80vh", overflowX: "auto" } }
        >
            { movies.length === 0 && !loading && <p className="text-center text-red-700 font-lato">No movies available.</p> }
            { movies.map( ( movie ) => (
                <MovieCard key={ movie.id } movie={ movie } isTrend={ isTrend }/>
            ) ) }
            { loading &&( <div className="w-full h-full flex items-center justify-center"><span className="loaderScrolling"></span></div>) }
            { noMoreMovies && <p className="text-center  text-red-700 font-lato">No more movies to show.</p> }
        </div>
    );
}