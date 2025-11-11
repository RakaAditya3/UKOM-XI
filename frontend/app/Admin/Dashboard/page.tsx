"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, TrendingUp, Package, DollarSign, BarChart3 } from "lucide-react";
import api from "@/api/api";
import type { ReactNode } from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function LaporanPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 🛡️ Proteksi role admin
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      alert("⚠️ Anda harus login sebagai admin terlebih dahulu.");
      router.push("/Admin-Login");
      return;
    }

    if (role == "user") {
      alert("🚫 Akses ditolak. Hanya admin yang dapat melihat laporan.");
      router.push("/");
      return;
    }

    fetchStats();
  }, [router]);

  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/dashboard-stats");
      setStats(res.data);
    } catch (err) {
      console.error("Gagal memuat laporan:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        <Loader2 className="animate-spin text-green-600" size={40} />
        <span className="ml-2">Memuat laporan keuangan...</span>
      </div>
    );

  if (!stats)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Tidak ada data laporan.
      </div>
    );

  const chartData = stats.chart || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-emerald-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
            Laporan Keuangan
          </h1>
          <p className="text-gray-600 mt-2 sm:mt-0">
            Ringkasan performa bisnis dan transaksi
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <SummaryCard
            title="Total Omset"
            value={`Rp${stats.total_omset.toLocaleString("id-ID")}`}
            icon={<TrendingUp className="text-emerald-600" size={28} />}
          />
          <SummaryCard
            title="Total Modal"
            value={`Rp${stats.total_modal.toLocaleString("id-ID")}`}
            icon={<DollarSign className="text-amber-600" size={28} />}
          />
          <SummaryCard
            title="Laba Bersih"
            value={`Rp${stats.laba_bersih.toLocaleString("id-ID")}`}
            icon={<BarChart3 className="text-indigo-600" size={28} />}
          />
          <SummaryCard
            title="Produk Terjual"
            value={`${stats.total_produk_terjual} Item`}
            icon={<Package className="text-blue-600" size={28} />}
          />
        </div>

        {/* Chart Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Grafik Omset, Modal & Laba Bulanan
          </h2>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(v: number) => `Rp${v.toLocaleString("id-ID")}`}
                />
                <Legend />
                <Bar dataKey="omset" fill="#16a34a" name="Omset" radius={[6, 6, 0, 0]} />
                <Bar dataKey="modal" fill="#facc15" name="Modal" radius={[6, 6, 0, 0]} />
                <Bar dataKey="laba" fill="#4f46e5" name="Laba Bersih" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-500 py-10">
              Belum ada data transaksi bulanan.
            </p>
          )}
        </div>

        {/* Table Summary */}
        <div className="mt-10 bg-white p-6 rounded-xl shadow-md overflow-x-auto">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Ringkasan Penjualan
          </h2>
          <table className="w-full text-sm text-left border border-gray-100">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-3 text-gray-700 font-semibold">Bulan</th>
                <th className="p-3 text-gray-700 font-semibold">Omset</th>
                <th className="p-3 text-gray-700 font-semibold">Modal</th>
                <th className="p-3 text-gray-700 font-semibold">Laba</th>
              </tr>
            </thead>
            <tbody>
              {chartData.map((row: any) => (
                <tr key={row.month} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium text-gray-700">{row.month}</td>
                  <td className="p-3 text-gray-800">
                    Rp{row.omset.toLocaleString("id-ID")}
                  </td>
                  <td className="p-3 text-gray-800">
                    Rp{row.modal.toLocaleString("id-ID")}
                  </td>
                  <td className="p-3 text-emerald-700 font-semibold">
                    Rp{row.laba.toLocaleString("id-ID")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 flex items-center justify-between hover:shadow-lg transition-all duration-300">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-lg sm:text-xl font-bold text-gray-800">{value}</p>
      </div>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-xl">
        {icon}
      </div>
    </div>
  );
}
