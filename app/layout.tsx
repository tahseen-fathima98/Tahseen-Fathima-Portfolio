import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://tahseen-fathima.vercel.app"),
  title: "Tahseen Fathima — Full Stack Developer",
  description: "Full Stack Developer with 5+ years of experience building responsive products, AI integrations, secure dashboards and scalable web systems.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "Tahseen Fathima — Full Stack Developer",
    description: "Frontend-to-backend engineer building intelligent, scalable digital products.",
    images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630, alt: "Tahseen Fathima portfolio" }],
  },
  twitter: { card: "summary_large_image", images: ["/opengraph-image.jpg"] },
  robots: { index: true, follow: true },
  icons: { icon: "/tf-logo.png", apple: "/tf-logo.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Tahseen Fathima",
    jobTitle: "Full Stack Developer",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://tahseen-fathima.vercel.app",
    sameAs: ["https://linkedin.com/in/tahseen-fathima", "https://github.com/tahseen-fathima98"],
  };
  return (
    <html lang="en">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
