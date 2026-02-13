import type { Metadata } from "next";
import { Geist, Geist_Mono, Caveat } from "next/font/google"; // 1. Import Caveat
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveat = Caveat({ // 2. Configure Caveat
  variable: "--font-caveat",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Brigadeiríssimo",
  description: "Os melhores doces de Belém",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
