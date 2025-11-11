"use client";

import { GoogleLogin, googleLogout } from "@react-oauth/google";
import api from "@/api/api";
import { useRouter } from "next/navigation";

export default function GoogleLoginButton() {
  const router = useRouter();

  const handleSuccess = async (credentialResponse: any) => {
    try {
      const id_token = credentialResponse.credential;
      const res = await api.post("/auth/google", { id_token });

      if (res.data.is_new) {
        alert("Akun baru terdeteksi, OTP signup telah dikirim ke email Anda.");
        router.push(`/otp/verify?email=${res.data.email}&type=signup`);
      } else {
        alert("OTP login telah dikirim ke email Anda.");
        router.push(`/otp/verify?email=${res.data.email}&type=login`);
      }
    } catch (err: any) {
      console.error("❌ Google auth gagal:", err);
      alert(err.response?.data?.message || "Gagal login dengan Google");
    }
  };

  return (
    <div className="flex justify-center">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => alert("Login Google gagal.")}
      />
    </div>
  );
}
