const DEFAULT_MAILGUN_API_BASE = "https://api.mailgun.net";

export type ContactMailInput = {
  name: string;
  email: string;
  message: string;
  to: string;
  fromEmail: string;
  fromName?: string;
  apiKey: string;
  domain: string;
  apiBase?: string;
};

export type SendMailResult =
  | { ok: true; messageId?: string }
  | { ok: false; status?: number; detail: string };

export function buildContactMailForm(
  input: Omit<ContactMailInput, "apiKey" | "domain" | "apiBase">
) {
  const fromName = input.fromName || "demirkaya.net";
  const body = new URLSearchParams();
  body.set("from", `${fromName} <${input.fromEmail}>`);
  body.set("to", input.to);
  body.set("subject", `New message from ${input.name} via demirkaya.net`);
  body.set(
    "text",
    `Name: ${input.name}\nEmail: ${input.email}\n\n${input.message}`
  );
  body.set(
    "html",
    `
      <p><strong>Name:</strong> ${escapeHtml(input.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
      <p>${escapeHtml(input.message).replace(/\n/g, "<br />")}</p>
    `
  );
  body.set("h:Reply-To", input.email);
  return body;
}

export function buildMailgunMessagesUrl(domain: string, apiBase?: string) {
  const base = (apiBase || DEFAULT_MAILGUN_API_BASE).replace(/\/$/, "");
  return `${base}/v3/${encodeURIComponent(domain)}/messages`;
}

export async function sendContactMail(
  input: ContactMailInput,
  fetchImpl: typeof fetch = fetch
): Promise<SendMailResult> {
  const url = buildMailgunMessagesUrl(input.domain, input.apiBase);
  const auth = Buffer.from(`api:${input.apiKey}`).toString("base64");

  try {
    const response = await fetchImpl(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: buildContactMailForm(input).toString(),
    });

    const detail = await response.text().catch(() => "Unknown Mailgun error");

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
