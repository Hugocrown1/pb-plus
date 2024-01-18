import React from "react";

import UserProperties from "@/components/UserProperties";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SignOutButton from "./SignOutButton";

const page = async () => {
  const session = await getServerSession(authOptions);

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
            <SignOutButton />
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-semibold text-left">Published properties</h2>
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
