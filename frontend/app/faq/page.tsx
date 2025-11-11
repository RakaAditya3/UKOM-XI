"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is Chronova?",
    answer:
      "Chronova is a luxury watch retailer offering a curated collection of modern, elegant, and high-performance timepieces. Each piece is crafted to reflect precision, sophistication, and timeless design.",
  },
  {
    question: "Are Chronova watches authentic?",
    answer:
      "Absolutely. All Chronova timepieces are 100% authentic, sourced directly from official brand partners and verified distributors. Every purchase includes an authenticity certificate and brand warranty.",
  },
  {
    question: "How do I maintain my Chronova watch?",
    answer:
      "We recommend servicing your watch every 3–5 years to ensure optimal performance. Avoid exposing your timepiece to magnetic fields or extreme temperatures, and clean it regularly with a soft, dry cloth.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "Chronova accepts all major credit cards, bank transfers, and select digital wallets. We ensure secure and encrypted payment processing for your peace of mind.",
  },
  {
    question: "Can I return or exchange my order?",
    answer:
      "Yes, you can return or exchange your purchase within 14 days of delivery, provided it remains unworn, in its original packaging, and with all accompanying documents.",
  },
  {
    question: "Does Chronova ship internationally?",
    answer:
      "Yes, Chronova ships worldwide through trusted logistics partners. We offer insured and trackable shipping to ensure your timepiece reaches you safely and promptly.",
  },
  {
    question: "How can I contact Chronova for support?",
    answer:
      "You can reach our support team via email at officialchronova@gmail.com or by using the contact form on our Contact page. Our representatives are available Monday to Friday, 9:00 AM – 6:00 PM (GMT+1).",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
          Frequently Asked <span className="text-gray-600">Questions</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed"
        >
          Everything you need to know about our timepieces, warranty, and services —
          all in one place.
        </motion.p>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="space-y-6">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="border-b border-gray-200 pb-4"
              >
                <button
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="w-full flex justify-between items-center text-left focus:outline-none"
                >
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 hover:text-black transition">
                    {faq.question}
                  </h3>
                  <motion.div
                    initial={false}
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    )}
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-600 mt-3 text-base leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ===== CLOSING SECTION ===== */}
      <section className="bg-black text-white text-center py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-extrabold mb-4"
        >
          Still Have Questions?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg"
        >
          Our support team is ready to assist you with any inquiries you may have.
        </motion.p>
        <motion.a
          href="/contact-us"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="inline-block border border-white px-8 py-3 rounded-md font-semibold text-white hover:bg-white hover:text-black transition-all duration-300"
        >
          Contact Us
        </motion.a>
      </section>

      <Footer />
    </div>
  );
}
