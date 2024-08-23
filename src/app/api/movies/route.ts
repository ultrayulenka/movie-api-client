import { handler } from "../../../services/movies";

export async function POST(req: Request) {
  try {
    const movie = await handler("movies", req);

    return new Response(JSON.stringify({ movie }), {
      status: 200,
    });
  } catch (error) {
    return new Response(error?.response?.data?.message || "Something gone wrong", {
      status: error?.response?.data?.statusCode || 500,
    });
  }
}
