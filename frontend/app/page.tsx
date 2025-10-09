"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Navbar from "./components/Navbar";

const videos = [
  "/video/richardmille3.mp4",
  "/video/richardmille2.mp4",
  "/video/richardmille1.mp4",
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Efek Berubah 30 Detik
  useEffect(() => {
    const interval = setInterval(() => {
      nextVideo();
    }, 30000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  return (
    <>
      <Navbar />
      <section className="relative h-screen w-full overflow-hidden">
        {/* === Video Background with Slide-Up Transition === */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.video
              key={videos[currentIndex]}
              src={videos[currentIndex]}
              autoPlay
              muted
              loop
              playsInline
              className="absolute top-0 left-0 w-full h-full object-cover"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -60 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </AnimatePresence>
        </div>

        {/* === Overlay === */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/50" />

        {/* === Content === */}
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

          {/* === ChevronDown Button (Next Video) === */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextVideo}
            className="p-4 rounded-full border border-white/40 hover:border-[#D4AF37] transition-all animate-bounce-slow"
          >
            <ChevronDown className="w-8 h-8 text-[#D4AF37]" />
          </motion.button>
        </div>

        {/* === Bottom Gradient === */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/70 to-transparent"></div>
      </section>
    </>
  );
}
