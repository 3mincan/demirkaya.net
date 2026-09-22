import assert from "node:assert/strict";
import { test } from "node:test";
import {
  buildContactMailForm,
  buildMailgunMessagesUrl,
  sendContactMail,
} from "./mailgun";

test("buildMailgunMessagesUrl encodes domain and strips trailing slash", () => {
  assert.equal(
    buildMailgunMessagesUrl("mg.demirkaya.net"),
    "https://api.mailgun.net/v3/mg.demirkaya.net/messages"
  );
  assert.equal(
    buildMailgunMessagesUrl("mg.demirkaya.net", "https://api.eu.mailgun.net/"),
    "https://api.eu.mailgun.net/v3/mg.demirkaya.net/messages"
  );
});

test("buildContactMailForm sets from, reply-to, and escaped html", () => {
  const body = buildContactMailForm({
    name: 'Ada <script>',
    email: "ada@example.com",
    message: "Hello\nworld",
    to: "owner@example.com",
    fromEmail: "noreply@mg.demirkaya.net",
    fromName: "Portfolio",
  });

  assert.equal(body.get("from"), "Portfolio <noreply@mg.demirkaya.net>");
  assert.equal(body.get("to"), "owner@example.com");
  assert.equal(body.get("h:Reply-To"), "ada@example.com");
  assert.match(body.get("subject") ?? "", /Ada <script>/);
  assert.match(body.get("html") ?? "", /Ada &lt;script&gt;/);
  assert.match(body.get("html") ?? "", /Hello<br \/>world/);
});

test("sendContactMail posts to Mailgun with basic auth", async () => {
  const calls: Array<{ url: string; init?: RequestInit }> = [];

  const fakeFetch: typeof fetch = async (url, init) => {
    calls.push({ url: String(url), init });
    return new Response(JSON.stringify({ id: "<msg-1>", message: "Queued" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  const result = await sendContactMail(
    {
      name: "Ada",
      email: "ada@example.com",
      message: "Hello there friend",
      to: "owner@example.com",
      fromEmail: "noreply@mg.demirkaya.net",
      apiKey: "key-test",
      domain: "mg.demirkaya.net",
    },
    fakeFetch
  );

  assert.equal(result.ok, true);
  if (result.ok) assert.equal(result.messageId, "<msg-1>");

  assert.equal(
    calls[0]?.url,
    "https://api.mailgun.net/v3/mg.demirkaya.net/messages"
  );
  const headers = new Headers(calls[0]?.init?.headers);
  assert.equal(
    headers.get("Authorization"),
    `Basic ${Buffer.from("api:key-test").toString("base64")}`
  );
  assert.equal(
    headers.get("Content-Type"),
    "application/x-www-form-urlencoded"
  );
});

test("sendContactMail returns Mailgun failure detail", async () => {
  const fakeFetch: typeof fetch = async () =>
    new Response("Forbidden", { status: 401 });

  const result = await sendContactMail(
    {
      name: "Ada",
      email: "ada@example.com",
      message: "Hello there friend",
      to: "owner@example.com",
      fromEmail: "noreply@mg.demirkaya.net",
      apiKey: "bad",
      domain: "mg.demirkaya.net",
    },
    fakeFetch
  );

  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.status, 401);
    assert.match(result.detail, /Forbidden/);
  }
});
