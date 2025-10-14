import Link from "next/link";
import { getReview } from "@/lib/reviews";
import { Post } from "@/types/reviews";
import { Button } from "@/components/ui/button";

interface ReviewPageProps {
  params: Promise<{
    uuid: string;
  }>;
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const { uuid } = await params;

  let post: Post = {
    uuid: "",
    restaurant: "",
    review: "",
  };
  let error = null;

  try {
    post = await getReview(uuid);
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load review";
  }

  if (error) {
    return (
      <main className="flex flex-col items-center p-8">
        <h1 className="text-2xl font-bold">Review Not Found</h1>
        <p className="mt-4">{error}</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center py-10 px-100">
      <h1 className="text-3xl font-bold">{post.restaurant}</h1>
      {post.created_at && (
        <p className="text-sm text-teal-400 mt-4">
          Reviewed on {new Date(post.created_at).toLocaleDateString("en-AU")}
        </p>
      )}
      <p className="text-teal-400 whitespace-pre-line mt-4">{post.review}</p>
      <Button asChild className="m-5" variant="outline">
        <Link href={`/reviews`}>More Reviews</Link>
      </Button>
    </main>
  );
}
