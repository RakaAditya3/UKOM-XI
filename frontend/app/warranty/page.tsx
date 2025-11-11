"use client";

import { motion } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function WarrantyPage() {
  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section className="text-center py-28 border-b border-gray-200 mt-20 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight"
        >
          Chronova <span className="text-gray-600">Warranty</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed"
        >
          Every Chronova timepiece is a masterpiece of craftsmanship — backed by a 
          comprehensive international warranty for lasting confidence.
        </motion.p>
      </section>

      {/* ===== WARRANTY CONTENT ===== */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-24 space-y-16">
        {/* Section 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4">Our Commitment to Excellence</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            At Chronova, precision and durability are at the heart of every timepiece we
            create. Each watch undergoes rigorous testing to ensure it meets our highest
            standards of quality. Our warranty ensures that your investment is protected 
            against manufacturing defects, giving you complete peace of mind.
          </p>
        </motion.div>

        {/* Section 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-3xl font-bold mb-4">Warranty Coverage</h2>
          <ul className="list-disc list-inside text-gray-700 text-lg space-y-3">
            <li>All Chronova watches are covered by a <strong>2-year international warranty</strong> from the date of purchase.</li>
            <li>This warranty covers any manufacturing or mechanical defects under normal use.</li>
            <li>Battery replacement for quartz models is included during the warranty period.</li>
            <li>Authorized service centers are available worldwide to assist with maintenance and repair.</li>
          </ul>
        </motion.div>

        {/* Section 3 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-4">Exclusions and Limitations</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            While our warranty ensures superior protection, it does not cover:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-lg space-y-3">
            <li>Normal wear and tear (including scratches or color fading).</li>
            <li>Damage caused by accidents, improper handling, or unauthorized repairs.</li>
            <li>Water damage due to failure to comply with stated water-resistance limits.</li>
            <li>Loss or theft of the timepiece.</li>
          </ul>
        </motion.div>

        {/* Section 4 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold mb-4">Warranty Activation</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            To activate your warranty, please ensure that your Chronova watch is
            registered at the time of purchase or via our online registration form.
            Keep your official invoice and warranty card in a safe place — both are
            required for service claims.
          </p>
        </motion.div>

        {/* Section 5 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-4">Warranty Service Process</h2>
          <ol className="list-decimal list-inside text-gray-700 text-lg space-y-3">
            <li>Contact our service team through the <a href="/contact" className="underline hover:text-black transition">Contact Us</a> page or visit an authorized service center.</li>
            <li>Provide proof of purchase and warranty card.</li>
            <li>Your watch will be carefully inspected by our certified technicians.</li>
            <li>Repairs covered under warranty will be completed at no additional cost.</li>
          </ol>
        </motion.div>

        {/* Section 6 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">Beyond the Warranty</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Even after your warranty expires, Chronova remains committed to the care and
            longevity of your timepiece. Our specialized service centers provide
            professional maintenance, cleaning, and restoration services to ensure your
            watch continues to embody its original precision and elegance.
          </p>
        </motion.div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="bg-black text-white text-center py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-extrabold mb-4"
        >
          Need Assistance with Your Warranty?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg"
        >
          Our specialists are ready to guide you through every step of your service
          journey.
        </motion.p>
        <motion.a
          href="/contact-us"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="inline-block border border-white px-8 py-3 rounded-md font-semibold text-white hover:bg-white hover:text-black transition-all duration-300"
        >
          Contact Support
        </motion.a>
      </section>

      <Footer />
    </div>
  );
}
