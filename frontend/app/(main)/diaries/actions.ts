"use server";

import { revalidatePath } from "next/cache";

import { createServerClient } from "@/lib/supabase/server";
import { isMood, type Mood } from "@/types/diary";

function validateDiaryFields(
  title: string,
  content: string,
  mood: string,
  diaryDate: string,
): string | null {
  if (!title.trim()) {
    return "제목을 입력해 주세요.";
  }
  if (!content.trim()) {
    return "본문을 입력해 주세요.";
  }
  if (!mood || !isMood(mood)) {
    return "기분을 선택해 주세요.";
  }
  if (!diaryDate) {
    return "날짜를 선택해 주세요.";
  }
  return null;
}

export async function createDiary(
  formData: FormData,
): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const title = String(formData.get("title") ?? "");
  const content = String(formData.get("content") ?? "");
  const moodRaw = String(formData.get("mood") ?? "");
  const diaryDate = String(formData.get("diary_date") ?? "");

  const validationError = validateDiaryFields(title, content, moodRaw, diaryDate);
  if (validationError) {
    return { ok: false, error: validationError };
  }

  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false, error: "로그인이 필요합니다." };
  }

  const mood = moodRaw as Mood;

  const { data, error } = await supabase
    .from("diaries")
    .insert({
      user_id: user.id,
      title: title.trim(),
      content: content.trim(),
      diary_date: diaryDate,
      mood,
    })
    .select("id")
    .single();

  if (error || !data) {
    return { ok: false, error: error?.message ?? "일기를 저장하지 못했습니다." };
  }

  revalidatePath("/diaries");
  return { ok: true, id: data.id };
}

export async function updateDiary(
  formData: FormData,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "");
  const content = String(formData.get("content") ?? "");
  const moodRaw = String(formData.get("mood") ?? "");
  const diaryDate = String(formData.get("diary_date") ?? "");

  if (!id) {
    return { ok: false, error: "일기 정보가 올바르지 않습니다." };
  }

  const validationError = validateDiaryFields(title, content, moodRaw, diaryDate);
  if (validationError) {
    return { ok: false, error: validationError };
  }

  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false, error: "로그인이 필요합니다." };
  }

  const mood = moodRaw as Mood;

  const { error } = await supabase
    .from("diaries")
    .update({
      title: title.trim(),
      content: content.trim(),
      diary_date: diaryDate,
      mood,
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return { ok: false, error: error.message };
  }

  revalidatePath("/diaries");
  revalidatePath(`/diaries/${id}`);
  return { ok: true };
}

export async function deleteDiary(
  id: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!id) {
    return { ok: false, error: "일기 정보가 올바르지 않습니다." };
  }

  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false, error: "로그인이 필요합니다." };
  }

  const { error } = await supabase.from("diaries").delete().eq("id", id).eq("user_id", user.id);

  if (error) {
    return { ok: false, error: error.message };
  }

  revalidatePath("/diaries");
  return { ok: true };
}
