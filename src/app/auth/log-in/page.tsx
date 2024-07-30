import { DefaultLayout } from "../../../components/layouts/DefaultLayout";
import { AuthInnerContent } from "../../../components/AuthForm";

const LogIn = () => {
  return (
    <DefaultLayout>
      <div className="row vh-100 m-0">
        <div className="col-6 p-0">
          <img
            src="/gifts-for-movie-lovers.webp"
            className="h-100 w-100 object-fit-cover"
            style={{ objectPosition: "left bottom" }}
          />
        </div>
        <div className="col-6 p-0">
          <AuthInnerContent type="log-in" />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default LogIn;