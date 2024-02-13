"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const { ok, error } = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (ok) {
      router.push("/");
    } else {
      setError(error);
    }
  };

  return (
    <section className="flex items-center justify-center h-screen bg-black/10 w-full">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold mb-4">Login</h2>
        {error && <h3 className="bg-red-400 px-4 py-2 rounded-md">{error}</h3>}
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <label className="text-xl" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 border rounded-md"
            required
          />

          <label className="text-xl" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 border rounded-md"
            required
          />

          <input
            type="submit"
            value={"Login"}
            className="px-8 py-3 rounded-[10px] border-2 font-semibold text-base w-full transition-colors bg-[#F6AA1C] text-black hover:bg-[#FFC65A] hover:border-[#F6AA1C]"
          ></input>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
