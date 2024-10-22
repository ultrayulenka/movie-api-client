import styles from "../styles/Home.module.css";
import React from "react";
import Link from "next/link";
import { ServerDefaultLayout } from "./ServerLayout";
import UsersLink from "../components/UsersLink";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <ServerDefaultLayout>
      <h1 className={styles.title}>
        <br />
        Welcome to Movies Api Client!
      </h1>
      <ul className="row justify-content-center w-50 mx-auto">
        <li className="p-2 row justify-content-center">
          <Link className="btn btn-outline-primary" href="/movies">
            Go to movies
          </Link>
          <UsersLink />
        </li>
      </ul>
    </ServerDefaultLayout>
  );
}
