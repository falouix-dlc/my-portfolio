"use client";

import { stats } from "@/app/data/stats";
import StatCard from "./StatCard";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { TrendingUp } from "lucide-react";

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // FIXED: Later fade out - starts at 85%, fully gone at 100%
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.15], [0.95, 1]);
  
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const ySpring = useSpring(y, springConfig);
  const scaleSpring = useSpring(scale, springConfig);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 bg-white dark:bg-[#020617] overflow-hidden"
    >
      {/* Background elements - theme aware */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/50 dark:from-blue-900/20 via-transparent dark:via-[#020617] to-transparent dark:to-[#020617]" />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.03] opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.1) 1px, transparent 1px)`,
        }}
        className="absolute inset-0 dark:[background-image:linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] [background-image:linear-gradient(rgba(0,0,0,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.05)_1px,transparent_1px)] [background-size:50px_50px]"
      />

      {/* Floating orbs - theme aware */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-[100px]"
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-[120px]"
        animate={{ x: [0, -30, 0], y: [0, -50, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div 
        style={{ y: ySpring, opacity, scale: scaleSpring }}
        className="relative z-10 max-w-7xl mx-auto"
      >
        {/* Section header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6"
          >
            <TrendingUp size={16} />
            <span>Career Highlights</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            Numbers that{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              speak
            </span>
          </h2>
          
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            A snapshot of my journey and impact in the development world
          </p>
        </motion.div>

        {/* Stats grid */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {stats.map((stat, index) => (
            <StatCard key={stat.label} {...stat} index={index} />
          ))}
        </motion.div>

        {/* Bottom decoration */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-600 text-sm">
            <div className="w-12 h-[1px] bg-slate-300 dark:bg-slate-700" />
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Updated in real-time
            </span>
            <div className="w-12 h-[1px] bg-slate-300 dark:bg-slate-700" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}