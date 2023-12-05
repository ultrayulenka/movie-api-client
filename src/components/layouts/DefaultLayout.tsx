import Head from "next/head";
import { FunctionComponent, ReactNode } from "react";
import styles from "../../styles/Home.module.css";
import { Header } from "../Header";

interface Props {
  children: ReactNode;
}

export const DefaultLayout: FunctionComponent<Props> = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Movies Client</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        {children}
      </main>
    </div>
  );
};
