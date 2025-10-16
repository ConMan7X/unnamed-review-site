import ReviewCard from "./ReviewCard";

interface Review {
  uuid: string;
  restaurant: string;
  review: string;
  created_at?: string;
}

interface ReviewCardListProps {
  reviews: Review[];
  className?: string;
  showDates?: boolean;
  layout?: "flex" | "grid";
}

export default function ReviewCardList({
  reviews,
  className = "",
  showDates = true,
}: ReviewCardListProps) {
  return (
    <ul
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ${className}`}
    >
      {reviews.map((review) => (
        <ReviewCard key={review.uuid} review={review} showDate={showDates} />
      ))}
    </ul>
  );
}
