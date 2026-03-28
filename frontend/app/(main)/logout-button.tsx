"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { createBrowserClient } from "@/lib/supabase/client";

export function LogoutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const handleLogout = async () => {
    setPending(true);
    const supabase = createBrowserClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
    setPending(false);
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={pending}
      className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-gray-300 hover:bg-slate-50 disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
    >
      {pending ? "로그아웃 중…" : "로그아웃"}
    </button>
  );
}
