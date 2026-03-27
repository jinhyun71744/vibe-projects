import Link from "next/link";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link
            href="/diaries"
            className="text-lg font-semibold text-zinc-900 dark:text-zinc-100"
          >
            나만의 일기장
          </Link>
          <Link
            href="/login"
            className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            로그아웃
          </Link>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
