import { FunctionComponent, useContext } from "react";
import { Film, PersonCircle } from "react-bootstrap-icons";
import { appContext } from "../context/app";
import Link from "next/link";
import { CreateMovie } from "./Movie/CreateMovieBtn";

export const Header: FunctionComponent = () => {
  const { user } = useContext(appContext);

  return (
    <nav
      className="navbar navbar-light header position-fixed w-100"
      style={{ zIndex: 10 }}
    >
      <ul className="navbar-nav flex-row mr-auto align-items-center">
        {user ? (
          <>
            <li className="nav-item inline-block">
              Hi, {user.username || user.email}
            </li>
            {user.permissions?.includes("create movies") && <CreateMovie />}
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link className="btn btn-outline-success" href="/auth/log-in">
                Sign in
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="btn btn-outline-info"
                href="/auth/create-account"
              >
                Create Account
              </Link>
            </li>
          </>
        )}
      </ul>
      <Link className="navbar-brand" href="/">
        <Film size={24} color="beige" />
      </Link>
    </nav>
  );
};
