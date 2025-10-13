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
  layout = "flex",
}: ReviewCardListProps) {
  const layoutClass =
    layout === "grid"
      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      : "flex space-x-4";

  return (
    <ul className={`${layoutClass} ${className}`}>
      {reviews.map((review) => (
        <ReviewCard key={review.uuid} review={review} showDate={showDates} />
      ))}
    </ul>
  );
}
