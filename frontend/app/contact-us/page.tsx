"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setFeedback("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setFeedback("❌ Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setFeedback("⚠️ An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden mt-30">
        <img
          src="/images/banner3.png"
          alt="Chronova Contact"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white px-6"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4">
            Contact <span className="text-gray-300">Chronova</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Our experts are here to assist you — from product inquiries to personalized
            services, we’re ready to help you find your next timeless piece.
          </p>
        </motion.div>
      </section>

      {/* ===== CONTACT INFO SECTION ===== */}
      <section className="max-w-6xl mx-auto py-24 px-6 md:px-12 grid md:grid-cols-2 gap-20 items-center">
        {/* Left: Contact Details */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h2 className="text-4xl font-extrabold mb-4">Get in Touch</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Whether you have questions about a collection, need assistance with your
            purchase, or wish to schedule a private appointment, our team is ready to
            assist you with elegance and discretion.
          </p>

          <div className="space-y-6 text-gray-700">
            <div>
              <h4 className="font-semibold text-lg mb-1">Headquarters</h4>
              <p className="text-gray-600">Chronova House, Geneva, Switzerland</p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-1">Email</h4>
              <p className="text-gray-600">officialchronova@gmail.com</p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-1">Phone</h4>
              <p className="text-gray-600">+62 1222 1233 4567</p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-1">Operating Hours</h4>
              <p className="text-gray-600">Mon – Fri: 9:00 AM – 6:00 PM (GMT+1)</p>
            </div>
          </div>
        </motion.div>

        {/* Right: Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gray-50 p-8 rounded-2xl shadow-lg"
        >
          <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
          <div className="space-y-6">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:border-black outline-none text-gray-800"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:border-black outline-none text-gray-800"
            />
            <input
              type="text"
              placeholder="Subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:border-black outline-none text-gray-800"
            />
            <textarea
              rows={5}
              placeholder="Your message..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:border-black outline-none text-gray-800 resize-none"
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-md font-semibold tracking-wider transition-all duration-300 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {feedback && (
              <p className="text-center text-sm mt-2 text-gray-600">{feedback}</p>
            )}
          </div>
        </motion.form>
      </section>

      {/* ===== MAP / LOCATION SECTION ===== */}
      <section className="relative h-[70vh] overflow-hidden border-t border-gray-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2762.996573192081!2d6.142296715806737!3d46.20439017911695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478c652a6d10eaf9%3A0x34b4e963bba061d2!2sGeneva%2C%20Switzerland!5e0!3m2!1sen!2sid!4v1695812000000!5m2!1sen!2sid"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          className="absolute inset-0"
        ></iframe>
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center px-6">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-extrabold mb-4"
          >
            Visit Our <span className="text-gray-300">Maison</span>
          </motion.h2>
          <p className="text-gray-300 max-w-xl mx-auto text-lg leading-relaxed">
            Experience the world of Chronova firsthand — where time meets artistry, and
            every second is crafted with passion.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
