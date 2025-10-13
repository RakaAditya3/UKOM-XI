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
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const HERO_HEIGHT = 900; 

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      // arah scroll
      if (currentScroll > lastScrollY && currentScroll > 100) {
        setScrollDirection("down");
      } else if (currentScroll < lastScrollY) {
        setScrollDirection("up");
      }

      // sudah melewati hero
      setIsScrolled(currentScroll > HERO_HEIGHT);

      lastScrollY = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    if (localStorage.getItem("token")) setIsLoggedIn(true);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setMessage("");
      const res = await api.post("/login", form);
      if (res.data.message?.toLowerCase().includes("otp")) {
        router.push(`/verify-otp?mode=login&email=${encodeURIComponent(form.email)}`);
      } else {
        setMessage(res.data.message || "Gagal mengirim OTP login.");
      }
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Terjadi kesalahan di server.");
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    { label: "Timepieces", route: "/collections/timepieces" },
    { label: "Connected Watches", route: "/collections/connected" },
    { label: "Eyewear", route: "/collections/eyewear" },
    { label: "Collections", route: "/collections" },
    { label: "Be Inspired", route: "/inspired" },
    { label: "TAG Heuer World", route: "/world" },
    { label: "Services", route: "/services" },
    { label: "Contact Us", route: "/contact" },
  ];

  const navbarVisible = scrollDirection !== "down";
  const navbarBg = isScrolled ? "bg-black text-white shadow-md" : "bg-transparent text-white";

  return (
    <>
      {/*  Navbar  */}
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: navbarVisible ? 0 : -100 }}
        transition={{ type: "tween", duration: 0.4 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${navbarBg}`}
      >
        <div className="flex items-center justify-between px-6 md:px-12 py-4">
          {/* === Hamburger Menu === */}
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-md hover:bg-black/10 transition"
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
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 rounded-md hover:bg-black/10 transition"
            >
              <Search className="w-6 h-6" />
            </button>

            <div
              className="relative"
              onMouseEnter={() => !isLoggedIn && setShowDropdown(true)}
              onMouseLeave={() => !isLoggedIn && setShowDropdown(false)}
            >
              <button className="p-2 rounded-md hover:bg-black/10 transition">
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
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-transparent border border-gray-600 rounded-md px-3 py-2 text-sm focus:border-white outline-none"
                      />
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        className="w-full bg-transparent border border-gray-600 rounded-md px-3 py-2 text-sm focus:border-white outline-none"
                      />
                      <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="w-full bg-white text-black font-semibold rounded-md py-2 hover:bg-gray-200 transition"
                      >
                        {loading ? "Loading..." : "Sign In"}
                      </button>
                      {message && <p className="text-xs text-gray-400 text-center mt-1">{message}</p>}
                      <div className="flex justify-between text-xs text-gray-400 mt-2">
                        <button
                          className="hover:text-white transition"
                          onClick={() => router.push("/forgot-password")}
                        >
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
      </motion.nav>

       {/* Sidebar Menu */}
      <AnimatePresence>
  {isOpen && (
    <>
      {/* Overlay gelap dengan blur */}
      <motion.div
        key="overlay"
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => setIsOpen(false)}
      />

      {/* Panel menu */}
      <motion.div
        key="sidebar"
        className="fixed inset-y-0 left-0 w-[420px] bg-black z-50 shadow-2xl overflow-y-auto"
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 35 }}
      >
        {/* Header */}
        <div className="p-8 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-2xl font-light tracking-widest text-white uppercase">
            Menu
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/60 hover:text-white transition-colors duration-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="px-8 py-12">
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <motion.li
                key={item.route}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <button
                  onClick={() => {
                    setIsOpen(false);
                    router.push(item.route);
                  }}
                  className="group w-full text-left py-4 px-4 -mx-4 relative overflow-hidden transition-all duration-300"
                >
                  {/* Hover effect background */}
                  <span className="absolute inset-0 bg-white/5 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                  
                  {/* Text */}
                  <span className="relative block text-lg font-light tracking-wider text-white/70 group-hover:text-white transition-colors duration-300 uppercase">
                    {item.label}
                  </span>
                  
                  {/* Underline effect */}
                  <span className="absolute bottom-3 left-4 h-[1px] w-0 bg-white group-hover:w-12 transition-all duration-300" />
                </button>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Footer (optional) */}
        <div className="absolute bottom-0 left-0 right-0 p-8 border-t border-white/10">
          <p className="text-white/40 text-xs tracking-widest uppercase">
            © 2025 Chronova
          </p>
        </div>
      </motion.div>
    </>
  )}
      </AnimatePresence>

      {/*  Search Overlay (Tag Heuer Style)  */}
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
