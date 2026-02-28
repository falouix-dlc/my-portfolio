"use client";

import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Hero() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  // Cursor-based spring
  const xSpring = useSpring(cursorX, { stiffness: 50, damping: 20 });
  const ySpring = useSpring(cursorY, { stiffness: 50, damping: 20 });

  // Scroll-based vertical transform
  const scrollYText = useTransform(scrollYProgress, [0, 1], [0, 50]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      cursorX.set((e.clientX - centerX) * 0.2); // smaller factor for subtle effect
      cursorY.set((e.clientY - centerY) * 0.2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <section
      ref={targetRef}
      className="relative min-h-screen flex items-center pt-20 px-6 overflow-hidden bg-[#020617]"
    >
      {/* Background Circles */}
      <motion.div
        style={{ x: xSpring, y: ySpring }}
        className="absolute top-10 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-[100px]"
      />
      <motion.div
        style={{ x: xSpring, y: ySpring }}
        className="absolute bottom-0 right-1/3 w-96 h-96 bg-white/10 rounded-full blur-[120px]"
      />

      {/* Hero Content with Parallax */}
      <motion.div
        style={{ x: xSpring, y: ySpring, translateY: scrollYText }}
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 inline-block px-3 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full"
        >
          Full Stack Developer • Based in Italy
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Hi, I'm{" "}
          <span className="text-blue-500">Fakhreddine</span>.
          <br />
          I build scalable digital systems.
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-lg text-slate-400 max-w-2xl mb-10 leading-relaxed"
        >
          Full Stack Developer with 5+ years of experience building 
          production-ready web and mobile applications using 
          Laravel, React, Node.js, and Django. 
          Currently open to international opportunities and relocation.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-wrap gap-4"
        >
          <Link
            href="#projects"
            className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold flex items-center gap-2 transition-all"
          >
            View My Work
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/cv.pdf"
            className="px-8 py-4 border border-white/10 hover:border-white/30 text-slate-300 hover:text-white rounded-xl font-semibold flex items-center gap-2 transition-all"
          >
            Download CV
            <Download size={18} />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}