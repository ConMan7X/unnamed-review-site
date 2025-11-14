"use client";
import { useRouter } from "next/navigation";

export default function SortSelect({ sort }: { sort: string }) {
  const router = useRouter();

  const setSort = (newSort: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("sort", newSort);
    router.push(`/reviews?${searchParams.toString()}`);
  };

  return (
    <div
      data-cy="sort-by"
      className="space-x-2 mb-4 border border-gray-300 rounded-xl pl-4"
    >
      <label className="text-lrg font-medium mb-1">Sort reviews</label>
      <select
        name="selectedSort"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="
                  w-48
                  rounded-xl
                  bg-teal-900
                  p-1
                  px-3
                  text-white
                  shadow-sm
                  transition
                  ease-in-out
                  focus:border-purple-500
                  focus:ring-2
                  focus:ring-purple-400/40
                  hover:border-gray-400
                  cursor-pointer
                "
      >
        <option value="date">by Date</option>
        <option value="rating">by Rating</option>
        <option value="restaurantName">by Restaurant Name</option>
      </select>
    </div>
  );
}
