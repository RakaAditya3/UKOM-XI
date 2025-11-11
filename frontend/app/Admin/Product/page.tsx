"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  PlusCircle,
  Pencil,
  Trash2,
  Loader2,
  Package,
  AlertCircle,
} from "lucide-react";
import api from "@/api/api";
import ProductModal from "./ProductModal";
import clsx from "clsx";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");


  const itemsPerPage = 10;

  // 🔹 Ambil data semua produk dari backend (tanpa paginate)
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/products");
      const data = Array.isArray(res.data) ? res.data : res.data.data || [];
      setProducts(data);
    } catch (err) {
      console.error("Gagal memuat produk:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openAddModal = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const openEditModal = (product: any) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus produk ini?")) return;
    try {
      await api.delete(`/products/${id}`);
      await fetchProducts();
    } catch (err) {
      console.error("Gagal menghapus produk:", err);
      alert("Gagal menghapus produk");
    }
  };

const filteredProducts = products.filter((p) =>
  [p.name, p.sku].some((field) =>
    field?.toLowerCase().includes(searchTerm.toLowerCase())
  )
);

const currentProducts = filteredProducts.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);

const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
       <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
  <div>
    <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-800 to-indigo-600 bg-clip-text text-transparent mb-2">
      Daftar Produk
    </h1>
    <p className="text-slate-600 text-sm sm:text-base">
      Kelola produk Anda dengan mudah dan efisien
    </p>
  </div>

  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto text-black">
    {/* 🔍 Input Pencarian */}
    <input
      type="text"
      placeholder="Cari nama produk atau SKU..."
      value={searchTerm}
      onChange={(e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // reset ke halaman pertama
      }}
      className="w-full sm:w-72 px-4 py-2.5 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm placeholder:text-slate-400"
    />

    {/* Tombol tambah produk */}
    <button
      onClick={openAddModal}
      className="group flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300 font-medium"
    >
      <PlusCircle
        size={20}
        className="group-hover:rotate-90 transition-transform duration-300"
      />
      <span>Tambah Produk</span>
    </button>
  </div>
</div>


        {/* === CONTENT === */}
        {loading ? (
          <div className="flex flex-col justify-center items-center py-32 text-slate-500">
            <Loader2 className="animate-spin mb-4 text-indigo-600" size={48} />
            <p className="text-lg font-medium">Memuat produk...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-4">
              <Package size={40} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              Belum ada produk
            </h3>
            <p className="text-slate-500 mb-6">
              Mulai tambahkan produk pertama Anda
            </p>
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-blue-700 shadow-lg shadow-indigo-500/30 transition-all duration-300"
            >
              <PlusCircle size={18} />
              Tambah Produk
            </button>
          </div>
        ) : (
          <>
            {/* === TABEL PRODUK === */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-slate-100 to-slate-50 border-b border-slate-200">
                      <th className="p-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                        Gambar
                      </th>
                      <th className="p-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                        SKU
                      </th>
                      <th className="p-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                        Nama Produk
                      </th>
                      <th className="p-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                        Kategori
                      </th>
                      <th className="p-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                        Harga
                      </th>
                      <th className="p-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                        Modal
                      </th>
                      <th className="p-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                        Stok
                      </th>
                      <th className="p-4 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {currentProducts.map((p) => (
                      <tr
                        key={p.id}
                        className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200"
                      >
                        <td className="p-4">
                          {p.images?.length > 0 ? (
                            <div className="relative w-14 h-14 rounded-xl overflow-hidden shadow-md ring-2 ring-slate-100">
                              <Image
                                src={p.images[0].image_url}
                                alt={p.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-14 h-14 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center text-slate-400 shadow-sm">
                              <Package size={24} />
                            </div>
                          )}
                        </td>
                        <td className="p-4">
                        <span className="font-mono text-sm bg-slate-100 px-2 py-1 rounded text-black">
                          {p.sku ?? "-"}
                        </span>
                      </td>
                        <td className="p-4">
                          <p className="font-semibold text-slate-800">
                            {p.name}
                          </p>
                        </td>
                        <td className="p-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                            {p.category?.name ?? "-"}
                          </span>
                        </td>
                        <td className="p-4">
                          <p className="font-bold text-slate-900">
                            Rp{p.price.toLocaleString("id-ID")}
                          </p>
                        </td>
                        <td className="p-4">
                          <p className="text-slate-600">
                            Rp{(p.modal_cost ?? 0).toLocaleString("id-ID")}
                          </p>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {p.stock < 5 && (
                              <AlertCircle size={16} className="text-red-500" />
                            )}
                            <span
                              className={clsx(
                                "font-bold",
                                p.stock < 5
                                  ? "text-red-600"
                                  : "text-emerald-600"
                              )}
                            >
                              {p.stock}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => openEditModal(p)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                              title="Edit"
                            >
                              <Pencil size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(p.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                              title="Hapus"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* === PAGINATION (Client-side) === */}
            <div className="flex justify-center items-center gap-3 mt-6">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-200 rounded disabled:opacity-50"
              >
                ← Sebelumnya
              </button>

              <span className="text-gray-600">
                Halaman {currentPage} dari {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-200 rounded disabled:opacity-50"
              >
                Selanjutnya →
              </button>
            </div>
          </>
        )}
      </div>

      {/* === MODAL TAMBAH/EDIT === */}
      {showModal && (
        <ProductModal
          show={showModal}
          onClose={() => setShowModal(false)}
          product={editingProduct}
          onSaved={() => fetchProducts()}
        />
      )}
    </div>
  );
}
