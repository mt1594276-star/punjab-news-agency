import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdminFloatingButton } from "@/components/AdminFloatingButton";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Punjab News Agency - Digital Magazine Platform",
  description: "Discover the latest news, stories, and insights from Punjab. Access our digital magazine collection anytime, anywhere.",
  keywords: ["Punjab", "News", "Magazine", "Digital Publishing", "Punjab News"],
  authors: [{ name: "Punjab News Agency" }],
  openGraph: {
    title: "Punjab News Agency",
    description: "Your trusted source for Punjab news and digital magazines",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Navbar />
        <main className="pt-20">
          {children}
        </main>
        <Footer />
        <AdminFloatingButton />
      </body>
    </html>
  );
}
