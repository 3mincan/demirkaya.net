const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

export type ContactMailInput = {
  name: string;
  email: string;
  message: string;
  to: string;
  fromEmail: string;
  fromName?: string;
  apiKey: string;
};

export type SendMailResult =
  | { ok: true; messageId?: string }
  | { ok: false; status?: number; detail: string };

export function buildContactEmailPayload(
  input: Omit<ContactMailInput, "apiKey">
) {
  return {
    sender: {
      email: input.fromEmail,
      name: input.fromName || "demirkaya.net",
    },
    to: [{ email: input.to }],
    replyTo: {
      email: input.email,
      name: input.name,
    },
    subject: `New message from ${input.name} via demirkaya.net`,
    textContent: `Name: ${input.name}\nEmail: ${input.email}\n\n${input.message}`,
    htmlContent: `
      <p><strong>Name:</strong> ${escapeHtml(input.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
      <p>${escapeHtml(input.message).replace(/\n/g, "<br />")}</p>
    `,
  };
}

export async function sendContactMail(
  input: ContactMailInput,
  fetchImpl: typeof fetch = fetch
): Promise<SendMailResult> {
  try {
    const response = await fetchImpl(BREVO_API_URL, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": input.apiKey,
      },
      body: JSON.stringify(buildContactEmailPayload(input)),
    });

    if (response.ok) {
      const data = (await response.json().catch(() => null)) as {
        messageId?: string;
      } | null;
      return { ok: true, messageId: data?.messageId };
    }

    const detail = await response.text().catch(() => "Unknown Brevo error");
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
