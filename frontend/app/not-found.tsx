import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-50 px-6 dark:bg-zinc-950">
      <div className="max-w-md space-y-4 text-center">
        <p className="text-sm font-semibold text-slate-500 dark:text-zinc-400">404</p>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="text-sm font-medium text-slate-600 dark:text-zinc-400">
          요청한 주소가 잘못되었거나 삭제된 페이지일 수 있습니다.
        </p>
        <Link
          href="/"
          className="inline-flex rounded-full bg-black px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          홈으로
        </Link>
      </div>
    </div>
  );
}
