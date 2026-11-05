import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/header";
import { MotionController } from "@/components/motion-controller";
import { Contact, Footer } from "@/components/footer";
import { profile } from "@/content/portfolio";
import { absoluteUrl, siteOrigin } from "@/lib/site";
import "./globals.css";
import "./enhancements.css";

const manrope = localFont({ src: "../../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2", variable: "--font-heading", display: "swap" });
const dmSans = localFont({ src: "../../node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2", variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: siteOrigin ? new URL(siteOrigin) : undefined,
  title: { default: "Mohammed Adel — Flutter Developer & Mobile Software Engineer", template: "%s | Mohammed Adel" },
  description: profile.description,
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: { title: "Mohammed Adel — Flutter apps, from architecture to release.", description: profile.description, type: "website", locale: "en_US", siteName: "Mohammed Adel", images: [{ url: absoluteUrl("/images/social/portfolio.png") || "/images/social/portfolio.png", width: 1200, height: 630, alt: "Mohammed Adel — Flutter Developer" }] },
  twitter: { card: "summary_large_image", title: "Mohammed Adel — Flutter Developer", description: profile.description, images: ["/images/social/portfolio.png"] },
  icons: { icon: "/icon.svg", apple: "/apple-icon.png" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#fafbf8" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${manrope.variable} ${dmSans.variable}`}><body id="top"><a href="#main" className="skip-link">Skip to content</a><Header />{children}<Contact /><Footer /><MotionController /></body></html>;
}
