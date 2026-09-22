import { NextResponse } from "next/server";
import { sendContactMail, summarizeResendFailure } from "@/lib/resend";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  company?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function env(name: string) {
  return process.env[name]?.trim() || undefined;
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

  const RESEND_API_KEY = env("RESEND_API_KEY");
  const MAIL_FROM =
    env("MAIL_FROM") || "demirkaya.net <onboarding@resend.dev>";
  const CONTACT_TO = env("CONTACT_TO") || "e.demirkaya@gmail.com";

  if (!RESEND_API_KEY) {
    console.error("Contact email misconfigured: RESEND_API_KEY is required.");
    return NextResponse.json(
      {
        message: "Email is not configured yet. Please email me directly.",
        reason: "Missing RESEND_API_KEY on Vercel.",
      },
      { status: 500 }
    );
  }

  const result = await sendContactMail({
    name,
    email,
    message,
    to: CONTACT_TO,
    from: MAIL_FROM,
    apiKey: RESEND_API_KEY,
  });

  if (!result.ok) {
    const reason = summarizeResendFailure(result.status, result.detail);
    console.error("Resend send failed:", result.status, result.detail);
    return NextResponse.json(
      {
        message: "Could not send your message. Please email me directly.",
        reason,
        providerStatus: result.status ?? null,
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Thanks, I will get back to you soon." });
}
