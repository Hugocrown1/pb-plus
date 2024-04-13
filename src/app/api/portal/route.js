import { NextResponse } from "next/server";
import { generateCustomerPortalLink } from "@/lib/stripe";

export async function POST(request) {
  const { customerId } = await request.json();

  const manageLink = await generateCustomerPortalLink(customerId);

  return NextResponse.json(manageLink);
}
