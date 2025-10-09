"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Lock, Mail, User } from "lucide-react";
import api from "@/api/api";
import Image from "next/image";

type Step = "signup" | "login" | "verify";

export default function SignupPage() {
  const [step, setStep] = useState<Step>("signup");
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    code: "",
  });
  const [isSignup, setIsSignup] = useState(true);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (step === "signup") {
        const res = await api.post("/signup", {
          name: form.name,
          email: form.email,
          password: form.password,
        });

        if (res.data.message?.toLowerCase().includes("otp")) {
          // arahkan langsung ke halaman verifikasi OTP
          window.location.href = `/verify-otp?mode=signup&email=${encodeURIComponent(form.email)}`;
        } else {
          setMessage(res.data.message || "Gagal mengirim OTP signup.");
        }
      } else if (step === "login") {
        const res = await api.post("/login", {
          email: form.email,
          password: form.password,
        });

        if (res.data.message?.toLowerCase().includes("otp")) {
          window.location.href = `/verify-otp?mode=login&email=${encodeURIComponent(form.email)}`;
        } else {
          setMessage(res.data.message || "Gagal mengirim OTP login.");
        }
      }
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Terjadi kesalahan di server.");
    }
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setStep(isSignup ? "login" : "signup");
    setMessage("");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden px-6">
      {/* === Fullscreen Background Video === */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/video/richardmille1.mp4" type="video/mp4" />
      </video>

      {/* === Dark Overlay === */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* === Card === */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-2xl"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/logo-richardmille.png"
            alt="Logo"
            width={140}
            height={50}
            className="object-contain"
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center mb-6">
          {isSignup ? "Create Account" : "Sign In"}
        </h2>

        {/* === SIGNUP or LOGIN FORM === */}
        <div className="space-y-4">
          {isSignup && (
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                name="name"
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full bg-transparent border border-gray-600 rounded-md px-10 py-2 focus:border-white outline-none"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-transparent border border-gray-600 rounded-md px-10 py-2 focus:border-white outline-none"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full bg-transparent border border-gray-600 rounded-md px-10 py-2 focus:border-white outline-none"
            />
          </div>
        </div>

        {/* === Message === */}
        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-gray-400 mt-4 text-center"
          >
            {message}
          </motion.p>
        )}

        {/* === Submit Button === */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleSubmit}
          className="w-full bg-white text-black mt-6 py-3 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-gray-200 transition"
        >
          {isSignup ? "Sign Up" : "Sign In"}
          <ArrowRight className="w-4 h-4" />
        </motion.button>

        {/* === Switch Mode === */}
        <p className="text-sm text-gray-400 mt-4 text-center">
          {isSignup ? "Sudah punya akun?" : "Belum punya akun?"}{" "}
          <button
            onClick={toggleMode}
            className="text-white font-medium hover:underline"
          >
            {isSignup ? "Sign In" : "Create Account"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
