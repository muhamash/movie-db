import Image from 'next/image';
import Link from 'next/link';

export default function MovieCard ( { isTrend, movie, userId } )
{
  // console.log(movie?.backdrop_path)
  return (
    <div
      className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform"
    >
      <Link href={`/movie/${movie?.id}?userId=${userId === undefined ? 'notLoggedIn' : userId}`}>
        <Image
          src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
          alt="Smile 2"
          className="w-full rounded-lg"
          width={ 500 }
          height={ 750 }
          placeholder='blur'
          blurDataURL='data:image/webp;base64,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'
        />
        {
          isTrend && (
            <div className="mt-2">
              <h3 className="text-light text-sm font-bold font-manrope truncate">{movie?.original_title }</h3>
              <p className="text-primary font-lato text-xs">{ movie?.vote_average.toFixed(1) }</p>
            </div>
          )
        }
      </Link>
    </div>
  );
};
