import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const ENDPOINT_SECRET = "whsec_vLjb1BQpAWEtv3yZ1yPuN47SYu2bSTFp";

export async function POST(request) {
  const body = await request.text();
  const headersList = headers();
  const sig = headersList.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, ENDPOINT_SECRET);
    const eventData = event.data.object;

    const customer = await stripe.customers.retrieve(eventData.customer);

    switch (event.type) {
      case "customer.subscription.deleted":
        console.log(customer);

        // Mandar correo al cliente
        // Notificar en el dashboard
        break;
      case "checkout.session.completed":
        console.log(customer);

        break;
      case "invoice.payment_failed":
        console.log(eventData);

        break;
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json("Recibiendo webhook");
}
