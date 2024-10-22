"use client";
import { FunctionComponent } from "react";
import { useAppSelector } from "../../redux/hooks";
import { Card } from "./Card";

export const FavouriteMovies: FunctionComponent = () => {
  const favourites =
    useAppSelector((state) => state?.favouritesReducer?.movies) || [];

  return (
    <>
      {favourites.map((movie) => {
        return <Card movie={movie} key={movie.id} />;
      })}
      {Boolean(!favourites.length) && <h1>No favourites to display</h1>}
    </>
  );
};
