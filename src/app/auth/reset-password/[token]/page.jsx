"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import { toast } from "sonner";

const Page = ({ params }) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "/api/verify-token",
          JSON.stringify({ token: params.token })
        );
        setUserData(response.data);
      } catch (error) {
        setError("Failed to fetch user data");
      }
    };

    fetchData();
  }, [params.token]);

  if (error) {
    toast.error("Token invalid or has expired!");
    router.push("/auth/login");
    return null;
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "/api/reset-password",
        JSON.stringify({
          password,
          email: userData.email,
          token: params.token,
        })
      );
      setLoading(false);
      toast.success("Password reset successfully!");
      router.push("/auth/login");
    } catch (error) {}
  };

  return (
    <section className="flex items-center justify-center min-h-screen xl:bg-black/10 bg-white w-full">
      {userData ? (
        <div className="w-full max-w-md p-4 rounded-md xl:shadow sm:p-8 bg-white ">
          <h2 className="mb-3 text-3xl font-semibold text-center">
            Reset Password
          </h2>
          <div className="flex justify-center">
            <span className="text-gray-600 text-sm text-center">
              Enter a new password for {userData.email}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2">
            <label htmlFor="password" className="block text-sm">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-100 text-gray-900 "
              required
            />
            <label htmlFor="confirmPassword" className="block text-sm">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-100 text-gray-900"
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
            Remembered your password?{" "}
            <Link href="/auth/login" className="text-blue-500">
              Login here
            </Link>
          </p>
        </div>
      ) : (
        <div className="flex items-center justify-center space-x-2">
          <div className="w-4 h-4 rounded-full animate-pulse bg-[#cba557]"></div>
          <div className="w-4 h-4 rounded-full animate-pulse bg-[#cba557]"></div>
          <div className="w-4 h-4 rounded-full animate-pulse bg-[#cba557]"></div>
        </div>
      )}
    </section>
  );
};

export default Page;
