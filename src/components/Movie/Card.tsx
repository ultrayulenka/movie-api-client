"use client";
import { FunctionComponent } from "react";
import { Movie } from "../../types";
import Link from "next/link";
import { EditMovie } from "./EditMovie";
import { DeleteMovie } from "./DeleteMovie";
import { useAppSelector } from "../../redux/hooks";

interface Props {
  movie: Movie;
}

export const Card: FunctionComponent<Props> = ({ movie }) => {
  const { name, poster, year, genre, rating, id } = movie;
  const user = useAppSelector((state) => state.authReducer?.userData);

  return (
    <div
      className="card mx-2 mb-2"
      style={{ maxWidth: "340px", minWidth: "300px" }}
    >
      <img
        className="card-img-top"
        src={`https://movies-api-9eyb.onrender.com/${poster}`}
        alt={name}
        style={{ height: "420px", width: "100%" }}
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

        <div className="d-flex justify-content-between">
          <Link href={`/movies/${id}`} className="text-primary">
            Go to movie page
          </Link>
          <div>
            {user?.permissions?.includes("edit movies") && (
              <EditMovie movie={movie} />
            )}
            {user?.permissions?.includes("delete movies") && (
              <DeleteMovie movie={movie} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
