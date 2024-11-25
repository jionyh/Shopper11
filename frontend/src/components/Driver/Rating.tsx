import { Star } from "lucide-react";

type RatingProps = { rating: number };
export const Rating = ({ rating = 0 }: RatingProps) => {
  const totalStars = 5;
  const getStars = () => {
    return Array.from({ length: totalStars }, (_, index) => {
      return index < rating ? (
        <Star key={index} className="fill-amber-400" size={12} />
      ) : (
        <Star key={index} size={12} />
      );
    });
  };

  return <div className="flex text-amber-400">{getStars()}</div>;
};
