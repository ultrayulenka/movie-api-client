import { FunctionComponent } from "react";
import { Review } from "../../types";
import ListGroup from "react-bootstrap/ListGroup";
import { StarRating } from "./StarRating";

interface Props {
  review: Review;
}

export const ReviewItem: FunctionComponent<Props> = ({ review }) => {
  const { createdAt, text, rate } = review;

  return (
    <ListGroup.Item className="mb-3">
      <p>{createdAt}</p>
      <p>{text}</p>
      <StarRating rate={rate} />
    </ListGroup.Item>
  );
};
