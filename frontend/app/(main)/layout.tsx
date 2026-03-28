import Link from "next/link";

import { LogoutButton } from "./logout-button";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 bg-[radial-gradient(ellipse_90%_70%_at_100%_0%,rgb(255_237_213/0.55),transparent_55%),radial-gradient(ellipse_60%_50%_at_90%_10%,rgb(255_228_230/0.35),transparent_50%)] dark:bg-zinc-950 dark:bg-none">
      <header className="border-b border-gray-100/90 bg-white/85 px-6 py-4 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/90">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link
            href="/diaries"
            className="text-lg font-bold tracking-tight text-slate-900 dark:text-zinc-100"
          >
            나만의 일기장
          </Link>
          <LogoutButton />
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
