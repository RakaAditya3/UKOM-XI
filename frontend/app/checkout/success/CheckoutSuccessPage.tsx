"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import api from "@/api/api";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const orderId = searchParams.get("order_id");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;
      try {
      const res = await api.get(`/orders/number/${orderId}`);
        setOrder(res.data);
      } catch (err) {
        console.error("❌ Gagal memuat detail order:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  return (
    <div className="bg-white text-black min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center pt-32 pb-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg w-full text-center"
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mx-auto mb-8 flex items-center justify-center w-24 h-24 rounded-full bg-green-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </motion.div>

          <h1 className="text-4xl font-extrabold tracking-tight mb-3">
            Pembayaran Berhasil 🎉
          </h1>
          <p className="text-gray-600 mb-8">
            Terima kasih telah mempercayai <span className="font-semibold">Chronova</span>.  
            Pesananmu sedang diproses dan akan segera dikirimkan.
          </p>

          {loading ? (
            <p className="text-gray-400">Memuat detail pesanan...</p>
          ) : order ? (
            <div className="border border-gray-200 rounded-xl p-6 text-left mb-8 bg-gray-50">
              <h3 className="text-sm uppercase text-gray-500 mb-3">
                Rincian Pesanan
              </h3>
              <p className="text-sm mb-1">
                <span className="font-semibold">Order ID:</span> {order.order_number}
              </p>
              <p className="text-sm mb-1">
                <span className="font-semibold">Total:</span> Rp
                {order.total?.toLocaleString("id-ID")}
              </p>
              <p className="text-sm mb-1 capitalize">
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={
                    order.status === "paid"
                      ? "text-green-600"
                      : order.status === "pending"
                      ? "text-yellow-600"
                      : "text-gray-500"
                  }
                >
                  {order.status}
                </span>
              </p>
            </div>
          ) : (
            <p className="text-gray-500">Tidak dapat memuat pesanan.</p>
          )}

          <button
            onClick={() => router.push("/collection")}
            className="mt-4 border border-black text-black px-8 py-3 rounded-md text-sm font-semibold tracking-wider uppercase hover:bg-black hover:text-white transition-all duration-300"
          >
            Kembali Belanja
          </button>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
