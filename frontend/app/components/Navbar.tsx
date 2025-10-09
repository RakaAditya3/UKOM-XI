"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, User } from "lucide-react";
import Image from "next/image";
import api from "@/api/api";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    if (localStorage.getItem("token")) setIsLoggedIn(true);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // === Handle Sign In from Dropdown ===
  const handleLogin = async () => {
    try {
      setLoading(true);
      setMessage("");
      const res = await api.post("/login", {
        email: form.email,
        password: form.password,
      });

      if (res.data.message?.toLowerCase().includes("otp")) {
        router.push(
          `/verify-otp?mode=login&email=${encodeURIComponent(form.email)}`
        );
      } else {
        setMessage(res.data.message || "Gagal mengirim OTP login.");
      }
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Terjadi kesalahan di server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* === Navbar === */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all ${
          isScrolled ? "bg-black/50 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-12 py-4">
          {/* === Hamburger Menu === */}
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-md text-white hover:bg-white/10 transition"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* === Logo === */}
          <div className="flex items-center justify-center">
            <Image
              src="/logo-richardmille.png"
              alt="Richard Mille Logo"
              width={100}
              height={40}
              className="object-contain"
              priority
            />
          </div>

          {/* === Right Icons === */}
          <div className="flex items-center space-x-4 relative" ref={dropdownRef}>
            {/* Search Button */}
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 rounded-md text-white hover:bg-white/10 transition"
            >
              <Search className="w-6 h-6" />
            </button>

            {/* Profile Button */}
            <div
              className="relative"
              onMouseEnter={() => !isLoggedIn && setShowDropdown(true)}
              onMouseLeave={() => !isLoggedIn && setShowDropdown(false)}
            >
              <button className="p-2 rounded-md text-white hover:bg-white/10 transition">
                <User className="w-6 h-6" />
              </button>

              {/* Dropdown */}
              <AnimatePresence>
                {showDropdown && !isLoggedIn && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="absolute right-0 top-full mt-3 w-72 bg-black text-white rounded-2xl shadow-lg border border-white/10 overflow-hidden"
                  >
                    <div className="p-6 space-y-4">
                      <h3 className="text-lg font-semibold">Sign In</h3>

                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full bg-transparent border border-gray-600 rounded-md px-3 py-2 text-sm focus:border-white outline-none"
                      />
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full bg-transparent border border-gray-600 rounded-md px-3 py-2 text-sm focus:border-white outline-none"
                      />

                      <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="w-full bg-white text-black font-semibold rounded-md py-2 hover:bg-gray-200 transition"
                      >
                        {loading ? "Loading..." : "Sign In"}
                      </button>

                      {message && (
                        <p className="text-xs text-gray-400 text-center mt-1">
                          {message}
                        </p>
                      )}

                      <div className="flex justify-between text-xs text-gray-400 mt-2">
                        <button className="hover:text-white transition" onClick={() => router.push("/forgot-password")}>
                          Forgot Password?
                        </button>
                        <button
                          onClick={() => router.push("/signup")}
                          className="hover:text-white transition"
                        >
                          Create Account
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>

      {/* === Search Overlay (Tag Heuer Style) === */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: "-10%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-10%" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-black/95 z-[60] flex flex-col items-center justify-center px-6 md:px-0"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowSearch(false)}
              className="absolute top-6 right-6 text-white hover:text-gray-300 transition"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Search Input */}
            <div className="w-full max-w-2xl text-center">
              <motion.input
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                type="text"
                placeholder="Search for a watch..."
                className="w-full bg-transparent border-b border-gray-500 text-white text-2xl md:text-4xl py-3 text-center focus:outline-none focus:border-white placeholder-gray-500"
              />
            </div>

            {/* Suggestion Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-400 text-sm md:text-base mt-6"
            >
              Try searching for “Tourbillon” or “Automatic Chronograph”
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
