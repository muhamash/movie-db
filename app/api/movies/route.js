import { getMovieById } from "@/utils/getMovie";

export const dynamic = "force-dynamic"

export async function GET(request, context) {
    try {
        const url = new URL( request.url );
        const id = url.searchParams.get( "id" );
        const movieId = context?.params?.movieId;


        const { movieDataById, error } = await getMovieById(id);

        if (error || !movieDataById) {
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
                data: movieDataById,
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