import { useContext, useMemo, useState } from "react";
import { User } from "../../types";
import { appContext } from "../../context/app";
import { useRouter } from "next/router";
import axios from "axios";
import { DefaultLayout } from "../../components/layouts/DefaultLayout";
import { UsersList } from "../../components/User/UsersList";

interface Props {
  users: Array<User>;
}

export default function Users({ users }: Props) {
  const { user: currentUser } = useContext(appContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const filteredUsers = useMemo(
    () => users.filter((user) => currentUser && user.id !== currentUser.id),
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
      router.reload();
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
}
