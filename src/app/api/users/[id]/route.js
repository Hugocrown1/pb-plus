import { connectDB } from "@/lib/mongoose";
import { verifyUser } from "@/lib/userAuth";
import Users from "@/models/users";
import bcrypt from "bcrypt";

import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    await connectDB();

    const isAuthorized = await verifyUser(id);

    if (!isAuthorized) {
      return NextResponse.json(
        { message: "Usuario no autorizado" },
        { status: 401 }
      );
    }

    const user = await Users.findById(id).populate("properties", {});
    if (!user) {
      return NextResponse.json("Usuario no encontrado.", { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    return NextResponse.json(error.message, { status: 500 });
  }
}

export async function PUT(request, { params: { id } }) {
  try {
    await connectDB();
    const { email, password, name, phone, image, role } = await request.json();

    // Buscar el usuario existente por su id
    const existingUser = await Users.findById(id);
    if (!existingUser) {
      return NextResponse.json("Usuario no encontrado.", {
        status: 404,
      });
    }

    if (await verifyUser(id)) {
      // // Si se proporciona una nueva contraseña, cifrarla
      // let updatedPassword = existingUser.password;
      // if (password) {
      //  updatedPassword = await bcrypt.hash(password, 10);
      // }

      // Actualizar los campos proporcionados
      existingUser.name = name || existingUser.name;
      existingUser.phone = phone || existingUser.phone;
      existingUser.email = email || existingUser.email;
      existingUser.image = image || existingUser.image;
      existingUser.role = role || existingUser.role;
      // existingUser.password = updatedPassword;

      // Guardar los cambios en la base de datos
      await existingUser.save();
      return NextResponse.json(existingUser);
    }
    return NextResponse.json(
      { message: "Usuario no autorizado" },
      { status: 401 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
}

export async function DELETE(request, { params: { id } }) {
  try {
    await connectDB();
    if (await verifyUser(id)) {
      // Buscar y eliminar el usuario por su id
      const deletedUser = await Users.findByIdAndDelete(id);

      if (!deletedUser) {
        return NextResponse.json("Usuario no encontrado.", {
          status: 404,
        });
      }

      return NextResponse.json("Usuario eliminado correctamente.", {
        status: 200,
      });
    }
    return NextResponse.json(
      { message: "Usuario no autorizado" },
      { status: 401 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
}
