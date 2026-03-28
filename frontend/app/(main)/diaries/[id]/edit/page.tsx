import { notFound } from "next/navigation";

import { createServerClient } from "@/lib/supabase/server";
import type { Diary } from "@/types/diary";

import { EditDiaryForm } from "./edit-diary-form";

export const dynamic = "force-dynamic";

type EditDiaryPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditDiaryPage({ params }: EditDiaryPageProps) {
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

  return <EditDiaryForm diary={row as Diary} />;
}
