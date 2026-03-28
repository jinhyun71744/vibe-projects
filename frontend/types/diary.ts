export type Mood = "happy" | "sad" | "angry" | "anxious" | "neutral";

export const MOOD_VALUES: readonly Mood[] = [
  "happy",
  "sad",
  "angry",
  "anxious",
  "neutral",
] as const;

export function isMood(value: string): value is Mood {
  return (MOOD_VALUES as readonly string[]).includes(value);
}

export interface Diary {
  id: string;
  user_id: string;
  title: string;
  content: string;
  /** ISO date string (YYYY-MM-DD) */
  diary_date: string;
  mood: Mood;
  created_at: string;
  updated_at: string;
}
