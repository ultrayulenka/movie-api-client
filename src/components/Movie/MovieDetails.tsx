import { FunctionComponent, ReactNode } from "react";
import { Movie } from "../../types";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

interface Props {
  movie: Movie;
  actions?: ReactNode;
}

export const MovieDetails: FunctionComponent<Props> = ({ movie, actions }) => {
  const { name, poster, year, genre, rating, description } = movie;

  return (
    <>
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
        {actions}
      </Col>
    </>
  );
};
