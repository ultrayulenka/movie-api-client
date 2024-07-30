import { cookies } from "next/headers";
import { Movie } from "../../../types";
import { getClientApiInstance } from "../../../utils/api";
import { DefaultLayout } from "../../../components/layouts/DefaultLayout";
import { Container, Row } from "react-bootstrap";
import { MovieDetails } from "../../../components/Movie/MovieDetails";
import { useContext } from "react";
import { appContext } from "../../../context/app";
import { EditMovie } from "../../../components/Movie/EditMovie";
import { DeleteMovie } from "../../../components/Movie/DeleteMovie";
import { ReviewsList } from "../../../components/Review/ReviewsList";
import { AddReview } from "../../../components/Review/AddReview";

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
  const { reviews } = data.movie as Movie;
  const { user } = useContext(appContext);

  return (
    <DefaultLayout>
      <Container
        className="px-5 text-white"
        style={{ padding: "80px", fontSize: "24px" }}
        fluid
      >
        <Row>
          <MovieDetails
            movie={movie}
            actions={
              <div className="d-flex text-white">
                <div className="me-3">
                  {user?.permissions?.includes("edit movies") && (
                    <EditMovie movie={movie} variant="light" />
                  )}
                </div>
                <div>
                  {user?.permissions?.includes("delete movies") && (
                    <DeleteMovie movie={movie} variant="light" />
                  )}
                </div>
              </div>
            }
          />
        </Row>
        <Row className="mt-5 w-25">
          <ReviewsList reviews={reviews} />
          {user && <AddReview movie={movie} />}
        </Row>
      </Container>
    </DefaultLayout>
  );
}
