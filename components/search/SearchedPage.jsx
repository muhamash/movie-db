import { searchMovie } from "@/utils/getMovie";
import InfiniteScrollWrapper from "../InfinitySCrolling";
import SearchedCard from "./SearchedCard";

export default async function SearchedPage ( { query } )
{
    const { searchData } = await searchMovie( query, 1 );
    // console.log(searchData);
    return (
        <>
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Search Results for:  <span className="font-bold text-xl font-lato text-green-600">{ query }</span></h1>
                <p className="text-gray-400 font-lato">Found: <span className="text-teal-600 font-bold text-lg">{ searchData?.total_results } Movies at the server!!!</span></p>
            </div>
            <InfiniteScrollWrapper
                SearchedCard={ SearchedCard }
                initialData={ searchData }
                query={ query }
            />
        </>
    );
}
