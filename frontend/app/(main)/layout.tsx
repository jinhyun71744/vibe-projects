import Link from "next/link";

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
          <Link
            href="/login"
            className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-gray-300 hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            로그아웃
          </Link>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
