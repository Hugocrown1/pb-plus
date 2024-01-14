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
      <main className="bg-[#f5f3f4] flex items-center justify-center min-h-[800px] ">
        <div className="w-[400px] flex justify-center items-center my-12 h-[400px]">
          <Spinner />
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#f5f3f4] min-h-[800px] ">
      <div className="container-xl my-12 gap-6">
        <section className="flex flex-row gap-4">
          <img
            src={session?.user?.image}
            width={150}
            height={150}
            className="rounded-full aspect-square"
            alt="Imagen de usuario"
          />
          <div className="flex flex-col items-start">
            <h1>{session?.user?.name}</h1>
            <button
              onClick={() => signOut()}
              className="primary-button hover:bg-gray-500/10 transition-colors"
            >
              Sign out
            </button>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-semibold text-left">Published properties</h2>
          <p className="text-left text-gray-700">No properties published yet</p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-semibold text-left">Events</h2>
          <p className="text-left text-gray-700">No events published yet</p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-semibold text-left">Saved posts</h2>
          <p className="text-left text-gray-700">No saved posts yet</p>
        </section>
      </div>
    </main>
  );
};

export default page;
