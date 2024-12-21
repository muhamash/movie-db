import { searchMovie } from "@/utils/getMovie";
import dynamic from "next/dynamic";
import { Suspense } from "react";
// import InfiniteScrollWrapper from "../InfinitySCrolling";

const InfiniteScrollWrapper = dynamic( () => import( '../InfinitySCrolling' ) );

export default async function SearchedPage ( { query } )
{
    const { searchData } = await searchMovie( query, 1 );
    // console.log(searchData);
    return (
        <Suspense fallback={ <div className="animate-pulse w-full h-[288px] bg-zinc-800 rounded-lg" /> }>
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Search Results for:  <span className="font-bold text-xl font-lato text-green-600">{ query }</span></h1>
                <p className="text-gray-400 font-lato">Found: <span className="text-teal-600 font-bold text-lg">{ searchData?.total_results } Movies at the server!!!</span></p>
            </div>
            <InfiniteScrollWrapper
                initialData={ searchData }
                query={ query }
            />
        </Suspense>
    );
}
