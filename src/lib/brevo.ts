import nodemailer from "nodemailer";

export const BREVO_SMTP_HOST = "smtp-relay.brevo.com";
export const BREVO_SMTP_PORT = 587;

export type ContactMailInput = {
  name: string;
  email: string;
  message: string;
  to: string;
  from: string;
  smtpUser: string;
  smtpPass: string;
  smtpHost?: string;
  smtpPort?: number;
};

export type SendMailResult =
  | { ok: true }
  | { ok: false; detail: string };

export function createBrevoTransport(options: {
  user: string;
  pass: string;
  host?: string;
  port?: number;
}) {
  const port = options.port ?? BREVO_SMTP_PORT;

  return nodemailer.createTransport({
    host: options.host ?? BREVO_SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: options.user,
      pass: options.pass,
    },
  });
}

export function buildContactMailMessage(
  input: Pick<ContactMailInput, "name" | "email" | "message" | "to" | "from">
) {
  return {
    from: input.from,
    to: input.to,
    replyTo: input.email,
    subject: `New message from ${input.name} via demirkaya.net`,
    text: `Name: ${input.name}\nEmail: ${input.email}\n\n${input.message}`,
    html: `
      <p><strong>Name:</strong> ${escapeHtml(input.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
      <p>${escapeHtml(input.message).replace(/\n/g, "<br />")}</p>
    `,
  };
}

export async function sendContactMail(
  input: ContactMailInput
): Promise<SendMailResult> {
  const transporter = createBrevoTransport({
    user: input.smtpUser,
    pass: input.smtpPass,
    host: input.smtpHost,
    port: input.smtpPort,
  });

  try {
    await transporter.sendMail(buildContactMailMessage(input));
    return { ok: true };
  } catch (error) {
    const detail =
      error instanceof Error ? error.message : "Unknown SMTP error";
    return { ok: false, detail };
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
