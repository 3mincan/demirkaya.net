import assert from "node:assert/strict";
import { test } from "node:test";
import {
  buildContactEmailPayload,
  sendContactMail,
  summarizeResendFailure,
} from "./resend";

test("buildContactEmailPayload shapes Resend request", () => {
  const payload = buildContactEmailPayload({
    name: 'Ada <script>',
    email: "ada@example.com",
    message: "Hello\nworld",
    to: "owner@example.com",
    from: "demirkaya.net <onboarding@resend.dev>",
  });

  assert.equal(payload.from, "demirkaya.net <onboarding@resend.dev>");
  assert.deepEqual(payload.to, ["owner@example.com"]);
  assert.equal(payload.reply_to, "ada@example.com");
  assert.match(payload.html, /Ada &lt;script&gt;/);
  assert.match(payload.html, /Hello<br \/>world/);
});

test("sendContactMail posts to Resend with bearer token", async () => {
  const calls: Array<{ url: string; init?: RequestInit }> = [];

  const fakeFetch: typeof fetch = async (url, init) => {
    calls.push({ url: String(url), init });
    return new Response(JSON.stringify({ id: "email_123" }), {
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
      from: "demirkaya.net <onboarding@resend.dev>",
      apiKey: "re_test",
    },
    fakeFetch
  );

  assert.equal(result.ok, true);
  if (result.ok) assert.equal(result.messageId, "email_123");
  assert.equal(calls[0]?.url, "https://api.resend.com/emails");
  const headers = new Headers(calls[0]?.init?.headers);
  assert.equal(headers.get("Authorization"), "Bearer re_test");
});

test("sendContactMail returns Resend failure detail", async () => {
  const fakeFetch: typeof fetch = async () =>
    new Response(JSON.stringify({ message: "Invalid API key" }), {
      status: 401,
    });

  const result = await sendContactMail(
    {
      name: "Ada",
      email: "ada@example.com",
      message: "Hello there friend",
      to: "owner@example.com",
      from: "demirkaya.net <onboarding@resend.dev>",
      apiKey: "bad",
    },
    fakeFetch
  );

  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.status, 401);
    assert.match(result.detail, /Invalid API key/);
  }
});

test("summarizeResendFailure maps common statuses", () => {
  assert.match(summarizeResendFailure(401), /RESEND_API_KEY/);
  assert.match(summarizeResendFailure(422), /MAIL_FROM/);
});
