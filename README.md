This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Contact form (Resend)

The `/api/contact` route sends mail through the [Resend Email API](https://resend.com/docs/api-reference/emails/send-email) over HTTPS.

Set these in **Vercel → Project → Settings → Environment Variables** (Production + Preview), remove old `MAILGUN_*` / `BREVO_*` / `SMTP_*` vars, then **Redeploy**:

| Variable | Required | Description |
| --- | --- | --- |
| `RESEND_API_KEY` | yes | API key from Resend (`re_…`) |
| `MAIL_FROM` | no | Default `demirkaya.net <onboarding@resend.dev>` until `demirkaya.net` DNS is verified in Resend |
| `CONTACT_TO` | no | Inbox that receives form messages (default `e.demirkaya@gmail.com`) |

If `/api/contact` returns 500, the JSON body includes a `reason` field.

### Verify `demirkaya.net` in Resend (optional, for branded From)

Add these DNS records (from Resend Domains), then click Verify in Resend:

| Type | Name | Value |
| --- | --- | --- |
| TXT | `resend._domainkey` | (DKIM value from Resend dashboard) |
| CNAME | `send` | `send.forge.rmta.net` |
| CNAME | `rsend` | `rsend-euw1.forge.rmta.net` |

Until verified, keep `MAIL_FROM=demirkaya.net <onboarding@resend.dev>`.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
