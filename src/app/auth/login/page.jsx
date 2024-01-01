"use client";
import React, { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <section className="flex items-center justify-center h-screen bg-black/10 w-full">
      <div className="flex flex-col gap-4 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Login</h2>
        <form className="flex flex-col gap-4">
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

          <button
            type="button"
            onClick={handleLogin}
            className="px-8 py-3 rounded-[10px] border-2 font-semibold text-base w-[200px] transition-colors bg-[#F6AA1C] text-black hover:bg-[#FFC65A] hover:border-[#F6AA1C]"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
