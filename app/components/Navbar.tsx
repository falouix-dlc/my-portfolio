"use client";

import { useState, useEffect } from "react";
import { Terminal } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const updateScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all ${
      isScrolled
        ? "py-4 bg-slate-950/80 backdrop-blur-md border-b border-white/5"
        : "py-6"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Terminal className="w-5 h-5 text-white" />
          </div>
          <span>FAKHREDDINE<span className="text-blue-500">.</span></span>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex gap-8 text-sm text-slate-400">
          <a href="#projects">Projects</a>
          <a href="#stack">Stack</a>
          <a href="#experience">Experience</a>
          <a
            href="mailto:falouix@gmail.com"
            className="px-4 py-2 bg-white text-black rounded-full"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-950 px-6 py-6 space-y-6 text-center">
          <a href="#projects">Projects</a>
          <a href="#stack">Stack</a>
          <a href="#experience">Experience</a>
        </div>
      )}
    </nav>
  );
}