"use client";

import React, { useEffect, useState } from "react";
import { X, ShoppingBag, Lock, Truck } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "@/api/api";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  stock:number;
}

interface Address {
  id: number;
  label: string;
  recipient_name: string;
  phone: string;
  address: string;
  city: string;
  postal_code: string;
  is_default: number;
}

interface ShippingOption {
  name: string;
  code: string;
  service: string;
  description: string;
  cost: number;
  etd?: string;
}

declare global {
  interface Window {
    snap: any;
  }
}

const TagHeuerCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [address, setAddress] = useState<Address | null>(null);
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption | null>(null);
  const [loadingShipping, setLoadingShipping] = useState(false);
  const [allAddresses, setAllAddresses] = useState<Address[]>([]);
  const [showAddressModal, setShowAddressModal] = useState(false);


  const router = useRouter();

useEffect(() => {
  const url = new URL(window.location.href);
  const status = url.searchParams.get("transaction_status");
  const orderId = url.searchParams.get("order_id");

  if (status && (status === "capture" || status === "settlement")) {
    console.log("🟢 Redirect detected from Midtrans:", { orderId, status });
    router.push("/checkout/success");
  }
}, [router]);


  // 🧩 Load Midtrans SDK
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute(
      "data-client-key",
      process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || ""
    );
    script.async = true;
    document.body.appendChild(script);
  }, []);

// 🏠 Fetch alamat user
useEffect(() => {
  const fetchAddress = async () => {
    try {
      const res = await api.get("/addresses");
      const addresses = Array.isArray(res.data) ? res.data : [];

      setAllAddresses(addresses);

      if (addresses.length > 0) {
        const defaultAddress =
          addresses.find((a) => a.is_default === 1) || addresses[0];
        setAddress(defaultAddress);
      } else {
        setAddress(null);
      }
    } catch (err) {
      console.error("❌ Gagal memuat alamat:", err);
      setAddress(null);
    }
  };
  fetchAddress();
}, []);


  // 🛒 Fetch Cart
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await api.get("/cart");
        const data = res.data;
        if (!data || !data.items) {
          setCartItems([]);
          return;
        }
       const mapped = data.items.map((item: any) => ({
  id: item.id,
  name: item.product?.name ?? "Unknown",
  price: Number(item.price),
  image: item.product?.images?.[0]?.image_url || "/images/default-watch.jpg",
  quantity: item.quantity,
  stock: item.product?.stock ?? 0,
  available: item.product?.stock > 0,
}));

        setCartItems(mapped);
      } catch (err) {
        console.error("❌ Gagal memuat cart:", err);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  // 🚚 Fetch Ongkir otomatis
  useEffect(() => {
    if (!address) return;
    const fetchOngkir = async () => {
      setLoadingShipping(true);
      try {
        const res = await api.post("/rajaongkir/check-ongkir", {
          weight: 1000,
          courier: "jne:jnt:sicepat:ninja",
        });
        setShippingOptions(res.data.data || []);
      } catch (err) {
        console.error("❌ Gagal mengambil ongkir:", err);
        setShippingOptions([]);
      } finally {
        setLoadingShipping(false);
      }
    };
    fetchOngkir();
  }, [address]);

  const removeItem = async (id: number) => {
    try {
      await api.delete(`/cart/item/${id}`);
      setCartItems((items) => items.filter((i) => i.id !== id));
    } catch {
      alert("Gagal menghapus item");
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal + (selectedShipping?.cost || 0);

  // 💳 Checkout
const handleCheckout = async () => {
  if (!address) {
    alert("Tambahkan alamat pengiriman terlebih dahulu sebelum checkout.");
    return;
  }
  if (!selectedShipping) {
    alert("Pilih metode pengiriman terlebih dahulu.");
    return;
  }


  setLoadingCheckout(true);
  try {
    await api.post("/cart/update-shipping", {
      courier: selectedShipping.code,
      shipping_cost: selectedShipping.cost,
    });

    const res = await api.post("/payment/create-transaction", {
      address_id: address.id,
      courier: selectedShipping.code,
      shipping_cost: selectedShipping.cost,
    });

    const { snap_token } = res.data;
    if (!snap_token) throw new Error("Snap token tidak ditemukan");

    // 3️⃣ Panggil popup Snap
    if (window.snap && snap_token) {
    window.snap.pay(snap_token, {
  onSuccess: async (result: any) => {
    console.log("✅ Payment success:", result);

    await api.post("/orders/create-from-cart", {
      address_id: address.id,
      courier: selectedShipping.code,
      shipping_cost: selectedShipping.cost,
      payment_data: result,
    });

    // ✅ Redirect manual ke success
    router.push("/checkout/success");
  },
  onPending: () => {
    alert("Pembayaran pending. Silakan selesaikan pembayaranmu.");
  },
  onError: (err: any) => {
    console.error("❌ Error Midtrans:", err);
    alert("Pembayaran gagal. Coba lagi nanti.");
  },
  onClose: () => {
    console.warn("Popup ditutup sebelum selesai.");
  },
});

    } else {
      alert("Midtrans Snap belum siap.");
    }
  } catch (err: any) {
    console.error("❌ Checkout gagal:", err);
    alert(err.response?.data?.message || "Checkout gagal. Coba lagi nanti.");
  } finally {
    setLoadingCheckout(false);
  }
};


  // 🏷️ Logo ekspedisi
  const courierLogo = (code: string) => {
    const c = code.toLowerCase();
    if (c.includes("jne")) return "/couriers/jne.png";
    if (c.includes("jnt")) return "/couriers/jnt.png";
    if (c.includes("sicepat")) return "/couriers/sicepat.png";
    if (c.includes("ninja")) return "/couriers/ninja.png";
    return "/couriers/default.png";
  };

const updateQuantity = async (id: number, newQty: number) => {
  try {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;

    if (newQty < 1) return;
    if (newQty > item.stock) {
      alert(`Maksimal hanya ${item.stock} unit yang tersedia.`);
      return;
    }

    await api.put(`/cart/item/${id}`, { quantity: newQty });

    setCartItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, quantity: newQty } : i
      )
    );
  } catch (err: any) {
    alert(err.response?.data?.message || "Gagal mengubah jumlah item");
  }
};



  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white text-black pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* === Cart Items === */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-light mb-8">SHOPPING BAG</h2>

              {loading ? (
                <p className="text-gray-500 text-center py-10">Loading cart...</p>
              ) : cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500">Your shopping bag is empty</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="border border-gray-200 p-6 flex gap-6">
                      <div className="w-32 h-32 bg-gray-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-lg font-light mb-1">{item.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">
                              Rp{item.price.toLocaleString("id-ID")}
                            </p>
                          </div>
                          {item.stock === 0 && (
                            <p className="text-red-500 text-sm font-medium mt-2">
                              ❌ Produk tidak tersedia (stok habis)
                            </p>
                          )}
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className={`border rounded-full w-7 h-7 flex items-center justify-center text-gray-700 
                          ${item.quantity <= 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"}`}
                      >
                        −
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                     <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                      className={`border rounded-full w-7 h-7 flex items-center justify-center text-gray-700 
                        ${item.quantity >= item.stock ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"}`}
                    >
                      +
                    </button>

                    </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* === Summary === */}
            <div className="border border-gray-200 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-light mb-6">ORDER SUMMARY</h3>

              <div className="flex justify-between text-sm mb-4">
                <span>Subtotal</span>
                <span>Rp{subtotal.toLocaleString("id-ID")}</span>
              </div>

              {/* 🚚 Kurir Section */}
              <div className="mb-4">
                <label className="text-sm font-medium flex items-center gap-2 mb-2">
                  <Truck className="w-4 h-4" /> Pilih Kurir
                </label>

                {loadingShipping ? (
                  <p className="text-gray-500 text-sm">Menghitung ongkos kirim...</p>
                ) : shippingOptions.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3 max-h-52 overflow-y-auto pr-1">
                    {shippingOptions.map((opt, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedShipping(opt)}
                        className={`border rounded-lg px-3 py-2 cursor-pointer flex flex-col items-center justify-center gap-1 transition text-center 
                          ${selectedShipping?.code === opt.code && selectedShipping?.service === opt.service
                            ? "border-green-600 bg-green-50"
                            : "border-gray-200 hover:border-green-400 hover:bg-green-50/30"
                          }`}
                      >
                        <Image
                          src={courierLogo(opt.code)}
                          alt={opt.name}
                          width={45}
                          height={30}
                          className="object-contain"
                        />
                        <p className="text-xs font-medium">{opt.name}</p>
                        <p className="text-[11px] text-gray-500">{opt.service}</p>
                        <p className="text-sm font-semibold">
                          Rp{opt.cost.toLocaleString("id-ID")}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-red-500 text-sm">Tidak ada opsi pengiriman</p>
                )}
              </div>

              {/* TOTAL */}
              <div className="border-t border-gray-200 pt-4 flex justify-between font-light text-lg mb-6">
                <span>Total</span>
                <span>Rp{total.toLocaleString("id-ID")}</span>
              </div>

              {/* Alamat */}
           {address ? (
  <div className="text-sm text-gray-700 mb-4 border-t border-gray-200 pt-4">
    <div className="flex justify-between items-center mb-2">
      <p className="font-semibold">{address.label}</p>
      <button
        onClick={() => setShowAddressModal(true)}
        className="text-xs text-green-600 hover:underline"
      >
        Ubah
      </button>
    </div>
    <p>{address.recipient_name}</p>
    <p>{address.address}, {address.city}</p>
    <p>{address.postal_code}</p>
    <p>{address.phone}</p>
  </div>
          ) : (
            <p className="text-red-500 text-sm text-center mb-4">
              ⚠️ Kamu belum punya alamat pengiriman.
            </p>
          )}

              {/* Checkout */}
              <button
                onClick={handleCheckout}
                disabled={loadingCheckout}
                className="w-full bg-black text-white py-4 hover:bg-gray-800 transition flex items-center justify-center gap-2 rounded-lg"
              >
                {loadingCheckout ? (
                  "Processing..."
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    SECURE CHECKOUT
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      

      {/* 🏠 Modal Pilih Alamat */}
{showAddressModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">
      
      <button
        onClick={() => setShowAddressModal(false)}
        className="absolute top-3 right-3 text-gray-500 hover:text-black"
      >
        <X className="w-5 h-5" />
      </button>

      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Pilih Alamat Pengiriman
      </h3>

      {allAddresses.length === 0 ? (
        <p className="text-gray-500 text-sm">Kamu belum memiliki alamat tersimpan.</p>
      ) : (
        <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
          {allAddresses.map((addr) => (
            <div
              key={addr.id}
              onClick={() => {
                setAddress(addr);
                setShowAddressModal(false);
              }}
              className={`border rounded-lg p-3 cursor-pointer transition ${
                address?.id === addr.id
                  ? "border-green-600 bg-green-50"
                  : "border-gray-200 hover:border-green-400 hover:bg-green-50/30"
              }`}
            >
              <p className="font-medium text-gray-800">{addr.label}</p>
              <p className="text-sm text-gray-600">
                {addr.recipient_name} — {addr.phone}
              </p>
              <p className="text-sm text-gray-500 mt-1 leading-snug">
                {addr.address}, {addr.city}, {addr.postal_code}
              </p>
              {addr.is_default === 1 && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded mt-1 inline-block">
                  Utama
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-5 flex justify-end">
        <button
          onClick={() => setShowAddressModal(false)}
          className="px-4 py-2 text-sm border rounded-md hover:bg-gray-100"
        >
          Tutup
        </button>
      </div>
    </div>
  </div>
)}

      <Footer />
    </>
  );
};

export default TagHeuerCart;
