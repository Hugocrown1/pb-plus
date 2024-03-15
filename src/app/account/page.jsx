import React from "react";

import UserProperties from "@/components/UserProperties";
import SignOutButton from "./SignOutButton";
import { auth } from "../api/auth/[...nextauth]/route";
import EditButton from "./EditButton";

const page = async () => {
  const session = await auth();

  return (
    <main className="relative bg-[#f5f3f4] pt-[60px] min-h-[800px] ">
      <div className="container-xl mb-12 gap-6 bg-white p-8">
        <section className="flex flex-row gap-4 ">
          <img
            src={session?.user?.image}
            width={225}
            height={225}
            className="rounded-md aspect-square"
            alt="Imagen de usuario"
          />
          <div className="flex flex-col self-center">
            <h2 className="text-2xl text-left">{session?.user.name}</h2>
            <div className="flex gap-1"></div>
          </div>
        </section>
        <div className="flex  sm:justify-start justify-evenly">
          <EditButton></EditButton>
          <SignOutButton></SignOutButton>
        </div>
        <h2 className="text-left text-2xl">Published properties</h2>
        <section className="flex flex-col rounded-md mx-auto">
          <UserProperties user={session?.user} />
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
