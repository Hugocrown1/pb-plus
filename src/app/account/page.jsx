"use client";

import Header from "@/components/Header";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const page = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/login");
    },
  });

  return (
    <>
      <main>Signed in as {session?.user?.email}</main>
      <button onClick={() => signOut()} className="primary-button">
        Sign out
      </button>
    </>
  );
};

export default page;
