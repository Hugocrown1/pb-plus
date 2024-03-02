"use client";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";

const RegistrationPage = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/users", {
        ...data,
      });
      setLoading(false);
      router.push("/auth/login");
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <section className="flex items-center justify-center h-screen xl:bg-black/10 bg-white w-full">
      <div className="w-full max-w-md p-4 rounded-md xl:shadow sm:p-8 bg-white ">
        <h2 className="mb-3 text-3xl font-semibold text-center">
          Create your account
        </h2>
        <p className="text-sm text-center text-gray-400">
          Do you have an account?
          <Link
            href={"/auth/login"}
            className="focus:underline hover:underline text-blue-500 font-semibold"
          >
            Sign in here
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
            <p clsa>Register with Google</p>
          </button>
        </div>
        <div className="flex items-center w-full my-4">
          <hr className="w-full text-gray-400" />
          <p className="px-3 text-gray-400">OR</p>
          <hr className="w-full text-gray-400" />
        </div>
        {error && <h3 className="bg-red-400 px-4 py-2 rounded-md">{error}</h3>}
        <form onSubmit={handleRegister} className="space-y-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={data.name}
                onChange={(e) =>
                  setData((prevData) => ({ ...prevData, name: e.target.value }))
                }
                required
                placeholder="Name"
                className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-100 text-gray-900 "
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={data.email}
                onChange={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    email: e.target.value,
                  }))
                }
                required
                placeholder="user@gmail.com"
                className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-100 text-gray-900 "
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm">
                Phone
              </label>
              <input
                type="number"
                id="phone"
                value={data.phone}
                onChange={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    phone: e.target.value,
                  }))
                }
                required
                placeholder="646 123 4567"
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
                value={data.password}
                onChange={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    password: e.target.value,
                  }))
                }
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
              "Sign up"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default RegistrationPage;
