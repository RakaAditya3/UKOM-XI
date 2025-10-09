"use client";
import { useState } from "react";
import axios from "@/api/api";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!email) return alert("Masukkan email terlebih dahulu!");
    try {
      setLoading(true);
      const res = await axios.post("/forgot-password", { email });
      alert(res.data.message || "OTP telah dikirim ke email Anda.");
      setStep("otp");
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal mengirim OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyReset = async () => {
    if (!code || !password || !passwordConfirm)
      return alert("Semua field wajib diisi!");

    try {
      setLoading(true);
      const res = await axios.post("/verify-reset-otp", {
        email,
        code,
        password,
        password_confirmation: passwordConfirm,
      });

      alert(res.data.message || "Password berhasil direset!");
      window.location.href = "/";
    } catch (err: any) {
      alert(err.response?.data?.message || "OTP tidak valid atau kadaluarsa");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      {/* 🎥 Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      >
        <source src="/videos/richardmille3.mp4" type="video/mp4" />
      </video>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

      {/* Form Section */}
      <div className="relative z-10 w-full max-w-md px-8 py-10 bg-black/70 backdrop-blur-md rounded-2xl shadow-lg text-center space-y-5">
        <h1 className="text-3xl font-semibold mb-4">
          {step === "email" ? "Lupa Password" : "Verifikasi OTP"}
        </h1>

        {step === "email" ? (
          <>
            <p className="text-gray-400 mb-3">
              Masukkan email Anda untuk menerima kode verifikasi reset password.
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Anda"
              className="w-full bg-transparent border border-gray-500 rounded-md px-4 py-2 text-center text-lg"
            />
            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full bg-white text-black py-2 rounded-md hover:bg-gray-200 transition disabled:opacity-50"
            >
              {loading ? "Mengirim..." : "Kirim OTP"}
            </button>
          </>
        ) : (
          <>
            <p className="text-gray-400">
              Masukkan kode OTP yang telah dikirim ke <b>{email}</b>
            </p>

            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Kode OTP"
              className="w-full bg-transparent border border-gray-500 rounded-md px-4 py-2 text-center text-lg"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password Baru"
              className="w-full bg-transparent border border-gray-500 rounded-md px-4 py-2 text-center text-lg"
            />

            <input
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="Konfirmasi Password Baru"
              className="w-full bg-transparent border border-gray-500 rounded-md px-4 py-2 text-center text-lg"
            />

            <button
              onClick={handleVerifyReset}
              disabled={loading}
              className="w-full bg-white text-black py-2 rounded-md hover:bg-gray-200 transition disabled:opacity-50"
            >
              {loading ? "Memverifikasi..." : "Reset Password"}
            </button>
          </>
        )}

        {step === "otp" && (
          <button
            onClick={() => setStep("email")}
            className="block text-gray-400 text-sm mt-3 hover:text-white transition"
          >
            Kirim ulang OTP
          </button>
        )}
      </div>
    </div>
  );
}
