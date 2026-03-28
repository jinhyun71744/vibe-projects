/**
 * NEXT_PUBLIC_* Supabase 설정을 읽고 공백·형식을 정리합니다.
 * 잘못된 URL은 조기에 잡아 "Failed to fetch"만 보이는 상황을 줄입니다.
 */
export function getSupabasePublicEnv(): { url: string; anonKey: string } {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!url || !anonKey) {
    throw new Error(
      "Supabase 환경 변수가 없습니다. frontend/.env.local에 NEXT_PUBLIC_SUPABASE_URL과 NEXT_PUBLIC_SUPABASE_ANON_KEY를 설정하세요."
    );
  }

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL이 올바른 URL 형식이 아닙니다. 대시보드 Settings → API의 Project URL을 따옴표 없이 복사했는지 확인하세요."
    );
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL은 http:// 또는 https:// 로 시작해야 합니다.");
  }

  /* legacy anon JWT(eyJ…) 또는 신형 publishable(sb_publishable_…) — https://supabase.com/docs/guides/api/api-keys */
  const legacyJwt = anonKey.startsWith("eyJ") && anonKey.length >= 80;
  const publishable =
    anonKey.startsWith("sb_publishable_") && anonKey.length >= 30;
  if (!legacyJwt && !publishable) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_ANON_KEY 형식이 맞지 않습니다. 대시보드 Settings → API에서 **anon public**(JWT, eyJ로 시작) 또는 **publishable**(sb_publishable_로 시작) 키를 그대로 복사했는지 확인하세요."
    );
  }

  const normalizedUrl = url.replace(/\/+$/, "");

  return { url: normalizedUrl, anonKey };
}
