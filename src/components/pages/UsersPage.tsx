"use client";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useState, useMemo } from "react";
import { appContext } from "../../context/app";
import { User } from "../../types";
import { UsersList } from "../User/UsersList";
import { DefaultLayout } from "../layouts/DefaultLayout";

interface Props {
  users: Array<User>;
}

export default function UsersPage({ users }: Props) {
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
    <div className="pt-5">
      <UsersList
        users={filteredUsers}
        isLoading={isLoading}
        onChangeRoleSubmit={onSubmit}
      />
    </div>
  );
}
