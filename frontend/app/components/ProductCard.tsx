"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

export default function ProductCard({ product }: { product: any }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const images =
    (product.images?.map((img: any) => img.image_url) || []).filter(Boolean);
  const displayImage = images.length > 0 ? images[index] : "/no-image.jpg";

  const nextImage = () => {
    if (images.length <= 1) return;
    setDirection(1);
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    if (images.length <= 1) return;
    setDirection(-1);
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const variants: any = {
    enter: (dir: number) => ({
      x: dir > 0 ? 150 : -150,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -150 : 150,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.3, ease: "easeIn" },
    }),
  };

  return (
    <motion.div
      whileHover={{ scale: 1.015 }}
      className="bg-white rounded-lg overflow-hidden flex flex-col group transition-all duration-300 border border-gray-200 hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)]"
    >
      {/* Gambar */}
      <div className="relative w-full aspect-square bg-gray-50 overflow-hidden">
        <AnimatePresence custom={direction} initial={false} mode="popLayout">
          <motion.div
            key={displayImage}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <Image
              src={displayImage}
              alt={product.name || "Product"}
              fill
              className="object-contain p-4 select-none"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigasi Gambar */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 p-1.5 rounded-full shadow hover:bg-white transition"
            >
              <ChevronLeft className="w-4 h-4 text-gray-800" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 p-1.5 rounded-full shadow hover:bg-white transition"
            >
              <ChevronRight className="w-4 h-4 text-gray-800" />
            </button>
          </>
        )}

        {/* Icon Favorite */}
        <button className="absolute top-3 right-3 bg-white/80 p-2 rounded-full shadow hover:bg-white transition">
          <Heart className="w-4 h-4 text-gray-700" />
        </button>
      </div>

      {/* Info Produk */}
      <div className="p-4 text-center space-y-1">
        {product.is_highlighted && (
          <p className="text-[10px] font-semibold text-red-600 uppercase tracking-wide">
            Special Edition | New
          </p>
        )}

        <h3 className="text-sm font-semibold text-gray-900 leading-tight">
          {product.name}
        </h3>

        <p className="text-xs text-gray-500">
          {product.brand?.name || "TAG Heuer"} – {product.stock ?? 0} pcs
        </p>

        <p className="text-[13px] font-medium mt-2">
          Rp {Number(product.price).toLocaleString("id-ID")}
        </p>

        {product.discount_price && (
          <p className="text-xs text-gray-400 line-through">
            Rp {Number(product.discount_price).toLocaleString("id-ID")}
          </p>
        )}

        {product.is_customizable && (
          <span className="inline-block text-[10px] border border-gray-400 px-2 py-0.5 rounded mt-1 uppercase tracking-wide">
            Customizable
          </span>
        )}
      </div>
    </motion.div>
  );
}
