import Link from "next/link";
import { notFound } from "next/navigation";

import { MOOD_DISPLAY } from "@/lib/diary/ui";
import { createServerClient } from "@/lib/supabase/server";
import type { Diary, Mood } from "@/types/diary";

import { DiaryDeleteButton } from "./diary-delete-button";

export const dynamic = "force-dynamic";

type DiaryDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DiaryDetailPage({ params }: DiaryDetailPageProps) {
  const { id } = await params;

  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: row, error } = await supabase
    .from("diaries")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error || !row) {
    notFound();
  }

  const diary = row as Diary;
  const mood = diary.mood as Mood;

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-10">
      <article className="space-y-8 rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <header className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-md bg-emerald-100 px-2.5 py-1 text-xs font-bold tracking-wide text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
              {MOOD_DISPLAY[mood].emoji} {MOOD_DISPLAY[mood].label}
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

        <div className="flex flex-wrap items-start gap-3 border-t border-gray-100 pt-6 dark:border-zinc-800">
          <Link
            href={`/diaries/${diary.id}/edit`}
            className="rounded-full bg-black px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            수정
          </Link>
          <DiaryDeleteButton diaryId={diary.id} />
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
