"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import {
  BarChart3,
  Package,
  ShoppingBag,
  Users,
  Building2,
  Menu,
  LogOut,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  // 🔹 Ambil role dari localStorage saat pertama kali load
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
    setLoading(false);
  }, []);

  // 🔹 Semua menu lengkap
  const allMenus = [
    { icon: <BarChart3 size={20} />, label: "Dashboard", href: "/Admin/Dashboard", roles: ["admin"] },
    { icon: <Package size={20} />, label: "Produk", href: "/Admin/Product", roles: ["admin", "operator"] },
    { icon: <Building2 size={20} />, label: "Brand", href: "/Admin/Brand", roles: ["admin", "operator"] },
    { icon: <ShoppingBag size={20} />, label: "Order", href: "/Admin/Orders", roles: ["admin", "dispatcher"] },
    { icon: <Users size={20} />, label: "User", href: "/Admin/Users", roles: ["admin"] },
  ];

  // 🔹 Filter menu sesuai role user
  const menu = role ? allMenus.filter((item) => item.roles.includes(role)) : [];

  // 🔹 Redirect otomatis jika role bukan admin tapi sedang di Dashboard
  useEffect(() => {
    if (!loading && role && pathname === "/Admin/Dashboard" && role !== "admin") {
      if (role === "operator") router.replace("/Admin/Product");
      else if (role === "dispatcher") router.replace("/Admin/Orders");
    }
  }, [role, pathname, loading, router]);

  // 🔹 Fungsi Logout
  const handleLogout = () => {
    if (confirm("Yakin ingin logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("user");
      router.push("/");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Memuat...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside
        className={clsx(
          "bg-white shadow-lg transition-all duration-300 h-screen sticky top-0 flex flex-col justify-between",
          collapsed ? "w-20" : "w-64"
        )}
      >
        {/* Top Section */}
        <div>
          {/* Header */}
          <div className="p-4 flex items-center justify-between border-b">
            <h1
              className={clsx(
                "text-lg font-bold text-green-600 transition-all whitespace-nowrap",
                collapsed && "opacity-0 w-0 overflow-hidden"
              )}
            >
              Admin Panel
            </h1>
            <button
              className="p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setCollapsed(!collapsed)}
            >
              <Menu size={20} />
            </button>
          </div>

          {/* Menu */}
          <nav className="mt-4 flex-1 space-y-1">
            {menu.length === 0 && (
              <p className="text-gray-400 text-xs px-4 mt-6">
                Tidak ada menu untuk peran ini
              </p>
            )}

            {menu.map((item) => (
              <SidebarLink
                key={item.href}
                icon={item.icon}
                label={item.label}
                href={item.href}
                collapsed={collapsed}
                active={pathname === item.href}
              />
            ))}
          </nav>
        </div>

        {/* Bottom Section - Logout */}
        <div className="border-t border-gray-100 p-4">
          <button
            onClick={handleLogout}
            className={clsx(
              "w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200",
              "text-gray-600 hover:text-red-600 hover:bg-red-50"
            )}
          >
            <LogOut size={20} />
            <span
              className={clsx(
                "text-sm font-medium transition-all",
                collapsed && "opacity-0 w-0 overflow-hidden"
              )}
            >
              Keluar
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}

function SidebarLink({
  icon,
  label,
  href,
  collapsed,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  collapsed: boolean;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={clsx(
        "flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-200 group",
        active
          ? "bg-green-100 text-green-700 font-medium"
          : "text-gray-600 hover:bg-gray-100 hover:text-green-600"
      )}
    >
      {icon}
      <span
        className={clsx(
          "text-sm transition-all whitespace-nowrap",
          collapsed && "opacity-0 w-0 overflow-hidden"
        )}
      >
        {label}
      </span>
    </Link>
  );
}
