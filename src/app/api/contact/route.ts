import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  company?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => null)) as ContactPayload | null;

  if (!payload) {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const message = payload.message?.trim() ?? "";

  if (payload.company) {
    return NextResponse.json({ message: "Thanks, I will get back to you soon." });
  }

  if (!name || !isValidEmail(email) || message.length < 10) {
    return NextResponse.json(
      { message: "Please provide a valid name, email, and message." },
      { status: 400 }
    );
  }

  const {
    SMTP_HOST,
    SMTP_PORT = "587",
    SMTP_USER,
    SMTP_PASS,
    MAIL_FROM,
    CONTACT_TO = "e.demirkaya@gmail.com",
  } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return NextResponse.json(
      { message: "Email is not configured yet. Please email me directly." },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_PORT === "465",
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: MAIL_FROM || SMTP_USER,
      to: CONTACT_TO,
      replyTo: email,
      subject: `New message from ${name} via demirkaya.net`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    });
  } catch {
    return NextResponse.json(
      { message: "Could not send your message. Please email me directly." },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Thanks, I will get back to you soon." });
}
