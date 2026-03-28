import { createBrowserClient as createSupabaseBrowserClient } from "@supabase/ssr";

import { getSupabasePublicEnv } from "@/lib/supabase/env";

/** 클라이언트 컴포넌트용 Supabase 클라이언트 */
export function createBrowserClient() {
  const { url, anonKey } = getSupabasePublicEnv();
  return createSupabaseBrowserClient(url, anonKey);
}
