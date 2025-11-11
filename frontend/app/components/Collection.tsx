"use client";
import Image from "next/image";
import Link from "next/link";

export default function DesignedToWinWithGif() {
  return (
    <section className="bg-white text-black text-center py-24 relative overflow-hidden">
      <div className="flex justify-center">
        <img
          src="https://www.tagheuer.com/on/demandware.static/-/Library-Sites-TagHeuer-Shared/default/dwaf3fe3e5/images/univers/9-Maison/cross-animation.gif"  // path ke GIF yang kamu pakai
          alt="cross animation"
          className="w-40 h-auto object-contain"
        />
      </div>
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4">
        Collections
      </h1>
       <Link href="/collection">
            <button
              className="px-8 py-3 border border-black text-black tracking-wider text-sm hover:bg-black hover:text-white transition-all"
            >
              DISCOVER
            </button>
        </Link>
    </section>
  );
}
