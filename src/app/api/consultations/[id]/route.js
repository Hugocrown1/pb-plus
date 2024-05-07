import { connectDB } from "@/lib/mongoose";
import Consultations from "@/models/consultations";

import { NextResponse } from "next/server";

export async function DELETE(request, { params: { id } }) {
  try {
    await connectDB();

    // Buscar y eliminar el usuario por su id
    const deletedForm = await Consultations.findByIdAndDelete(id);

    if (!deletedForm) {
      return NextResponse.json("Form no encontrado.", {
        status: 404,
      });
    }

    return NextResponse.json("Form eliminado correctamente.", { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
}
