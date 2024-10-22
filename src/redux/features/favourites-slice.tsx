import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Movie } from "../../types";

interface FavouritesState {
  movies: Array<Movie>;
}

const initialState: FavouritesState = {
  movies: [],
};

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addToFavourites(state, action: PayloadAction<Movie>) {
      state.movies = [...state.movies, action.payload];
    },
    removeFromFavourites(state, action: PayloadAction<number>) {
      const index = state.movies.findIndex(
        (movie) => movie.id === action.payload
      );

      if (index < 0) {
        return;
      }

      state.movies = state.movies.toSpliced(index, 1);
    },
    updatePosition(
      state,
      action: PayloadAction<{ newPos: number; id: number }>
    ) {
      const index = state.movies.findIndex(
        (movie) => movie.id === action.payload.id
      );

      if (index === action.payload.newPos || index < 0) {
        return;
      }

      const el = state.movies[index];

      state.movies = state.movies
        .toSpliced(index, 1)
        .toSpliced(action.payload.newPos, 0, el);
    },
    clearFavourites(state) {
      state.movies = [];
    },
  },
});

const { addToFavourites, removeFromFavourites, updatePosition } =
  favouritesSlice.actions;

export default favouritesSlice.reducer;
export { addToFavourites, removeFromFavourites, updatePosition };
