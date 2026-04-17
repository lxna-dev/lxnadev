import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  UnifrakturMaguntia,
  Voltaire,
  Syne_Mono,
} from "next/font/google";
import "@/styles/globals.css";
import SidebarLayout from "@/layouts/SidebarLayout";

const unifrakturMaguntia = UnifrakturMaguntia({
  variable: "--font-unifraktur-maguntia",
  subsets: ["latin"],
  weight: "400",
});

const voltaire = Voltaire({
  variable: "--font-voltaire",
  subsets: ["latin"],
  weight: "400",
});

const syneMono = Syne_Mono({
  variable: "--font-syne-mono",
  subsets: ["latin"],
  weight: "400",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lxna.dev"),
  title: {
    default: "LXNA",
    template: "%s | LXNA",
  },
  description:
    "Full Stack Developer & GoHighLevel Technical Specialist based in the Philippines.",
  openGraph: {
    type: "website",
    url: "https://www.lxna.dev",
    siteName: "LXNA",
    title: "LXNA",
    description:
      "Full Stack Developer & GoHighLevel Technical Specialist based in the Philippines.",
    images: [{ url: "/opengraph-image" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LXNA",
    description:
      "Full Stack Developer & GoHighLevel Technical Specialist based in the Philippines.",
    images: ["/opengraph-image"],
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Beljohn Luna",
    url: "https://www.lxna.dev",
    jobTitle: "Full Stack Developer",
    email: "beljohnluna@gmail.com",
    sameAs: [
      "https://github.com/lxna-dev",
      "https://www.linkedin.com/in/beljohn-luna/",
    ],
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${unifrakturMaguntia.variable} ${voltaire.variable} ${syneMono.variable} mx-auto antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SidebarLayout>{children}</SidebarLayout>
      </body>
    </html>
  );
}
