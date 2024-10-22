"use client";
import { FunctionComponent, useState } from "react";
import { MovieModal } from "./MovieModal";
import axios from "axios";
import { useRouter } from "next/navigation";
import { PencilSquare } from "react-bootstrap-icons";
import { Movie } from "../../types";

interface Props {
  movie: Movie;
  variant?: "dark" | "light";
}

export const EditMovie: FunctionComponent<Props> = ({
  movie,
  variant = "dark",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onHide = (): void => setIsModalOpen(false);
  const onShow = (): void => setIsModalOpen(true);
  const onSubmit = async (data: FormData): Promise<void> => {
    try {
      await axios.patch(`/api/movies/${movie.id}`, data);
      alert(`Success! Updated "${movie.name}" movie`);
      router.refresh();
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <button className="bg-transparent border-0 mr-3" onClick={onShow} aria-label="Edit">
        <PencilSquare
          size={24}
          className={variant === "dark" ? "text-black" : "text-white"}
        />
      </button>
      <MovieModal
        show={isModalOpen}
        onHide={onHide}
        title={`Update movie: ${movie.name}`}
        isLoading={isLoading}
        onSubmit={onSubmit}
        movie={movie}
      />
    </>
  );
};
