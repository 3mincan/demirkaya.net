const RESEND_API_URL = "https://api.resend.com/emails";

export type ContactMailInput = {
  name: string;
  email: string;
  message: string;
  to: string;
  from: string;
  apiKey: string;
};

export type SendMailResult =
  | { ok: true; messageId?: string }
  | { ok: false; status?: number; detail: string };

export function buildContactEmailPayload(
  input: Omit<ContactMailInput, "apiKey">
) {
  return {
    from: input.from,
    to: [input.to],
    reply_to: input.email,
    subject: `New message from ${input.name} via demirkaya.net`,
    text: `Name: ${input.name}\nEmail: ${input.email}\n\n${input.message}`,
    html: `
      <p><strong>Name:</strong> ${escapeHtml(input.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
      <p>${escapeHtml(input.message).replace(/\n/g, "<br />")}</p>
    `,
  };
}

export function summarizeResendFailure(status?: number, detail?: string) {
  const text = (detail || "").toLowerCase();

  if (status === 401) {
    return "Resend auth failed — check RESEND_API_KEY on Vercel.";
  }
  if (
    status === 403 ||
    text.includes("not verified") ||
    text.includes("domain is not verified")
  ) {
    return "Resend domain/from not allowed — verify MAIL_FROM domain in Resend (or use onboarding@resend.dev until DNS is verified).";
  }
  if (status === 422) {
    return "Resend rejected the payload — check MAIL_FROM and CONTACT_TO.";
  }
  if (!status) {
    return "Could not reach Resend — network error from the server.";
  }
  return `Resend returned HTTP ${status}.`;
}

export async function sendContactMail(
  input: ContactMailInput,
  fetchImpl: typeof fetch = fetch
): Promise<SendMailResult> {
  try {
    const response = await fetchImpl(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${input.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(buildContactEmailPayload(input)),
    });

    const detail = await response.text().catch(() => "Unknown Resend error");

    if (response.ok) {
      let messageId: string | undefined;
      try {
        messageId = (JSON.parse(detail) as { id?: string }).id;
      } catch {
        messageId = undefined;
      }
      return { ok: true, messageId };
    }

    return { ok: false, status: response.status, detail };
  } catch (error) {
    return {
      ok: false,
      detail: error instanceof Error ? error.message : "Unknown network error",
    };
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
