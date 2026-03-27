export type Mood = "happy" | "sad" | "angry" | "anxious" | "neutral";

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
