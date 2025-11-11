"use client";

import { motion } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function HistoryPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6 tracking-tight">
            The <span className="text-gray-300">Chronova</span> Legacy
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            A journey through time — from the birth of a vision to the evolution of
            excellence.
          </p>
        </motion.div>
      </section>

      {/* ===== TIMELINE SECTION ===== */}
      <section className="relative max-w-6xl mx-auto py-24 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            A Legacy Forged in <span className="text-gray-400">Time</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
            For decades, Chronova has stood as a symbol of precision, artistry, and
            modern luxury — born from a vision to redefine how time is experienced.
          </p>
        </motion.div>

        <div className="relative border-l border-gray-700 pl-10 md:pl-0 space-y-28">
          {[
            {
              year: "1985",
              title: "The Genesis of Time",
              desc: "Chronova began as a small atelier in Geneva, Switzerland — founded by artisans who believed that timepieces should not only measure time, but define it. Our earliest models blended mechanical purity with futuristic boldness, setting a new path for modern horology.",
              img: "/logo-richardmille.png",
            },
            {
              year: "1998",
              title: "The Precision Era",
              desc: "The launch of Chronova’s first in-house chronograph marked the start of a new era. Collectors and connoisseurs recognized our mastery — each model became a symbol of mechanical integrity and refined strength.",
              img: "/logo-richardmille.png",
            },
            {
              year: "2010",
              title: "Reimagining Modern Luxury",
              desc: "As the world evolved, so did we. Chronova embraced design minimalism, integrating advanced materials and new-age movements while maintaining its timeless soul. The Chronova Edge collection became an icon of the 21st century.",
              img: "/logo-richardmille.png",
            },
            {
              year: "2025",
              title: "The Era of Innovation",
              desc: "Today, Chronova continues to shape the future of watchmaking — merging digital precision with handcrafted tradition. Each piece is more than a watch: it’s an evolution of identity, sophistication, and power.",
              img: "/logo-richardmille.png",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className={`relative flex flex-col md:flex-row items-center gap-12 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline line marker */}
              <div className="absolute left-[calc(50%-1px)] top-0 bottom-0 hidden md:block w-[2px] bg-gray-800" />

              {/* Image */}
              <div className="md:w-1/2">
                <motion.img
                  src={item.img}
                  alt={item.title}
                  className="rounded-2xl shadow-lg object-cover w-full h-[400px]"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {/* Text Content */}
              <div className="md:w-1/2">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-[2px] bg-gray-500 mr-3"></div>
                  <p className="text-sm uppercase tracking-[3px] text-gray-400">
                    {item.year}
                  </p>
                </div>
                <h3 className="text-3xl font-extrabold mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed text-[16px]">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== CLOSING SECTION ===== */}
      <section className="text-center py-32 bg-gray-950 border-t border-gray-800 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl font-extrabold mb-8"
        >
          From Heritage to the <span className="text-gray-400">Future</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed mb-8"
        >
          For four decades, Chronova has honored its past while relentlessly pursuing the
          future — crafting timepieces that embody the perfect harmony between innovation
          and tradition.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="italic text-xl md:text-2xl font-light text-gray-300"
        >
          “Eternal craftsmanship. Endless evolution. The Chronova legacy continues.”
        </motion.p>
      </section>

      <Footer />
    </div>
  );
}
