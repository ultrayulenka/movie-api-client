import { AuthInnerContent } from "../../../components/AuthForm";
import { ServerDefaultLayout } from "../../ServerLayout";

export const dynamic = "force-dynamic";

const LogIn = () => {
  return (
    <ServerDefaultLayout>
      <div className="row vh-100 m-0">
        <div className="col-6 p-0">
          <img
            src="/gifts-for-movie-lovers.webp"
            className="h-100 w-100 object-fit-cover"
            style={{ objectPosition: "left bottom" }}
            alt="Movies Client Background"
          />
        </div>
        <div className="col-6 p-0">
          <AuthInnerContent type="log-in" />
        </div>
      </div>
    </ServerDefaultLayout>
  );
};

export default LogIn;
