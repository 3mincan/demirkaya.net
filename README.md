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

## Contact form (Brevo API)

The `/api/contact` route sends mail through the [Brevo transactional email API](https://developers.brevo.com/reference/send-transac-email) (HTTPS). This is intentional: outbound SMTP from Vercel is unreliable.

Set these environment variables in **Vercel → Project → Settings → Environment Variables** (Production + Preview), then redeploy:

| Variable | Required | Description |
| --- | --- | --- |
| `BREVO_API_KEY` | yes | API key from Brevo → SMTP & API → **API keys** (starts with `xkeysib-`) |
| `MAIL_FROM` | yes | Verified sender email in Brevo (not the `…@smtp-brevo.com` login) |
| `MAIL_FROM_NAME` | no | Sender display name (default `demirkaya.net`) |
| `CONTACT_TO` | no | Inbox that receives form messages |

Do **not** use `SMTP_USER` / `SMTP_PASS` for this app — those are SMTP-only and are ignored.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
