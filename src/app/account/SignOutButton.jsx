"use client";
import { signOut } from "next-auth/react";
import React from "react";

const SignOutButton = () => {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="primary-button hover:bg-gray-500/10 transition-colors"
    >
      Sign out
    </button>
  );
};

export default SignOutButton;
