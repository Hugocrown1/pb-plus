import { connectDB } from "@/lib/mongoose";
import Prices from "@/models/price";

import { NextResponse } from "next/server";

export async function DELETE(request,{params: {id}}) {
  try {
    await connectDB();

    // Buscar y eliminar el usuario por su id
    const deletedPrice = await Prices.findByIdAndDelete(id);

    if (!deletedPrice) {
      return NextResponse.json("Remo no encontrado.", {
        status: 404,
      });
    }

    return NextResponse.json("Remo eliminado correctamente.", { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
}
