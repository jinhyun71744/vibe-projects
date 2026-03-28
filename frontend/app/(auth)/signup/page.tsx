"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function SignupPage() {
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/login");
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
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-slate-500 dark:text-zinc-400"
          >
            이메일
          </label>
          <input
            id="email"
            type="email"
            required
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
            type="password"
            required
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
            type="password"
            required
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:ring-zinc-800"
            placeholder="비밀번호 다시 입력"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-black px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          회원가입
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
