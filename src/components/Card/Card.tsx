import { FunctionComponent, ReactNode } from "react";
import { Movie } from "../../types";

interface Props {
  movie: Movie;
}

export const Card: FunctionComponent<Props> = ({ movie }) => {
  const { name, poster, year, description, genre, rating } = movie;

  return (
    <div className="card mx-2" style={{ maxWidth: "340px" }}>
      <img
        className="card-img-top"
        src={`https://movies-api-9eyb.onrender.com/${poster}`}
        alt={name}
        style={{ height: '400px', width: '100%'}}
      />
      <div className="card-body">
        <h4 className="card-title">
          {name} ({year})
        </h4>

        <div className="container">
          <div className="row">
            <div className="col-sm-4 metadata">
              <i className="fa fa-star" aria-hidden="true"></i>
              <p>{rating}/10</p>
            </div>
            <div className="col-sm-8 metadata">{genre}</div>
          </div>
        </div>

        <p className="card-text text-truncate">{description}</p>
        <a
          className="trailer-preview"
          href="https://youtu.be/ePbKGoIGAXY"
          target="new"
        >
          <i className="fa fa-play" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  );
};
