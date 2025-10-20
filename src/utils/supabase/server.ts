import { createServerClient, type CookieOptions } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const createClient = async (cookieStoreOrPromise: unknown) => {
  const cookieStore = await Promise.resolve(cookieStoreOrPromise);

  type CookieStoreLike = {
    getAll?:
      | (() => Promise<{ name: string; value: string }[] | null>)
      | (() => { name: string; value: string }[] | null);
    setAll?: (
      cookies: { name: string; value: string; options: CookieOptions }[]
    ) => Promise<void> | void;
    get?: (
      name: string
    ) => Promise<string | null | undefined> | string | null | undefined;
    set?: (
      name: string,
      value: string,
      options?: CookieOptions
    ) => Promise<void> | void;
    remove?: (name: string, options?: CookieOptions) => Promise<void> | void;
  };

  const store = cookieStore as CookieStoreLike | undefined;

  const getAll = async (): Promise<
    { name: string; value: string }[] | null
  > => {
    if (store?.getAll) {
      const maybe = store.getAll();
      const resolved = (await Promise.resolve(maybe as unknown)) as
        | { name: string; value: string }[]
        | null
        | undefined;
      if (!resolved) return null;
      return resolved.map((c) => ({
        name: String(c.name),
        value: String(c.value ?? ""),
      }));
    }
    return [];
  };

  const setAll = async (
    cookiesToSet: { name: string; value: string; options: CookieOptions }[]
  ) => {
    try {
      if (store?.set) {
        for (const c of cookiesToSet) {
          if (c.value) {
            await Promise.resolve(store.set(c.name, c.value, c.options));
          } else if (store.remove) {
            await Promise.resolve(store.remove(c.name, c.options));
          }
        }
        return;
      }

      if (store?.setAll) {
        await Promise.resolve(store.setAll(cookiesToSet));
        return;
      }
    } catch {
      // ignore
    }
  };

  return createServerClient<Database, "public">(supabaseUrl!, supabaseKey!, {
    cookies: { getAll, setAll },
  }) as SupabaseClient<Database, "public">;
};
