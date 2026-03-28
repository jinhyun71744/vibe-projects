export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-slate-50 bg-[radial-gradient(ellipse_90%_70%_at_100%_0%,rgb(255_237_213/0.55),transparent_55%),radial-gradient(ellipse_60%_50%_at_90%_10%,rgb(255_228_230/0.35),transparent_50%)] p-6 dark:bg-zinc-950 dark:bg-none">
      <div className="w-full max-w-md rounded-[2rem] border border-gray-100 bg-white p-10 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        {children}
      </div>
    </div>
  );
}
