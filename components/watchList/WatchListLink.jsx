'use client';

import { useAuth } from '@/hooks/useAuth';
import { handleWatchListClick } from '@/utils/actions/serverActions';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function WatchListLink ()
{
    const [isPending, startTransition] = useTransition();
    const { auth } = useAuth();
    const router = useRouter();

    async function handleLink()
    {
        startTransition( async () =>
        {
            const redirectUrl = await handleWatchListClick( auth?.id );
            router.push( redirectUrl );
        } );
    };

    return (
        ( isPending ? (
            <div>
                loading...
            </div>
        ) :
            (
                <p onClick={ handleLink } className="text-white hover:text-gray-300 font-nunito cursor-pointer  hover:scale-110 duration-200 transition">
                    Watch Later
                </p>
            )
        )
    )
}   

