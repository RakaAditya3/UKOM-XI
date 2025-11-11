"use client";

import { motion } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function AccessibilityPage() {
  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />
      <section className="text-center py-28 border-b border-gray-200 mt-20 px-6">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold mb-6">
          Accessibility <span className="text-gray-600">Statement</span>
        </motion.h1>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
          Chronova is committed to providing an inclusive digital experience accessible to all users.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 md:px-12 py-24 space-y-10 text-gray-700 text-lg leading-relaxed">
        <div>
          <h2 className="text-2xl font-bold mb-2">1. Commitment to Accessibility</h2>
          <p>
            Our website follows WCAG 2.1 AA standards to ensure equal access and usability for everyone, including individuals with disabilities.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">2. Ongoing Efforts</h2>
          <p>
            We continuously audit and update our website to maintain accessibility compliance across all devices.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">3. Feedback</h2>
          <p>
            If you encounter accessibility barriers, please contact <strong>support@chronova.com</strong>. We welcome your feedback to improve our experience.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
