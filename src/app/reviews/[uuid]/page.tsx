import Link from "next/link";
import Image from "next/image";
import { getReview } from "@/lib/reviews";
import { Review } from "@/types/reviews";
import { Rating } from "@/types/reviews";
import { Button } from "@/components/ui/button";

interface ReviewPageProps {
  params: Promise<{
    uuid: string;
  }>;
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const { uuid } = await params;

  let review: Review = {
    uuid: "",
    restaurant: "",
    review: "",
    created_at: "",
    rating: Rating.BAD,
  };
  let error = null;

  try {
    review = await getReview(uuid);
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load review";
  }

  if (error) {
    return (
      <main className="flex flex-col items-center p-8 pt-24">
        <h1 className="text-2xl font-bold">Review Not Found</h1>
        <p className="mt-4">{error}</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center py-10 pt-5 w-full min-h-screen">
      <div className="w-full max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center">{review.restaurant}</h1>
        {review.created_at && (
          <p className="text-sm text-teal-400 m-4 text-center">
            Reviewed on{" "}
            {new Date(review.created_at).toLocaleDateString("en-AU")}
          </p>
        )}
        {review.image_url && (
          <div className="relative h-128 w-full">
            <Image
              src={review.image_url}
              alt={`${review.restaurant} - Food`}
              fill
              className="object-cover rounded-3xl"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <p className="text-teal-400 whitespace-pre-line mt-4">
          {review.review}
        </p>
        <div className="flex justify-center">
          <Button asChild className="m-5" variant="outline">
            <Link href={`/reviews`}>More Reviews</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
