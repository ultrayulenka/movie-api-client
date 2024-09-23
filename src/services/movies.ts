import { Movie } from "../types";
import { getClientApiInstance } from "../utils/api";
import { cookies } from "next/headers";


const handler = async (requestUrl: string, req: Request): Promise<Movie> => {
  const api = getClientApiInstance(cookies());

  try {
    const formData = await req.formData();
    const fetch = req.method === "POST" ? api.post<Movie> : api.patch<Movie>;

    const apiResponse = await fetch(requestUrl, formData);
    const movie = apiResponse.data;

    return movie;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export { handler };
