"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import api from "@/api/api";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Orbitron } from "next/font/google";
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });

export default function Formula1CollectionPage() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        const allProducts = res.data.data ?? res.data;

        // ✅ Filter hanya produk dengan brand_id = 10 (TAG Heuer)
        const tagHeuerProducts = allProducts.filter(
          (p: any) => Number(p.brand_id) === 10
        );

        setProducts(tagHeuerProducts);
      } catch (err) {
        console.error("❌ Gagal memuat produk:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className={`${orbitron.variable} font-sans bg-white text-black`}>
      <Navbar />

      {/* ===== HERO TITLE SECTION ===== */}
      <section className="text-center py-20 px-6 border-b border-gray-200 pt-40">
        <h1 className="text-[15px] font-bold tracking-[3px] uppercase text-gray-800 mb-2">
          TAG HEUER FORMULA 1
        </h1>
        <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-5">
          DATE
        </h2>
        <p className="text-gray-700 max-w-3xl mx-auto text-[17px] leading-relaxed">
          A tribute to TAG Heuer’s bold racing spirit, the TAG Heuer Formula 1 Date collection blends heritage and modernity.  
          Inspired by the 1986 Series 1, it reinvents vibrant colors and advanced technology for today’s fast-paced lifestyles.
        </p>
      </section>

      {/* ===== PRODUCT GRID (3 items) ===== */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {loading ? (
          <div className="col-span-full text-center text-gray-400 py-20">
            Loading watches...
          </div>
        ) : products.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 py-20">
            No TAG Heuer products found (brand_id = 10).
          </div>
        ) : (
          products.slice(0, 3).map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              onClick={() => router.push(`/product/${p.id}`)} // ✅ Klik → ke halaman detail produk
              className="group bg-[#fdfdfd] border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer"
            >
              <div className="relative overflow-hidden bg-[#fafafa]">
                <img
                  src={p.images?.[0]?.image_url || "/images/default-watch.jpg"}
                  alt={p.name}
                  className="w-full h-[400px] object-contain group-hover:scale-105 transition-transform duration-[1s]"
                />
              </div>
              <div className="p-5 text-center">
                <p className="text-[10px] uppercase tracking-widest text-red-500 font-semibold mb-1">
                  New
                </p>
                <h3 className="text-[15px] font-bold uppercase mb-1">
                  {p.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {p.brand?.name ?? "TAG Heuer"} — Rp
                  {p.price.toLocaleString("id-ID")}
                </p>
              </div>
            </motion.div>
          ))
        )}
      </section>

      {/* VIEW ALL BUTTON */}
      <div className="text-center mb-20">
        <Link
          href="/products"
          className="border border-black px-8 py-3 text-sm uppercase tracking-widest font-semibold hover:bg-black hover:text-white transition-all"
        >
          View All Watches
        </Link>
      </div>

      {/* ===== HERO VIDEO SECTION ===== */}
      <section className="relative w-full h-[100vh] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://www.tagheuer.com/assets/videos/2025/LP/Collection/Formula-1/Date/tag-heuer-formula-one-solargraph-38mm-16-9.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Precision Meets Passion
          </h2>
          <p className="text-lg max-w-2xl text-gray-200 text-center">
            Engineered for endurance. Designed for speed.
          </p>
        </div>
      </section>

      {/* ===== LEFT IMAGE + RIGHT TEXT ===== */}
      <section className="max-w-7xl mx-auto py-24 px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <img
            src="/images/banner1.png"
            alt="TAG Heuer Colors"
            className="rounded-xl shadow-lg"
          />
        </div>
        <div>
          <h3 className="uppercase text-sm font-bold text-gray-700 tracking-[3px] mb-3">
            The Originals, Revived
          </h3>
          <h2 className="text-4xl font-extrabold mb-4">
            A Fresh and Playful Tribute to Heritage
          </h2>
          <p className="text-gray-600 mb-6">
            The TAG Heuer Formula 1 Solargraph revives the energy of the '80s
            with 38mm TH-Polylight bezels, bold hues, and a lightweight ergonomic feel.
          </p>
          <Link
            href="/products"
            className="border-b border-black pb-[2px] text-sm font-semibold hover:opacity-70"
          >
            View All Watches
          </Link>
        </div>
      </section>

      {/* ===== RIGHT IMAGE + LEFT TEXT ===== */}
      <section className="max-w-7xl mx-auto py-24 px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <h3 className="uppercase text-sm font-bold text-gray-700 tracking-[3px] mb-3">
            Solar-powered Innovation
          </h3>
          <h2 className="text-4xl font-extrabold mb-4">
            High-performance, Limitless Energy
          </h2>
          <p className="text-gray-600 mb-6">
            Featuring the advanced Solargraph movement, this collection
            harnesses natural and artificial light to continuously power precision.
          </p>
          <Link
            href="/products"
            className="border-b border-black pb-[2px] text-sm font-semibold hover:opacity-70"
          >
            View All Watches
          </Link>
        </div>
        <div className="order-1 md:order-2">
          <img
            src="/images/banner2.png"
            alt="Solargraph Watches"
            className="rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* ===== SECOND PRODUCT GRID ===== */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {products.slice(3, 6).map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            onClick={() => router.push(`/product/${p.id}`)} // ✅ Klik → Detail
            className="group bg-[#fdfdfd] border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer"
          >
            <div className="relative overflow-hidden bg-[#fafafa]">
              <img
                src={p.images?.[0]?.image_url || "/images/default-watch.jpg"}
                alt={p.name}
                className="w-full h-[400px] object-contain group-hover:scale-105 transition-transform duration-[1s]"
              />
            </div>
            <div className="p-5 text-center">
              <p className="text-[10px] uppercase tracking-widest text-red-500 font-semibold mb-1">
                New
              </p>
              <h3 className="text-[15px] font-bold uppercase mb-1">
                {p.name}
              </h3>
              <p className="text-sm text-gray-500">
                {p.brand?.name ?? "TAG Heuer"} — Rp
                {p.price.toLocaleString("id-ID")}
              </p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* ===== MAGAZINE SECTION ===== */}
      <section className="text-center py-24 border-t border-gray-200">
        <h4 className="uppercase text-sm tracking-[3px] font-semibold mb-2">
          More Stories on
        </h4>
        <h2 className="text-4xl font-extrabold mb-12">The Edge Magazine</h2>

        <div className="max-w-md mx-auto">
          <img
            src="/images/banner3.png"
            alt="TAG Heuer Heritage"
            className="rounded-lg shadow-md mb-6"
          />
          <p className="text-[13px] text-gray-500">04/01/2025</p>
          <h3 className="text-2xl font-extrabold mb-3">
            A Tribute to Bold Origins
          </h3>
          <p className="text-gray-600 mb-5">
            The TAG Heuer Formula 1 Solargraph collection revitalizes the vibrant
            spirit of the historic TAG Heuer Formula 1 Series 1, launched in 1986.
            This latest collection builds on that legacy.
          </p>
          <Link
            href="#"
            className="border-b border-black text-sm font-semibold hover:opacity-70"
          >
            Read More
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
