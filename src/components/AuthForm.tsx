import {
  ChangeEventHandler,
  FormEventHandler,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { useCookies, Cookies } from "react-cookie";
import { useApi } from "../hooks/useApi";
import Link from "next/link";

type AuthFormType = "log-in" | "create-account";

const AuthUlr: Record<AuthFormType, string> = {
  "log-in": "/auth/signin",
  "create-account": "/auth/signup",
};

interface Props {
  type: AuthFormType;
}

interface AuthFormProps {
  email: string;
  password: string;
  username?: string;
  onEmailChange: ChangeEventHandler<HTMLInputElement>;
  onPasswordChange: ChangeEventHandler<HTMLInputElement>;
  onUsernameChange?: ChangeEventHandler<HTMLInputElement>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  showUsernameField?: boolean;
}

const AuthInnerContent: FunctionComponent<Props> = ({ type }) => {
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [isServerError, setIsServerError] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [cookies] = useCookies(["userId"]);
  const clientCookies = new Cookies(cookies);
  const api = useApi(clientCookies);

  if (isServerError) {
    return (
      <div className="px-5 py-3">
        <h1>There is an error</h1>
      </div>
    );
  }

  if (isFormSubmitted) {
    const h1Text =
      type === "log-in" ? `Welcome back, ${email}!` : `Hi, ${username}`;
    const text =
      type === "log-in"
        ? "You`ve successfully signed in"
        : "You`ve successfully created account";
    return (
      <div className="px-5 py-3 d-flex justify-content-center flex-column h-50">
        <h1>{h1Text}</h1>
        <p>{text}</p>
        <Link href="/movies" className="btn btn-primary w-100">
          Go to Movies page
        </Link>
      </div>
    );
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const payload =
      type === "log-in"
        ? { email, password }
        : {
            username,
            email,
            password,
          };
    try {
      const res = await api.post<{
        token: string;
      }>(AuthUlr[type], payload);
      clientCookies.set("userId", res.data.token);

      setIsFormSubmitted(true);
    } catch {
      setIsServerError(true);
    }
  };

  const onEmailChange = (event) => setEmail(event.target.value);
  const onPasswordChange = (event) => setPassword(event.target.value);
  const onUsernameChange = (event) => setUsername(event.target.value);

  const h1Text =
    type === "log-in" ? "Welcome back!" : "Welcome to Movies Api Client!";
  const text =
    type === "log-in"
      ? "Please enter your details below to sign in"
      : "Please enter your details below to create new account.\nUsername should be unique.";

  return (
    <div className="px-5 py-3 d-flex justify-content-center flex-column">
      <h1>{h1Text}</h1>
      <p>{text}</p>
      <AuthForm
        email={email}
        password={password}
        username={username}
        onUsernameChange={onUsernameChange}
        onEmailChange={onEmailChange}
        onPasswordChange={onPasswordChange}
        onSubmit={onSubmit}
        showUsernameField={type === "create-account"}
      />
    </div>
  );
};

const AuthForm: FunctionComponent<AuthFormProps> = ({
  email,
  password,
  username,
  onUsernameChange,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  showUsernameField,
}) => {
  return (
    <form className="w-75" onSubmit={onSubmit}>
      {showUsernameField && (
        <div className="mb-3">
          <label htmlFor="inputUsername" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="inputUsername"
            aria-describedby="username"
            onChange={onUsernameChange}
            value={username}
          />
          <div id="username" className="form-text">
            Choose unique username, please limit it to 30 characters.
          </div>
        </div>
      )}
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          onChange={onEmailChange}
          value={email}
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          onChange={onPasswordChange}
          value={password}
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Submit
      </button>
    </form>
  );
};

export { AuthInnerContent };
