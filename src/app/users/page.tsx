import { User } from "../../types";
import { DefaultLayout } from "../../components/layouts/DefaultLayout";
import UsersPage from "../../components/pages/UsersPage";
import { getClientApiInstance } from "../../utils/api";
import { cookies } from "next/headers";

async function getData(): Promise<{
  users?: Array<User>;
  errorCode?: string;
}> {
  const api = getClientApiInstance(cookies());

  try {
    const users = (await api.get<Array<User>>("/users")).data;

    return {
      users,
    };
  } catch (error) {
    return {
      errorCode: error.response.status,
    };
  }
}

export default async function Users() {
  const { users } = await getData();

  return (
    <DefaultLayout>
      <UsersPage users={users || []} />
    </DefaultLayout>
  );
}
