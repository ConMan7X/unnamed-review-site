import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NCSFood - Connor and Nicole Sydney Food Reviews",
  description:
    "Discover the best Sydney restaurants through Connor and Nicole's food reviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <footer className="bg-green py-8">
            <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
              <p>
                © {new Date().getFullYear()} NCSFood. Connor and Nicole's food
                reviews.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
