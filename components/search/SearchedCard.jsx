import Image from 'next/image';
import Link from 'next/link';

export default async function SearchedCard() {
    return (
        <Link
            href="/details"
            className="bg-zinc-900 rounded-lg overflow-hidden hover:scale-105 transition-transform hover:shadow-md hover:shadow-cyan-500 duration-200 hover:border-[0.5px] border-teal-600"
        >
            <Image
                width={ 400 }
                height={500}
                src="https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg"
                alt="Avatar: The Way of Water"
                className="w-full aspect-[2/3] object-cover"
            />
            <div className="p-4">
                <h3 className="font-bold mb-2">Avatar: The Way of Water</h3>
                <div className="flex justify-between text-sm text-gray-400">
                    <span>2022</span>
                    <span>⭐ 7.7</span>
                </div>
            </div>
        </Link>
    );
}
