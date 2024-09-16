"use client";
import styles from "../styles/Home.module.css";
import React from "react";
import Link from "next/link";
import { DefaultLayout } from "../components/layouts/DefaultLayout";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";

export default function Home() {
  const userData = useAppSelector(
    (state: RootState) => state.authReducer?.userData
  );

  return (
    <DefaultLayout>
      <h1 className={styles.title}>
        <br />
        Welcome to Movies Api Client!
      </h1>
      <ul className="row justify-content-center w-50 mx-auto">
        <li className="p-2 row justify-content-center">
          <Link className="btn btn-outline-primary" href="/movies">
            Go to movies
          </Link>
          {userData?.permissions?.includes("view user") && (
            <Link className="btn btn-outline-info mt-3" href="/users">
              Go to users
            </Link>
          )}
        </li>
      </ul>
    </DefaultLayout>
  );
}
