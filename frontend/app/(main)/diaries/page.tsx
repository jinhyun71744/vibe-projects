import Link from "next/link";

import { diaryTitleContentSearchOrFilter } from "@/lib/diary/search";
import { MOOD_DISPLAY, MOOD_FILTER_OPTIONS, type MoodFilter } from "@/lib/diary/ui";
import { createServerClient } from "@/lib/supabase/server";
import type { Mood } from "@/types/diary";
import { isMood } from "@/types/diary";

export const dynamic = "force-dynamic";

type DiariesPageProps = {
  searchParams: Promise<{ mood?: string; q?: string }>;
};

function filterHref(value: MoodFilter, qTrimmed: string): string {
  const params = new URLSearchParams();
  if (value !== "all") {
    params.set("mood", value);
  }
  if (qTrimmed) {
    params.set("q", qTrimmed);
  }
  const qs = params.toString();
  return qs ? `/diaries?${qs}` : "/diaries";
}

function isActiveFilter(param: string | undefined, option: MoodFilter): boolean {
  if (option === "all") {
    return !param || !isMood(param);
  }
  return param === option;
}

export default async function DiariesPage({ searchParams }: DiariesPageProps) {
  const { mood: moodParam, q: qParam } = await searchParams;
  const moodFilter: Mood | null = moodParam && isMood(moodParam) ? moodParam : null;
  const qTrimmed = typeof qParam === "string" ? qParam.trim() : "";

  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  let query = supabase
    .from("diaries")
    .select("id, title, diary_date, mood")
    .eq("user_id", user.id)
    .order("diary_date", { ascending: false });

  if (moodFilter) {
    query = query.eq("mood", moodFilter);
  }

  if (qTrimmed) {
    query = query.or(diaryTitleContentSearchOrFilter(qTrimmed));
  }

  const { data: diaries, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  const rows = diaries ?? [];

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
          일기 목록
        </h1>
        <Link
          href="/diaries/new"
          className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          새 일기 쓰기
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        <form
          action="/diaries"
          method="get"
          className="flex w-full max-w-xl flex-col gap-2 sm:flex-row sm:items-center"
        >
          {moodFilter ? <input type="hidden" name="mood" value={moodFilter} /> : null}
          <input
            type="search"
            name="q"
            defaultValue={typeof qParam === "string" ? qParam : ""}
            placeholder="제목·내용 검색"
            aria-label="일기 검색"
            className="min-w-0 flex-1 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none ring-black/5 placeholder:text-slate-400 focus:border-gray-300 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-600 dark:focus:ring-zinc-600/30"
          />
          <button
            type="submit"
            className="shrink-0 rounded-full border border-gray-200 bg-slate-50 px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-100 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
          >
            검색
          </button>
        </form>

        <div className="flex flex-wrap gap-3">
        {MOOD_FILTER_OPTIONS.map((option) => {
          const isActive = isActiveFilter(moodParam, option.value);

          return (
            <Link
              key={option.value}
              href={filterHref(option.value, qTrimmed)}
              scroll={false}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? "border-black bg-black text-white shadow-sm dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                  : "border-gray-200 bg-white text-slate-600 shadow-sm hover:border-gray-300 hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              {option.emoji} {option.label}
            </Link>
          );
        })}
        </div>
      </div>

      <div
        className={`overflow-hidden rounded-[2rem] border bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 ${
          rows.length === 0
            ? "border-dashed border-gray-200 dark:border-zinc-700"
            : "border-gray-100"
        }`}
      >
        {rows.length === 0 ? (
          <p className="px-6 py-14 text-center text-sm font-medium text-slate-500 dark:text-zinc-400">
            {qTrimmed && moodFilter
              ? "검색어와 기분 조건에 맞는 일기가 없습니다."
              : qTrimmed
                ? "검색 결과가 없습니다."
                : moodFilter
                  ? "선택한 기분의 일기가 없습니다."
                  : "아직 작성한 일기가 없습니다."}
          </p>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-zinc-800">
            {rows.map((diary) => (
              <Link
                key={diary.id}
                href={`/diaries/${diary.id}`}
                className="block px-6 py-5 transition hover:bg-slate-50/90 dark:hover:bg-zinc-800/60"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 space-y-1">
                    <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-zinc-100">
                      {diary.title}
                    </h2>
                    <p className="text-sm text-slate-400 dark:text-zinc-500">
                      {new Date(diary.diary_date).toLocaleDateString("ko-KR")}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-md bg-emerald-100 px-2.5 py-1 text-xs font-bold tracking-wide text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
                    {MOOD_DISPLAY[diary.mood as Mood].emoji}{" "}
                    {MOOD_DISPLAY[diary.mood as Mood].label}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
