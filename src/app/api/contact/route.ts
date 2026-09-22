import { NextResponse } from "next/server";
import { sendContactMail } from "@/lib/brevo";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  company?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
    SMTP_USER,
    SMTP_PASS,
    MAIL_FROM,
    CONTACT_TO = "e.demirkaya@gmail.com",
  } = process.env;

  if (!SMTP_USER || !SMTP_PASS || !MAIL_FROM) {
    console.error(
      "Contact email misconfigured: SMTP_USER, SMTP_PASS, and MAIL_FROM are required."
    );
    return NextResponse.json(
      { message: "Email is not configured yet. Please email me directly." },
      { status: 500 }
    );
  }

  const result = await sendContactMail({
    name,
    email,
    message,
    to: CONTACT_TO,
    from: MAIL_FROM,
    smtpUser: SMTP_USER,
    smtpPass: SMTP_PASS,
  });

  if (!result.ok) {
    console.error("Brevo SMTP send failed:", result.detail);
    return NextResponse.json(
      { message: "Could not send your message. Please email me directly." },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Thanks, I will get back to you soon." });
}
