"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="backdrop-blur-sm shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-white">NCSFood</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-8">
            <Link
              href="/"
              className={`transition-colors hover:text-emerald-600 ${
                pathname === "/"
                  ? "text-emerald-600 font-semibold"
                  : "text-gray-300"
              }`}
            >
              Home
            </Link>
            <Link
              href="/reviews"
              className={`transition-colors hover:text-emerald-600 ${
                pathname === "/reviews"
                  ? "text-emerald-600 font-semibold"
                  : "text-gray-300"
              }`}
            >
              All Reviews
            </Link>
            <Link
              href="/about"
              className={`transition-colors hover:text-emerald-600 ${
                pathname === "/about"
                  ? "text-emerald-600 font-semibold"
                  : "text-gray-300"
              }`}
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
