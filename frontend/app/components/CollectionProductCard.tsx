"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CollectionProductCard({ product }: { product: any }) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const images =
    (product.images?.map((img: any) => img.image_url) || []).filter(Boolean);
  const displayImage = images.length > 0 ? images[index] : "/no-image.jpg";

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // ⛔ Supaya gak trigger redirect
    if (images.length <= 1) return;
    setDirection(1);
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // ⛔ Supaya gak trigger redirect
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
    <div
      className="group flex flex-col items-center text-center cursor-pointer"
      onClick={() => router.push(`/product/${product.id}`)} // ✅ redirect ke detail produk
    >
      {/* === CARD GAMBAR === */}
      <motion.div
        whileHover={{ scale: 1.015 }}
        transition={{ duration: 0.4 }}
        className="relative bg-white border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 w-full rounded-md"
      >
        <div className="relative w-full aspect-[4/5] bg-gray-50 flex items-center justify-center">
          <AnimatePresence custom={direction} initial={false} mode="popLayout">
            <motion.div
              key={displayImage}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 flex items-center justify-center"
            >
              <Image
                src={displayImage}
                alt={product.name || "Product"}
                fill
                className="object-contain p-6 transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
          </AnimatePresence>

          {/* Tombol navigasi gambar */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 rounded-full shadow hover:bg-white transition"
              >
                <ChevronLeft className="w-4 h-4 text-gray-800" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 rounded-full shadow hover:bg-white transition"
              >
                <ChevronRight className="w-4 h-4 text-gray-800" />
              </button>
            </>
          )}

          {/* Icon wishlist */}
          <button
            onClick={(e) => e.stopPropagation()} // ⛔ Supaya klik wishlist gak redirect
            className="absolute bottom-3 right-3 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition"
          >
            <Heart className="w-4 h-4 text-gray-700" />
          </button>
        </div>
      </motion.div>

      {/* === INFO PRODUK === */}
      <div className="mt-5 text-center select-none">
        {product.is_highlighted ? (
          <p className="text-[11px] font-semibold text-[#e4002b] uppercase tracking-widest mb-1">
            New
          </p>
        ) : (
          <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest mb-1">
            Brand New
          </p>
        )}

        <h3 className="text-[14px] font-semibold uppercase text-gray-900 leading-snug">
          {product.name}
        </h3>

        <p className="text-[12px] text-gray-500 mt-1">
          {product.brand?.name ?? "Chronova"}
        </p>

        <p className="text-[14px] font-medium mt-2">
          Rp {Number(product.price).toLocaleString("id-ID")}
        </p>

        {product.discount_price && (
          <p className="text-xs text-gray-400 line-through">
            Rp {Number(product.discount_price).toLocaleString("id-ID")}
          </p>
        )}
      </div>
    </div>
  );
}
