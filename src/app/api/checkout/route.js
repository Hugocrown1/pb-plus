import { NextResponse } from "next/server";
import { Stripe } from "stripe";

export async function POST(request) {
  // TODO: Manejar urls para producción
  const { priceId } = await request.json();

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: "http://localhost:3000/community/advertising/demo",
    cancel_url: "http://localhost:3000/community/advertising/payment",
  });

  console.log(session);
  return NextResponse.json({ url: session.url });
}
