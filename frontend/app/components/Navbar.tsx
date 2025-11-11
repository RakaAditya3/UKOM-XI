"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, User } from "lucide-react";
import Image from "next/image";
import api from "@/api/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface NavbarProps {
  isHomePage?: boolean;
}

export default function Navbar({ isHomePage = false }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const HERO_HEIGHT = 900;

  // === SEARCH STATES ===
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScrollY && currentScroll > 100) {
        setScrollDirection("down");
      } else if (currentScroll < lastScrollY) {
        setScrollDirection("up");
      }
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

  // ✅ Cek token login & ambil data user + cart
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);

      (async () => {
        try {
          const userRes = await api.get("/user");
          const u = userRes.data?.data ?? userRes.data;
          setUserName(u.name);

          const res = await api.get("/cart");
          const items = res.data?.items || [];
          setCartCount(items.length);
        } catch (err) {
          console.error("❌ Gagal memuat data user/cart:", err);
          setCartCount(0);
        }
      })();
    }
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
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
    { label: "Collections", route: "/collection" },
    { label: "TAG Heuer F1", route: "/TAG-HEUER-F1" },
    { label: "About Us", route: "/about-us" },
    { label: "History", route: "/history" },
    { label: "Contact Us", route: "/contact-us" },
  ];

  const navbarVisible = scrollDirection !== "down";

  const navbarBg = isHomePage
    ? isScrolled
      ? "bg-black text-white shadow-md"
      : "bg-transparent text-white"
    : "bg-black text-white shadow-md";

  // === SEARCH HANDLER ===
  const handleSearchChange = (value: string) => {
    setQuery(value);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    if (value.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    searchTimeout.current = setTimeout(async () => {
      try {
        setIsSearching(true);
        const res = await api.get("/products");
        const allProducts = res.data.data || res.data;
        const filtered = allProducts.filter((p: any) =>
          p.name.toLowerCase().includes(value.toLowerCase())
        );
        setSearchResults(filtered.slice(0, 6));
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setIsSearching(false);
      }
    }, 400);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setShowSearch(false);
      router.push(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleProfileClick = () => {
    if (isLoggedIn) {
      router.push("/profile");
    } else {
      router.push("/signup");
    }
  };

  return (
    <>
      {/* === NAVBAR === */}
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: navbarVisible ? 0 : -100 }}
        transition={{ type: "tween", duration: 0.4 }}
        className={`fixed top-0 left-0 w-full z-[50] transition-all duration-500 ${navbarBg}`}
      >
        <div className="flex items-center justify-between px-6 md:px-12 py-4">
          {/* === Hamburger === */}
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-md hover:bg-black/10 transition"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* === Logo === */}
          <div className="flex items-center justify-center">
            <Link href="/">
              <Image
                src="/logo-richardmille.png"
                alt="Richard Mille Logo"
                width={100}
                height={40}
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* === Right Icons === */}
          <div className="flex items-center space-x-4 relative" ref={dropdownRef}>
            {/* === Search === */}
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 rounded-md hover:bg-black/10 transition"
            >
              <Search className="w-6 h-6" />
            </button>

            {/* === Profile === */}
<div className="relative" ref={dropdownRef}>
  {isLoggedIn ? (
    <div>
      <button
        onClick={() => setShowDropdown((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-black/10 transition"
      >
        <User className="w-5 h-5" />
        <span className="text-sm font-medium">
          Welcome, {userName?.split(" ")[0] || "User"} 👋
        </span>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-44 bg-white text-black rounded-md shadow-lg border border-gray-200 z-[99]"
          >
            <button
              onClick={() => {
                setShowDropdown(false);
                router.push("/profile");
              }}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              Profile Saya
            </button>
            <button
              onClick={() => {
                setShowDropdown(false);
                router.push("/profile?tab=pembelian");
              }}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              Riwayat Pembelian
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                setIsLoggedIn(false);
                setUserName(null);
                router.push("/");
              }}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  ) : (
    <button
      onClick={handleProfileClick}
      className="p-2 rounded-md hover:bg-black/10 transition"
    >
      <User className="w-6 h-6" />
    </button>
  )}
</div>


            {/* === Cart === */}
            <button
              onClick={() => router.push("/Cart")}
              className="p-2 rounded-md hover:bg-black/10 transition relative"
            ><div className="relative">
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 2.25h1.386c.51 0 .955.346 1.082.841l.383 1.532M7.5 14.25h10.125c.621 0 1.17-.384 1.385-.962l2.25-6a1.125 1.125 0 00-1.053-1.538H5.832M7.5 14.25L5.101 4.623M7.5 14.25a2.25 2.25 0 104.5 0M16.5 14.25a2.25 2.25 0 104.5 0"
    />
  </motion.svg>

  {cartCount > 0 && (
    <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
      {cartCount}
    </span>
  )}
</div>

            </button>
          </div>
        </div>
      </motion.nav>

      {/* === SIDEBAR MENU === */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="overlay"
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[70]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              key="sidebar"
              className="fixed inset-y-0 left-0 w-[420px] bg-black z-[71] shadow-2xl overflow-y-auto"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 35 }}
            >
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
                        <span className="absolute inset-0 bg-white/5 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                        <span className="relative block text-lg font-light tracking-wider text-white/70 group-hover:text-white transition-colors duration-300 uppercase">
                          {item.label}
                        </span>
                        <span className="absolute bottom-3 left-4 h-[1px] w-0 bg-white group-hover:w-12 transition-all duration-300" />
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="absolute bottom-0 left-0 right-0 p-8 border-t border-white/10">
                <p className="text-white/40 text-xs tracking-widest uppercase">
                  © 2025 Chronova
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* === SEARCH OVERLAY === */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: "-10%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-10%" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-black/95 z-[80] flex flex-col items-center justify-center px-6 md:px-0"
          >
            <button
              onClick={() => setShowSearch(false)}
              className="absolute top-6 right-6 text-white hover:text-gray-300 transition"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Search Input */}
            <form
              onSubmit={handleSearchSubmit}
              className="w-full max-w-2xl text-center"
            >
              <motion.input
                value={query}
                onChange={(e) => handleSearchChange(e.target.value)}
                autoFocus
                type="text"
                placeholder="Search for a watch..."
                className="w-full bg-transparent border-b border-gray-500 text-white text-2xl md:text-4xl py-3 text-center focus:outline-none focus:border-white placeholder-gray-500"
              />
            </form>

            {/* Hasil Pencarian */}
            <div className="w-full max-w-2xl mt-8 text-left text-white">
              {isSearching && (
                <p className="text-center text-gray-400">Searching...</p>
              )}
              {!isSearching && searchResults.length > 0 && (
                <ul className="space-y-4">
                  {searchResults.map((p) => (
                    <li
                      key={p.id}
                      onClick={() => {
                        setShowSearch(false);
                        router.push(`/product/${p.id}`);
                      }}
                      className="cursor-pointer hover:text-gray-400 transition text-lg"
                    >
                      {p.name}
                    </li>
                  ))}
                </ul>
              )}
              {!isSearching &&
                query.length >= 2 &&
                searchResults.length === 0 && (
                  <p className="text-center text-gray-500">
                    No results found for “{query}”
                  </p>
                )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
