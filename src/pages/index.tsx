import styles from "../styles/Home.module.css";
import React from "react";
import Link from "next/link";
import { DefaultLayout } from "../components/layouts/DefaultLayout";

const Home = () => {
  return (
    <DefaultLayout>
      <h1 className={styles.title}>Welcome to Movies Api Client!</h1>

      <ul className="row justify-content-center w-50 mx-auto">
        <li className="p-2 row justify-content-center">
          <Link className="btn btn-outline-success" href="/auth/log-in">
            Sign in
          </Link>
        </li>
        <li className="p-2 row justify-content-center">
          <Link className="btn btn-outline-info" href="/auth/create-account">
            Create Account
          </Link>
        </li>
        <li className="p-2 row justify-content-center">
          <Link className="btn btn-outline-primary" href="/movies">
            Go to movies
          </Link>
        </li>
      </ul>
    </DefaultLayout>
  );
};

export default Home;
