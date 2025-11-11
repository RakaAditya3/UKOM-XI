"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import api from "@/api/api";
import { Heart, ShoppingCart } from "lucide-react";
import { Star } from "lucide-react";


export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState("");
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [totalRatings, setTotalRatings] = useState<number>(0);
  const [reviews, setReviews] = useState<any[]>([]);
  const [canRate, setCanRate] = useState(false);

const formatRupiah = (value: any) => {
  const number = Number(value) || 0;
  return (
    "Rp. " +
    new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number)
  );
};




  // Fetch produk & related
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        const productData = res.data.data ?? res.data;
        setProduct(productData);
        setSelectedImage(productData.images?.[0]?.image_url || null);
      } catch (err) {
        console.error("❌ Gagal memuat produk:", err);
      }
    };

    const fetchRelated = async () => {
      try {
        const res = await api.get(`/products`);
        const all = res.data.data ?? res.data;
        const filtered = all.filter((p: any) => p.id != id);
        const random = filtered.sort(() => 0.5 - Math.random()).slice(0, 4);
        setRelated(random);
      } catch (err) {
        console.error("❌ Gagal memuat produk terkait:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    fetchRelated();
  }, [id]);

  useEffect(() => {
  const fetchRatings = async () => {
    try {
      const res = await api.get(`/products/${id}/ratings`);
      const data = res.data ?? {};
      setAverageRating(data.average || 0);
      setTotalRatings(data.count || 0);
      setReviews(data.ratings || []);
    } catch (err) {
      console.error("❌ Gagal memuat rating:", err);
    }
  };
  fetchRatings();
}, [id]);

useEffect(() => {
  const checkEligibility = async () => {
    if (!localStorage.getItem("token")) return;
    try {
      const res = await api.get(`/products/${id}/can-rate`);
      setCanRate(res.data.can_rate);
    } catch (err) {
      console.error("❌ Gagal memeriksa eligibility rating:", err);
    }
  };
  checkEligibility();
}, [id]);



  // Cek apakah produk sudah ada di wishlist
  useEffect(() => {
    const checkWishlist = async () => {
      if (!localStorage.getItem("token")) return;
      try {
        const res = await api.get("/wishlist");
        const wishlist = res.data ?? [];
        setInWishlist(wishlist.some((item: any) => item.id == id));
      } catch (err) {
        console.error("❌ Gagal memeriksa wishlist:", err);
      }
    };
    checkWishlist();
  }, [id]);

const handleAddToCart = async () => {
  if (!localStorage.getItem("token")) {
    router.push("/signup");
    return;
  }

  if (product.stock <= 0) {
    alert("Stok produk ini sudah habis.");
    return;
  }

  setAdding(true);
  setMessage(null);
  try {
    const res = await api.post("/cart/add", {
      product_id: product.id,
      quantity: 1,
    });
    setMessage(res.data.message || "Produk berhasil ditambahkan ke keranjang ✅");
  } catch (err: any) {
    console.error("❌ Gagal menambah ke keranjang:", err);
    setMessage(err.response?.data?.message || "Gagal menambahkan produk ke keranjang.");
  } finally {
    setAdding(false);
    setTimeout(() => setMessage(null), 3000);
  }
};


  // ❤️ Tambah / Hapus Wishlist
  const handleToggleWishlist = async () => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
      return;
    }

    setWishlistLoading(true);
    try {
      if (inWishlist) {
        await api.delete(`/wishlist/${product.id}`);
        setMessage("Produk dihapus dari wishlist ❌");
        setInWishlist(false);
      } else {
        await api.post(`/wishlist/${product.id}`);
        setMessage("Produk ditambahkan ke wishlist ❤️");
        setInWishlist(true);
      }
    } catch (err: any) {
      console.error("❌ Wishlist error:", err);
      setMessage(err.response?.data?.message || "Gagal memperbarui wishlist.");
    } finally {
      setWishlistLoading(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-500">
        Loading product details...
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-500">
        Product not found.
      </div>
    );

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white text-gray-800 pt-30">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* === LEFT: Image Gallery === */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
              <img
                src={selectedImage || product.images?.[0]?.image_url || "/images/default-watch.jpg"}
                alt={product.name}
                className="object-contain w-full h-full"
              />
            </div>

            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
                {product.images.map((img: any, i: number) => (
                  <img
                    key={i}
                    src={img.image_url}
                    alt={`thumb-${i}`}
                    onClick={() => setSelectedImage(img.image_url)}
                    className={`w-24 h-24 object-cover rounded-lg cursor-pointer border ${
                      selectedImage === img.image_url ? "border-black" : "border-gray-200"
                    } hover:border-black transition`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* === RIGHT: Product Info === */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
                  {product.name}
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                  {product.brand?.name || "Chronova"} Collection
                </p>
                <p className="mt-2 font-semibold text-lg text-gray-700">
                  Ref. No: {product.ref_no || "-"}
                </p>
              </div>

              {/* ❤️ Wishlist Button */}
              <button
                onClick={handleToggleWishlist}
                disabled={wishlistLoading}
                className={`p-2 rounded-full border transition ${
                  inWishlist
                    ? "bg-red-100 border-red-300 text-red-500"
                    : "border-gray-300 hover:bg-gray-100 text-gray-500"
                }`}
              >
                <Heart
                  className={`w-6 h-6 ${inWishlist ? "fill-red-500 text-red-500" : ""}`}
                />
              </button>
            </div>

         <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-wrap">
  <p className="text-3xl font-bold text-gray-900">
    {formatRupiah(product.price)}
  </p>

  {/* jumlah terjual */}
  {product.sold_count !== undefined && (
    <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
      Terjual {product.sold_count} {product.sold_count === 1 ? "unit" : "unit"}
    </span>
  )}

  {/* stok tersedia */}
  {product.stock !== undefined && (
    <span
      className={`text-sm font-medium px-3 py-1 rounded-full ${
        product.stock > 10
          ? "bg-green-100 text-green-700"
          : product.stock > 0
          ? "bg-yellow-100 text-yellow-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {product.stock > 0
        ? `Stok Tersisa: ${product.stock} unit`
        : "Stok Habis ❌"}
    </span>
  )}
</div>

            <p className="text-gray-700 leading-relaxed">
              {product.description ||
                "Jam tangan Chronova ini dirancang untuk mereka yang menghargai presisi, keindahan, dan keabadian. Sebuah pernyataan kemewahan yang melampaui waktu."}
            </p>

          {/* === Rating & Ulasan Section === */}
          <div className="mt-6 border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Rating & Ulasan</h3>

            {/* Rata-rata rating */}
            {averageRating !== null && (
              <div className="flex items-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(averageRating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-2">
                  {averageRating.toFixed(1)} dari 5 ({totalRatings} ulasan)
                </span>
              </div>
            )}

            {/* Daftar review */}
            <div className="space-y-4">
              {reviews.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  Belum ada ulasan untuk produk ini.
                </p>
              ) : (
                reviews.map((r, i) => (
                  <div key={i} className="border rounded-lg p-3 bg-gray-50">
                    <div className="flex items-center gap-2 mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= r.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-xs text-gray-500 ml-2">
                        {new Date(r.created_at).toLocaleDateString("id-ID")}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{r.review || "Tanpa komentar."}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      oleh {r.user?.name || "Pengguna"}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            {product.stock <= 0 ? (
              // 🚫 Produk Habis
              <div className="w-full bg-gray-200 text-gray-600 px-6 py-3 rounded-md font-semibold text-center">
                ❌ Stok Habis
              </div>
            ) : (
              <>
                {/* Tambah ke Keranjang */}
                <button
                  onClick={handleAddToCart}
                  disabled={adding}
                  className="bg-black text-white px-6 py-3 rounded-md font-semibold hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {adding ? "Menambahkan..." : "Tambah ke Keranjang"}
                </button>

                {/* 🛍️ Beli Sekarang */}
                <button
                  onClick={async () => {
                    if (!localStorage.getItem("token")) {
                      router.push("/signup");
                      return;
                    }

                    try {
                      setAdding(true);
                      await api.post("/cart/add", {
                        product_id: product.id,
                        quantity: 1,
                      });
                      router.push("/Cart");
                    } catch (err: any) {
                      console.error("❌ Gagal beli langsung:", err);
                      alert(err.response?.data?.message || "Gagal menambahkan produk ke keranjang.");
                    } finally {
                      setAdding(false);
                    }
                  }}
                  disabled={adding}
                  className="border border-gray-400 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  Beli Sekarang
                </button>
              </>
            )}
          </div>
            {/* Notifikasi */}
            {message && (
              <div className="mt-4 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md px-4 py-2">
                {message}
              </div>
            )}
          </div>
        </div>

        {/* === Related Products === */}
        <section className="max-w-7xl mx-auto px-6 py-10 border-t border-gray-200 mt-10">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">
            Produk Terkait
          </h2>
          {related.length === 0 ? (
            <p className="text-gray-500">Tidak ada produk terkait.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((p, i) => (
                <div
                  key={i}
                  onClick={() => router.push(`/product/${p.id}`)}
                  className="cursor-pointer border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition bg-white"
                >
                  <img
                    src={p.images?.[0]?.image_url || "/images/default-watch.jpg"}
                    alt={p.name}
                    className="w-full h-52 object-contain bg-gray-50"
                  />
                 <div className="p-4">
                  <h3 className="font-medium text-gray-800">{p.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{formatRupiah(p.price)}</p>
                  {p.sold_count !== undefined && (
                    <p className="text-xs text-gray-500 mt-1">Terjual {p.sold_count}</p>
                  )}
                </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <Footer />
    </>
  );
}
