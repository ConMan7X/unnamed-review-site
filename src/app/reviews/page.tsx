import ReviewCardList from "@/components/ReviewCardList";
import { Button } from "@/components/ui/button";
import { getReviews } from "@/lib/reviews";
import { Review } from "@/types/reviews";
import Link from "next/link";

export default async function reviews() {
  let posts: Review[] = [];
  let error = null;

  try {
    posts = await getReviews();
  } catch (err) {
    console.error("Failed to load reviews:", err);
    error = err instanceof Error ? err.message : "Failed to load reviews";
  }

  return (
    <main className="flex flex-col items-center">
      <h1 className="text-3xl font-bold p-5">All Reviews</h1>

      {error ? (
        <div className="text-red-500 mb-4">Error: {error}</div>
      ) : (
        <ReviewCardList reviews={posts} />
      )}
      <Button asChild className="m-5" variant="outline">
        <Link href={`/`}>Back to Home</Link>
      </Button>
    </main>
  );
}
