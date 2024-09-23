import { cookies } from "next/headers";
import { handler } from "../../../../services/movies";
import { getClientApiInstance } from "../../../../utils/api";

export async function PATCH(req: Request) {
  const url = new URL(req.url);
  const splittedUrl = url.pathname.split("/");
  const requestUrl = `/movies/${splittedUrl[splittedUrl.length - 1]}`;
  try {
    const movie = await handler(requestUrl, req);

    return new Response(JSON.stringify({ movie }), {
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

export async function DELETE(req: Request) {
  const api = getClientApiInstance(cookies());
  const url = new URL(req.url);
  const requestUrl = `/movies/${url.pathname.split("/")[1]}`;

  try {
    await api.delete(requestUrl);

    return new Response("Successfully deleted the movie", {
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
