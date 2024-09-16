"use client";
import { FunctionComponent, useContext } from "react";
import { User } from "../../types";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppSelector } from "../../redux/hooks";

interface Props {
  user: User;
  onAddRoleClick: (id: number) => void;
}

export const UserItem: FunctionComponent<Props> = ({
  user,
  onAddRoleClick,
}) => {
  const currentUser = useAppSelector((state) => state.authReducer?.userData);
  const { username, email, id, permissions } = user;

  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-start">
      <div className="ms-2 me-auto h-100">
        <div className="fw-bold">{username}</div>
        {email}
        {currentUser?.permissions?.includes("edit user") && (
          <button
            type="button"
            className="btn btn-secondary d-block"
            data-bs-target="#exampleModal"
            onClick={() => id && onAddRoleClick(id)}
          >
            Add role
          </button>
        )}
      </div>
      {permissions && (
        <div className="d-flex">
          <p className="mr-3">User permissions:</p>
          <ul>
            {permissions.map((permission) => (
              <li key={permission}>{permission}</li>
            ))}
          </ul>
        </div>
      )}
    </ListGroup.Item>
  );
};
