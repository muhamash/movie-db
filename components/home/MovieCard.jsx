'use client';

import { useAuth } from '@/hooks/useAuth';
import { handleMovieClick } from '@/utils/actions/serverActions';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function MovieCard({ isTrend, movie }) {
  const { auth } = useAuth();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function onClick()
  {
    startTransition( async () =>
    {
      const redirectUrl = await handleMovieClick( movie?.id, auth );
      router.push( redirectUrl );
    } );
  };

  return (
    <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
      {
        isPending ? (
          <p>
            loading...
          </p>
        ) : (
          <div onClick={ onClick }>
            <Image
              src={
                movie?.poster_path
                  ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                  : '/default-poster.jpg'
              }
              alt={ movie?.original_title || 'Movie Poster' }
              className="w-full rounded-lg"
              width={ 500 }
              height={ 750 }
              placeholder="blur"
              blurDataURL="data:image/webp;base64,..."
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
          </div>
        )
      }
    </div>
  );
}