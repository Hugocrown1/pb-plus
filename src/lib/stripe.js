import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { Stripe } from "stripe";
import { connectDB } from "./mongoose";
import { randomUUID } from "crypto";

import Users from "@/models/users";
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const URL = process.env.URL;

export async function getSubscriptionStatus() {
  await connectDB();
  const session = await getServerSession(authOptions);
}

export async function getSubscription() {
  await connectDB();

  const session = await getServerSession(authOptions);

  if (session) {
    const user = await Users.findOne({ email: session.user.email });

    const subscriptions = await stripe.subscriptions.list({
      customer: user?.stripe_customer_id,
    });

    if (subscriptions.data.length === 0) {
      return null;
    }

    if (
      subscriptions.data[0].status === "active" ||
      subscriptions.data[0].status === "past_due"
    ) {
      return subscriptions.data[0];
    }
  }

  return null;
}

export async function generateCustomerPortalLink(customerId) {
  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: URL + "/account",
    });

    return portalSession.url;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function createCheckoutLink(customer) {
  const checkout = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer: customer,
    line_items: [
      {
        price: "price_1P3SgB13yf7FOQ66KPGiHWL7",
        quantity: 1,
      },
    ],
    success_url: URL + "/account",
    cancel_url: URL + "/account",
  });

  return checkout.url;
}

export async function loadPrices() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const prices = await stripe.prices.list();

  return prices.data;
}

export async function getAllCustomers() {
  const customers = await stripe.customers.list();
  return customers.data;
}

export async function getAllPayouts() {
  const payouts = await stripe.payouts.list();
  console.log(payouts.data);
  return payouts.data;
}

export async function getAllEvents() {
  const events = await stripe.events.list();
  console.log(events.data)
  return events.data;
}

export async function getAllSubscriptions() {
  const subscriptions = await stripe.subscriptions.list();
  return subscriptions.data;
}


export async function createCustomerIfNull() {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (session) {
    const user = await Users.findOne({ email: session.user.email });

    if (!user?.api_key) {
      await Users.findByIdAndUpdate(user._id.toString(), {
        api_key: "secret_" + randomUUID(),
      });
    }
    if (!user?.stripe_customer_id) {
      const customer = await stripe.customers.create({
        email: user?.email,
      });

      await Users.findByIdAndUpdate(user._id.toString(), {
        stripe_customer_id: customer.id,
      });
    }

    const user2 = await Users.findOne({ email: session.user.email });
    return user2?.stripe_customer_id;
  }
}
