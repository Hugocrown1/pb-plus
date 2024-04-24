"use client";
import { signOut } from "next-auth/react";
import React from "react";

const SignOutButton = () => {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="primary-button bg-red-500 text-white font-extralight hover:bg-red-400  transition-colors"
    >
      Sign out
    </button>
  );
};

export default SignOutButton;
