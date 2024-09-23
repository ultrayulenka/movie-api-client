import { FunctionComponent } from "react";
import { Star, StarFill } from "react-bootstrap-icons";

interface Props {
  rate: number;
}

export const StarRating: FunctionComponent<Props> = ({ rate }) => {
  return (
    <div>
      {[...Array(10)].map((_item, index) => {
        const rest = rate - index - 1;

        if (rest >= 0) {
          return <StarFill className="text-warning" key={index} />;
        }

        return <Star className="text-warning" key={index} />;
      })}
    </div>
  );
};
