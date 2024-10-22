import { User } from "../../types";
import UsersPage from "../../components/pages/UsersPage";
import { getClientApiInstance } from "../../utils/api";
import { cookies } from "next/headers";
import { ServerDefaultLayout } from "../ServerLayout";

export const dynamic = "force-dynamic";

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
    <ServerDefaultLayout>
      <UsersPage users={users || []} />
    </ServerDefaultLayout>
  );
}
