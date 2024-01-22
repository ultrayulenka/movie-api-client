import { FunctionComponent, useState } from "react";
import { User } from "../../types";
import ListGroup from "react-bootstrap/ListGroup";
import { RoleModal } from "../RoleModal";
import { UserItem } from "./UserItem";

interface Props {
  users: Array<User>;
  isLoading?: boolean;
  onChangeRoleSubmit: (roleName: string, id: number) => Promise<void>;
}

export const UsersList: FunctionComponent<Props> = ({
  users,
  isLoading,
  onChangeRoleSubmit,
}) => {
  const [showId, setShowId] = useState(0);

  const onAddRoleClick = (id: number): void => setShowId(id);

  const handleClose = (): void => setShowId(0);

  return (
    <>
      <ListGroup className="p-4">
        {users?.map((user) => {
          return <UserItem user={user} onAddRoleClick={onAddRoleClick} />;
        })}
      </ListGroup>

      <RoleModal
        title={`Add role to user id ${showId}`}
        show={showId > 0}
        onHide={handleClose}
        onSubmit={async (value: string): Promise<void> => {
          await onChangeRoleSubmit(value, showId);
          handleClose();
        }}
        isLoading={isLoading}
      />
    </>
  );
};
