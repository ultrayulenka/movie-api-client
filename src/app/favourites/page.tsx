import { FavouriteMovies } from "../../components/Movie/FavouriteMovies";
import { ServerDefaultLayout } from "../ServerLayout";

export const dynamic = "force-dynamic";


export default async function Favourites() {
  return (
    <ServerDefaultLayout>
      <div
        className="card-group px-5"
        style={{ paddingTop: "66px", width: "100vw" }}
      >
        <FavouriteMovies />
      </div>
    </ServerDefaultLayout>
  );
}
