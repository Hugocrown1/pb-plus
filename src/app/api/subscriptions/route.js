import { NextResponse } from "next/server";
import {Stripe} from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET() {
  try {
    const subscriptions = await stripe.subscriptions.list();
    return NextResponse.json(subscriptions);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
}

