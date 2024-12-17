import { searchMovie } from "@/utils/getMovie";

// export const dynamic = "force-dynamic";

export async function GET(request) {
  
  function normalizeString(str) {
        return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9]/g, '');
  };

  try {

    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");
    const query = searchParams.get( "query" );
      
    const serachResult = await searchMovie( query, page );
    // console.log(serachResult)
    if (serachResult?.searchData?.results?.length === 0) {
      return new Response( JSON.stringify( {
        status: 404,
        success: false,
        message: "Movies not found",
      } ), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      } );
    };

    return new Response(
      JSON.stringify({
        status: 200,
        success: true,
        data: serachResult?.searchData?.results,
        message: "Movies fetched successfully",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching movies:", error);
    return new Response(
      JSON.stringify({
        status: 500,
        success: false,
        message: `Failed to fetch movies: ${error}`,
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};