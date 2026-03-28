export default function DiaryDetailLoading() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-10">
      <article className="space-y-8 rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="space-y-3">
          <div className="flex gap-3">
            <div className="h-7 w-20 animate-pulse rounded-md bg-slate-200 dark:bg-zinc-800" />
            <div className="h-5 w-28 animate-pulse rounded bg-slate-100 dark:bg-zinc-800/80" />
          </div>
          <div className="h-10 w-4/5 max-w-lg animate-pulse rounded-lg bg-slate-200 dark:bg-zinc-800" />
        </div>
        <div className="space-y-3">
          <div className="h-4 w-full animate-pulse rounded bg-slate-100 dark:bg-zinc-800/80" />
          <div className="h-4 w-full animate-pulse rounded bg-slate-100 dark:bg-zinc-800/80" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100 dark:bg-zinc-800/80" />
        </div>
        <div className="flex flex-wrap gap-3 border-t border-gray-100 pt-6 dark:border-zinc-800">
          <div className="h-10 w-20 animate-pulse rounded-full bg-slate-200 dark:bg-zinc-800" />
          <div className="h-10 w-20 animate-pulse rounded-xl bg-slate-200 dark:bg-zinc-800" />
        </div>
      </article>
    </div>
  );
}
