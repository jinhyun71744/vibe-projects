import type { Mood } from "@/types/diary";

export type MoodFilter = Mood | "all";

export const MOOD_FILTER_OPTIONS: { value: MoodFilter; label: string; emoji: string }[] = [
  { value: "all", label: "전체", emoji: "🗂️" },
  { value: "happy", label: "기쁨", emoji: "😊" },
  { value: "sad", label: "슬픔", emoji: "😢" },
  { value: "angry", label: "분노", emoji: "😠" },
  { value: "anxious", label: "불안", emoji: "😰" },
  { value: "neutral", label: "보통", emoji: "😐" },
];

export const MOOD_FORM_OPTIONS: { value: Mood; label: string; emoji: string }[] = [
  { value: "happy", label: "기쁨", emoji: "😊" },
  { value: "sad", label: "슬픔", emoji: "😢" },
  { value: "angry", label: "분노", emoji: "😠" },
  { value: "anxious", label: "불안", emoji: "😰" },
  { value: "neutral", label: "보통", emoji: "😐" },
];

export const MOOD_DISPLAY: Record<Mood, { label: string; emoji: string }> = {
  happy: { label: "기쁨", emoji: "😊" },
  sad: { label: "슬픔", emoji: "😢" },
  angry: { label: "분노", emoji: "😠" },
  anxious: { label: "불안", emoji: "😰" },
  neutral: { label: "보통", emoji: "😐" },
};
