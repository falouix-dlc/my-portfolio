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
    { href: "#projects", label: "Projects" },
    { href: "#stack", label: "Stack" },
    { href: "#experience", label: "Experience" },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-secondary/80 backdrop-blur-md border-b border-black/5 dark:border-white/5"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-xl text-primary">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <Terminal className="w-5 h-5 text-white" />
          </div>
          <span>FAKHREDDINE<span className="text-accent">.</span></span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.href}
              href={link.href}
              className="text-sm text-secondary hover:text-accent transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 text-secondary hover:text-accent transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* CTA Button */}
          <a
            href="mailto:falouix@gmail.com"
            className="px-5 py-2.5 bg-accent hover:bg-accent/90 text-white text-sm font-medium rounded-full transition-all hover:scale-105 active:scale-95"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-secondary text-secondary"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          
          <button
            className="text-primary p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-primary border-b border-black/5 dark:border-white/5 transition-all duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="px-6 py-8 space-y-6 flex flex-col">
          {navLinks.map((link) => (
            <a 
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-lg text-secondary hover:text-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="mailto:falouix@gmail.com"
            onClick={() => setIsMenuOpen(false)}
            className="mt-4 px-5 py-3 bg-accent text-white text-center font-medium rounded-full"
          >
            Hire Me
          </a>
        </div>
      </div>
    </nav>
  );
}