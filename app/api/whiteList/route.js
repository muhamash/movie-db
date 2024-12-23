import { whiteListModel } from "@/db/whiteListModel";
import { dbConnect } from "@/service/mongo";

export const dynamic = 'force-dynamic';
export const revalidate = true;

export async function GET(request, { params }) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return new Response(
      JSON.stringify({
        status: 400,
        success: false,
        message: 'User ID is required',
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    await dbConnect();
    
    const whitelist = await whiteListModel.findOne({ userId }).lean();

    if (!whitelist) {
      return new Response(
        JSON.stringify({
          status: 404,
          success: false,
          message: 'Movies not found',
        }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        status: 200,
        success: true,
        data: whitelist.movieIds,
        message: 'Movies fetched successfully',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching whitelist:', error);
    return new Response(
      JSON.stringify({
        status: 500,
        success: false,
        message: 'Failed to fetch whitelist',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}