"use client";

import { motion } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function ShippingPage() {
  const localCouriers = [
    "JNE Express",
    "TIKI",
    "POS Indonesia",
    "SiCepat Ekspres",
    "J&T Express",
    "AnterAja",
    "Lion Parcel",
    "Wahana Express",
    "ID Express",
    "Ninja Xpress",
  ];

  const internationalCouriers = [
    "DHL Express",
    "FedEx",
    "UPS (United Parcel Service)",
    "TNT Express",
    "Aramex",
    "EMS International",
  ];

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
          Chronova <span className="text-gray-600">Shipping Partners</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed"
        >
          To ensure every Chronova timepiece reaches you safely and promptly, we’ve partnered
          with trusted courier services both locally and internationally.
        </motion.p>
      </section>

      {/* ===== SHIPPING LIST SECTION ===== */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-24 space-y-16">
        {/* Local Shipping */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4">Domestic Shipping (Indonesia)</h2>
          <p className="text-gray-700 text-lg mb-6">
            For customers within Indonesia, Chronova collaborates with reliable local couriers
            to guarantee fast and secure delivery nationwide.
          </p>

          <ul className="grid md:grid-cols-2 gap-x-12 gap-y-4 text-gray-700 text-lg">
            {localCouriers.map((courier, index) => (
              <motion.li
                key={courier}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex items-center space-x-3"
              >
                <span className="inline-block w-2 h-2 rounded-full bg-black"></span>
                <span>{courier}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* International Shipping */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-3xl font-bold mb-4">International Shipping</h2>
          <p className="text-gray-700 text-lg mb-6">
            Chronova also provides insured international delivery through global courier
            networks — ensuring your timepiece arrives safely, no matter where you are.
          </p>

          <ul className="grid md:grid-cols-2 gap-x-12 gap-y-4 text-gray-700 text-lg">
            {internationalCouriers.map((courier, index) => (
              <motion.li
                key={courier}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex items-center space-x-3"
              >
                <span className="inline-block w-2 h-2 rounded-full bg-black"></span>
                <span>{courier}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Delivery Policy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-4">Delivery Policy</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Every Chronova order is carefully packed and insured during transit.  
            Once your order has been dispatched, you will receive a tracking number via email.  
            Delivery times may vary depending on your location and selected courier, 
            but most orders within Indonesia arrive within <strong>1–5 business days</strong>.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            For international shipments, delivery typically takes <strong>7–14 business days</strong>.  
            Customs and import duties, where applicable, are the responsibility of the recipient.
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
          Need Help Tracking Your Shipment?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg"
        >
          Reach out to our customer service for updates or assistance with your delivery.
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
