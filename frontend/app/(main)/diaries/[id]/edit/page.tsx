"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, use, useState } from "react";

import { mockDiaries } from "@/lib/mockData";
import type { Mood } from "@/types/diary";

const MOOD_OPTIONS: { value: Mood; label: string; emoji: string }[] = [
  { value: "happy", label: "기쁨", emoji: "😊" },
  { value: "sad", label: "슬픔", emoji: "😢" },
  { value: "angry", label: "분노", emoji: "😠" },
  { value: "anxious", label: "불안", emoji: "😰" },
  { value: "neutral", label: "보통", emoji: "😐" },
];

type FormErrors = {
  title?: string;
  content?: string;
  mood?: string;
};

type EditDiaryPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function EditDiaryPage({ params }: EditDiaryPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const diary = mockDiaries.find((item) => item.id === id);

  const [title, setTitle] = useState(diary?.title ?? "");
  const [content, setContent] = useState(diary?.content ?? "");
  const [diaryDate, setDiaryDate] = useState(diary?.diary_date ?? "");
  const [mood, setMood] = useState<Mood | "">(diary?.mood ?? "");
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = () => {
    const nextErrors: FormErrors = {};

    if (!title.trim()) {
      nextErrors.title = "제목을 입력해 주세요.";
    }
    if (!content.trim()) {
      nextErrors.content = "본문을 입력해 주세요.";
    }
    if (!mood) {
      nextErrors.mood = "기분을 선택해 주세요.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!diary) {
      return;
    }
    if (!validate()) {
      return;
    }

    router.push(`/diaries/${diary.id}`);
  };

  if (!diary) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-8">
        <div className="space-y-4 rounded-2xl border border-dashed border-zinc-300 bg-white p-6 text-center dark:border-zinc-700 dark:bg-zinc-900">
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            일기를 찾을 수 없습니다
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            수정하려는 일기가 존재하지 않거나 삭제되었습니다.
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
      <div className="space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            일기 수정
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            기존 내용을 수정하고 저장해 보세요.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div className="space-y-1.5">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              제목
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="제목을 입력하세요"
              className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition dark:bg-zinc-800 dark:text-zinc-100 ${
                errors.title
                  ? "border-red-500 focus:border-red-500 dark:border-red-500"
                  : "border-zinc-300 focus:border-zinc-500 dark:border-zinc-700"
              }`}
            />
            {errors.title ? (
              <p className="text-xs text-red-600 dark:text-red-400">{errors.title}</p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              본문
            </label>
            <textarea
              id="content"
              rows={8}
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="오늘 있었던 일을 적어보세요"
              className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition dark:bg-zinc-800 dark:text-zinc-100 ${
                errors.content
                  ? "border-red-500 focus:border-red-500 dark:border-red-500"
                  : "border-zinc-300 focus:border-zinc-500 dark:border-zinc-700"
              }`}
            />
            {errors.content ? (
              <p className="text-xs text-red-600 dark:text-red-400">{errors.content}</p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="diaryDate"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              날짜
            </label>
            <input
              id="diaryDate"
              type="date"
              value={diaryDate}
              onChange={(event) => setDiaryDate(event.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none transition focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">기분</p>
            <div className="flex flex-wrap gap-2">
              {MOOD_OPTIONS.map((option) => {
                const isSelected = mood === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setMood(option.value)}
                    className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                      isSelected
                        ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                        : "border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    }`}
                  >
                    {option.emoji} {option.label}
                  </button>
                );
              })}
            </div>
            {errors.mood ? (
              <p className="text-xs text-red-600 dark:text-red-400">{errors.mood}</p>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <button
              type="submit"
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
              저장
            </button>
            <Link
              href={`/diaries/${diary.id}`}
              className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              취소
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
