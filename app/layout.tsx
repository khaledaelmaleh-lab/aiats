import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { LoadingScreen } from "@/components/loading-screen";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});
const ibmPlexSans = IBM_Plex_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-sans',
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
  title: "Bona - AI Hiring Assistant for Customer Service",
  description: "Automate your customer service hiring process with Bona. AI-powered candidate screening, interviews, and matching.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexSans.variable} dark`}>
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}
