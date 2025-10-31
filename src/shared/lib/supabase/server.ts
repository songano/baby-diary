import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export const createClient = (cookieStore: ReturnType<typeof cookies>) => {
  return createServerClient(supabaseUrl!, supabaseKey!, {
    cookies: {
      async getAll() {
        const allCookies = await cookieStore;
        return allCookies.getAll();
      },
      async setAll(cookiesToSet) {
        try {
          const allCookies = await cookieStore;
          cookiesToSet.forEach(({ name, value, options }) => allCookies.set(name, value, options));
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
};
