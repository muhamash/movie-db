import SearchedPage from "@/components/search/SearchedPage";

export default async function SearchPage ( params )
{
  // console.log(params)
  return (
    <div className="container mx-auto px-4 pt-24 pb-8">
      <SearchedPage query={ params?.searchParams?.query } />
    </div>
  )
}
