import { useContext, useMemo, useState } from "react";
import { DefaultLayout } from "../components/layouts/DefaultLayout";
import { User } from "../types";
import { getClientApiInstance } from "../utils/api";
import { Cookies } from "react-cookie";
import { appContext } from "../context/app";
import { RoleModal } from "../components/RoleModal";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Props {
  users: Array<User>;
}

const Users = ({ users }: Props) => {
  const { user: currentUser } = useContext(appContext);
  const router = useRouter();
  const [showId, setShowId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const filteredUsers = useMemo(
    () => users.filter((user) => user.id !== currentUser.id),
    [users]
  );

  const onAddRoleClick = (id: number): void => setShowId(id);

  const handleClose = (): void => setShowId(0);

  const onSubmit = async (roleName: string): Promise<void> => {
    try {
      setIsLoading(true);

      await axios.patch(`/api/users/${showId}`, {
        name: roleName,
      });

      setIsLoading(false);
      alert(`Success! Added ${roleName} role to user with id ${showId}`);
      router.refresh();
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      handleClose();
    }
  };

  return (
    <DefaultLayout>
      <div className="pt-5">
        <ul className="list-group p-4">
          {filteredUsers?.map((user) => {
            return (
              <li
                className="list-group-item d-flex justify-content-between align-items-start"
                key={user.username}
              >
                <div className="ms-2 me-auto h-100">
                  <div className="fw-bold">{user.username}</div>
                  {user.email}
                  {currentUser?.permissions?.includes("edit user") && (
                    <button
                      type="button"
                      className="btn btn-secondary d-block"
                      data-bs-target="#exampleModal"
                      onClick={() => onAddRoleClick(user.id)}
                    >
                      Add role
                    </button>
                  )}
                </div>
                {user.permissions && (
                  <div className="d-flex">
                    <p className="mr-3">User permissions:</p>
                    <ul>
                      {user.permissions.map((permission) => (
                        <li key={permission}>{permission}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <RoleModal
        title={`Add role to user id ${showId}`}
        show={showId > 0}
        onHide={handleClose}
        onSubmit={async (value: string): Promise<void> => {
          await onSubmit(value);
        }}
        isLoading={isLoading}
      />
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
