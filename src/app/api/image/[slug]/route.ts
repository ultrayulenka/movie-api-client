import { cookies } from "next/headers";
import { getClientApiInstance } from "../../../../utils/api";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const api = getClientApiInstance(cookies());
  const geturl = url.pathname.slice(11);
  try {
    const imageResponse = await api.get(`/${geturl}`, {
      responseType: "arraybuffer",
    });

    const imageBuffer = imageResponse.data;

    return new Response(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": imageResponse.headers["content-type"],
        "Content-Length": imageResponse.headers["content-length"],
      },
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
