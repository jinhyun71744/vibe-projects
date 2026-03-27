"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { use } from "react";

import { mockDiaries } from "@/lib/mockData";
import type { Mood } from "@/types/diary";

const MOOD_DISPLAY: Record<Mood, { label: string; emoji: string }> = {
  happy: { label: "기쁨", emoji: "😊" },
  sad: { label: "슬픔", emoji: "😢" },
  angry: { label: "분노", emoji: "😠" },
  anxious: { label: "불안", emoji: "😰" },
  neutral: { label: "보통", emoji: "😐" },
};

type DiaryDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function DiaryDetailPage({ params }: DiaryDetailPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const diary = mockDiaries.find((item) => item.id === id);

  const handleDelete = () => {
    const shouldDelete = window.confirm("정말 이 일기를 삭제하시겠어요?");
    if (!shouldDelete) {
      return;
    }

    router.push("/diaries");
  };

  if (!diary) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-8">
        <div className="space-y-4 rounded-2xl border border-dashed border-zinc-300 bg-white p-6 text-center dark:border-zinc-700 dark:bg-zinc-900">
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            일기를 찾을 수 없습니다
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            요청한 일기가 존재하지 않거나 삭제되었습니다.
          </p>
          <Link
            href="/diaries"
            className="inline-flex rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8">
      <article className="space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <header className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-zinc-300 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">
              {MOOD_DISPLAY[diary.mood].emoji} {MOOD_DISPLAY[diary.mood].label}
            </span>
            <time className="text-sm text-zinc-600 dark:text-zinc-400">
              {new Date(diary.diary_date).toLocaleDateString("ko-KR")}
            </time>
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {diary.title}
          </h1>
        </header>

        <p className="whitespace-pre-wrap leading-7 text-zinc-800 dark:text-zinc-200">
          {diary.content}
        </p>

        <div className="flex flex-wrap gap-2 border-t border-zinc-200 pt-4 dark:border-zinc-800">
          <Link
            href={`/diaries/${diary.id}/edit`}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            수정
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-950/40"
          >
            삭제
          </button>
          <Link
            href="/diaries"
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            목록으로 돌아가기
          </Link>
        </div>
      </article>
    </div>
  );
}
