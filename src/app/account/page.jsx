import UserProperties from "@/components/UserProperties";
import SignOutButton from "./SignOutButton";
import Image from "next/image";
import { auth } from "../api/auth/[...nextauth]/route";
import Users from "@/models/users";
import { connectDB } from "@/lib/mongoose";
import UserEditForm from "@/components/UserEdit/UserEditForm";

import { Stripe } from "stripe";
import { createCustomerIfNull, generateCustomerPortalLink } from "@/lib/stripe";
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const getUser = async (id) => {
  await connectDB();
  const response = await Users.findById(id).populate("properties", {});

  return response.toJSON();
};

const Page = async () => {
  const session = await auth();

  const defaultImage = "/assets/defaultprofile.jpg";

  const user = await getUser(session?.user?.id);

  // await createCustomerIfNull();

  // const manage = await generateCustomerPortalLink(""+ )

  return (
    <main className="relative bg-[#f5f3f4] pt-[60px] min-h-[800px]">
      <div className="container-xl mb-16 gap-6 bg-white p-8 h-full border border-gray-200">
        <section className="flex flex-row gap-4 ">
          <Image
            src={user.image || defaultImage}
            width={225}
            height={225}
            className="rounded-xl aspect-square border-4 border-gray-200"
            alt="Imagen de usuario"
          />
          <div className="flex flex-col self-center">
            <h2 className="text-2xl text-left capitalize">{user.name}</h2>
            <div className="flex gap-1"></div>
          </div>
        </section>
        <div className="flex  sm:justify-start justify-evenly">
          <UserEditForm />
          <SignOutButton />
        </div>
        <h2 className="text-left text-2xl">Published properties</h2>
        <section className="flex flex-col rounded-md mx-auto">
          {!user.properties ? (
            <p className="text-left text-gray-700">
              No properties published yet
            </p>
          ) : (
            <UserProperties data={user?.properties} />
          )}
        </section>
        <h2 className="text-left text-2xl">Events</h2>
        <section className="flex flex-col gap-4 mx-auto">
          <p className="text-left text-gray-700">No events published yet</p>
        </section>
      </div>
    </main>
  );
};

export default Page;
