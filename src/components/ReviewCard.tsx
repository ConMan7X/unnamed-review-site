import Link from "next/link";
import Image from "next/image";
import { Review } from "@/types/reviews";

interface ReviewCardProps {
  review: Review;
  className?: string;
  showDate?: boolean;
}

export default function ReviewCard({
  review,
  className = "",
}: ReviewCardProps) {
  return (
    <li
      data-cy="review-card"
      className={`rounded-3xl border-2 border-teal-900 min-w-3xs hover:bg-gray-700 transition ${className}`}
    >
      <Link
        href={`/reviews/${review.uuid}`}
        className="block h-full w-full no-underline"
      >
        {review.image_url && (
          <div className="relative h-48 w-full">
            <Image
              src={review.image_url}
              alt={`${review.restaurant} - Food`}
              fill
              className="object-cover rounded-3xl"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        <div className="m-5">
          <h2 className="text-xl font-bold">{review.restaurant}</h2>
          <p className="text-sm text-teal-400 mt-1">
            {new Date(review.created_at).toLocaleDateString("en-AU")}
          </p>
        </div>
      </Link>
    </li>
  );
}
