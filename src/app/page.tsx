"use client";

import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import ReviewCardList from "../components/ReviewCardList";

interface Post {
  uuid: string;
  restaurant: string;
  review: string;
  created_at?: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadRecentPosts() {
    try {
      setLoading(true);
      setError(null);

      console.log("Starting to fetch posts...");

      const { data, error, status, statusText } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);
      console.log("Supabase response:", { data, error, status, statusText });

      if (error) {
        console.error("Supabase error details:", error);
        setError(`Error: ${error.message} (${error.details})`);
        return;
      }

      if (!data) {
        console.log("No data returned from query");
        setPosts([]);
        return;
      }

      console.log(`Fetched ${data.length} posts:`, data);
      setPosts(data);
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("Failed to load posts");
    } finally {
      setLoading(false);
    }
  }

  // Load posts once at start
  useEffect(() => {
    loadRecentPosts();
  }, []);

  if (loading) {
    return (
      <main className="flex flex-col items-center p-8">
        <div className="animate-pulse">Loading reviews...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex flex-col items-center p-8">
        <div className="text-red-500 mb-4">Error: {error}</div>
        <button
          onClick={loadRecentPosts}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center p-8">
      <h1 className="text-2xl font-bold">NCSFood</h1>
      <p className="p-5">Connor and Nicole food review website</p>

      <ReviewCardList reviews={posts} />
    </main>
  );
}
