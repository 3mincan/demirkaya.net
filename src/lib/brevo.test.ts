import assert from "node:assert/strict";
import { test } from "node:test";
import { buildContactEmailPayload, sendContactMail } from "./brevo";

test("buildContactEmailPayload shapes Brevo transactional request", () => {
  const payload = buildContactEmailPayload({
    name: 'Ada <script>',
    email: "ada@example.com",
    message: "Hello\nworld",
    to: "owner@example.com",
    fromEmail: "noreply@demirkaya.net",
    fromName: "Portfolio",
  });

  assert.equal(payload.sender.email, "noreply@demirkaya.net");
  assert.equal(payload.sender.name, "Portfolio");
  assert.deepEqual(payload.to, [{ email: "owner@example.com" }]);
  assert.deepEqual(payload.replyTo, {
    email: "ada@example.com",
    name: 'Ada <script>',
  });
  assert.match(payload.htmlContent, /Ada &lt;script&gt;/);
  assert.match(payload.htmlContent, /Hello<br \/>world/);
});

test("sendContactMail posts to Brevo API with api-key", async () => {
  const calls: Array<{ url: string; init?: RequestInit }> = [];

  const fakeFetch: typeof fetch = async (url, init) => {
    calls.push({ url: String(url), init });
    return new Response(JSON.stringify({ messageId: "msg-1" }), {
      status: 201,
      headers: { "content-type": "application/json" },
    });
  };

  const result = await sendContactMail(
    {
      name: "Ada",
      email: "ada@example.com",
      message: "Hello there friend",
      to: "owner@example.com",
      fromEmail: "noreply@demirkaya.net",
      apiKey: "xkeysib-test",
    },
    fakeFetch
  );

  assert.equal(result.ok, true);
  if (result.ok) assert.equal(result.messageId, "msg-1");

  assert.equal(calls[0]?.url, "https://api.brevo.com/v3/smtp/email");
  const headers = new Headers(calls[0]?.init?.headers);
  assert.equal(headers.get("api-key"), "xkeysib-test");
});

test("sendContactMail returns Brevo failure detail", async () => {
  const fakeFetch: typeof fetch = async () =>
    new Response(JSON.stringify({ message: "Key not found" }), {
      status: 401,
    });

  const result = await sendContactMail(
    {
      name: "Ada",
      email: "ada@example.com",
      message: "Hello there friend",
      to: "owner@example.com",
      fromEmail: "noreply@demirkaya.net",
      apiKey: "bad",
    },
    fakeFetch
  );

  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.status, 401);
    assert.match(result.detail, /Key not found/);
  }
});
