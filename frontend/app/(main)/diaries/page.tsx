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
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          일기 목록
        </h1>
        <Link
          href="/diaries/new"
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          새 일기 쓰기
        </Link>
      </div>

      <div className="flex flex-wrap gap-2">
        {MOOD_OPTIONS.map((option) => {
          const isActive = selectedMood === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setSelectedMood(option.value)}
              className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                isActive
                  ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                  : "border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              {option.emoji} {option.label}
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        {visibleDiaries.length === 0 ? (
          <p className="rounded-xl border border-dashed border-zinc-300 px-4 py-8 text-center text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
            선택한 기분의 일기가 없습니다.
          </p>
        ) : (
          visibleDiaries.map((diary) => (
            <Link
              key={diary.id}
              href={`/diaries/${diary.id}`}
              className="block rounded-xl border border-zinc-200 bg-white p-4 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {diary.title}
                  </h2>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {new Date(diary.diary_date).toLocaleDateString("ko-KR")}
                  </p>
                </div>
                <span className="rounded-full border border-zinc-300 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">
                  {MOOD_DISPLAY[diary.mood].emoji} {MOOD_DISPLAY[diary.mood].label}
                </span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
