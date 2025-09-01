import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb Clone v2 - Luxury Vacation Rentals",
  description:
    "Discover unique accommodations worldwide with our modern vacation rental platform. Book stunning properties with smooth animations and exceptional user experience.",
  keywords:
    "vacation rentals, luxury accommodations, travel, booking, vacation homes",
  authors: [{ name: "Airbnb Clone Team" }],
  openGraph: {
    title: "Airbnb Clone v2 - Luxury Vacation Rentals",
    description:
      "Discover unique accommodations worldwide with our modern vacation rental platform.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Airbnb Clone v2 - Luxury Vacation Rentals",
    description:
      "Discover unique accommodations worldwide with our modern vacation rental platform.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
