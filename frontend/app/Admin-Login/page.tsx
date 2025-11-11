"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight } from "lucide-react";
import Image from "next/image";
import api from "@/api/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await api.post("/admin/login", form);
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role !== "user") {
        setMessage("✅ Login berhasil, mengarahkan ke dashboard...");
        setTimeout(() => router.push("/Admin/Dashboard"), 1200);
      } else {
        setMessage("🚫 Akses ditolak! Hanya admin yang bisa login di sini.");
      }
    } catch (err: any) {
      console.error(err);
      setMessage(err.response?.data?.message || "Login gagal, periksa data Anda.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white overflow-hidden px-4">
      {/* === Background Video === */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/video/richardmille1.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* === Login Card === */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/logo-richardmille.png"
            alt="Admin Logo"
            width={150}
            height={50}
            className="object-contain"
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center mb-6">
          Login Administrator
        </h2>

        {/* Form */}
        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              name="email"
              type="email"
              placeholder="Email Admin"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-transparent border border-gray-500 rounded-lg px-10 py-3 focus:border-white outline-none text-white"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              name="password"
              type="password"
              placeholder="Kata Sandi"
              value={form.password}
              onChange={handleChange}
              className="w-full bg-transparent border border-gray-500 rounded-lg px-10 py-3 focus:border-white outline-none text-white"
            />
          </div>
        </div>

        {/* Message */}
        {message && (
          <p className="text-sm text-center text-gray-300 mt-4">{message}</p>
        )}

        {/* Submit */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          disabled={loading}
          onClick={handleSubmit}
          className="w-full bg-white text-black mt-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-200 transition"
        >
          {loading ? "Memproses..." : "Masuk ke Dashboard"}
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </motion.div>
    </div>
  );
}
