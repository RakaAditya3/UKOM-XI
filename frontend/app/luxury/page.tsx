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

export default function LuxuryCollectionPage() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        const allProducts = res.data.data ?? res.data;

        // ✅ Filter produk dengan category_id = 3 (Luxury)
        const luxuryProducts = allProducts.filter(
          (p: any) => Number(p.category_id) === 3
        );

        setProducts(luxuryProducts);
      } catch (err) {
        console.error("❌ Gagal memuat produk Luxury:", err);
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
          Chronova Haute Horlogerie
        </h1>
        <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-5">
          LUXURY COLLECTION
        </h2>
        <p className="text-gray-700 max-w-3xl mx-auto text-[17px] leading-relaxed">
          The pinnacle of Chronova craftsmanship — a celebration of mechanical mastery,  
          timeless artistry, and prestige beyond measure. Every second is a statement.
        </p>
      </section>

      {/* ===== PRODUCT GRID (First 3 items) ===== */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {loading ? (
          <div className="col-span-full text-center text-gray-400 py-20">
            Loading luxury timepieces...
          </div>
        ) : products.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 py-20">
            No Luxury products found (category_id = 3).
          </div>
        ) : (
          products.slice(0, 3).map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              onClick={() => router.push(`/product/${p.id}`)} // ✅ klik → ke detail produk
              className="group bg-[#fdfdfd] border border-gray-300 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              <div className="relative overflow-hidden bg-[#fafafa]">
                <img
                  src={p.images?.[0]?.image_url || "/images/default-watch.jpg"}
                  alt={p.name}
                  className="w-full h-[420px] object-contain group-hover:scale-105 transition-transform duration-[1s]"
                />
              </div>
              <div className="p-5 text-center">
                <p className="text-[10px] uppercase tracking-widest text-yellow-600 font-semibold mb-1">
                  Exclusive
                </p>
                <h3 className="text-[15px] font-bold uppercase mb-1">
                  {p.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {p.brand?.name ?? "Chronova"} — Rp
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
          <source src="/video/richardmille3.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            When Time Becomes Art
          </h2>
          <p className="text-lg max-w-2xl text-gray-200 text-center">
            Every Chronova Luxury watch is a masterpiece of passion, precision,  
            and unparalleled elegance.
          </p>
        </div>
      </section>

      {/* ===== LEFT IMAGE + RIGHT TEXT ===== */}
      <section className="max-w-7xl mx-auto py-24 px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="uppercase text-sm font-bold text-gray-700 tracking-[3px] mb-3">
            Precision at Its Finest
          </h3>
          <h2 className="text-4xl font-extrabold mb-4">
            Sculpted by Masters of Time
          </h2>
          <p className="text-gray-600 mb-6">
            Combining centuries-old horological expertise with avant-garde design,  
            Chronova’s Luxury line defines modern excellence.
          </p>
          <Link
            href="/products"
            className="border-b border-black pb-[2px] text-sm font-semibold hover:opacity-70"
          >
            View All Watches
          </Link>
        </div>
        <div>
          <video
            autoPlay
            muted
            loop
            playsInline
            className="rounded-xl shadow-lg"
          >
            <source src="/video/richardmille1.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* ===== RIGHT IMAGE + LEFT TEXT ===== */}
      <section className="max-w-7xl mx-auto py-24 px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <h3 className="uppercase text-sm font-bold text-gray-700 tracking-[3px] mb-3">
            Beyond Luxury
          </h3>
          <h2 className="text-4xl font-extrabold mb-4">
            Where Innovation Meets Eternity
          </h2>
          <p className="text-gray-600 mb-6">
            Chronova’s Luxury Collection fuses rare materials and precision engineering  
            to create timepieces that transcend eras and expectations.
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
            src="/images/banner1.png"
            alt="Chronova Haute Collection"
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
            onClick={() => router.push(`/product/${p.id}`)} // ✅ klik → redirect detail
            className="group bg-[#fdfdfd] border border-gray-200 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer"
          >
            <div className="relative overflow-hidden bg-[#fafafa]">
              <img
                src={p.images?.[0]?.image_url || "/images/default-watch.jpg"}
                alt={p.name}
                className="w-full h-[400px] object-contain group-hover:scale-105 transition-transform duration-[1s]"
              />
            </div>
            <div className="p-5 text-center">
              <p className="text-[10px] uppercase tracking-widest text-yellow-600 font-semibold mb-1">
                Exclusive
              </p>
              <h3 className="text-[15px] font-bold uppercase mb-1">
                {p.name}
              </h3>
              <p className="text-sm text-gray-500">
                {p.brand?.name ?? "Chronova"} — Rp
                {p.price.toLocaleString("id-ID")}
              </p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* ===== JOURNAL SECTION ===== */}
      <section className="text-center py-24 border-t border-gray-200">
        <h4 className="uppercase text-sm tracking-[3px] font-semibold mb-2">
          The Chronicle of Excellence
        </h4>
        <h2 className="text-4xl font-extrabold mb-12">Chronova Journal</h2>

        <div className="max-w-md mx-auto">
          <p className="text-[13px] text-gray-500">04/01/2025</p>
          <h3 className="text-2xl font-extrabold mb-3">
            The Summit of Chronometric Art
          </h3>
          <p className="text-gray-600 mb-5">
            The Luxury Collection captures the soul of true horology —  
            a seamless fusion of innovation, passion, and legacy.  
            A rare privilege for those who command time itself.
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
