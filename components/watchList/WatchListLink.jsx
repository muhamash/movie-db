'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function WatchListLink ()
{
    const { auth } = useAuth();
    const router = useRouter();

    const handleLink = () =>
    {
        if ( !auth )
        {
            router.push( "/login" );
        }
        else
        {
            router.push( `/watchList/${auth?.id}` );
        }
    };

    return (
        <p onClick={handleLink} className="text-white hover:text-gray-300 font-nunito cursor-pointer">
              Watch Later
            </p>
    );
};
