import { FunctionComponent, useState } from "react";
import { MovieModal } from "./MovieModal";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Props {}

export const CreateMovie: FunctionComponent<Props> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onHide = (): void => setIsModalOpen(false);
  const onShow = (): void => setIsModalOpen(true);
  const onSubmit = async (data: FormData): Promise<void> => {
    try {
      await axios.post(`/api/movies`, data);
      alert(`Success! Added movie`);
      router.refresh();
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <li className="nav-item">
        <button className="btn btn-outline-success" onClick={onShow}>
          Add new movie
        </button>
      </li>
      <MovieModal
        show={isModalOpen}
        onHide={onHide}
        title={"Add new movie"}
        isLoading={isLoading}
        onSubmit={onSubmit}
      />
    </>
  );
};
