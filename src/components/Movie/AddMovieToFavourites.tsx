"use client";
import { FunctionComponent } from "react";
import { Heart, HeartFill } from "react-bootstrap-icons";
import { Movie } from "../../types";
import { useAppSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import {
  addToFavourites,
  removeFromFavourites,
} from "../../redux/features/favourites-slice";

interface Props {
  movie: Movie;
}

export const AddMovieToFavourites: FunctionComponent<Props> = ({
  movie,
}) => {
  const favourites =
    useAppSelector((state) => state?.favouritesReducer?.movies) || [];
  const dispatch = useDispatch();
  const isFavourite = favourites.find((favourite) => favourite.id === movie.id);
  const onClick = () => {
    if (isFavourite) {
      dispatch(removeFromFavourites(movie.id));
    } else {
      dispatch(addToFavourites(movie));
    }
  };

  return (
    <button
      className="bg-transparent border-0"
      onClick={onClick}
      aria-label={
        isFavourite ? "Remove movie from favourites" : "Add movie to favourites"
      }
    >
      {isFavourite ? <HeartFill size={24} /> : <Heart size={24} />}
    </button>
  );
};
