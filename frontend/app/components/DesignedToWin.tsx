"use client";
import Image from "next/image";

export default function DesignedToWinWithGif() {
  return (
    <section className="bg-white text-black text-center py-24 relative overflow-hidden">
      <div className="flex justify-center mb-6">
        <img
          src="https://www.tagheuer.com/on/demandware.static/-/Library-Sites-TagHeuer-Shared/default/dwaf3fe3e5/images/univers/9-Maison/cross-animation.gif"  // path ke GIF yang kamu pakai
          alt="cross animation"
          className="w-40 h-auto object-contain"
        />
      </div>
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4">
        DESIGNED TO WIN
      </h1>
      <p className="text-gray-600 max-w-lg mx-auto text-sm md:text-base leading-relaxed mb-8">
        More than just a tagline, it’s our driving motto.
        <br />
        We are, by nature, <span className="font-semibold">DESIGNED TO WIN.</span>
      </p>
      <button className="px-8 py-3 border border-black text-black tracking-wider text-sm hover:bg-black hover:text-white transition-all">
        DISCOVER
      </button>
      <div className="flex justify-center mt-10">
        <img
          src="https://www.tagheuer.com/on/demandware.static/-/Library-Sites-TagHeuer-Shared/default/dwaf3fe3e5/images/univers/9-Maison/cross-animation.gif"
          alt="cross animation bottom"
          className="w-40 h-auto object-contain"
        />
      </div>
    </section>
  );
}
