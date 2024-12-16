import SearchedCard from "./SearchedCard";

export default async function SearchedPage() {
    return (
        <>
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Search Results for &ldquo;Avatar&#34;</h1>
                <p className="text-gray-400">Found 48 results</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                <SearchedCard />
                <SearchedCard />
                <SearchedCard />
                <SearchedCard />
            </div>
        </>
    );
}
