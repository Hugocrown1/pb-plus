"use client";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

const RegistrationPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleRegister = () => {
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Age:", age);
    console.log("Address:", address);
    console.log("Phone:", phone);
  };

  return (
    <section className="flex items-center justify-center h-screen bg-black/10 w-full">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold mb-4">Sign in</h2>
        <form className="flex flex-col gap-4">
          <label className="text-xl" htmlFor="name">
            Nombre:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 border rounded-md"
            required
          />

          <label className="text-xl" htmlFor="email">
            Correo Electrónico:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 border rounded-md"
            required
          />

          <label className="text-xl" htmlFor="age">
            Edad:
          </label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="px-4 py-2 border rounded-md"
            required
          />

          <label className="text-xl" htmlFor="address">
            Dirección:
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="px-4 py-2 border rounded-md"
            required
          />

          <label className="text-xl" htmlFor="phone">
            Teléfono:
          </label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="px-4 py-2 border rounded-md"
            required
          />

          <button
            type="button"
            onClick={handleRegister}
            className="px-8 py-3 rounded-[10px] border-2 font-semibold text-base w-full transition-colors bg-[#F6AA1C] text-black hover:bg-[#FFC65A] hover:border-[#F6AA1C]"
          >
            Sing In
          </button>
        </form>
        <div className="flex flex-row w-full items-center my-2">
          <hr className="w-full h-0.5 border-t-0 bg-slate-600/70 opacity-100 dark:opacity-50" />
          <p className="text-lg mx-4">or</p>
          <hr className="w-full h-0.5 border-t-0 bg-slate-600/70 opacity-100 dark:opacity-50" />
        </div>

        <button
          onClick={() =>
            signIn("google", { redirect: true, callbackUrl: "/account" })
          }
          className="flex flex-row items-center justify-center gap-2 primary-button transition-colors hover:bg-gray-500/10 w-full mx-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="24px"
            height="24px"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            />
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            />
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            />
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            />
          </svg>
          <p>Continue with Google</p>
        </button>
      </div>
    </section>
  );
};

export default RegistrationPage;
