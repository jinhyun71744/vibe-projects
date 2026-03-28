import { createBrowserClient as createSupabaseBrowserClient } from "@supabase/ssr";

function getSupabaseBrowserEnv(): { url: string; anonKey: string } {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error(
      "Supabase 환경 변수가 없습니다. frontend/.env.local에 NEXT_PUBLIC_SUPABASE_URL과 NEXT_PUBLIC_SUPABASE_ANON_KEY를 설정하세요."
    );
  }
  return { url, anonKey };
}

/** 클라이언트 컴포넌트용 Supabase 클라이언트 */
export function createBrowserClient() {
  const { url, anonKey } = getSupabaseBrowserEnv();
  return createSupabaseBrowserClient(url, anonKey);
}
