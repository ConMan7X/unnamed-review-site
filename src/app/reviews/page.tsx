import ReviewCardList from "@/components/ReviewCardList";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SortSelect from "@/components/SortSelect";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export default async function Reviews(props: {
  searchParams: Promise<{ sort?: string }>;
}) {
  const searchParams = await props.searchParams;
  const sort = searchParams.sort ?? "date";

  const res = await fetch(`${BASE_URL}/api/reviews?sort=${sort}`, {
    cache: "no-store",
  });
  const { data } = await res.json();

  return (
    <main className="flex flex-col items-center">
      <h1 className="text-3xl font-bold p-5">All Reviews</h1>

      <SortSelect sort={sort} />

      <ReviewCardList reviews={data} />

      <Button asChild className="m-5" variant="outline">
        <Link href={`/`}>Back to Home</Link>
      </Button>
    </main>
  );
}
