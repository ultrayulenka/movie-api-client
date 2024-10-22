import { cookies } from "next/headers";
import { Movie } from "../../types";
import { getClientApiInstance } from "../../utils/api";
import { Card } from "../../components/Movie/Card";
import { ServerDefaultLayout } from "../ServerLayout";

export const dynamic = "force-dynamic";

async function getData(): Promise<{
  movies?: Array<Movie>;
  errorCode?: string;
}> {
  const api = getClientApiInstance(cookies());

  try {
    const movies = (await api.get<Array<Movie>>("/movies")).data;

    return {
      movies,
    };
  } catch (error) {
    return {
      errorCode: error.response?.status || 500,
    };
  }
}

export default async function Movies() {
  const { movies, errorCode } = await getData();
  console.log("We are here");

  return (
    <ServerDefaultLayout>
      <div
        className="card-group px-5"
        style={{ paddingTop: "66px", width: "100vw" }}
      >
        {movies?.map((movie) => {
          return <Card movie={movie} key={movie.id} />;
        })}
      </div>
    </ServerDefaultLayout>
  );
}
