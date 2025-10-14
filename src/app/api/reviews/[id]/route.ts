import { NextResponse } from "next/server";
import { supabase } from "../../../../utils/supabaseClient";

interface Context {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: Request, { params }: Context) {
  try {
    const { id } = await params;

    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("uuid", id)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
