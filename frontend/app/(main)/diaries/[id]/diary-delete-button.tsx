"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { deleteDiary } from "../actions";

type DiaryDeleteButtonProps = {
  diaryId: string;
};

export function DiaryDeleteButton({ diaryId }: DiaryDeleteButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleDelete = () => {
    const shouldDelete = window.confirm("정말 이 일기를 삭제하시겠어요?");
    if (!shouldDelete) {
      return;
    }

    setError(null);
    startTransition(async () => {
      const result = await deleteDiary(diaryId);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.push("/diaries");
      router.refresh();
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={handleDelete}
        disabled={isPending}
        className="rounded-xl border border-orange-200 bg-white px-5 py-2.5 text-sm font-semibold text-orange-800 shadow-sm transition hover:bg-orange-50 disabled:opacity-60 dark:border-orange-900/60 dark:bg-zinc-900 dark:text-orange-300 dark:hover:bg-orange-950/30"
      >
        {isPending ? "삭제 중…" : "삭제"}
      </button>
      {error ? (
        <p className="text-xs font-medium text-red-600 dark:text-red-400">{error}</p>
      ) : null}
    </div>
  );
}
