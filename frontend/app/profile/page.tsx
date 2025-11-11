"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";
import api from "@/api/api";
import Modal from "@/app/components/Modal";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// ----------------- Types -----------------
interface UserProfile {
  id?: number;
  name: string;
  birthDate?: string;
  gender?: string;
  email: string;
  phone?: string;
  verifiedEmail?: boolean;
  verifiedPhone?: boolean;
  photo_url?: string | null;
}

interface AddressAPI {
  id: number;
  label?: string;
  recipient_name: string;
  phone: string;
  address: string;
  postal_code?: string;
  province_id: number;
  city_id: number;
  district_id: number;
  is_default: boolean;
}


interface AddressView {
  id: number;
  label?: string;
  owner: string;
  phone: string;
  address: string;
  main?: boolean;
}

interface BankAccount {
  id: number;
  bank: string;
  accountNumber: string;
  owner: string;
}


interface Transaction {
  id: string;
  productName: string;
  product_id?: number;
  date: string;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  total: number;
  image: string;
  is_confirmed?: boolean;
  has_reviewed?: boolean;
}


const tabs = ["Biodata Diri", "Daftar Alamat", "Wishlist", "Rekening Bank"];



// ----------------- Component -----------------
export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("Biodata Diri");
  const [sidebarMenu, setSidebarMenu] = useState<"Profil Saya" | "Pembelian">("Profil Saya");
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedTx, setSelectedTx] = useState<any>(null);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [ratingValue, setRatingValue] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [existingReview, setExistingReview] = useState<{ rating: number; review: string } | null>(null);



  const [user, setUser] = useState<UserProfile | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>("/image.png");
  const [addresses, setAddresses] = useState<AddressView[]>([]);
  const [banks, setBanks] = useState<BankAccount[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);

  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [editProfileForm, setEditProfileForm] = useState({
    name: "",
    email: "",
    phone: "",
    birth_date: "",
  });

  const openEditReview = async (productId: number) => {
  try {
    const res = await api.get(`/products/${productId}/ratings/me`);
    const data = res.data;

    setExistingReview({
      rating: data.rating,
      review: data.review,
    });

    setRatingValue(data.rating);
    setReviewText(data.review);
    setSelectedProductId(productId);
    setShowRatingModal(true);
  } catch (err) {
    console.error("❌ Gagal memuat ulasan sebelumnya:", err);
    alert("Tidak dapat memuat ulasan lama.");
  }
};


  // Modal states
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addressEditId, setAddressEditId] = useState<number | null>(null); // null => add
  const [addressForm, setAddressForm] = useState<Partial<AddressAPI>>({
    label: "",
    recipient_name: "",
    phone: "",
    address: "",
    postal_code: "",
    is_default: false,
  });

  const [showBankModal, setShowBankModal] = useState(false);
  const [bankForm, setBankForm] = useState<{ bank_name: string; account_number: string; account_owner: string }>({
    bank_name: "",
    account_number: "",
    account_owner: "",
  });

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [userRes, addrRes, bankRes, wishRes] = await Promise.all([
          api.get("/user"),
          api.get("/addresses"),
          api.get("/bank-accounts"),
          api.get("/wishlist"),
        ]);

        const udata = userRes.data?.data ?? userRes.data;
        setUser({
          id: udata.id,
          name: udata.name,
          birthDate: udata.birth_date ?? "-",
          email: udata.email,
          phone: udata.phone ?? "-",
          verifiedEmail: true,
          verifiedPhone: true,
          photo_url: udata.photo_url ?? null,
        });
        setPhotoPreview(udata.photo_url ?? "/image.png");

        const addrList = (addrRes.data ?? []).map((a: AddressAPI) => ({
          id: a.id,
          label: a.label,
          owner: a.recipient_name,
          phone: a.phone,
         address: `${a.address}${a.postal_code ? " - " + a.postal_code : ""}`,

          main: a.is_default,
        }));
        setAddresses(addrList);

        const bankList = (bankRes.data ?? []).map((b: any) => ({
          id: b.id,
          bank: b.bank_name,
          accountNumber: b.account_number,
          owner: b.account_owner,
        }));
        setBanks(bankList);

        setWishlist(wishRes.data ?? []);
      } catch (err) {
        console.error("Fetch profile error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  useEffect(() => {
  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders"); 
      const data = res.data ?? [];

  const mapped = data.map((order: any) => ({
  id: order.id,
  product_id: order.items?.[0]?.product_id,
  productName: order.items?.[0]?.product?.name || "Pesanan #" + order.order_number,
  date: new Date(order.created_at).toLocaleDateString("id-ID"),
  status: order.status,
  total: parseFloat(order.total),
  image: order.items?.[0]?.product?.images?.[0]?.image_url || "/images/default-watch.jpg",
  is_confirmed: order.is_confirmed,
  has_reviewed: order.has_reviewed ?? false,
}));


      setTransactions(mapped);
    } catch (err) {
      console.error("❌ Gagal memuat transaksi:", err);
    }
  };

  fetchOrders();
}, []);


  // --------------- Helpers ---------------
  const refreshAddresses = async () => {
    try {
      const res = await api.get("/addresses");
      const addrList = (res.data ?? []).map((a: AddressAPI) => ({
        id: a.id,
        label: a.label,
        owner: a.recipient_name,
        phone: a.phone,
      address: `${a.address}${a.postal_code ? " - " + a.postal_code : ""}`,
        main: a.is_default,
      }));
      setAddresses(addrList);
    } catch (err) {
      console.error("refreshAddresses error", err);
    }
  };

  const refreshBanks = async () => {
    try {
      const res = await api.get("/bank-accounts");
      const bankList = (res.data ?? []).map((b: any) => ({
        id: b.id,
        bank: b.bank_name,
        accountNumber: b.account_number,
        owner: b.account_owner,
      }));
      setBanks(bankList);
    } catch (err) {
      console.error("refreshBanks error", err);
    }
  };

  const refreshUser = async () => {
    try {
      const res = await api.get("/user");
      const u = res.data?.data ?? res.data;
      setUser((prev) => ({ ...(prev ?? {}), name: u.name, email: u.email, birthDate: u.birth_date ?? "-", phone: u.phone ?? "-", photo_url: u.photo_url ?? prev?.photo_url ?? null }));
      if (u.photo_url) setPhotoPreview(u.photo_url);
    } catch (err) {
      console.error("refreshUser error", err);
    }
  };

  // ----------------- Photo upload (via backend) -----------------
  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // preview local
    const reader = new FileReader();
    reader.onload = () => {
      setPhotoPreview(String(reader.result));
    };
    reader.readAsDataURL(file);

    // send to backend (Laravel will upload to Supabase and store URL)
    const form = new FormData();
    form.append("photo", file);

    try {
      const res = await api.post("/user/upload-photo", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const newUrl = res.data?.photo_url ?? res.data?.data?.photo_url;
      if (newUrl) {
        setPhotoPreview(newUrl);
        // update user state
        setUser((u) => (u ? { ...u, photo_url: newUrl } : u));
      }
    } catch (err: any) {
      console.error("Upload error", err);
      alert(err.response?.data?.error || "Gagal mengunggah foto profil");
      // optionally revert preview by refetching user
      await refreshUser();
    }
  };

  // ----------------- Address modal logic (add & edit) -----------------
  const openAddAddress = () => {
    setAddressEditId(null);
    setAddressForm({
      label: "",
      recipient_name: "",
      phone: "",
      address: "",
      postal_code: "",
      is_default: false,
    });
    setShowAddressModal(true);
  };

  const openEditAddress = (id: number) => {
    const found = addresses.find((a) => a.id === id);
    if (!found) return;
    // fetch detailed address from API to fill form (if necessary)
    // but we'll assume addr data stored minimal here: call GET /addresses then find
    (async () => {
      try {
        const res = await api.get("/addresses");
        const arr: AddressAPI[] = res.data ?? [];
        const target = arr.find((x) => x.id === id);
        if (!target) return alert("Alamat tidak ditemukan");
        setAddressEditId(id);
        setAddressForm({
          label: target.label,
          recipient_name: target.recipient_name,
          phone: target.phone,
          address: target.address,
          postal_code: target.postal_code,
          is_default: target.is_default,
        });
        setShowAddressModal(true);
      } catch (err) {
        console.error("openEditAddress", err);
        alert("Gagal memuat data alamat");
      }
    })();
  };

  const submitAddress = async () => {
    // basic client validation
   if (
  !addressForm.recipient_name ||
  !addressForm.phone ||
  !addressForm.address ||
  !addressForm.province_id ||
  !addressForm.city_id ||
  !addressForm.district_id
) {
  alert("Harap isi semua field wajib (Nama, Telp, Alamat, Provinsi, Kota, Kecamatan).");
  return;
}


    try {
      if (addressEditId) {
        // update
        const res = await api.put(`/addresses/${addressEditId}`, addressForm);
        // refresh
        await refreshAddresses();
        setShowAddressModal(false);
      } else {
        // create
        const res = await api.post("/addresses", addressForm);
        await refreshAddresses();
        setShowAddressModal(false);
      }
    } catch (err: any) {
      console.error("submitAddress error", err);
      alert(err.response?.data?.message || err.response?.data?.error || "Gagal menyimpan alamat");
    }
  };

  const deleteAddress = async (id: number) => {
    if (!confirm("Yakin ingin menghapus alamat ini?")) return;
    try {
      await api.delete(`/addresses/${id}`);
      await refreshAddresses();
    } catch (err: any) {
      console.error("deleteAddress error", err);
      alert(err.response?.data?.message || "Gagal menghapus alamat");
    }
  };

  // ----------------- Edit Profile logic -----------------
const openEditProfile = () => {
  if (!user) return;
  setEditProfileForm({
    name: user.name,
    email: user.email,
    phone: user.phone ?? "",
    birth_date: user.birthDate ?? "",
  });
  setShowEditProfileModal(true);
};

const submitEditProfile = async () => {
  if (!editProfileForm.name || !editProfileForm.email) {
    alert("Nama dan Email wajib diisi.");
    return;
  }

  try {
    const res = await api.put("/user", editProfileForm);
    const updated = res.data?.data ?? editProfileForm;
    setUser((u) => ({
      ...(u ?? {}),
      name: updated.name,
      email: updated.email,
      phone: updated.phone,
      birthDate: updated.birth_date,
    }));
    setShowEditProfileModal(false);
  } catch (err: any) {
    console.error("submitEditProfile error", err);
    alert(err.response?.data?.message || "Gagal memperbarui biodata");
  }
};


  // ----------------- Bank modal logic (create only) -----------------
  const openAddBank = () => {
    setBankForm({ bank_name: "", account_number: "", account_owner: "" });
    setShowBankModal(true);
  };

  const submitBank = async () => {
    // validation
    if (!bankForm.bank_name || !bankForm.account_number || !bankForm.account_owner) {
      alert("Harap isi semua field rekening.");
      return;
    }

    if (banks.length >= 3) {
      alert("Maksimal 3 rekening.");
      return;
    }

    try {
      const res = await api.post("/bank-accounts", {
        bank_name: bankForm.bank_name,
        account_number: bankForm.account_number,
        account_owner: bankForm.account_owner,
      });
      await refreshBanks();
      setShowBankModal(false);
    } catch (err: any) {
      console.error("submitBank error", err);
      alert(err.response?.data?.error || "Gagal menambah rekening");
    }
  };

  const deleteBank = async (id: number) => {
    if (!confirm("Yakin ingin menghapus rekening ini?")) return;
    try {
      await api.delete(`/bank-accounts/${id}`);
      await refreshBanks();
    } catch (err: any) {
      console.error("deleteBank error", err);
      alert(err.response?.data?.error || "Gagal menghapus rekening");
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Memuat data profil...</div>;
  }

  return (
    <>
    <Navbar />
  <div className="min-h-screen bg-gray-50 py-8 flex justify-center text-black mt-25">
    <div className="w-full max-w-7xl flex gap-8">

      {/* ====================== SIDEBAR ====================== */}
      <aside className="w-72 bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between">
        <div>
          {/* Profile Header */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-20 h-20 rounded-full overflow-hidden border shadow-sm">
              <Image
                src={photoPreview || "/image.png"}
                alt="avatar"
                width={80}
                height={80}
                className="object-cover"
              />
            </div>
            <p className="mt-3 font-semibold text-gray-800 text-lg">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>

          {/* Breadcrumb */}
          <div className="text-xs text-gray-400 mb-3 border-b pb-2">
            {sidebarMenu === "Profil Saya"
              ? `Profil Saya / ${activeTab}`
              : "Riwayat Pembelian"}
          </div>

          {/* Menu */}
          <nav className="space-y-2">
            <button
              onClick={() => setSidebarMenu("Profil Saya")}
              className={clsx(
                "w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 transition",
                sidebarMenu === "Profil Saya"
                  ? "bg-green-100 text-green-700 font-medium"
                  : "hover:bg-gray-100 text-gray-700"
              )}
            >
            Profil Saya
            </button>

            <button
              onClick={() => setSidebarMenu("Pembelian")}
              className={clsx(
                "w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 transition",
                sidebarMenu === "Pembelian"
                  ? "bg-green-100 text-green-700 font-medium"
                  : "hover:bg-gray-100 text-gray-700"
              )}
            >
            History Pembelian
            </button>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/";
              }}
              className="w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 text-red-600 hover:bg-red-50 mt-4"
            >
            Logout
            </button>
          </nav>
        </div>
      </aside>

      {/* ====================== MAIN CONTENT ====================== */}
     <main className="flex-1 bg-white rounded-2xl shadow p-8">
  {sidebarMenu === "Profil Saya" && (
    <>
      {/* Tabs */}
      <div className="border-b mb-6 flex gap-6 text-sm font-medium">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={clsx(
              "pb-3 border-b-2 transition-colors",
              activeTab === tab
                ? "text-green-600 border-green-600"
                : "text-gray-500 border-transparent hover:text-green-500"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* === Biodata Diri === */}
      {activeTab === "Biodata Diri" && (
        <div className="grid md:grid-cols-3 gap-6">
          {/* Foto Profil */}
          <div className="col-span-1 flex flex-col items-center text-center border-r border-gray-100 pr-4">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-green-100 shadow-md">
              <Image
                src={photoPreview || "/image.png"}
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
            <label className="mt-4 text-sm text-green-600 cursor-pointer font-medium hover:underline">
              Ganti Foto
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </label>
            <p className="text-xs text-gray-500 mt-2">
              Maks. 2MB — JPG/PNG/WebP
            </p>
          </div>

          {/* Info Biodata */}
          <div className="col-span-2 space-y-6">
            <section>
              <h2 className="font-semibold text-lg mb-3">Informasi Pribadi</h2>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 mb-1">Nama Lengkap</p>
                  <p className="font-medium text-gray-800 flex items-center justify-between">
                    {user?.name || "-"}
                    <button
                      onClick={openEditProfile}
                      className="text-green-600 text-xs hover:underline"
                    >
                      Ubah
                    </button>
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Tanggal Lahir</p>
                  <p className="font-medium text-gray-800">
                    {user?.birthDate || "-"}
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-semibold text-lg mb-3">Kontak</h2>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 mb-1">Email</p>
                  <p className="font-medium text-gray-800 flex items-center gap-2">
                    {user?.email || "-"}
                    {user?.verifiedEmail && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                        Terverifikasi
                      </span>
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Nomor HP</p>
                  <p className="font-medium text-gray-800">
                    {user?.phone || "-"}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}

      {/* === Daftar Alamat === */}
      {activeTab === "Daftar Alamat" && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">📍 Daftar Alamat</h2>
            <button
              onClick={openAddAddress}
              className="bg-green-600 text-white rounded-lg px-4 py-2 text-sm hover:bg-green-700"
            >
              + Tambah Alamat
            </button>
          </div>

          {addresses.length === 0 ? (
            <div className="text-sm text-gray-500 text-center py-10 bg-gray-50 rounded-lg">
              Belum ada alamat tersimpan.
            </div>
          ) : (
            <div className="space-y-4">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className={clsx(
                    "border rounded-xl p-4 transition hover:shadow-md",
                    addr.main && "bg-green-50 border-green-300"
                  )}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-800 text-base">
                        {addr.label || "Alamat"}{" "}
                        {addr.main && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded ml-1">
                            Utama
                          </span>
                        )}
                      </p>
                      <p className="text-gray-700 mt-1 font-medium">
                        {addr.owner}
                      </p>
                      <p className="text-gray-500 text-sm">{addr.phone}</p>
                      <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                        {addr.address}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2 text-sm">
                      <button
                        onClick={() => openEditAddress(addr.id)}
                        className="text-green-600 hover:underline"
                      >
                        Ubah
                      </button>
                      <button
                        onClick={() => deleteAddress(addr.id)}
                        className="text-red-600 hover:underline"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* === Wishlist === */}
      {activeTab === "Wishlist" && (
        <div>
          <h2 className="text-xl font-semibold mb-6">Wishlist Saya</h2>
          {wishlist.length === 0 ? (
            <div className="text-sm text-gray-500 text-center py-8">
              Belum ada produk di wishlist kamu.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="group relative border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition transform hover:-translate-y-1"
                >
                  <button
                    onClick={async () => {
                      await api.delete(`/wishlist/${item.id}`);
                      setWishlist((prev) =>
                        prev.filter((p) => p.id !== item.id)
                      );
                    }}
                    className="absolute top-2 right-2 bg-white/90 hover:bg-red-100 text-red-500 rounded-full p-1 shadow-sm"
                  >
                    ✕
                  </button>
                  <img
                    src={
                      item.images?.[0]?.image_url || "/images/default-watch.jpg"
                    }
                    alt={item.name}
                    className="w-full h-48 object-contain bg-gray-50"
                  />
                  <div className="p-4 flex flex-col justify-between min-h-[130px]">
                    <h3 className="font-semibold text-gray-800 line-clamp-2 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      Rp {item.price?.toLocaleString("id-ID")}
                    </p>
                    <button
                      onClick={() =>
                        (window.location.href = `/product/${item.id}`)
                      }
                      className="text-sm font-medium bg-green-600 text-white rounded-md py-2 hover:bg-green-700 transition"
                    >
                      Lihat Produk
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )}

  {/* === Pembelian === */}
  {sidebarMenu === "Pembelian" && (
    <div>
      <h2 className="text-xl font-semibold mb-6">Riwayat Pembelian</h2>
      {transactions.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          Kamu belum memiliki transaksi pembelian.
        </p>
      ) : (
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="border border-gray-200 rounded-xl p-5 flex items-center justify-between hover:shadow-md transition bg-gray-50/30"
            >
              <div className="flex items-center gap-4">
                <img
                  src={tx.image}
                  alt={tx.productName}
                  width={70}
                  height={70}
                  className="rounded-lg border bg-white"
                />
                <div>
                  <p className="font-medium">{tx.productName}</p>
                  <p className="text-sm text-gray-500">{tx.date}</p>

                  <span
                    className={clsx(
                      "text-xs font-semibold px-2 py-1 rounded-full mt-1 inline-block",
                      tx.status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : tx.status === "shipped"
                        ? "bg-blue-100 text-blue-700"
                        : tx.status === "paid"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-600"
                    )}
                  >
                    {tx.status}
                  </span>

                {tx.status === "delivered" && !tx.is_confirmed && (
              <button
                onClick={async () => {
                  try {
                    await api.post(`/orders/${tx.id}/confirm`);
                    setTransactions((prev) =>
                      prev.map((t) =>
                        t.id === tx.id ? { ...t, is_confirmed: true } : t
                      )
                    );
                    alert("Pesanan telah dikonfirmasi ✅");
                  } catch (err) {
                    console.error(err);
                    alert("Gagal mengonfirmasi pesanan.");
                  }
                }}
                className="mt-2 bg-green-600 text-white px-3 py-1.5 rounded-md text-xs hover:bg-green-700"
              >
                Konfirmasi Diterima
              </button>
            )}
{tx.is_confirmed && (
  <>
    {!tx.has_reviewed ? (
      <button
        onClick={() => {
          setSelectedProductId(tx.product_id ?? null);
          setSelectedTx(tx);
          setShowRatingModal(true);
        }}
        className="mt-2 border border-yellow-500 text-yellow-600 px-3 py-1.5 rounded-md text-xs hover:bg-yellow-50 transition"
      >
      Beri Ulasan Produk
      </button>
    ) : (
      <div className="flex items-center gap-2 mt-2">
        <span className="text-yellow-600 text-sm">⭐ Sudah Diulas</span>
        <button
          onClick={() => openEditReview(tx.product_id!)}
          className="text-xs px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
        >
          Edit
        </button>
      </div>
    )}
  </>
)}

                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Total Belanja</p>
                <p className="font-semibold text-gray-800">
                  Rp{tx.total.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )}
    </main>

    {showRatingModal && (
  <Modal
    title="Beri Ulasan Produk"
    show={showRatingModal}
    onClose={() => setShowRatingModal(false)}
    size="sm"
  >
    <div className="text-center space-y-4">
      <h4 className="font-semibold text-gray-800">
        Seberapa puas kamu dengan produk ini?
      </h4>

      {/* ⭐ Rating Bintang */}
      <div className="flex justify-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRatingValue(star)}
            className="focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={star <= ratingValue ? "#FACC15" : "none"}
              stroke="#FACC15"
              strokeWidth="2"
              className="w-8 h-8 transition-transform transform hover:scale-110"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.5l2.04 4.13 4.56.66-3.3 3.22.78 4.54-4.08-2.15-4.08 2.15.78-4.54-3.3-3.22 4.56-.66L11.48 3.5z"
              />
            </svg>
          </button>
        ))}
      </div>

      {/* 📝 Review Textarea */}
      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Ceritakan pengalamanmu menggunakan produk ini..."
        className="w-full border rounded-lg p-3 text-sm focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 resize-none"
        rows={4}
      />

      {/* Tombol Simpan */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={async () => {
            if (!ratingValue) return alert("Pilih jumlah bintang dulu ⭐");
            try {
              await api.post(`/products/${selectedProductId}/rate`, {
                rating: ratingValue,
                review: reviewText,
              });
              alert("Terima kasih atas ulasanmu 💛");
              setShowRatingModal(false);
              setTransactions((prev) =>
              prev.map((t) =>
                t.product_id === selectedProductId
                  ? { ...t, has_reviewed: true }
                  : t
              )
            );
              setRatingValue(0);
              setReviewText("");
            } catch (err: any) {
              console.error("❌ Gagal kirim rating:", err);
              alert(
                err.response?.data?.message ||
                  "Kamu hanya bisa memberi rating untuk produk yang sudah kamu terima."
              );
            }
          }}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-4 py-2 rounded-lg w-full transition"
        >
          Kirim Ulasan
        </button>

        <button
          onClick={() => setShowRatingModal(false)}
          className="border border-gray-300 text-gray-600 px-4 py-2 rounded-lg w-full hover:bg-gray-100 transition"
        >
          Batal
        </button>
      </div>
    </div>
  </Modal>
)}


    {showAddressModal && (
  <Modal
    title={addressEditId ? "Ubah Alamat" : "Tambah Alamat Baru"}
    show={showAddressModal}
    onClose={() => setShowAddressModal(false)}
    size="md"
  >
    <div className="space-y-3 text-sm">
      <input
        type="text"
        placeholder="Label (Contoh: Rumah)"
        value={addressForm.label ?? ""}
        onChange={(e) => setAddressForm({ ...addressForm, label: e.target.value })}
        className="w-full border rounded px-3 py-2"
      />
      <input
        type="text"
        placeholder="Nama Penerima"
        value={addressForm.recipient_name ?? ""}
        onChange={(e) => setAddressForm({ ...addressForm, recipient_name: e.target.value })}
        className="w-full border rounded px-3 py-2"
      />
      <input
        type="text"
        placeholder="Nomor Telepon"
        value={addressForm.phone ?? ""}
        onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
        className="w-full border rounded px-3 py-2"
      />
      <textarea
        placeholder="Alamat Lengkap"
        value={addressForm.address ?? ""}
        onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })}
        className="w-full border rounded px-3 py-2"
      />
      <ProvinceCityDistrictSelect
        addressForm={addressForm}
        setAddressForm={setAddressForm}
      />
      <input
        type="text"
        placeholder="Kode Pos"
        value={addressForm.postal_code ?? ""}
        onChange={(e) => setAddressForm({ ...addressForm, postal_code: e.target.value })}
        className="w-full border rounded px-3 py-2"
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={!!addressForm.is_default}
          onChange={(e) => setAddressForm({ ...addressForm, is_default: !!e.target.checked })}
        />
        Jadikan Alamat Utama
      </label>

      <div className="flex gap-3">
        <button
          onClick={submitAddress}
          className="bg-green-600 text-white rounded-lg w-full py-2"
        >
          Simpan
        </button>
        <button
          onClick={() => setShowAddressModal(false)}
          className="border rounded-lg w-full py-2"
        >
          Batal
        </button>
      </div>
    </div>
  </Modal>
)}

{showEditProfileModal && (
  <Modal
    title="Ubah Biodata Diri"
    show={showEditProfileModal}
    onClose={() => setShowEditProfileModal(false)}
    size="sm"
  >
    <div className="space-y-3 text-sm">
      <input
        type="text"
        placeholder="Nama Lengkap"
        value={editProfileForm.name}
        onChange={(e) => setEditProfileForm({ ...editProfileForm, name: e.target.value })}
        className="w-full border rounded px-3 py-2"
      />
      <input
        type="email"
        placeholder="Alamat Email"
        value={editProfileForm.email}
        readOnly
        className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
      />
      <input
        type="text"
        placeholder="Nomor HP"
        value={editProfileForm.phone}
        onChange={(e) => setEditProfileForm({ ...editProfileForm, phone: e.target.value })}
        className="w-full border rounded px-3 py-2"
      />
      <input
        type="date"
        value={editProfileForm.birth_date}
        onChange={(e) => setEditProfileForm({ ...editProfileForm, birth_date: e.target.value })}
        className="w-full border rounded px-3 py-2"
      />

      <div className="flex gap-3">
        <button
          onClick={submitEditProfile}
          className="bg-green-600 text-white rounded-lg w-full py-2"
        >
          Simpan
        </button>
        <button
          onClick={() => setShowEditProfileModal(false)}
          className="border rounded-lg w-full py-2"
        >
          Batal
        </button>
      </div>
    </div>
  </Modal>
)}


    </div>
  </div>
  <Footer />
    </>
);


  // ====================== Province → City → District Selector ======================
function ProvinceCityDistrictSelect({
  addressForm,
  setAddressForm,
}: {
  addressForm: any;
  setAddressForm: React.Dispatch<React.SetStateAction<any>>;
}) {
  const [provinces, setProvinces] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [loadingProvince, setLoadingProvince] = useState(true);
  const [loadingCity, setLoadingCity] = useState(false);
  const [loadingDistrict, setLoadingDistrict] = useState(false);

  // ===== Fetch Provinces (once)
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const res = await api.get("/rajaongkir/provinces");
        console.log("✅ Provinces:", res.data);
        setProvinces(res.data.data ?? []);
      } catch (err) {
        console.error("❌ Gagal memuat provinsi", err);
      } finally {
        setLoadingProvince(false);
      }
    };
    fetchProvinces();
  }, []);

  // ===== Fetch Cities (auto-run if province_id changes)
  useEffect(() => {
    if (!addressForm.province_id) return;
    setLoadingCity(true);
    (async () => {
      try {
        console.log("📦 Fetching cities for province:", addressForm.province_id);
        const res = await api.get(`/rajaongkir/cities/${addressForm.province_id}`);
        console.log("✅ Cities response:", res.data);
        setCities(res.data.data ?? []);
      } catch (err) {
        console.error("❌ Gagal memuat kota", err);
      } finally {
        setLoadingCity(false);
      }
    })();
  }, [addressForm.province_id]); // <-- otomatis refetch tiap province berubah

  // ===== Fetch Districts (auto-run if city_id changes)
  useEffect(() => {
    if (!addressForm.city_id) return;
    setLoadingDistrict(true);
    (async () => {
      try {
        console.log("🏙 Fetching districts for city:", addressForm.city_id);
        const res = await api.get(`/rajaongkir/districts/${addressForm.city_id}`);
        console.log("✅ Districts response:", res.data);
        setDistricts(res.data.data ?? []);
      } catch (err) {
        console.error("❌ Gagal memuat kecamatan", err);
      } finally {
        setLoadingDistrict(false);
      }
    })();
  }, [addressForm.city_id]); // <-- otomatis refetch tiap city berubah

  return (
    <>
      {/* PROVINSI */}
      <select
        value={addressForm.province_id ?? ""}
        onChange={(e) =>
          setAddressForm({
            ...addressForm,
            province_id: e.target.value,
            city_id: "",
            district_id: "",
          })
        }
        className="w-full border rounded px-3 py-2"
      >
        <option value="">
          {loadingProvince ? "Memuat provinsi..." : "Pilih Provinsi"}
        </option>
        {provinces.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      {/* KOTA */}
      <select
        value={addressForm.city_id ?? ""}
        onChange={(e) =>
          setAddressForm({
            ...addressForm,
            city_id: e.target.value,
            district_id: "",
          })
        }
        className="w-full border rounded px-3 py-2 mt-2"
        disabled={!addressForm.province_id}
      >
        <option value="">
          {loadingCity
            ? "Memuat kota..."
            : addressForm.province_id
            ? "Pilih Kota"
            : "Pilih Provinsi terlebih dahulu"}
        </option>
        {cities.length > 0 ? (
          cities.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))
        ) : (
          !loadingCity && <option disabled>Data kota tidak tersedia</option>
        )}
      </select>

      {/* KECAMATAN */}
      <select
        value={addressForm.district_id ?? ""}
        onChange={(e) =>
          setAddressForm({
            ...addressForm,
            district_id: e.target.value,
          })
        }
        className="w-full border rounded px-3 py-2 mt-2"
        disabled={!addressForm.city_id}
      >
        <option value="">
          {loadingDistrict
            ? "Memuat kecamatan..."
            : addressForm.city_id
            ? "Pilih Kecamatan"
            : "Pilih Kota terlebih dahulu"}
        </option>
        {districts.length > 0 ? (
          districts.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))
        ) : (
          !loadingDistrict && <option disabled>Data kecamatan tidak tersedia</option>
        )}
      </select>
    </>
  );
}



}
