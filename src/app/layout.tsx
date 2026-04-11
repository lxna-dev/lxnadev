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
  title: "LXNA",
  description: "Porfolio Website of Beljohn Luna | Full Stack Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${unifrakturMaguntia.variable} ${voltaire.variable} ${syneMono.variable} mx-auto antialiased`}
      >
        <SidebarLayout>{children}</SidebarLayout>
      </body>
    </html>
  );
}
