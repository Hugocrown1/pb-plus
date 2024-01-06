"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import Spinner from "@/components/Spinner";

const page = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/login");
    },
  });

  if (!session) {
    return (
      <main className="bg-[#f5f3f4] h-[880px] flex items-center justify-center ">
        <div className="w-[400px] flex justify-center items-center mt-2 h-[400px]">
          <Spinner />
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#f5f3f4] h-[880px]">
      <div className="container-xl mt-2">
        <img
          src={session?.user?.image}
          width={50}
          height={50}
          className="rounded-full"
          alt="Imagen de usuario"
        />
        <button onClick={() => signOut()} className="primary-button">
          Sign out
        </button>
      </div>
    </main>
  );
};

export default page;
