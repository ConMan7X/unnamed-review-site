import { supabase } from "../../../utils/supabaseClient";

interface ReviewPageProps {
  params: {
    id: string;
  };
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const { id } = await params;

  const { data: post } = await supabase
    .from("reviews")
    .select("*")
    .eq("id", id)
    .single();

  if (!post) {
    return <div>Review not found</div>;
  }

  return (
    <main className="flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold">{post.restaurant}</h1>
      <p className="text-gray-600 mt-4">{post.review}</p>
      {post.created_at && (
        <p className="text-sm text-gray-400 mt-4">
          Reviewed on {new Date(post.created_at).toLocaleDateString()}
        </p>
      )}
    </main>
  );
}