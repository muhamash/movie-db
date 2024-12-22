import { getMovieList } from "@/utils/getMovie";

export const dynamic = "force-dynamic"

export async function GET(request, context) {
    try {
        const url = new URL( request.url );
        // console.log( request.url, context );
        const page = url.searchParams.get( "page" );
        const id = url.searchParams.get( "id" );
        const movieId = context?.params?.movieId;

        // console.log(movieId)
        if (!page || isNaN(page) || parseInt(page, 10) <= 0) {
            return new Response(
                JSON.stringify({
                    status: 400,
                    success: false,
                    message: "Page number is required and must be a positive integer",
                }),
                {
                    status: 400,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        }

        const { data, error } = await getMovieList( page, id, movieId );
        // console.log( popularMoviesData );

        if (error || !data) {
            return new Response(
                JSON.stringify({
                    status: 404,
                    success: false,
                    message: "Movies not found or unable to fetch data",
                }),
                {
                    status: 404,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        }

        return new Response(
            JSON.stringify({
                status: 200,
                success: true,
                message: "Movies fetched successfully",
                data: data?.results,
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        console.error("Error fetching movies:", error);
        return new Response(
            JSON.stringify({
                status: 500,
                success: false,
                message: `Failed to fetch movies: ${error.message}`,
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
}