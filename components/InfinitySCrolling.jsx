"use client";

import { Fragment, useEffect, useState } from "react";

export default function InfiniteScrollWrapper({
  initialData,
  type,
  isTrend,
  MovieCard,
  query,
    SearchedCard,
  movieId
}) {
  const [items, setItems] = useState(initialData?.results || []);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [noMoreItems, setNoMoreItems] = useState(false);

  const handleScroll = (e) => {
    const { scrollLeft, scrollWidth, clientWidth, scrollTop, scrollHeight, clientHeight } = e.target;
    const isAtEnd = MovieCard
      ? scrollLeft + clientWidth >= scrollWidth - 1 
      : scrollTop + clientHeight >= scrollHeight - 1;

    if (isAtEnd && !loading && !noMoreItems) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const fetchMoreItems = async () => {
      if (loading || noMoreItems) return;

      setLoading(true);
      try {
        const endpoint = type
          ? `/api/movies?page=${page}&id=${type}&movieId=${movieId}`
            : `/api/search?query=${query}&page=${page}`;
          
        const response = await fetch(endpoint);

        if (!response.ok) throw new Error("Failed to fetch more items.");

        const data = await response.json();
        console.log("Fetched data:", data);

        if (data.data?.length > 0) {
          setItems((prevItems) => [...prevItems, ...data.data]);
        } else {
          setNoMoreItems(true);
        }
      } catch (error) {
        console.error("Error fetching more items:", error);
        setNoMoreItems(true);
      } finally {
        setLoading(false);
      }
    };

    if (page > 1) {
      fetchMoreItems();
    }
  }, [page, type, query, movieId, loading, noMoreItems]);

  useEffect(() => {
    setItems(initialData?.results || []);
    setPage(1);
    setNoMoreItems(false);
  }, [initialData, query]);

    return (
        <Fragment>
            <div
                id="itemsContainer"
                className={ `${MovieCard
                    ? "flex flex-nowrap space-x-4 overflow-x-auto"
                    : "grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 overflow-y-auto w-full"
                    } pb-4 flex items-center justify-center` }
                onScroll={ handleScroll }
                style={ { maxHeight: "80vh", ...( MovieCard ? { overflowX: "auto" } : {} ) } }
            >
                { items.map( ( item, index ) => (
                    <Fragment key={ index }>
                        { MovieCard ? (
                            <MovieCard movie={ item } isTrend={ isTrend } />
                        ) : (
                            <SearchedCard movie={ item } />
                        ) }
                    </Fragment>
                ) ) }

                {/* Loading Spinner */ }
                { loading && (
                    <div className="w-[90%] mx-auto h-fit flex items-start justify-center">
                        <div className="loaderScrolling"></div>
                    </div>
                ) }

                { noMoreItems && items.length > 0 && (
                    <p className="text-center text-red-700 font-lato w-[90%] mx-auto">You have all caught up!!</p>
                ) }
            </div>

            { items.length === 0 && !loading && (
                <div className="text-center w-[90%] mx-auto flex flex-col gap-5 items-center justify-center text-red-700 font-lato">
                    <span className="notFoundLoader"></span>
                    <p>No items available.</p>
                </div>
            ) }
        </Fragment>
    );
};