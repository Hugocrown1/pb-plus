import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { Stripe } from "stripe";
import { connectDB } from "./mongoose";
import { randomUUID } from "crypto";

import Users from "@/models/users";
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function hasSubscription() {
  await connectDB();

  const session = await getServerSession(authOptions);

  if (session) {
    const user = await Users.findOne({ email: session.user.email });

    const subscriptions = await stripe.subscriptions.list({
      customer: user?.stripe_customer_id,
    });

    return subscriptions.data.length > 0;
  }

  return false;
}

export async function generateCustomerPortalLink(customerId) {
  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: process.env.URL + "/account",
    });

    return portalSession.url;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function loadPrices() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const prices = await stripe.prices.list();

  return prices.data;
}

export async function createCustomerIfNull() {
  const session = await getServerSession(authOptions);

  if (session) {
    const user = await Users.findOne({ email: session.user.email });

    if (!user?.api_key) {
      await Users.findByIdAndUpdate(
        { id: user._id },
        { api_key: "secret_" + randomUUID() }
      );

      // await prisma.user.update({
      //   where: {
      //     id: user?.id,
      //   },
      //   data: {
      //     api_key: "secret_" + randomUUID(),
      //   },
      // });
    }
    if (!user?.stripe_customer_id) {
      const customer = await stripe.customers.create({
        email: user?.email,
      });

      await Users.findByIdAndUpdate(
        { id: user._id },
        { stripe_customer_id: customer.id }
      );

      // await prisma.user.update({
      //   where: {
      //     id: user?.id,
      //   },
      //   data: {
      //     stripe_customer_id: customer.id,
      //   },
      // });
    }

    const customers = await stripe.customers.list();
    console.log(customers);

    const user2 = await Users.findOne({ email: session.user.email });
    return user2?.stripe_customer_id;
  }
}
