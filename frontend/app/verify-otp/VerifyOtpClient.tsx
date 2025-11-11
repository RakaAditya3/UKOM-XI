"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "@/api/api";
import { motion } from "framer-motion";

export default function VerifyOtpClient() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const email = searchParams.get("email") || "";

  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const handleVerifyOtp = async () => {
  try {
    const endpoint =
      mode === "login"
        ? "/verify-login-otp"
        : "/verify-signup-otp";

    console.log("🛰️ Requesting:", endpoint);
    console.log({ email, code });

    const res = await axios.post(endpoint, { email, code });

    console.log("✅ Response:", res.data);

    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      setMessage("Success, Anda akan di arahkan...");
      setTimeout(() => (window.location.href = "/"), 1000);
    } else {
      setMessage(res.data.message || "OTP berhasil diverifikasi!");
    }
  } catch (err: any) {
    console.error("❌ Error verifying OTP:", err.response || err);
    setMessage(err.response?.data?.message || "❌ OTP tidak valid atau kadaluarsa");
  }
};


  return (
    <div className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      {/* === Background Video === */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/video/richardmille1.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-black/70" />

      {/* === Form Card === */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md text-center bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl"
      >
        <h1 className="text-3xl font-semibold mb-3">Verifikasi OTP</h1>
        <p className="text-gray-400 mb-6">
          Kode OTP telah dikirim ke <b>{email}</b>
        </p>

        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Masukkan kode OTP"
          className="w-full bg-transparent border border-gray-500 rounded-md px-4 py-2 text-center text-lg focus:border-white outline-none tracking-widest"
        />

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleVerifyOtp}
          className="w-full bg-white text-black py-3 mt-5 rounded-md font-semibold hover:bg-gray-200 transition"
        >
          Verifikasi
        </motion.button>

        {message && <p className="text-sm text-gray-300 mt-4">{message}</p>}
      </motion.div>
    </div>
  );
}
