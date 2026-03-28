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
      <div className="mx-auto w-full max-w-3xl px-6 py-10">
        <div className="space-y-5 rounded-[2rem] border border-dashed border-gray-200 bg-white p-10 text-center shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
            일기를 찾을 수 없습니다
          </h1>
          <p className="text-sm font-medium text-slate-500 dark:text-zinc-400">
            요청한 일기가 존재하지 않거나 삭제되었습니다.
          </p>
          <Link
            href="/diaries"
            className="inline-flex rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-gray-300 hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-10">
      <article className="space-y-8 rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <header className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-md bg-emerald-100 px-2.5 py-1 text-xs font-bold tracking-wide text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
              {MOOD_DISPLAY[diary.mood].emoji} {MOOD_DISPLAY[diary.mood].label}
            </span>
            <time className="text-sm font-medium text-slate-400 dark:text-zinc-500">
              {new Date(diary.diary_date).toLocaleDateString("ko-KR")}
            </time>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
            {diary.title}
          </h1>
        </header>

        <p className="whitespace-pre-wrap leading-relaxed text-slate-700 dark:text-zinc-200">
          {diary.content}
        </p>

        <div className="flex flex-wrap gap-3 border-t border-gray-100 pt-6 dark:border-zinc-800">
          <Link
            href={`/diaries/${diary.id}/edit`}
            className="rounded-full bg-black px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            수정
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-xl border border-orange-200 bg-white px-5 py-2.5 text-sm font-semibold text-orange-800 shadow-sm transition hover:bg-orange-50 dark:border-orange-900/60 dark:bg-zinc-900 dark:text-orange-300 dark:hover:bg-orange-950/30"
          >
            삭제
          </button>
          <Link
            href="/diaries"
            className="inline-flex items-center rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-gray-300 hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            목록으로 돌아가기
          </Link>
        </div>
      </article>
    </div>
  );
}
