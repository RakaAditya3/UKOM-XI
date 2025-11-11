"use client";

import { useEffect, useState } from "react";
import { Loader2, Truck, Package, CheckCircle2, XCircle, RefreshCcw, Eye } from "lucide-react";
import api from "@/api/api";
import clsx from "clsx";

export default function OrderPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

const fetchOrders = async () => {
  try {
    setLoading(true);
    const role = localStorage.getItem("role");
    
    const endpoint = role === "user" ? "/orders" : "/admin/orders";

    const res = await api.get(endpoint);
    setOrders(res.data ?? []);
  } catch (err) {
    console.error("Gagal memuat data pesanan:", err);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id: number, newStatus: string) => {
    if (!confirm(`Ubah status pesanan menjadi "${newStatus}"?`)) return;
    try {
      setUpdating(true);
      await api.patch(`/orders/${id}/status`, { status: newStatus });
      await fetchOrders();
    } catch (err) {
      console.error("Gagal memperbarui status:", err);
      alert("Gagal mengubah status pesanan");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-100 to-blue-50 p-6 text-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-800 to-indigo-600 bg-clip-text text-transparent">
            Manajemen Pesanan
          </h1>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 text-gray-500">
            <Loader2 className="animate-spin mb-4 text-indigo-600" size={48} />
            Memuat data pesanan...
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center bg-white rounded-xl shadow-lg p-10">
            <Package size={40} className="mx-auto text-gray-400 mb-3" />
            <p className="font-semibold text-gray-700 mb-1">Belum ada pesanan</p>
            <p className="text-gray-500 text-sm">
              Pesanan pelanggan akan muncul di sini setelah checkout.
            </p>
          </div>
        ) : (
          <div className="bg-white shadow-xl rounded-xl overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-gradient-to-r from-indigo-100 to-blue-50 text-gray-700">
                <tr>
                  <th className="p-4">Nomor Pesanan</th>
                  <th className="p-4">Tanggal</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Produk</th>
                  <th className="p-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((o) => (
                  <tr
                    key={o.id}
                    className="hover:bg-indigo-50 transition-colors duration-200"
                  >
                    <td className="p-4 font-mono text-gray-800">{o.order_number}</td>
                    <td className="p-4 text-gray-600">
                      {new Date(o.created_at).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="p-4 font-semibold text-gray-900">
                      Rp{o.total.toLocaleString("id-ID")}
                    </td>
                    <td className="p-4">
                      <StatusBadge status={o.status} />
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => setSelectedOrder(o)}
                        className="flex items-center gap-1 text-blue-600 hover:underline"
                      >
                        <Eye size={16} />
                        Lihat
                      </button>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center gap-2">
                        {["pending", "paid", "shipped", "delivered", "cancelled"].map(
                          (st) => (
                            <button
                              key={st}
                              onClick={() => handleStatusChange(o.id, st)}
                              disabled={updating || o.status === st}
                              className={clsx(
                                "px-2 py-1 rounded-lg text-xs font-medium border transition-all",
                                o.status === st
                                  ? "bg-blue-600 text-white border-blue-600"
                                  : "text-gray-600 hover:bg-blue-50 border-gray-300"
                              )}
                            >
                              {st}
                            </button>
                          )
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Detail Pesanan */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Detail Pesanan #{selectedOrder.order_number}
            </h2>

            <div className="space-y-3 mb-4 text-sm">
              <p><strong>Status:</strong> <StatusBadge status={selectedOrder.status} /></p>
              <p><strong>Total:</strong> Rp{selectedOrder.total.toLocaleString("id-ID")}</p>
              <p><strong>Tanggal:</strong> {new Date(selectedOrder.created_at).toLocaleString("id-ID")}</p>
            </div>

            <h3 className="text-base font-semibold text-gray-700 mb-2">Produk:</h3>
            <div className="divide-y border rounded-lg">
              {selectedOrder.items.map((item: any) => (
                <div key={item.id} className="p-3 flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-800">
                      {item.product?.name ?? "Produk dihapus"}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {item.quantity} x Rp{item.price.toLocaleString("id-ID")}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-800">
                    Rp{item.subtotal.toLocaleString("id-ID")}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-5">
              <button
                onClick={() => setSelectedOrder(null)}
                className="border px-4 py-2 rounded-lg hover:bg-gray-100 transition-all"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
    paid: "bg-blue-100 text-blue-700 border-blue-300",
    shipped: "bg-indigo-100 text-indigo-700 border-indigo-300",
    delivered: "bg-green-100 text-green-700 border-green-300",
    cancelled: "bg-red-100 text-red-700 border-red-300",
  };

 const icons: Record<string, React.ReactNode> = {
    pending: <RefreshCcw size={14} />,
    paid: <CheckCircle2 size={14} />,
    shipped: <Truck size={14} />,
    delivered: <Package size={14} />,
    cancelled: <XCircle size={14} />,
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold border",
        styles[status]
      )}
    >
      {icons[status]} {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
