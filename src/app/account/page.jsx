import UserProperties from "@/components/UserProperties";
import SignOutButton from "./SignOutButton";
import Image from "next/image";
import { auth } from "../api/auth/[...nextauth]/route";
import Users from "@/models/users";
import { connectDB } from "@/lib/mongoose";
import UserEditForm from "@/components/UserEdit/UserEditForm";

import { Stripe } from "stripe";
import {
  createCheckoutLink,
  createCustomerIfNull,
  hasSubscription,
} from "@/lib/stripe";
import { IconCoffee, IconCrown } from "@tabler/icons-react";
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import { Suspense } from "react";
import ManageBillButton from "./ManageBillButton";

const getUser = async (id) => {
  await connectDB();
  const user = await Users.findById(id).lean().populate("properties", {});
  user._id = user._id.toString();

  return user;
};

const Page = async () => {
  await createCustomerIfNull();
  const session = await auth();

  const defaultImage = "/assets/defaultprofile.jpg";

  const user = await getUser(session.user.id);

  const checkout = await createCheckoutLink("" + user?.stripe_customer_id);

  const hasSub = await hasSubscription();

  return (
    <main className="relative bg-[#f5f3f4] pt-[60px] min-h-[800px]">
      <div className="container-xl mb-16 gap-6 bg-white p-8 h-full border border-gray-200">
        <section className="flex flex-row gap-4 ">
          <Image
            src={user?.image || defaultImage}
            width={225}
            height={225}
            className="rounded-xl aspect-square border-4 border-gray-200"
            alt="Imagen de usuario"
          />
          <div className="flex flex-col self-center">
            <h2 className="text-2xl text-left capitalize">{user?.name}</h2>

            {hasSub ? (
              <span className="flex items-center gap-x-2 text-sm  py-1 px-3 bg-[#fdb833] text-black rounded-full w-fit">
                <IconCrown size={16} /> Premium
              </span>
            ) : (
              <div className="flex flex-col min-[520px]:flex-row items-center ">
                <span className="flex items-center gap-x-2 text-sm  py-1 px-3 bg-black text-white rounded-full w-fit">
                  <IconCoffee size={16} /> Free plan
                </span>
                <a className="text-sm px-3 hover:underline" href={checkout}>
                  Upgrade plan
                </a>
              </div>
            )}

            <div className="flex gap-1"></div>
          </div>
        </section>
        <div className="flex  sm:justify-start justify-evenly gap-x-1">
          <ManageBillButton customerId={user?.stripe_customer_id} />
          <UserEditForm />
          <SignOutButton />
        </div>
        <h2 className="text-left text-2xl">Published properties</h2>
        <section className="flex flex-col rounded-md mx-auto">
          {!user?.properties ? (
            <p className="text-left text-gray-700">
              No properties published yet
            </p>
          ) : (
            <Suspense fallback={<div>Loading...</div>}>
              <UserProperties properties={user?.properties} />
            </Suspense>
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
