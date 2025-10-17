const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
import { Review } from "@/types/reviews";
import { supabase } from "@/utils/supabaseClient";

export async function getReviews(): Promise<Review[]> {
  // If running on the server (build/SSR), use Supabase client directly to avoid
  // making a network request to localhost which may not be available during build.
  if (typeof window === "undefined") {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error("Failed to fetch reviews: " + error.message);
    }

    return data ?? [];
  }

  const response = await fetch(`${BASE_URL}/api/reviews`, {
    next: { revalidate: 60 }, // Cache for 60 seconds
  });

  if (!response.ok) {
    throw new Error("Failed to fetch reviews");
  }

  const { data } = await response.json();
  return data;
}

export async function getReview(id: string): Promise<Review> {
  if (typeof window === "undefined") {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("uuid", id)
      .single();

    if (error) {
      throw new Error("Failed to fetch review: " + error.message);
    }

    return data as Review;
  }

  const response = await fetch(`${BASE_URL}/api/reviews/${id}`, {
    next: { revalidate: 60 }, // Cache for 60 seconds
  });

  if (!response.ok) {
    throw new Error("Failed to fetch review");
  }

  const { data } = await response.json();
  return data;
}

export async function getRecentReviews(limit: number = 3): Promise<Review[]> {
  if (typeof window === "undefined") {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      throw new Error("Failed to fetch recent reviews: " + error.message);
    }

    return data ?? [];
  }

  const response = await fetch(`${BASE_URL}/api/reviews?limit=${limit}`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch recent reviews");
  }

  const { data } = await response.json();
  return data;
}
