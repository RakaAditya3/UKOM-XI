"use client";

import { motion } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function LegalNoticesPage() {
  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />
      <section className="text-center py-28 border-b border-gray-200 mt-20 px-6">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold mb-6">
          Legal <span className="text-gray-600">Notices</span>
        </motion.h1>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
          The following legal information governs the use and ownership of Chronova’s intellectual property and website content.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 md:px-12 py-24 space-y-10 text-gray-700 text-lg leading-relaxed">
        <div>
          <h2 className="text-2xl font-bold mb-2">1. Intellectual Property</h2>
          <p>
            All content on this website, including text, logos, and trademarks, is the exclusive property of Chronova and may not be used without written consent.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">2. Website Use</h2>
          <p>
            Users are prohibited from reproducing, distributing, or modifying any part of the website without authorization.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">3. Legal Jurisdiction</h2>
          <p>
            All disputes are governed under the laws of Switzerland. Unauthorized use of this website may result in legal action.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
