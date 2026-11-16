"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { login } from "@/src/actions/auth-actions";
import { useRouter } from "next/navigation";

const initialState = {
  success: false,
  error: null as string | null,
};

export default function SignInForm() {
  const [state, formAction, isPending] = useActionState(login, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.push("/dashboard");
    }
  }, [state.success, router]);

  return (
    <main className="flex min-h-screen w-full">
      <aside className="hidden lg:w-1/2 relative overflow-hidden lg:flex flex-col justify-between p-12">
        <Image 
          src="/images/Transport1.jpg"
          alt="agroflow login image"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/70 to-transparent z-10" />

        <div className="relative z-20 flex flex-col items-center space-y-8">
          <Image
            src="/images/Logo1.jpg"
            alt="Agroflow logo"
            width={200}
            height={40}
            className="object-cover" 
          />

          <div className="max-w-md text-center">
            <p className="text-3xl font-medium text-white leading-relaxed">
              Welcome back. Access your workspace to manage logistics, crops, and trade seamlessly.
            </p>
          </div>
        </div>

        <div className="relative z-20 text-center">
          <footer className="text-sm text-zinc-300 text-center space-x-2">
            <span>&copy; {new Date().getFullYear()} Agroflow Enterprise Logistics </span>
            <span>•</span>
            <span>All rights reserved.</span>
          </footer>
        </div>
      </aside>

      <section className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-8 lg:p-12 bg-white overflow-y-auto min-h-screen">
        <div className="flex justify-between items-center w-full">
          <span className="text-sm font-semibold tracking-tight text-zinc-900 lg:hidden">Agroflow</span>
          <Link href="/" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors ml-auto">
            &larr; Back to home
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto space-y-6 py-4">
          <div className="space-y-1.5">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Sign in to your account</h1>
            <p className="text-sm text-zinc-600">Enter your credentials to access your dashboard.</p>
          </div>

          {state?.error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
              {state.error}
            </div>
          )}

          {state?.success && (<p className="text-green-600 test-sm">Successfully login</p>)}

          <form action={formAction} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-700">
                Email Address
              </label>
              <input 
                type="email"
                id="email"
                name="email"
                required
                placeholder="seyi@gmail.com"
                className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 shadow-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-700">
                Password
              </label>
              <input 
                type="password"
                id="password"
                name="password"
                required
                placeholder="••••••••"
                className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 shadow-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 sm:text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed pt-2"
            >
              {isPending ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-zinc-600">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-medium text-emerald-600 hover:text-emerald-500">
              Create an account
            </Link>
          </p>
        </div>

        <div />
      </section>
    </main>
  );
}