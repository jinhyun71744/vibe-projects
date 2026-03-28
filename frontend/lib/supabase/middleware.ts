import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { User } from "@supabase/supabase-js";

import { getSupabasePublicEnv } from "@/lib/supabase/env";

/**
 * 세션 쿠키를 갱신하고 검증된 사용자 정보를 함께 반환합니다.
 * 미들웨어에서 한 번만 호출하세요.
 */
export async function updateSession(request: NextRequest): Promise<{
  response: NextResponse;
  user: User | null;
}> {
  let supabaseResponse = NextResponse.next({ request });

  const { url, anonKey } = getSupabasePublicEnv();

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  let user: User | null = null;
  try {
    const {
      data: { user: u },
      error,
    } = await supabase.auth.getUser();
    if (!error) {
      user = u ?? null;
    }
  } catch {
    /* Supabase 연결 실패 시 미들웨어 전체가 깨지지 않도록 세션 없음으로 진행 */
    user = null;
  }

  return { response: supabaseResponse, user };
}
