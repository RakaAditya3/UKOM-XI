"use client";

import { motion } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />
      <section className="text-center py-28 border-b border-gray-200 mt-20 px-6">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold mb-6">
          Privacy & <span className="text-gray-600">Policy</span>
        </motion.h1>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
          At Chronova, your privacy is our priority. Learn how we protect and use your personal data responsibly.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 md:px-12 py-24 space-y-10 text-gray-700 text-lg leading-relaxed">
        <div>
          <h2 className="text-2xl font-bold mb-2">1. Information We Collect</h2>
          <p>
            We collect personal data such as your name, email, and address when you make a purchase, register, or subscribe to our updates.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">2. How We Use Your Information</h2>
          <p>
            Your information is used to process orders, improve user experience, and communicate updates. We never sell your data.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">3. Data Protection</h2>
          <p>
            Chronova implements advanced encryption and secure servers to protect all stored customer data.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">4. Cookies</h2>
          <p>
            We use cookies to enhance site performance and personalize content. You can manage cookies in your browser settings.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">5. Contact</h2>
          <p>
            For privacy concerns, contact us at <strong>officialchronova@gmail.com</strong>.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
