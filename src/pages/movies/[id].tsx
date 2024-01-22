import { Col, Container, Row, Image, ListGroup, Button } from "react-bootstrap";
import { DefaultLayout } from "../../components/layouts/DefaultLayout";
import { Movie } from "../../types";
import { getClientApiInstance } from "../../utils/api";
import { Cookies } from "react-cookie";
import { DeleteMovie } from "../../components/Movie/DeleteMovie";
import { EditMovie } from "../../components/Movie/EditMovie";
import { useContext } from "react";
import { appContext } from "../../context/app";
import { AddReview } from "../../components/Review/AddReview";
import { ReviewsList } from "../../components/Review/ReviewsList";
import { MovieDetails } from "../../components/Movie/MovieDetails";

interface Props {
  movie: Movie;
}

const Movies = ({ movie }: Props) => {
  const { reviews } = movie;
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
};

export async function getServerSideProps(context) {
  const cookies = new Cookies(context.req.headers.cookie);
  const { id } = context.query;
  const api = getClientApiInstance(cookies);

  try {
    const movie = (await api.get<Movie>(`/movies/${id}`)).data;

    return {
      props: { movie },
    };
  } catch (error) {
    return {
      props: {
        errorCode: error.response.status,
      },
    };
  }
}

export default Movies;
