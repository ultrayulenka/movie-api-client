import { cookies } from "next/headers";
import { Movie } from "../../../types";
import { getClientApiInstance } from "../../../utils/api";
import { MovieContainer } from "../../../components/Movie/MovieContainer";
import { ServerDefaultLayout } from "../../ServerLayout";

export const dynamic = "force-dynamic";

async function getData(id: string): Promise<{
  movie?: Movie;
  errorCode?: string;
}> {
  const api = getClientApiInstance(cookies());

  try {
    const movie = (await api.get<Movie>(`/movies/${id}`)).data;

    return {
      movie,
    };
  } catch (error) {
    return {
      errorCode: error.response.status,
    };
  }
}

export default async function MoviePage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);
  const { movie } = data;
  if (!movie) return null;

  return (
    <ServerDefaultLayout>
      <MovieContainer movie={movie} />
    </ServerDefaultLayout>
  );
}
