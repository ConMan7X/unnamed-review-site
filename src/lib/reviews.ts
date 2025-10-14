const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export interface Review {
  uuid: string;
  restaurant: string;
  review: string;
  created_at?: string;
}

export async function getReviews(): Promise<Review[]> {
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
  const response = await fetch(`${BASE_URL}/api/reviews?limit=${limit}`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch recent reviews");
  }

  const { data } = await response.json();
  return data;
}
