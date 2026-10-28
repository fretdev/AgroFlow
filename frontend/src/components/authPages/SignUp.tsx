'use client';

import { useActionState, useEffect } from 'react';
import { register } from '@/src/actions/auth';
import { useRouter } from 'next/navigation';

const initialState = {
  success: false,
  error: null as string | null,
};

export default function SignUpForm() {
  const [state, formAction, isPending] = useActionState(register, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.push('/dashboard');
    }
  }, [state.success, router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Create your AgroFlow account</h1>
          <p className="mt-2 text-sm text-gray-600">Join the agricultural supply chain network</p>
        </div>

        <form action={formAction} className="mt-8 space-y-6">
          {state.error && (
            <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
              {state.error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="fullName">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="phoneNumber">
                Phone Number
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="systemRole">
                System Role
              </label>
              <select
                id="systemRole"
                name="systemRole"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
              >
                <option value="FARMER">Farmer</option>
                <option value="TRADER">Trader</option>
                <option value="TRANSPORTER">Transporter</option>
                <option value="MARKETER">Marketer</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 disabled:opacity-50"
            >
              {isPending ? 'Creating account...' : 'Sign up'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}