"use client";

import { motion } from "framer-motion";
import React from "react";

interface ModalProps {
  title?: string;
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export default function Modal({ title, show, onClose, children, size = "md" }: ModalProps) {
  if (!show) return null;

  const maxW = size === "sm" ? "max-w-sm" : size === "lg" ? "max-w-3xl" : "max-w-md";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.14 }}
        className={`relative bg-white rounded-2xl shadow-xl p-6 ${maxW} w-full mx-4`}
      >
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 rounded px-2 py-1"
            aria-label="Tutup"
          >
            ✕
          </button>
        </div>

        <div>{children}</div>
      </motion.div>
    </div>
  );
}
