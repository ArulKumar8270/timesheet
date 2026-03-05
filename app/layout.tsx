import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nicknameinfo.net";

// SEO aligned with Google SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
// Note: Google does not use the keywords meta tag; focus on title, description, and content.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NickName Time Sheet | UAE Timesheet & Attendance Software | MOHRE & WPS Compliant",
    template: "%s | NickName Time Sheet",
  },
  description:
    "The #1 timesheet and attendance software for UAE businesses. MOHRE & WPS compliant. Automate attendance, payroll, leave management, and overtime tracking for Dubai, Abu Dhabi & the Emirates. Free trial.",
  authors: [{ name: "NickName InfoTech", url: siteUrl }],
  creator: "NickName InfoTech",
  publisher: "NickName InfoTech",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "NickName Time Sheet",
    title: "NickName Time Sheet | UAE Timesheet & Attendance Software",
    description:
      "MOHRE & WPS compliant timesheet and attendance software for UAE. Automate attendance, payroll, leave, and overtime for Dubai, Abu Dhabi & the Emirates.",
    locale: "en_AE",
    images: [
      {
        url: "/images/Logo.png",
        width: 512,
        height: 512,
        alt: "NickName Time Sheet - UAE Timesheet Software",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NickName Time Sheet | UAE Timesheet & Attendance Software",
    description: "MOHRE & WPS compliant timesheet software for UAE businesses. Free trial.",
    images: ["/images/Logo.png"],
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "technology",
  verification: {
    // Uncomment and add your IDs when you have them:
    // google: "your-google-verification-id",
    // yandex: "your-yandex-verification-id",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "NickName InfoTech",
      url: siteUrl,
      logo: { "@type": "ImageObject", url: `${siteUrl}/images/Logo.png` },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#software`,
      name: "NickName Time Sheet",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, iOS, Android",
      description:
        "Timesheet and attendance software for UAE businesses. MOHRE and WPS compliant. Attendance, payroll, leave management, overtime tracking for Dubai, Abu Dhabi and the Emirates.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "AED" },
      featureList: [
        "Attendance & timesheet management",
        "MOHRE & WPS compliance",
        "Leave management",
        "Overtime tracking",
        "Payroll integration",
        "Biometric sync",
        "GPS tracking",
        "Multilingual (Arabic, English, Hindi, Tagalog)",
      ],
      author: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "NickName Time Sheet",
      description: "UAE Timesheet & Attendance Software | MOHRE & WPS Compliant",
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en-AE",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
        />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>

      <body className={plusJakarta.variable}>
        {children}

        {/* Bootstrap JS */}
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
