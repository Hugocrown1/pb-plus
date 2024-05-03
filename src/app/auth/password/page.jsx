"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "sonner";
import { IconChevronLeft } from "@tabler/icons-react";

const page = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading]= useState(false);
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put("/api/forget-password", { email });
      setLoading(false);
      toast.success("Request sent to your email!");
    } catch (error) {
      setLoading(false);
      setError("Email Address is not Registered!")
      toast.error("Email Address is not Registered!")
    }
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
    <section className="flex items-center justify-center h-screen xl:bg-black/10 bg-white w-full">
      <div className="w-full max-w-md p-4 rounded-md xl:shadow sm:p-8 bg-white ">
        <h2 className="mb-3 text-3xl font-semibold text-center text-gray-800">
          Forgot Password
        </h2>
        <div className="flex">
        <span className="text-gray-600 text-sm text-center">
        Enter your email and we'll send you a link to reset your password.
          </span>
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="email" className="block text-sm">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-100 text-gray-800 "
            required
          />
          <button
            type="submit"
            className="w-full px-8 py-3 font-semibold rounded-md bg-[#cba557] text-white border hover:bg-[#a58546]"
          >
            {loading ? (
              <div className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            ) : (
              "Submit"
            )}
          </button>
        </form>
        <p className="text-sm text-center text-gray-400 mt-4">
          
          <Link href="/auth/login" className="text-blue-500 flex justify-center items-center">
            <IconChevronLeft/>
            Back to login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default page;
