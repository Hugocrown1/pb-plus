import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Prices from "@/models/price";
import { bucketName, client } from "@/lib/aws";
import fs from "fs";
import { PDFDocument, StandardFonts } from "pdf-lib";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import nodemailer from "nodemailer";
import path from "path";

export async function GET() {
  try {
    await connectDB();

    const prices = await Prices.find();
    return NextResponse.json(prices);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const {
      serviceName,
      responses,
      userName,
      userPhone,
      userEmail,
      extraInfo,
    } = await request.json();

    const date = new Date();

    const price = await Prices.create({
      serviceName,
      responses,
      userName,
      userPhone,
      userEmail,
      extraInfo,
      date,
    });

    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const timesRomanBoldFont = await pdfDoc.embedFont(
      StandardFonts.TimesRomanBold
    );

    const page = pdfDoc.addPage();
    page.setFont(timesRomanFont);
    const { width, height } = page.getSize();

    const logoImage = await pdfDoc.embedPng(
      fs.readFileSync(path.join(process.cwd(), "public/assets/logomain.png"))
    );

    page.drawImage(logoImage, {
      x: 15,
      y: height - 115,
      width: 100,
      height: 100,
    });

    //Get current day for display in pricing
    const day =
      date.getDate() >= 10
        ? date.getDate().toString()
        : "0" + date.getDate().toString();
    const month =
      date.getMonth() + 1 >= 10
        ? (date.getMonth() + 1).toString()
        : "0" + (date.getMonth() + 1).toString();

    const year = date.getFullYear();

    const stringDate = `${day}-${month}-${year}`;

    page.drawText(stringDate, {
      x: width - 106,
      y: height - 58,
      size: 12,
    });

    //Header
    page.drawText(`PBPLUS pricing.`, {
      x: width / 2 - 126,
      y: height - 128,
      size: 36,
    });

    page.drawLine({
      start: { x: 50, y: height - 150 },
      end: { x: 550, y: height - 150 },
    });

    //Pricing information
    page.drawText(`Pricing details`, {
      x: width / 2 - 69,
      y: height - 187,
      size: 24,
    });

    page.drawText(`Service:`, {
      x: 50,
      y: height - 226,
      size: 16,
    });

    page.drawText(`${serviceName}`, {
      x: 106,
      y: height - 226,
      size: 16,
      font: timesRomanBoldFont,
    });

    page.drawText(`Client contact information:`, {
      x: 50,
      y: height - 258,
      size: 16,
    });

    page.drawText(`Name: ${userName}`, {
      x: 50,
      y: height - 287,
      size: 12,
    });
    page.drawText(`Email: ${userEmail}`, {
      x: 50,
      y: height - 300,
      size: 12,
    });
    page.drawText(`Phone: ${userPhone}`, {
      x: 50,
      y: height - 313,
      size: 12,
    });

    page.drawText(`Service details:`, {
      x: 50,
      y: height - 343,
      size: 16,
    });

    page.drawLine({
      start: { x: 50, y: height - 350 },
      end: { x: 550, y: height - 350 },
    });

    page.drawLine({
      start: { x: width / 2, y: height - 330 },
      end: { x: width / 2, y: height - 750 },
    });

    //Service questions and answers
    let baseCoord = { x: 50, y: height - 390 };
    responses.map(({ question, answer }) => {
      page.drawText(`${question}`, {
        x: baseCoord.x,
        y: baseCoord.y,
        size: 16,
        maxWidth: width / 2 - 50,
      });
      page.drawText(`${answer}`, {
        x: baseCoord.x + 270,
        y: baseCoord.y,
        size: 16,
        maxWidth: width / 2 - 50,
      });
      baseCoord.y -= 50;
    });

    baseCoord.y -= 30;
    //Aditional information
    page.drawText(`Additional information: ${extraInfo || "None"}`, {
      x: 50,
      y: baseCoord.y,
      size: 12,
      maxWidth: width - 100,
    });

    const pdfBytes = await pdfDoc.save();

    const pdfFileName = `${price._id}.pdf`;

    await client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: pdfFileName,
        Body: pdfBytes,
        ACL: "public-read",
        ContentType: "application/pdf",
      })
    );

    const pdfFile = `https://${bucketName}.s3.amazonaws.com/${pdfFileName}`;

    price.pdfFile = pdfFile;
    await price.save();

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USERNAME,
      to: ["al19760611@ite.edu.mx", userEmail], // TODO: add email to receive all price PDFs
      subject: `Nueva cotización de ${userName}`,
      text: `Cotización hecha el día ${stringDate}. ID de la cotización: ${price._id}`,
      attachments: [
        {
          filename: pdfFileName,
          content: pdfBytes,
          contentType: "application/pdf",
        },
      ],
    });

    return NextResponse.json(price);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
}
