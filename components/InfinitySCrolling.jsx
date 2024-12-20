"use client";

import { useEffect, useState } from "react";

export default function InfiniteScrollWrapper({
  initialData,
  type,
  isTrend,
  MovieCard,
  query,
  SearchedCard
}) {
    const [ items, setItems ] = useState( initialData?.results || [] );
    const [ loading, setLoading ] = useState( false );
    const [ page, setPage ] = useState( 1 );
    const [ noMoreItems, setNoMoreItems ] = useState( false );

    const handleScroll = ( e ) =>
    {
        const { scrollLeft, scrollWidth, clientWidth, scrollTop, scrollHeight, clientHeight } = e.target;
        const isAtEnd = MovieCard
            ? scrollLeft + clientWidth === scrollWidth
            : scrollTop + clientHeight === scrollHeight;

        if ( isAtEnd && !loading && !noMoreItems )
        {
            setPage( ( prevPage ) => prevPage + 1 );
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
                const response = await fetch(
                    type ? `/api/movies?page=${page}&id=${type}` : `/api/search?query=${query}&page=${page}`
                );

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
    }, [ page, type, query ] );

    useEffect( () =>
    {
        setItems( initialData?.results || [] );
        setPage( 1 );
        setNoMoreItems( false );
    }, [ initialData, query ] );

    return (

        <>
            { loading &&
                (
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="loaderScrolling"></span>
                    </div>
                ) }
            { noMoreItems && items.length > 0 && (
                <p className="text-center text-red-700 font-lato">You have all caught up!!</p>
            ) }
            { items.length === 0 && !loading && (
                <div className="text-center w-full  flex flex-col gap-5 items-center justify-center text-red-700 font-lato">
                    <span className="notFoundLoader"></span>
                    <p>No items available.</p>
                </div>
            ) }
        
            <div
                id="itemsContainer"
                className={ `${MovieCard ? 'flex flex-nowrap space-x-4 overflow-x-auto' : 'grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 overflow-y-auto'
                    } pb-4` }
                onScroll={ handleScroll }
                style={ MovieCard ? { maxHeight: "80vh", overflowX: "auto" } : { maxHeight: "80vh" } }
            >
            
                { items.map( ( item, index ) => (
                    <div key={ index }>
                        { MovieCard ? (
                            <MovieCard movie={ item } isTrend={ isTrend } />
                        ) : (
                            <SearchedCard movie={ item } />
                        ) }
                    </div>
                ) ) }
            </div>
        </>
    );
};