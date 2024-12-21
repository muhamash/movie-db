"use client";

import dynamic from "next/dynamic";
import { Fragment, useEffect, useState } from "react";

const MovieCard = dynamic( () => import( "./home/MovieCard" ) );
const SearchedCard = dynamic( () => import( "./search/SearchedCard" ) );

export default function InfiniteScrollWrapper({
  initialData,
  type,
  isTrend,
  query,
  movieId
}) {
  const [items, setItems] = useState(initialData?.results || []);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [noMoreItems, setNoMoreItems] = useState(false);

  const handleScroll = (e) => {
    const { scrollLeft, scrollWidth, clientWidth, scrollTop, scrollHeight, clientHeight } = e.target;
    const isAtEnd = type
      ? scrollLeft + clientWidth >= scrollWidth - 1 
      : scrollTop + clientHeight >= scrollHeight - 1;

    if (isAtEnd && !loading && !noMoreItems) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect( () =>
  {
    const fetchMoreItems = async () =>
    {
      if ( loading || noMoreItems ) return;

      setLoading( true );
      try
      {
        const endpoint = type
          ? `https://movie-db-eight-sable.vercel.app/api/movies?page=${page}&id=${type}&movieId=${movieId}`
          : `https://movie-db-eight-sable.vercel.app/api/search?query=${query}&page=${page}`;
          
        const response = await fetch( endpoint );

        if ( !response.ok ) throw new Error( "Failed to fetch more items." );

        const data = await response.json();
        console.log( "Fetched data:", data );

        if ( data.data?.length > 0 )
        {
          setItems( ( prevItems ) => [ ...prevItems, ...data.data ] );
        } else
        {
          setNoMoreItems( true );
        }
      } catch ( error )
      {
        console.error( "Error fetching more items:", error );
        setNoMoreItems( true );
      } finally
      {
        setLoading( false );
      }
    };

    if ( page > 1 )
    {
      fetchMoreItems();
    }
  }, [ page, type, query, movieId ] );

  useEffect( () =>
  {
    setItems( initialData?.results || [] );
    setPage( 1 );
    setNoMoreItems( false );
  }, [ initialData, query, type ] );

  return (
    <Fragment>
      <div
        id="itemsContainer"
        className={ `${type
          ? "flex flex-nowrap space-x-4 overflow-x-auto"
          : "grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 overflow-y-auto w-full p-3"
          } p-2` }
        onScroll={ handleScroll }
        style={ { maxHeight: "80vh", ...( type ? { overflowX: "auto" } : {} ) } }
      >
        { items.map( ( item, index ) => (
          <Fragment key={ index }>
            { type ? (
              <MovieCard movie={ item } isTrend={ isTrend } />
            ) : (
              <SearchedCard movie={ item } />
            ) }
          </Fragment>
        ) ) }

        { loading && (
          <div className="w-[90%] mx-auto h-fit flex items-start justify-center">
            <div className="loaderScrolling"></div>
          </div>
        ) }
      </div>

      { noMoreItems && items.length > 0 && page > 1 && (
          <p className="text-center text-yellow-500 font-semibold text-lg font-lato w-[90%] mx-auto p-3">You have all caught up!!</p>
      ) }
      
      { items.length === 0 && !loading && (
        <div className="text-center w-[90%] mx-auto flex flex-col gap-5 items-center justify-center text-red-700 font-lato">
          <span className="notFoundLoader"></span>
          <p>No items available.</p>
        </div>
      ) }
    </Fragment>
  );
};