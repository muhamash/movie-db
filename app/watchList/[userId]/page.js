import WatchList from '@/components/watchList/WatchList';

export default async function WatchListPage ({ params} )
{
  return (
    <>
      <WatchList id={params?.userId}/>
    </>
  );
}
