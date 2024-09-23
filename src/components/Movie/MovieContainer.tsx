"use client";
import { FunctionComponent } from "react";
import { Container, Row } from "react-bootstrap";
import { AddReview } from "../Review/AddReview";
import { ReviewsList } from "../Review/ReviewsList";
import { DeleteMovie } from "./DeleteMovie";
import { EditMovie } from "./EditMovie";
import { MovieDetails } from "./MovieDetails";
import { Movie } from "../../types";
import { useAppSelector } from "../../redux/hooks";

interface Props {
  movie: Movie;
}

export const MovieContainer: FunctionComponent<Props> = ({ movie }) => {
  const userData = useAppSelector((state) => state.authReducer?.userData);

  return (
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
                {userData?.permissions?.includes("edit movies") && (
                  <EditMovie movie={movie} variant="light" />
                )}
              </div>
              <div>
                {userData?.permissions?.includes("delete movies") && (
                  <DeleteMovie movie={movie} variant="light" />
                )}
              </div>
            </div>
          }
        />
      </Row>
      <Row className="mt-5 w-100">
        <ReviewsList reviews={movie.reviews} />
        {userData && <AddReview movie={movie} />}
      </Row>
    </Container>
  );
};
