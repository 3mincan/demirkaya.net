import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-7EDVRSZX2M";

export const metadata: Metadata = {
  metadataBase: new URL("https://demirkaya.net"),
  title: {
    default: "Emincan Demirkaya | Senior Frontend Developer",
    template: "%s | Emincan Demirkaya",
  },
  description:
    "Senior Frontend Developer in London building scalable React, Next.js, and TypeScript applications with frontend-first full-stack experience.",
  keywords: [
    "Emincan Demirkaya",
    "Senior Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Frontend Engineer London",
    "Full Stack Developer",
  ],
  authors: [{ name: "Emincan Demirkaya", url: "https://demirkaya.net" }],
  creator: "Emincan Demirkaya",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://demirkaya.net",
    title: "Emincan Demirkaya | Senior Frontend Developer",
    description:
      "Frontend-focused full-stack developer building scalable React, Next.js, and TypeScript applications.",
    siteName: "Emincan Demirkaya",
    locale: "en_GB",
    images: [
      {
        url: "/profile.png",
        width: 1200,
        height: 630,
        alt: "Emincan Demirkaya",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emincan Demirkaya | Senior Frontend Developer",
    description:
      "Frontend-focused full-stack developer building scalable React, Next.js, and TypeScript applications.",
    images: ["/profile.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="beforeInteractive"
        />
        <Script id="google-analytics" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            window.gtag = function gtag(){window.dataLayer.push(arguments);}
            window.gtag('js', new Date());
            window.gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}