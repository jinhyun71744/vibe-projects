export default function DiariesLoading() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="h-9 w-40 animate-pulse rounded-lg bg-slate-200 dark:bg-zinc-800" />
        <div className="h-10 w-36 animate-pulse rounded-full bg-slate-200 dark:bg-zinc-800" />
      </div>
      <div className="flex flex-wrap gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-10 w-24 animate-pulse rounded-full bg-slate-200 dark:bg-zinc-800"
          />
        ))}
      </div>
      <div className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="divide-y divide-gray-100 dark:divide-zinc-800">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-3 px-6 py-5">
              <div className="h-5 w-2/3 max-w-md animate-pulse rounded bg-slate-200 dark:bg-zinc-800" />
              <div className="h-4 w-32 animate-pulse rounded bg-slate-100 dark:bg-zinc-800/80" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
