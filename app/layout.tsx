import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JICT Online Store | Technology Made Accessible",
  description: "Shop laptops, smartphones, computer accessories, printers, networking equipment and electronics at JICT Jos, Plateau State.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"),
  openGraph: { title: "JICT Online Store", description: "Your trusted technology store in Jos, Nigeria.", type: "website" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}