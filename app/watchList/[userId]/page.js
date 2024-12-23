import WatchList from '@/components/watchList/WatchList';
import { Suspense } from 'react';

export const metadata = {
  title: "MovieDB -> Watch list",
  description: "Generated by github/muhamash a NextJs app",
};

export default async function WatchListPage ({ params} )
{
  return (
    <Suspense fallback={
      <p>
        loading
      </p>
    }>
      <WatchList id={params?.userId}/>
    </Suspense>
  );
}
