"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { signUpWithPasswordAction } from "../actions";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setInfo(null);

    const form = event.currentTarget;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    const confirmPassword = (
      form.elements.namedItem("confirmPassword") as HTMLInputElement
    ).value;

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    setPending(true);
    try {
      const formData = new FormData(form);
      const result = await signUpWithPasswordAction(formData);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      if (result.needsEmailConfirm) {
        setInfo(
          "확인 메일을 보냈습니다. 메일의 링크를 눌러 인증한 뒤 로그인하세요. 메일이 오지 않으면 스팸함을 확인하세요.",
        );
        return;
      }
      router.push("/login");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "요청을 처리하지 못했습니다.",
      );
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
          회원가입
        </h1>
        <p className="text-sm font-medium text-slate-500 dark:text-zinc-400">
          새 계정을 만들고 일기 작성을 시작하세요.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error ? (
          <p
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200"
          >
            {error}
          </p>
        ) : null}
        {info ? (
          <p
            role="status"
            className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-100"
          >
            {info}
          </p>
        ) : null}

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-slate-500 dark:text-zinc-400"
          >
            이메일
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:ring-zinc-800"
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-slate-500 dark:text-zinc-400"
          >
            비밀번호
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="new-password"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:ring-zinc-800"
            placeholder="비밀번호 입력"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-semibold text-slate-500 dark:text-zinc-400"
          >
            비밀번호 확인
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            autoComplete="new-password"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:ring-zinc-800"
            placeholder="비밀번호 다시 입력"
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-full bg-black px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          {pending ? "처리 중…" : "회원가입"}
        </button>
      </form>

      <p className="text-center text-sm font-medium text-slate-500 dark:text-zinc-400">
        이미 계정이 있나요?{" "}
        <Link
          href="/login"
          className="font-bold text-slate-900 underline decoration-slate-300 underline-offset-4 transition hover:decoration-slate-900 dark:text-zinc-100 dark:decoration-zinc-600 dark:hover:decoration-zinc-100"
        >
          로그인
        </Link>
      </p>
    </div>
  );
}
