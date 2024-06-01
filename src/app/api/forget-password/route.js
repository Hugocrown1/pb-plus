import { connectDB } from "@/lib/mongoose";
import Users from "@/models/users";
import { NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function PUT(request) {
  try {
    await connectDB();

    const { email } = await request.json();

    // Buscar el usuario existente por su email
    const existingUser = await Users.findOne({ email });

    if (!existingUser) {
      return NextResponse.json("Usuario no encontrado.", {
        status: 404,
      });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const passwordResetExpires = Date.now() + 3600000;

    existingUser.resettoken = passwordResetToken;
    existingUser.resettokenexpiry = passwordResetExpires;

    const resetUrl = `localhost:3000/auth/reset-password/${resetToken}`;

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    try {
      await transporter.sendMail({
        from: process.env.GMAIL_USERNAME,
        to: email,
        subject: `Password Reset: PBPlus`,
        html: '<p>Hemos recibido una solicitud para restablecer tu contraseña.</p><p>Por favor, haz clic en el siguiente enlace para crear una nueva contraseña:</p><a href="'+process.env.URL+'/auth/reset-password/' + resetToken + '" style="display: inline-block; background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Restablecer Contraseña</a><p>Si no solicitaste un restablecimiento de contraseña, puedes ignorar este correo.</p>'
      });
      
      await existingUser.save();

      return NextResponse.json("Email enviado correctamente.", { status: 200 });
    } catch (emailError) {
      console.error("Error al enviar el correo:", emailError);
      return NextResponse.json("Error al enviar el correo.", { status: 500 });
    }

  } catch (error) {
    console.error("Error en el proceso:", error);
    if (error instanceof Error) {
      return NextResponse.json(error.message, { status: 500 });
    }
  }
}
