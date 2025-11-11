"use client";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Upper links section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-800 pb-12">
          {/* Collections */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Collections</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/TAG-HEUER-F1">Tag Heur F1</Link></li>
              <li><Link href="/collection">All Collections</Link></li>
            </ul>
          </div>

          {/* Maison / Brand */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Maison</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about-us">About Us</Link></li>
              <li><Link href="/history">History</Link></li>
              <li><Link href="/savoir-faire">Savoir-Faire</Link></li>
            </ul>
          </div>

          {/* Support / Help */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/contact-us">Contact Us</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/warranty">Warranty</Link></li>
              <li><Link href="/shipping">Shipping</Link></li>
            </ul>
          </div>

          {/* Legal / Privacy */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal & Policies</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/terms">Terms & Conditions</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/cookies">Cookie Settings</Link></li>
              <li><Link href="/accessibility">Accessibility</Link></li>
              <li><Link href="/legal">Legal Notices</Link></li>
            </ul>
          </div>
        </div>

        {/* Newsletter & Social */}
        <div className="mt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex-1">
            <p className="text-sm mb-2">Subscribe to our newsletter</p>
            <form className="flex max-w-md bg-white">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-l-md text-black"
              />
              <button
                type="submit"
                className="px-4 bg-white text-black font-semibold rounded-r-md"
              >
                Subscribe
              </button>
            </form>
          </div>
          <div className="flex space-x-4">
            <Link href="https://facebook.com"><Facebook size={20} /></Link>
            <Link href="https://instagram.com"><Instagram size={20} /></Link>
            <Link href="https://linkedin.com"><Linkedin size={20} /></Link>
            <Link href="https://youtube.com"><Youtube size={20} /></Link>
            <Link href="https://twitter.com"><Twitter size={20} /></Link>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-12 border-t border-gray-800 pt-6 text-center text-xs text-gray-400">
          <p>
            © {new Date().getFullYear()} Your Chronova. All rights reserved.
          </p>
          <p>
            Back to <Link href="/" className="underline">Home</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
