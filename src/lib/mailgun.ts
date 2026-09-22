const DEFAULT_MAILGUN_API_BASE = "https://api.mailgun.net";
const EU_MAILGUN_API_BASE = "https://api.eu.mailgun.net";

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
  | { ok: false; status?: number; detail: string; apiBaseTried: string };

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

export function summarizeMailgunFailure(status?: number, detail?: string) {
  const text = (detail || "").toLowerCase();

  if (status === 401 || status === 403) {
    return "Mailgun auth failed — check MAILGUN_API_KEY, or set MAILGUN_API_BASE=https://api.eu.mailgun.net for EU accounts.";
  }
  if (status === 404) {
    return "Mailgun domain not found — check MAILGUN_DOMAIN matches a verified domain in Mailgun.";
  }
  if (status === 400 && text.includes("sandbox")) {
    return "Mailgun sandbox can only send to authorized recipients — authorize CONTACT_TO or use a verified custom domain.";
  }
  if (status === 400) {
    return "Mailgun rejected the message — check MAIL_FROM is an address on MAILGUN_DOMAIN.";
  }
  if (!status) {
    return "Could not reach Mailgun — network error from the server.";
  }
  return `Mailgun returned HTTP ${status}.`;
}

async function postMailgunMessage(
  input: ContactMailInput,
  apiBase: string,
  fetchImpl: typeof fetch
): Promise<SendMailResult> {
  const url = buildMailgunMessagesUrl(input.domain, apiBase);
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

    return {
      ok: false,
      status: response.status,
      detail,
      apiBaseTried: apiBase,
    };
  } catch (error) {
    return {
      ok: false,
      detail: error instanceof Error ? error.message : "Unknown network error",
      apiBaseTried: apiBase,
    };
  }
}

export async function sendContactMail(
  input: ContactMailInput,
  fetchImpl: typeof fetch = fetch
): Promise<SendMailResult> {
  const preferredBase = (input.apiBase || DEFAULT_MAILGUN_API_BASE).replace(
    /\/$/,
    ""
  );
  const first = await postMailgunMessage(input, preferredBase, fetchImpl);
  if (first.ok) return first;

  // Common misconfig: EU Mailgun account hitting the US API host.
  const shouldRetryEu =
    !input.apiBase &&
    preferredBase === DEFAULT_MAILGUN_API_BASE &&
    (first.status === 401 || first.status === 403);

  if (shouldRetryEu) {
    const second = await postMailgunMessage(input, EU_MAILGUN_API_BASE, fetchImpl);
    if (second.ok) return second;
    return second;
  }

  return first;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
