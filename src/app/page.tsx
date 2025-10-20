import Link from "next/link";
import ReviewCardList from "../components/ReviewCardList";
import { getRecentReviews } from "../lib/reviews";
import { Review } from "@/types/reviews";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default async function Home() {
  let posts: Review[] = [];
  let error = null;

  try {
    posts = await getRecentReviews(4);
  } catch (err) {
    console.error("Failed to load reviews:", err);
    error = err instanceof Error ? err.message : "Failed to load reviews";
  }

  return (
    <main className="flex flex-col items-center p-8">
      <Image
        src="/connor_nicole.jpeg"
        alt="Image of Connor and Nicole"
        width={150}
        height={150}
        className="rounded-full object-cover aspect-square mb-2"
      />
      <h1 className="text-4xl font-bold mb-10">Connor and Nicole</h1>

      <div className="w-full max-w-6xl px-4">
        <h2 className="self-start text-2xl font-bold mb-4">Recent</h2>
        {error ? (
          <div className="text-red-500 mb-4">Error: {error}</div>
        ) : (
          <ReviewCardList reviews={posts} />
        )}
      </div>
      <Button asChild className="m-5" variant="outline">
        <Link href={`/reviews`}>More Reviews</Link>
      </Button>
    </main>
  );
}
