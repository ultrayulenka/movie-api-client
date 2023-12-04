import { DefaultLayout } from "../../components/layouts/DefaultLayout";
import { AuthInnerContent } from "../../components/AuthForm";
import { Movie } from "../../types";
import { getClientApiInstance } from "../../utils/api";
import { Cookies } from "react-cookie";

interface Props {
  movies: Array<Movie>;
}

const Movies = ({ movies }: Props) => {
  console.log(movies);

  return (
    <DefaultLayout>
      <div className="card-group">
        {movies.map((movie) => {
          return (
            <div
              className="card mr-2"
              style={{ width: "200px", margin: "5px", border: "1px solid" }}
            >
              <img
                className="card-img-top"
                src={`https://movies-api-9eyb.onrender.com/${movie.poster}`}
                alt={movie.name}
                style={{ width: "100%" }}
              />
              <div className="card-body">
                <h5 className="card-title">{movie.name}</h5>
                <p className="card-text">{movie.description}</p>
              </div>
            </div>
          );
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
        errorCode: error,
      },
    };
  }
}

export default Movies;
