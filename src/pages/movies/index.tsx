import { DefaultLayout } from "../../components/layouts/DefaultLayout";
import { Movie } from "../../types";
import { getClientApiInstance } from "../../utils/api";
import { Cookies } from "react-cookie";
import { Card } from "../../components/Movie/Card";

interface Props {
  movies: Array<Movie>;
}

const Movies = ({ movies }: Props) => {
  return (
    <DefaultLayout>
      <div className="card-group px-5" style={{ paddingTop: "66px" }}>
        {movies.map((movie) => {
          return <Card movie={movie} key={movie.id} />;
        })}
      </div>
    </DefaultLayout>
  );
};

export async function getServerSideProps(context) {
  const cookies = new Cookies(context.req.headers.cookie);
  const api = getClientApiInstance(cookies);

  try {
    const movies = (await api.get<Array<Movie>>("/movies")).data;

    return {
      props: { movies },
    };
  } catch (error) {
    return {
      props: {
        errorCode: error.response?.status || 500,
      },
    };
  }
}

export default Movies;
