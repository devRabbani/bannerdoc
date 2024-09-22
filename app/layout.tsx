import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/components/nav";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "BannerDoc - Create Eye-Catching Social Media Banners",
  description:
    "Create stunning banners for Twitter, LinkedIn, and YouTube with BannerDoc. Customize headers for your social profiles with ease.",
  keywords: [
    "banner generator",
    "Twitter banner",
    "LinkedIn banner",
    "YouTube banner",
    "social media",
    "header image",
    "profile banner",
  ],
  authors: [{ name: "Golam Rabbani", url: "https://rabbani.updash.in" }],
  creator: "Golam Rabbani",
  publisher: "CanWeBe!",
  metadataBase: new URL("https://bannerdoc.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "BannerDoc - Create Eye-Catching Social Media Banners",
    description:
      "Design professional-looking banners for Twitter, LinkedIn, and YouTube profiles with ease using BannerDoc.",
    url: "https://bannerdoc.vercel.app",
    siteName: "BannerDoc",
    images: [
      {
        url: "https://bannerdoc.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "BannerDoc - Social Media Banner Generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BannerDoc - Create Eye-Catching Social Media Banners",
    description:
      "Create stunning headers for Twitter, LinkedIn, and YouTube with BannerDoc. Customize colors, patterns, and text for your profiles.",
    creator: "@devrabbani",
    images: ["https://bannerdoc.vercel.app/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: "76C2hWhD9MhyJAHhDRqU-1zoKf3sK3pSFZxhqnXmRo4",
  },
  category: "Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav />
          <main className="container pb-16 pt-2">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
