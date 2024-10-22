import "./global.css";
import "bootstrap/dist/css/bootstrap.css";
import ClientLayout from "./client-layout";
import { cookies } from "next/headers";
import { User } from "../types";
import { getClientApiInstance } from "../utils/api";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Movies API Client",
  description:
    "Movies API Client is Next.js app that serves as a client for Movies API",
  icons: "/movie-icon.ico",
};

async function getData(): Promise<{ userData: User | undefined }> {
  const cookiesValue = cookies();
  const api = getClientApiInstance(cookiesValue);
  let userData: User | undefined = undefined;

  try {
    const apiData = await api.get<User>("/auth/");
    userData = apiData.data;
  } catch (error) {
    console.log("error");
  }

  return { userData };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userInfo = await getData();

  return (
    <html lang="en">
      <body>
        <ClientLayout user={userInfo.userData}>{children}</ClientLayout>
      </body>
    </html>
  );
}
