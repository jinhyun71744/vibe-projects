"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-50 px-6 dark:bg-zinc-950">
      <div className="max-w-md space-y-4 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
          문제가 발생했습니다
        </h1>
        <p className="text-sm font-medium text-slate-600 dark:text-zinc-400">
          예기치 않은 오류로 이 화면을 불러오지 못했습니다. 다시 시도해 주세요.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-full bg-black px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          다시 시도
        </button>
      </div>
    </div>
  );
}
