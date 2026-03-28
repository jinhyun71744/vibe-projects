"use server";

import type { AuthError } from "@supabase/supabase-js";

import { createServerClient } from "@/lib/supabase/server";

function userFacingAuthError(error: AuthError): string {
  const status =
    "status" in error && typeof (error as { status?: number }).status === "number"
      ? (error as { status: number }).status
      : undefined;
  const code = String((error as { code?: string }).code ?? "").toLowerCase();
  const msg = (error.message ?? "").toLowerCase();

  if (
    status === 429 ||
    code.includes("over_email_send") ||
    msg.includes("rate limit") ||
    msg.includes("email rate limit")
  ) {
    return "가입 확인 메일 발송 한도(429)에 걸렸습니다. 잠시 후 다시 시도하거나, 개발 중에는 Supabase → Authentication → Providers → Email에서 Confirm email을 끄면 확인 메일이 나가지 않아 같은 한도에 덜 걸립니다.";
  }

  if (
    code === "user_already_registered" ||
    code === "email_address_not_authorized" ||
    msg.includes("already registered") ||
    msg.includes("user already registered")
  ) {
    return "이미 가입된 이메일입니다. 로그인을 시도하세요.";
  }

  if (code === "invalid_credentials" || msg.includes("invalid login")) {
    return "이메일 또는 비밀번호가 올바르지 않습니다.";
  }

  return error.message;
}

export type SignUpResult =
  | { ok: true; needsEmailConfirm: boolean }
  | { ok: false; error: string };

export async function signUpWithPasswordAction(
  formData: FormData,
): Promise<SignUpResult> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!email || !password) {
    return { ok: false, error: "이메일과 비밀번호를 입력해 주세요." };
  }

  if (password !== confirmPassword) {
    return { ok: false, error: "비밀번호가 일치하지 않습니다." };
  }

  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      return { ok: false, error: userFacingAuthError(error) };
    }
    /* 이메일 확인 켜져 있으면 session 없이 user만 올 수 있음 */
    const needsEmailConfirm = !data.session;
    return { ok: true, needsEmailConfirm };
  } catch (e) {
    return {
      ok: false,
      error:
        e instanceof Error
          ? e.message
          : "회원가입 처리 중 오류가 발생했습니다.",
    };
  }
}

export async function signInWithPasswordAction(
  formData: FormData,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { ok: false, error: "이메일과 비밀번호를 입력해 주세요." };
  }

  try {
    const supabase = await createServerClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return { ok: false, error: userFacingAuthError(error) };
    }
    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      error:
        e instanceof Error
          ? e.message
          : "로그인 처리 중 오류가 발생했습니다.",
    };
  }
}
