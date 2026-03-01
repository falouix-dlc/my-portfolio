"use client";

import { useState, useEffect } from "react";
import { Terminal, Sun, Moon, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const updateScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const navLinks = [
    { href: "#stats", label: "stats" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-[#020617]/90 backdrop-blur-md border-b border-white/10"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-xl text-white">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <Terminal className="w-5 h-5 text-white" />
          </div>
          <span>FAKHREDDINE<span className="text-blue-400">.</span></span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.href}
              href={link.href}
              className="text-sm text-slate-400 hover:text-white transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* CTA Button */}
          <a
            href="mailto:falouix@gmail.com"
            className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-full transition-all hover:scale-105 active:scale-95"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-white/5 text-slate-300"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          
          <button
            className="text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-[#020617] border-b border-white/10 transition-all duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="px-6 py-8 space-y-6 flex flex-col">
          {navLinks.map((link) => (
            <a 
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-lg text-slate-400 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="mailto:falouix@gmail.com"
            onClick={() => setIsMenuOpen(false)}
            className="mt-4 px-5 py-3 bg-blue-500 text-white text-center font-medium rounded-full"
          >
            Hire Me
          </a>
        </div>
      </div>
    </nav>
  );
}