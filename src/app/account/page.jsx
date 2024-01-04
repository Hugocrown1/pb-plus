"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

const page = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/login");
    },
  });

  return (
    <main className="h-[880px]">
      <p>Signed in as {session?.user?.email}</p>

      <button onClick={() => signOut()} className="primary-button">
        Sign out
      </button>
    </main>
  );
};

export default page;
