import { Col, Container, Row, Image, ListGroup, Button } from "react-bootstrap";
import { DefaultLayout } from "../../components/layouts/DefaultLayout";
import { Movie } from "../../types";
import { getClientApiInstance } from "../../utils/api";
import { Cookies } from "react-cookie";
import { DeleteMovie } from "../../components/Movie/DeleteMovie";
import { EditMovie } from "../../components/Movie/EditMovie";
import { useContext } from "react";
import { appContext } from "../../context/app";
import { Star, StarFill, StarHalf } from "react-bootstrap-icons";
import { AddReview } from "../../components/Movie/AddReview";

interface Props {
  movie: Movie;
}

const Movies = ({ movie }: Props) => {
  const { name, poster, year, genre, rating, id, description, reviews } = movie;
  const { user } = useContext(appContext);

  return (
    <DefaultLayout>
      <Container
        className="px-5 text-white"
        style={{ padding: "80px", fontSize: "24px" }}
        fluid
      >
        <Row>
          <Col xs={3}>
            <Image
              src={`https://movies-api-9eyb.onrender.com/${poster}`}
              rounded
              fluid
              style={{ boxShadow: "rgba(250, 250, 250, 0.5) 0px 7px 29px 0px" }}
            />
          </Col>
          <Col xs={7}>
            <h1 className="mb-3 display-2">{name}</h1>
            <p className="mb-3">
              <b>Year:</b> {year}
            </p>
            <p className="mb-3">
              <b>Genre:</b> {genre}
            </p>
            <p className="mb-3">
              <b>Rating:</b> {rating}/10
            </p>
            <p className="mb-3">
              <b>Description:</b> {description}
            </p>
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
          </Col>
        </Row>
        <Row className="mt-5 w-25">
          <h3>Reviews </h3>
          {reviews?.length ? (
            <ListGroup>
              {reviews.map((review) => (
                <ListGroup.Item key={review.id} className="mb-3">
                  <p>{review.createdAt}</p>
                  <p>{review.text}</p>
                  <div>
                    {[...Array(10)].map((_item, index) => {
                      const rest = review.rate - index - 1;

                      if (review.rate - index - 1 >= 0) {
                        return <StarFill className="text-warning" />;
                      }

                      return <Star className="text-warning" />;
                    })}
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p>No reviews</p>
          )}
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
