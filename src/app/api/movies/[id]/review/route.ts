import { cookies } from "next/headers";
import { getClientApiInstance } from "../../../../../utils/api";
import { Review } from "../../../../../types";

export async function POST(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split("/")[1];
  const requestUrl = `/movies/${id}/reviews`;
  const { rate, text } = await req.json();
  const api = getClientApiInstance(cookies());

  try {
    const apiResponse = await api.post<Review>(requestUrl, { rate, text });
    const review = apiResponse.data;

    return new Response(JSON.stringify({ review }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      error?.response?.data?.message || "Something gone wrong",
      {
        status: error?.response?.data?.statusCode || 500,
      }
    );
  }
}
