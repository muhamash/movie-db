'use client';

import { useAuth } from '@/hooks/useAuth';
import { handleMovieClick } from '@/utils/actions/serverActions';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

const Skeleton = dynamic( () => import( '../Skeleton' ), { ssr: true } );

export default function MovieCard({ isTrend, movie }, ref) {
  const { auth } = useAuth();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isImageLoaded, setImageLoaded] = useState(false);

  async function onClick() {
    startTransition(async () => {
      const redirectUrl = await handleMovieClick(movie?.id, auth);
      router.push(redirectUrl);
    });
  }

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div onClick={ onClick } className="relative flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform px-1 overflow-hidden">
      {
        isPending ? (
          <div className='w-full h-full flex items-center justify-center'>
            <div className='cardLoader'></div>
          </div>
        ) : (
          <>
            {
              !isImageLoaded && (
                <Skeleton />
              )
            }
            <Image
              src={
                movie?.poster_path
                  ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                  : '/assets/icons/commingSoon.svg'
              }
              alt={ movie?.original_title || 'Movie Poster' }
              className={ `w-full object-cover rounded-lg transition-opacity ${isImageLoaded ? 'opacity-100' : 'opacity-0'}` }
              width={ 480 }
              height={ 720 }
              onLoad={ handleImageLoad }
            />
            { isTrend && (
              <div className="mt-2">
                <h3 className="text-light text-sm font-bold font-manrope truncate">
                  { movie?.original_title }
                </h3>
                <p className="text-primary font-lato text-xs">
                  { movie?.vote_average?.toFixed( 1 ) }
                </p>
              </div>
            ) }
          </>
        )
      }
    </div>
  );
}