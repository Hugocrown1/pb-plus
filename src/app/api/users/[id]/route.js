import { connectDB } from "@/lib/mongoose";
import { verifyUser } from "@/lib/userAuth";
import Users from "@/models/users";

import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    await connectDB();
    const user = await Users.findById(id).populate("properties", {});
    // if (verifyUser(user._id)) {
    return NextResponse.json(user);
    // }
    // return NextResponse.json(
    //   { message: "Usuario no autorizado" },
    //   { status: 401 }
    // );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
}
