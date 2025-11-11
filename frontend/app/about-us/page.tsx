"use client";

import { motion } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function AboutPage() {
  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden bg-black mt-30">
        <img
          src="/images/banner3.png"
          alt="Chronova Luxury Watches"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="text-white text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
            About <span className="text-gray-300">Chronova</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Where Time Meets Elegance — Redefining modern luxury through craftsmanship,
            innovation, and timeless design.
          </p>
        </motion.div>
      </section>

      {/* ===== STORY SECTION ===== */}
      <section className="max-w-6xl mx-auto py-24 px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/images/jam1.png"
            alt="Chronova Watch Craftsmanship"
            className="rounded-2xl shadow-lg"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-extrabold mb-6">
            A Statement of <span className="text-gray-500">Modern Sophistication</span>
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Chronova isn’t just a watch brand — it’s a declaration of modern sophistication
            and refined taste. We combine world-class craftsmanship, precision engineering,
            and contemporary design to create timepieces that transcend trends and celebrate individuality.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Each piece embodies modern luxury — sleek, powerful, and undeniably elegant.
            Every detail captures not only time but the very essence of prestige.
          </p>
        </motion.div>
      </section>

      {/* ===== VISION SECTION ===== */}
      <section className="bg-black text-white py-24">
        <div className="max-w-5xl mx-auto text-center px-6">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-extrabold mb-6"
          >
            Our Vision
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed"
          >
            To redefine how the modern generation perceives luxury watches — 
            not as accessories, but as personal expressions of success, ambition, and confidence.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              {
                title: "Innovation in Motion",
                text: "Blending cutting-edge watchmaking technology with timeless artistry.",
              },
              {
                title: "Modern Elegance",
                text: "Balancing sophistication and contemporary style for every occasion.",
              },
              {
                title: "Global Identity",
                text: "Inspired by international design, crafted for discerning individuals everywhere.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="bg-white/5 p-6 rounded-xl backdrop-blur-md hover:bg-white/10 transition"
              >
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CRAFT SECTION ===== */}
      <section className="max-w-6xl mx-auto py-24 px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-extrabold mb-6">
            Uncompromising <span className="text-gray-500">Craftsmanship</span>
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            From sketch to final polish, every Chronova timepiece is built with
            precision and passion. Using premium materials and advanced finishing,
            each collection reflects our dedication to both performance and art.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Every watch is tested for endurance, accuracy, and aesthetic perfection — 
            because true luxury isn’t just seen, it’s felt.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/images/jam2.png"
            alt="Chronova Craftsmanship Process"
            className="rounded-2xl shadow-lg"
          />
        </motion.div>
      </section>

      {/* ===== PROMISE SECTION ===== */}
      <section className="text-center py-32 bg-gray-50 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold mb-8"
        >
          Our Promise
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed mb-10"
        >
          Chronova is more than a brand — it’s a manifestation of ambition, a symbol of
          success, and a celebration of time well spent.  
          Every Chronova watch defines your moment, because you don’t just wear time —  
          **you own it.**
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="italic text-2xl font-light text-gray-800"
        >
          “Time Defines You. Define Time with Chronova.”
        </motion.p>
      </section>

      <Footer />
    </div>
  );
}
