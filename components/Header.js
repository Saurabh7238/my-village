"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useSession, signOut, signIn } from "next-auth/react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    ["Home", "/"],
    ["Birth", "/birth"],
    ["Death", "/death"],
    ["Aadhar", "/aadhar"],
    ["Voter", "/voter"],
    ["Budget", "/budget"],
    ["Development", "/development"],
    ["Members", "/members"],
    ["Appointments", "/appointments"],
    ["Gallery", "/gallery"],
    ["Map", "/map"],
    ["Infra", "/infrastructure"],
  ];
  
  if (session?.user?.role === "admin") {
    navItems.push(["Admin Panel", "/admin"]);
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-green-700/90 backdrop-blur shadow-lg"
          : "bg-gradient-to-r from-green-700 via-green-600 to-green-500"
      }`}
    >
      <div className="bg-green-600 overflow-hidden">
        <motion.div
          className="py-2 text-sm font-semibold tracking-wide whitespace-nowrap text-white"
          animate={{ x: ["100%", "-100%"] }}
          transition={{
            ease: "linear",
            duration: 15,
            repeat: Infinity,
          }}
        >
          🌟 Welcome to Gram Panchayat Portal — “सर्वजन हिताय, सर्वजन सुखाय” —
          Efficient Governance for Every Citizen 🌟
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center justify-between py-3">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-2xl font-bold tracking-wide text-white">
            Gram Panchayat
          </Link>
          <span className="text-sm text-green-100">Portal</span>
        </div>

        <div className="relative flex items-center gap-4">
          {status === "loading" ? (
            <div className="text-white text-sm">Loading...</div>
          ) : session ? (
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition font-semibold"
            >
              Sign Out
            </button>
          ) : (
            <>
              <Link
                href="/register"
                className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition font-semibold"
              >
                Register
              </Link>
              <button
                onClick={() => signIn("credentials", { callbackUrl: '/admin' })}
                className="px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 transition font-semibold"
              >
                Sign In
              </button>
            </>
          )}

          <button
            onClick={() => setOpen(!open)}
            className="px-4 py-2 bg-white text-green-700 rounded-md shadow hover:scale-105 transition font-semibold"
            aria-expanded={open}
            aria-controls="main-menu"
          >
            {open ? "✕ Close" : "☰ Menu"}
          </button>

          <AnimatePresence>
            {open && (
              <motion.ul
                id="main-menu"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute right-0 top-full mt-2 w-56 bg-white rounded-md shadow-lg overflow-hidden"
                onMouseLeave={() => setOpen(false)}
              >
                {navItems.map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`block px-4 py-2 transition ${
                        pathname === href
                          ? "bg-green-100 text-green-800 font-semibold"
                          : "text-green-700 hover:bg-green-100"
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}