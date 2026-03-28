"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { mockDiaries } from "@/lib/mockData";
import type { Mood } from "@/types/diary";

type MoodFilter = Mood | "all";

const MOOD_OPTIONS: { value: MoodFilter; label: string; emoji: string }[] = [
  { value: "all", label: "전체", emoji: "🗂️" },
  { value: "happy", label: "기쁨", emoji: "😊" },
  { value: "sad", label: "슬픔", emoji: "😢" },
  { value: "angry", label: "분노", emoji: "😠" },
  { value: "anxious", label: "불안", emoji: "😰" },
  { value: "neutral", label: "보통", emoji: "😐" },
];

const MOOD_DISPLAY: Record<Mood, { label: string; emoji: string }> = {
  happy: { label: "기쁨", emoji: "😊" },
  sad: { label: "슬픔", emoji: "😢" },
  angry: { label: "분노", emoji: "😠" },
  anxious: { label: "불안", emoji: "😰" },
  neutral: { label: "보통", emoji: "😐" },
};

export default function DiariesPage() {
  const [selectedMood, setSelectedMood] = useState<MoodFilter>("all");

  const sortedDiaries = useMemo(
    () =>
      [...mockDiaries].sort(
        (a, b) =>
          new Date(b.diary_date).getTime() - new Date(a.diary_date).getTime(),
      ),
    [],
  );

  const visibleDiaries = useMemo(() => {
    if (selectedMood === "all") {
      return sortedDiaries;
    }

    return sortedDiaries.filter((diary) => diary.mood === selectedMood);
  }, [selectedMood, sortedDiaries]);

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

      <div className="flex flex-wrap gap-3">
        {MOOD_OPTIONS.map((option) => {
          const isActive = selectedMood === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setSelectedMood(option.value)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? "border-black bg-black text-white shadow-sm dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                  : "border-gray-200 bg-white text-slate-600 shadow-sm hover:border-gray-300 hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              {option.emoji} {option.label}
            </button>
          );
        })}
      </div>

      <div
        className={`overflow-hidden rounded-[2rem] border bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 ${
          visibleDiaries.length === 0
            ? "border-dashed border-gray-200 dark:border-zinc-700"
            : "border-gray-100"
        }`}
      >
        {visibleDiaries.length === 0 ? (
          <p className="px-6 py-14 text-center text-sm font-medium text-slate-500 dark:text-zinc-400">
            선택한 기분의 일기가 없습니다.
          </p>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-zinc-800">
            {visibleDiaries.map((diary) => (
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
                    {MOOD_DISPLAY[diary.mood].emoji} {MOOD_DISPLAY[diary.mood].label}
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
