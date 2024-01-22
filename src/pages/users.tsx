import { useContext, useMemo, useState } from "react";
import { DefaultLayout } from "../components/layouts/DefaultLayout";
import { User } from "../types";
import { getClientApiInstance } from "../utils/api";
import { Cookies } from "react-cookie";
import { appContext } from "../context/app";
import { RoleModal } from "../components/RoleModal";
import axios from "axios";
import { useRouter } from "next/navigation";
import { UsersList } from "../components/User/UsersList";

interface Props {
  users: Array<User>;
}

const Users = ({ users }: Props) => {
  const { user: currentUser } = useContext(appContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const filteredUsers = useMemo(
    () => users.filter((user) => user.id !== currentUser.id),
    [users]
  );

  const onSubmit = async (roleName: string, id: number): Promise<void> => {
    try {
      setIsLoading(true);

      await axios.patch(`/api/users/${id}`, {
        name: roleName,
      });

      setIsLoading(false);
      alert(`Success! Added ${roleName} role to user with id ${id}`);
      router.refresh();
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <div className="pt-5">
        <UsersList
          users={filteredUsers}
          isLoading={isLoading}
          onChangeRoleSubmit={onSubmit}
        />
      </div>
    </DefaultLayout>
  );
};

export async function getServerSideProps(context) {
  const cookies = new Cookies(context.req.headers.cookie);
  const api = getClientApiInstance(cookies);

  try {
    const users = (await api.get<Array<User>>("/users")).data;

    return {
      props: { users },
    };
  } catch (error) {
    return {
      props: {
        errorCode: error.response.status,
      },
    };
  }
}

export default Users;
