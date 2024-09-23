import { FunctionComponent } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { Movie } from "../../types";

interface Props {
  show: boolean;
  title: string;
  isLoading?: boolean;
  movie?: Movie;
  onHide: () => void;
  onSubmit?: (data: FormData) => void;
}

export const MovieModal: FunctionComponent<Props> = ({
  show,
  title,
  isLoading,
  movie,
  onHide,
  onSubmit,
}) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title className="text-body">{title}</Modal.Title>
      </Modal.Header>
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.target as HTMLFormElement);
          onSubmit && onSubmit(data);
        }}
      >
        <Modal.Body className="text-body">
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter movie name"
              name="name"
              defaultValue={movie?.name || ""}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              name="description"
              defaultValue={movie?.description || ""}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="genre">
            <Form.Label>Genre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter genre"
              name="genre"
              defaultValue={movie?.genre || ""}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="year">
            <Form.Label>Year of release</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter year"
              min="1900"
              max="2099"
              name="year"
              defaultValue={movie?.year}
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Poster</Form.Label>
            <Form.Control type="file" name="poster" />
          </Form.Group>
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
                Send
              </Button>
            </>
          )}
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
