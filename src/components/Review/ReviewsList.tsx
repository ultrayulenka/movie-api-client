import { FunctionComponent } from "react";
import { Review } from "../../types";
import ListGroup from "react-bootstrap/ListGroup";
import { ReviewItem } from "./ReviewItem";

interface Props {
  reviews: Array<Review>;
}

export const ReviewsList: FunctionComponent<Props> = ({ reviews }) => {
  return (
    <>
      <h3>Reviews </h3>
      {reviews?.length ? (
        <ListGroup>
          {reviews.map((review) => (
            <ReviewItem review={review} key={review.id} />
          ))}
        </ListGroup>
      ) : (
        <p>No reviews</p>
      )}
    </>
  );
};
