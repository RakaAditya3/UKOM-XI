"use client";

import { motion } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function SavoirFairePage() {
  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4">
            Savoir-Faire
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            The art of precision — where mastery, design, and innovation unite to define
            the essence of Chronova.
          </p>
        </motion.div>
      </section>

      {/* ===== INTRO SECTION ===== */}
      <section className="max-w-6xl mx-auto py-24 px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/images/jam6.png"
            alt="Chronova Workshop"
            className="rounded-2xl shadow-lg"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-extrabold mb-6">
            The <span className="text-gray-500">Art</span> of Watchmaking
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            At Chronova, savoir-faire is more than craftsmanship — it’s a philosophy of
            excellence. Every timepiece is the result of countless hours of dedication,
            blending human artistry with cutting-edge innovation.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our artisans preserve traditional watchmaking techniques while continuously
            redefining what precision and beauty can mean in the modern world.
          </p>
        </motion.div>
      </section>

      {/* ===== EXPERTISE GRID ===== */}
      <section className="bg-black text-white py-28 px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Crafted by <span className="text-gray-400">Masters</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Each Chronova creation embodies expertise — where mechanical perfection meets
            aesthetic artistry.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              img: "/images/jam1.png",
              title: "Traditional Craftsmanship",
              text: "Every detail is meticulously hand-finished, a testament to the artisans who master the timeless techniques of fine horology.",
            },
            {
              img: "/images/jam2.png",
              title: "Innovative Engineering",
              text: "Chronova integrates advanced micro-mechanics and modern materials, achieving precision beyond the limits of tradition.",
            },
            {
              img: "/images/jam3.png",
              title: "Exquisite Materials",
              text: "From sapphire crystals to aerospace-grade titanium, only the finest elements are used to ensure durability and beauty.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="bg-white/5 rounded-2xl overflow-hidden backdrop-blur-md hover:scale-105 transition-transform duration-700"
            >
              <div className="relative w-full h-[300px]">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 text-center">
                <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== DESIGN PHILOSOPHY ===== */}
      <section className="max-w-6xl mx-auto py-24 px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-extrabold mb-6">
            Design Beyond <span className="text-gray-500">Time</span>
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Chronova’s design philosophy is rooted in balance — the harmony between form
            and function. Each curve, material, and mechanism serves both beauty and
            purpose.
          </p>
          <p className="text-gray-600 leading-relaxed">
            The result is more than a watch; it’s an identity. A perfect fusion of modern
            sophistication and timeless elegance.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/images/jam7.png"
            alt="Chronova Design Philosophy"
            className="rounded-2xl shadow-lg"
          />
        </motion.div>
      </section>

      {/* ===== CLOSING QUOTE ===== */}
      <section className="text-center py-32 bg-gray-50 border-t border-gray-200 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold mb-8"
        >
          The Soul of <span className="text-gray-500">Chronova</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed mb-10"
        >
          Every Chronova timepiece carries the heart of our savoir-faire — crafted not
          merely to tell time, but to define moments of life, excellence, and distinction.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="italic text-2xl font-light text-gray-800"
        >
          “Mastery is not created overnight — it’s forged in time.”
        </motion.p>
      </section>

      <Footer />
    </div>
  );
}
