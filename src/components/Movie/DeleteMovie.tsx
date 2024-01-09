import { FunctionComponent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {  Trash } from "react-bootstrap-icons";
import { Movie } from "../../types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

interface Props {
  movie: Movie;
}

export const DeleteMovie: FunctionComponent<Props> = ({ movie }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const onHide = (): void => setIsModalOpen(false);
  const onShow = (): void => setIsModalOpen(true);
  const onSubmit = async (): Promise<void> => {
    try {
      await axios.delete(`/api/movies/${movie.id}`);

      router.refresh();
    } catch (error) {
      console.error(error);
      onHide();
    }
  };

  return (
    <>
      <button className="bg-transparent border-0" onClick={onShow}>
        <Trash size={24} />
      </button>
      <Modal show={isModalOpen} onHide={onHide} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title className="text-body">Are you sure you want to delete movie "{movie.name}"?</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-body">You are about to delete movie. Note: This action is irreversable</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
