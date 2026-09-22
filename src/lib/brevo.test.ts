import assert from "node:assert/strict";
import { test } from "node:test";
import {
  BREVO_SMTP_HOST,
  BREVO_SMTP_PORT,
  buildContactMailMessage,
  createBrevoTransport,
} from "./brevo";

test("createBrevoTransport uses Brevo SMTP defaults", () => {
  const transport = createBrevoTransport({
    user: "78a361001@smtp-brevo.com",
    pass: "smtp-key",
  });

  const options = (
    transport as unknown as {
      options: { host?: string; port?: number; secure?: boolean };
    }
  ).options;

  assert.equal(options.host, BREVO_SMTP_HOST);
  assert.equal(options.port, BREVO_SMTP_PORT);
  assert.equal(options.secure, false);
});

test("buildContactMailMessage escapes HTML and keeps reply-to", () => {
  const message = buildContactMailMessage({
    name: 'Ada <script>',
    email: "ada@example.com",
    message: "Hello\nworld",
    to: "owner@example.com",
    from: "noreply@demirkaya.net",
  });

  assert.equal(message.from, "noreply@demirkaya.net");
  assert.equal(message.to, "owner@example.com");
  assert.equal(message.replyTo, "ada@example.com");
  assert.match(message.subject, /Ada <script>/);
  assert.match(message.html, /Ada &lt;script&gt;/);
  assert.match(message.html, /Hello<br \/>world/);
  assert.match(message.text, /Hello\nworld/);
});
