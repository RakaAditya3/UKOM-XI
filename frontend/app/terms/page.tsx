"use client";

import { motion } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function TermsPage() {
  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="text-center py-28 border-b border-gray-200 mt-20 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold mb-6"
        >
          Terms & <span className="text-gray-600">Conditions</span>
        </motion.h1>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
          Please read these Terms & Conditions carefully before using our website or making a purchase with Chronova.
        </p>
      </section>

      {/* CONTENT */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-24 space-y-12 text-gray-700 text-lg leading-relaxed">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h2 className="text-2xl font-bold mb-2">1. General</h2>
          <p>
            By accessing and using Chronova’s website, you agree to comply with and be bound by these Terms and Conditions. 
            Chronova reserves the right to update or modify these terms at any time without prior notice.
          </p>
        </motion.div>

        <div>
          <h2 className="text-2xl font-bold mb-2">2. Product Information</h2>
          <p>
            We strive to display the most accurate product details possible. However, Chronova does not guarantee that product descriptions or prices are error-free.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-2">3. Purchases</h2>
          <p>
            All purchases are subject to availability. Chronova reserves the right to cancel or refuse any order at its discretion if fraudulent or unauthorized activity is suspected.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-2">4. Limitation of Liability</h2>
          <p>
            Chronova shall not be held liable for any indirect, incidental, or consequential damages resulting from the use of our services or products.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-2">5. Governing Law</h2>
          <p>
            These terms are governed by the laws of Switzerland, where Chronova’s headquarters are established.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
