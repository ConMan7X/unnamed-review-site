import { createServerClient } from "@supabase/ssr";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Helper for middleware: returns a Supabase server client plus a NextResponse
 * that the caller can return (so cookies set by Supabase are written on the
 * outgoing response). Do not attempt to mutate the incoming request object.
 */
export function createMiddlewareSupabase(request: NextRequest) {
  const response = NextResponse.next();

  const supabase = createServerClient(supabaseUrl!, supabaseKey!, {
    cookies: {
      getAll() {
        // Read cookies from the incoming request
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        // Write cookies to the response so they are sent to the client
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  return { supabase, response } as const;
}

export default createMiddlewareSupabase;

export async function middleware(request: NextRequest) {
  // create the Supabase server client + response that will carry cookies
  const { supabase, response } = createMiddlewareSupabase(request);

  // Optional: refresh/check session here so Supabase sets cookies on response
  // If you only need the helper for other server code, you can remove this.
  try {
    // getSession will read cookies from request and may call supabase session refresh logic
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      // handle or log if you want, but don't expose secrets
      console.log("supabase auth.getSession error:", error.message);
    } else {
      // `data.session` contains the session (or null)
      // You can use session info to rewrite or set headers:
      // e.g. if (!data.session) return NextResponse.redirect('/login');
    }
  } catch (err) {
    console.error("supabase session check failed", err);
  }

  // Return the response so cookies set by Supabase are included in the outgoing response
  return response;
}

// Optionally scope middleware:
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
