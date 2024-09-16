"use client";
import { FunctionComponent } from "react";
import { Film } from "react-bootstrap-icons";
import Link from "next/link";
import { CreateMovie } from "./Movie/CreateMovieBtn";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Button } from "react-bootstrap";
import { logOut } from "../redux/features/auth-slice";

export const Header: FunctionComponent = () => {
  const user = useAppSelector((state) => state.authReducer?.userData);
  const dispatch = useAppDispatch();

  const onLogOutClick = () => dispatch(logOut());

  return (
    <nav
      className="navbar navbar-light header position-fixed w-100 p-2"
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
      <div>
        {user && (
          <Button className="nav-item" onClick={onLogOutClick}>
            Log out
          </Button>
        )}
        <Link className="navbar-brand" href="/">
          <Film size={24} color="beige" />
        </Link>
      </div>
    </nav>
  );
};
