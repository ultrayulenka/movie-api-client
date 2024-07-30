import { cookies } from "next/headers";
import { getClientApiInstance } from "../../../utils/api";
import cookie from "cookie";

export async function POST(req: Request) {
  const api = getClientApiInstance(cookies());
  const { email, password, username } = await req.json();
  try {
    const apiResponse = await api.post<{
      token: string;
    }>("/auth/signup", { email, password, username });
    const token = apiResponse.data.token;

    return new Response(JSON.stringify({ email }), {
      status: 200,
      headers: {
        "Set-Cookie": cookie.serialize("token", token, {
          httpOnly: true,
          maxAge: 60 * 60 * 60,
          path: "/",
        }),
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
