'use client';

import { useAuth } from '@/hooks/useAuth';
import { handleMovieClick } from '@/utils/actions/serverActions';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function SearchedCard({ movie }) {
    // console.log( "SearchedCard movie data:", movie );

    const [ isPending, startTransition ] = useTransition();
    const router = useRouter();

    const getOrdinalSuffix = ( day ) =>
    {
        if ( day > 3 && day < 21 ) return 'th';
        switch ( day % 10 )
        {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };

    const formatDate = ( dateString ) =>
    {
        const date = new Date( dateString );
        const day = date.getDate();
        const month = date.toLocaleString( 'default', { month: 'long' } );
        const year = date.getFullYear();
        return `${day}${getOrdinalSuffix( day )} ${month} ${year}`;
    };

    const { auth } = useAuth();

    async function onClick ()
    {
        startTransition( async () =>
        {
            const redirectUrl = await handleMovieClick( movie?.id, auth );
            router.push( redirectUrl );
        } );
    };

    return (
        <>
            {
                isPending ? (
                    <p>loading.......</p>
                ) : (
                    <div
                        onClick={ onClick }
                        className="bg-zinc-900 rounded-lg overflow-hidden hover:scale-105 transition-transform hover:shadow-md hover:shadow-cyan-500 duration-200 hover:border-[0.5px] border-teal-600 cursor-pointer"
                    >
                        <Image
                            width={ 400 }
                            height={ 500 }
                            src={ `https://image.tmdb.org/t/p/w500${movie?.poster_path}` }
                            alt="Avatar: The Way of Water"
                            className="w-full aspect-[2/3] object-cover"
                        />
                        <div className="p-4">
                            <h3 className="font-bold mb-2">{ movie?.original_title }</h3>
                            <div className="flex justify-between text-sm text-gray-400">
                                <span className='font-nunito'>{ formatDate( movie?.release_date ) || null }</span>
                                <span className='font-manrope'>⭐ { movie?.vote_average?.toFixed( 1 ) }</span>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};