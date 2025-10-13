import Link from "next/link";

interface Review {
  uuid: string;
  restaurant: string;
  review: string;
  created_at?: string;
}

interface ReviewCardProps {
  review: Review;
  className?: string;
  showDate?: boolean;
}

export default function ReviewCard({
  review,
  className = "",
  showDate = true,
}: ReviewCardProps) {
  return (
    <li
      className={`rounded-3xl border-2 border-teal-900 min-w-3xs hover:bg-gray-700 transition ${className}`}
    >
      <Link
        href={`/reviews/${review.uuid}`}
        className="block h-full w-full px-5 py-20 text-inherit no-underline"
      >
        <h2 className="text-xl font-bold">{review.restaurant}</h2>
        {showDate && review.created_at && (
          <p className="text-sm text-teal-400 mt-1">
            {new Date(review.created_at).toLocaleDateString()}
          </p>
        )}
      </Link>
    </li>
  );
}
