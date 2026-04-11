import type { Metadata } from "next";
import { ThemeProvider } from "./components/ThemeProvider";
import Preloader from "./components/Preloader";
import "./globals.css";

export const metadata: Metadata = {
  title: "GreenChain — India's Farmer-First Carbon Credit Platform",
  description:
    "GreenChain connects 125 million Indian smallholder farmers to the global carbon economy. INR-native carbon credits, BRSR-aligned ESG reporting, and verifiable sustainability — all in one platform.",
  keywords: [
    "carbon credits",
    "India",
    "farmers",
    "ESG",
    "sustainability",
    "BRSR",
    "CCTS",
    "MRV",
    "GreenChain",
  ],
  openGraph: {
    title: "GreenChain — India's Farmer-First Carbon Credit Platform",
    description:
      "Connecting Indian farmers to the global carbon economy. INR-native. Farmer-first. Blockchain-verified.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Preloader />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
