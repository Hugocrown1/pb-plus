"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { ok, error } = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (ok) {
      router.push("/");
    } else {
      setError(error);
    }
  };

  return (
    <section className="flex items-center justify-center h-screen xl:bg-black/10 bg-white w-full">
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-current"
            >
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
            <p>Login with Google</p>
          </button>
        </div>
        <div className="flex items-center w-full my-4">
          <hr className="w-full text-gray-400" />
          <p className="px-3 text-gray-400">OR</p>
          <hr className="w-full text-gray-400" />
        </div>
        {error && <h3 className="bg-red-400 px-4 py-2 rounded-md">{error}</h3>}
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
                <a href="#" className="text-xs hover:underline text-gray-400">
                  Forgot password?
                </a>
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
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
