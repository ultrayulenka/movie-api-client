import { FunctionComponent, ReactNode } from "react";
import { DefaultLayout } from "../components/layouts/DefaultLayout";
import { cookies } from "next/headers";
import { User } from "../types";
import { getClientApiInstance } from "../utils/api";

interface Props {
  children: ReactNode;
}

async function getUserData(): Promise<{ userData: User | undefined }> {
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

export const ServerDefaultLayout: FunctionComponent<Props> = async ({
  children,
}) => {
  const userInfo = await getUserData();

  return <DefaultLayout user={userInfo.userData}>{children}</DefaultLayout>;
};
