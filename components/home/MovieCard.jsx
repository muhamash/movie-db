import Image from 'next/image';
import Link from 'next/link';

export default async function MovieCard({isTrend, movie}) {
  return (
    <div
      className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform"
    >
      <Link href="details.html">
        <Image
          src="https://image.tmdb.org/t/p/original/ht8Uv9QPv9y7K0RvUyJIaXOZTfd.jpg"
          alt="Smile 2"
          className="w-full rounded-lg"
          width={ 500 }
          height={ 750 }
          priority
        />
        {
          isTrend && (
            <div className="mt-2">
              <h3 className="text-light text-sm font-bold font-manrope truncate">Smile 2</h3>
              <p className="text-primary font-lato text-xs">2023</p>
            </div>
          )
        }
      </Link>
    </div>
  );
};
