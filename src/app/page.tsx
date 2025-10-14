import Link from "next/link";
import ReviewCardList from "../components/ReviewCardList";
import { getRecentReviews } from "../lib/reviews";
import { Post } from "@/types/reviews";
import { Button } from "@/components/ui/button";

export default async function Home() {
  let posts: Post[] = [];
  let error = null;

  try {
    posts = await getRecentReviews(3);
  } catch (err) {
    console.error("Failed to load reviews:", err);
    error = err instanceof Error ? err.message : "Failed to load reviews";
  }

  return (
    <main className="flex flex-col items-center p-8">
      <h1 className="text-2xl font-bold">NCSFood</h1>
      <p className="p-5">Connor and Nicole food review website</p>

      {error ? (
        <div className="text-red-500 mb-4">Error: {error}</div>
      ) : (
        <ReviewCardList reviews={posts} />
      )}
      <Button asChild className="m-5" variant="outline">
        <Link href={`/reviews`}>More Reviews</Link>
      </Button>
    </main>
  );
}
