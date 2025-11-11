"use client";

import { useEffect, useState } from "react";
import api from "@/api/api";
import Image from "next/image";
import { Plus, Edit3, Trash2, Upload } from "lucide-react";

export default function BrandPage() {
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    logo: null as File | null,
  });
  const [saving, setSaving] = useState(false);

  // === FETCH BRAND DATA ===
  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const res = await api.get("/brands");
      setBrands(res.data.data ?? res.data);
    } catch (err) {
      console.error("Gagal memuat brand:", err);
    } finally {
      setLoading(false);
    }
  };

  // === HANDLE FORM ===
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setForm((prev) => ({ ...prev, logo: e.target.files![0] }));
    }
  };

  const openAddModal = () => {
    setEditing(null);
    setForm({ name: "", description: "", logo: null });
    setShowModal(true);
  };

  const openEditModal = (brand: any) => {
    setEditing(brand);
    setForm({ name: brand.name, description: brand.description ?? "", logo: null });
    setShowModal(true);
  };

  // === SUBMIT FORM ===
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData();
    formData.append("name", form.name);
    if (form.description) formData.append("description", form.description);
    if (form.logo) formData.append("logo", form.logo);

    try {
      if (editing) {
        await api.post(`/brands/${editing.id}?_method=PUT`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/brands", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      await fetchBrands();
      setShowModal(false);
    } catch (err) {
      console.error("Gagal menyimpan brand:", err);
      alert("Gagal menyimpan brand, periksa kembali form!");
    } finally {
      setSaving(false);
    }
  };

  const deleteBrand = async (id: number) => {
    if (!confirm("Yakin ingin menghapus brand ini?")) return;
    try {
      await api.delete(`/brands/${id}`);
      await fetchBrands();
    } catch (err) {
      console.error("Gagal menghapus brand:", err);
    }
  };

  // === UI ===
  return (
    <div className="text-black">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manajemen Brand</h1>
        <button
          onClick={openAddModal}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition"
        >
          <Plus size={18} /> Tambah Brand
        </button>
      </div>

      {/* LOADING */}
      {loading && <div className="text-gray-500 text-center py-10">Memuat data brand...</div>}

      {/* TABEL BRAND */}
      {!loading && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-700 text-left">
              <tr>
                <th className="px-4 py-3">Logo</th>
                <th className="px-4 py-3">Nama</th>
                <th className="px-4 py-3">Deskripsi</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {brands.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center text-gray-500 py-6">
                    Belum ada brand terdaftar.
                  </td>
                </tr>
              ) : (
                brands.map((b) => (
                  <tr
                    key={b.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3">
                      {b.logo ? (
                        <Image
                          src={b.logo}
                          alt={b.name}
                          width={60}
                          height={60}
                          className="rounded-lg object-contain"
                        />
                      ) : (
                        <div className="w-14 h-14 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                          No Logo
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium">{b.name}</td>
                    <td className="px-4 py-3 text-gray-600">{b.description ?? "-"}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => openEditModal(b)}
                        className="text-blue-600 hover:text-blue-800 mr-2"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button
                        onClick={() => deleteBrand(b.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* === MODAL === */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 text-sm">
            <h2 className="text-lg font-semibold mb-4">
              {editing ? "Edit Brand" : "Tambah Brand Baru"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Nama Brand"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
                required
              />
              <textarea
                name="description"
                placeholder="Deskripsi (opsional)"
                value={form.description}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 h-20"
              />
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200 transition">
                  <Upload size={16} /> Pilih Logo
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFile}
                  />
                </label>
                {form.logo && (
                  <span className="text-xs text-gray-500">
                    {form.logo.name}
                  </span>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="border rounded-lg px-4 py-2 hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700 disabled:opacity-60"
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
