import {
  FormEvent,
  FunctionComponent,
  MouseEventHandler,
  useState,
} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Movie } from "../../types";
import { Button, Form, Modal } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";

interface Props {
  movie: Movie;
}

export const AddReview: FunctionComponent<Props> = ({
  movie,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const router = useRouter();

  const onHide = (): void => setIsModalOpen(false);
  const onShow = (): void => setIsModalOpen(true);
  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const text = formData.get("review");

    try {
      await axios.post(`/api/movies/${movie.id}/review`, {
        rate: rating,
        text,
      });

      alert(`Success! Added review`);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const onSetRating: MouseEventHandler<HTMLInputElement> = (event) => {
    const input = event.target as HTMLInputElement;
    setRating(Number(input.value));
  };

  return (
    <>
      <Button className="mt-3" onClick={onShow}>
        Add review
      </Button>
      <Modal show={isModalOpen} onHide={onHide} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title className="text-body">
            Add review to "{movie.name}"
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={onSubmit}>
          <Modal.Body className="text-body">
            <Form.Group className="mb-3" controlId="rating">
              <Form.Label>Rating</Form.Label>
              <div className="d-flex">
                {[...Array(10)].map((_item, index) => {
                  return (
                    <div key={index}>
                      <input
                        type="radio"
                        id={`star${index}`}
                        name="rating"
                        value={index + 1}
                        className="invisible"
                        onClick={onSetRating}
                        checked={index + 1 <= rating}
                        readOnly
                      />
                      <label
                        htmlFor={`star${index}`}
                        title="Awesome"
                        aria-hidden="true"
                        style={{ cursor: "pointer" }}
                      >
                        <StarFill
                          className={index + 1 <= rating && "text-warning"}
                        />
                      </label>
                    </div>
                  );
                })}
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Review</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Enter review"
                name="review"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Add review
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
