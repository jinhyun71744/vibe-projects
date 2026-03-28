"use client";



import Link from "next/link";

import { useRouter } from "next/navigation";

import { FormEvent, useState } from "react";



import { signInWithPasswordAction } from "../actions";



export default function LoginPage() {

  const router = useRouter();

  const [error, setError] = useState<string | null>(null);

  const [pending, setPending] = useState(false);



  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {

    event.preventDefault();

    setError(null);



    const form = event.currentTarget;



    setPending(true);

    try {

      const formData = new FormData(form);

      const result = await signInWithPasswordAction(formData);

      if (!result.ok) {

        setError(result.error);

        return;

      }

      router.push("/diaries");

      router.refresh();

    } catch (err) {

      setError(

        err instanceof Error ? err.message : "요청을 처리하지 못했습니다.",

      );

    } finally {

      setPending(false);

    }

  };



  return (

    <div className="space-y-8">

      <div className="space-y-2 text-center">

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">

          로그인

        </h1>

        <p className="text-sm font-medium text-slate-500 dark:text-zinc-400">

          계정으로 로그인해 나만의 일기장을 시작하세요.

        </p>

      </div>



      <form onSubmit={handleSubmit} className="space-y-5">

        {error ? (

          <p

            role="alert"

            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200"

          >

            {error}

          </p>

        ) : null}



        <div className="space-y-2">

          <label

            htmlFor="email"

            className="block text-sm font-semibold text-slate-500 dark:text-zinc-400"

          >

            이메일

          </label>

          <input

            id="email"

            name="email"

            type="email"

            required

            autoComplete="email"

            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:ring-zinc-800"

            placeholder="you@example.com"

          />

        </div>



        <div className="space-y-2">

          <label

            htmlFor="password"

            className="block text-sm font-semibold text-slate-500 dark:text-zinc-400"

          >

            비밀번호

          </label>

          <input

            id="password"

            name="password"

            type="password"

            required

            autoComplete="current-password"

            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:ring-zinc-800"

            placeholder="비밀번호 입력"

          />

        </div>



        <button

          type="submit"

          disabled={pending}

          className="w-full rounded-full bg-black px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"

        >

          {pending ? "로그인 중…" : "로그인"}

        </button>

      </form>



      <p className="text-center text-sm font-medium text-slate-500 dark:text-zinc-400">

        아직 계정이 없나요?{" "}

        <Link

          href="/signup"

          className="font-bold text-slate-900 underline decoration-slate-300 underline-offset-4 transition hover:decoration-slate-900 dark:text-zinc-100 dark:decoration-zinc-600 dark:hover:decoration-zinc-100"

        >

          회원가입

        </Link>

      </p>

    </div>

  );

}

