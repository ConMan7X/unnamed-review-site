import Link from "next/link";
import { supabase } from "../../../utils/supabaseClient";

interface ReviewPageProps {
  params: {
    uuid: string;
  };
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const { uuid } = await params;

  const { data: post } = await supabase
    .from("reviews")
    .select("*")
    .eq("uuid", uuid)
    .single();

  if (!post) {
    return <div>Review not found</div>;
  }

  return (
    <main className="flex flex-col items-center py-10 px-100">
      <h1 className="text-3xl font-bold">{post.restaurant}</h1>
      {post.created_at && (
        <p className="text-sm text-teal-400 mt-4">
          Reviewed on {new Date(post.created_at).toLocaleDateString()}
        </p>
      )}
      <p className="text-teal-400 whitespace-pre-line mt-4">{post.review}</p>
      <Link href={`/`} className="hover:bg-gray-700">
        Back to Home
      </Link>
    </main>
  );
}
