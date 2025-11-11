"use client";

import { useEffect, useState } from "react";
import {
  PlusCircle,
  Pencil,
  Trash2,
  Loader2,
  Percent,
  Tag,
  Calendar,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import api from "@/api/api";
import clsx from "clsx";

export default function DiscountPage() {
  const [vouchers, setVouchers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingVoucher, setEditingVoucher] = useState<any>(null);
  const [form, setForm] = useState({
    code: "",
    name: "",
    percentage: "",
    fixed_amount: "",
    usage_limit: "",
    starts_at: "",
    ends_at: "",
    is_active: true,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchVouchers();
  }, []);

  const fetchVouchers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/discounts");
      setVouchers(res.data ?? []);
    } catch (err) {
      console.error("Gagal memuat data voucher:", err);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingVoucher(null);
    setForm({
      code: "",
      name: "",
      percentage: "",
      fixed_amount: "",
      usage_limit: "",
      starts_at: "",
      ends_at: "",
      is_active: true,
    });
    setShowModal(true);
  };

  const openEditModal = (voucher: any) => {
    setEditingVoucher(voucher);
    setForm({
      code: voucher.code,
      name: voucher.name,
      percentage: voucher.percentage ?? "",
      fixed_amount: voucher.fixed_amount ?? "",
      usage_limit: voucher.usage_limit ?? "",
      starts_at: voucher.starts_at?.split("T")[0] ?? "",
      ends_at: voucher.ends_at?.split("T")[0] ?? "",
      is_active: voucher.is_active ?? true,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus voucher ini?")) return;
    try {
      await api.delete(`/discounts/${id}`);
      fetchVouchers();
    } catch (err) {
      console.error("Gagal menghapus voucher:", err);
      alert("Gagal menghapus voucher");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingVoucher) {
        await api.put(`/discounts/${editingVoucher.id}`, form);
      } else {
        await api.post("/discounts", form);
      }
      setShowModal(false);
      fetchVouchers();
    } catch (err: any) {
      console.error("Gagal menyimpan voucher:", err);
      alert(err.response?.data?.message || "Gagal menyimpan voucher");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-emerald-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent">
            Manajemen Voucher
          </h1>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl shadow-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-300"
          >
            <PlusCircle size={20} />
            Tambah Voucher
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <Loader2 className="animate-spin mb-4 text-emerald-600" size={48} />
            Memuat data voucher...
          </div>
        ) : vouchers.length === 0 ? (
          <div className="text-center bg-white rounded-xl shadow-lg p-10">
            <Tag size={40} className="mx-auto text-gray-400 mb-3" />
            <p className="font-semibold text-gray-700 mb-1">
              Belum ada voucher
            </p>
            <p className="text-gray-500 text-sm mb-4">
              Tambahkan voucher baru untuk promosi
            </p>
            <button
              onClick={openAddModal}
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-all"
            >
              Tambah Voucher
            </button>
          </div>
        ) : (
          <div className="bg-white shadow-xl rounded-xl overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-gradient-to-r from-emerald-100 to-green-50 text-gray-700">
                <tr>
                  <th className="p-4">Kode</th>
                  <th className="p-4">Nama</th>
                  <th className="p-4">Tipe</th>
                  <th className="p-4">Nilai</th>
                  <th className="p-4">Kuota</th>
                  <th className="p-4">Periode</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {vouchers.map((v) => (
                  <tr
                    key={v.id}
                    className="hover:bg-emerald-50 transition-colors duration-200"
                  >
                    <td className="p-4 font-mono font-semibold text-gray-800">
                      {v.code}
                    </td>
                    <td className="p-4">{v.name}</td>
                    <td className="p-4 flex items-center gap-2">
                      {v.percentage ? (
                        <>
                          <Percent size={14} className="text-emerald-600" />{" "}
                          Persentase
                        </>
                      ) : (
                        <>
                          <Tag size={14} className="text-indigo-600" /> Tetap
                        </>
                      )}
                    </td>
                    <td className="p-4 font-medium text-gray-800">
                      {v.percentage
                        ? `${v.percentage}%`
                        : `Rp${(v.fixed_amount ?? 0).toLocaleString("id-ID")}`}
                    </td>
                    <td className="p-4">{v.usage_limit ?? "-"}</td>
                    <td className="p-4 flex items-center gap-2">
                      <Calendar size={14} className="text-gray-400" />
                      {v.starts_at
                        ? `${v.starts_at.split("T")[0]} → ${
                            v.ends_at?.split("T")[0] ?? "-"
                          }`
                        : "-"}
                    </td>
                    <td className="p-4">
                      <span
                        className={clsx(
                          "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold",
                          v.is_active
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-gray-100 text-gray-500"
                        )}
                      >
                        {v.is_active ? (
                          <>
                            <ToggleRight size={12} /> Aktif
                          </>
                        ) : (
                          <>
                            <ToggleLeft size={12} /> Nonaktif
                          </>
                        )}
                      </span>
                    </td>
                    <td className="p-4 text-center flex justify-center gap-2">
                      <button
                        onClick={() => openEditModal(v)}
                        className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(v.id)}
                        className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {editingVoucher ? "Edit Voucher" : "Tambah Voucher"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3 text-sm">
              <input
                type="text"
                name="code"
                placeholder="Kode Voucher"
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
                disabled={!!editingVoucher}
              />
              <input
                type="text"
                name="name"
                placeholder="Nama Voucher"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  name="percentage"
                  placeholder="Persentase (%)"
                  value={form.percentage}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      percentage: e.target.value,
                      fixed_amount: "",
                    })
                  }
                  className="w-full border rounded-lg px-3 py-2"
                />
                <input
                  type="number"
                  name="fixed_amount"
                  placeholder="Diskon Tetap (Rp)"
                  value={form.fixed_amount}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      fixed_amount: e.target.value,
                      percentage: "",
                    })
                  }
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <input
                type="number"
                name="usage_limit"
                placeholder="Batas Penggunaan"
                value={form.usage_limit}
                onChange={(e) =>
                  setForm({ ...form, usage_limit: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  name="starts_at"
                  value={form.starts_at}
                  onChange={(e) =>
                    setForm({ ...form, starts_at: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2"
                />
                <input
                  type="date"
                  name="ends_at"
                  value={form.ends_at}
                  onChange={(e) =>
                    setForm({ ...form, ends_at: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <label className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(e) =>
                    setForm({ ...form, is_active: e.target.checked })
                  }
                />
                <span>Aktifkan Voucher</span>
              </label>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="border rounded-lg px-4 py-2"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-emerald-600 text-white rounded-lg px-4 py-2 hover:bg-emerald-700 disabled:opacity-50"
                >
                  {saving ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
