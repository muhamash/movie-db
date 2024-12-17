"use client";

import { useState } from "react";
import MovieCard from "./home/MovieCard";

export default function InfiniteScrollMovies({ initialData }) {
  const [movies, setMovies] = useState(initialData?.results); 
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(2); 
  const [error, setError] = useState(null);
  const [noMoreMovies, setNoMoreMovies] = useState(false); 

  // Handle horizontal scrolling
  const handleScroll = (e) => {
    const { scrollLeft, scrollWidth, clientWidth } = e.target;
    const bottom = scrollLeft + clientWidth === scrollWidth; 
    if (bottom && !loading && !noMoreMovies) {
      setPage((prevPage) => prevPage + 1); 
      if (page >= 3) { 
        setNoMoreMovies(true);
      }
    }
  };

  return (
    <div
      id="moviesContainer"
      className="flex flex-nowrap space-x-4 overflow-x-auto pb-4" 
      onScroll={handleScroll}
      style={{ maxHeight: "80vh", overflowX: "auto" }} 
    >
      {error && <p className="text-center text-red-500">{error}</p>}
      {loading && <p className="text-center">Loading...</p>}
      {movies?.length === 0 && !loading && (
        <p className="text-center">No movies available.</p>
      )}

      {movies?.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}

      {noMoreMovies && <p className="text-center text-gray-500">No more movies to show.</p>}
    </div>
  );
}