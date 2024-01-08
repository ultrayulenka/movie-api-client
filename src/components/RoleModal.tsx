import { FunctionComponent, useContext, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ROLES = ["USER", "CONTRIBUTOR", "ADMIN"];

interface Props {
  show: boolean;
  title: string;
  isLoading?: boolean;
  onHide: () => void;
  onSubmit: (value: string) => void;
}

export const RoleModal: FunctionComponent<Props> = ({
  show,
  title,
  isLoading,
  onHide,
  onSubmit,
}) => {
  const [selected, setSelected] = useState("");

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title className="text-body">{title}</Modal.Title>
      </Modal.Header>
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(selected);
        }}
      >
        <Modal.Body className="text-body">
          {ROLES.map((role) => (
            <Form.Check
              label={role}
              name={role}
              type="radio"
              id={role}
              key={role}
              checked={selected === role}
              onChange={(event) => setSelected(role)}
              disabled={isLoading}
            />
          ))}
        </Modal.Body>
        <Modal.Footer>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <Button variant="secondary" onClick={onHide}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Add role
              </Button>
            </>
          )}
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
