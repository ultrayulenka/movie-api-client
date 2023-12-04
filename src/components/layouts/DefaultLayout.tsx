import Head from "next/head";
import { FunctionComponent, ReactNode } from "react";
import styles from "../../styles/Home.module.css";

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

      <main>{children}</main>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
        ul {
          list-style: none;
        }
      `}</style>
    </div>
  );
};
