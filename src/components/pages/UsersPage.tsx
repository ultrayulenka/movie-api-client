"use client";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useMemo } from "react";
import { User } from "../../types";
import { UsersList } from "../User/UsersList";
import { useAppSelector } from "../../redux/hooks";

interface Props {
  users: Array<User>;
}

export default function UsersPage({ users }: Props) {
  const currentUser = useAppSelector((state) => state.authReducer?.userData);
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
