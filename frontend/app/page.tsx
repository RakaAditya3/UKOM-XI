"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import Navbar from "./components/Navbar";
import Image from "next/image";
import axios from "@/api/api";
import DesignedToWin from "./components/DesignedToWin";
import Collection from "./components/Collection";
import Footer from "./components/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const videos = [
    "/video/richardmille3.mp4",
    "/video/richardmille2.mp4",
    "/video/richardmille1.mp4",
  ];
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/products-home");
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.data || res.data.products || [];
        setProducts(data);
      } catch (err: any) {
        console.error("❌ Gagal memuat produk:", err?.response || err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextVideo();
    }, 30000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextVideo = () => setCurrentIndex((prev) => (prev + 1) % videos.length);

  return (
    <>
      <Navbar isHomePage={true} />
      {/* === HERO SECTION === */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.video
              key={videos[currentIndex]}
              src={videos[currentIndex]}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute top-0 left-0 w-full h-full object-cover"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -60 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </AnimatePresence>
        </div>

        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/50" />

        {/* Konten Tengah */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-semibold tracking-wide mb-4"
          >
            Elegance in Time
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-lg md:text-2xl text-gray-200 mb-16 max-w-2xl"
          >
            Discover the artistry and innovation behind every tick.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextVideo}
            className="p-4 rounded-full border border-white/40 hover:border-[#D4AF37] transition-all animate-bounce-slow"
          >
            <ChevronDown className="w-8 h-8 text-[#D4AF37]" />
          </motion.button>
        </div>

        {/* Gradasi bawah */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/70 to-transparent"></div>
      </section>

      {/* === GENDER COLLECTION SECTION === */}
      <section className="bg-white py-24 px-6 md:px-16 text-black">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Card Pria */}
          <div className="relative group overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/images/men.png"
              alt="Men Collection"
              width={800}
              height={600}
              className="object-cover w-full h-[550px] transition-transform duration-700 group-hover:scale-105 grayscale"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition" />
            <div className="absolute bottom-10 left-0 right-0 text-center text-white">
              <p className="text-sm tracking-widest mb-1">NEW CHRONOVA CONNECTED</p>
              <h2 className="text-3xl font-semibold mb-6">MEN</h2>
              <button
                onClick={() => console.log("Go to Men Collection")}
                className="px-6 py-3 bg-transparent border border-white text-white hover:bg-white hover:text-black transition font-medium tracking-wider"
              >
                DISCOVER
              </button>
            </div>
          </div>

          {/* Card Wanita */}
          <div className="relative group overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/images/women.png"
              alt="Women Collection"
              width={800}
              height={600}
              className="object-cover w-full h-[550px] transition-transform duration-700 group-hover:scale-105 grayscale"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition" />
            <div className="absolute bottom-10 left-0 right-0 text-center text-white">
              <p className="text-sm tracking-widest mb-1">NEW CHRONOVA CONNECTED</p>
              <h2 className="text-3xl font-semibold mb-6">WOMEN</h2>
              <button
                onClick={() => console.log("Go to Women Collection")}
                className="px-6 py-3 bg-transparent border border-white text-white hover:bg-white hover:text-black transition font-medium tracking-wider"
              >
                DISCOVER
              </button>
            </div>
          </div>
        </div>
      </section>

     {/* === PRODUCTS SECTION === */}
    <section className="py-20 px-6 md:px-12 bg-white text-black">
      <h2 className="text-3xl font-extrabold mb-10 text-center ">
       NEW CHRONOVA CONNECTED
      </h2>

      {loading ? (
        <p className="text-center text-gray-400">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-400">No products found.</p>
      ) : (
        <div className="relative">
          {/* Tombol kiri */}
          <button
            onClick={() => {
              const container = document.getElementById("carousel-container");
              if (container)
                container.scrollBy({ left: -400, behavior: "smooth" });
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black p-3 rounded-full"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Carousel */}
          <div
            id="carousel-container"
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar px-4"
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-none w-[320px] snap-start"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Tombol kanan */}
          <button
            onClick={() => {
              const container = document.getElementById("carousel-container");
              if (container)
                container.scrollBy({ left: 400, behavior: "smooth" });
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black p-3 rounded-full"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      )}
    </section>

    <DesignedToWin />

     {/* === PRODUCTS SECTION 2 === */}
    <section className="bg-white py-24 px-6 md:px-16 text-black">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
         <Link href="/products" className="block">
      <div className="relative group overflow-hidden rounded-2xl shadow-lg">
        <Image
          src="/images/jam1.png"
          alt="Men Collection"
          width={800}
          height={600}
          className="object-cover w-full h-[550px] transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    </Link>

          <div className="relative group overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/images/jam2.png"
              alt="Women Collection"
              width={800}
              height={600}
              className="object-cover w-full h-[550px] transition-transform duration-700 group-hover:scale-105 "
            />
          </div>

          <div className="relative group overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/images/jam3.png"
              alt="Women Collection"
              width={800}
              height={600}
              className="object-cover w-full h-[550px] transition-transform duration-700 group-hover:scale-105 "
            />
          </div>
        </div>
    </section>

    <Collection />

     {/* === CATALOG SECTION  === */}
      <section className="bg-white py-24 px-6 md:px-16 text-black">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="relative group overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/images/jam6.png"
              alt="Women Collection"
              width={400}
              height={300}
              className="object-cover w-full h-[450px] transition-transform duration-700 group-hover:scale-105 grayscale"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition" />
            <div className="absolute bottom-10 left-0 right-0 text-center text-white">
              <p className="text-sm tracking-widest mb-1">NEW TAG HEUER CONNECTED</p>
              <h2 className="text-3xl font-semibold mb-6">ENTRY LEVEL</h2>
             <Link
                href="/entry-level"
                className="inline-block px-6 py-3 bg-transparent border border-white text-white hover:bg-white hover:text-black transition font-medium tracking-wider"
              >
                DISCOVER
              </Link>
            </div>
          </div>
           <div className="relative group overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/images/jam5.png"
              alt="Women Collection"
              width={400}
              height={300}
              className="object-cover w-full h-[450px] transition-transform duration-700 group-hover:scale-105 grayscale"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition" />
            <div className="absolute bottom-10 left-0 right-0 text-center text-white">
              <p className="text-sm tracking-widest mb-1">NEW TAG HEUER CONNECTED</p>
              <h2 className="text-3xl font-semibold mb-6">TAG HEUR F1</h2>
              <Link
                href="/TAG-HEUER-F1"
                className="inline-block px-6 py-3 bg-transparent border border-white text-white hover:bg-white hover:text-black transition font-medium tracking-wider"
              >
                DISCOVER
              </Link>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/images/jam7.png"
              alt="Women Collection"
              width={400}
              height={300}
              className="object-cover w-full h-[450px] transition-transform duration-700 group-hover:scale-105 grayscale"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition" />
            <div className="absolute bottom-10 left-0 right-0 text-center text-white">
              <p className="text-sm tracking-widest mb-1">NEW TAG HEUER CONNECTED</p>
              <h2 className="text-3xl font-semibold mb-6">MID LEVEL</h2>
             <Link href="/mid-level">
            <button
              className="px-6 py-3 bg-transparent border border-white text-white hover:bg-white hover:text-black transition font-medium tracking-wider"
            >
              DISCOVER
            </button>
          </Link>
            </div>
          </div>
        </div>

          <div className="max-w-7xl flex md:grid-cols-3 justify-center gap-8 mt-15">
            <div className="relative group overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="/images/jam8.png"
                alt="Women Collection"
                width={400}
                height={300}
                className="object-cover w-full h-[450px] transition-transform duration-700 group-hover:scale-105 grayscale"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition" />
              <div className="absolute bottom-10 left-0 right-0 text-center text-white">
                <p className="text-sm tracking-widest mb-1">NEW TAG HEUER CONNECTED</p>
                <h2 className="text-3xl font-semibold mb-6">LUXURY</h2>
                <Link href="/luxury">
                <button
                  className="px-6 py-3 bg-transparent border border-white text-white hover:bg-white hover:text-black transition font-medium tracking-wider"
                >
                  DISCOVER
                </button>
              </Link>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="/images/jam9.png"
                alt="Women Collection"
                width={400}
                height={300}
                className="object-cover w-full h-[450px] transition-transform duration-700 group-hover:scale-105 grayscale"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition" />
              <div className="absolute bottom-10 left-0 right-0 text-center text-white">
                <p className="text-sm tracking-widest mb-1">NEW TAG HEUER CONNECTED</p>
                <h2 className="text-3xl font-semibold mb-6">ULTRA LUXURY</h2>
                <Link href="/ultra-luxury">
                <button
                  className="px-6 py-3 bg-transparent border border-white text-white hover:bg-white hover:text-black transition font-medium tracking-wider"
                >
                  DISCOVER
                </button>
              </Link>
              </div>
            </div>
            </div>
      </section>
      <Footer />
    </>
  );
}

export function ProductCard({ product }: { product: any }) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const images =
    (product.images?.map((img: any) => img.image_url) || []).filter(Boolean);
  const displayImage = images.length > 0 ? images[index] : "/no-image.jpg";

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // ⛔ jangan redirect
    if (images.length <= 1) return;
    setDirection(1);
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // ⛔ jangan redirect
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
      onClick={() => router.push(`/product/${product.id}`)} // ✅ klik card → detail
      className="bg-white rounded-lg overflow-hidden flex flex-col group transition-all duration-300 cursor-pointer"
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
              className="object-contain p-4 select-none group-hover:scale-105 transition-transform duration-700"
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
        <button
          onClick={(e) => e.stopPropagation()} // ⛔ jangan redirect
          className="absolute top-3 right-3 bg-white/80 p-2 rounded-full shadow hover:bg-white transition"
        >
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
          {product.brand?.name ?? "Chronova"}
        </p>
        <p className="text-[13px] font-medium mt-2">
          Rp {Number(product.price).toLocaleString("id-ID")}
        </p>
        {product.discount_price && (
          <p className="text-xs text-gray-400 line-through">
            Rp {Number(product.discount_price).toLocaleString("id-ID")}
          </p>
        )}
      </div>
    </motion.div>
  );
}
