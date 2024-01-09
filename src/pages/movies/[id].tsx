import { DefaultLayout } from "../../components/layouts/DefaultLayout";
import { Movie } from "../../types";
import { getClientApiInstance } from "../../utils/api";
import { Cookies } from "react-cookie";

interface Props {
  movie: Movie;
}

const Movies = ({ movie }: Props) => {
  return (
    <DefaultLayout>
      <div
        className="card-group px-5 text-white"
        style={{ paddingTop: "66px" }}
      >
        {JSON.stringify(movie)}
      </div>
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
        errorCode: error,
      },
    };
  }
}

export default Movies;
