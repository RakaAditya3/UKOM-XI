"use client";

import { useEffect, useState } from "react";
import { User, Mail, Shield, Loader2, AlertCircle } from "lucide-react";
import api from "@/api/api";
import clsx from "clsx";

export default function UserManagementPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "operator",
  });
  const [creating, setCreating] = useState(false);


  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      const data = Array.isArray(res.data) ? res.data : res.data.data || [];
      setUsers(data);
    } catch (err) {
      console.error("❌ Gagal memuat daftar user:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleCreateUser = async () => {
  try {
    setCreating(true);
    await api.post("/users", newUser);
    alert("User berhasil ditambahkan ✅");
    setShowModal(false);
    fetchUsers();
    setNewUser({ name: "", email: "", password: "", role: "operator" });
  } catch (err: any) {
    alert(err.response?.data?.message || "Gagal menambahkan user");
  } finally {
    setCreating(false);
  }
};

const handleDelete = async (id: number) => {
  if (!confirm("Yakin ingin menghapus user ini?")) return;
  try {
    await api.delete(`/users/${id}`);
    alert("User berhasil dihapus");
    fetchUsers();
  } catch (err: any) {
    alert(err.response?.data?.message || "Gagal menghapus user");
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* === HEADER === */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
  <div>
    <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-800 to-indigo-600 bg-clip-text text-transparent mb-2">
      Daftar User
    </h1>
    <p className="text-slate-600 text-sm sm:text-base">
      Lihat dan kelola pengguna yang terdaftar dalam sistem
    </p>
  </div>

  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
    <input
      type="text"
      placeholder="Cari nama atau email..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full sm:w-72 px-4 py-2.5 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm placeholder:text-slate-400"
    />

    <button
      onClick={() => setShowModal(true)}
      className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-5 py-2.5 rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 font-medium"
    >
      + Tambah User
    </button>
  </div>
</div>


        {/* === TABLE === */}
        {loading ? (
          <div className="flex flex-col justify-center items-center py-32 text-slate-500">
            <Loader2 className="animate-spin mb-4 text-indigo-600" size={48} />
            <p className="text-lg font-medium">Memuat data pengguna...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-4">
              <AlertCircle size={40} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              Tidak ada pengguna
            </h3>
            <p className="text-slate-500">Belum ada user terdaftar di sistem.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-100 to-slate-50 border-b border-slate-200">
                    <th className="p-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Nama
                    </th>
                    <th className="p-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="p-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Role
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUsers.map((u) => (
                    <tr
                      key={u.id}
                      className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200"
                    >
                      <td className="p-4 flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-semibold">
                          {u.name?.charAt(0)?.toUpperCase() ?? "?"}
                        </div>
                        <span className="font-medium text-slate-800">{u.name}</span>
                      </td>

                      <td className="p-4 text-slate-600 flex items-center gap-2">
                        <Mail size={14} className="text-slate-400" />
                        {u.email}
                      </td>

                      <td className="p-4">
                        <span
                          className={clsx(
                            "inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full",
                            {
                              "bg-indigo-100 text-indigo-700": u.role === "admin",
                              "bg-emerald-100 text-emerald-700": u.role === "user",
                              "bg-yellow-100 text-yellow-700": u.role === "owner",
                              "bg-slate-100 text-slate-700":
                                !["admin", "user", "owner"].includes(u.role),
                            }
                          )}
                        >
                          <Shield size={12} />
                          {u.role?.toUpperCase()}
                        </span>
                      </td>

                      <td className="p-4">
                        <span
                          className={clsx(
                            "text-sm font-medium",
                            u.email_verified_at
                              ? "text-emerald-600"
                              : "text-red-500"
                          )}
                        >
                          {u.email_verified_at
                            ? "Terverifikasi"
                            : "Belum Verifikasi"}
                        </span>
                      <td className="p-4 text-right">
                        {u.role !== "owner" && (
                          <button
                            onClick={() => handleDelete(u.id)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Hapus
                          </button>
                        )}
                    </td>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {showModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 text-black">
    <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative text-black">
      <h3 className="text-lg font-semibold mb-4">Tambah User Baru</h3>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Nama Lengkap"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
        >
          <option value="operator">👷 Operator (Staff Gudang)</option>
          <option value="dispatcher">🚚 Dispatcher (Staff Pengiriman)</option>
          <option value="admin">🧑‍💻 Admin</option>
        </select>
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 border rounded-lg hover:bg-gray-100"
        >
          Batal
        </button>
        <button
          onClick={handleCreateUser}
          disabled={creating}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          {creating ? "Menyimpan..." : "Simpan"}
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
