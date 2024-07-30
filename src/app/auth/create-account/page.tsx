import { DefaultLayout } from "../../../components/layouts/DefaultLayout";
import { AuthInnerContent } from "../../../components/AuthForm";

const CreateAccount = () => {
  return (
    <DefaultLayout>
      <div className="row vh-100 m-0">
        <div className="col-6 p-0">
          <img
            src="/5b314f5a8ad148088f668d26_movies.jpeg"
            className="h-100 w-100 object-fit-cover"
            style={{ objectPosition: "left bottom" }}
          />
        </div>
        <div className="col-6 p-0">
          <AuthInnerContent type="create-account" />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CreateAccount;
