"use client";

import React from "react";

import UserProperties from "@/components/UserProperties";
import SignOutButton from "./SignOutButton";
import { useSessionStore } from "../store";

const page = () => {
  const userSession = useSessionStore((state) => state.userSession);

  return (
    <main className="bg-[#f5f3f4] min-h-[800px] ">
      <div className="container-xl my-12 gap-6">
        <section className="flex flex-row gap-4">
          <img
            src={userSession?.image}
            width={150}
            height={150}
            className="rounded-full aspect-square"
            alt="Imagen de usuario"
          />
          <div className="flex flex-col items-start">
            <h1>{userSession?.name}</h1>
            <SignOutButton />
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-semibold text-left">Published properties</h2>
          {/* <UserProperties user={userSession} /> */}
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
