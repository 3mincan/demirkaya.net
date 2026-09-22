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

## Contact form (Mailgun)

The `/api/contact` route sends mail through the [Mailgun Messages API](https://documentation.mailgun.com/docs/mailgun/user-manual/sending-messages/) over HTTPS (works reliably on Vercel; no SMTP).

Set these in **Vercel → Project → Settings → Environment Variables** (Production + Preview), remove old `BREVO_*` / `SMTP_*` vars, then redeploy:

| Variable | Required | Description |
| --- | --- | --- |
| `MAILGUN_API_KEY` | yes | Private API key from Mailgun |
| `MAILGUN_DOMAIN` | yes | Verified sending domain (e.g. `mg.demirkaya.net`) |
| `MAIL_FROM` | yes | From address on that domain |
| `MAIL_FROM_NAME` | no | Sender display name (default `demirkaya.net`) |
| `CONTACT_TO` | no | Inbox that receives form messages |
| `MAILGUN_API_BASE` | no | Default `https://api.mailgun.net`; EU accounts use `https://api.eu.mailgun.net` |

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
