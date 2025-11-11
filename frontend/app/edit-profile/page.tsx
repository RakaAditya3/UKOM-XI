"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function EditProfilePage() {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Back Button */}
        <div className="flex items-center mb-8">
          <Link
            href="/profile"
            className="flex items-center gap-2 text-gray-600 hover:text-black transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali ke Profil</span>
          </Link>
        </div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-semibold mb-6"
        >
          Edit Profil Saya
        </motion.h1>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm"
        >
          {/* Avatar Upload */}
          <div className="flex items-center gap-6 mb-8">
            <div className="relative w-28 h-28">
              <img
                src={preview || "/images/avatar.png"}
                alt="Profile Avatar"
                className="w-28 h-28 rounded-full object-cover border border-gray-200"
              />
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-black text-white rounded-full p-2 cursor-pointer hover:opacity-90 transition"
              >
                <Upload className="w-4 h-4" />
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Foto Profil</h3>
              <p className="text-sm text-gray-500">
                Format JPG, PNG, maksimal 2MB
              </p>
            </div>
          </div>

          {/* Profile Form */}
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  defaultValue="Raka Aditya"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-black outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Masukkan email"
                  defaultValue="rakaaditya@example.com"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-black outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  placeholder="+62 812-3456-7890"
                  defaultValue="+62 812-3456-7890"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-black outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tanggal Lahir
                </label>
                <input
                  type="date"
                  defaultValue="2004-01-14"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-black outline-none"
                />
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jenis Kelamin
              </label>
              <div className="flex gap-4 mt-1">
                <label className="flex items-center gap-2">
                  <input type="radio" name="gender" value="male" defaultChecked />
                  <span>Laki-laki</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="gender" value="female" />
                  <span>Perempuan</span>
                </label>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <Link
                href="/profile"
                className="px-5 py-2 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-100 transition"
              >
                Batal
              </Link>
              <button
                type="button"
                className="px-5 py-2 bg-black text-white rounded-md hover:opacity-90 transition"
              >
                Simpan Perubahan
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
