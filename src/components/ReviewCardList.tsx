import ReviewCard from "./ReviewCard";
import { Review } from "@/types/reviews";

interface ReviewCardListProps {
  reviews: Review[];
  className?: string;
  showDates?: boolean;
  layout?: "flex" | "grid";
}

export default function ReviewCardList({
  reviews,
  className = "",
}: ReviewCardListProps) {
  return (
    <ul
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ${className}`}
    >
      {reviews.map((review) => (
        <ReviewCard key={review.uuid} review={review} />
      ))}
    </ul>
  );
}
