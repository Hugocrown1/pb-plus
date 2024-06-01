"use client";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const url = searchParams.get("callbackURL") ?? "/account";
      setLoading(true);
      const { ok, error } = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      

      setLoading(false);

      if (ok) {
        toast.success("Logged in successfully");
        router.push(url);
      } else {
        toast.error(error);
        setError(error);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <section className="flex items-center justify-center min-h-screen xl:bg-black/10 bg-white w-full">
      <div className="w-full max-w-md p-4 rounded-md xl:shadow sm:p-8 bg-white ">
        <h2 className="mb-3 text-3xl font-semibold text-center">
          Login to your account
        </h2>
        <p className="text-sm text-center text-gray-400">
          Dont have account?
          <Link
            href={"/auth/signup"}
            className="focus:underline hover:underline text-blue-500 font-semibold"
          >
            Sign up here
          </Link>
        </p>
        <div className="my-6 space-y-4">
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/account" })}
            className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md  border-gray-400 hover:bg-gray-100 "
          >
            <svg width="1.5em" height="1.5em" viewBox="0 0 256 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4" /><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853" /><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05" /><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335" /></svg>
            <p>Login with Google</p>
          </button>
        </div>
        <div className="flex items-center w-full my-4">
          <hr className="w-full text-gray-400" />
          <p className="px-3 text-gray-400">OR</p>
          <hr className="w-full text-gray-400" />
        </div>
        {error && (
          <div className="my-2 flex items-center rounded shadow-md overflow-hidden max-w-xl relative bg-red-200 text-gray-800">
            <div className="self-stretch flex items-center px-4 flex-shrink-0 bg-red-500 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div className="p-3 flex-1">
              <p className="text-sm text-gray-600">{error}</p>
            </div>
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-8">
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm">
                Email
              </label>
              <input
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                placeholder="user@gmail.com"
                className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-100 text-gray-900 "
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="*****"
                className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-100 text-gray-900 "
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-8 py-3 font-semibold rounded-md bg-[#cba557] text-white border hover:bg-[#a58546]"
          >
            {loading ? (
              <div className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            ) : (
              "Sign in"
            )}
          </button>
          <Link
            href="/auth/password"
            className="text-xs hover:underline text-gray-500 flex justify-end"
          >
            Forgot password?
          </Link>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
