// Stats.tsx
"use client";

import { stats } from "@/app/data/stats";
import StatCard from "./StatCard";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.9, 1]);
  
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const ySpring = useSpring(y, springConfig);
  const scaleSpring = useSpring(scale, springConfig);

  // Staggered children animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 bg-[#020617] overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#020617] to-[#020617]" />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px]"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]"
        animate={{
          x: [0, -30, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Numbers that <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">speak</span>
          </h2>
        </motion.div>

        {/* Stats grid */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {stats.map((stat, index) => (
            <StatCard 
              key={stat.label} 
              {...stat} 
            />
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
          <div className="flex items-center gap-2 text-slate-600 text-sm">
            <div className="w-8 h-[1px] bg-slate-700" />
            <span>Updated in real-time</span>
            <div className="w-8 h-[1px] bg-slate-700" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}