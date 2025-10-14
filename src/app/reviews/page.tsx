import ReviewCardList from "@/components/ReviewCardList";
import { getReviews } from "@/lib/reviews";
import { Post } from "@/types/reviews";

export default async function reviews() {
  let posts: Post[] = [];
  let error = null;

  try {
    posts = await getReviews();
  } catch (err) {
    console.error("Failed to load reviews:", err);
    error = err instanceof Error ? err.message : "Failed to load reviews";
  }

  return (
    <main className="flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold p-5">All Reviews</h1>

      {error ? (
        <div className="text-red-500 mb-4">Error: {error}</div>
      ) : (
        <ReviewCardList reviews={posts} />
      )}
    </main>
  );
}
