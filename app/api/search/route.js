import { searchMovie } from "@/utils/getMovie";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
      const { searchParams } = new URL(request.url);
      const page = searchParams.get("page") || 1; 
      const query = searchParams.get("query");

      if (!query) {
          return new Response(
              JSON.stringify({
                  status: 400,
                  success: false,
                  message: "Query parameter is required",
              }),
              {
                  status: 400,
                  headers: { "Content-Type": "application/json" },
              }
          );
      }

      const searchResult = await searchMovie(query, page);

      if (searchResult?.searchData?.results?.length === 0) {
          return new Response(
              JSON.stringify({
                  status: 404,
                  success: false,
                  message: "Movies not found",
              }),
              {
                  status: 404,
                  headers: { "Content-Type": "application/json" },
              }
          );
      }

      return new Response(
          JSON.stringify({
              status: 200,
              success: true,
              data: searchResult?.searchData?.results,
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
              message: `Failed to fetch movies: ${error.message}`,
          }),
          {
              status: 500,
              headers: { "Content-Type": "application/json" },
          }
      );
  }
}